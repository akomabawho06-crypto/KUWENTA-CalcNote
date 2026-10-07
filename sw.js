// Kuwenta service worker: offline app shell. Bump V when you publish a new version.
const V = 'kuwenta-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    if (r.mode === 'navigate') {
      // network first so updates arrive, cached copy when offline
      e.respondWith(
        fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put('./', cp)); return res; })
          .catch(() => caches.match('./').then(x => x || caches.match('index.html')))
      );
      return;
    }
    e.respondWith(
      caches.match(r).then(x => x || fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; }))
    );
  } else if (/(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    // fonts: cache after first load. Sync/rates requests are never intercepted.
    e.respondWith(
      caches.open(V).then(c => c.match(r).then(x => x || fetch(r).then(res => { c.put(r, res.clone()); return res; }).catch(() => x)))
    );
  }
});
