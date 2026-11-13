// Messmittel W97.1: Probe-Seite und Bibliothek offline aus dem Speicher (Muster H16: Huelle «Speicher zuerst»)
const C="scan-probe-1";
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","zxing-library.js","manifest.json"])).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request))));
