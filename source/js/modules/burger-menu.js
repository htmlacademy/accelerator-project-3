const initBurgerMenu = () => {
  const burgerButton = document.querySelector('[data-element="nav__button"]');
  const menu = document.querySelector('[data-element="menu"]');
  const body = document.body;
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => {
    burgerButton.classList.toggle('is-open');
    menu.classList.toggle('is-open');
    body.classList.toggle('no-scroll');
    overlay.classList.toggle('is-visible');
  };

  const closeMenu = () => {
    burgerButton.classList.remove('is-open');
    menu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    overlay.classList.remove('is-visible');
    setSubmenuTabIndex(-1);
  };

  const setSubmenuTabIndex = (index) => {
    const submenus = menu.querySelectorAll('.nav__submenu-list a');
    submenus.forEach(link => {
      link.tabIndex = index;
    });
  };

  const toggleSubmenu = (submenu, isOpen) => {
    const links = submenu.querySelectorAll('a');
    links.forEach(link => {
      link.tabIndex = isOpen ? 0 : -1;
    });
  };

  burgerButton.addEventListener('click', () => {
    toggleMenu();
    if (!menu.classList.contains('is-open')) {
      setSubmenuTabIndex(-1);
    }
  });

  menu.addEventListener('click', (event) => {
    const target = event.target;
    const submenu = target.nextElementSibling;

    if (target.tagName === 'A' && submenu && submenu.classList.contains('nav__submenu-list')) {
      const isOpen = target.classList.toggle('is-open');
      event.preventDefault();
      submenu.classList.toggle('is-open');
      toggleSubmenu(submenu, isOpen);
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

  setSubmenuTabIndex(-1);
};

export { initBurgerMenu };
