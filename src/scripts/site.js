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
    const navMenu = pageNav.querySelector('.page-nav-menu');
    const navCurrent = pageNav.querySelector('[data-page-nav-current]');

    pageLinks.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      if (!linkById.has(id)) linkById.set(id, []);
      linkById.get(id).push(link);
    });

    const sections = Array.prototype.slice.call(
      document.querySelectorAll('main section[id]')
    ).filter(function (section) {
      return linkById.has(section.id);
    });

    function setActiveLink(id) {
      const activeLinks = linkById.get(id) || [];
      pageLinks.forEach(function (link) {
        const isCurrent = activeLinks.indexOf(link) !== -1;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      const first = activeLinks[0];
      if (first && navCurrent) {
        navCurrent.textContent = first.dataset.label || first.textContent.trim();
      }

      const visibleLink = pageLinks.find(function (link) {
        return link.classList.contains('page-nav-link') && link.classList.contains('is-active');
      });
      const inner = visibleLink && visibleLink.closest('.page-nav-inner');
      if (inner) {
        const target = visibleLink.offsetLeft - inner.clientWidth / 2 + visibleLink.clientWidth / 2;
        inner.scrollTo({
          left: Math.max(0, target),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      }
    }

    const sectionObserver = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) {
          return b.target.offsetTop - a.target.offsetTop;
        });

      if (visible.length) setActiveLink(visible[0].target.id);
    }, { rootMargin: '-30% 0px -62% 0px', threshold: 0 });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

    if (navMenu) {
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.open = false;
        });
      });

      document.addEventListener('click', function (event) {
        if (!navMenu.open) return;
        if (!navMenu.contains(event.target)) navMenu.open = false;
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navMenu.open) {
          navMenu.open = false;
          navMenu.querySelector('summary')?.focus();
        }
      });
    }
  }

  /* QuickReview tabs: tabs are only interactive on narrow screens; CSS
     shows all three panels side by side on desktop. */
  document.querySelectorAll('[data-quick-review]').forEach(function (root) {
    const tabs = Array.prototype.slice.call(root.querySelectorAll('[data-qr-tab]'));
    const panels = Array.prototype.slice.call(root.querySelectorAll('[data-qr-panel]'));
    if (!tabs.length || !panels.length) return;

    function select(value, focusTab) {
      tabs.forEach(function (tab) {
        const active = tab.dataset.qrTab === value;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focusTab) tab.focus();
      });
      panels.forEach(function (panel) {
        const active = panel.dataset.qrPanel === value;
        panel.classList.toggle('is-active', active);
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab.dataset.qrTab, false);
      });

      tab.addEventListener('keydown', function (event) {
        let next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          next = tabs[(index + 1) % tabs.length];
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        }
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        event.preventDefault();
        select(next.dataset.qrTab, true);
      });
    });

    const initial = tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0];
    select(initial.dataset.qrTab, false);

    window.addEventListener('resize', function () {
      const active = tabs.find(function (tab) { return tab.getAttribute('aria-selected') === 'true'; }) || tabs[0];
      select(active.dataset.qrTab, false);
    });
  });
})();
