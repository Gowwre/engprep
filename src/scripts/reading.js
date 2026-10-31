/* =========================================================
   EngPrep — Reading comprehension (Đọc hiểu)
   Interactions: connector filter and reading quiz
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
     Connectors: filter + search
     ------------------------------------------------------- */

  const connectorRows = Array.prototype.slice.call(document.querySelectorAll('.rc-connector-row'));
  const connectorTabs = Array.prototype.slice.call(document.querySelectorAll('.rc-toolbar .filter-tab'));
  const connectorSearch = document.getElementById('connector-search');
  const connectorClear = document.getElementById('connector-clear');
  const connectorCount = document.getElementById('connector-count');
  const connectorEmpty = document.getElementById('connector-empty');
  const connectorReset = document.getElementById('connector-reset');

  let activeConnectorCategory = 'all';

  const connectorText = new Map();
  connectorRows.forEach(function (row) {
    connectorText.set(row, normalizeText(row.textContent + ' ' + row.dataset.cat));
  });

  function applyConnectorFilters() {
    if (!connectorSearch || !connectorCount || !connectorEmpty) return;
    const query = normalizeText(connectorSearch.value.trim());
    let visible = 0;

    connectorRows.forEach(function (row) {
      const matchesCategory = activeConnectorCategory === 'all' || row.dataset.cat === activeConnectorCategory;
      const matchesQuery = !query || connectorText.get(row).includes(query);
      const show = matchesCategory && matchesQuery;
      row.hidden = !show;
      if (show) visible += 1;
    });

    connectorCount.textContent = visible + '/' + connectorRows.length + ' từ nối';
    connectorEmpty.hidden = visible !== 0;
    if (connectorClear) connectorClear.hidden = connectorSearch.value.length === 0;
  }

  if (connectorSearch && connectorCount) {
    connectorTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeConnectorCategory = tab.dataset.cat;
        connectorTabs.forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === tab));
        });
        applyConnectorFilters();
      });
    });

    connectorSearch.addEventListener('input', applyConnectorFilters);

    if (connectorClear) {
      connectorClear.addEventListener('click', function () {
        connectorSearch.value = '';
        applyConnectorFilters();
        connectorSearch.focus();
      });
    }

    if (connectorReset) {
      connectorReset.addEventListener('click', function () {
        activeConnectorCategory = 'all';
        connectorSearch.value = '';
        connectorTabs.forEach(function (tab) {
          tab.setAttribute('aria-pressed', String(tab.dataset.cat === 'all'));
        });
        applyConnectorFilters();
        connectorSearch.focus();
      });
    }

    connectorSearch.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (connectorSearch.value) {
          connectorSearch.value = '';
          applyConnectorFilters();
        } else {
          connectorSearch.blur();
        }
      }
    });

    applyConnectorFilters();
  }

  /* -------------------------------------------------------
     Quiz
     ------------------------------------------------------- */

  const questions = [
    {
      tag: 'Ý chính',
      passage: 'Our school has opened a small library in the school yard. Students can borrow books during the morning break and return them the next day. The library also has a quiet corner for reading. Many students say they read more now because books are easy to find.',
      q: 'What is the passage mainly about?',
      options: ['A new school library', 'A quiet corner in the yard', 'How to borrow books', 'Why students dislike reading'],
      answer: 0,
      explain: 'Cả đoạn nói về thư viện mới của trường: mở ở sân trường, cho mượn sách, có góc đọc. Các chi tiết còn lại chỉ hỗ trợ ý chính.'
    },
    {
      tag: 'Chi tiết',
      passage: 'The Mid-Autumn Festival takes place on the 15th day of the 8th lunar month. Children carry lanterns and eat mooncakes. Many families watch lion dances in the evening.',
      q: 'When does the Mid-Autumn Festival take place?',
      options: ['On the first day of the year', 'On the 15th day of the 8th lunar month', 'In the morning', 'Every weekend'],
      answer: 1,
      explain: 'Thông tin ngày tháng được nêu trực tiếp ở câu đầu. Khi câu hỏi có “when”, hãy scan ngày, tháng hoặc năm trong bài.'
    },
    {
      tag: 'Từ vựng',
      passage: 'The market sells fresh fruit at affordable prices. Many students buy bananas or oranges there because they are cheap and healthy.',
      q: 'The word “affordable” is closest in meaning to ______.',
      options: ['very expensive', 'not expensive', 'unhealthy', 'difficult to find'],
      answer: 1,
      explain: 'Câu sau giải thích affordable = cheap: giá phải chăng, không đắt. Đọc câu trước và sau để đoán nghĩa.'
    },
    {
      tag: 'Từ thay thế',
      passage: 'Many tourists visit Hoi An every year. They enjoy walking around the old town and trying local food.',
      q: 'In the passage, “They” refers to ______.',
      options: ['the old town', 'local food', 'many tourists', 'every year'],
      answer: 2,
      explain: '“They” là đại từ số nhiều thay cho “many tourists” ở câu trước. Chủ ngữ của câu trước là manh mối.'
    },
    {
      tag: 'Suy luận',
      passage: 'More people in the city are choosing to cycle to work. There are now more bike lanes, and air quality in some areas has improved.',
      q: 'What can be inferred from the passage?',
      options: ['Cycling can help reduce air pollution.', 'Nobody drives a car in the city.', 'Bike lanes are expensive to build.', 'Air quality is getting worse.'],
      answer: 0,
      explain: 'Bài nói nhiều người đi xe đạp hơn và chất lượng không khí ở một số khu vực đã cải thiện → có thể suy ra xe đạp giúp giảm ô nhiễm. Tránh đáp án cực đoan như “nobody”.'
    },
    {
      tag: 'NOT mentioned',
      passage: 'Last summer, Lan visited Da Nang with her family. They stayed in a hotel near My Khe Beach and tried seafood. Lan’s favourite place was the Dragon Bridge.',
      q: 'Which of the following is NOT mentioned in the passage?',
      options: ['My Khe Beach', 'Seafood', 'The Dragon Bridge', 'A museum'],
      answer: 3,
      explain: 'Bài nhắc đến My Khe Beach, seafood và Dragon Bridge; không có museum. Với NOT/EXCEPT, hãy kiểm tra từng phương án.'
    },
    {
      tag: 'Điền từ',
      passage: '______ plastic bags are convenient, they are harmful to the environment.',
      q: 'Choose the best word to fill in the blank.',
      options: ['Because', 'Although', 'So', 'Therefore'],
      answer: 1,
      explain: 'Hai mệnh đề tương phản: tiện lợi nhưng có hại → Although + mệnh đề. Because chỉ nguyên nhân; So/Therefore chỉ kết quả.'
    },
    {
      tag: 'Ý chính',
      passage: 'Our class started a recycling project last month. We collect used paper and plastic bottles every Friday. The money from selling them helps buy books for the school library. The project has also taught us to use less paper.',
      q: 'What is the passage mainly about?',
      options: ['A class recycling project', 'How to buy books', 'A trip to the library', 'Why paper is expensive'],
      answer: 0,
      explain: 'Câu đầu giới thiệu dự án tái chế; các câu sau nói hoạt động và kết quả. Đó là ý chính của cả đoạn.'
    },
    {
      tag: 'Chi tiết',
      passage: 'The school planted 2,000 trees around the playground last year. Students water the trees twice a week. The trees now provide shade and make the school greener.',
      q: 'How many trees did the school plant?',
      options: ['200', '2,000', '20,000', '12'],
      answer: 1,
      explain: 'Câu đầu nêu con số 2,000. Với câu hỏi “how many”, hãy scan số lượng trong bài.'
    },
    {
      tag: 'Từ vựng',
      passage: 'We should reduce the amount of water we use at home. Turning off the tap while brushing your teeth is a simple way to save water.',
      q: 'The word “reduce” is closest in meaning to ______.',
      options: ['make less', 'make more', 'drink quickly', 'turn on'],
      answer: 0,
      explain: 'reduce = làm giảm. Câu sau nói “save water” (tiết kiệm nước), giúp xác nhận nghĩa.'
    },
    {
      tag: 'Từ thay thế',
      passage: 'Lan joined a clean-up event at the beach. This event helped collect more than 100 kilograms of rubbish.',
      q: 'In the passage, “This event” refers to ______.',
      options: ['the beach', 'the rubbish', 'the clean-up event', '100 kilograms'],
      answer: 2,
      explain: '“This event” thay cho cụm “a clean-up event” ở câu trước. “This + danh từ” thường chỉ sự việc vừa được nhắc.'
    },
    {
      tag: 'Suy luận',
      passage: 'Nam listens to English songs every day. He writes down new words from the lyrics and looks them up in a dictionary. His English vocabulary has improved a lot.',
      q: 'What can be inferred about Nam?',
      options: ['He dislikes English music.', 'He learns vocabulary through songs.', 'He never uses a dictionary.', 'He only studies grammar.'],
      answer: 1,
      explain: 'Bài nói Nam nghe nhạc, ghi từ mới và tra từ điển; từ vựng tiến bộ → có thể suy ra anh ấy học từ vựng qua bài hát.'
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
        return Number(localStorage.getItem('engprep-reading-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-reading-best', String(value));
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

    function formatGap(text) {
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
            '<span class="quiz-instruction">Đọc đoạn và chọn đáp án</span>' +
          '</div>' +
          (item.passage
            ? '<div class="rc-quiz-passage">' +
                '<span class="rc-quiz-passage-label">Đoạn đọc</span>' +
                '<p>' + formatGap(item.passage) + '</p>' +
              '</div>'
            : '') +
          '<p class="quiz-question" tabindex="-1">' + formatGap(item.q) + '</p>' +
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
          message: 'Bạn đã nắm chắc các dạng câu đọc hiểu và biết tìm bằng chứng. Tự tin làm bài đọc trong đề thi nhé.'
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
          message: 'Xem lại bảng dạng câu và phần từ nối. Khi làm bài, hãy luôn tìm câu chứng minh cho đáp án.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn bước skim – scan, sau đó xem bảng dạng câu và đoạn đọc mẫu rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#types">Ôn lại dạng câu</a>' +
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
