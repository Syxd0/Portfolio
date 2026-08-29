/**
 * Main Application Logic
 * Syed's Personal Developer Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Warm Light / Warm Dark) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('syed-theme');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        themeToggleBtn.setAttribute('aria-label', 'Switch to warm light mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        themeToggleBtn.setAttribute('aria-label', 'Switch to warm dark mode');
      }
    }
  }

  // Initial Theme Setup
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('syed-theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // --- 2. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking navigation items
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', false);
          mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // --- 3. Scroll Spy Navigation Highlight ---
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // --- 4. Toast Notification Utility ---
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, duration = 3000) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // --- 5. Copy Email Utility ---
  const copyEmailButtons = document.querySelectorAll('.btn-copy-email');
  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailToCopy = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.social.email) 
        ? PORTFOLIO_CONFIG.social.email 
        : 'syed.dev@example.com';
      
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`✓ Copied "${emailToCopy}" to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${emailToCopy}`);
      });
    });
  });

  // --- 6. Live Demo Modal Handlers ---
  const demoModal = document.getElementById('demo-modal');
  const demoModalClose = document.getElementById('demo-modal-close');
  const demoTriggerButtons = document.querySelectorAll('.btn-demo-trigger');

  demoTriggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) {
        demoModal.classList.add('open');
      }
    });
  });

  if (demoModalClose && demoModal) {
    demoModalClose.addEventListener('click', () => {
      demoModal.classList.remove('open');
    });

    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('open')) {
        demoModal.classList.remove('open');
      }
    });
  }

  // --- 7. Contact Form Submission Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast("⚠️ Please fill in all required fields.");
        return;
      }

      // Generate mailto link for seamless native client delivery
      const targetEmail = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.social.email) 
        ? PORTFOLIO_CONFIG.social.email 
        : 'syed.dev@example.com';
      
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`);
      
      showToast("✓ Opening your email client to send message...");
      
      setTimeout(() => {
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        contactForm.reset();
      }, 600);
    });
  }

  // Populate dynamic links from config.js if present
  if (typeof PORTFOLIO_CONFIG !== 'undefined') {
    const ghLinks = document.querySelectorAll('.link-github');
    ghLinks.forEach(link => {
      link.href = PORTFOLIO_CONFIG.social.github;
    });

    const liLinks = document.querySelectorAll('.link-linkedin');
    liLinks.forEach(link => {
      link.href = PORTFOLIO_CONFIG.social.linkedin;
    });

    const mailLinks = document.querySelectorAll('.link-email');
    mailLinks.forEach(link => {
      link.href = `mailto:${PORTFOLIO_CONFIG.social.email}`;
    });

    const emailDisplays = document.querySelectorAll('.display-email');
    emailDisplays.forEach(el => {
      el.textContent = PORTFOLIO_CONFIG.social.email;
    });
  }
});
