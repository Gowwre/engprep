/* =========================================================
   EngPrep — Biển báo & giao tiếp
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const questions = [
    {
      tag: 'Biển báo · Cấm',
      sign: { label: 'Sign', text: 'NO PARKING' },
      q: 'What does the sign mean?',
      options: [
        'You can park here.',
        'Parking is free today.',
        'You must not park here.',
        'You should park quickly.'
      ],
      answer: 2,
      explain: 'No + V-ing = cấm làm gì. “No parking” nghĩa là không được đỗ xe, không phải có chỗ đỗ.'
    },
    {
      tag: 'Biển báo · Thông tin',
      sign: { label: 'Notice', text: 'FREE ENTRY' },
      q: 'What does the notice mean?',
      options: [
        'You must pay to enter.',
        'Food is free inside.',
        'The museum is closed.',
        'You can enter without paying.'
      ],
      answer: 3,
      explain: 'Free entry = vào cửa miễn phí. Thông báo không nói gì về đồ ăn hay giờ mở cửa.'
    },
    {
      tag: 'Biển báo · Thông tin',
      sign: { label: 'Notice', text: 'OUT OF ORDER' },
      q: 'What does the notice mean?',
      options: [
        'The machine is broken.',
        'You can order here.',
        'The shop is open.',
        'The price is lower.'
      ],
      answer: 0,
      explain: 'Out of order = máy hoặc hệ thống bị hỏng. Đừng nhầm “order” với “đặt hàng”.'
    },
    {
      tag: 'Biển báo · Thông tin',
      sign: { label: 'Notice', text: '50% OFF' },
      q: 'What does the sign mean?',
      options: [
        'You must buy two items.',
        'Everything is free.',
        'The price is reduced by half.',
        'The shop closes at five.'
      ],
      answer: 2,
      explain: '50% off = giảm 50% giá, tức trả một nửa giá. Không phải mua 1 tặng 1.'
    },
    {
      tag: 'Biển báo · Điều kiện',
      sign: { label: 'Notice', text: 'BOOKING REQUIRED' },
      q: 'What should you do?',
      options: [
        'Come at any time.',
        'Book before you come.',
        'Pay at the door.',
        'Wait for a free table.'
      ],
      answer: 1,
      explain: 'Required = bắt buộc; booking = đặt trước. Bạn phải đặt chỗ trước khi đến.'
    },
    {
      tag: 'Biển báo · Giới hạn',
      sign: { label: 'Sign', text: 'STAFF ONLY' },
      q: 'What does the sign mean?',
      options: [
        'Everyone can enter.',
        'Customers can use it after five.',
        'Staff must wait outside.',
        'Only employees can enter.'
      ],
      answer: 3,
      explain: 'Only = chỉ. Staff only = chỉ nhân viên được vào; khách không được vào.'
    },
    {
      tag: 'Biển báo · Cảnh báo',
      sign: { label: 'Sign', text: 'WET FLOOR' },
      q: 'What does the sign mean?',
      options: [
        'Be careful because the floor is wet.',
        'The floor will be cleaned later.',
        'You can skate here.',
        'The floor is closed forever.'
      ],
      answer: 0,
      explain: 'Wet floor = sàn ướt, cảnh báo trượt. Không phải thông báo sàn đã khô hay sẽ được lau.'
    },
    {
      tag: 'Biển báo · Cấm',
      sign: { label: 'Sign', text: 'NO FOOD OR DRINK' },
      q: 'What does the sign mean?',
      options: [
        'You can bring drinks only.',
        'Food is free here.',
        'You cannot bring food or drinks in.',
        'You must buy food here.'
      ],
      answer: 2,
      explain: 'No food or drink = cấm cả đồ ăn và đồ uống. “Or” ở đây gom cả hai, không phải chỉ cấm một thứ.'
    },
    {
      tag: 'Giao tiếp · Nhờ vả',
      context:
        '<strong>Mai:</strong> “Would you mind opening the window?”<br><strong>Nam:</strong> “______”',
      q: 'Choose the best response.',
      options: ['Yes, I would.', 'You’re welcome.', 'Not at all.', 'Never mind.'],
      answer: 2,
      explain: '“Not at all.” = không phiền, tức là đồng ý giúp. “You’re welcome.” đáp lời cảm ơn; “Never mind.” đáp lời xin lỗi.'
    },
    {
      tag: 'Giao tiếp · Gợi ý',
      context:
        '<strong>Lan:</strong> “Why don’t we join the clean-up campaign?”<br><strong>Hoa:</strong> “______”',
      q: 'Choose the best response.',
      options: ['Because we are busy.', 'Good idea.', 'You’re welcome.', 'I’m sorry, I’m late.'],
      answer: 1,
      explain: '“Why don’t we…?” là lời gợi ý, không phải câu hỏi nguyên nhân. Đáp “Good idea.” là phù hợp.'
    },
    {
      tag: 'Giao tiếp · Xin lỗi',
      context:
        '<strong>Nam:</strong> “I’m sorry I’m late.”<br><strong>Mai:</strong> “______”',
      q: 'Choose the best response.',
      options: ['You’re welcome.', 'Good idea.', 'I’m sorry.', 'Never mind.'],
      answer: 3,
      explain: 'Đáp lời xin lỗi bằng “Never mind.” hoặc “That’s all right.”. “You’re welcome.” dùng để đáp lời cảm ơn.'
    },
    {
      tag: 'Giao tiếp · Cảm ơn',
      context:
        '<strong>Hoa:</strong> “Thank you for helping me.”<br><strong>Lan:</strong> “______”',
      q: 'Choose the best response.',
      options: ['Never mind.', 'Good idea.', 'You’re welcome.', 'Yes, please.'],
      answer: 2,
      explain: '“You’re welcome.” là cách đáp chuẩn cho lời cảm ơn. “Never mind.” dùng khi ai đó xin lỗi.'
    },
    {
      tag: 'Giao tiếp · Mời',
      context:
        '<strong>Nam:</strong> “Would you like to come to my birthday party?”<br><strong>Mai:</strong> “______”',
      q: 'Choose the best response.',
      options: ['I’d love to. Thanks.', 'You’re welcome.', 'Never mind.', 'I’m sorry I’m late.'],
      answer: 0,
      explain: 'Đây là lời mời. “I’d love to. Thanks.” là cách nhận lời tự nhiên; các đáp án còn lại sai chức năng.'
    },
    {
      tag: 'Giao tiếp · Xin phép',
      context:
        '<strong>Nam:</strong> “May I use your phone?”<br><strong>Mai:</strong> “______”',
      q: 'Choose the best response.',
      options: ['You’re welcome.', 'I’m afraid you can’t.', 'Good idea.', 'Thanks a lot.'],
      answer: 1,
      explain: '“May I…?” là câu xin phép. “I’m afraid you can’t.” là lời từ chối lịch sự; “You’re welcome.” đáp lời cảm ơn.'
    },
    {
      tag: 'Giao tiếp · Sức khoẻ',
      context:
        '<strong>Lan:</strong> “You look tired. You should take a rest.”<br><strong>Mai:</strong> “______”',
      q: 'Choose the best response.',
      options: ['You’re welcome.', 'Good idea, I’m full.', 'Never mind.', 'Thanks. I’ll take a break.'],
      answer: 3,
      explain: 'Đây là lời khuyên về sức khoẻ. “Thanks. I’ll take a break.” đáp đúng; “I’m full” nói về ăn no, không hợp.'
    },
    {
      tag: 'Giao tiếp · Động viên',
      context:
        '<strong>Nam:</strong> “Don’t worry. You can do it!”<br><strong>Mai:</strong> “______”',
      q: 'Choose the best response.',
      options: ['You’re welcome.', 'I’m sorry.', 'Thanks. I’ll try.', 'Not at all.'],
      answer: 2,
      explain: 'Đây là lời động viên. “Thanks. I’ll try.” là đáp phù hợp; “Not at all.” thường đáp lời cảm ơn hoặc lời nhờ.'
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
        return Number(localStorage.getItem('engprep-signs-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-signs-best', String(value));
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

    function promptHtml(item) {
      if (item.sign) {
        return (
          '<div class="sg-quiz-sign">' +
            '<span>' + item.sign.label + '</span>' +
            '<strong>' + item.sign.text + '</strong>' +
          '</div>'
        );
      }

      if (item.context) {
        return '<div class="sg-quiz-context"><p>' + item.context + '</p></div>';
      }

      return '';
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
          message: 'Bạn đã nắm chắc cách đọc biển báo, thông báo và chọn câu đáp giao tiếp. Tự tin làm hai phần này trong đề nhé.'
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
          message: 'Xem lại bảng biển báo và tám chức năng giao tiếp. Khi làm bài, hãy xác định chức năng trước khi chọn đáp án.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn nhóm biển báo, bảng 20 mẫu và tám chức năng giao tiếp rồi làm lại bài kiểm tra.'
      };
    }

    function reviewPrompt(item) {
      if (item.sign) {
        return '<p class="sg-review-context">Biển báo: <strong>' + item.sign.text + '</strong></p>';
      }
      if (item.context) {
        return '<p class="sg-review-context">' + item.context + '</p>';
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
              '<a class="btn btn-ghost" href="#signs">Ôn biển báo</a>' +
              '<a class="btn btn-ghost" href="#communication">Ôn giao tiếp</a>' +
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
