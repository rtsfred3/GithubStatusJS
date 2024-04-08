import AmpHtml from "../amp/index.html";

import StatuspageAmpHtml from "../StatuspageHTML/amp/index.html";

export async function onRequestGet({ params, env }) {
    StatuspageAmpHtml = StatuspageAmpHtml.replace('spstat.us', `${hostname}`);

    return new Response(StatuspageAmpHtml, {
        headers: {
            "Content-Type": "application/html",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}