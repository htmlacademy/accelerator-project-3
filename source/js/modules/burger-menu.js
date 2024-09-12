const initBurgerMenu = () => {
  const burgerButton = document.querySelector('[data-element="nav__button"]');
  const menu = document.querySelector('[data-element="menu"]');
  const body = document.body;
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => {
    const isOpen = burgerButton.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    body.classList.toggle('no-scroll');
    overlay.classList.toggle('is-visible');
    setMenuTabIndex(isOpen ? 0 : -1);
  };

  const closeMenu = () => {
    burgerButton.classList.remove('is-open');
    menu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    overlay.classList.remove('is-visible');
    setMenuTabIndex(-1);
  };

  const setMenuTabIndex = (index) => {
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.tabIndex = index;
    });
  };

  burgerButton.addEventListener('click', () => {
    toggleMenu();
  });

  menu.addEventListener('click', (event) => {
    const target = event.target;
    const submenu = target.nextElementSibling;

    if (target.tagName === 'A' && submenu && submenu.classList.contains('nav__submenu-list')) {
      const isOpen = target.classList.toggle('is-open');
      event.preventDefault();
      submenu.classList.toggle('is-open');
      setMenuTabIndex(isOpen ? 0 : -1);
    } else if (target.tagName === 'A') {
      closeMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  setMenuTabIndex(-1);
};

export { initBurgerMenu };
