var CACHE_NAME = 'GithubStatus';
var urlsToCache = [
  './',
  './github.css',
  './tables.css',
  './app.js',

  '../img/128x128.png',
  '../img/refresh.svg',
];

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnAdd.style.display = 'block';
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
