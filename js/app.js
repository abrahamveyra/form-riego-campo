//Detectar si podemos usar Service worker
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
}