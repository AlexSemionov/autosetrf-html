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

// forms

const filterFormCarsDataSample = {
  brand: '',
  model: '',
  city: '',
  yearFrom: '',
  yearTo: '',
  priceFrom: '',
  priceTo: '',
  bodyType: '',
  gearType: '',
  engineType: '',
  mileageFrom: '',
  mileageTo: '',
  driveType: '',
  steeringWheelSide: '',
};
const filterFormTiresDataSample = {
  tiresBrand: '',
  tiresWidth: '',
  tiresHeight: '',
  tiresDiameter: '',
  tiresSeason: '',
  tiresDisks: '',
  tiresPriceTo: '',
};

const filterFormCars = document.getElementById('filterFormCars');
const filterFormTires = document.getElementById('filterFormTires');
const filterResetButton = document.querySelector('.filter__tabs-controls-reset');

if (filterFormCars && filterFormTires && filterResetButton) {
  filterFormCars.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = { ...filterFormCarsDataSample };
    Object.keys(data).forEach((key) => {
      const fieldValue = formData.get(key);
      data[key] = fieldValue;
    });
    console.log(data);
  });

  filterFormTires.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = { ...filterFormTiresDataSample };

    Object.keys(data).forEach((key) => {
      const fieldValue = formData.get(key);
      data[key] = fieldValue;
    });
    console.log(data);
  });

  function resetForm(formObj) {
    formObj.form.reset();
    const selectElems = Object.keys(formObj.dataSample)
      .map((key) => {
        return document.getElementById(key);
      })
      .filter((item) => {
        return item.tagName.toLowerCase() === 'select';
      });

    selectElems.forEach((selectElem) => {
      const customSelectElem = selectElem.parentNode;
      const selectedTextElem = customSelectElem.querySelector('.custom-select__selected-text');
      const disabledOption = selectElem.querySelector('option:disabled');
      selectedTextElem.innerHTML = disabledOption.innerText;
    });
  }

  filterResetButton.addEventListener('click', () => {
    const filterFormsObjs = [
      { form: filterFormCars, dataSample: filterFormCarsDataSample },
      { form: filterFormTires, dataSample: filterFormTiresDataSample },
    ];

    filterFormsObjs.forEach((formObj) => resetForm(formObj));
  });
}

// frame-filter

const frameFilters = document.querySelectorAll('.frame-filter');

frameFilters.forEach((frameFilter) => {
  const form = frameFilter.querySelector('.frame-filter__form');
  const advancedButton = frameFilter.querySelector('.frame-filter__controls-advanced');
  const resetButton = frameFilter.querySelector('.frame-filter__controls-reset');

  function resetForm(form) {
    if (form && form.tagName.toLowerCase() === 'form') {
      form.reset();
      form.querySelectorAll('select').forEach((selectElem) => {
        const customSelectElem = selectElem.parentNode;
        const selectedTextElem = customSelectElem.querySelector('.custom-select__selected-text');
        const disabledOption = selectElem.querySelector('option:disabled');
        selectedTextElem.innerHTML = disabledOption.innerText;
      });
    }
  }

  if (resetButton && form) {
    resetButton.addEventListener('click', () => resetForm(form));

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  if (advancedButton) {
    advancedButton.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('active');
      if (event.currentTarget.classList.contains('active')) {
        frameFilter.classList.add('advanced');
      } else {
        frameFilter.classList.remove('advanced');
      }
    });
  }
});

const filterElem = document.querySelector('.filter');

if (filterElem) {
  const iframes = filterElem.querySelectorAll('iframe');
  const filterFrameTabs = filterElem.querySelectorAll('.filter__tab_frame');

  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

  function updateFramesHeight() {
    iframes.forEach((iframe) => resizeIframe(iframe));
  }

  window.addEventListener('resize', () => updateFramesHeight());

  filterElem.addEventListener('click', (event) => {
    const isTabButton = event.target.classList.contains('filter__controls-button');

    if (isTabButton) updateFramesHeight();
  });

  iframes.forEach((iframe) =>
    iframe.addEventListener('load', () => {
      resizeIframe(iframe);
    })
  );

  filterFrameTabs.forEach((tab) => {
    tab.addEventListener('pointerenter', () => {
      setTimeout(() => updateFramesHeight(), 1000);
    });

    tab.addEventListener('pointerleave', () => {
      updateFramesHeight();
    });
  });
}
