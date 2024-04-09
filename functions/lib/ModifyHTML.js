import HeadStartHtml from "./partial_html/head_start.html";
import HeadEndHtml from "./partial_html/head_end.html";
import BodyHtml from "./partial_html/body.html";

import AmpHtml from "./partial_html/amp_template.html";

import Path from './Path.js';
import CapitalizeFirstLetter from "./CapitalizeFirstLetter.js";
import DeduplicateArrayOfArrays from "./DeduplicateArrayOfArrays.js";
import IsStatuspageNameSame from "./IsStatuspageNameSame.js";

export default async function ModifyHTML(request, env, _path){
    const db = env.CACHE_DB;
    const table = env.TABLE;
    const db_age = env.AGE;
    const StatuspageUrl = _path == Path.Amp && !env.ShowFirstStatuspageBaseUrl ? env.StatuspageBaseUrl2 : env.StatuspageBaseUrl;
    const route = `/api/v2/status.json`;

    var path = _path;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(route).all();

    var CanonicalUrl = new URL(request.url);
    var imageUrlRegex = /status(-min)?-good\.png/g;

    var statusJson = JSON.parse(results[0].data);

    var originalStatus = statusJson.status.indicator;
    var StatuspageStatus = CapitalizeFirstLetter(statusJson.status.indicator == "none" ? "good" : statusJson.status.indicator);
    var StatuspageDescription = statusJson.status.description;
    var StatuspageName = statusJson.page.name;
    
    var updated_on = new Date(results[0].updated_on);
    var age = parseInt(((new Date()) - updated_on) / 1000);

    if (age > db_age) { 
        console.log(`Age: ${age}`);

        const statusRes = await fetch(`${StatuspageUrl}${route}`);
        const statusData = await statusRes.json();

        originalStatus = statusData.status.indicator;
        StatuspageStatus = CapitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
        StatuspageDescription = statusData.status.description;
        StatuspageName = statusData.page.name;

        const { success } = await db.prepare(`UPDATE ${table} SET data = ? WHERE route = ?;`).bind(JSON.stringify(statusData), route).run();
    }

    var headHtml = path == Path.Amp ? AmpHtml : HeadStartHtml;

    headHtml = headHtml.replaceAll("{{SiteName}}", StatuspageName);
    headHtml = headHtml.replaceAll("{{CanonicalUrl}}", request.url);
    headHtml = headHtml.replaceAll("{{BaseUrl}}", `${CanonicalUrl.protocol}//${CanonicalUrl.hostname}`);

    // var isStatuspageNameSame = IsStatuspageNameSame(DeduplicateArrayOfArrays([...headHtml.matchAll(imageUrlRegex)]), StatuspageName);

    for (const img of DeduplicateArrayOfArrays([...headHtml.matchAll(imageUrlRegex)])) {
        console.log(img);

        headHtml = headHtml.replaceAll(img[0], img[0].replace('good', StatuspageStatus.toLowerCase()));
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