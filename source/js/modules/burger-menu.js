const initBurgerMenu = () => {
  const burgerButton = document.querySelector('.burger-button');
  const menu = document.querySelector('.menu');
  const body = document.body;
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => {
    burgerButton.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    body.classList.toggle('no-scroll');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
  };

  const closeMenu = () => {
    burgerButton.classList.remove('is-open');
    menu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    overlay.style.display = 'none';
  };

  burgerButton.addEventListener('click', toggleMenu);

  menu.addEventListener('click', event => {
    const target = event.target;
    const submenu = target.nextElementSibling;

    if (target.tagName === 'A' && submenu && submenu.classList.contains('submenu')) {
      event.preventDefault();
      submenu.classList.toggle('is-open');
    } else if (target.tagName === 'A') {
      closeMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
};

export { initBurgerMenu }
