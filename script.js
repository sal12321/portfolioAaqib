
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const toastEl = document.getElementById('toast');

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
    });
  }


  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.preventDefault();
      const href = el.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior:"smooth", block: 'start' });
      }
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-scroll-to');
      if (!id) return;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  window.sendMail = function (ev) {
    
    ev.preventDefault();
    const form = ev.target;
    const name = (form.name && form.name.value || '').trim();
    const email = (form.email && form.email.value || '').trim();
    const message = (form.message && form.message.value || '').trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before sending.');
      return;
    }

    showToast('Message sent — thanks! I will reply soon.');
    form.reset();
    // move focus to first field after sending
    if (form.name) form.name.focus();
  };


  function showToast(text, duration = 3500) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');

    // clear any existing hide timer
    if (toastEl._hideTimeout) clearTimeout(toastEl._hideTimeout);
    toastEl._hideTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
      toastEl._hideTimeout = null;
    }, duration);
  }

  // Accessibility: close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('show');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

});
