const CACHE_NAME = "myapp-v1.1"; // change this version number when you update

const ASSETS = [
  "/", 
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json"
];

// Install - cache app files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  console.log("Service Worker installed:", CACHE_NAME);
});

// Activate - remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  console.log("Service Worker active:", CACHE_NAME);
});

// Fetch - serve from cache first, then network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
    )
  );
});
