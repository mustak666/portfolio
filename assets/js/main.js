(function ($) {
    "use strict";

    // mobile menu 
    var tpMenuWrap = $('.tp-mobile-menu-active > ul').clone();
    var tpSideMenu = $('.tp-offcanvas-menu nav');
    tpSideMenu.append(tpMenuWrap);
    if ($(tpSideMenu).find('.sub-menu, .tp-mega-menu').length != 0) {
      $(tpSideMenu).find('.sub-menu, .tp-mega-menu').parent().append('<button class="tp-menu-close"><i class="fas fa-chevron-right"></i></button>');
    }

    var sideMenuList = $('.tp-offcanvas-menu nav > ul > li button.tp-menu-close, .tp-offcanvas-menu nav > ul li.has-dropdown > a');
    $(sideMenuList).on('click', function (e) {
      e.preventDefault();
      if (!($(this).parent().hasClass('active'))) {
        $(this).parent().addClass('active');
        $(this).siblings('.sub-menu, .tp-mega-menu').slideDown();
      } else {
        $(this).siblings('.sub-menu, .tp-mega-menu').slideUp();
        $(this).parent().removeClass('active');
      }
    });


    $(".tp-offcanvas-toogle").on('click', function(){
      $(".tp-offcanvas").addClass("tp-offcanvas-open");
      $(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
    });
    $(".tp-offcanvas-close-toggle,.tp-offcanvas-overlay").on('click', function(){
      $(".tp-offcanvas").removeClass("tp-offcanvas-open");
      $(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
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

    $('.counterUp').counterUp({
      delay: 10,
      time: 1000,
    });


    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".panel-wrap",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=3500",
      }
    });
})(jQuery);