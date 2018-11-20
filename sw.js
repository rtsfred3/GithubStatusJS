var CACHE_NAME = 'GithubStatus';
var OFFLINE_CACHE = 'offline';

var urlsToCache = [
  './',
  './error.html',

  './styling/github.css',
  './styling/github.min.css',
  './styling/messages.css',
  './styling/messages.min.css',

  './js/app.js',
  './js/app.min.js',

  './manifest.json',

  './img/48x48.png',
  './img/72x72.png',
  './img/76x76.png',
  './img/96x96.png',
  './img/120x120.png',
  './img/128x128.png',
  './img/144x144.png',
  './img/152x152.png',
  './img/180x180.png',
  './img/192x192.png',
  './img/512x512.png',
  './img/1024x1024.png'
];

var offlineCache = [
    './error.html',
    './img/128x128.png'
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
    event.waitUntil(
        /*caches.open(CACHE_NAME).then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })*/
        caches.open(OFFLINE_CACHE).then(function(cache){
            console.log('Opened cache');
            return cache.addAll(offlineCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        /*caches.match(event.request).then(function(cachedResponse){
            return cachedResponse || fetch(event.request);
        })*/
        fetch(event.request).catch(function(error) {
            return caches.open(OFFLINE_CACHE).then(function(cache) {
                return cache.match('error.html');
            });
        })
    );
});
