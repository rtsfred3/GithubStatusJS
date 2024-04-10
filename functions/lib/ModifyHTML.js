import HeadStartHtml from "./partial_html/head_start.html";
import HeadEndHtml from "./partial_html/head_end.html";
import BodyHtml from "./partial_html/body.html";

import AmpHtml from "./partial_html/amp_template.html";

import IndexHtml from "../../n_index.html";

import Path from './Path.js';
import TimeSpans from './TimeSpans.js';
import HeaderTypes from './HeaderTypes.js';
import StatuspageKV from './StatuspageKV.js';
import CapitalizeFirstLetter from "./CapitalizeFirstLetter.js";
import DeduplicateArrayOfArrays from "./DeduplicateArrayOfArrays.js";

import UserAgents from './UserAgents.js';
import CustomHeaders from './CustomHeaders.js';

import StatuspageDictionary from '../../modules/StatuspageDictionary.esm.js';

export default async function ModifyHTML(context, _path){
    const db = context.env.CACHE_DB;
    const table = context.env.TABLE;
    const StatuspageStatusKV = context.env.StatuspageStatus;
    const db_age = context.env.AGE;
    const StatuspageUrl = _path == Path.Amp ? "https://www.cloudflarestatus.com" : context.env.StatuspageBaseUrl;
    const route = `/api/v2/status.json`;
    const path = _path;

    var _headers = CustomHeaders("text/html; charset=utf-8", TimeSpans.Week);

    // var isBot = UserAgents.IsBot(context.request.headers.get('user-agent'));
    // if (!isBot) { return new Response(IndexHtml, { headers: _headers }); }

    var CanonicalUrl = new URL(context.request.url);
    const cacheKey = new Request(CanonicalUrl.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (response) {
        console.log("Cache Hit");

        _headers.set(HeaderTypes.Age, response.headers.get(HeaderTypes.Age));
        _headers.set(HeaderTypes.CfCacheStatus, response.headers.get(HeaderTypes.CfCacheStatus));

        console.log(`${parseInt(response.headers.get(HeaderTypes.Age)) > TimeSpans.Day}`);

        if (parseInt(response.headers.get(HeaderTypes.Age)) > TimeSpans.Day) {
            context.waitUntil(cache.delete(cacheKey, response.clone()));
        }

        return response;
    }

    var imageUrlRegex = /status(-min)?-good\.png/g;

    var OriginalStatus = await StatuspageStatusKV.get(StatuspageKV.OriginalStatus);
    var StatuspageStatus = await StatuspageStatusKV.get(StatuspageKV.StatuspageStatus);
    var StatuspageDescription = await StatuspageStatusKV.get(StatuspageKV.StatuspageDescription);
    var StatuspageName = await StatuspageStatusKV.get(StatuspageKV.StatuspageName);
    var LastUpdated = await StatuspageStatusKV.get(StatuspageKV.LastUpdated);

    var age = parseInt((Date.now() - LastUpdated) / 1000);

    if (age > db_age) { 
        console.log(`Data in KV is outdated`);

        var urlToFetch = `${StatuspageUrl}${route}`;

        const statusRes = await fetch(urlToFetch);
        const statusData = await statusRes.json();

        OriginalStatus = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;
        StatuspageStatus = CapitalizeFirstLetter(OriginalStatus);
        StatuspageDescription = statusData.status.description;
        StatuspageName = statusData.page.name;
        age = 0;

        // context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageUrl, statusData));

        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.OriginalStatus, OriginalStatus));
        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageStatus, StatuspageStatus));
        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageDescription, StatuspageDescription));
        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageName, StatuspageName));
        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.LastUpdated, Date.now()));
    } else {
        _headers.set(HeaderTypes.XAge, `${age}`);
    }

    var headHtml = path == Path.Amp ? AmpHtml : HeadStartHtml;

    headHtml = headHtml.replaceAll("{{SiteName}}", StatuspageName);
    headHtml = headHtml.replaceAll("{{CanonicalUrl}}", context.request.url);
    headHtml = headHtml.replaceAll("{{BaseUrl}}", `${CanonicalUrl.protocol}//${CanonicalUrl.hostname}`);

    headHtml = headHtml.replaceAll("{{MetaColor}}", StatuspageDictionary.MetaColors[OriginalStatus]);

    for (const img of DeduplicateArrayOfArrays([...headHtml.matchAll(imageUrlRegex)])) {
        headHtml = headHtml.replaceAll(img[0], img[0].replace('good', OriginalStatus));
    }

    if (path == Path.Component) {
        headHtml = headHtml.replaceAll("{{Title}}", `(Unofficial) ${StatuspageName} Status Components`);
    }  
    else if (path == Path.Status) {
        headHtml = headHtml.replaceAll("{{Title}}", `(Unofficial) Mini ${StatuspageName} Status`);
    }
    else if (path == Path.Index) {
        headHtml = headHtml.replaceAll("{{Title}}", `(Unofficial) ${StatuspageName} Status`);
    }
    else if (path == Path.Amp) {
        headHtml = headHtml.replaceAll("{{Title}}", `(Unofficial) ${StatuspageName} Status AMP`);
    }
    else {
        headHtml = headHtml.replaceAll("{{Title}}", `(Unofficial) ${StatuspageName} Status - Error`);
    }

    if (path == Path.Amp) {
        headHtml = headHtml.replaceAll("{{Description}}", `A minified AMP website to monitor ${StatuspageName} status updates.| ${StatuspageDescription}`);
    }
    else {
        headHtml = headHtml.replaceAll("{{Description}}", `An unofficial website to monitor ${StatuspageName} status updates. | ${StatuspageDescription}`);
    }

    headHtml += HeadEndHtml;

    var bodyHtml = BodyHtml;

    for(const url of [...new Set(bodyHtml.matchAll(/https:\/\/(([a-z]|\.)+)\//g))]){
        bodyHtml = bodyHtml.replaceAll(url[1], StatuspageUrl);
    }

    if (path == Path.Status) {
        bodyHtml = `<body> \
            <statuspage-status data-url="${StatuspageUrl}" fullScreen></statuspage-status> \
        </body>`
    }

    var html = `<!DOCTYPE html> \
    <html lang="en"> \
        ${headHtml}${bodyHtml} \
    </html>`;

    if (path == Path.Amp) {
        html = headHtml;
    }

    if (StatuspageUrl.startsWith("https://")) {
        html = html.replaceAll("{{StatuspageUrl}}", StatuspageUrl);
    }

    response = new Response(html, { headers: _headers });

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
}