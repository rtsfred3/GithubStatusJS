function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function onRequestGet({ params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(`/api/v2/status.json`).all();

    var statusResult = JSON.parse(results[0].data);

    var status = statusResult["status"]["indicator"] == "none" ? "Good" : capitalizeFirstLetter(statusResult["status"]["indicator"]);

    console.log(statusResult);

    var result = {
        "version": "1.0",
        "type": "photo",
        "title": `GitHub Status: ${status} - ${statusResult["status"]["description"]}`,
        "width": 300,
        "height": 300,
        "url": "https://githubstat.us/img/status-min.png",
        "thumbnail_url": "https://githubstat.us/img/status-min.png",
        "provider_name": "GitHub Status oEmbed",
        "provider_url": "https://githubstat.us/",
        "author_name": "GitHub Status oEmbed",
        "author_url": "https://githubstat.us/"
    };

    var info = JSON.stringify(result, null, 2);
    
    return new Response(info, {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}