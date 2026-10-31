/* =========================================================
   EngPrep — shared site interactions
   Theme, print, mobile navigation and page-section spy
   ========================================================= */

(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;

  /* -------------------------------------------------------
     Theme
     ------------------------------------------------------- */

  const themeBtn = document.getElementById('theme-btn');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function updateThemeUI() {
    if (!themeBtn) return;
    const isDark = root.dataset.theme === 'dark';
    const label = isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
    if (themeMeta) themeMeta.content = isDark ? '#141914' : '#f6f1e6';
  }

  if (themeBtn) {
    updateThemeUI();
    themeBtn.addEventListener('click', function () {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('engprep-theme', next);
      } catch (error) {
        /* Storage can be unavailable; the theme still changes for this visit. */
      }
      updateThemeUI();
    });
  }

  /* -------------------------------------------------------
     Print
     ------------------------------------------------------- */

  document.querySelectorAll('[data-print]').forEach(function (button) {
    button.addEventListener('click', function () {
      window.print();
    });
  });

  /* -------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------- */

  const navBtn = document.getElementById('nav-btn');
  const siteNav = document.getElementById('site-nav');
  const siteHeader = document.querySelector('.site-header');

  function setNav(open) {
    if (!navBtn) return;
    body.classList.toggle('nav-open', open);
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  }

  if (navBtn && siteNav && siteHeader) {
    navBtn.addEventListener('click', function () {
      setNav(!body.classList.contains('nav-open'));
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNav(false);
      });
    });

    document.addEventListener('click', function (event) {
      if (body.classList.contains('nav-open') && !siteHeader.contains(event.target)) {
        setNav(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && body.classList.contains('nav-open')) {
        setNav(false);
      }
    });
  }

  /* -------------------------------------------------------
     Page-section navigation (scroll spy)
     ------------------------------------------------------- */

  const pageNav = document.querySelector('.page-nav');

  if (pageNav && 'IntersectionObserver' in window) {
    const pageLinks = Array.prototype.slice.call(
      pageNav.querySelectorAll('a[href^="#"]')
    );
    const linkById = new Map();

    pageLinks.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      if (id) linkById.set(id, link);
    });

    const sections = Array.prototype.slice.call(
      document.querySelectorAll('main section[id]')
    ).filter(function (section) {
      return linkById.has(section.id);
    });

    function setActiveLink(id) {
      pageLinks.forEach(function (link) {
        const isCurrent = link === linkById.get(id);
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    const sectionObserver = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) {
          return a.target.offsetTop - b.target.offsetTop;
        });

      if (visible.length) setActiveLink(visible[0].target.id);
    }, { rootMargin: '-30% 0px -62% 0px', threshold: 0 });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
