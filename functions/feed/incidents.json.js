export async function onRequestGet({ params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(`/api/v2/incidents.json`).all();
    
    var incidents = JSON.parse(results.find((t) => t["route"] == `/api/v2/incidents.json`).data);

    console.log(incidents);

    // var updated_on = new Date(results[0].updated_on);
    // var age = parseInt(((new Date()) - updated_on) / 1000);

    var incidentsJson = {
        "version": "https://jsonfeed.org/version/1",
        "title": "GitHub Incidents Feed",
        "home_page_url": "https://githubstat.us/",
        "items": [],
    };

    return new Response(JSON.stringify(incidentsJson, null, 2), {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=60, public"
        },
    });
}