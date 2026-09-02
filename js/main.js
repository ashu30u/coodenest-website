/* ============================================================
   CoodeNest — main.js
   Shared interactivity across all pages
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Starfield background dots ---------- */
  document.querySelectorAll('.bg-field').forEach((field) => {
    const count = 22;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDelay = (Math.random() * 4) + 's';
      dot.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
      field.appendChild(dot);
    }
  });

  /* ---------- Mega menu / dropdown (desktop hover + click for touch) ---------- */
  document.querySelectorAll('.has-mega').forEach((item) => {
    const trigger = item.querySelector('.nav-link');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) return; // mobile handled by drawer
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.has-mega.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-mega')) {
      document.querySelectorAll('.has-mega.open').forEach(o => o.classList.remove('open'));
    }
  });

  /* ---------- Mobile drawer ---------- */
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const closeDrawerBtn = document.querySelector('.close-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeDrawerBtn && drawer) {
    closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }
  if (drawer) {
    drawer.addEventListener('click', (e) => { if (e.target === drawer) drawer.classList.remove('open'); });
  }

  /* ---------- Search overlay ---------- */
  const SEARCH_INDEX = [
    { name: 'Home', tag: 'PAGES', href: 'index.html' },
    { name: 'Services', tag: 'PAGES', href: 'services.html' },
    { name: 'Portfolio', tag: 'PAGES', href: 'portfolio.html' },
    { name: 'Pricing', tag: 'PAGES', href: 'pricing.html' },
    { name: 'About', tag: 'PAGES', href: 'about.html' },
    { name: 'Contact', tag: 'PAGES', href: 'contact.html' },
    { name: 'Book a Free 20-Min Call', tag: 'BOOKING', href: 'contact.html#book' },
    { name: 'Web Design', tag: 'SERVICES', href: 'services.html#web-design' },
    { name: 'Graphic Design', tag: 'SERVICES', href: 'services.html#graphic-design' },
    { name: 'Video Editing', tag: 'SERVICES', href: 'services.html#video-editing' },
    { name: 'Web Design Package — ₹5,000', tag: 'PRICING', href: 'pricing.html#packages' },
    { name: 'Graphic Design Package — ₹500', tag: 'PRICING', href: 'pricing.html#packages' },
    { name: 'Video Editing Package — ₹500', tag: 'PRICING', href: 'pricing.html#packages' },
  ];

  const searchTriggers = document.querySelectorAll('[data-search-trigger]');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input-row input');
  const searchResults = document.querySelector('.search-results');
  const searchEmpty = document.querySelector('.search-empty');

  function renderSearch(query) {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    const q = query.trim().toLowerCase();
    const list = q === '' ? SEARCH_INDEX : SEARCH_INDEX.filter(item => item.name.toLowerCase().includes(q));
    if (list.length === 0) {
      searchEmpty.style.display = 'block';
      return;
    }
    searchEmpty.style.display = 'none';
    list.forEach(item => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = item.href;
      a.innerHTML = `<span class="name">${item.name}</span><span class="tag">${item.tag}</span>`;
      searchResults.appendChild(a);
    });
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    renderSearch('');
    setTimeout(() => searchInput && searchInput.focus(), 100);
    document.body.style.overflow = 'hidden';
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); closeBooking(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  /* ---------- Booking modal ---------- */
  const bookingOverlay = document.querySelector('.modal-overlay');
  const bookingTriggers = document.querySelectorAll('[data-book-trigger]');
  const bookingClose = document.querySelectorAll('[data-book-close]');
  const bookingForm = document.querySelector('#bookingForm');
  const bookingFormWrap = document.querySelector('#bookingFormWrap');
  const bookingSuccess = document.querySelector('#bookingSuccess');

  function openBooking() {
    if (!bookingOverlay) return;
    bookingOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (bookingFormWrap) bookingFormWrap.style.display = '';
    if (bookingSuccess) bookingSuccess.style.display = 'none';
    if (bookingForm) bookingForm.reset();
  }
  function closeBooking() {
    if (!bookingOverlay) return;
    bookingOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  bookingTriggers.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openBooking(); }));
  bookingClose.forEach(btn => btn.addEventListener('click', closeBooking));
  if (bookingOverlay) {
    bookingOverlay.addEventListener('click', (e) => { if (e.target === bookingOverlay) closeBooking(); });
  }
  /* WhatsApp number */
  const WHATSAPP_NUMBER = '917869594579';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = bookingForm.querySelector('#bk-name');
      const emailInput = bookingForm.querySelector('#bk-email');
      const phoneInput = bookingForm.querySelector('#bk-phone');
      const dateInput = bookingForm.querySelector('#bk-date');
      const timeInput = bookingForm.querySelector('#bk-time');
      const msgInput = bookingForm.querySelector('#bk-msg');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const date = dateInput ? dateInput.value : '';
      const time = timeInput ? timeInput.value : '';
      const msg = msgInput && msgInput.value.trim() ? msgInput.value.trim() : 'N/A';

      // Format WhatsApp Message with full details
      const waMsg = 
`🚀 *New Booking Request — CoodeNest*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone / WhatsApp:* ${phone}
📅 *Preferred Date:* ${date || 'Not specified'}
⏰ *Preferred Time:* ${time || 'Not specified'}
💬 *Project Details:* ${msg}

Please confirm my free 20-min consultation call. Thank you!`;

      const encodedMsg = encodeURIComponent(waMsg);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Open WhatsApp directly to send details
      window.open(waUrl, '_blank');

      // Update success message in modal
      if (bookingFormWrap) bookingFormWrap.style.display = 'none';
      if (bookingSuccess) {
        bookingSuccess.style.display = 'block';
        const p = bookingSuccess.querySelector('p');
        if (p) {
          p.innerHTML = `Details sent to WhatsApp (<strong>+91 78695 94579</strong>).<br>We'll confirm your slot shortly.`;
        }
      }
    });
  }

  /* WhatsApp quick-menu buttons (data-wa-text attr) */
  document.querySelectorAll('[data-wa-text]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent(el.getAttribute('data-wa-text'));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Marquee: duplicate content for seamless loop ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 12px 30px rgba(0,0,0,0.35)' : 'none';
    }, { passive: true });
  }

});
