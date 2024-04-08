// import AmpHtml from "../amp/index.html";

import AmpHtml from "../StatuspageHTML/amp/index.html";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function onRequestGet({ request, params, env }) {
    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);//.host;
    var oldBaseUrl = "githubstat.us";
    var titleRegex = /([A-Za-z]*) Status - AMP/g;
    var descriptionRegex = /A minified AMP website to monitor [A-Za-z]* status updates./g;

    const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
    const statusData = await statusRes.json();

    var StatuspageStatus = capitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
    var StatuspageDescription = statusData.status.description;
    var StatuspageName = statusData.page.name;

    var html = AmpHtml.replaceAll(oldBaseUrl, newBaseUrl);

    for(const title of [...new Set(AmpHtml.matchAll(titleRegex))]){
        html = html.replaceAll(title[0], `${title[0].replace(title[1], StatuspageName)} | ${StatuspageStatus}`);
    }

    for(const description of [...new Set(AmpHtml.match(descriptionRegex))]){
        html = html.replaceAll(description, `${description} | ${StatuspageDescription}`);
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