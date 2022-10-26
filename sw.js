
//const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v2';

function limpiarCache(cacheName, numeroItems){

   caches.open( cacheName)
   .then( cache => {

 return cache.keys()
   .then( keys => {

    if(keys.length > numeroItems){
        cache.delete( keys[0] )
        .then( limpiarCache(cacheName, numeroItems) )
    }

   })

   })

}

self.addEventListener( 'install', e => {

    const cacheprom = caches.open(CACHE_STATIC_NAME)
    .then( cache => {
    
    return cache.addAll([
        '/',
        '/index.html',
        '/estilos/formularios.css',
        '/imagenes/bac-imag.webp',
        '/imagenes/ElCerezoOriginal.webp',
        'js/suelos.js',
        'js/ciclos.js',
        'js/estaciones.js',
        'js/app.js',
        'https://api.gec.org.mx/api/riegos/getFormCiclos',
        'https://api.gec.org.mx/api/riegos/getFormEstaciones',
        'https://api.gec.org.mx/api/riegos/getFormSuelos',
        'https://api.gec.org.mx/api/getCecos/'
       ]);

    });

    const cacheinmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then( cache => {
       
       return cache.addAll([
            'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js',
            '//cdn.jsdelivr.net/npm/sweetalert2@11',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css'
       ]);

    })

    e.waitUntil(Promise.all([cacheinmutable, cacheprom]));
});

self.addEventListener('activate', e => {

    const respuesta =  caches.keys().then(keys => {
  
  keys.forEach( key => {
      if(key != CACHE_STATIC_NAME && key.includes('static')){
          return caches.delete(key);
      }
  })
  
      })
  
   e.waitUntil(respuesta)
  
  })

self.addEventListener( 'fetch', e =>{

    //4.- cache with network update

    /*if(e.request.url.includes('bootstrap') || e.request.url.includes('jquery') || e.request.url.includes('sweetalert2@11')){
       return e.respondWith( caches.match(e.request))
    }

   const respuesta = caches.open(  CACHE_STATIC_NAME ).then( cache => {
       
        fetch(e.request).then( newResp => cache.put( e.request, newResp));

        return cache.match( e.request);
     
    });

    e.respondWith(respuesta);*/

    //3- network with cache fallback
    

    //2.- cache with network fallback
   const respuesta = caches.match( e.request)
    .then( res => {
        if(res) return res;
   

        //no existe el archivo
        //tengo que ir  ala red
        console.log('No existe el archivo: ', e.request.url)

      return  fetch( e.request )
      .then( newResp => {
        caches.open(CACHE_DYNAMIC_NAME)
        .then( cache => {
            cache.put(e.request, newResp)
            limpiarCache(CACHE_DYNAMIC_NAME,50)
        } )
        return newResp.clone();
      })
    } );

    e.respondWith(respuesta);

    //1.-Cache only
   // e.respondWith( caches.match( e.request ) )

})