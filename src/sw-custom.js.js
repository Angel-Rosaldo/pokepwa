self.__WB_MANIFEST;

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
