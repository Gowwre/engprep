/* Pronunciation audio enhancement. The sheet still works without it. */
(function () {
  'use strict';

  if (!('speechSynthesis' in window)) return;

  const examples = document.querySelectorAll('.pron-examples span');

  function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  examples.forEach(function (node) {
    const word = node.textContent.trim();
    if (!word) return;

    node.classList.add('pron-audio');
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', `Nghe ${word}`);

    node.addEventListener('click', function () {
      speak(word);
    });

    node.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      speak(word);
    });
  });
})();
