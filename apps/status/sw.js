var OFFLINE_CACHE = 'min_offline';

var offlineFile = 'error.html';

self.addEventListener('install', function(event) {
    self.skipWaiting();

    var offlinePage = new Request(offlineFile);
    event.waitUntil(
        fetch(offlinePage).then(function(response) {
            return caches.open(OFFLINE_CACHE).then(function(cache) {
                return cache.put(offlinePage, response);
            });
        }));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function(error) {
            return caches.open(OFFLINE_CACHE).then(function(cache) {
                return cache.match(offlineFile);
            });
        }));
});

self.addEventListener('refreshOffline', function(response) {
    return caches.open(OFFLINE_CACHE).then(function(cache) {
        return cache.put(offlinePage, response);
    });
});
