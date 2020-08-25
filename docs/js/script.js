'use strict';

(function() {
  const utils = {
    isEnterKeycode: function (evt, func, params) {
      if (evt.keyCode === 13) {
        func(params);
      }
    },
    isEscKeycode: function (evt, func, params) {
      if (evt.keyCode === 27) {
        func(params);
      }
    },
    isTabKeycode: function (evt, func, params) {
      if (evt.keyCode === 9) {
        func(params);
      }
    },
    focusOnElem: function (el) {
      el.focus();
    }
  };

  const dataArr = [
    {
      name: 'kotejka',
      desc: 'Отель для котов и кошек Котейка',
      link: 'https://magklax.github.io/kotejka/'
    },
    {
      name: 'nimes',
      desc: 'Магазин джинсовой одежды Nîmes',
      link: 'https://magklax.github.io/denim/'
    },
    {
      name: 'mishka',
      desc: 'Магазин игрушек Мишка',
      link: 'https://magklax.github.io/460793-mishka/'
    },
    {
      name: 'lostatvenue',
      desc: 'Сайт о музыке и путешествиях Lost at Venue',
      link: 'https://lostatvenue.com/'
    },
    {
      name: 'keksobooking',
      desc: 'Сервис размещения объявлений Keksobooking',
      link: 'https://magklax.github.io/keksobooking/'
    },
    {
      name: 'design',
      desc: 'Дизайн интерьеров Brume',
      link: 'https://magklax.github.io/design/'
    }
  ];

    const setSrc = function (name, index) {
    return `img/${name}-${index}@mobile.jpg`;
  };

  const setSrcset = function (name, index) {
    return `img/${name}-${index}@tablet.jpg`;
  };

  const setAlt = function (name, index) {
    return `Скриншот ${name} ${index}`;
  };

/* preload images*/
  for (let i = 0; i < dataArr.length; i++) {
    for (let j = 1; j <= 5; j++) {
      let imgMobile = new Image();
      let imgTablet = new Image();

      imgMobile.src = setSrc(dataArr[i].name, j);
      imgTablet.src = setSrcset(dataArr[i].name, j);
    }
  }

/* main-nav*/
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
    utils.isEscKeycode(evt, closeNavMenu);
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
    evt.preventDefault();

    utils.isEnterKeycode(evt, toggleNavMenu);
  };

  navToggle.addEventListener('click', onNavToggleClick);
  navToggle.addEventListener('keydown', onNavToggleEnterPress);

/* scroll */

  window.addEventListener('scroll', (evt) => {
    evt.preventDefault();

    if (window.pageYOffset > mainNavHeight) {
      topBtn.classList.remove('hidden');
      mainNav.classList.add('sticky');
      navToggle.classList.add('sticky');
    } else {
      topBtn.classList.add('hidden');
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
    evt.preventDefault();

    utils.isEnterKeycode(evt, scrollToTop);
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

/* open popup */

  const portfolio = document.querySelector('#portfolio');
  const popup = document.querySelector('#popup');
  const bigPicture = popup.querySelector('#big-picture');
  const previews = popup.querySelectorAll('.popup__preview');
  const popupClose = document.querySelector('#close-popup-btn');
  const wrapper = document.querySelector('.page-wrapper');
  const popupLink = document.querySelector('.popup__link');

  const createPopup = function (index) {
    bigPicture.querySelector('source').srcset = setSrcset(dataArr[index].name, 1);
    bigPicture.querySelector('img').src = setSrc(dataArr[index].name, 1);

    for (let i = 0; i < 5; i++) {
      previews[i].querySelector('source').srcset = setSrcset(dataArr[index].name, i + 1);
      previews[i].querySelector('img').src = setSrc(dataArr[index].name, i + 1);
      previews[i].querySelector('img').alt = setAlt(dataArr[index].desc, i + 1);
    }

    popupLink.href = dataArr[index].link;

    openPopup();
  };

  const openPopup = function () {
    wrapper.classList.remove('hidden');
    document.body.classList.add('popup-open');
    document.body.style.top = `-${window.scrollY}px`;

    utils.focusOnElem(previews[0]);

    document.addEventListener('keydown', onPopupEscPress);
  };

  const closePopup = function () {
    wrapper.classList.add('hidden');
    document.body.classList.remove('popup-open');
    document.body.style.top = '';

    document.removeEventListener('keydown', onPopupEscPress);
  };

  const onPopupEscPress = function (evt) {
    utils.isEscKeycode(evt, closePopup)
  };

  const onPortfolioLinkClick = function (evt) {
    evt.preventDefault();

    let target = evt.target.closest('a');

    if (target) {
      createPopup(target.dataset.index);
    }
  };

  const onPortfolioLinkEnterPress = function (evt) {
    const target = evt.target;
    if (target.dataset.index) {
      utils.isEnterKeycode(evt, function () {
        utils.isEnterKeycode(evt, createPopup, target.dataset.index);
      });
    }
  };

  const onPopupCloseClick = function (evt) {
    closePopup();
  };

  const onPopupCloseEnterPress = function (evt) {
    utils.isEnterKeycode(evt, closePopup)
  };

  const onPopupCloseTabPress = function (evt) {
    utils.isTabKeycode(evt, utils.focusOnElem, previews[0]);
  };

  portfolio.addEventListener('click', onPortfolioLinkClick);
  portfolio.addEventListener('keydown', onPortfolioLinkEnterPress);
  popupClose.addEventListener('click', onPopupCloseClick);
  popupClose.addEventListener('keydown', onPopupCloseEnterPress);
  popupClose.addEventListener('keydown', onPopupCloseTabPress);

  const setPicture = function (target) {
    const copy = target.parentElement.cloneNode('true');

    while (bigPicture.firstChild) {
      bigPicture.removeChild(bigPicture.firstChild);
    }

    bigPicture.appendChild(copy);
  };

  const onPictureClick = function (evt) {
    if (evt.target.hasAttribute('src')) {
      setPicture(evt.target);
    }
  };

  const onPictureEnterPress = function (evt) {
    const target = evt.target.querySelector('img');
    if (target) {
      utils.isEnterKeycode(evt, setPicture, target);
    }
  };

  if (screen.width >= 1050) {
    popup.addEventListener('click', onPictureClick);
    popup.addEventListener('keydown', onPictureEnterPress);
  }

})();
