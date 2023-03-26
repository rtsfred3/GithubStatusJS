var OFFLINE_CACHE = 'min_offline';

var offlineFile = 'index.html';

function PeriodSyncUpdateFiles(){
    const periodicSync = self.registration.periodicSync;

    periodicSync.register('update-files', { minInterval: 24 * 60 * 60 * 1000 }).catch(function(err) {
        console.log(err);
    });
}

self.addEventListener('install', function(event) {
    self.skipWaiting();

    var offlinePage = new Request(offlineFile);
    event.waitUntil(
        fetch(offlinePage).then(function(response) {
            return caches.open(OFFLINE_CACHE).then(function(cache) {
                return cache.put(offlinePage, response);
            });
        }));
        
    PeriodSyncUpdateFiles();
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

self.addEventListener('sync', (event) => {
    if (event.tag === 'update-files') {
        console.log(event.tag);
        
        var offlinePage = new Request(offlineFile);
        
        event.waitUntil(
            fetch(offlinePage).then(function(response) {
                return caches.open(OFFLINE_CACHE).then(function(cache) {
                    return cache.put(offlinePage, response);
                });
            })
        );
    }
});

self.addEventListener('periodicSync', (event) => {
    if (event.tag === 'update-files') {
        console.log(event.tag);
        
        var offlinePage = new Request(offlineFile);
        
        event.waitUntil(
            fetch(offlinePage).then(function(response) {
                return caches.open(OFFLINE_CACHE).then(function(cache) {
                    return cache.put(offlinePage, response);
                });
            })
        );
    }
});
