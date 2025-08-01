document.addEventListener("DOMContentLoaded", function () {
  // ===== Active Nav Bar =====
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // ===== Typing Line Animation Swap =====
  setTimeout(() => {
    const fullLine = document.getElementById("full-line");
    const loopLine = document.getElementById("loop-line");
    if (fullLine) fullLine.style.display = "none";
    if (loopLine) loopLine.classList.remove("hidden");
  }, 4000);

  // ===== Hamburger Menu Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // ===== Counter Animation on Scroll =====
  const counters = document.querySelectorAll('.counter');
  const speed = 100;
  const animate = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animate(counter), 20);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // ===== Hide Book Meeting Button near Footer =====
  const floatingBtn = document.querySelector('.floating-book-btn');
  const footerTrigger = document.getElementById('footer-trigger');
  if (floatingBtn && footerTrigger) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatingBtn.classList.toggle('hidden', entry.isIntersecting);
      });
    });
    footerObserver.observe(footerTrigger);
  }
});

// ===== Infinite Carousel =====
const track = document.getElementById("carouselTrack");
const container = document.getElementById("carouselContainer");

let scrollSpeed = 1.5;
let isDragging = false;
let isPaused = false;
let startX, scrollLeft;

function cloneCarouselItems() {
  const cards = Array.from(track.children);
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
}

if (track && container) {
  cloneCarouselItems();

  // Auto-scroll
  function autoScroll() {
    if (!isPaused && !isDragging) {
      track.scrollLeft += scrollSpeed;
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  requestAnimationFrame(autoScroll);

  // Pause on hover
  container.addEventListener("mouseenter", () => isPaused = true);
  container.addEventListener("mouseleave", () => isPaused = false);

  // Drag scroll (Desktop)
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = "grabbing";
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
    track.style.cursor = "grab";
  });
  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Drag scroll (Mobile)
  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  }, { passive: true });
  track.addEventListener("touchend", () => {
    isDragging = false;
  });
}
