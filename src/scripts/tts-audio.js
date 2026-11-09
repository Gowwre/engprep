/* Site-wide TTS audio enhancement for the core EngPrep word list.
   Plays pre-generated TTSMaker MP3s when available and falls back to the
   browser's speech synthesis. Pages without any target words do nothing. */
import { sitePath } from '../lib/urls';
import { normalizeTtsText } from '../lib/tts';
import ttsAudio from '../data/tts-audio.json';
import ttsWords from '../data/tts-words.json';

(function () {
  'use strict';

  const items = Array.isArray(ttsWords?.items) ? ttsWords.items : [];
  if (items.length === 0) return;

  const wordSet = new Set(items.map((item) => normalizeTtsText(item.text)));
  const phraseList = [...wordSet].filter(Boolean).sort((a, b) => b.length - a.length);
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const phraseRegex = phraseList.length
    ? new RegExp(`\\b(?:${phraseList.map(escapeRegExp).join('|')})\\b`, 'gi')
    : null;

  const overrides = {
    'arrive at/in': 'arrive at',
    'apologise / apologize for': 'apologise for'
  };

  const canSynthesize =
    'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const audioBase = sitePath('audio/tts/');
  const player = new Audio();
  player.preload = 'none';

  let activeElement = null;
  let requestId = 0;
  let playingId = 0;
  let playingSrc = '';

  player.addEventListener('ended', function () {
    finish(playingId);
  });
  player.addEventListener('error', function () {
    if (!activeElement || !playingSrc || player.currentSrc !== playingSrc) return;
    const text = activeElement.dataset.tts || activeElement.textContent || '';
    fallbackToSpeech(text, activeElement, playingId);
  });

  function resolveKey(text) {
    const cleaned = String(text ?? '')
      .replace(/\s*\+\s*(V-ing|V|N\/V-ing|N|time)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    const key = normalizeTtsText(cleaned);

    if (wordSet.has(key)) return key;
    if (overrides[key] && wordSet.has(overrides[key])) return overrides[key];

    // Handle slashed variants such as "arrive at/in" and "apologise / apologize for".
    const slashParts = cleaned.split(/\s*\/\s*/).map((part) => part.trim());
    if (slashParts.length > 1) {
      for (const part of slashParts) {
        const partKey = normalizeTtsText(part);
        if (wordSet.has(partKey)) return partKey;
      }
      const tail = slashParts[slashParts.length - 1].split(/\s+/).pop();
      for (const part of slashParts.slice(0, -1)) {
        const candidate = normalizeTtsText(`${part} ${tail}`);
        if (wordSet.has(candidate)) return candidate;
      }
    }

    return '';
  }

  function clearActive() {
    if (!activeElement) return;
    activeElement.classList.remove('is-playing');
    activeElement.removeAttribute('aria-busy');
    activeElement = null;
  }

  function stopAudio() {
    playingId = 0;
    playingSrc = '';
    try {
      player.pause();
      player.removeAttribute('src');
      player.load();
    } catch (error) {
      /* The audio element may not be ready yet. */
    }
  }

  function begin(element) {
    requestId += 1;
    stopAudio();
    if (canSynthesize) window.speechSynthesis.cancel();
    clearActive();
    activeElement = element;
    element.classList.add('is-playing');
    element.setAttribute('aria-busy', 'true');
    return requestId;
  }

  function finish(id) {
    if (id !== requestId) return;
    requestId += 1;
    clearActive();
  }

  function speak(text, id) {
    if (!canSynthesize) {
      finish(id);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onend = function () {
      finish(id);
    };
    utterance.onerror = function () {
      finish(id);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function fallbackToSpeech(text, element, id) {
    if (id !== requestId) return;
    requestId += 1;
    stopAudio();
    clearActive();

    if (!canSynthesize) return;

    const fallbackId = begin(element);
    speak(text, fallbackId);
  }

  function play(element, key, text) {
    const file = Object.prototype.hasOwnProperty.call(ttsAudio, key) ? ttsAudio[key] : '';
    const id = begin(element);

    if (typeof file === 'string' && file.length > 0) {
      const src = new URL(audioBase + file, window.location.href).href;
      playingId = id;
      playingSrc = src;
      player.src = src;
      const playback = player.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(function () {
          fallbackToSpeech(text, element, id);
        });
      }
      return;
    }

    speak(text, id);
  }

  function activate(element, text, inline) {
    if (!element || element.dataset.ttsKey || element.dataset.ttsWrapped) return;

    const key = resolveKey(text);
    if (!key) return;

    const file = Object.prototype.hasOwnProperty.call(ttsAudio, key) ? ttsAudio[key] : '';
    if (!file && !canSynthesize) return;

    // Keep table semantics: put the button inside the cell instead of turning
    // the cell itself into a button.
    if (element.tagName === 'TD' || element.tagName === 'TH') {
      element.dataset.ttsWrapped = 'true';
      const wrapper = document.createElement('span');
      while (element.firstChild) wrapper.append(element.firstChild);
      element.append(wrapper);
      element = wrapper;
    }

    element.classList.add('tts-audio');
    if (inline) element.classList.add('tts-inline');
    element.dataset.ttsKey = key;
    element.dataset.tts = key;

    if (element.tagName !== 'BUTTON' && element.tagName !== 'A') {
      element.setAttribute('role', 'button');
      element.setAttribute('tabindex', '0');
    }

    element.setAttribute('aria-label', `Nghe ${text}`);
    element.setAttribute('title', `Nghe ${text}`);

    element.addEventListener('click', function (event) {
      event.preventDefault();
      play(element, key, text);
    });

    element.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      play(element, key, text);
    });
  }

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'A', 'BUTTON']);

  function isSkipped(node) {
    let element = node.parentElement;
    while (element) {
      if (SKIP_TAGS.has(element.tagName)) return true;
      if (element.classList.contains('tts-audio')) return true;
      element = element.parentElement;
    }
    return false;
  }

  function wrapMatches(root) {
    if (!phraseRegex) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;
      if (isSkipped(node)) continue;
      nodes.push(node);
    }

    for (const textNode of nodes) {
      const value = textNode.nodeValue;
      phraseRegex.lastIndex = 0;

      if (!phraseRegex.test(value)) continue;
      phraseRegex.lastIndex = 0;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      while ((match = phraseRegex.exec(value))) {
        if (match.index > lastIndex) {
          fragment.append(document.createTextNode(value.slice(lastIndex, match.index)));
        }

        const span = document.createElement('span');
        span.textContent = match[0];
        activate(span, match[0], true);
        fragment.append(span.classList.contains('tts-audio') ? span : document.createTextNode(match[0]));
        lastIndex = phraseRegex.lastIndex;
      }

      if (lastIndex === 0) continue;
      if (lastIndex < value.length) {
        fragment.append(document.createTextNode(value.slice(lastIndex)));
      }

      textNode.replaceWith(fragment);
    }
  }

  const targets = [
    /* Pronunciation — exact elements */
    { selector: '.pron-examples span' },
    { selector: '.pron-mini-bucket strong' },
    {
      selector: '.pron-vowel-table tbody td:nth-child(2) code',
      extract: (text) => text.split('/')[0].trim()
    },
    {
      selector: '.pron-word-pairs-grid strong',
      extract: (text) => text.replace(/\([^)]*\)/g, '').trim()
    },
    {
      selector: '.pron-shift-row strong',
      extract: (text) => text.replace(/·/g, '').trim()
    },
    { selector: '.pron-exception em' },

    /* Pronunciation — mixed text: wrap only known words */
    { selector: '.pron-sorter-branch em', wrap: true },
    { selector: '.pron-spelling-grid > div', wrap: true },
    { selector: '.pron-stress-list li', wrap: true },
    { selector: '.pron-suffix-table tbody td:nth-child(3) code', wrap: true },

    /* Vocabulary */
    { selector: '#collocations tbody tr > :first-child' },
    { selector: '.vc-web-branch code' },
    { selector: '.vc-topic-chips span' },
    { selector: '.vc-entry-head strong' },
    { selector: '.vc-entry-line code' },
    { selector: '.vc-check-strip strong' },

    /* Prepositions */
    { selector: '#collocations .collocation-en' },

    /* Sentence patterns */
    { selector: '#dictionary code' },
    { selector: '#formulas code', wrap: true },
    { selector: '#verb-patterns code', wrap: true },

    /* Quick review and trap explanations contain many of the same targets. */
    { selector: '#quick-review .qr-list', wrap: true },
    { selector: '.trap-grid .trap', wrap: true }
  ];

  for (const target of targets) {
    document.querySelectorAll(target.selector).forEach(function (element) {
      if (target.wrap) {
        wrapMatches(element);
        return;
      }

      const raw = target.extract ? target.extract(element.textContent) : element.textContent;
      activate(element, raw.replace(/\s+/g, ' ').trim(), false);
    });
  }
})();
