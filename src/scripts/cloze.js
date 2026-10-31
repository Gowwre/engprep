/* =========================================================
   EngPrep — Cloze & gap-fill (Điền khuyết)
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const questions = [
    {
      tag: 'Từ nối',
      passage: 'Plastic bags are convenient. ______, they are harmful to the environment.',
      q: 'Which word best completes the passage?',
      options: ['Because', 'However', 'So', 'Although'],
      answer: 1,
      explain: 'Hai câu tương phản: tiện lợi nhưng có hại → However. Because chỉ nguyên nhân; So chỉ kết quả; Although cần mệnh đề tương phản.'
    },
    {
      tag: 'Giới từ',
      passage: 'Many tourists are interested ______ the history of Hoi An.',
      q: 'Which preposition fits the gap?',
      options: ['on', 'of', 'in', 'for'],
      answer: 2,
      explain: 'be interested in = hứng thú với. Đây là giới từ đi kèm tính từ, không dịch theo tiếng Việt.'
    },
    {
      tag: 'Collocation',
      passage: 'We should ______ responsibility for protecting the environment.',
      q: 'Which verb forms the correct collocation?',
      options: ['make', 'do', 'have', 'take'],
      answer: 3,
      explain: 'take responsibility for = chịu trách nhiệm về. Không dùng make/do responsibility.'
    },
    {
      tag: 'Dạng động từ',
      passage: 'She decided ______ a new bike.',
      q: 'Which verb form is correct?',
      options: ['buying', 'buy', 'bought', 'to buy'],
      answer: 3,
      explain: 'decide + to-V = quyết định làm gì. Không dùng V-ing hay V nguyên mẫu sau decide.'
    },
    {
      tag: 'Đại từ quan hệ',
      passage: 'The book ______ I borrowed from the library is very interesting.',
      q: 'Which relative pronoun is correct?',
      options: ['which', 'who', 'whose', 'where'],
      answer: 0,
      explain: '“The book” là vật → which/that. Who dùng cho người; whose chỉ sở hữu; where chỉ nơi chốn.'
    },
    {
      tag: 'Lượng từ',
      passage: 'There isn’t ______ water left in the bottle.',
      q: 'Which quantifier fits the gap?',
      options: ['many', 'much', 'a few', 'some'],
      answer: 1,
      explain: 'Water không đếm được và câu phủ định → much. Many/a few dùng với danh từ đếm được số nhiều; some không dùng trong câu phủ định này.'
    },
    {
      tag: 'Từ vựng',
      passage: 'The river is ______ because factories dump waste into it.',
      q: 'Which word best fits the context?',
      options: ['polluting', 'pollution', 'polluted', 'pollute'],
      answer: 2,
      explain: 'Sau “is” cần tính từ miêu tả dòng sông → polluted (bị ô nhiễm). pollution là danh từ; pollute là động từ.'
    },
    {
      tag: 'Từ nối',
      passage: '______ it rained heavily, the match was cancelled.',
      q: 'Which connector shows cause?',
      options: ['However', 'Although', 'So', 'Because'],
      answer: 3,
      explain: 'Vế sau là kết quả của việc mưa to → Because. However/Although chỉ tương phản; So chỉ kết quả nhưng không đứng đầu câu theo cách này.'
    },
    {
      tag: 'Collocation',
      passage: 'He ______ a decision to study abroad.',
      q: 'Which verb forms the correct collocation?',
      options: ['made', 'did', 'took', 'had'],
      answer: 0,
      explain: 'make a decision = đưa ra quyết định. Không dùng do/take/have a decision.'
    },
    {
      tag: 'Mạo từ',
      passage: 'She is ______ honest girl.',
      q: 'Which article is correct?',
      options: ['a', 'the', 'an', 'no article'],
      answer: 2,
      explain: '“Honest” bắt đầu bằng âm /ɒ/ (h câm) nên dùng an: an honest girl. Mạo từ chọn theo âm, không theo chữ cái.'
    },
    {
      tag: 'So sánh',
      passage: 'This city is ______ than I expected.',
      q: 'Which comparison is correct?',
      options: ['most crowded', 'more crowded', 'crowded', 'more crowding'],
      answer: 1,
      explain: 'Có “than” → so sánh hơn. “Crowded” là tính từ dài nên dùng more crowded.'
    },
    {
      tag: 'Từ thay thế',
      passage: 'Lan joined a clean-up event. ______ helped collect more than 100 kilograms of rubbish.',
      q: 'What does the gap refer to?',
      options: ['It', 'They', 'Them', 'Their'],
      answer: 0,
      explain: '“A clean-up event” là danh từ số ít, chỉ sự việc → It. They/Them/Their cần danh từ số nhiều.'
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
        return Number(localStorage.getItem('engprep-cloze-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-cloze-best', String(value));
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
          (item.passage
            ? '<div class="cz-quiz-passage">' +
                '<span class="cz-quiz-passage-label">Đoạn đọc</span>' +
                '<p>' + formatGap(item.passage) + '</p>' +
              '</div>'
            : '') +
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
          message: 'Bạn đã nắm chắc cách xử lý gap ngữ pháp, từ vựng, collocation và từ nối. Tự tin làm bài điền khuyết nhé.'
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
          message: 'Xem lại bảng ngữ pháp, manh mối từ vựng và đoạn mẫu. Khi làm bài, hãy kiểm tra loại từ trước khi xét nghĩa.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn bước, bảng ngữ pháp và manh mối từ vựng rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#grammar">Ôn lại ngữ pháp</a>' +
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
