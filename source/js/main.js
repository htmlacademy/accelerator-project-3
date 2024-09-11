import { lazyLoadImages } from '../js/modules/utils/utils';
import { initBurgerMenu } from '../js/modules/burger-menu';
import { initHeroSlider } from '../js/modules/sliders/hero-slider';

window.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  initBurgerMenu();
  initHeroSlider();

  window.addEventListener('load', () => {
  });
});
