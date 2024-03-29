var CACHE_NAME = 'GithubStatus';

var urlsToCache = [
    './',
    './js/dicts.js',
    './js/StatuspageHTML.js',
    
    // './styling/main.min.css',
    // './js/main.min.js',

    './img/144px.png'
];

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
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function(){ return caches.match(event.request); })
    );
});

self.addEventListener('periodicsync', function(event) {
    if (event.tag === 'get-latest') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache){
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
        );
    }
});
