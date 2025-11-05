[{"revision":null,"url":"assets/index-B-jhBDtt.css"},{"revision":null,"url":"assets/index-DXtH33-E.js"},{"revision":null,"url":"assets/workbox-window.prod.es5-CwtvwXb3.js"},{"revision":"1e1e01dfeb4b7e2c59894095cd981d5c","url":"index.html"},{"revision":"0158e5ce89a909fbe731c8e76e80eeaa","url":"sw.js"},{"revision":"d14ffe22a32fc2f24fc8a8644e59e778","url":"manifest.webmanifest"}];

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SHOW_NOTIFICATION') {
    const { name, image, body } = event.data.payload;
    self.registration.showNotification(name, {
      body,
      icon: image,
      image,
      badge: image
    });
  }
});
