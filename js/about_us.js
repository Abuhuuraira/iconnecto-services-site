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



document.addEventListener('DOMContentLoaded', () => {
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

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        observer.unobserve(counter); // Only animate once
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of element is visible
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});


  

  // ✅ Show testimonial cards when they scroll into view (defined once)
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

  
// disappear the book a meeting button at the button

  const floatingBtn = document.querySelector('.floating-book-btn');
  const footerTrigger = document.getElementById('footer-trigger');

  if (floatingBtn && footerTrigger) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatingBtn.style.display = entry.isIntersecting ? 'none' : 'flex';
      });
    });

    observer.observe(footerTrigger);
  }

if (floatingBtn && footerTrigger) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      floatingBtn.classList.toggle('hidden', entry.isIntersecting);
    });
  });

  observer.observe(footerTrigger);
}
