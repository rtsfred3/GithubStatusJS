var OFFLINE_CACHE = 'offline';

var offlineCache = [
    './error.html',
    './favicon.ico'
]

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if(choiceResult.outcome === 'accepted'){
            console.log('User accepted the A2HS prompt');
        }else{
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});

self.addEventListener('install', function(event){
    self.skipWaiting();

    var offlinePage = new Request('error.html');
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
                return cache.match('error.html');
            });
        })
    );
});
