( function ($, elementor) {
	"use strict";


    var GLOREYA = {

        init: function () {
            
            var widgets = {
				'gloreya-testimonial.default': GLOREYA.Testimonial,
				'gloreya-slider.default': GLOREYA.Main_Slider,
				'gloreya-chef-slider.default': GLOREYA.Gloreya_chef_slider,
				'gloreya-chef.default': GLOREYA.gloreya_chef,
				'gloreya-food-menu.default': GLOREYA.Food_Tab_slider,
				'gloreya-vertical-grid-slider.default': GLOREYA.vertical_grid_slider,
				'gloreya-vertical-feature-slider.default': GLOREYA.vertical_feature_slider,
            'gloreya-product-slider.default': GLOREYA.Gloreya_product_slider,
            'gloreya-food-menu-slider-pro.default': GLOREYA.gloreya_food_menu_slider_pro,
            
            };
            $.each(widgets, function (widget, callback) {
                elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
           
		},
	   /*==========================================================
        Testimonial slider Classic
      ============================================================*/
		Testimonial: function ($scope) {
         var $container = $scope.find('.testimonial-carousel');
         if ($container.length > 0) {
         var controls = null;
         var nav = true;
         var dot = true;
         var auto_play = true;
         var auto_loop = true;

         controls = JSON.parse($container.attr('data-controls'));
         nav       = Boolean(controls.nav=='yes'?true:false);
         dot       = Boolean(controls.dot=='yes'?true:false);
         auto_play = Boolean(controls.auto_play=='yes'?true:false);
         auto_loop = Boolean(controls.auto_loop=='yes'?true:false);

         $container.owlCarousel({

            loop: auto_loop,
            autoplay: auto_play,
            autoplayHoverPause: true,
            nav: nav,
            dots: dot,
            mouseDrag: true,
            touchDrag: true,
            smartSpeed: 1100,
            navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
            items: 1,
            responsive: {
               0: {
                  nav: false,
               },
               600: {
                  nav: nav,
               },
               1000: {
                  nav: nav,
               }
            }
         });
        
      }																						
		
      },
      // team / chef
	   Gloreya_chef_slider:function ($scope){
         var $container = $scope.find('.chef-slider');
         var controls= JSON.parse($container.attr('data-controls'));
              
         var navShow = Boolean(controls.show_nav?true:false);
         var autoslide = Boolean(controls.auto_nav_slide?true:false);
         var dot_nav = Boolean(controls.dot_nav_show?true:false);
         var item_count = parseInt( controls.item_count );
     
         if ($container.length > 0) {
            $container.owlCarousel({
               items: item_count,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               dots: dot_nav,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               smartSpeed: 1100,
               margin:30,
               navText: ['<i class="icon icon-left-arrow2">', '<i class="icon icon-right-arrow2">'],
               responsive: {
                  0: {
                     items: 1,
                  },
                  600: {
                     items: 2,
                  },
                  1000: {
                     items: item_count,
                  }
               }
         
            });
         }
      },
		// Main Slider
		Main_Slider: function ($scope) {
         
         var $container = $scope.find('.hero-area');

         var controls= JSON.parse($container.attr('data-controls'));
              
         var navShow = Boolean(controls.show_nav?true:false);
         var autoslide = Boolean(controls.auto_nav_slide?true:false);
         var dot_nav = Boolean(controls.dot_nav_show?true:false);
         if ($container.length > 0) {
            $container.owlCarousel({
               items: 1,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               dots: dot_nav,
               autoplayTimeout: 8000,
               autoplayHoverPause: false,
               mouseDrag: false,
               smartSpeed: 1100,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                     mouseDrag: false,

                  },
                  600: {
                     items: 1,
                     nav: false,
                     mouseDrag: true,

                  },
                  1000: {
                     nav: navShow,
                     mouseDrag: true,

                  }
               }
         
            });
         }
		
		},
		// Main Slider
		Food_Tab_slider: function ($scope) {
         
         var $container = $scope.find('.feature-tab-slider');
        
         if ($container.length > 0) {
            $container.owlCarousel({
               items: 3,
               loop: true,
               autoplay: false,
               nav: true,
               dots: false,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               smartSpeed: 1100,
               margin: 30,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,
                     mouseDrag: false,

                  },
                  600: {
                     items: 2,
                     nav: false,
                  },
                  1000: {
                     items: 3,
                  }
               }
         
            });
         }
         // owl trigger
         $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            e.target // newly activated tab
            e.relatedTarget // previous active tab
            $(".owl-carousel").trigger('refresh.owl.carousel');
          });
		
      },
      
      // vertical grid slider
      vertical_grid_slider:function ($scope){
         var $container = $scope.find('.vertical-grid-slider');
        
         if ($container.length > 0) {
            var controls= JSON.parse($container.attr('data-controls'));
              
            var navShow = Boolean(controls.show_nav?true:false);
            var autoslide = Boolean(controls.auto_nav_slide?true:false);
            var item_count = parseInt( controls.item_count );
            var slider_margin = parseInt( controls.slider_margin );

            $container.owlCarousel({
               items: item_count,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               dots: false,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               smartSpeed: 1100,
               margin:slider_margin,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
               responsive: {
                  0: {
                     items: 1,
                  },
                  600: {
                     items: 2,
                  },
                  1000: {
                     items: item_count,
                  }
               }
         
            });
         }
      
      },

      // vertical feature slider
      vertical_feature_slider:function ($scope){
         var $container = $scope.find('.verticale-feature-post');
        
         if ($container.length > 0) {
            var controls= JSON.parse($container.attr('data-controls'));
              
            var navShow = Boolean(controls.show_nav?true:false);
            var autoslide = Boolean(controls.auto_nav_slide?true:false);

            $container.owlCarousel({
               items: 1,
               loop: false,
               autoplay: autoslide,
               nav: navShow,
               dots: false,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               smartSpeed: 1100,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
         
            });
         }
      
      },
      // product slider
      Gloreya_product_slider:function ($scope){
         var $container = $scope.find('.ts-product-slider');
        
         if ($container.length > 0) {
            var controls= JSON.parse($container.attr('data-controls'));
              
            var navShow = Boolean(controls.nav?true:false);
            var autoslide = Boolean(controls.auto_play?true:false);
            var item_count = parseInt( controls.post_count );

            $container.owlCarousel({
               items: item_count,
               loop: false,
               autoplay: autoslide,
               nav: navShow,
               dots: false,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               margin: 30,
               smartSpeed: 1100,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
               responsive: {
                  0: {
                     items: 1,
                     nav: false,

                  },
                  600: {
                     items: 2,
                  },
                  767: {
                     items: 3,
                  },
                  1000: {
                     items: item_count,
                  }
               }
         
            });
         }

         var $container1 = $scope.find('.product-shape-hover-img');
         if ($container1.length > 0) {
            $container1.each(function () {
               var img = $(this);
               var attributes = img.prop("attributes");
               var imgURL = img.attr("src");
               $.get(imgURL, function (data) {
                   var svg = $(data).find('svg');
                   svg = svg.removeAttr('xmlns:a');
                   $.each(attributes, function () {
                       svg.attr(this.name, this.value);
                   });
                   img.replaceWith(svg);
               });
           });
           
         }
         // product style 3
         var $container2 = $scope.find('.ts-product-slider3');

         if ($container2.length > 0) {
            var controls= JSON.parse($container2.attr('data-controls'));
              
            var navShow = Boolean(controls.nav?true:false);
            var autoslide = Boolean(controls.auto_play?true:false);
            var item_count = parseInt( controls.post_count );

            $container2.owlCarousel({
               items: item_count,
               loop: true,
               autoplay: autoslide,
               nav: navShow,
               dots: false,
               autoplayTimeout: 8000,
               autoplayHoverPause: true,
               mouseDrag: true,
               margin: 30,
               center: true,
               smartSpeed: 1100,
               navText: ['<i class="icon icon-chevron-left">', '<i class="icon icon-chevron-right">'],
            
               responsive: {
                  0: {
                     items: 1,
                     nav: false,

                  },
                  600: {
                     items: 2,
                  },
                  767: {
                     items: 2,
                  },
                  1000: {
                     items: item_count,
                  }
               },

           
         
            });
         }

      
      },
      // image to svg code converter 
      gloreya_chef:function ($scope){
         var $container = $scope.find('.chef-shape-img');
         if ($container.length > 0) {
            $container.each(function () {
               var img = $(this);
               var attributes = img.prop("attributes");
               var imgURL = img.attr("src");
               $.get(imgURL, function (data) {
                   var svg = $(data).find('svg');
                   svg = svg.removeAttr('xmlns:a');
                   $.each(attributes, function () {
                       svg.attr(this.name, this.value);
                   });
                   img.replaceWith(svg);
               });
           });
           
         }
      
      },

       // food menu slider start
       gloreya_food_menu_slider_pro: function ($scope) {
         var $list_slider_scope = $scope.find('.gloreya-food-wrapper');
         slider_action( $ ,$list_slider_scope ,'.gloreya-food-slider1');
         },
         wpc_menu_slider_classic_pro: function ($scope) {
            var $tab_slider_scope = $scope.find('.wpc-food-wrapper');
            slider_action( $ ,$tab_slider_scope ,'.wpc-food-menu-slider-classic')
        },
     

    };
    $(window).on('elementor/frontend/init', GLOREYA.init);
}(jQuery, window.elementorFrontend) ); 



// slider tab and list 
function slider_action( $, $scope , params ) {
   var $container = $scope.find( params );
   var count = $container.data('count');

   if ($container.length > 0) {
       $($container).each(function (index, element) {
           new Swiper(element, {
               slidesPerView: count,
               spaceBetween: 30,
               navigation: {
                   nextEl: '.swiper-button-next',
                   prevEl: '.swiper-button-prev',
               },
               pagination: {
                   el: '.swiper-pagination',
                   clickable: true,
               },
               observer: true,
               observeParents: true,
               paginationClickable: true,
               breakpoints: {
                   320: {
                       slidesPerView: 1,
                   },
                   600: {
                       slidesPerView: 2,
                   },
                   1024: {
                       slidesPerView: count,
                   }
               }
   
           });
       });
       
   }
}