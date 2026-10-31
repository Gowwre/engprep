/* =========================================================
   EngPrep — 12 thì tiếng Anh
   Interactions: tense filtering, search and quiz
   ========================================================= */

(function () {
  'use strict';

  /* -------------------------------------------------------
     Tense filters and search
     ------------------------------------------------------- */

  const cards = Array.prototype.slice.call(document.querySelectorAll('.tense-card'));
  const tabs = Array.prototype.slice.call(document.querySelectorAll('.filter-tab'));
  const searchInput = document.getElementById('tense-search');
  const searchClear = document.getElementById('search-clear');
  const resultCount = document.getElementById('result-count');
  const emptyState = document.getElementById('empty-state');
  const resetFiltersBtn = document.getElementById('reset-filters');

  let activeGroup = 'all';

  function normalizeText(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  const cardText = new Map();
  cards.forEach(function (card) {
    cardText.set(card, normalizeText(card.textContent + ' ' + card.id));
  });

  function applyFilters() {
    const query = normalizeText(searchInput.value.trim());
    let visible = 0;

    cards.forEach(function (card) {
      const matchesGroup = activeGroup === 'all' || card.dataset.group === activeGroup;
      const matchesQuery = !query || cardText.get(card).includes(query);
      const show = matchesGroup && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });

    resultCount.textContent = visible + '/12 thì';
    emptyState.hidden = visible !== 0;
    searchClear.hidden = searchInput.value.length === 0;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeGroup = tab.dataset.group;
      tabs.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === tab));
      });
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);

  searchClear.addEventListener('click', function () {
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  });

  resetFiltersBtn.addEventListener('click', function () {
    activeGroup = 'all';
    searchInput.value = '';
    tabs.forEach(function (tab) {
      tab.setAttribute('aria-pressed', String(tab.dataset.group === 'all'));
    });
    applyFilters();
    searchInput.focus();
  });

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (searchInput.value) {
        searchInput.value = '';
        applyFilters();
      } else {
        searchInput.blur();
      }
    }
  });

  document.addEventListener('keydown', function (event) {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  /* -------------------------------------------------------
     Quiz
     ------------------------------------------------------- */

  const questions = [
    {
      tense: 'Present Simple',
      q: 'The artisan ______ conical hats by hand every day.',
      options: ['make', 'makes', 'is making', 'made'],
      answer: 1,
      explain: '“Every day” là dấu hiệu của thì hiện tại đơn. Chủ ngữ “The artisan” số ít nên động từ phải thêm -s: makes.'
    },
    {
      tense: 'Present Continuous',
      q: 'Look! The students ______ clay in the workshop right now.',
      options: ['mould', 'are moulding', 'moulded', 'have moulded'],
      answer: 1,
      explain: '“Look!” và “right now” cho biết hành động đang diễn ra → hiện tại tiếp diễn: are moulding.'
    },
    {
      tense: 'Present Perfect',
      q: 'I ______ Bat Trang pottery village three times.',
      options: ['visit', 'visited', 'have visited', 'am visiting'],
      answer: 2,
      explain: '“Three times” nói về trải nghiệm tính đến hiện tại, không gắn với thời điểm cụ thể → hiện tại hoàn thành: have visited.'
    },
    {
      tense: 'Present Perfect Continuous',
      q: "They ______ the old communal house since January, and it still isn't finished.",
      options: ['restore', 'restored', 'have restored', 'have been restoring'],
      answer: 3,
      explain: '“Since January” và việc vẫn chưa xong → hiện tại hoàn thành tiếp diễn, nhấn mạnh quá trình: have been restoring.'
    },
    {
      tense: 'Past Simple',
      q: 'Last summer, our class ______ My Son Sanctuary.',
      options: ['visits', 'visited', 'have visited', 'was visiting'],
      answer: 1,
      explain: '“Last summer” là thời gian đã kết thúc → quá khứ đơn: visited.'
    },
    {
      tense: 'Past Continuous',
      q: 'While Lan ______ the festival, she met an old friend.',
      options: ['watches', 'watched', 'was watching', 'has watched'],
      answer: 2,
      explain: '“While” đi với hành động đang diễn ra làm nền → quá khứ tiếp diễn: was watching. Hành động ngắn “met” chia quá khứ đơn.'
    },
    {
      tense: 'Past Perfect',
      q: 'By the time we ______, the water puppet show ______.',
      options: [
        'arrived / started',
        'arrived / had started',
        'had arrived / started',
        'arrive / has started'
      ],
      answer: 1,
      explain: 'Buổi diễn xảy ra trước khi chúng ta đến → quá khứ hoàn thành “had started”; việc đến sau chia quá khứ đơn “arrived”.'
    },
    {
      tense: 'Past Perfect Continuous',
      q: 'The dancers ______ for hours before the show began.',
      options: ['practise', 'practised', 'had been practising', 'have been practising'],
      answer: 2,
      explain: 'Việc kéo dài “for hours” trước một hành động quá khứ “began” → quá khứ hoàn thành tiếp diễn: had been practising.'
    },
    {
      tense: 'Future Simple',
      q: 'I think the new metro line ______ traffic congestion in the city.',
      options: ['reduces', 'reduced', 'will reduce', 'will be reducing'],
      answer: 2,
      explain: '“I think” + dự đoán về tương lai → tương lai đơn: will reduce.'
    },
    {
      tense: 'Future Continuous',
      q: 'At 8 a.m. tomorrow, we ______ the Hung King Temple.',
      options: ['visit', 'will visit', 'will be visiting', 'will have visited'],
      answer: 2,
      explain: '“At 8 a.m. tomorrow” là một mốc trong tương lai; hành động sẽ đang diễn ra tại mốc đó → tương lai tiếp diễn: will be visiting.'
    },
    {
      tense: 'Future Perfect',
      q: 'By 2030, the city ______ three new parks.',
      options: ['builds', 'will build', 'will have built', 'will be building'],
      answer: 2,
      explain: '“By 2030” → hành động sẽ hoàn thành trước mốc tương lai → tương lai hoàn thành: will have built.'
    },
    {
      tense: 'Future Perfect Continuous',
      q: 'By next June, she ______ English for five years.',
      options: ['will learn', 'will be learning', 'will have learned', 'will have been learning'],
      answer: 3,
      explain: '“By next June” và “for five years” → nhấn mạnh việc kéo dài đến mốc tương lai → tương lai hoàn thành tiếp diễn: will have been learning.'
    }
  ];

  const letters = ['A', 'B', 'C', 'D'];
  const total = questions.length;

  const quizStage = document.getElementById('quiz-stage');
  const quizStep = document.getElementById('quiz-step');
  const quizBar = document.getElementById('quiz-bar');
  const quizScore = document.getElementById('quiz-score');
  const quizProgress = document.querySelector('.quiz-progress');
  const quizBest = document.getElementById('quiz-best');

  let questionIndex = 0;
  let score = 0;
  let answers = [];
  let locked = false;

  function getBest() {
    try {
      return Number(localStorage.getItem('engprep-quiz-best')) || 0;
    } catch (error) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      localStorage.setItem('engprep-quiz-best', String(value));
    } catch (error) {
      /* Best score is a nice-to-have; failure does not affect the quiz. */
    }
  }

  function updateBestLabel() {
    const best = getBest();
    quizBest.textContent = best > 0
      ? 'Điểm cao nhất: ' + best + '/12'
      : 'Điểm cao nhất: chưa có';
  }

  function formatQuestion(text) {
    return text.replace('______', '<span class="gap"><span class="sr-only">chỗ trống</span></span>');
  }

  function updateProgress() {
    const completed = answers.length;
    quizBar.style.width = (completed / total) * 100 + '%';
    quizStep.textContent = 'Câu ' + (questionIndex + 1) + '/' + total;
    quizScore.textContent = score + ' câu đúng';
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(completed));
  }

  function renderQuestion() {
    const item = questions[questionIndex];
    locked = false;
    updateProgress();

    quizStage.innerHTML =
      '<div class="quiz-body">' +
        '<div class="quiz-meta">' +
          '<span class="quiz-tag">' + item.tense + '</span>' +
          '<span class="quiz-instruction">Chọn đáp án đúng</span>' +
        '</div>' +
        '<p class="quiz-question" tabindex="-1">' + formatQuestion(item.q) + '</p>' +
        '<div class="options" role="group" aria-label="Các đáp án">' +
          item.options.map(function (option, index) {
            return '<button class="option" type="button" data-index="' + index + '">' +
              '<span class="option-letter">' + letters[index] + '</span>' +
              '<span class="opt-text">' + option + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +
        '<div class="feedback" id="feedback" role="status" hidden></div>' +
      '</div>' +
      '<div class="quiz-foot">' +
        '<p class="quiz-hint" id="quiz-hint">Chọn một đáp án để xem giải thích.</p>' +
        '<button class="btn btn-primary" id="next-btn" type="button" disabled>' +
          (questionIndex === total - 1 ? 'Xem kết quả' : 'Câu tiếp theo') +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</button>' +
      '</div>';

    quizStage.querySelectorAll('.option').forEach(function (button) {
      button.addEventListener('click', function () {
        chooseAnswer(Number(button.dataset.index));
      });
    });

    document.getElementById('next-btn').addEventListener('click', nextQuestion);
  }

  function chooseAnswer(chosen) {
    if (locked) return;
    locked = true;

    const item = questions[questionIndex];
    const isCorrect = chosen === item.answer;
    const optionButtons = quizStage.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const hint = document.getElementById('quiz-hint');
    const nextBtn = document.getElementById('next-btn');

    optionButtons.forEach(function (button) {
      const optionIndex = Number(button.dataset.index);
      button.disabled = true;
      if (optionIndex === item.answer) button.classList.add('is-correct');
      if (optionIndex === chosen && !isCorrect) button.classList.add('is-wrong');
    });

    if (isCorrect) {
      score += 1;
    } else {
      feedback.classList.add('feedback-wrong');
      feedback.innerHTML =
        '<span class="feedback-icon" aria-hidden="true">✗</span>' +
        '<div class="feedback-text">' +
          '<strong>Chưa đúng.</strong>' +
          '<p>Đáp án đúng là ' + letters[item.answer] + '. ' + item.options[item.answer] + '. ' + item.explain + '</p>' +
        '</div>';
    }

    if (isCorrect) {
      feedback.classList.add('feedback-correct');
      feedback.innerHTML =
        '<span class="feedback-icon" aria-hidden="true">✓</span>' +
        '<div class="feedback-text">' +
          '<strong>Chính xác!</strong>' +
          '<p>' + item.explain + '</p>' +
        '</div>';
    }

    feedback.hidden = false;
    answers.push({ questionIndex: questionIndex, chosen: chosen, isCorrect: isCorrect });
    quizScore.textContent = score + ' câu đúng';
    hint.textContent = isCorrect ? 'Làm tốt lắm. Bấm tiếp tục nhé.' : 'Đọc giải thích rồi bấm tiếp tục.';
    nextBtn.disabled = false;
    quizBar.style.width = (answers.length / total) * 100 + '%';
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(answers.length));
  }

  function nextQuestion() {
    if (!locked) return;

    if (questionIndex === total - 1) {
      showResults();
      return;
    }

    questionIndex += 1;
    renderQuestion();
    const heading = quizStage.querySelector('.quiz-question');
    if (heading) heading.focus({ preventScroll: true });
  }

  function resultCopy(finalScore) {
    if (finalScore === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc 12 thì, sẵn sàng làm phần thì trong đề giữa kỳ.'
      };
    }
    if (finalScore >= 10) {
      return {
        title: 'Rất tốt!',
        message: 'Chỉ còn vài chỗ cần xem lại. Đọc kỹ các câu sai rồi làm lại để đạt 12/12 nhé.'
      };
    }
    if (finalScore >= 7) {
      return {
        title: 'Khá ổn, cần chú ý vài chỗ.',
        message: 'Quay lại sơ đồ 12 thì và mục So sánh nhanh, chú ý các cặp thì dễ nhầm.'
      };
    }
    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đừng vội làm đề. Đọc lại công thức và dấu hiệu nhận biết rồi làm lại bài kiểm tra nhé.'
    };
  }

  function showResults() {
    const copy = resultCopy(score);
    const best = getBest();
    if (score > best) saveBest(score);
    updateBestLabel();

    quizStep.textContent = 'Hoàn thành';
    quizScore.textContent = score + '/12';
    quizBar.style.width = '100%';
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(total));

    const wrongAnswers = answers.filter(function (answer) {
      return !answer.isCorrect;
    });

    let reviewHTML = '';
    if (wrongAnswers.length > 0) {
      reviewHTML =
        '<div class="review">' +
          '<p class="review-title">Các câu cần xem lại</p>' +
          wrongAnswers.map(function (answer) {
            const item = questions[answer.questionIndex];
            return '<div class="review-item">' +
              '<p class="review-q">' + item.q + '</p>' +
              '<p class="review-a"><strong>' + letters[item.answer] + '. ' + item.options[item.answer] + '</strong> · ' + item.tense + '</p>' +
            '</div>';
          }).join('') +
        '</div>';
    }

    quizStage.innerHTML =
      '<div class="quiz-body">' +
        '<div class="result">' +
          '<div class="result-emblem" aria-hidden="true">' + (score >= 10 ? '★' : '✎') + '</div>' +
          '<p class="result-score">' + score + '<small>/12</small></p>' +
          '<h3 class="result-title">' + copy.title + '</h3>' +
          '<p class="result-msg">' + copy.message + '</p>' +
          '<div class="result-actions">' +
            '<button class="btn btn-primary" id="retry-btn" type="button">Làm lại 12 câu</button>' +
            '<a class="btn btn-ghost" href="#tenses">Ôn lại 12 thì</a>' +
          '</div>' +
          reviewHTML +
        '</div>' +
      '</div>';

    document.getElementById('retry-btn').addEventListener('click', restartQuiz);
    quizStage.querySelector('.result-title').setAttribute('tabindex', '-1');
    quizStage.querySelector('.result-title').focus({ preventScroll: true });
  }

  function restartQuiz() {
    questionIndex = 0;
    score = 0;
    answers = [];
    locked = false;
    renderQuestion();
    const heading = quizStage.querySelector('.quiz-question');
    if (heading) heading.focus({ preventScroll: true });
  }

  updateBestLabel();
  renderQuestion();
})();
