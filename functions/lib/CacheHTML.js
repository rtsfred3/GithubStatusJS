import TimeSpans from './TimeSpans.js';
import HeaderTypes from './HeaderTypes.js';
import StatuspageKV from './StatuspageKV.js';

import CustomHeaders from './CustomHeaders.js';

export default async function CacheHTML(context, _html, _path) {
    const cache = caches.default;
    const ClouldflareCache = TimeSpans.Week * 2;
    const KvCache = context.env.CACHE_AGE_SHORT;
    const StatuspageStatusKV = context.env.StatuspageStatus;

    const bypassCache = /^true$/i.test(await StatuspageStatusKV.get(StatuspageKV.BypassCache));

    var _headers = CustomHeaders("text/html; charset=utf-8", ClouldflareCache);

    var CanonicalUrl = new URL(context.request.url);
    const cacheKey = new Request(CanonicalUrl.toString(), context.request);
    
    let response = await cache.match(cacheKey);

    if (response && !bypassCache) {
        console.log(`Clouldflare Cache max-age: ${ClouldflareCache}`);
        console.log(`Age: ${parseInt(response.headers.get(HeaderTypes.Age))}`);

        if (parseInt(response.headers.get(HeaderTypes.Age)) < ClouldflareCache) {
            console.log("Cache Hit");

            _headers.set(HeaderTypes.Age, response.headers.get(HeaderTypes.Age));
            _headers.set(HeaderTypes.CfCacheStatus, response.headers.get(HeaderTypes.CfCacheStatus));
            _headers.set('bunny', true);

            return response;
        } 
    }

    response = new Response(_html, { headers: _headers });

    if (!bypassCache) {
        context.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
}