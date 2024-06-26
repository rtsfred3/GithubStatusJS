import CapitalizeFirstLetter from "../lib/CapitalizeFirstLetter.js";

import AmpHtml from "../../amp/index.html";

function DeduplicateArrayOfArrays(arrInput){
    var arrOut = [];
    var arrOutString = [];
    for (const element of arrInput) {
        if (!arrOutString.includes(element[0])) {
            arrOut.push(element);
            arrOutString.push(element[0]);
        }
    }
    return arrOut;
}

function IsStatuspageNameSame(arrInput, statuspageName){
    var arr = [...new Set(arrInput.map((a) => a[1]))];
    return arr.includes(statuspageName);
}

export async function onRequestGet({ request, params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;
    const cache_age = env.AGE;
    const route = `/api/v2/status.json`;
    var showDetails = false;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(route).all();

    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    var titleRegex = /([A-Za-z]*) Status - AMP/g;
    var descriptionRegex = /A minified AMP website to monitor ([A-Za-z]*) status updates./g;
    var canonicalUrlRegex = /<link rel="canonical" href="https:\/\/(([a-z]|\.)+\/([a-z]|\/)+)" \/>/g;
    var imageUrlRegex = /status(-min)?-good\.png/g;

    var canonicalUrlList = [...AmpHtml.matchAll(canonicalUrlRegex)];
    var canonicalUrl = new URL(`https://${canonicalUrlList[0][1]}`);

    var statusJson = JSON.parse(results[0].data);

    var StatuspageStatus = CapitalizeFirstLetter(statusJson.status.indicator == "none" ? "good" : statusJson.status.indicator);
    var StatuspageDescription = statusJson.status.description;
    var StatuspageName = statusJson.page.name;
    
    var updated_on = new Date(results[0].updated_on);
    var age = parseInt(((new Date()) - updated_on) / 1000);

    if (age > cache_age) { 
        console.log(`Age: ${age}`);

        const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
        const statusData = await statusRes.json();

        StatuspageStatus = CapitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
        StatuspageDescription = statusData.status.description;
        StatuspageName = statusData.page.name;

        const { success } = await db.prepare(`UPDATE ${table} SET data = ? WHERE route = ?;`).bind(JSON.stringify(statusData), route).run();
    }

    var html = AmpHtml.replaceAll(oldBaseUrl, newBaseUrl.host);

    html = html.replaceAll(`${newBaseUrl.host}${canonicalUrl.pathname}`, `${newBaseUrl.host}${newBaseUrl.pathname}`);

    var isStatuspageNameSame = IsStatuspageNameSame([...AmpHtml.matchAll(titleRegex)], StatuspageName);

    for (const img of DeduplicateArrayOfArrays([...AmpHtml.matchAll(imageUrlRegex)])) {
        console.log(img);

        html = html.replaceAll(img[0], img[0].replace('good', StatuspageStatus.toLowerCase()));
    }

    for(const title of DeduplicateArrayOfArrays([...AmpHtml.matchAll(titleRegex)])){
        console.log(title);

        var statusString = showDetails ? ` | ${StatuspageStatus}` : '';

        if (title[1] == StatuspageName || isStatuspageNameSame) {
            html = html.replaceAll(title[0], `${title[0]}${statusString}`);
        } else {
            html = html.replaceAll(title[0], `${title[0].replace(title[1], StatuspageName)}${statusString}`);
        }
    }

    for(const description of DeduplicateArrayOfArrays([...new Set(AmpHtml.matchAll(descriptionRegex))])){
        console.log(description);

        var statusString = showDetails ? ` | ${StatuspageDescription}` : '';

        if (description[1] == StatuspageName || isStatuspageNameSame) {
            html = html.replaceAll(description[0], `${description[0]}${statusString}`);
        } else {
            html = html.replaceAll(description[0], `${description[0].replace(description[1], StatuspageName)}${statusString}`);
        }
    }

    for(const url of [...new Set(AmpHtml.match(/"\/\/([a-z]|\.)+\//g))].map((u) => u.substring(1))){
        html = html.replaceAll(url, `//${StatuspageUrl}/`);
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