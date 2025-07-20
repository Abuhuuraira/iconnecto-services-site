
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



  document.addEventListener("DOMContentLoaded", () => {
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
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


  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    const response = await fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Email sent successfully!');
      form.reset();
    } else {
      alert('Something went wrong.');
    }
  });
