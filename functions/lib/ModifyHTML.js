import HeadStartHtml from "./partial_html/head_start.html";
import HeadEndHtml from "./partial_html/head_end.html";
import BodyHtml from "./partial_html/body.html";

import AmpHtml from "./partial_html/amp_template.html";

import Path from './Path.js';
import StatuspageKV from './StatuspageKV.js';
import CapitalizeFirstLetter from "./CapitalizeFirstLetter.js";
import DeduplicateArrayOfArrays from "./DeduplicateArrayOfArrays.js";

import StatuspageDictionary from '../../modules/StatuspageDictionary.esm.js';

export default async function ModifyHTML(request, env, _path){
    const db = env.CACHE_DB;
    const table = env.TABLE;
    const StatuspageStatusKV = env.StatuspageStatus;
    const db_age = env.AGE;
    const StatuspageUrl = _path == Path.Amp ? "https://www.cloudflarestatus.com" : env.StatuspageBaseUrl;
    const route = `/api/v2/status.json`;
    const path = _path;

    var CanonicalUrl = new URL(request.url);
    var imageUrlRegex = /status(-min)?-good\.png/g;

    // const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(route).all();
    // var statusJson = JSON.parse(results[0].data);
    // var originalStatus = statusJson.status.indicator;
    // var StatuspageStatus = CapitalizeFirstLetter(statusJson.status.indicator == "none" ? "good" : statusJson.status.indicator);
    // var StatuspageDescription = statusJson.status.description;
    // var StatuspageName = statusJson.page.name;

    var OriginalStatus = StatuspageStatusKV.get(StatuspageKV.OriginalStatus);
    var StatuspageStatus = StatuspageStatusKV.get(StatuspageKV.StatuspageStatus);
    var StatuspageDescription = StatuspageStatusKV.get(StatuspageKV.StatuspageName);
    var StatuspageName = StatuspageStatusKV.get(StatuspageKV.StatuspageName);
    var LastUpdated = StatuspageStatusKV.get(StatuspageKV.LastUpdated);

    var age = parseInt((Date().now() - new Date(LastUpdated)) / 1000);

    console.log(`Last Updated: ${new Date(LastUpdated)}`);
    console.log(`Currently: ${new Date()}`);

    if (age > db_age) { 
        console.log(`Age: ${age}`);

        const statusRes = await fetch(`${StatuspageUrl}${route}`);
        const statusData = await statusRes.json();

        OriginalStatus = statusData.status.indicator;
        StatuspageStatus = CapitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
        StatuspageDescription = statusData.status.description;
        StatuspageName = statusData.page.name;

        StatuspageStatusKV.put(StatuspageKV.OriginalStatus, OriginalStatus);
        StatuspageStatusKV.put(StatuspageKV.StatuspageName, StatuspageName);
        StatuspageStatusKV.put(StatuspageKV.StatuspageStatus, StatuspageStatus);
        StatuspageStatusKV.put(StatuspageKV.StatuspageDescription, StatuspageDescription);
        StatuspageStatusKV.put(StatuspageKV.LastUpdated, Date.now());

        // const { success } = await db.prepare(`UPDATE ${table} SET data = ? WHERE route = ?;`).bind(JSON.stringify(statusData), route).run();
    }

    var headHtml = path == Path.Amp ? AmpHtml : HeadStartHtml;

    headHtml = headHtml.replaceAll("{{SiteName}}", StatuspageName);
    headHtml = headHtml.replaceAll("{{CanonicalUrl}}", request.url);
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

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": `max-age=${env.CACHE_AGE}, s-maxage=${env.CACHE_AGE}, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=${env.CACHE_AGE}`
        },
    });
}