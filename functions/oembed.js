export async function onRequestGet({ params, env }) {
    const db = env.CACHE_DB;
    const table = env.TABLE;

    const { results } = await db.prepare(`SELECT * FROM ${table} WHERE route = ?`).bind(`/api/v2/status.json`).first();

    var result = results;

    console.log(result);

    var info = JSON.stringify(result, null, 2);
    
    return new Response(info, {
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "Cache-Control": "max-age=3600, public"
        },
    });
}