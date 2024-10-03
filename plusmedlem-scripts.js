"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Animation on scroll
  const the_animation = document.querySelectorAll(".animated");
  if (the_animation) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animation");
          observer.unobserve(entries[0].target);
        } else {
          return;
        }
      });
    });
    for (let i = 0; i < the_animation.length; i++) {
      const elements = the_animation[i];

      observer.observe(elements);
    }
  }
});

window.addEventListener("load", function () {
  const header = document.querySelector(".pml-header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    toggleHeaderOnScroll();
  });

  function toggleHeaderOnScroll() {
    let currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition > lastScrollTop) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollTop = Math.max(currentScrollPosition, 0);
  }
});


