import AmpHtml from "../amp/index.html";

import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

export async function onRequestGet({ params, env }) {
    var html = StatuspageAmpHtml.replace('spstat.us', `${window.location.hostname}`);

    return new Response(html, {
        headers: {
            "Content-Type": "application/html",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}