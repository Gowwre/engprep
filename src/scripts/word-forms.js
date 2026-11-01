/* =========================================================
   EngPrep — Từ loại (Word forms)
   Interactions: suffix filter, word-family filter and quiz
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
     Suffix table: filter + search
     ------------------------------------------------------- */

  const suffixRows = Array.prototype.slice.call(document.querySelectorAll('.wf-suffix-row'));
  const suffixTabs = Array.prototype.slice.call(document.querySelectorAll('.wf-suffix-toolbar .filter-tab'));
  const suffixSearch = document.getElementById('suffix-search');
  const suffixClear = document.getElementById('suffix-clear');
  const suffixCount = document.getElementById('suffix-count');
  const suffixEmpty = document.getElementById('suffix-empty');
  const suffixReset = document.getElementById('suffix-reset');

  let activeSuffixCategory = 'all';

  const suffixText = new Map();
  suffixRows.forEach(function (row) {
    suffixText.set(row, normalizeText(row.textContent + ' ' + row.dataset.cat));
  });

  function applySuffixFilters() {
    if (!suffixSearch || !suffixCount || !suffixEmpty) return;
    const query = normalizeText(suffixSearch.value.trim());
    let visible = 0;

    suffixRows.forEach(function (row) {
      const matchesCategory = activeSuffixCategory === 'all' || row.dataset.cat === activeSuffixCategory;
      const matchesQuery = !query || suffixText.get(row).includes(query);
      const show = matchesCategory && matchesQuery;
      row.hidden = !show;
      if (show) visible += 1;
    });

    suffixCount.textContent = visible + '/' + suffixRows.length + ' hậu tố';
    suffixEmpty.hidden = visible !== 0;
    if (suffixClear) suffixClear.hidden = suffixSearch.value.length === 0;
  }

  if (suffixSearch && suffixCount) {
    suffixTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeSuffixCategory = tab.dataset.cat;
        suffixTabs.forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === tab));
        });
        applySuffixFilters();
      });
    });

    suffixSearch.addEventListener('input', applySuffixFilters);

    if (suffixClear) {
      suffixClear.addEventListener('click', function () {
        suffixSearch.value = '';
        applySuffixFilters();
        suffixSearch.focus();
      });
    }

    if (suffixReset) {
      suffixReset.addEventListener('click', function () {
        activeSuffixCategory = 'all';
        suffixSearch.value = '';
        suffixTabs.forEach(function (tab) {
          tab.setAttribute('aria-pressed', String(tab.dataset.cat === 'all'));
        });
        applySuffixFilters();
        suffixSearch.focus();
      });
    }

    suffixSearch.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (suffixSearch.value) {
          suffixSearch.value = '';
          applySuffixFilters();
        } else {
          suffixSearch.blur();
        }
      }
    });

    applySuffixFilters();
  }

  /* -------------------------------------------------------
     Word families: filter + search
     ------------------------------------------------------- */

  const familyCards = Array.prototype.slice.call(document.querySelectorAll('.wf-family'));
  const familyTabs = Array.prototype.slice.call(document.querySelectorAll('.wf-family-toolbar .filter-tab'));
  const familySearch = document.getElementById('family-search');
  const familyClear = document.getElementById('family-clear');
  const familyCount = document.getElementById('family-count');
  const familyEmpty = document.getElementById('family-empty');
  const familyReset = document.getElementById('family-reset');

  let activeFamilyGroup = 'all';

  const familyText = new Map();
  familyCards.forEach(function (card) {
    familyText.set(card, normalizeText(card.textContent));
  });

  function applyFamilyFilters() {
    if (!familySearch || !familyCount || !familyEmpty) return;
    const query = normalizeText(familySearch.value.trim());
    let visible = 0;

    familyCards.forEach(function (card) {
      const matchesGroup = activeFamilyGroup === 'all' || card.dataset.core === 'true';
      const matchesQuery = !query || familyText.get(card).includes(query);
      const show = matchesGroup && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });

    familyCount.textContent = visible + '/' + familyCards.length + ' họ từ';
    familyEmpty.hidden = visible !== 0;
    if (familyClear) familyClear.hidden = familySearch.value.length === 0;
  }

  if (familySearch && familyCount) {
    familyTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeFamilyGroup = tab.dataset.core;
        familyTabs.forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === tab));
        });
        applyFamilyFilters();
      });
    });

    familySearch.addEventListener('input', applyFamilyFilters);

    if (familyClear) {
      familyClear.addEventListener('click', function () {
        familySearch.value = '';
        applyFamilyFilters();
        familySearch.focus();
      });
    }

    if (familyReset) {
      familyReset.addEventListener('click', function () {
        activeFamilyGroup = 'all';
        familySearch.value = '';
        familyTabs.forEach(function (tab) {
          tab.setAttribute('aria-pressed', String(tab.dataset.core === 'all'));
        });
        applyFamilyFilters();
        familySearch.focus();
      });
    }

    familySearch.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (familySearch.value) {
          familySearch.value = '';
          applyFamilyFilters();
        } else {
          familySearch.blur();
        }
      }
    });

    applyFamilyFilters();
  }

  /* -------------------------------------------------------
     Quiz
     ------------------------------------------------------- */

  const questions = [
    {
      tag: 'Vị trí',
      q: 'She is a very ______ singer.',
      options: ['success', 'successful', 'successfully', 'succeed'],
      answer: 1,
      explain: 'Sau “very” và trước danh từ “singer” cần tính từ → successful. success là danh từ, successfully là trạng từ, succeed là động từ.'
    },
    {
      tag: 'Hậu tố',
      q: 'Air ______ is a serious problem in big cities.',
      options: ['pollute', 'polluted', 'pollution', 'polluting'],
      answer: 2,
      explain: 'Chủ ngữ của câu cần danh từ → pollution. pollute là động từ; polluted và polluting là tính từ.'
    },
    {
      tag: 'Họ từ',
      q: 'We should protect the ______ environment.',
      options: ['nature', 'natural', 'naturally', 'naturalise'],
      answer: 1,
      explain: 'Trước danh từ “environment” cần tính từ → natural. nature là danh từ; naturally là trạng từ.'
    },
    {
      tag: 'Vị trí',
      q: 'He drives ______ on busy roads.',
      options: ['care', 'careful', 'carefully', 'careless'],
      answer: 2,
      explain: 'Bổ nghĩa cho động từ “drives” cần trạng từ → carefully. careful và careless là tính từ.'
    },
    {
      tag: 'Hậu tố',
      q: 'It is ______ to swim in this river.',
      options: ['danger', 'dangerous', 'dangerously', 'endanger'],
      answer: 1,
      explain: 'Sau “It is” cần tính từ → dangerous. danger là danh từ; dangerously là trạng từ; endanger là động từ.'
    },
    {
      tag: 'Bẫy đề',
      q: 'The teacher gave us some useful ______.',
      options: ['advices', 'advice', 'advise', 'advising'],
      answer: 1,
      explain: 'advice là danh từ không đếm được nên không thêm -s → advice. advise là động từ: She advised us to study.'
    },
    {
      tag: 'Họ từ',
      q: 'Our school has a lot of ______ activities.',
      options: ['culture', 'cultural', 'culturally', 'cultivate'],
      answer: 1,
      explain: 'Trước danh từ “activities” cần tính từ → cultural. culture là danh từ; culturally là trạng từ; cultivate là động từ.'
    },
    {
      tag: 'Bẫy đề',
      q: 'My brother is ______ in playing football.',
      options: ['interest', 'interested', 'interesting', 'interestingly'],
      answer: 1,
      explain: 'Cấu trúc be interested in + N/V-ing. Người cảm thấy hứng thú dùng -ed; interesting dùng cho vật hoặc việc gây hứng thú.'
    },
    {
      tag: 'Bẫy đề',
      q: 'The film was so ______ that we fell asleep.',
      options: ['bore', 'bored', 'boring', 'boringly'],
      answer: 2,
      explain: 'Bộ phim gây cảm giác buồn chán → boring. bored dùng khi người cảm thấy buồn chán.'
    },
    {
      tag: 'Hậu tố',
      q: 'We need to ______ the area with more trees.',
      options: ['beauty', 'beautiful', 'beautify', 'beautifully'],
      answer: 2,
      explain: 'Sau “to” cần động từ → beautify (làm đẹp). beauty là danh từ; beautiful là tính từ; beautifully là trạng từ.'
    },
    {
      tag: 'Hậu tố',
      q: 'The ______ of the new bridge has improved traffic.',
      options: ['construct', 'construction', 'constructive', 'constructively'],
      answer: 1,
      explain: 'Sau “The” và trước “of” cần danh từ → construction. construct là động từ; constructive là tính từ; constructively là trạng từ.'
    },
    {
      tag: 'Họ từ',
      q: 'She is an ______ person; she always comes up with new ideas.',
      options: ['imagine', 'imagination', 'imaginative', 'imaginatively'],
      answer: 2,
      explain: 'Trước danh từ “person” cần tính từ → imaginative. imagination là danh từ; imaginatively là trạng từ.'
    },
    {
      tag: 'Tiền tố',
      q: 'It is ______ to go out without an umbrella in this rain.',
      options: ['possible', 'impossible', 'possibly', 'possibility'],
      answer: 1,
      explain: 'Nghĩa câu cần “không thể” → impossible. Tiền tố im- đứng trước p. possibly là trạng từ; possibility là danh từ.'
    },
    {
      tag: 'Tiền tố',
      q: 'He is ______ because he lost his ticket.',
      options: ['happy', 'unhappy', 'happily', 'happiness'],
      answer: 1,
      explain: 'Sau “is” cần tính từ, và nghĩa câu là “không vui” → unhappy. Tiền tố un- tạo nghĩa phủ định.'
    },
    {
      tag: 'Bẫy đề',
      q: 'A smaller car is more ______ for a small family.',
      options: ['economic', 'economical', 'economically', 'economy'],
      answer: 1,
      explain: 'economical = tiết kiệm, ít tốn kém; economic = thuộc kinh tế. Sau “more” cần tính từ → economical.'
    },
    {
      tag: 'Bẫy đề',
      q: 'She studied very ______ for the exam.',
      options: ['hard', 'hardly', 'hardness', 'harder'],
      answer: 0,
      explain: 'hard = chăm chỉ; hardly = hầu như không. Bổ nghĩa cho “studied” và nghĩa câu là chăm chỉ → hard.'
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
        return Number(localStorage.getItem('engprep-word-forms-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-word-forms-best', String(value));
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
            '<span class="quiz-instruction">Chọn dạng đúng của từ</span>' +
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
          message: 'Bạn đã nắm chắc vị trí từ loại và các họ từ thường gặp. Tự tin làm phần từ loại trong đề thi nhé.'
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
          message: 'Xem lại bảng vị trí, hậu tố và các cặp -ed/-ing. Đừng chỉ học thuộc đuôi từ.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại ba bước xác định từ loại, sau đó xem bảng hậu tố và 40 họ từ rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#families">Ôn lại họ từ</a>' +
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
