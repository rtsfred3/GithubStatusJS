var CACHE_NAME = 'GithubStatus';
var urlsToCache = [
  './',
  './styling/github.min.css',
  './styling/tables.min.css',
  './js/app.min.js',,
  './manifest.json',

  './img/128x128.png',
  './img/144x144.png',
  './img/refresh.svg',
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

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
