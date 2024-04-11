import Html from "../index.html";

import CustomHeaders from './lib/CustomHeaders.js';

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const cacheKey = new Request(url.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (response) {
        return response;
    }
    
    response = new Response(Html, {
        headers: CustomHeaders("text/html; charset=utf-8", context.env.CACHE_AGE),
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
}