const burgerButton = document.querySelector('.header__burger');
const mainNav = document.querySelector('.main-nav');

if (burgerButton && mainNav) {
  burgerButton.addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
}
