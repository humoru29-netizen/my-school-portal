/* Faith International School Portal — Service Worker
   Caches the app shell so the portal loads instantly and works offline
   for the UI. Firebase data still requires an internet connection.
*/

const CACHE_NAME = "fis-portal-v1";
const SHELL_ASSETS = [
  "./portal.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./crest-256.png",
  "./crest-128.png"
];

// Install: pre-cache the app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - HTML / app shell → network-first, fall back to cache
// - Icons / static → cache-first
// - Everything else (Firebase, CDN) → network only
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin (Firebase, Google APIs, etc.)
  if (event.request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // App shell files
  if (
    url.pathname.endsWith("portal.html") ||
    url.pathname.endsWith("manifest.json") ||
    url.pathname.includes("/icons/")
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          const cached = await cache.match(event.request);
          if (cached) return cached;
          // Fallback to portal.html for navigation
          if (event.request.mode === "navigate") {
            return cache.match("./portal.html");
          }
          throw err;
        }
      })
    );
    return;
  }
});
