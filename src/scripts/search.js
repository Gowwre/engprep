/* =========================================================
   EngPrep — global search
   Lazy-loads the Pagefind index and renders a section-level
   command palette for the 12 sheets.
   ========================================================= */

import { normalizeText } from './lib/filter.js';
import { sitePath } from '../lib/urls';

const MAX_GROUPS = 8;
const MAX_PER_GROUP = 4;
const MAX_RESULTS = 20;
const WORD_RE = /[\p{L}\p{N}]+/gu;

function queryTokens(query) {
  return normalizeText(query).match(WORD_RE) || [];
}

function wordsOf(value) {
  return normalizeText(value).match(WORD_RE) || [];
}

function hasAllTokens(words, tokens) {
  if (!words.length) return false;

  const wordSet = new Set(words);

  return tokens.every((token) => {
    if (wordSet.has(token)) return true;
    for (const word of wordSet) {
      if (word.startsWith(token)) return true;
    }
    return false;
  });
}

function pageMatchesAllTokens(page, tokens) {
  if (tokens.length < 2) return true;

  const words = wordsOf(page.content || '');
  if (!words.length) return true;

  return hasAllTokens(words, tokens);
}

/* Pagefind returns a page when the words appear anywhere on it. Narrow
   multi-word queries to the section that contains every word, so a
   phrase like “look after” does not match two unrelated sections. */
function filterPageSections(page, tokens) {
  if (tokens.length < 2) return page;

  const rawWords = (page.content || '').split(/\s+/).filter(Boolean);
  const anchors = Array.isArray(page.anchors) ? page.anchors : [];
  const subs = Array.isArray(page.sub_results) ? page.sub_results : [];

  if (!rawWords.length || !subs.length) return page;

  const sections = anchors
    .filter(
      (anchor) =>
        anchor &&
        anchor.element === 'section' &&
        anchor.id &&
        anchor.id !== 'top' &&
        !anchor.id.startsWith('qr-') &&
        typeof anchor.location === 'number'
    )
    .sort((a, b) => a.location - b.location);

  if (!sections.length) return page;

  const boundsById = new Map();
  sections.forEach((anchor, index) => {
    const end =
      index + 1 < sections.length ? sections[index + 1].location : rawWords.length;
    boundsById.set(anchor.id, [anchor.location, end]);
  });

  const rootEnd = sections[0].location;
  const rootMatches = hasAllTokens(
    wordsOf(rawWords.slice(0, rootEnd).join(' ')),
    tokens
  );
  const rootSub = subs.find((sub) => sub.url === page.url);
  const matched = [];

  for (const sub of subs) {
    if (!sub.url || sub.url === page.url) continue;

    const hash = sub.url.split('#')[1] || '';
    const bounds = boundsById.get(hash);
    if (!bounds) continue;

    const sectionWords = wordsOf(
      `${sub.title || ''} ${rawWords.slice(bounds[0], bounds[1]).join(' ')}`
    );

    if (hasAllTokens(sectionWords, tokens)) matched.push(sub);
  }

  if (!rootMatches && !matched.length) return null;

  page.sub_results = matched;
  page.searchRoot = rootMatches
    ? {
        title: 'Tổng quan',
        url: page.url,
        excerpt: rootSub?.excerpt || page.excerpt
      }
    : null;

  return page;
}

/* Pagefind normalizes accents but not đ. Searching a d→đ variant lets
   students type “dieu kien” for “điều kiện” without changing the index. */
function expandVietnameseD(query) {
  if (!/[dD]/.test(query)) return null;
  return query.replace(/d/g, 'đ').replace(/D/g, 'Đ');
}

async function searchPair(pagefind, primaryQuery, secondaryQuery) {
  const [primary, secondary] = await Promise.all([
    pagefind.search(primaryQuery),
    secondaryQuery ? pagefind.search(secondaryQuery) : null
  ]);

  const seen = new Set();
  const results = [];

  for (const search of [primary, secondary]) {
    if (!search) continue;
    for (const result of search.results) {
      if (seen.has(result.id)) continue;
      seen.add(result.id);
      results.push(result);
    }
  }

  return results;
}

async function searchPages(pagefind, query) {
  const expanded = expandVietnameseD(query);

  return searchPair(
    pagefind,
    query,
    expanded && expanded !== query ? expanded : null
  );
}

