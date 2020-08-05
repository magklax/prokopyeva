'use strict';

(function() {
  const topHeader = document.querySelector('#top')
  const mainNav = topHeader.querySelector('#main-nav');
  const navToggle = topHeader.querySelector('.main-nav__toggle');
  const navMenu = topHeader.querySelector('.main-nav__list');
  const topBtn = document.querySelector('#top-btn')

  const mainNavHeight = mainNav.offsetHeight;

  topHeader.style.height = mainNavHeight + 'px';

  const openNavMenu = () => {
    navMenu.classList.add('active');
    navToggle.classList.add('active');

    document.addEventListener('keydown', onNavMenuEscPress);
    document.addEventListener('click', onDocumentClick, true);
  };

  const closeNavMenu = () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');

    document.removeEventListener('keydown', onNavMenuEscPress);
    document.removeEventListener('click', onDocumentClick, true);
  };

  const toggleNavMenu = () => {
    if (navToggle.classList.contains('active')) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  };

  const onNavMenuEscPress = (evt) => {
    if (evt.keyCode === 27) {
      closeNavMenu();
    }
  };

  const onDocumentClick = (evt) => {
    evt.stopPropagation();

    closeNavMenu();
  };

  const onNavToggleClick = (evt) => {
    evt.preventDefault();
    toggleNavMenu();
  };

  const onNavToggleEnterPress = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();

      toggleNavMenu();
    }
  };

  navToggle.addEventListener('click', onNavToggleClick);
  navToggle.addEventListener('keydown', onNavToggleEnterPress);

  window.addEventListener('scroll', (evt) => {
    evt.preventDefault();

    if (window.pageYOffset > mainNavHeight) {
      topBtn.classList.remove('top__btn--hide');
      mainNav.classList.add('sticky');
      navToggle.classList.add('sticky');
    } else {
      topBtn.classList.add('top__btn--hide');
      mainNav.classList.remove('sticky');
      navToggle.classList.remove('sticky');
    }
  });

  document.addEventListener('mousemove', (evt) => {
    if (mainNav.classList.contains('sticky')) {
      if (evt.clientY <= mainNavHeight) {
        mainNav.classList.add('opened');
      } else {
        mainNav.classList.remove('opened');
      }
    } else {
      mainNav.classList.remove('opened');
    }
  });

  const scrollToTop = () => {
    topHeader.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  topBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    scrollToTop();
  });

  topBtn.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();

      scrollToTop();
    }
  });

  const aboutMeSection = document.querySelector('#about-me');
  const aboutMeArr = document.querySelectorAll('.about-me__item');

  const showElement = (arr, index) => {
    arr[index].style.opacity = '1';
  };

  window.addEventListener('scroll', (evt) => {
    evt.preventDefault();

    if (window.pageYOffset > (aboutMeSection.offsetTop - screen.height / 1.5)) {

      for (let i = aboutMeArr.length - 1; i >= 0; i--) {
        setTimeout(() => showElement(aboutMeArr, i), 600 * i);
      }
    }
  });

  const slider = new Siema({
    selector: '.skills__slider',
    duration: 400,
    loop: true,
    perPage: {
      320: 3,
      450: 4,
      550: 5,
      700: 6,
    }
  });

  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');

  prev.addEventListener('click', () => slider.prev());
  next.addEventListener('click', () => slider.next());

  setInterval(() => slider.next(), 2000);

  const portfolio = document.querySelector('#portfolio');
  const popup = document.querySelector('#popup');
  const popupClose = document.querySelector('#close-popup-btn');
  const wrapper = document.querySelector('.page-wrapper');

  const openPopup = function () {
    popup.classList.add('active');
    wrapper.classList.add('active');
  };

  const closePopup = function () {
    popup.classList.remove('active');
    wrapper.classList.remove('active');
  };

  const onPortfolioLinkClick = function (evt) {
    evt.preventDefault();

    openPopup();
  };

  const onPopupCloseClick = function (evt) {
    evt.preventDefault();

    closePopup();
  };

  portfolio.addEventListener('click', onPortfolioLinkClick);
  popupClose.addEventListener('click', onPopupCloseClick);

  const popupItem = document.querySelector('#popup-item');

  if (screen.width >= 500) {
    popup.addEventListener('click', function (evt) {
      if (evt.target.hasAttribute('src')) {

        const block = evt.target.closest('a');
        const pictureOne = evt.target.parentElement;
        const pictureTwo = popupItem.querySelector('picture');

        while (popupItem.firstChild) {
          popupItem.removeChild(popupItem.firstChild);
        }

        popupItem.appendChild(pictureOne);
        block.appendChild(pictureTwo);
      }
    });
  }

})();
