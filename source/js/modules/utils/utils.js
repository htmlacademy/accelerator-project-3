const lazyLoadImages = () => {
  if (document.querySelectorAll('img')) {
    const images = document.querySelectorAll('img');
    images.forEach((image, index) => {
      if (index !== 0) {
        image.setAttribute('loading', 'lazy');
      }
    });
  }
};

export { lazyLoadImages };
