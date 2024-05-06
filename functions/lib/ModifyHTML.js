import AmpHtml from "./partial_html/amp_template.html";
import TemplateHtml from "./partial_html/template.html";

import TimeSpans from './TimeSpans.js';
import HeaderTypes from './HeaderTypes.js';
import StatuspageKV from './StatuspageKV.js';
import DeduplicateArrayOfArrays from "./DeduplicateArrayOfArrays.js";

import CustomHeaders from './CustomHeaders.js';
import GetFileFromAssets from './GetFileFromAssets.js';

import { BotChecker } from './BotChecker.js';

import { StatuspageDictionary } from '../../modules/Statuspage.esm.js';

export default async function ModifyHTML(context, _path){
    const db = context.env.CACHE_DB;
    const table = context.env.TABLE;
    const ClouldflareCache = TimeSpans.Week * 2;
    const KvCache = context.env.CACHE_AGE_SHORT;
    const isVerifiedBot = context.request.cf.botManagement.verifiedBot;

    const StatuspageStatusKV = context.env.StatuspageStatus;
    const StatuspageUrl = context.env.StatuspageBaseUrl;
    const route = `/api/v2/status.json`;
    const path = _path;

    var _headers = CustomHeaders("text/html; charset=utf-8", ClouldflareCache);

    const botChecker = new BotChecker(context);

    console.log(`isBot: ${botChecker.IsBot}`);

    var CanonicalUrl = new URL(context.request.url);
    const cacheKey = new Request(CanonicalUrl.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);
    let bypassCache = /^true$/i.test(await StatuspageStatusKV.get(StatuspageKV.BypassCache));
    bypassCache = botChecker.IsBot ? true : bypassCache;

    if (path == StatuspageDictionary.PathNames.Maintenance) {
        bypassCache = true;
        cache.delete(cacheKey);
    }

    // cache.delete(cacheKey);
    // bypassCache = true;

    console.log(`Clouldflare Cache: ${ClouldflareCache}`);
    console.log(`KV Cache: ${KvCache}`);
    console.log(`Cache Bypass: ${bypassCache}`);

    if (response && !bypassCache) {
        var isCacheValid = parseInt(response.headers.get(HeaderTypes.Age)) < ClouldflareCache;
        
        console.log(`Is Cache Valid? ${isCacheValid}`);
        console.log(`Cache Age: ${response.headers.get(HeaderTypes.Age)}`);

        if (isCacheValid && !bypassCache) {
            console.log("Cache Hit");

            _headers.set(HeaderTypes.Age, response.headers.get(HeaderTypes.Age));
            _headers.set(HeaderTypes.CfCacheStatus, response.headers.get(HeaderTypes.CfCacheStatus));
            _headers.set(HeaderTypes.LastModified, response.headers.get(HeaderTypes.LastModified));

            return response;
        } else {
            console.log("Cache Bypassed");

            var headersToRemove = [ HeaderTypes.Age, HeaderTypes.CfCacheStatus, HeaderTypes.LastModified ];

            for(const header of headersToRemove) {
                console.log(`Removed Header: ${header}`);

                if (_headers.has(header)) {
                    _headers.delete(header)
                }
            }
        }
    }

    const css = await GetFileFromAssets(context, "/styling/main.min.css");
    const js = await GetFileFromAssets(context, "/js/StatuspageHTML.min.js");

    var imageUrlRegex = /status(-min)?-good\.png/g;

    var statuspageKvMetadata = JSON.parse(await StatuspageStatusKV.get(StatuspageKV.StatuspageMetadata));

    if (statuspageKvMetadata == null) {
        statuspageKvMetadata = { [StatuspageKV.LastUpdated]: 0 };
    }

    var age = parseInt((Date.now() - statuspageKvMetadata[StatuspageKV.LastUpdated]) / 1000);

    console.log(`StatuspageKV.LastUpdated: ${age}`);

    if (age > KvCache) { 
        console.log(`Updating Data in KV`);

        const statusRes = await fetch(`${StatuspageUrl}${route}`);
        const statusData = await statusRes.json();

        statuspageKvMetadata[StatuspageKV.OriginalStatus] = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;
        statuspageKvMetadata[StatuspageKV.StatuspageDescription] = statusData.status.description;
        statuspageKvMetadata[StatuspageKV.StatuspageName] = statusData.page.name;
        statuspageKvMetadata[StatuspageKV.LastUpdated] = Date.now();

        context.waitUntil(StatuspageStatusKV.put(StatuspageKV.StatuspageMetadata, JSON.stringify(statuspageKvMetadata)));
    }

    var formattedDateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: '2-digit', hour12: false, minute: '2-digit', second:'2-digit' };

    _headers.set(HeaderTypes.XKvStatusLastModified, new Date(statuspageKvMetadata[StatuspageKV.LastUpdated]).toLocaleDateString('en-US', formattedDateOptions));

    var html = path == StatuspageDictionary.PathNames.Amp ? AmpHtml : TemplateHtml;

    html = html.replaceAll("{{CanonicalUrl}}", context.request.url);
    html = html.replaceAll("{{BaseUrl}}", `${CanonicalUrl.protocol}//${CanonicalUrl.host}`);

    html = html.replaceAll("{{MetaColor}}", StatuspageDictionary.MetaColors[statuspageKvMetadata[StatuspageKV.OriginalStatus]]);

    for (const img of DeduplicateArrayOfArrays([...html.matchAll(imageUrlRegex)])) {
        html = html.replaceAll(img[0], img[0].replace('good', statuspageKvMetadata[StatuspageKV.OriginalStatus]));
    }

    if (botChecker.IsBot) {
        html = html.replace("{{Body}}", "");
    }

    if (path == StatuspageDictionary.PathNames.Index) {
        html = html.replaceAll("{{Title}}", StatuspageDictionary.Titles.Index);
        html = html.replace("{{Body}}", "<statuspage-app data-url=\"{{StatuspageUrl}}\"></statuspage-app>");
    }
    else if (path == StatuspageDictionary.PathNames.Status) {
        html = html.replaceAll("{{Title}}", StatuspageDictionary.Titles.Status);
        html = html.replace("{{Body}}", "<statuspage-status data-url=\"{{StatuspageUrl}}\" fullScreen />");
    }
    else if (path == StatuspageDictionary.PathNames.Component) {
        html = html.replaceAll("{{Title}}", StatuspageDictionary.Titles.Component);
        html = html.replace("{{Body}}", "<statuspage-components data-url=\"{{StatuspageUrl}}\" fullScreen />");
    }
    else if (path == StatuspageDictionary.PathNames.Amp) {
        html = html.replaceAll("{{Title}}", `(Unofficial) {{SiteName}} Status AMP`);
    }
    else if (path == StatuspageDictionary.PathNames.Maintenance) {
        html = html.replaceAll("{{Title}}", StatuspageDictionary.Titles.Maintenance);
        html = html.replace("{{Body}}", "<statuspage-status status=\"maintenance\" fullScreen />");
    }
    else {
        html = html.replaceAll("{{Title}}", StatuspageDictionary.Titles.Error);
        html = html.replace("{{Body}}", "<statuspage-app></statuspage-app><script>Router('{{StatuspageUrl}}', 7);</script>");
    }

    if (path == StatuspageDictionary.PathNames.Amp) {
        html = html.replaceAll("{{Description}}", `A minified AMP website to monitor {{SiteName}} status updates.| ${statuspageKvMetadata[StatuspageKV.StatuspageDescription]}`);
    } else {
        html = html.replaceAll("{{Description}}", `An unofficial website to monitor {{SiteName}} status updates. | ${statuspageKvMetadata[StatuspageKV.StatuspageDescription]}`);
    }

    html = html.replaceAll("{{SiteName}}", statuspageKvMetadata[StatuspageKV.StatuspageName]);

    if (StatuspageUrl.startsWith("https://")) {
        html = html.replaceAll("{{StatuspageUrl}}", StatuspageUrl);
        html = html.replaceAll("{{DnsStatuspageUrl}}", StatuspageUrl.replace('https://', '//'));
    }

    if (!botChecker.IsFacebookBot) {
        html = html.replace("{{CSS}}", `<style>\n\t\t\t${css.split("\n").join("\n\t\t\t")}\n\t\t</style>`);
        html = html.replace("{{JS}}", `<script>\n\t\t\t${js}\n\t\t</script>`);
    }
    else {
        html = html.replace("{{CSS}}", "");
        html = html.replace("{{JS}}", "");

        _headers.SetPrivateCacheControl();
    }

    context.waitUntil(StatuspageStatusKV.put(CanonicalUrl, html));

    response = new Response(html, { headers: _headers });

    if (!bypassCache) {
        context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
}