// Utility ADHD — service worker
// IMPORTANT: if you rename the GitHub repo, update REPO below to match exactly (case-sensitive).
const REPO = '/Utility-ADHD/';
const CACHE_NAME = 'utility-adhd-v1';

const CORE_ASSETS = [
  REPO,
  REPO + 'index.html',
  REPO + 'manifest.json',
  REPO + 'icons/icon-192.png',
  REPO + 'icons/icon-512.png',
  REPO + 'icons/icon-512-maskable.png',
  REPO + 'icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for core app files, network-first fallback for everything else (e.g. Google Fonts, API calls)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isCoreAsset = url.origin === self.location.origin && CORE_ASSETS.some(a => req.url.endsWith(a) || url.pathname === a);

  if (isCoreAsset) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Don't try to cache opaque/cross-origin API calls (e.g. api.anthropic.com)
        return res;
      })
      .catch(() => caches.match(req))
  );
});
