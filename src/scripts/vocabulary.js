/* =========================================================
   EngPrep — Vocabulary & collocations (Từ vựng)
   Interactions: collocation filter and quiz
   ========================================================= */

(function () {
  'use strict';

  function normalizeText(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  /* -------------------------------------------------------
     Collocations: filter + search
     ------------------------------------------------------- */

  const collocationRows = Array.prototype.slice.call(document.querySelectorAll('.vc-collocation-row'));
  const collocationTabs = Array.prototype.slice.call(document.querySelectorAll('.vc-toolbar .filter-tab'));
  const collocationSearch = document.getElementById('collocation-search');
  const collocationClear = document.getElementById('collocation-clear');
  const collocationCount = document.getElementById('collocation-count');
  const collocationEmpty = document.getElementById('collocation-empty');
  const collocationReset = document.getElementById('collocation-reset');

  let activeCollocationCategory = 'all';

  const collocationText = new Map();
  collocationRows.forEach(function (row) {
    collocationText.set(row, normalizeText(row.textContent + ' ' + row.dataset.cat));
  });

  function applyCollocationFilters() {
    if (!collocationSearch || !collocationCount || !collocationEmpty) return;
    const query = normalizeText(collocationSearch.value.trim());
    let visible = 0;

    collocationRows.forEach(function (row) {
      const matchesCategory = activeCollocationCategory === 'all' || row.dataset.cat === activeCollocationCategory;
      const matchesQuery = !query || collocationText.get(row).includes(query);
      const show = matchesCategory && matchesQuery;
      row.hidden = !show;
      if (show) visible += 1;
    });

    collocationCount.textContent = visible + '/' + collocationRows.length + ' cụm';
    collocationEmpty.hidden = visible !== 0;
    if (collocationClear) collocationClear.hidden = collocationSearch.value.length === 0;
  }

  if (collocationSearch && collocationCount) {
    collocationTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeCollocationCategory = tab.dataset.cat;
        collocationTabs.forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === tab));
        });
        applyCollocationFilters();
      });
    });

    collocationSearch.addEventListener('input', applyCollocationFilters);

    if (collocationClear) {
      collocationClear.addEventListener('click', function () {
        collocationSearch.value = '';
        applyCollocationFilters();
        collocationSearch.focus();
      });
    }

    if (collocationReset) {
      collocationReset.addEventListener('click', function () {
        activeCollocationCategory = 'all';
        collocationSearch.value = '';
        collocationTabs.forEach(function (tab) {
          tab.setAttribute('aria-pressed', String(tab.dataset.cat === 'all'));
        });
        applyCollocationFilters();
        collocationSearch.focus();
      });
    }

    collocationSearch.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (collocationSearch.value) {
          collocationSearch.value = '';
          applyCollocationFilters();
        } else {
          collocationSearch.blur();
        }
      }
    });

    applyCollocationFilters();
  }

  /* -------------------------------------------------------
     Quiz
     ------------------------------------------------------- */

  const questions = [
    {
      tag: 'Collocation',
      q: 'We need to ______ a decision about the trip.',
      options: ['do', 'make', 'take', 'have'],
      answer: 1,
      explain: 'make a decision = đưa ra quyết định. Không dùng do a decision.'
    },
    {
      tag: 'Collocation',
      q: 'She ______ part in the school contest last week.',
      options: ['took', 'made', 'did', 'had'],
      answer: 0,
      explain: 'take part in = tham gia. Quá khứ của take là took.'
    },
    {
      tag: 'Word choice',
      q: 'Air pollution has a serious ______ on our health.',
      options: ['affect', 'effect', 'effort', 'afford'],
      answer: 1,
      explain: 'have an effect on = có tác động đến. affect là động từ; effect là danh từ.'
    },
    {
      tag: 'Collocation',
      q: 'It depends ______ the weather.',
      options: ['of', 'on', 'in', 'for'],
      answer: 1,
      explain: 'depend on = phụ thuộc vào. Đây là cụm cố định, không dùng depend of.'
    },
    {
      tag: 'V-ing',
      q: 'I’m looking forward to ______ you.',
      options: ['see', 'seeing', 'saw', 'seen'],
      answer: 1,
      explain: 'look forward to + V-ing. “To” ở đây là giới từ, không phải to-V.'
    },
    {
      tag: 'Phrasal verb',
      q: 'Our car ______ on the way to the beach.',
      options: ['broke down', 'broke up', 'ran out', 'put off'],
      answer: 0,
      explain: 'break down = hỏng máy. break up = chia tay; run out = hết; put off = hoãn.'
    },
    {
      tag: 'Phrasal verb',
      q: 'We have ______ water. Can you buy some?',
      options: ['run out of', 'run out', 'run of', 'run off'],
      answer: 0,
      explain: 'run out of + N = hết, không còn. Không bỏ “of”.'
    },
    {
      tag: 'Dictionary entry',
      q: 'Volunteers ______ information about the museum.',
      options: ['provide', 'provides', 'providing', 'to provide'],
      answer: 0,
      explain: 'Chủ ngữ “Volunteers” số nhiều → provide. Cụm đúng là provide information.'
    },
    {
      tag: 'Dictionary entry',
      q: 'The school ______ students with books.',
      options: ['provides', 'provide', 'providing', 'provides to'],
      answer: 0,
      explain: 'Chủ ngữ “The school” số ít → provides. Cấu trúc: provide sb with sth.'
    },
    {
      tag: 'Collocation',
      q: 'I’m trying to break the ______ of staying up late.',
      options: ['habit', 'custom', 'tradition', 'rule'],
      answer: 0,
      explain: 'break the habit of + V-ing = bỏ thói quen làm gì. Habit là thói quen cá nhân.'
    },
    {
      tag: 'Topic vocabulary',
      q: 'A healthy ______ includes regular exercise.',
      options: ['lifestyle', 'lifeline', 'lifetime', 'living'],
      answer: 0,
      explain: 'healthy lifestyle = lối sống lành mạnh. Đây là collocation quen thuộc.'
    },
    {
      tag: 'Topic vocabulary',
      q: 'We should use public ______ to reduce traffic.',
      options: ['transport', 'traffic', 'vehicle', 'travel'],
      answer: 0,
      explain: 'public transport = giao thông công cộng. Đây là cụm cố định trong chủ đề môi trường/giao thông.'
    },
    {
      tag: 'Topic vocabulary',
      q: 'Solar power is a form of ______ energy.',
      options: ['renewable', 'renewed', 'renewing', 'renewal'],
      answer: 0,
      explain: 'renewable energy = năng lượng tái tạo. Tính từ đúng là renewable.'
    },
    {
      tag: 'Topic vocabulary',
      q: 'Many teenagers use social ______ every day.',
      options: ['media', 'medium', 'medial', 'median'],
      answer: 0,
      explain: 'social media = mạng xã hội. “Media” là dạng số nhiều của medium trong cụm này.'
    },
    {
      tag: 'Topic vocabulary',
      q: '“Deepfake” is most closely connected with ______.',
      options: ['artificial intelligence', 'traffic jams', 'cultural heritage', 'physical activity'],
      answer: 0,
      explain: 'Deepfake là công nghệ tạo video/âm thanh giả bằng AI → artificial intelligence.'
    },
    {
      tag: 'Dictionary entry',
      q: 'Which collocation is correct?',
      options: ['eating habits', 'eat habits', 'habits eating', 'habit of eat'],
      answer: 0,
      explain: 'eating habits = thói quen ăn uống. Habit đi với V-ing hoặc danh từ, không đi với “eat” đứng trước.'
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

  if (quizStage && quizStep && quizBar && quizScore && quizBest) {
    let questionIndex = 0;
    let score = 0;
    let answers = [];
    let locked = false;

    if (quizProgress) {
      quizProgress.setAttribute('aria-valuemax', String(total));
    }

    function getBest() {
      try {
        return Number(localStorage.getItem('engprep-vocabulary-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-vocabulary-best', String(value));
      } catch (error) {
        /* Best score is a nice-to-have. */
      }
    }

    function updateBestLabel() {
      const best = getBest();
      quizBest.textContent = best > 0
        ? 'Điểm cao nhất của bạn: ' + best + '/' + total
        : 'Điểm cao nhất của bạn: chưa có';
    }

    function updateProgress() {
      const completed = answers.length;
      quizBar.style.width = (completed / total) * 100 + '%';
      quizStep.textContent = 'Câu ' + (questionIndex + 1) + ' / ' + total;
      quizScore.textContent = score + ' đúng';
      if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(completed));
    }

    function renderQuestion() {
      const item = questions[questionIndex];
      locked = false;
      updateProgress();

      quizStage.innerHTML =
        '<div class="quiz-body">' +
          '<div class="quiz-meta">' +
            '<span class="quiz-tag">' + item.tag + '</span>' +
            '<span class="quiz-instruction">Chọn đáp án đúng</span>' +
          '</div>' +
          '<p class="quiz-question" tabindex="-1">' + item.q + '</p>' +
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
        feedback.classList.add('feedback-correct');
        feedback.innerHTML =
          '<span class="feedback-icon" aria-hidden="true">✓</span>' +
          '<div class="feedback-text">' +
            '<strong>Chính xác!</strong>' +
            '<p>' + item.explain + '</p>' +
          '</div>';
      } else {
        feedback.classList.add('feedback-wrong');
        feedback.innerHTML =
          '<span class="feedback-icon" aria-hidden="true">✗</span>' +
          '<div class="feedback-text">' +
            '<strong>Chưa đúng.</strong>' +
            '<p>Đáp án đúng là ' + letters[item.answer] + '. ' + item.options[item.answer] + '. ' + item.explain + '</p>' +
          '</div>';
      }

      feedback.hidden = false;
      answers.push({ questionIndex: questionIndex, chosen: chosen, isCorrect: isCorrect });
      quizScore.textContent = score + ' đúng';
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
          message: 'Bạn đã nắm chắc collocations, phrasal verbs và cách đọc mục từ điển. Tự tin làm phần từ vựng nhé.'
        };
      }
      if (finalScore >= total - 2) {
        return {
          title: 'Rất tốt!',
          message: 'Chỉ còn vài chỗ cần xem lại. Đọc kỹ các câu sai và thử lại để đạt điểm tối đa.'
        };
      }
      if (finalScore >= Math.ceil(total * 0.7)) {
        return {
          title: 'Khá ổn, cần chú ý vài chỗ.',
          message: 'Xem lại bảng collocations, phrasal verbs và các cụm trong mục từ điển. Đừng học từ đơn lẻ.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn nhóm từ vựng, sau đó học 32 cụm và hai mục từ mẫu rồi làm lại bài kiểm tra.'
      };
    }

    function showResults() {
      const copy = resultCopy(score);
      const best = getBest();
      if (score > best) saveBest(score);
      updateBestLabel();

      quizStep.textContent = 'Hoàn thành';
      quizScore.textContent = score + '/' + total;
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
                '<p class="review-a"><strong>' + letters[item.answer] + '. ' + item.options[item.answer] + '</strong> · ' + item.tag + '</p>' +
              '</div>';
            }).join('') +
          '</div>';
      }

      quizStage.innerHTML =
        '<div class="quiz-body">' +
          '<div class="result">' +
            '<div class="result-emblem" aria-hidden="true">' + (score >= total - 2 ? '★' : '✎') + '</div>' +
            '<p class="result-score">' + score + '<small>/' + total + '</small></p>' +
            '<h3 class="result-title">' + copy.title + '</h3>' +
            '<p class="result-msg">' + copy.message + '</p>' +
            '<div class="result-actions">' +
              '<button class="btn btn-primary" id="retry-btn" type="button">Làm lại ' + total + ' câu</button>' +
              '<a class="btn btn-ghost" href="#collocations">Ôn lại collocations</a>' +
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
  }
})();
