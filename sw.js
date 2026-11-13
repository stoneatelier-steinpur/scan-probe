// Messmittel W97.1: Probe-Seite und Bibliothek offline aus dem Speicher (Muster H16: Huelle «Speicher zuerst»)
const C="scan-probe-3";
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","zxing-library.js","manifest.json"])).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))); /* alte Fassung weg */
/* Probe 3: Seite zuerst aus dem Netz (neue Fassung sofort), ohne Netz aus dem Speicher; Bibliothek Speicher zuerst */
self.addEventListener("fetch",e=>{const u=new URL(e.request.url),seite=e.request.mode==="navigate"||u.pathname.endsWith(".html");
  e.respondWith(seite?fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}))
    :caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));});
