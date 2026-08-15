jQuery( document ).ready( function($){
   "use strict";



/**-------------------------------------------------
 *Fixed Header
*----------------------------------------------------**/
 $(window).on('scroll', function () {

      /**Fixed header**/
      if ($(window).scrollTop() > 250) {
      $('.navbar-sticky').addClass('sticky fade_down_effect');
      } else {
      $('.navbar-sticky').removeClass('sticky fade_down_effect');
      }
 });



 /* ----------------------------------------------------------- */
  /*  Mobile Menu
  /* ----------------------------------------------------------- */
  $('.dropdown > a').on('click', function(e) {
   e.preventDefault();
   if($(window).width() > 991)
   {
      location.href = this.href; 
   } 
   var dropdown = $(this).parent('.dropdown');
   dropdown.find('>.dropdown-menu').slideToggle('show');
   $(this).toggleClass('opened');
   return false;
 });



   /* ----------------------------------------------------------- */
   /*  Back to top
   /* ----------------------------------------------------------- */

   $(window).on('scroll', function () {
    if ($(window).scrollTop() > $(window).height()) {
       $(".BackTo").fadeIn('slow');
    } else {
       $(".BackTo").fadeOut('slow');
    }

    });
    $("body, html").on("click", ".BackTo", function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 800);
    });


        /*==========================================================
                    review rating circle
        ======================================================================*/
        $(function() {
         $('.review-chart').easyPieChart({
           scaleColor: "",
           lineWidth: 3,
           lineCap: 'butt',
           barColor: '#bc906b',
           trackColor:	"rgba(0,0,0, .30)",
           size: 35,
           animate: 35
         });
       });

 
    /*==========================================================
           Side Offset menu open
        ======================================================================*/
 
    if ($('.navSidebar-button').length > 0) {
        $('.navSidebar-button').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.info-group').addClass('isActive');
        });
    }
    if ($('.close-side-widget').length > 0) {
        $('.close-side-widget').on('click', function (e) {
            e.preventDefault();
            $('.info-group').removeClass('isActive');
        });
    }
    $('body').on('click', function (e) {
        $('.info-group').removeClass('isActive');
        $('.cart-group').removeClass('isActive');
    });
    $('.xs-sidebar-widget').on('click', function (e) {
        e.stopPropagation();
    });


        /* ----------------------------------------------------------- */
   /*  Video popup
   /* ----------------------------------------------------------- */

    if ($('.ts-play-btn').length > 0) {
        $('.ts-play-btn').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it
    
                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function
    
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }

    /*=========================
    // instagram feed
    ============================ */
    
      if ($('#instafeed').length > 0) {
        var InstagramToken = $('#instafeed').data('token'), limit = $('#instafeed').data('media-count');
        var feed = new Instafeed({
              accessToken: InstagramToken,
              limit: Number(limit),
              template: '<a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" /></a>',
              transform: function(item) {
              var d = new Date(item.timestamp);
              item.date = [d.getDate(), d.getMonth(), d.getYear()].join('/');
              return item;
              }
        });
     feed.run();
  }


   
} );