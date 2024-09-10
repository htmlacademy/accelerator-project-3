import { lazyLoadImages } from '../js/modules/utils/utils';
import { initBurgerMenu } from '../js/modules/burger-menu';

window.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  initBurgerMenu();

  window.addEventListener('load', () => {
  });
});
