import Path from '../lib/Path.js';
import ModifyHTML from '../lib/ModifyHTML.js';

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const cacheKey = new Request(url.toString(), context.request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);
    
    if (response) {
        console.log(`Cache hit for: ${request.url}.`);
        return response;
    }

    response = await ModifyHTML(context.request, context.env, Path.Amp);
    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
}