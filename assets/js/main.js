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


    // stiky-menu
    windowOn.on('scroll', function () {
      var scroll = windowOn.scrollTop();
      if (scroll < 150) {
        $("#sticky-bar").removeClass("sticky-bar-active");
      } else {
        $("#sticky-bar").addClass("sticky-bar-active");
      }
    });

  // hero text 
  function heroTextAnim(){
      console.clear();
      const words = gsap.utils.toArray(".hero-word");
      const splits = words.map((word) => new SplitText(word, { type: "chars" }));
      const firstSplit = splits[0];
      const duration = 0.5;
      const staggerTime = duration / 10;
      const pause = 1;
      const tl = gsap.timeline({
        repeat: -1
      });

    splits.forEach((split, i) => {
      // Set the initial position for all the characters
      // except the first word
      if (i) {
        gsap.set(split.chars, { yPercent: 100 });
      }
      const next = splits[i + 1];
      tl.to(
        split.chars,
        {
          yPercent: -100,
          duration: duration,
          stagger: staggerTime,
          ease: "power1.inOut"
        },
        "+=" + pause
      );
      if (next) {
        tl.to(
          next.chars,
          {
            duration: duration,
            yPercent: 0,
            stagger: staggerTime
          },
          "<"
        );
      }
    });
    tl.fromTo(
      firstSplit.chars,
      {
        yPercent: 100
      },
      {
        duration: duration,
        yPercent: 0,
        stagger: staggerTime,
        immediateRender: false
      },
      "<"
    );
  }
  heroTextAnim();


if($('.reveal-text').length) {
		var textheading = $(".reveal-text");

		if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {
			
			el.split = new SplitText(el, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			
			if( $(el).hasClass('reveal-text') ){
				gsap.set(el.split.chars, {
					opacity: .3,
					x: "-7",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 80%",
					end: "top 20%",
					markers: false,
					scrub: 1,
				},

				x: "0",
				y: "0",
				opacity: 1,
				duration: .7,
				stagger: 0.2,
			});
			
		});
	}

if ($('.fade-in-up').length) {

    gsap.registerPlugin(ScrollTrigger);

if ($('.fade-in-up').length) {

    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.fade-in-up', {
        opacity: 0,
        y: 50
    });

    gsap.to('.fade-in-up', {
        scrollTrigger: {
            trigger: '.fade-in-up',
            start: "top 85%",
            end: "top 40%",
            scrub: 2,
            markers: false,
            toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.5   // ✅ each element comes after 0.3s
    });
}

}

//================== text-anim-5==============

if ($('.text-anim-5').length > 0) {
  let pr = gsap.utils.toArray(".text-anim-5");
  pr.forEach(pb => {
     const tl = gsap.timeline({
        scrollTrigger: {
           trigger: pb,
           start: 'top 90%',
           end: 'bottom 60%',
           scrub: false,
           markers: false,
           toggleActions: 'play none none none'
        }
     });

     const itemSplitted = new SplitText(pb, { type: "lines" });
     gsap.set(pb, { perspective: 400 });
     itemSplitted.split({ type: "lines" })
     tl.from(itemSplitted.lines, {
      duration: 2.5,
          opacity: 0,
          x: -100,
          stagger: 0.3,
          ease: "expo.out"
     });
  });
}

//================== text-anim-5==============

//================== text-anim-2==============

  if ($('.text-anim-2').length > 0) {
    let pr = gsap.utils.toArray(".text-anim-2");
    pr.forEach(pb => {
       const tl = gsap.timeline({
          scrollTrigger: {
             trigger: pb,
             start: 'top 80%',
             end: 'top 20%',
             scrub: false,
             markers: false,
             toggleActions: 'play none none none'
          }
       });

       const itemSplitted = new SplitText(pb, { type: "lines" });
       gsap.set(pb, { perspective: 400 });
       itemSplitted.split({ type: "lines" })
       tl.from(itemSplitted.lines, {
          opacity: 0,
          y: 50,
          skewY: 0,
          transformOrigin: "50% 50% -50px",
          stagger: 0.35,
          duration: 2.5,
          ease: "power2.out"
       });
    });
 }

//================== text-anim-2==============


//================== jarallax==============

jarallax(document.querySelectorAll('.jarallax'), {
  speed: 0.2
});

//================== jarallax==============


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
  
function circleProgressBar(){
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
}
circleProgressBar();


document.body.style.overflow = "hidden";
const innerBars = document.querySelectorAll(".inner-bar");
let increment = 0;
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


window.onload = function() {
  setTimeout(() => {
    animateBars();
  }, 1000);
}

function scrollSmoothAnim(){
   gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
   if ($('#smooth-wrapper').length && $('#smooth-content').length) {

      gsap.config({
         nullTargetWarn: false,
      });

      let smoother = ScrollSmoother.create({
         smooth: 1,
         effects: true,
         smoothTouch: 0.1,
         normalizeScroll: false,
         ignoreMobileResize: true,
      });
   }
   window.scrollTo(0, 0);
}
scrollSmoothAnim();

new WOW().init();


})(jQuery);
