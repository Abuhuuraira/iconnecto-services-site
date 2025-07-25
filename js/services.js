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



 const track = document.getElementById("carouselTrack");
const container = document.getElementById("carouselContainer");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let scrollSpeed = 2;
let isDragging = false;
let isPaused = false;
let startX, scrollLeft;

// Clone carousel items for seamless infinite scroll
function cloneCarouselItems() {
  const cards = Array.from(track.children);
  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });
}

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

// Hover Pause
container.addEventListener("mouseenter", () => isPaused = true);
container.addEventListener("mouseleave", () => isPaused = false);

// Dragging
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
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

// Touch
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




// counter start

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 100; // Lower = faster

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

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target); // Start counter animation
        observer.unobserve(entry.target); // Run once
      }
    });
  }, {
    threshold: 0.5 // When 50% visible
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});


