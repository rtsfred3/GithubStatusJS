import AmpHtml from "../amp/index.html";

// import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function onRequestGet({ request, params, env }) {
    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    var titleRegex = /[A-Za-z]* Status - AMP/g;
    var descriptionRegex = /A minified AMP website to monitor [A-Za-z]* status updates./g;
    // var description = 'A minified AMP website to monitor GitHub status updates.';

    const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
    const statusData = await statusRes.json();

    var StatuspageStatus = capitalizeFirstLetter(statusData.status.indicator == "none" ? "good" : statusData.status.indicator);
    var StatuspageDescription = statusData.status.description;

    var html = AmpHtml.replaceAll(oldBaseUrl, newBaseUrl.host);
    // html = html.replaceAll(title, `${title} | ${status}`);
    // html = html.replaceAll(description, `${description} | ${statusData.status.description}`);

    for(const title of [...new Set(AmpHtml.match(titleRegex))]){
        html = html.replaceAll(title, `${title} | ${StatuspageStatus}`);
    }

    for(const description of [...new Set(AmpHtml.match(descriptionRegex))]){
        html = html.replaceAll(description, `${description} | ${StatuspageDescription}`);
    }

    console.log(AmpHtml.matchAll(/"\/\/([a-z]|\.)+\/"/g));

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}