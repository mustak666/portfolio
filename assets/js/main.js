(function ($) {
    "use strict";
  var windowOn = $(window);
    $(document).ready( function() { 
       // mobile menu 
    var tpMenuWrap = $('.mobile-menu-active > ul').clone();
    var tpSideMenu = $('.offcanvas-menu nav');
    tpSideMenu.append(tpMenuWrap);
    if ($(tpSideMenu).find('.sub-menu, .mega-menu').length != 0) {
      $(tpSideMenu).find('.sub-menu, .mega-menu').parent().append('<button class="menu-close"><i class="fas fa-chevron-right"></i></button>');
    }

    var sideMenuList = $('.offcanvas-menu nav > ul > li button.menu-close, .offcanvas-menu nav > ul li.has-dropdown > a');
    $(sideMenuList).on('click', function (e) {
      e.preventDefault();
      if (!($(this).parent().hasClass('active'))) {
        $(this).parent().addClass('active');
        $(this).siblings('.sub-menu, .mega-menu').slideDown();
      } else {
        $(this).siblings('.sub-menu, .mega-menu').slideUp();
        $(this).parent().removeClass('active');
      }
    });

    $(".offcanvas-toogle").on('click', function(){
      $(".offcanvas").addClass("offcanvas-open");
      $(".offcanvas-overlay").addClass("offcanvas-overlay-open");
    });

    $(".offcanvas-close-toggle,.offcanvas-overlay").on('click', function(){
      $(".offcanvas").removeClass("offcanvas-open");
      $(".offcanvas-overlay").removeClass("offcanvas-overlay-open");
    });

    // data bg img 
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    })

    // data bg color
    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"))
    })

    // data bg color
    $("[data-color]").each(function () {
        $(this).css("color", $(this).attr("data-color"))
    })

    $('.popup-image').magnificPopup({
        type: 'image'
        // other options
    });
    $('.popup-video').magnificPopup({
        type: 'iframe'
        // other options
    });

    // blog slider 
    var swiper = new Swiper(".testimonail-active", {
        slidesPerView: 1,
        spaceBetween: 0,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
          nextEl: ".testi_next",
          prevEl: ".testi_prev",
        },
    });

    var swiper = new Swiper(".portfolio-active", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop : true,
        speed : 3000,
        autoplay :{
         delay : 2000,
         disableOnInteraction : false,
        },
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            }
          },
    });
    $('.counterUp').counterUp({
      delay: 10,
      time: 1000,
    });

        // stiky-menu
    windowOn.on('scroll', function () {
      var scroll = windowOn.scrollTop();
      if (scroll < 150) {
        $("#sticky-bar").removeClass("sticky-bar-active");
      } else {
        $("#sticky-bar").addClass("sticky-bar-active");
      }
    });


  });

  $(document).ready(function(){"use strict";
		
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});				
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
		
	});
  jQuery(document).ready(function ($) {
    const $skillCircles = $(".skill_circle");

    // Initial state: progress 0
    $skillCircles.each(function () {
      const $progress = $(this);
      const $number = $progress.find(".number");

      $progress.css(
        "background",
        "conic-gradient(#000 0%, #000 0%)"
      );
      $number.html('0<span>%</span>');
    });

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const progress = entry.target;
        const $progress = $(progress);

        if ($progress.hasClass("animated")) return;
        $progress.addClass("animated");

        let degree = 0;
        const targetDegree = parseInt($progress.data("degree"));
        const color = $progress.data("color");
        const $number = $progress.find(".number");

        const interval = setInterval(() => {
          degree++;

          if (degree > targetDegree) {
            clearInterval(interval);
            return;
          }

          $progress.css(
            "background",
            `conic-gradient(${color} ${degree}%, #000 90%)`
          );
          $number.html(degree + "<span>%</span>");
          $number.css("color", color);
        }, 20);

        observer.unobserve(progress);
      });
    }, {
      threshold: 0.4
    });

    $skillCircles.each(function () {
      observer.observe(this);
    });
  });
  jQuery(document).ready(function ($) {
    const $bars = $(".progress-bar");

    // Initial 0%
    $bars.each(function () {
      $(this).css({
        width: "0%",
        transition: "width 1.5s ease-in-out"
      });
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const bar = entry.target;
        const $bar = $(bar);
        const value = $bar.attr("aria-valuenow");

        $bar.css("width", value + "%");
        observer.unobserve(bar);
      });
    }, {
      threshold: 0.4
    });

    $bars.each(function () {
      observer.observe(this);
    });
  });
// page load থাকা অবস্থায় scroll বন্ধ
document.body.style.overflow = "hidden";

// Select all elements with the class "inner-bar"
const innerBars = document.querySelectorAll(".inner-bar");

// Initialize a variable to keep track of the current increment
let increment = 0;

// Function to animate the inner bars
function animateBars(){ 
  // Loop through the first two inner bars
  for(let i = 0; i < 2; i++){
    let randomWidth = Math.floor(Math.random() * 101);

    gsap.to(innerBars[i + increment], {
      width: `${randomWidth}%`,
      duration: 0.2,
      ease: "none"
    });
  }

  // Animate back to 100%
  setTimeout(() => {
    for(let i = 0; i < 2; i++){
      gsap.to(innerBars[i + increment], {
        width: "100%",
        duration: 0.3,
        ease: "none"
      });
    }

    increment += 2;

    if(increment < innerBars.length){
      animateBars();
    } else {
      // preloader hide animation
      const preloaderTl = gsap.timeline();

      preloaderTl.to(".preloader-overlay", {
        transform: "translateX(0)",
        duration: 0.9,
        ease: "none",
        delay: 0.6
      });

      preloaderTl.to(".preloader", {
        autoAlpha: 0,   // ✅ smooth hide (NO display:none)
        duration: 0.2,
        ease: "none",
        onComplete: () => {
          // page scroll চালু
          document.body.style.overflow = "auto";
        }
      });
    }

  }, 200);
}

// Start animation
animateBars();

// Run the animateBars function on window load
window.onload = function() {
  setTimeout(() => {
    animateBars();
  }, 1000);
}




})(jQuery);