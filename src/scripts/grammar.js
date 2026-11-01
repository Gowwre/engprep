/* =========================================================
   EngPrep — Ngữ pháp cốt lõi
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const questions = [
    {
      tag: 'Từ nối · Thêm ý',
      context:
        '<strong>Student:</strong> Innovations in technology are very important.<br><strong>Teacher:</strong> Sure. They can both save money ______ conserve the Earth’s resources.',
      q: 'Choose the best word to fill the gap.',
      options: ['as', 'and', 'but', 'or'],
      answer: 1,
      explain: 'Hai động từ “save” và “conserve” cùng chiều → and. But/or chỉ tương phản hoặc lựa chọn.'
    },
    {
      tag: 'Từ nối · Tương phản',
      context:
        '<strong>Jack:</strong> Did everything go well with your presentation yesterday?<br><strong>Lucy:</strong> I had prepared everything carefully, ______ the projector didn’t work.',
      q: 'Choose the best word to fill the gap.',
      options: ['so', 'because', 'but', 'although'],
      answer: 2,
      explain: 'Hai vế tương phản: chuẩn bị kỹ nhưng máy chiếu không chạy → but. So chỉ kết quả; because chỉ nguyên nhân; although cần mệnh đề tương phản nhưng không nối trực tiếp sau dấu phẩy theo cách này.'
    },
    {
      tag: 'Từ nối · Nguyên nhân',
      context:
        '<strong>Teacher:</strong> Who was absent from class this morning?<br><strong>Peter:</strong> Sam was! He didn’t come ______ he was sick.',
      q: 'Choose the best word to fill the gap.',
      options: ['so', 'but', 'because', 'though'],
      answer: 2,
      explain: 'Vế sau giải thích lý do Sam không đến → because. So chỉ kết quả; but/though chỉ tương phản.'
    },
    {
      tag: 'Từ nối · Kết quả',
      context: 'It rained heavily all morning, ______ the match was cancelled.',
      q: 'Choose the best word to fill the gap.',
      options: ['because', 'although', 'so', 'or'],
      answer: 2,
      explain: 'Vế sau là kết quả của việc mưa to → so. Because chỉ nguyên nhân; although chỉ tương phản; or chỉ lựa chọn.'
    },
    {
      tag: 'Từ nối · Kết quả',
      context: 'She studied hard for the exam. ______, she passed with a high score.',
      q: 'Choose the best word to fill the gap.',
      options: ['However', 'Therefore', 'Although', 'But'],
      answer: 1,
      explain: 'Câu trước là nguyên nhân, câu sau là kết quả → Therefore. However chỉ tương phản; But không đứng một mình trước dấu phẩy theo cách này.'
    },
    {
      tag: 'Mệnh đề quan hệ · Người',
      context:
        '<strong>Mike:</strong> We’re looking for a talented artist for the music program next month.<br><strong>Sarah:</strong> My friend Anna, ______ sings folk songs very well, may be suitable.',
      q: 'Choose the best word to fill the gap.',
      options: ['who', 'whom', 'which', 'whose'],
      answer: 0,
      explain: 'Danh từ trước là người (Anna) và đại từ làm chủ ngữ → who. Có dấu phẩy nên không dùng that.'
    },
    {
      tag: 'Mệnh đề quan hệ · Vật',
      context:
        '<strong>Ms Lan:</strong> What’s your favorite holiday destination?<br><strong>Ms Mai:</strong> I love a town or city ______ has quiet streets and a lot of museums.',
      q: 'Choose the best word to fill the gap.',
      options: ['who', 'whom', 'whose', 'that'],
      answer: 3,
      explain: 'Danh từ trước là vật (town or city), mệnh đề xác định → that (hoặc which). Who/whom dùng cho người; whose chỉ sở hữu.'
    },
    {
      tag: 'Mệnh đề quan hệ · Sở hữu',
      context: 'The boy ______ bike was stolen reported it to the police.',
      q: 'Choose the best word to fill the gap.',
      options: ['who', 'which', 'whose', 'where'],
      answer: 2,
      explain: 'Cần đại từ sở hữu đứng trước danh từ “bike” → whose. Who thay cho người; which thay cho vật; where chỉ nơi chốn.'
    },
    {
      tag: 'Mệnh đề quan hệ · Nơi chốn',
      context: 'This is the house ______ we lived when I was a child.',
      q: 'Choose the best word to fill the gap.',
      options: ['which', 'who', 'whose', 'where'],
      answer: 3,
      explain: 'Danh từ trước là nơi chốn (house) → where = in which. Which không thay được vì câu đã có đủ tân ngữ.'
    },
    {
      tag: 'So sánh · Hơn',
      context: 'This city is ______ than I expected.',
      q: 'Choose the best answer.',
      options: ['more crowded', 'most crowded', 'crowded', 'more crowding'],
      answer: 0,
      explain: 'Có “than” → so sánh hơn. “Crowded” là tính từ dài nên dùng more crowded.'
    },
    {
      tag: 'So sánh · Nhất',
      context: 'She is ______ student in our class.',
      q: 'Choose the best answer.',
      options: ['tallest', 'taller', 'as tall', 'the tallest'],
      answer: 3,
      explain: 'So sánh nhất với “in our class” → the tallest. Không bỏ “the” trước so sánh nhất.'
    },
    {
      tag: 'So sánh · Bằng nhau',
      context: 'The film is not ______ interesting as the book.',
      q: 'Choose the best word to fill the gap.',
      options: ['more', 'most', 'as', 'than'],
      answer: 2,
      explain: 'Cấu trúc so sánh bằng phủ định: not as + adj + as. “Than” chỉ dùng với so sánh hơn.'
    },
    {
      tag: 'So sánh · Even',
      context: 'It is even ______ today than it was yesterday.',
      q: 'Choose the best answer.',
      options: ['hot', 'hotter', 'hottest', 'more hot'],
      answer: 1,
      explain: 'Có “than” → so sánh hơn. “Hot” là tính từ ngắn, gấp đôi phụ âm: hotter. Even + comparative = càng … hơn.'
    },
    {
      tag: 'Mẫu động từ · to-V',
      context:
        '<strong>Mark:</strong> What do you think about your Chemistry teacher?<br><strong>Helen:</strong> He’s great. He always ______ his students to do their best.',
      q: 'Choose the best word to fill the gap.',
      options: ['encourages', 'sends', 'lets', 'makes'],
      answer: 0,
      explain: 'encourage sb to do sth = khuyến khích ai làm gì. Let/make + sb + bare V, nên không hợp với “to do”.'
    },
    {
      tag: 'Mẫu động từ · Forget',
      context:
        '<strong>Mom:</strong> Don’t forget ______ all the lights and fans before you leave home.<br><strong>Tim:</strong> I sure will.',
      q: 'Choose the best answer.',
      options: ['turning off', 'to turn off', 'turning on', 'to turn on'],
      answer: 1,
      explain: 'forget to do = quên làm (chưa làm). “Turn off” là tắt; “turn on” là bật. Ngữ cảnh rời nhà → tắt điện → to turn off.'
    },
    {
      tag: 'Mẫu động từ · Prefer',
      context: 'I prefer ______ at home to going out on rainy days.',
      q: 'Choose the best answer.',
      options: ['staying', 'to stay', 'stay', 'stayed'],
      answer: 0,
      explain: 'prefer + V-ing + to + V-ing = thích làm gì hơn làm gì. “To going out” cho thấy vế trước cần V-ing → staying.'
    },
    {
      tag: 'Mẫu động từ · Nhờ vả',
      context:
        '<strong>Jane:</strong> There’s a crack in the pipe in my kitchen. What should I do?<br><strong>Annie:</strong> You should ______ a plumber check it tomorrow.',
      q: 'Choose the best word to fill the gap.',
      options: ['have', 'having', 'allow', 'allowing'],
      answer: 0,
      explain: 'have sb do sth = nhờ ai làm gì. Sau “should” cần động từ nguyên mẫu: have. Allow không hợp cấu trúc “allow sb do”.'
    },
    {
      tag: 'Điểm phụ · Wish',
      context:
        '<strong>Helen:</strong> I’ve got to help my mom with the housework so I can’t go with you tonight.<br><strong>Tom:</strong> What a pity! I wish you ______ with me.',
      q: 'Choose the best answer.',
      options: ['goes', 'go', 'can go', 'could go'],
      answer: 3,
      explain: 'Câu ước ở hiện tại: wish + S + V(past). “Could” là quá khứ của “can”, diễn tả điều ước không có thật ở hiện tại → could go.'
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
        return Number(localStorage.getItem('engprep-grammar-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-grammar-best', String(value));
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
            '<span class="quiz-instruction">Chọn đáp án đúng</span>' +
          '</div>' +
          '<div class="gr-quiz-context"><p>' + formatGap(item.context) + '</p></div>' +
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
          message: 'Bạn đã nắm chắc bốn nhóm ngữ pháp lõi. Hãy giữ thói quen đọc cả câu và kiểm tra lại cấu trúc trước khi chọn đáp án.'
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
          message: 'Xem lại bảng từ nối, mệnh đề quan hệ và mẫu động từ. Khi làm bài, hãy xác định cấu trúc trước khi dịch nghĩa.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn nhóm ngữ pháp lõi, bảng tra nhanh và mười bẫy đề rồi làm lại bài kiểm tra.'
      };
    }

    function reviewPrompt(item) {
      return '<p class="gr-review-context">' + formatGap(item.context) + '</p>';
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
              '<a class="btn btn-ghost" href="#map">Ôn bảng ngữ pháp</a>' +
              '<a class="btn btn-ghost" href="#traps">Xem bẫy đề</a>' +
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
