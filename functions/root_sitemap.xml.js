export async function onRequestGet({ request, params, env }) {
    var currDate = new Date();
    currDate.setHours(currDate.getHours(), 0, 0, 0);

    var date = currDate.toJSON();

    var urls = [
        "https://githubstat.us/",
        "https://githubstat.us/components/",
        "https://githubstat.us/status/",
        "https://githubstat.us/amp/",
        "https://githubstat.us/amp_test/",
        "https://githubstat.us/StatuspageHTML/",
        "https://githubstat.us/Statuspage/",
        "https://githubstat.us/apps/app/",
        "https://githubstat.us/apps/components/",
        "https://githubstat.us/apps/lang/",
        "https://githubstat.us/apps/min/",
        "https://githubstat.us/apps/status/",
        "https://githubstat.us/apps/status/french/",
    ]

    // var newXml = '';
    
    // for (const url of urls) {
    //     newXml += `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>hourly</changefreq></url>`;
    // }

    var xmlElements = urls.map((url) => `<url><loc>${url}</loc><lastmod>${date}</lastmod><changefreq>hourly</changefreq></url>`);

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> \
        ${xmlElements.join("")} \
    </urlset>`, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": `max-age=60, s-maxage=60, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=60`
        },
    });
}