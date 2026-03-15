/**
 * Main JavaScript for Radiusdia Studio
 * Handles navigation state, smooth scrolling, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll State
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Reveal Animations (Intersection Observer)
  const fadeUpElements = document.querySelectorAll('.fade-up');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% is visible
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeUpElements.forEach(el => {
    observer.observe(el);
  });
  
  // Set current year in footer dynamically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

  // Handle Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        const response = await fetch('http://127.0.0.1:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          alert('Message sent successfully! We will get back to you soon.');
          contactForm.reset();
        } else {
          alert('Failed to send message. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Fetch Error: ' + error.message + '. Please check the terminal for backend errors.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
