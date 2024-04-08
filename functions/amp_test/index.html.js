import AmpHtml from "../amp/index.html";

import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

export async function onRequestGet({ request, params, env }) {
    var newBaseUrl = new URL(request.url);
    var oldBaseUrl = "githubstat.us";
    var title = "GitHub Status - AMP";
    var description = 'A minified AMP website to monitor GitHub status updates.';

    const statusRes = await fetch("https://www.githubstatus.com/api/v2/status.json");
    const statusData = await statusRes.json();

    var status = statusData.status.indicator == "none" ? "Good" : statusData.status.indicator;

    var html = AmpHtml.replace(oldBaseUrl, newBaseUrl);
    html = html.replace(title, `${title} | ${statusData.status.description}`);
    html = html.replace(description, `${description} | ${statusData.status.description}`);

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}