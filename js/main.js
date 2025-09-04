
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

// Activate service on scroll
const serviceBoxes = document.querySelectorAll('.service-box');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight/2;
  serviceBoxes.forEach(box => {
    if(box.offsetTop < scrollPos) box.classList.add('active');
    else box.classList.remove('active');
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

// Mobile Services Dropdown Toggle
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownLink = dropdown ? dropdown.querySelector("a") : null;
  const dropdownMenu = dropdown ? dropdown.querySelector(".dropdown-menu") : null;
  const navLinks = document.querySelector(".nav-links");

  if (dropdown && dropdownLink && dropdownMenu) {
    dropdownLink.addEventListener("click", (e) => {
      // Only run this on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();

        // Toggle dropdown menu
        dropdownMenu.classList.toggle("show");
        dropdown.classList.toggle("open");
      }
    });
  }

  // ✅ Close nav when user clicks a normal nav link (mobile only)
  const navItems = document.querySelectorAll(".nav-links a:not(.dropdown > a)");

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });
});

