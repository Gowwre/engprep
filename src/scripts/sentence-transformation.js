/* =========================================================
   EngPrep — Sentence transformation (Viết lại câu)
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const questions = [
    {
      tag: 'Điều kiện',
      q: 'Choose the correct rewriting: “Study hard, or you will fail the exam.”',
      options: [
        'If you study hard, you will fail the exam.',
        'If you don’t study hard, you will fail the exam.',
        'Unless you study hard, you will pass the exam.',
        'If you studied hard, you would fail the exam.'
      ],
      answer: 1,
      explain: '“Study hard, or …” = “If you don’t study hard, …” / “Unless you study hard, …”. Câu B giữ đúng nghĩa và thì.'
    },
    {
      tag: 'Wish',
      q: '“I don’t have a bike,” said Lan. → Lan wishes ______.',
      options: [
        'she has a bike',
        'she had a bike',
        'she will have a bike',
        'she didn’t have a bike'
      ],
      answer: 1,
      explain: 'Wish diễn tả điều không có thật ở hiện tại: lùi hiện tại đơn thành quá khứ đơn → she had a bike.'
    },
    {
      tag: 'V-ing',
      q: '“I really like playing football,” said Michael. → Michael is fond ______.',
      options: ['of playing football', 'to play football', 'of play football', 'playing football'],
      answer: 0,
      explain: 'be fond of + V-ing. Không dùng to-V sau “fond of”.'
    },
    {
      tag: 'Gián tiếp',
      q: '“Would you mind helping me with this exercise?” she asked. → She asked me ______.',
      options: [
        'to help her with that exercise',
        'helping her with that exercise',
        'help her with that exercise',
        'if I helped her with that exercise'
      ],
      answer: 0,
      explain: '“Would you mind + V-ing?” là lời nhờ lịch sự; khi tường thuật dùng ask sb to do sth → asked me to help her with that exercise.'
    },
    {
      tag: 'V-ing',
      q: '“Why don’t we go to the cinema?” he said. → He suggested ______.',
      options: [
        'to go to the cinema',
        'going to the cinema',
        'go to the cinema',
        'that go to the cinema'
      ],
      answer: 1,
      explain: 'suggest + V-ing. Cũng có thể dùng “suggested that we (should) go”, nhưng phương án đúng ở đây là “going”.'
    },
    {
      tag: 'Since',
      q: 'She last wrote to her grandparents in April. → She hasn’t ______.',
      options: [
        'written to her grandparents since April',
        'wrote to her grandparents since April',
        'written to her grandparents for April',
        'written to her grandparents in April'
      ],
      answer: 0,
      explain: 'last + V2/ed + mốc → have/has not + V3/ed + since + mốc. “Since April” là mốc thời gian.'
    },
    {
      tag: 'Since',
      q: 'It has been two years since she last participated in a competition. → She hasn’t ______.',
      options: [
        'participated in a competition for two years',
        'participated in a competition since two years',
        'participate in a competition for two years',
        'participated in a competition two years ago'
      ],
      answer: 0,
      explain: 'It has been + khoảng thời gian + since … → S + has/have not + V3/ed + for + khoảng thời gian. Không dùng since với “two years”.'
    },
    {
      tag: 'So / such',
      q: 'The weather was so awful that we couldn’t go picnicking. → It was ______.',
      options: [
        'such awful weather that we couldn’t go picnicking',
        'so awful weather that we couldn’t go picnicking',
        'such an awful weather that we couldn’t go picnicking',
        'so an awful weather that we couldn’t go picnicking'
      ],
      answer: 0,
      explain: 'such + (a/an) + adj + N + that. “Weather” không đếm được nên không dùng “an”.'
    },
    {
      tag: 'So / such',
      q: 'Tom is very lazy, so he can’t get good marks. → Tom is so ______.',
      options: [
        'lazy that he can’t get good marks',
        'lazy so he can’t get good marks',
        'lazy because he can’t get good marks',
        'lazy to get good marks'
      ],
      answer: 0,
      explain: 'so + adj + that + clause. “Very lazy, so …” đổi thành “so lazy that …”.'
    },
    {
      tag: 'Tương phản',
      q: 'Although the project was practical, nobody wanted to carry it out. → Despite ______.',
      options: [
        'the project was practical, nobody wanted to carry it out',
        'the practicality of the project, nobody wanted to carry it out',
        'being practical, nobody wanted to carry the project out',
        'practical, nobody wanted to carry out the project'
      ],
      answer: 1,
      explain: 'Despite + N/N phrase. “the practicality of the project” là cụm danh từ đúng; các phương án còn lại sai cấu trúc.'
    },
    {
      tag: 'Lý do',
      q: 'Because he performed well, he was nominated as Singer of the Year. → Because of ______.',
      options: [
        'he performed well, he was nominated as Singer of the Year',
        'his good performance, he was nominated as Singer of the Year',
        'performing well, he was nominated as Singer of the Year',
        'his perform well, he was nominated as Singer of the Year'
      ],
      answer: 1,
      explain: 'Because of + N/N phrase. “his good performance” là cụm danh từ đúng; because of không đi với mệnh đề.'
    },
    {
      tag: 'Cụm động từ',
      q: 'Our car stopped working on the way to the beach. → Our car ______.',
      options: [
        'broke down on the way to the beach',
        'broke up on the way to the beach',
        'ran out of on the way to the beach',
        'put off on the way to the beach'
      ],
      answer: 0,
      explain: 'break down = stop working (hỏng máy). break up = chia tay; run out of = hết; put off = hoãn.'
    },
    {
      tag: 'Cụm động từ',
      q: 'The shop has no more roses. → The shop has ______.',
      options: [
        'run out of roses',
        'run out roses',
        'run out of rose',
        'run out from roses'
      ],
      answer: 0,
      explain: 'run out of + N = hết, không còn. “Roses” giữ số nhiều vì bài nói nhiều bông hồng.'
    },
    {
      tag: 'Gián tiếp',
      q: '“I will help you tomorrow,” he said. → He said ______.',
      options: [
        'he will help me tomorrow',
        'he would help me the next day',
        'he would help you tomorrow',
        'he helped me the next day'
      ],
      answer: 1,
      explain: 'Will → would; tomorrow → the next day; you → me. Không giữ nguyên will/tomorrow khi tường thuật.'
    },
    {
      tag: 'V-ing',
      q: '“I’m looking forward to seeing you,” she said. → She said she was looking forward ______.',
      options: ['to see me', 'to seeing me', 'seeing me', 'for seeing me'],
      answer: 1,
      explain: 'look forward to + V-ing; “to” là giới từ, không phải dấu hiệu to-V.'
    },
    {
      tag: 'V-ing',
      q: 'It takes me two hours to do my homework every day. → I spend ______.',
      options: [
        'two hours to do my homework every day',
        'two hours doing my homework every day',
        'two hours do my homework every day',
        'two hours for doing my homework every day'
      ],
      answer: 1,
      explain: 'It takes + time + to-V ↔ S + spend + time + V-ing. “spend two hours doing …” là cấu trúc đúng.'
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
        return Number(localStorage.getItem('engprep-sentence-transformation-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-sentence-transformation-best', String(value));
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
            '<span class="quiz-instruction">Chọn câu viết lại đúng</span>' +
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
          message: 'Bạn đã nắm chắc các nhóm viết lại câu và kiểm soát được thì, cấu trúc. Tự tin làm câu 37–40 nhé.'
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
          message: 'Xem lại bảng công thức và các bẫy về thì, giới từ, V-ing/to-V. Đừng viết lại theo cảm giác.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại tám nhóm mẫu, sau đó học mẫu động từ và bảng bẫy rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#formulas">Ôn lại công thức</a>' +
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
