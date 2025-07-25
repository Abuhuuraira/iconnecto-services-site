
// preloader //
 window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const bookBtn = document.querySelector('.floating-book-btn');

    setTimeout(() => {
      preloader.style.transition = 'opacity 1s ease';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
        mainContent.style.display = 'block';
        if (bookBtn) {
          bookBtn.style.display = 'block';
          bookBtn.style.opacity = '1';
        }
      }, 1000);
    }, 2500); // Adjust for how long logo stays
  });





// active nav bar //

   document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    links.forEach(link => {
      const linkPath = link.getAttribute('href');

      // Match full path (like /pages/home.html)
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  });




  // Swap typing line after first animation
  setTimeout(() => {
    const fullLine = document.getElementById("full-line");
    if (fullLine) fullLine.style.display = "none";
    document.getElementById("loop-line").classList.remove("hidden");
  }, 4000);

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Fade in service boxes when they scroll into view
  const serviceBoxes = document.querySelectorAll('.service-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  serviceBoxes.forEach(box => {
    observer.observe(box);
  });

// Show testimonial cards when they scroll into view
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


