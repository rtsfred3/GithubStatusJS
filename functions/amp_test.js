import AmpHtml from "../amp/index.html";

import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

export async function onRequestGet({ request, params, env }) {
    var baseUrl = new URL(request.url);
    console.log(baseUrl.hostname);

    var html = StatuspageAmpHtml.replace('spstat.us', 'githubstat.us');

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}