document.addEventListener('DOMContentLoaded', () => {
  // Swap typing line after first animation
  setTimeout(() => {
    const fullLine = document.getElementById("full-line");
    const loopLine = document.getElementById("loop-line");
    if (fullLine) fullLine.style.display = "none";
    if (loopLine) loopLine.classList.remove("hidden");
  }, 4000);

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Active nav bar
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Animate counters when in view
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 200;
    const increment = Math.max(1, Math.ceil(target / speed));

    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // Show testimonial cards when in view
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

  testimonialCards.forEach(card => testimonialObserver.observe(card));

  // Hide floating button near footer
  const floatingBtn = document.querySelector('.floating-book-btn');
  const footerTrigger = document.getElementById('footer-trigger');

  if (floatingBtn && footerTrigger) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isVisible = entry.isIntersecting;
        floatingBtn.style.display = isVisible ? 'none' : 'flex';
        floatingBtn.classList.toggle('hidden', isVisible);
      });
    });
    footerObserver.observe(footerTrigger);
  }
});
