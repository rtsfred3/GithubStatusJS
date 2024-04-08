import CapitalizeFirstLetter from "./lib/CapitalizeFirstLetter.js";

import HeadStartHtml from "../partial_html/head_start.html";
import HeadEndHtml from "../partial_html/head_end.html";
import BodyHtml from "../partial_html/body.html";
// import BodyHtml from "../partial_html/body_test.html";

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
    // const db = env.CACHE_DB;
    // const table = env.TABLE;
    const cache_age = env.AGE;
    // const route = `/api/v2/status.json`;

    // const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(route).all();

    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    var titleRegex = /([A-Za-z]*) Status/g;
    var descriptionRegex = /A minified website to monitor ([A-Za-z]*) status updates./g;
    var canonicalUrlRegex = /<link rel="canonical" href="https:\/\/(([a-z]|\.)+\/([a-z]|\/)+)" \/>/g;
    var imageUrlRegex = /status(-min)?-good\.png/g;

    console.log(StatuspageUrl);

    var canonicalUrlList = [...HeadStartHtml.matchAll(canonicalUrlRegex)];
    
    console.log(canonicalUrlList);

    var canonicalUrl = canonicalUrlList.length > 0 ? new URL(`https://${canonicalUrlList[0][1]}`) : newBaseUrl;

    console.log(canonicalUrl);

    // var statusJson = JSON.parse(results[0].data);

    // var StatuspageStatus = CapitalizeFirstLetter(statusJson.status.indicator == "none" ? "good" : statusJson.status.indicator);
    // var StatuspageDescription = statusJson.status.description;
    // var StatuspageName = statusJson.page.name;
    
    // var updated_on = new Date(results[0].updated_on);
    // var age = parseInt(((new Date()) - updated_on) / 1000);

    // if (age > cache_age) { 
    //     console.log(`Age: ${age}`);

    //     const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
    //     const statusData = await statusRes.json();

    //     StatuspageStatus = CapitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
    //     StatuspageDescription = statusData.status.description;
    //     StatuspageName = statusData.page.name;

    //     const { success } = await db.prepare(`UPDATE ${table} SET data = ? WHERE route = ?;`).bind(JSON.stringify(statusData), route).run();
    // }

    console.log(oldBaseUrl, newBaseUrl.host);

    var headHtml = HeadStartHtml.replaceAll(oldBaseUrl, newBaseUrl.host);
    var bodyHtml = 

    console.log(`${newBaseUrl.host}${canonicalUrl.pathname}`, `${newBaseUrl.host}${newBaseUrl.pathname}`);

    headHtml = headHtml.replaceAll(`${newBaseUrl.host}${canonicalUrl.pathname}`, `${newBaseUrl.host}${newBaseUrl.pathname}`);

    /* for (const img of DeduplicateArrayOfArrays([...AmpHtml.matchAll(imageUrlRegex)])) {
        console.log(img);

        html = html.replaceAll(img[0], img[0].replace('good', StatuspageStatus.toLowerCase()));
    } */

    for(const title of DeduplicateArrayOfArrays([...HeadStartHtml.matchAll(titleRegex)])){
        console.log(title);

        headHtml = headHtml.replaceAll(title[0], `(Unofficial) Mini ${title[1]} Status`);

        // if (title[1] == StatuspageName || isStatuspageNameSame) {
        // } else {
        //     html = html.replaceAll(title[0], `${title[0].replace(title[1], StatuspageName)} | ${StatuspageStatus}`);
        // }
    }

    /* for(const description of DeduplicateArrayOfArrays([...new Set(AmpHtml.matchAll(descriptionRegex))])){
        console.log(description);

        if (description[1] == StatuspageName || isStatuspageNameSame) {
            html = html.replaceAll(description[0], `${description[0]} | ${StatuspageDescription}`);
        } else {
            html = html.replaceAll(description[0], `${description[0].replace(description[1], StatuspageName)} | ${StatuspageDescription}`);
        }
    } */

    for(const url of [...new Set(HeadStartHtml.match(/"\/\/([a-z]|\.)+\//g))].map((u) => u.substring(1))){
        headHtml = headHtml.replaceAll(url, `//${StatuspageUrl}/`);
    }

    headHtml += HeadEndHtml;

    for(const url of [...new Set(BodyHtml.match(/"\/\/([a-z]|\.)+\//g))].map((u) => u.substring(1))){
        bodyHtml = BodyHtml.replaceAll(url, `//${StatuspageUrl}/`);
    }

    var html = `<!DOCTYPE html><html lang="en">${headHtml}${bodyHtml}</html>`

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": `max-age=${cache_age}, public`
        },
    });
}