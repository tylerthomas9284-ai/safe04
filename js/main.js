// Haven & Hue - Main JavaScript

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  
  if (mobileNav.classList.contains('show')) {
    mobileNav.classList.remove('show');
    menuIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  } else {
    mobileNav.classList.add('show');
    menuIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }
}

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Active Navigation Link
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Cookie Consent
function showCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  const cookieBanner = document.getElementById('cookieConsent');
  
  if (!consent && cookieBanner) {
    cookieBanner.classList.add('show');
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieConsent').classList.remove('show');
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  document.getElementById('cookieConsent').classList.remove('show');
}

// Contact Form Handler
function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Log form data (in real app, this would send to backend)
  console.log('Form submitted:', data);
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.style.display = 'block';
    
    // Reset form
    setTimeout(() => {
      form.reset();
      successMessage.style.display = 'none';
    }, 3000);
  }
  
  return false;
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  showCookieConsent();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileNav && menuBtn && 
        mobileNav.classList.contains('show') && 
        !mobileNav.contains(event.target) && 
        !menuBtn.contains(event.target)) {
      toggleMobileMenu();
    }
  });
});

// Image Lazy Loading Fallback
function addImageFallback() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23f5f3ed" width="400" height="300"/><text x="50%" y="50%" font-family="Arial" font-size="18" fill="%238b9a7e" text-anchor="middle" dy=".3em">Image Not Available</text></svg>';
    });
  });
}

// Initialize image fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addImageFallback);
} else {
  addImageFallback();
}

// Update Copyright Year
const yearElement = document.querySelector('.copyright-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
