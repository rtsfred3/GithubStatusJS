import CapitalizeFirstLetter from "/lib/CapitalizeFirstLetter.js";

import HeadHtml from "../partial_html/head.html";

export async function onRequestGet({ request, params, env }) {
    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    var titleRegex = /([A-Za-z]*) Status - AMP/g;
    var descriptionRegex = /A minified AMP website to monitor ([A-Za-z]*) status updates./g;
    var canonicalUrlRegex = /<link rel="canonical" href="https:\/\/(([a-z]|\.)+\/([a-z]|\/)+)" \/>/g;

    var canonicalUrlList = [...AmpHtml.matchAll(canonicalUrlRegex)];
    var canonicalUrl = canonicalUrlList[0][1];
    
    console.log(`Canonical Url: ${canonicalUrl}`);
    console.log(`URL: ${newBaseUrl.host}${newBaseUrl.pathname}`);

    console.log([...AmpHtml.matchAll(canonicalUrl)]);

    const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
    const statusData = await statusRes.json();

    var StatuspageStatus = CapitalizeFirstLetter.capitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
    var StatuspageDescription = statusData.status.description;
    var StatuspageName = statusData.page.name;

    var html = AmpHtml.replaceAll(oldBaseUrl, newBaseUrl.host);

    html = html.replaceAll(canonicalUrl, `${newBaseUrl.host}${newBaseUrl.pathname}`);

    for(const title of [...new Set(AmpHtml.matchAll(titleRegex))]){
        html = html.replaceAll(title[0], `${title[0].replace(title[1], StatuspageName)} | ${StatuspageStatus}`);
    }

    for(const description of [...new Set(AmpHtml.matchAll(descriptionRegex))]){
        console.log(description);
        html = html.replaceAll(description[0], `${description[0].replace(description[1], StatuspageName)} | ${StatuspageDescription}`);
    }

    for(const url of [...new Set(AmpHtml.match(/"\/\/([a-z]|\.)+\//g))].map((u) => u.substring(1))){
        html = html.replaceAll(url, `//${StatuspageUrl}/`);
    }

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}