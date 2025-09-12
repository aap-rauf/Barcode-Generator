const CACHE_NAME = "barcode-cache-v4"; // bumped version
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json?v=3",
  "./app.js",
  "./icon-rounded-192.png?v=3",
  "./icon-rounded-512.png?v=3"
];

// Install event → cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.addEventListener('install', () => console.log('[SW] install'));
  self.addEventListener('activate', () => console.log('[SW] activate'));
});

// Activate event → delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event → serve from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
