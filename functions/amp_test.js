import AmpHtml from "../amp/index.html";

// import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function onRequestGet({ request, params, env }) {
    var StatuspageUrl = 'www.githubstatus.com';
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    // var title = 'GitHub Status - AMP';
    var description = 'A minified AMP website to monitor GitHub status updates.';

    const statusRes = await fetch(`https://${StatuspageUrl}/api/v2/status.json`);
    const statusData = await statusRes.json();

    var status = statusData.status.indicator == "none" ? "good" : statusData.status.indicator;
    status = capitalizeFirstLetter(status);

    var html = AmpHtml.replaceAll(oldBaseUrl, newBaseUrl.host);
    // html = html.replaceAll(title, `${title} | ${status}`);
    html = html.replaceAll(description, `${description} | ${statusData.status.description}`);

    let titles = [...new Set(AmpHtml.match(/[A-Za-z]* Status - AMP/g))];

    for(const tTitle of titles){
        html = html.replaceAll(tTitle, `${tTitle} | ${status}`);
    }

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}