(function () {
  'use strict';

  const root = document.querySelector('[data-search-root]');
  if (!root) return;

  const dialog = root.querySelector('dialog');
  const form = root.querySelector('[data-search-form]');
  const input = root.querySelector('[data-search-input]');
  const clear = root.querySelector('[data-search-clear]');
  const closeButton = root.querySelector('[data-search-close]');
  const intro = root.querySelector('[data-search-intro]');
  const loading = root.querySelector('[data-search-loading]');
  const results = root.querySelector('[data-search-results]');
  const empty = root.querySelector('[data-search-empty]');
  const error = root.querySelector('[data-search-error]');
  const errorText = root.querySelector('[data-search-error-text]');
  const status = root.querySelector('[data-search-status]');

  if (!dialog || !form || !input || !results) return;

  let pagefindPromise = null;
  let requestId = 0;
  let debounceTimer = 0;
  let lastQuery = '';

  function loadPagefind() {
    if (!pagefindPromise) {
      pagefindPromise = import(/* @vite-ignore */ sitePath('pagefind/pagefind.js'))
        .then(async (pagefind) => {
          await pagefind.options({
            baseUrl: sitePath(),
            basePath: sitePath('pagefind/'),
            excerptLength: 28,
            excerptEllipsis: '…',
            ranking: {
              metaWeights: {
                title: 5,
                sheet: 3,
                accent: 0,
                cardNo: 0
              }
            }
          });
          await pagefind.init();
          return pagefind;
        })
        .catch((loadError) => {
          pagefindPromise = null;
          throw loadError;
        });
    }

    return pagefindPromise;
  }

  function setView(view) {
    intro.hidden = view !== 'intro';
    loading.hidden = view !== 'loading';
    results.hidden = view !== 'results';
    empty.hidden = view !== 'empty';
    error.hidden = view !== 'error';
  }

  function setStatus(text) {
    status.textContent = text;
  }

  function showIntro() {
    requestId += 1;
    lastQuery = '';
    results.replaceChildren();
    setView('intro');
    setStatus('');
  }

  function showError(loadError) {
    console.error('EngPrep search:', loadError);
    lastQuery = '';
    setView('error');
    setStatus('');

    if (errorText) {
      errorText.textContent = import.meta.env.DEV
        ? 'Chạy `npm run build` để tạo chỉ mục tìm kiếm, rồi tải lại trang.'
        : 'Thử tải lại trang.';
    }
  }

  function createGroup(page, entries, hiddenCount) {
    const meta = page.meta || {};
    const sheetTitle = (meta.sheet || meta.title || 'Tờ ôn thi').trim();
    const cardNo = (meta.cardNo || '').trim();

    const group = document.createElement('section');
    group.className = 'search-group';
    if (meta.accent) group.dataset.accent = meta.accent;

    const head = document.createElement('header');
    head.className = 'search-group-head';

    if (cardNo) {
      const card = document.createElement('span');
      card.className = 'search-group-card';
      card.textContent = `Tờ ${cardNo}`;
      head.append(card);
    }

    const title = document.createElement('a');
    title.className = 'search-group-title';
    title.href = page.url;
    title.textContent = sheetTitle;
    head.append(title);

    const list = document.createElement('ul');
    list.className = 'search-group-list';

    entries.forEach((entry) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = entry.url;

      const titleText = (entry.title || 'Tổng quan').trim();

      const entryTitle = document.createElement('span');
      entryTitle.className = 'search-result-title';
      entryTitle.textContent = titleText;
      link.append(entryTitle);

      if (entry.excerpt) {
        const snippet = document.createElement('span');
        snippet.className = 'search-result-snippet';
        /* Pagefind escapes excerpt text and only adds <mark> elements. */
        snippet.innerHTML = entry.excerpt;
        link.append(snippet);
      }

      item.append(link);
      list.append(item);
    });

    group.append(head, list);

    if (hiddenCount > 0) {
      const more = document.createElement('p');
      more.className = 'search-result-more';
      more.textContent = `… và ${hiddenCount} mục khác trong tờ này`;
      group.append(more);
    }

    return group;
  }

  function collectEntries(page) {
    const subs = Array.isArray(page.sub_results) ? page.sub_results : [];
    const seen = new Set();
    const entries = [];

    for (const sub of subs) {
      if (!sub || !sub.url || sub.url === page.url) continue;
      if (seen.has(sub.url)) continue;
      seen.add(sub.url);
      entries.push(sub);
    }

    if (page.searchRoot) {
      entries.unshift(page.searchRoot);
    } else if (!entries.length) {
      entries.push({
        title: 'Tổng quan',
        url: page.url,
        excerpt: page.excerpt
      });
    }

    return entries;
  }

  function renderResults(pages, query) {
    results.replaceChildren();

    let groupCount = 0;
    let rowCount = 0;
    let truncated = false;

    for (const page of pages) {
      if (groupCount >= MAX_GROUPS || rowCount >= MAX_RESULTS) {
        truncated = true;
        break;
      }

      const entries = collectEntries(page);
      if (!entries.length) continue;

      const remainingSlots = MAX_RESULTS - rowCount;
      const displayed = entries.slice(0, Math.min(MAX_PER_GROUP, remainingSlots));
      if (!displayed.length) {
        truncated = true;
        break;
      }

      if (displayed.length < entries.length) truncated = true;

      results.append(createGroup(page, displayed, entries.length - displayed.length));
      groupCount += 1;
      rowCount += displayed.length;
    }

    if (!groupCount) {
      setView('empty');
      setStatus('');
      return;
    }

    setView('results');

    setStatus(
      truncated
        ? `Hiển thị ${rowCount} mục phù hợp nhất cho “${query}” trong ${groupCount} tờ.`
        : `Tìm thấy ${rowCount} mục cho “${query}” trong ${groupCount} tờ.`
    );
  }

  async function runSearch(query) {
    const current = ++requestId;
    lastQuery = query;

    setView('loading');
    setStatus(`Đang tìm “${query}”…`);

    try {
      const pagefind = await loadPagefind();
      const searchResults = await searchPages(pagefind, query);

      if (current !== requestId) return;

      const tokens = queryTokens(query);
      const pageResults = (
        await Promise.all(searchResults.slice(0, 12).map((result) => result.data()))
      )
        .filter((page) => pageMatchesAllTokens(page, tokens))
        .map((page) => filterPageSections(page, tokens))
        .filter(Boolean);

      if (current !== requestId) return;

      renderResults(pageResults, query);
    } catch (searchError) {
      if (current !== requestId) return;
      showError(searchError);
    }
  }

  function scheduleSearch() {
    const query = input.value.trim();
    clear?.toggleAttribute('hidden', !query);

    if (!query || !queryTokens(query).length) {
      clearTimeout(debounceTimer);
      showIntro();
      return;
    }

    clearTimeout(debounceTimer);

    if (query === lastQuery) return;

    debounceTimer = window.setTimeout(() => runSearch(query), 160);
  }

  function openSearch() {
    if (dialog.open) return;

    dialog.showModal();
    document.body.classList.add('search-open');

    /* Warm the index while the dialog animates in. */
    loadPagefind().catch(() => {});

    window.requestAnimationFrame(() => {
      input.focus();
      if (input.value.trim()) input.select();
    });
  }

  function closeSearch() {
    if (dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-search-open]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', openSearch);
    button.addEventListener('pointerenter', () => loadPagefind().catch(() => {}));
    button.addEventListener('focus', () => loadPagefind().catch(() => {}));
  });

  document.addEventListener('keydown', (event) => {
    if (event.altKey) return;
    if (!(event.ctrlKey || event.metaKey)) return;
    if (event.key.toLowerCase() !== 'k') return;

    event.preventDefault();
    openSearch();
  });

  input.addEventListener('input', scheduleSearch);

  clear?.addEventListener('click', () => {
    input.value = '';
    clear.hidden = true;
    showIntro();
    input.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (results.hidden) return;
    const first = results.querySelector('a.search-result') || results.querySelector('a[href]');
    if (first) first.click();
  });

  root.querySelectorAll('[data-search-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      const suggestion = button.dataset.searchSuggestion || '';
      input.value = suggestion;
      clear?.toggleAttribute('hidden', !suggestion);
      input.focus();
      runSearch(suggestion);
    });
  });

  closeButton?.addEventListener('click', closeSearch);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeSearch();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('search-open');
  });

  dialog.addEventListener('cancel', () => {
    document.body.classList.remove('search-open');
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    closeSearch();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' || results.hidden) return;
    const first = results.querySelector('a.search-result') || results.querySelector('a[href]');
    if (!first) return;
    event.preventDefault();
    first.focus();
  });

  results.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const links = Array.from(results.querySelectorAll('a[href]'));
    if (!links.length) return;

    const current = links.indexOf(document.activeElement);
    let next = null;

    if (event.key === 'ArrowDown') {
      next = current < 0 ? links[0] : links[Math.min(current + 1, links.length - 1)];
    } else if (event.key === 'ArrowUp') {
      next = current <= 0 ? input : links[current - 1];
    } else if (event.key === 'Home') {
      next = links[0];
    } else if (event.key === 'End') {
      next = links[links.length - 1];
    }

    if (!next) return;
    event.preventDefault();
    next.focus();
  });

  results.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) dialog.close();
  });

  if (input.value.trim()) {
    clear?.removeAttribute('hidden');
  } else {
    showIntro();
  }
})();
