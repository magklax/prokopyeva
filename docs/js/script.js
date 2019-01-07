$(function(){

    $('.main-nav__toggle').on('click', function() {
       $('.main-nav__list').slideToggle(300, function(){
            if( $(this).css('display') === "none"){
                $(this).removeAttr('style');
            }
       });

    });

});