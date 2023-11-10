export async function onRequestGet({ params, env }) {
    var currDate = new Date();
    currDate.setHours(currDate.getHours(), 0, 0);
    // currDate.setMinutes(0);
    // currDate.setSeconds(0);

    console.log(currDate);

    let date = new Date().toJSON();

    var xml = '<?xml version="1.0" encoding="UTF-8"?> \
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
            <loc>https://githubstat.us/apps/app/</loc> \
            <lastmod>2021-02-26</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/components/</loc> \
            <lastmod>2021-02-26</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/lang/</loc> \
            <lastmod>2021-02-26</lastmod> \
            <changefreq>hourly</changefreq> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/min/</loc> \
            <lastmod>2021-02-26</lastmod> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/status/</loc> \
            <lastmod>2021-02-26</lastmod> \
        </url> \
        <url> \
            <loc>https://githubstat.us/apps/status/french/</loc> \
            <lastmod>2021-02-26</lastmod> \
        </url> \
    </urlset>';

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": `max-age=60, s-maxage=60, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=60`
        },
    });
}