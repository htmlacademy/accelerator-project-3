import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const initNewsSlider = () => {
  const newsSlider = document.querySelector('[data-slider="news-tab-slider"]');
  if (!newsSlider) return;

  // Дублирование слайдов для обеспечения 4 буллетов пагинации на всех разрешениях
  const slides = Array.from(newsSlider.querySelectorAll('.swiper-slide'));
  const totalSlides = slides.length;
  const slidesToDuplicate = 12 - totalSlides; // 12 слайдов для 4 буллетов по 3 слайда

  for (let i = 0; i < slidesToDuplicate; i++) {
    const clone = slides[i % totalSlides].cloneNode(true);
    newsSlider.querySelector('.swiper-wrapper').appendChild(clone);
  }

  // Меняем местами слайды для разрешений от 768px до 1440px
  rearrangeSlides();

  new Swiper(newsSlider, {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.news-tab__slider-btn--next',
      prevEl: '.news-tab__slider-btn--prev',
      disabledClass: 'is-disabled',
    },
    pagination: {
      el: '.news-tab__slider-pagination',
      clickable: true,
      bulletElement: 'button',
      bulletClass: 'news-tab__slider-bullet',
      bulletActiveClass: 'news-tab__slider-bullet--is-active',
      renderBullet: function (index, className) {
        return `<button class="${className}" type="button">${index + 1}</button>`;
      },
    },
    watchOverflow: true,
    simulateTouch: true,
    grabCursor: true,
    speed: 500,
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        spaceBetween: 16,
        grid: {
          rows: 2,
        },
      },
      1440: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        spaceBetween: 32,
      }
    },
    on: {
      init: function (swiper) {
        updatePagination(swiper);
        markFirstSlide(swiper);
      },
      slideChange: function (swiper) {
        updatePagination(swiper);
        markFirstSlide(swiper);
      },
    },
  });

  function updatePagination(swiper) {
    const totalSlides = swiper.slides.length;
    const currentIndex = Math.floor(swiper.activeIndex / swiper.params.slidesPerGroup);
    const paginationButtons = document.querySelectorAll('.news-tab__slider-bullet');
    const totalPages = Math.ceil(totalSlides / swiper.params.slidesPerGroup);

    paginationButtons.forEach((button, index) => {
      if (totalPages <= 4) {
        button.style.display = 'inline-block';
      } else {
        button.style.display = (index >= currentIndex - 1 && index <= currentIndex + 2) ? 'inline-block' : 'none';
      }
    });
  }

  function markFirstSlide(swiper) {
    swiper.slides.forEach((slide, index) => {
      slide.classList.remove('news-slide--main');
      if (index % swiper.params.slidesPerGroup === 0) {
        slide.classList.add('news-slide--main');
      }
    });
  }

  function rearrangeSlides() {
    const wrapper = newsSlider.querySelector('.swiper-wrapper');
    const travelsSlide = wrapper.querySelector('.news-slide--travels');
    const volunteeringSlide = wrapper.querySelector('.news-slide--volunteering');
    if (travelsSlide && volunteeringSlide) {
      wrapper.insertBefore(volunteeringSlide, travelsSlide);
    }
  }
};

export { initNewsSlider };
