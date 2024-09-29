// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const initNewsSlider = () => {
//   const newsSlider = document.querySelector('[data-slider="news-tab-slider"]');
//   if (!newsSlider) {
//     return;
//   }

//   new Swiper(newsSlider, {
//     modules: [Navigation, Pagination],
//     navigation: {
//       nextEl: '.news-tab__slider-btn--next',
//       prevEl: '.news-tab__slider-btn--prev',
//       disabledClass: 'is-disabled',
//     },
//     pagination: {
//       el: '.news-tab__slider-pagination',
//       clickable: true,
//       bulletElement: 'button',
//       bulletClass: 'news-tab__slider-bullet',
//       bulletActiveClass: 'news-tab__slider-bullet--is-active',
//       renderBullet: function (index, className) {
//         return '<button class="' + className + '" type="button">' + (index + 1) + '</button>';
//       },
//     },
//     watchOverflow: true,
//     simulateTouch: true,
//     grabCursor: true,
//     speed: 500,
//     loop: false,
//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//         slidesPerGroup: 1,
//         spaceBetween: 0,
//         grid: {
//           rows: 2,
//         },
//       },
//       768: {
//         slidesPerView: 'auto',
//         slidesPerGroup: 2,
//         spaceBetween: 0,
//         grid: {
//           rows: 2,
//         },
//       },
//       1440: {
//         slidesPerView: 'auto',
//         slidesPerGroup: 3,
//         spaceBetween: 32,
//       }
//     },
//     on: {
//       init: function () {
//         updatePagination(this);
//         markFirstSlide(this);
//       },
//       slideChange: function () {
//         updatePagination(this);
//         markFirstSlide(this);
//       },
//     },
//   });

//   function updatePagination(swiper) {
//     const totalSlides = swiper.slides.length;
//     const currentIndex = Math.floor(swiper.activeIndex / 3);
//     const paginationButtons = document.querySelectorAll('.news-tab__slider-bullet');
//     const totalPages = Math.ceil(totalSlides / 3);

//     paginationButtons.forEach((button, index) => {
//       if (totalPages <= 4) {
//         button.style.display = 'inline-block';
//       } else {
//         if (index >= currentIndex - 1 && index <= currentIndex + 2) {
//           button.style.display = 'inline-block';
//         } else {
//           button.style.display = 'none';
//         }
//       }
//     });
//   }

//   function markFirstSlide(swiper) {
//     const slides = swiper.slides;
//     slides.forEach((slide, index) => {
//       slide.classList.remove('news-slide--main');
//       if (index % 3 === 0) {
//         slide.classList.add('news-slide--main');
//       }
//     });
//   }
// };

// export { initNewsSlider };

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
  const travelsSlide = newsSlider.querySelector('.news-slide--travels');
  const volunteeringSlide = newsSlider.querySelector('.news-slide--volunteering');
  if (travelsSlide && volunteeringSlide) {
    const travelsIndex = slides.indexOf(travelsSlide);
    const volunteeringIndex = slides.indexOf(volunteeringSlide);
    if (travelsIndex !== -1 && volunteeringIndex !== -1) {
      slides[travelsIndex].parentNode.insertBefore(volunteeringSlide, slides[travelsIndex]);
      slides[volunteeringIndex].parentNode.insertBefore(travelsSlide, slides[volunteeringIndex]);
    }
  }



  const updatePagination = swiper => {
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
  };

  const markFirstSlide = swiper => {
    swiper.slides.forEach((slide, index) => {
      slide.classList.remove('news-slide--main');
      if (index % swiper.params.slidesPerGroup === 0) {
        slide.classList.add('news-slide--main');
      }
    });
  };

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
      renderBullet: (index, className) => `<button class="${className}" type="button">${index + 1}</button>`,
    },
    watchOverflow: true,
    simulateTouch: true,
    grabCursor: true,
    speed: 500,
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
      },
      768: {
        // slidesPerView: 4,
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        spaceBetween: 0,
        grid: {
          rows: 2,
        },
      },
      1440: {
        // slidesPerView: 3,
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        spaceBetween: 32,
      }
    },
    on: {
      init: swiper => {
        updatePagination(swiper);
        markFirstSlide(swiper);
      },
      slideChange: swiper => {
        updatePagination(swiper);
        markFirstSlide(swiper);
      },
    },
  });
};

export { initNewsSlider };
