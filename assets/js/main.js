(function ($) {
    "use strict";

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


    document.addEventListener("DOMContentLoaded", function () {
      const skillCircles = document.querySelectorAll(".skill_circle");

      // ✅ Initial state: সব progress 0
      skillCircles.forEach(progress => {
        const number = progress.querySelector(".number");
        progress.style.background = `conic-gradient(#000 0%, #000 0%)`;
        number.innerHTML = `0<span>%</span>`;
      });

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const progress = entry.target;
            if (progress.classList.contains("animated")) return;
            progress.classList.add("animated");

            let degree = 0;
            const targetDegree = parseInt(progress.dataset.degree);
            const color = progress.dataset.color;
            const number = progress.querySelector(".number");

            const interval = setInterval(() => {
              degree++;
              if (degree > targetDegree) {
                clearInterval(interval);
                return;
              }

              progress.style.background = `conic-gradient(${color} ${degree}%, #000 90%)`;
              number.innerHTML = degree + "<span>%</span>";
              number.style.color = color;
            }, 20);

            observer.unobserve(progress);
          });
        }, {
          threshold: 0.4
        });

        skillCircles.forEach(circle => observer.observe(circle));
    });

    document.addEventListener("DOMContentLoaded", function () {
      const bars = document.querySelectorAll(".progress-bar");

      bars.forEach(bar => {
        // শুরুতে 0%
        bar.style.width = "0%";
        bar.style.transition = "width 1.5s ease-in-out";
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const value = bar.getAttribute("aria-valuenow");
            bar.style.width = value + "%";
            observer.unobserve(bar); // একবারই animate হবে
          }
        });
      }, { threshold: 0.4 });

      bars.forEach(bar => observer.observe(bar));
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



    // gsap.registerPlugin(ScrollTrigger);

    // let sections = gsap.utils.toArray(".panel");

    // gsap.to(sections, {
    //   xPercent: -100 * (sections.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".panel-wrap",
    //     pin: true,
    //     scrub: 1,
    //     snap: 1 / (sections.length - 1),
    //     end: "+=3500",
    //   }
    // });
})(jQuery);