if (window.navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register');
} else {
  window.navigator.serviceWorker
    .register('js/sw.js', {
      scope: './',
    })
    .then((reg) => {
      console.log(`Service worker has been registered for scope: ${reg.scope}`);
    });
}
