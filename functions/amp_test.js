import AmpHtml from "../amp/index.html";

import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

export async function onRequestGet({ request, params, env }) {
    console.log(request.url);

    // var html = StatuspageAmpHtml.replace('spstat.us', 'githubstat.us');

    return new Response(AmpHtml, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}