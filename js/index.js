import './menu.js';
import './custom-select.js';

const adBannersSwiper = new Swiper('.ad-banners .swiper', {
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.ad-banners .ad-banners__slider-controls-next',
    prevEl: '.ad-banners .ad-banners__slider-controls-prev',
  },
});
