/* =========================================================
   EngPrep — shared list filter + search
   Used by the tenses, prepositions, word forms, reading and
   vocabulary toolbars.
   ========================================================= */

let shortcutBound = false;

/** Fold Vietnamese diacritics so search ignores accents. */
export function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Wire a toolbar to a list of cards/rows.
 *
 * @param {object} options
 * @param {Iterable<HTMLElement>} options.items
 * @param {Iterable<HTMLElement>} [options.tabs]
 * @param {HTMLInputElement | null} options.search
 * @param {HTMLElement | null} [options.clear]
 * @param {HTMLElement | null} options.count
 * @param {HTMLElement | null} options.empty
 * @param {HTMLButtonElement | null} [options.reset]
 * @param {string} [options.tabKey]   data attribute on filter tabs
 * @param {string} [options.itemKey]  data attribute on items
 * @param {string} [options.countSuffix] e.g. "cụm", "hậu tố"
 * @param {boolean} [options.includeData] include the data value in search text
 * @param {(item: HTMLElement, active: string) => boolean} [options.matches]
 * @param {boolean} [options.shortcut] register the "/" focus shortcut
 */
export function initFilter({
  items,
  tabs = [],
  search,
  clear = null,
  count,
  empty,
  reset = null,
  tabKey = 'cat',
  itemKey = 'cat',
  countSuffix = '',
  includeData = true,
  matches,
  shortcut = true,
  hashSection = '',
  hashChange = true
}) {
  if (!search || !count || !empty) return null;

  const itemList = Array.from(items);
  const tabList = Array.from(tabs);
  const textByItem = new Map(
    itemList.map((item) => {
      const extra = includeData ? item.dataset[itemKey] : '';
      return [item, normalizeText(`${item.textContent} ${extra || ''}`)];
    })
  );

  let active = 'all';

  function isMatch(item) {
    if (matches) return matches(item, active);
    return active === 'all' || item.dataset[itemKey] === active;
  }

  function applyFilters() {
    const query = normalizeText(search.value.trim());
    let visible = 0;

    itemList.forEach((item) => {
      const show = isMatch(item) && (!query || textByItem.get(item).includes(query));
      item.hidden = !show;
      if (show) visible += 1;
    });

    const suffix = countSuffix ? ` ${countSuffix}` : '';
    count.textContent = `${visible}/${itemList.length}${suffix}`;
    empty.hidden = visible !== 0;
    clear?.toggleAttribute('hidden', search.value.length === 0);
  }

  function selectTabValue(value) {
    const tab = tabList.find((item) => (item.dataset[tabKey] || 'all') === value);
    if (!tab) return;
    active = tab.dataset[tabKey] || 'all';
    tabList.forEach((item) => {
      item.setAttribute('aria-pressed', String(item === tab));
    });
    applyFilters();
  }

  function selectTab(tab) {
    selectTabValue(tab.dataset[tabKey] || 'all');
  }

  function readHashPreset() {
    if (!hashSection) return;
    const hash = window.location.hash.replace(/^#/, '');
    const prefix = `${hashSection}-`;
    if (!hash.startsWith(prefix)) return;
    selectTabValue(hash.slice(prefix.length));
  }

  tabList.forEach((tab) => {
    tab.addEventListener('click', () => selectTab(tab));
  });

  search.addEventListener('input', applyFilters);

  clear?.addEventListener('click', () => {
    search.value = '';
    applyFilters();
    search.focus();
  });

  reset?.addEventListener('click', () => {
    const allTab = tabList.find((tab) => (tab.dataset[tabKey] || 'all') === 'all');
    if (allTab) selectTab(allTab);
    search.value = '';
    applyFilters();
    search.focus();
  });

  search.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (search.value) {
      search.value = '';
      applyFilters();
    } else {
      search.blur();
    }
  });

  if (shortcut && !shortcutBound) {
    shortcutBound = true;

    document.addEventListener('keydown', (event) => {
      if (document.querySelector('dialog[open]')) return;

      const tag = document.activeElement ? document.activeElement.tagName : '';
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        search.focus();
        search.select();
      }
    });
  }

  applyFilters();
  readHashPreset();

  if (hashSection && hashChange) {
    window.addEventListener('hashchange', readHashPreset);
  }

  return {
    selectTab: selectTabValue,
    setQuery(value) {
      search.value = value;
      applyFilters();
    },
    reset() {
      selectTabValue('all');
      search.value = '';
      applyFilters();
    }
  };
}
