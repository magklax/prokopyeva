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

  /* Render Pictures */

  const dataArr = [
    {
      name: 'kotejka',
      desc: 'Отель для котов и кошек Котейка'
    },
    {
      name: 'nimes',
      desc: 'Магазин джинсовой одежды Nîmes'
    },
    {
      name: 'mishka',
      desc: 'Магазин игрушек Мишка'
    },
    {
      name: 'lostatvenue',
      desc: 'Сайт о музыке и путешествиях Lost at Venue'
    }
  ];

  const portfolio = document.querySelector('#portfolio');
  const popup = document.querySelector('#popup');
  const popupItem = popup.querySelector('#popup-item');
  const popupPreviews = popup.querySelectorAll('.popup__preview');
  const popupClose = document.querySelector('#close-popup-btn');
  const wrapper = document.querySelector('.page-wrapper');

  const renderPictures = function (index) {
    popupItem.querySelector('source').srcset = `img/${dataArr[index].name}-1@tablet.jpg`;
    popupItem.querySelector('img').src = `img/${dataArr[index].name}-1@mobile.jpg`;

    for (let i = 0; i < 5; i++) {
      popupPreviews[i].querySelector('source').srcset = `img/${dataArr[index].name}-${i + 1}@tablet.jpg`;
      popupPreviews[i].querySelector('img').src = `img/${dataArr[index].name}-${i + 1}@mobile.jpg`;
      popupItem.querySelector('img').alt = `Скриншот ${dataArr[index].desc} ${i + 1}`;
    }
  };

  const openPopup = function (index) {
    popup.classList.add('active');
    wrapper.classList.add('active');
    document.body.classList.add('popup-open');
    document.body.style.top = `-${window.scrollY}px`;

    renderPictures(index);
  };

  const closePopup = function () {
    popup.classList.remove('active');
    wrapper.classList.remove('active');
    document.body.classList.remove('popup-open');
    document.body.style.top = '';
  };

  const onPortfolioLinkClick = function (evt) {
    evt.preventDefault();

    let target = evt.target.closest('a');

    if (target) {
      openPopup(target.dataset.index);
    }
  };

  const onPopupCloseClick = function (evt) {
    evt.preventDefault();

    closePopup();
  };

  portfolio.addEventListener('click', onPortfolioLinkClick);
  popupClose.addEventListener('click', onPopupCloseClick);



  const setPicture = function (target) {

    const copy = target.parentElement.cloneNode('true');

    while (popupItem.firstChild) {
      popupItem.removeChild(popupItem.firstChild);
    }

    popupItem.appendChild(copy);
  };

  const onPictureClick = function (evt) {
    if (evt.target.hasAttribute('src')) {
      setPicture(evt.target);
    }
  };

  if (screen.width >= 768) {
    popup.addEventListener('click', onPictureClick);
  }

})();
