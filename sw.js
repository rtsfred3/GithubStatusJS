var CACHE_NAME = 'GithubStatus';

var urlsToCache = [
  './',

  './styling/github.css',
  './styling/github.min.css',
  './styling/messages.css',
  './styling/messages.min.css',

  './js/app.js',
  './js/app.min.js',

  './img/48px.png',
  './img/72px.png',
  './img/76px.png',
  './img/96px.png',
  './img/120px.png',
  './img/128px.png',
  './img/144px.png',
  './img/152px.png',
  './img/180px.png',
  './img/192px.png',
  './img/512px.png',
  './img/1024px.png'
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
        caches.match(event.request).then(function(cachedResponse){
            return cachedResponse || fetch(event.request);
        })
    );
});
