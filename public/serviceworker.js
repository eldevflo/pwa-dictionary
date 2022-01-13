let cacheData = 'appV-1';
let dynamicCacheName = 'site-dynamicCach-v1'
let self = this;
//cache size limit function
const limitCacheSize = (name , size) => {
    caches.open(name).then(cache =>{
        cache.keys().then(keys=>{
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};
self.addEventListener('install' , (event) => {
    event.waitUntil(
        caches.open(cacheData).then(catche => {
            catche.addAll([
                'static/js/main.chunk.js',
                'static/js/0.chunk.js',
                'static/js/bundle.js',
                '/index.html',
                '/',
            ]);
        })
    )
});
self.addEventListener('fetch' , (event) => {
     if (!(event.request.url.indexOf('http') === 0)) return; 
        event.respondWith(
            caches.match(event.request).then((catchResp)=>{
                return catchResp || fetch(event.request).then(fetchRes=>{
                    return caches.open(dynamicCacheName).then(cache =>{
                        cache?.put(event.request.url , fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    })
                })
            }).catch(() => {
                if(event.request.url.indexOf('.html') > -1){
                return caches.match('/')
                }
            })
        );
    });
self.addEventListener('activate' , (event) => {
    event.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys.filter(key => key !== cacheData && key !== dynamicCacheName))
                .map(key => caches.delete(key))
        })
    )
   
});