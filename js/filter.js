const filterTabButtons = document.querySelectorAll('.filter__controls-button');

filterTabButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetId = event.currentTarget.dataset.target;

    if (targetId === 'tires') {
      const infoElem = document.querySelector(`.filter__controls-info_${targetId}`);
      if (infoElem) infoElem.classList.add('active');
    } else {
      const infoElem = document.querySelector('.filter__controls-info_tires');
      if (infoElem) infoElem.classList.remove('active');
    }

    filterTabButtons.forEach((button) => {
      if (button === event.currentTarget) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  });
});
