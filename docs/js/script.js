$(function(){

    $('.main-nav__toggle').on('click', function() {
       $('.main-nav__list').slideToggle(300, function(){
            if( $(this).css('display') === 'none'){
                $(this).removeAttr('style');
            }
       });

    });
});

var stickymenu = document.getElementById('main-nav')
var topbtn = document.getElementById('top-btn')
var stickymenuoffset = stickymenu.offsetTop

window.addEventListener('scroll', function(e){
    requestAnimationFrame(function(){
        if (window.pageYOffset > stickymenuoffset){
            stickymenu.classList.add('main-nav--sticky'),
            topbtn.classList.remove('top__btn--hide'),
            topbtn.classList.add('top__btn')
        }
        else{
            stickymenu.classList.remove('main-nav--sticky'),
            topbtn.classList.remove('top__btn'),
            topbtn.classList.add('top__btn--hide')
        }
    })
})

var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

  });
});

nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');

  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);

  return false;
});