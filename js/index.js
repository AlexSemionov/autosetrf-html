// menu

const burgerButton = document.querySelector('.header__burger');
const mainNav = document.querySelector('.main-nav');

if (burgerButton && mainNav) {
  burgerButton.addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('hidden');
  });

  mainNav.addEventListener('click', (event) => {
    const isNavLink = event.target.classList.contains('main-nav__nav-item-link');
    const isContactsLink = event.target.classList.contains('main-nav__contacts-link');
    const isInfoLink = event.target.classList.contains('main-nav__info-text-link');

    if (isNavLink || isContactsLink || isInfoLink) {
      event.currentTarget.classList.remove('active');
      burgerButton.classList.remove('active');
      document.body.classList.remove('hidden');
    }
  });
}

// custom-select

const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach((customSelect) => {
  initSelect(customSelect);
});

function initSelect(customSelect) {
  const selectElem = customSelect.querySelector('select');
  const placeholder = selectElem.getAttribute('placeholder');
  const options = [...selectElem.options].filter((option) => !option.disabled);

  const selectOverlay = document.createElement('div');
  selectOverlay.setAttribute('class', 'custom-select__overlay custom-select__hide');

  const selectSelected = document.createElement('div');
  selectSelected.classList.add('custom-select__selected');
  selectSelected.innerHTML = `<span class="custom-select__selected-text">${
    selectElem.options[selectElem.selectedIndex].innerHTML
  }</span>`;

  if (placeholder) selectSelected.innerHTML = `<span>${placeholder}</span>`;

  const selectItems = document.createElement('div');
  selectItems.setAttribute('class', 'custom-select__items custom-select__hide');

  [...options].forEach((option, index) => {
    const optionElem = document.createElement('div');
    optionElem.classList.add('custom-select__item');
    optionElem.innerHTML = option.innerHTML;
    if (index === 0) optionElem.classList.add('custom-select__same-as-selected');
    selectItems.append(optionElem);

    optionElem.addEventListener('click', () => {
      const sameAsSelected = selectItems.querySelector('.custom-select__same-as-selected');
      const changeEvent = new Event('change');
      selectSelected.innerHTML = `<span class="custom-select__selected-text">${option.innerHTML}</span>`;
      selectElem.value = option.value;
      customSelect.dataset.value = selectElem.value;
      sameAsSelected.classList.remove('custom-select__same-as-selected');
      optionElem.classList.add('custom-select__same-as-selected');
      selectElem.dispatchEvent(changeEvent);
      closeAllSelect();
    });
  });

  customSelect.append(selectSelected, selectItems, selectOverlay);

  selectSelected.addEventListener('click', function (event) {
    event.stopPropagation();
    closeAllSelect();
    event.currentTarget.classList.add('active');
    selectOverlay.classList.remove('custom-select__hide');
    selectItems.classList.remove('custom-select__hide');
  });

  selectOverlay.addEventListener('click', closeAllSelect);
}

function closeAllSelect() {
  customSelects.forEach((customSelect) => {
    const selectOverlayElement = customSelect.querySelector('.custom-select__overlay');
    const selectItemElement = customSelect.querySelector('.custom-select__items');
    const selectSelectedElement = customSelect.querySelector('.custom-select__selected');

    selectSelectedElement.classList.remove('active');
    selectItemElement.classList.add('custom-select__hide');
    selectOverlayElement.classList.add('custom-select__hide');
  });
}

// filter

const filterTabButtons = document.querySelectorAll('.filter__controls-button');
const filterInfoBlocks = document.querySelectorAll('.filter__controls-info');
const filterTabs = document.querySelectorAll('.filter__tab');
const filterAdvancedButton = document.querySelector('.filter__tabs-controls-advanced');

filterTabButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetId = event.currentTarget.dataset.target;

    filterInfoBlocks.forEach((block) => {
      if (block.classList.contains(`filter__controls-info_${targetId}`)) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });

    filterTabs.forEach((tab) => {
      if (tab.getAttribute('id') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    filterTabButtons.forEach((button) => {
      if (button === event.currentTarget) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  });
});

if (filterAdvancedButton) {
  filterAdvancedButton.addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('active');
    if (event.currentTarget.classList.contains('active')) {
      filterTabs.forEach((tab) => tab.classList.add('advanced'));
    } else {
      filterTabs.forEach((tab) => tab.classList.remove('advanced'));
    }
  });
}

// slider

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
