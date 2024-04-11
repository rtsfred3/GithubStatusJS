import AmpHtml from "./partial_html/amp_template.html";
import TemplateHtml from "./partial_html/template.html";

import Path from './Path.js';
import TimeSpans from './TimeSpans.js';
import HeaderTypes from './HeaderTypes.js';
import StatuspageKV from './StatuspageKV.js';
import DeduplicateArrayOfArrays from "./DeduplicateArrayOfArrays.js";

import CustomHeaders from './CustomHeaders.js';

import StatuspageDictionary from '../../modules/StatuspageDictionary.esm.js';

export default async function ModifyHTML(context, _path){
    const db = context.env.CACHE_DB;
    const table = context.env.TABLE;
    const ClouldflareCache = TimeSpans.Hour;
    const KvCache = context.env.CACHE_AGE_SHORT;

    console.log(`Clouldflare Cache: ${ClouldflareCache}`);
    console.log(`KV Cache: ${KvCache}`);

    const StatuspageStatusKV = context.env.StatuspageStatus;
    const StatuspageUrl = _path == Path.Amp ? "https://www.cloudflarestatus.com" : context.env.StatuspageBaseUrl;
    const route = `/api/v2/status.json`;
    const path = _path;

    var _headers = CustomHeaders("text/html; charset=utf-8", ClouldflareCache);

    var CanonicalUrl = new URL(context.request.url);
    const cacheKey = new Request(CanonicalUrl.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);
    let bypassCache = Boolean(await StatuspageStatusKV.get(StatuspageKV.BypassCache));

    if (response) {
        if (parseInt(response.headers.get(HeaderTypes.Age)) < ClouldflareCache && !bypassCache) {
            console.log("Cache Hit");
            _headers.set(HeaderTypes.Age, response.headers.get(HeaderTypes.Age));
            _headers.set(HeaderTypes.CfCacheStatus, response.headers.get(HeaderTypes.CfCacheStatus));

            return response;
        } else {
            if (_headers.has(HeaderTypes.Age)) {
                _headers.delete(HeaderTypes.Age)
            }

            if (_headers.has(HeaderTypes.CfCacheStatus)) {
                _headers.delete(HeaderTypes.CfCacheStatus)
            }
        }
    }

    var imageUrlRegex = /status(-min)?-good\.png/g;

    var statuspageKvMetadata = JSON.parse(await StatuspageStatusKV.get(StatuspageKV.StatuspageMetadata));

    var age = parseInt((Date.now() - statuspageKvMetadata[StatuspageKV.LastUpdated]) / 1000);

    if (age > KvCache) { 
        console.log(`Updating Data in KV`);

        const statusRes = await fetch(`${StatuspageUrl}${route}`);
        const statusData = await statusRes.json();

        statuspageKvMetadata[StatuspageKV.OriginalStatus] = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;
        statuspageKvMetadata[StatuspageKV.StatuspageDescription] = statusData.status.description;
        statuspageKvMetadata[StatuspageKV.StatuspageName] = statusData.page.name;
        statuspageKvMetadata[StatuspageKV.LastUpdated] = Date.now();
        age = 0;
        
        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageMetadata, JSON.stringify(statuspageKvMetadata)));
    }

    var html = path == Path.Amp ? AmpHtml : TemplateHtml;

    html = html.replaceAll("{{CanonicalUrl}}", context.request.url);
    html = html.replaceAll("{{BaseUrl}}", `${CanonicalUrl.protocol}//${CanonicalUrl.hostname}`);

    html = html.replaceAll("{{MetaColor}}", StatuspageDictionary.MetaColors[statuspageKvMetadata[StatuspageKV.OriginalStatus]]);

    for (const img of DeduplicateArrayOfArrays([...html.matchAll(imageUrlRegex)])) {
        html = html.replaceAll(img[0], img[0].replace('good', statuspageKvMetadata[StatuspageKV.OriginalStatus]));
    }

    if (path == Path.Component) {
        html = html.replaceAll("{{Title}}", `(Unofficial) {{SiteName}} Status Components`);
    }  
    else if (path == Path.Status) {
        html = html.replaceAll("{{Title}}", `(Unofficial) Mini {{SiteName}} Status`);
    }
    else if (path == Path.Index) {
        html = html.replaceAll("{{Title}}", `(Unofficial) {{SiteName}} Status`);
    }
    else if (path == Path.Amp) {
        html = html.replaceAll("{{Title}}", `(Unofficial) {{SiteName}} Status AMP`);
    }
    else {
        html = html.replaceAll("{{Title}}", `(Unofficial) {{SiteName}} Status - Error`);
    }

    if (path == Path.Amp) {
        html = html.replaceAll("{{Description}}", `A minified AMP website to monitor {{SiteName}} status updates.| ${statuspageKvMetadata[StatuspageKV.StatuspageDescription]}`);
    }
    else {
        html = html.replaceAll("{{Description}}", `An unofficial website to monitor {{SiteName}} status updates. | ${statuspageKvMetadata[StatuspageKV.StatuspageDescription]}`);
    }

    html = html.replaceAll("{{SiteName}}", statuspageKvMetadata[StatuspageKV.StatuspageName]);

    if (StatuspageUrl.startsWith("https://")) {
        html = html.replaceAll("{{StatuspageUrl}}", StatuspageUrl);
    }

    context.waitUntil(StatuspageStatusKV.put(CanonicalUrl, html));

    response = new Response(html, { headers: _headers });

    if (!bypassCache) {
        context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
}