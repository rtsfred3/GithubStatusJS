export async function onRequestGet({ request, params, env }) {
    var currDate = new Date();
    currDate.setHours(currDate.getHours(), 0, 0, 0);

    var newBaseUrl = new URL(request.url);

    var date = currDate.toJSON();

    var urls = [
        "/",
        // "/components/",
        "/status/",
        "/amp/",
        // "/amp/test/",
        // "/testing/",
        // "/testing/status/",
        // "/testing/components/",
        "/testing/fb/",
        "/testing/status/",
        "/StatuspageHTML/",
        // "/Statuspage/",
        // "/apps/app/",
        // "/apps/components/",
        // "/apps/lang/",
        // "/apps/min/",
        // "/apps/status/",
        // "/apps/status/french/",
    ]

    var xmlElements = urls.map((url) => `<url><loc>${newBaseUrl.protocol}//${newBaseUrl.host}${url}</loc><lastmod>${date}</lastmod><changefreq>hourly</changefreq></url>`);

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> \
        ${xmlElements.join("")} \
    </urlset>`, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": `max-age=${env.CACHE_AGE_SHORT}, s-maxage=${env.CACHE_AGE_SHORT}, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=${env.CACHE_AGE_SHORT}`
        },
    });
}