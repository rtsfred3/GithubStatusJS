export async function onRequestGet({ request, params, env }) {
    var currDate = new Date();
    currDate.setHours(currDate.getHours(), 0, 0, 0);

    var newBaseUrl = new URL(request.url);

    console.log(currDate);

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

    var newXml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    
    for (const url of urls) {
        newXml += `<url> \
        <loc>${url}</loc> \
        <lastmod>${date}</lastmod> \
        <changefreq>hourly</changefreq> \
    </url>`;
    }

    newXml += '</urlset>';

    /* var xml = '<?xml version="1.0" encoding="UTF-8"?> \
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> \
        <url> \
            <loc>https://githubstat.us/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/components/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/status/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/amp/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/StatuspageHTML/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/Statuspage/</loc> \
            <lastmod>' + date + '</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/app/</loc> \
            <lastmod>2024-03-01</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/components/</loc> \
            <lastmod>2024-03-01</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/lang/</loc> \
            <lastmod>2024-03-01</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/min/</loc> \
            <lastmod>2024-03-01</lastmod> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/status/</loc> \
            <lastmod>2024-03-01</lastmod> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/status/french/</loc> \
            <lastmod>2024-03-01</lastmod> \
        </url> \
    </urlset>'; */

    return new Response(newXml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": `max-age=60, s-maxage=60, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=60`
        },
    });
}