import { initFilter } from './lib/filter.js';
import { readProgress } from './lib/progress.js';

(function () {
  'use strict';

  const tabs = Array.from(document.querySelectorAll('[data-home-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-home-panel]'));
  const jumpLinks = Array.from(document.querySelectorAll('[data-home-jump]'));

  function showMode(mode, updateHash) {
    const valid = mode === 'path' ? 'path' : 'sheets';
    tabs.forEach(function (tab) {
      const active = tab.dataset.homeTab === valid;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.homePanel !== valid;
    });
    if (updateHash) {
      history.replaceState(null, '', valid === 'path' ? '#plan' : '#resources');
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      showMode(tab.dataset.homeTab, true);
    });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      showMode(next.dataset.homeTab, true);
      next.focus();
    });
  });

  jumpLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const mode = link.dataset.homeJump;
      showMode(mode, true);
      const target = document.getElementById(mode === 'path' ? 'plan' : 'resources');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (location.hash === '#plan') {
    showMode('path', false);
    requestAnimationFrame(function () {
      document.getElementById('plan')?.scrollIntoView({ block: 'start' });
    });
  }
  if (location.hash === '#resources') {
    showMode('sheets', false);
    requestAnimationFrame(function () {
      document.getElementById('resources')?.scrollIntoView({ block: 'start' });
    });
  }
  window.addEventListener('hashchange', function () {
    if (location.hash === '#plan') showMode('path', false);
    if (location.hash === '#resources') showMode('sheets', false);
  });

  initFilter({
    items: document.querySelectorAll('.hub-card'),
    search: document.getElementById('home-search'),
    clear: document.getElementById('home-clear'),
    count: document.getElementById('home-count'),
    empty: document.getElementById('home-empty'),
    reset: document.getElementById('home-reset'),
    countSuffix: 'tờ',
    shortcut: true
  });

  const progress = readProgress();
  const sheetEntries = Object.entries(progress.sheets || {});
  const done = sheetEntries.filter(function (entry) {
    const value = entry[1];
    return value && (value.best > 0 || value.attempts > 0);
  }).length;

  const doneEl = document.querySelector('[data-progress-done]');
  if (doneEl) doneEl.textContent = String(done);

  const mockEl = document.querySelector('[data-progress-mock]');
  if (mockEl) {
    mockEl.textContent = progress.mock && progress.mock.best > 0
      ? `Thi thử: ${progress.mock.best}/${progress.mock.total}`
      : 'Thi thử: chưa làm';
  }

  let latest = null;
  sheetEntries.forEach(function (entry) {
    const slug = entry[0];
    const value = entry[1];
    if (!value || (!value.best && !value.attempts)) return;
    if (!latest || String(value.lastAt || '') > String(latest.lastAt || '')) {
      latest = { slug, lastAt: value.lastAt };
    }
  });

  document.querySelectorAll('[data-progress-sheet]').forEach(function (node) {
    const slug = node.dataset.progressSheet;
    const value = progress.sheets[slug];
    node.textContent = value && (value.best > 0 || value.attempts > 0)
      ? `Đã luyện · ${value.best ?? 0}/${value.total ?? ''}`
      : 'Chưa luyện';
  });

  document.querySelectorAll('[data-path-status]').forEach(function (node) {
    const slug = node.dataset.pathStatus;
    const value = progress.sheets[slug];
    const isDone = value && (value.best > 0 || value.attempts > 0);
    node.textContent = isDone ? `Đã luyện · ${value.best ?? 0}/${value.total ?? ''}` : 'Chưa luyện';
    node.classList.toggle('is-done', Boolean(isDone));
  });

  const continueLink = document.getElementById('home-continue');
  if (continueLink && latest) {
    const card = document.querySelector(`[data-progress-sheet="${latest.slug}"]`);
    const cardLink = card && card.closest('.hub-card')?.querySelector('a.btn');
    const title = card && card.closest('.hub-card')?.querySelector('h3')?.textContent;
    if (cardLink) {
      continueLink.href = cardLink.href;
      continueLink.textContent = `Tiếp tục: ${title} →`;
      continueLink.hidden = false;
    }
  }
})();
