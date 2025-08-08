
// Active nav bar
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

// Swap typing line after preloader
setTimeout(() => {
  const fullLine = document.getElementById("full-line");
  const loopLine = document.getElementById("loop-line");

  if (fullLine) fullLine.style.display = "none";
  if (loopLine) loopLine.classList.remove("hidden");
}, 4000);

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});

// Fade in service boxes
document.addEventListener("DOMContentLoaded", function () {
  const serviceBoxes = document.querySelectorAll('.service-box');

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        serviceObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  serviceBoxes.forEach(box => {
    serviceObserver.observe(box);
  });
});

// Fade in testimonial cards
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  testimonialCards.forEach(card => {
    testimonialObserver.observe(card);
  });
});

// Hide floating button near footer
document.addEventListener("DOMContentLoaded", function () {
  const floatingBtn = document.querySelector('.floating-book-btn');
  const footerTrigger = document.getElementById('footer-trigger');

  if (floatingBtn && footerTrigger) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatingBtn.style.display = entry.isIntersecting ? 'none' : 'flex';
      });
    });

    footerObserver.observe(footerTrigger);
  }
});
