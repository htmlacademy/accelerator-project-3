import { lazyLoadImages } from '../js/modules/utils/utils';
import { initBurgerMenu } from '../js/modules/burger-menu';
import { initHeroSlider } from '../js/modules/sliders/hero-slider';
import { initProgramsSlider } from '../js/modules/sliders/programs-slider';

window.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  initBurgerMenu();
  initHeroSlider();
  initProgramsSlider();

  window.addEventListener('load', () => {
  });
});
