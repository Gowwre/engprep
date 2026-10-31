/* =========================================================
   EngPrep — Giới từ tiếng Anh
   Interactions: collocation filter and quiz
   ========================================================= */

(function () {
  'use strict';

  /* -------------------------------------------------------
     Collocations: filter + search
     ------------------------------------------------------- */

  const collocationItems = Array.prototype.slice.call(document.querySelectorAll('.collocation-item'));
  const collocationTabs = Array.prototype.slice.call(document.querySelectorAll('.collocation-toolbar .filter-tab'));
  const collocationSearch = document.getElementById('collocation-search');
  const collocationClear = document.getElementById('collocation-clear');
  const collocationCount = document.getElementById('collocation-count');
  const collocationEmpty = document.getElementById('collocation-empty');
  const collocationReset = document.getElementById('collocation-reset');

  let activeCategory = 'all';

  function normalizeText(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  const collocationText = new Map();
  collocationItems.forEach(function (item) {
    collocationText.set(item, normalizeText(item.textContent + ' ' + item.dataset.cat));
  });

  function applyCollocationFilters() {
    if (!collocationSearch || !collocationCount || !collocationEmpty) return;
    const query = normalizeText(collocationSearch.value.trim());
    let visible = 0;

    collocationItems.forEach(function (item) {
      const matchesCategory = activeCategory === 'all' || item.dataset.cat === activeCategory;
      const matchesQuery = !query || collocationText.get(item).includes(query);
      const show = matchesCategory && matchesQuery;
      item.hidden = !show;
      if (show) visible += 1;
    });

    collocationCount.textContent = visible + '/' + collocationItems.length + ' cụm';
    collocationEmpty.hidden = visible !== 0;
    if (collocationClear) collocationClear.hidden = collocationSearch.value.length === 0;
  }

  if (collocationSearch && collocationCount) {
    collocationTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeCategory = tab.dataset.category;
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
        activeCategory = 'all';
        collocationSearch.value = '';
        collocationTabs.forEach(function (tab) {
          tab.setAttribute('aria-pressed', String(tab.dataset.category === 'all'));
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

    document.addEventListener('keydown', function (event) {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        collocationSearch.focus();
        collocationSearch.select();
      }
    });

    applyCollocationFilters();
  }

  /* -------------------------------------------------------
     Quiz
     ------------------------------------------------------- */

  const questions = [
    {
      tag: 'Thời gian',
      q: 'We have a meeting ______ Monday morning.',
      options: ['in', 'on', 'at', 'by'],
      answer: 1,
      explain: '“Monday morning” là một buổi cụ thể của một ngày → on. Ta nói in the morning, nhưng on Monday morning.'
    },
    {
      tag: 'Thời gian',
      q: 'My birthday is ______ 12th March.',
      options: ['in', 'at', 'on', 'for'],
      answer: 2,
      explain: 'Có ngày cụ thể (12th March) → on. Chỉ có tháng hoặc năm mới dùng in: in March, in 2026.'
    },
    {
      tag: 'Thời gian',
      q: 'The workshop opens ______ 8 a.m.',
      options: ['at', 'on', 'in', 'since'],
      answer: 0,
      explain: 'Giờ cụ thể → at: at 8 a.m. Nhớ nhóm at + giờ, on + ngày, in + tháng/năm.'
    },
    {
      tag: 'Thời gian',
      q: 'They have lived in Hue ______ 2015.',
      options: ['for', 'since', 'in', 'during'],
      answer: 1,
      explain: 'since + mốc thời gian (2015) và hành động kéo dài đến hiện tại → since. for + khoảng thời gian.'
    },
    {
      tag: 'Thời gian',
      q: 'I have studied English ______ five years.',
      options: ['since', 'during', 'for', 'by'],
      answer: 2,
      explain: '“Five years” là một khoảng thời gian → for. since + mốc: since 2021.'
    },
    {
      tag: 'Cụm cố định',
      q: 'She is very good ______ Maths.',
      options: ['in', 'on', 'at', 'for'],
      answer: 2,
      explain: 'good đi với at: good at something. Tương tự bad at, excellent at.'
    },
    {
      tag: 'Cụm cố định',
      q: 'It depends ______ the weather.',
      options: ['of', 'on', 'in', 'with'],
      answer: 1,
      explain: 'depend on = phụ thuộc vào. Đừng thấy “của” mà dùng of.'
    },
    {
      tag: 'Cụm cố định',
      q: 'I’m looking forward to ______ you.',
      options: ['see', 'seeing', 'seen', 'saw'],
      answer: 1,
      explain: 'Trong look forward to, “to” là giới từ nên sau nó dùng V-ing: look forward to seeing.'
    },
    {
      tag: 'Vị trí',
      q: 'We arrived ______ Da Nang late at night.',
      options: ['at', 'in', 'to', 'on'],
      answer: 1,
      explain: 'arrive in + thành phố/quốc gia; arrive at + địa điểm nhỏ (arrive at the airport). Không dùng arrive to.'
    },
    {
      tag: 'Vị trí',
      q: 'She is sitting ______ her two friends.',
      options: ['among', 'between', 'next', 'behind'],
      answer: 1,
      explain: 'between dùng cho hai người/vật; among dùng cho ba người/vật trở lên.'
    },
    {
      tag: 'Chuyển động',
      q: 'He walked ______ the bridge to the other side.',
      options: ['through', 'across', 'along', 'into'],
      answer: 1,
      explain: 'across = băng qua một bề mặt/một bên sang bên kia. through = đi xuyên qua bên trong.'
    },
    {
      tag: 'Chuyển động',
      q: 'We went ______ the tunnel.',
      options: ['across', 'along', 'through', 'onto'],
      answer: 2,
      explain: 'Đi xuyên qua bên trong đường hầm → through. across là băng ngang qua bề mặt.'
    },
    {
      tag: 'Cụm cố định',
      q: 'Don’t worry ______ the exam.',
      options: ['of', 'with', 'for', 'about'],
      answer: 3,
      explain: 'worry about = lo lắng về. Tương tự: be worried about.'
    },
    {
      tag: 'Bẫy đề',
      q: 'The show starts ______ time, so don’t be late.',
      options: ['in', 'on', 'at', 'by'],
      answer: 1,
      explain: 'on time = đúng giờ. in time = kịp lúc, trước khi quá muộn.'
    },
    {
      tag: 'Bẫy đề',
      q: '______ the end, we decided to stay home.',
      options: ['At', 'On', 'In', 'By'],
      answer: 2,
      explain: 'in the end = cuối cùng (kết quả). at the end of + địa điểm/thời gian: at the end of the street.'
    },
    {
      tag: 'Bẫy đề',
      q: 'I usually go to school ______ foot.',
      options: ['by', 'on', 'with', 'in'],
      answer: 1,
      explain: 'on foot = đi bộ. Với phương tiện: by bus, by car, by bike (không có mạo từ).'
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
        return Number(localStorage.getItem('engprep-prepositions-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-prepositions-best', String(value));
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

    function formatQuestion(text) {
      return text.replace('______', '<span class="gap"><span class="sr-only">chỗ trống</span></span>');
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
          message: 'Bạn đã nắm chắc giới từ và các cụm cố định. Tự tin làm phần giới từ trong đề thi nhé.'
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
          message: 'Xem lại bảng thời gian, vị trí và phần cụm cố định. Đừng học từng giới từ riêng lẻ.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại ba điều cần nắm, sau đó học các cụm trong phần Cụm cố định rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#collocations">Ôn lại cụm từ</a>' +
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
