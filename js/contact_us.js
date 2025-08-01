// === ACTIVE NAVBAR LINK ===
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});

// === HAMBURGER MENU TOGGLE ===
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});

// === CONTACT FORM SUBMISSION ===
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Email sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    }
  });
}

// === HIDE "BOOK A MEETING" BUTTON ON FOOTER VISIBILITY ===
const floatingBtn = document.querySelector(".floating-book-btn");
const footerTrigger = document.getElementById("footer-trigger");

if (floatingBtn && footerTrigger) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      floatingBtn.style.display = entry.isIntersecting ? "none" : "flex";
      floatingBtn.classList.toggle("hidden", entry.isIntersecting);
    });
  });

  observer.observe(footerTrigger);
}
