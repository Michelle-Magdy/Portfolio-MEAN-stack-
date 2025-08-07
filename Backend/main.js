// Global variables
let isTyping = false;
let mobileMenuOpen = false;

const toggleThemeBtn = document.querySelector(".theme-toggle");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

toggleThemeBtn.addEventListener("click", toggleTheme);
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle i");

  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    themeToggle.className = "fas fa-moon";
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.className = "fas fa-sun";
  }
}

// Mobile Menu Functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn i");

  mobileMenuOpen = !mobileMenuOpen;

  if (mobileMenuOpen) {
    mobileMenu.classList.add("active");
    menuBtn.className = "fas fa-times";
  } else {
    mobileMenu.classList.remove("active");
    menuBtn.className = "fas fa-bars";
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn i");

  mobileMenu.classList.remove("active");
  menuBtn.className = "fas fa-bars";
  mobileMenuOpen = false;
}

document.querySelector(".nav-link").addEventListener("click", closeMobileMenu);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Typing Effect for Hero Section
function typeWriter(element, text, speed = 100) {
  if (isTyping) return;

  isTyping = true;
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      isTyping = false;
    }
  }
  type();
}

// Intersection Observer for Section Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Navbar background and active link on scroll
function updateNavOnScroll() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Update navbar background
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    if (document.body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(26, 32, 44, 0.98)";
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    if (document.body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(26, 32, 44, 0.95)";
    }
  }

  // Update active navigation link
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateNavOnScroll);

// Animate skill bars when they come into view
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".skill-category").forEach((category) => {
  skillObserver.observe(category);
});

// Form Submission Handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    alert("Please fill in all fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show success message
  alert("Thank you for your message! I'll get back to you soon.");

  // Reset form
  this.reset();
});

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize typing effect
  setTimeout(() => {
    const typingElement = document.getElementById("typing-text");
    if (typingElement && !isTyping) {
      typeWriter(typingElement, "Michelle Magdy", 150);
    }
  }, 1000);

  // Initialize scroll position
  updateNavOnScroll();

  // Add smooth transitions after page load
  document.body.style.opacity = "1";

  console.log("Michelle Magdy Portfolio - Ready!");
});

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && mobileMenuOpen) {
    closeMobileMenu();
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  if (
    mobileMenuOpen &&
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Add loading state
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
