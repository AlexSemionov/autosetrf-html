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
