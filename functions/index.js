import Html from "../n_index.html";

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const cacheKey = new Request(url.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (response) {
        return response;
    }
    
    response = new Response(Html, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "access-control-allow-origin": "*",
            "X__X": "TEST",
            "Cache-Control": `max-age=${context.env.CACHE_AGE}, s-maxage=${context.env.CACHE_AGE}, public`,
            "Cloudflare-CDN-Cache-Control": `max-age=${context.env.CACHE_AGE}`
        },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
}