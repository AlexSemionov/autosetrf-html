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
