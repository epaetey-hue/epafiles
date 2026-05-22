// ⚠️ Incrémente ce numéro à chaque modification pour forcer la mise à jour
const VERSION = 'epafiles-v1';

const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon.svg',
];

// ── Installation : met en cache tous les fichiers de l'app
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting()) // Prend effet immédiatement
  );
});

// ── Activation : supprime les anciens caches et notifie l'app
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Notifie tous les onglets ouverts qu'une mise à jour est disponible
        self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
          clients.forEach(client => client.postMessage({ type: 'APP_UPDATED', version: VERSION }));
        });
      })
  );
});

// ── Interception des requêtes : cache en priorité, réseau en fallback
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Polices Google : réseau d'abord, cache en fallback
  if (e.request.url.includes('fonts.googleapis') || e.request.url.includes('fonts.gstatic')) {
    e.respondWith(
      caches.open(VERSION).then(c =>
        fetch(e.request)
          .then(r => { c.put(e.request, r.clone()); return r; })
          .catch(() => c.match(e.request))
      )
    );
    return;
  }

  // Fichiers de l'app : cache d'abord
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
