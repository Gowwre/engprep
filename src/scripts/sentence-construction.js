/* =========================================================
   EngPrep — Sentence construction & Part VI (Sắp xếp câu)
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const dictProvide = {
    word: 'provide',
    meta: '/prəˈvaɪd/ · verb',
    meaning: 'to give something to somebody or make it available for them to use',
    examples: ['provide information', 'provides an opportunity', 'provide support', 'provide a service']
  };

  const dictHabit = {
    word: 'habit',
    meta: '/ˈhæbɪt/ · noun',
    meaning: 'something you do often and regularly',
    examples: ['eating habits', 'break the habit', 'develop the habit', 'let it become a habit']
  };

  const questions = [
    {
      tag: 'Sắp xếp · by + V-ing',
      chunks: ['The host band', 'a mashup of their hit songs', 'started off the concert', 'by presenting'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'The host band started off by presenting a mashup of their hit songs the concert.',
        'The host band a mashup of their hit songs started off the concert by presenting.',
        'The host band started off the concert by presenting a mashup of their hit songs.',
        'The host band started off the concert a mashup of their hit songs by presenting.'
      ],
      answer: 2,
      explain: 'Cấu trúc: S + started off + O + by + V-ing + O. “By presenting” phải đứng sau “the concert”.'
    },
    {
      tag: 'Sắp xếp · Chủ ngữ số ít',
      chunks: ['Studying abroad', 'opportunities to learn', 'gives students', 'about different cultures'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'Studying abroad give students opportunities to learn about different cultures.',
        'Studying abroad gives students opportunities to learn about different cultures.',
        'Studying abroad gives students about different cultures opportunities to learn.',
        'Studying abroad gives opportunities to learn students about different cultures.'
      ],
      answer: 1,
      explain: 'Chủ ngữ “Studying abroad” là cụm số ít → gives. Cụm “opportunities to learn about” đi liền nhau.'
    },
    {
      tag: 'Sắp xếp · Bổ nghĩa',
      chunks: ['Every one of us', 'our beloved leader', 'set by Uncle Hồ', 'should follow the example'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'Every one of us should follow our beloved leader the example set by Uncle Hồ.',
        'Every one of us our beloved leader should follow the example set by Uncle Hồ.',
        'Every one of us should follow the example our beloved leader set by Uncle Hồ.',
        'Every one of us should follow the example set by Uncle Hồ, our beloved leader.'
      ],
      answer: 3,
      explain: 'S + should follow + the example + set by Uncle Hồ, our beloved leader. Mệnh đề rút gọn bổ nghĩa cho “the example”.'
    },
    {
      tag: 'Sắp xếp · suggest + V-ing',
      chunks: ['My father', 'suggested', 'going', 'to the beach', 'this weekend'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'My father suggested going to the beach this weekend.',
        'My father suggested go to the beach this weekend.',
        'My father suggested to go to the beach this weekend.',
        'My father suggested going to the beach this weekend?'
      ],
      answer: 0,
      explain: 'suggest + V-ing. Không dùng suggest + to-V. Câu kể kết thúc bằng dấu chấm, không dùng dấu hỏi.'
    },
    {
      tag: 'Sắp xếp · Giới từ',
      chunks: ['She', 'is interested', 'in learning', 'about other cultures'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'She is interested on learning about other cultures.',
        'She is interested in learn about other cultures.',
        'She is interested in learning about other cultures.',
        'She interested is in learning about other cultures.'
      ],
      answer: 2,
      explain: 'be interested in + V-ing. Giới từ “in” và dạng V-ing đi liền nhau.'
    },
    {
      tag: 'Sắp xếp · spend + V-ing',
      chunks: ['He', 'spent', 'two hours', 'finishing', 'the report'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'He spent finishing two hours the report.',
        'He spent two hours finishing the report.',
        'He spent two hours to finish the report.',
        'He spent two hours finish the report.'
      ],
      answer: 1,
      explain: 'spend + time + V-ing. Không dùng spend + time + to-V.'
    },
    {
      tag: 'Sắp xếp · not only … but also',
      chunks: ['The concert', 'was', 'not only', 'exciting', 'but also', 'meaningful'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'The concert was not only exciting but also meaning.',
        'The concert not only was exciting but also meaningful.',
        'The concert was not only exciting but meaningful also.',
        'The concert was not only exciting but also meaningful.'
      ],
      answer: 3,
      explain: 'Cặp “not only … but also …” nối hai tính từ “exciting” và “meaningful”.'
    },
    {
      tag: 'Sắp xếp · Mệnh đề quan hệ',
      chunks: ['The book', 'which', 'I borrowed', 'from the library', 'is', 'very interesting'],
      q: 'Which sentence is correctly arranged?',
      options: [
        'The book which I borrowed from the library is very interesting.',
        'The book which I borrowed is very interesting from the library.',
        'The book which I borrowed from the library very interesting is.',
        'The book which I borrowed from the library is very interesting?'
      ],
      answer: 0,
      explain: 'Mệnh đề “which I borrowed from the library” đứng ngay sau “The book”; động từ chính “is” đứng sau mệnh đề.'
    },
    {
      tag: 'Từ điển · provide',
      dict: dictProvide,
      context: 'Volunteers are ready to ______ about how to get to the museum.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['provide information', 'provide an information', 'providing information', 'provide informations'],
      answer: 0,
      explain: 'Cụm cố định “provide information”. Information không đếm được nên không có “an” hoặc “-s”.'
    },
    {
      tag: 'Từ điển · provide',
      dict: dictProvide,
      context: 'The summer program ______ for learners to better their English skills.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['provide an opportunity', 'provides an opportunity', 'provides opportunity', 'providing an opportunity'],
      answer: 1,
      explain: 'Chủ ngữ “The summer program” số ít → provides; cụm đúng là “an opportunity”.'
    },
    {
      tag: 'Từ điển · habit',
      dict: dictHabit,
      context: 'I’m trying to ______ of staying up late.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['break habit', 'breaking the habit', 'break the habit', 'break the habits'],
      answer: 2,
      explain: 'Cụm “break the habit of” = bỏ thói quen. Sau “trying to” dùng động từ nguyên mẫu: break.'
    },
    {
      tag: 'Từ điển · habit',
      dict: dictHabit,
      context: 'Your ______ play an important role in body weight control.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['eating habit', 'eat habits', 'habits eating', 'eating habits'],
      answer: 3,
      explain: 'Cụm “eating habits” (thói quen ăn uống) là danh từ ghép số nhiều, đi với động từ “play”.'
    },
    {
      tag: 'Từ điển · habit',
      dict: dictHabit,
      context: 'Parents should help their children ______ of reading every day.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['develop the habit', 'developing the habit', 'develop habit', 'develop the habits'],
      answer: 0,
      explain: 'Cụm “develop the habit of” = hình thành thói quen. Sau “help sb” dùng động từ nguyên mẫu: develop.'
    },
    {
      tag: 'Từ điển · habit',
      dict: dictHabit,
      context: 'Once you start exercising, ______ a habit.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['let it becomes', 'let it become', 'letting it become', 'let it became'],
      answer: 1,
      explain: 'Cấu trúc “let it become a habit” = để nó trở thành thói quen; sau “let” dùng động từ nguyên mẫu.'
    },
    {
      tag: 'Từ điển · provide',
      dict: dictProvide,
      context: 'The library can ______ to students who need help.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['provides support', 'providing support', 'provide support', 'provide a support'],
      answer: 2,
      explain: 'Sau “can” dùng động từ nguyên mẫu: provide support. Support không đếm được nên không có “a”.'
    },
    {
      tag: 'Từ điển · provide',
      dict: dictProvide,
      context: 'The hotel ______ to all guests.',
      q: 'Choose the best phrase (2–3 words) to fill the gap.',
      options: ['provide a service', 'providing a service', 'provides service', 'provides a service'],
      answer: 3,
      explain: 'Chủ ngữ “The hotel” số ít → provides; cụm đúng là “a service”.'
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
        return Number(localStorage.getItem('engprep-sentence-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-sentence-best', String(value));
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

    function dictHtml(dict) {
      return (
        '<div class="sc-quiz-dict">' +
          '<div class="sc-quiz-dict-head">' +
            '<strong>' + dict.word + '</strong>' +
            '<span>' + dict.meta + '</span>' +
          '</div>' +
          '<p class="sc-quiz-dict-def">' + dict.meaning + '</p>' +
          '<div class="sc-quiz-dict-examples">' +
            dict.examples.map(function (example) {
              return '<span>' + example + '</span>';
            }).join('') +
          '</div>' +
        '</div>'
      );
    }

    function promptHtml(item) {
      let html = '';

      if (item.chunks) {
        html +=
          '<div class="sc-quiz-chunks">' +
            '<span class="sc-quiz-label">Các nhóm từ</span>' +
            '<div class="sc-chunk-list">' +
              item.chunks.map(function (chunk) {
                return '<span>' + chunk + '</span>';
              }).join('') +
            '</div>' +
          '</div>';
      }

      if (item.dict) {
        html += dictHtml(item.dict);
      }

      if (item.context) {
        html += '<div class="sc-quiz-context"><p>' + formatGap(item.context) + '</p></div>';
      }

      return html;
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
          promptHtml(item) +
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
          message: 'Bạn đã nắm chắc trật tự câu và cách dùng mục từ điển. Hãy giữ thói quen đọc lại cả câu trước khi viết đáp án.'
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
          message: 'Xem lại khung S + V + O, các cụm cố định và bước kiểm tra dạng từ ở mục từ điển.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn bước ghép câu, bảng trật tự từ và cách đọc mục từ điển rồi làm lại bài kiểm tra.'
      };
    }

    function reviewPrompt(item) {
      if (item.chunks) {
        return (
          '<div class="sc-review-chunks">' +
            item.chunks.map(function (chunk) {
              return '<span>' + chunk + '</span>';
            }).join('') +
          '</div>'
        );
      }

      if (item.context) {
        return '<p class="sc-review-context">' + formatGap(item.context) + '</p>';
      }

      return '';
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
                reviewPrompt(item) +
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
              '<a class="btn btn-ghost" href="#word-order">Ôn trật tự câu</a>' +
              '<a class="btn btn-ghost" href="#dictionary">Ôn mục từ điển</a>' +
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
