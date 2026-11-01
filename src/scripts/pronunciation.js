/* =========================================================
   EngPrep — Phát âm & trọng âm
   Interactions: quiz
   ========================================================= */

(function () {
  'use strict';

  const questions = [
    {
      tag: '-ed',
      q: 'Which word ends with /ɪd/?',
      options: ['played', 'watched', 'wanted', 'cleaned'],
      answer: 2,
      explain: '“Wanted” kết thúc bằng /t/ nên -ed đọc /ɪd/. played /d/, watched /t/, cleaned /d/.'
    },
    {
      tag: '-ed',
      q: 'Which word ends with /t/?',
      options: ['called', 'stopped', 'opened', 'listened'],
      answer: 1,
      explain: '“Stopped” kết thúc bằng /p/ (vô thanh) nên -ed đọc /t/. called, opened, listened đọc /d/.'
    },
    {
      tag: '-ed',
      q: 'Which word ends with /d/?',
      options: ['needed', 'washed', 'played', 'visited'],
      answer: 2,
      explain: '“Played” kết thúc bằng nguyên âm nên -ed đọc /d/. needed và visited đọc /ɪd/; washed đọc /t/.'
    },
    {
      tag: '-ed',
      q: 'Which word has a different -ed ending from the others?',
      options: ['laughed', 'watched', 'missed', 'decided'],
      answer: 3,
      explain: '“Decided” kết thúc bằng /d/ nên đọc /ɪd/. laughed, watched, missed đều kết thúc bằng âm vô thanh nên đọc /t/.'
    },
    {
      tag: '-s / -es',
      q: 'Which word ends with /ɪz/?',
      options: ['books', 'watches', 'plays', 'cats'],
      answer: 1,
      explain: '“Watches” kết thúc bằng /tʃ/ nên -es đọc /ɪz/. books /s/, plays /z/, cats /s/.'
    },
    {
      tag: '-s / -es',
      q: 'Which word ends with /s/?',
      options: ['dogs', 'goes', 'stops', 'reads'],
      answer: 2,
      explain: '“Stops” kết thúc bằng /p/ (vô thanh) nên -s đọc /s/. dogs, goes, reads đọc /z/.'
    },
    {
      tag: '-s / -es',
      q: 'Which word ends with /z/?',
      options: ['cats', 'months', 'plays', 'laughs'],
      answer: 2,
      explain: '“Plays” kết thúc bằng nguyên âm nên -s đọc /z/. cats và months đọc /s/; laughs đọc /s/.'
    },
    {
      tag: '-s / -es',
      q: 'Which word has a different -s ending from the others?',
      options: ['misses', 'washes', 'changes', 'makes'],
      answer: 3,
      explain: '“Makes” kết thúc bằng /k/ nên -s đọc /s/. misses, washes, changes đều đọc /ɪz/.'
    },
    {
      tag: 'Nguyên âm',
      q: 'Which word has the /iː/ sound?',
      options: ['sit', 'seat', 'ship', 'live'],
      answer: 1,
      explain: '“Seat” đọc /siːt/ với /iː/ dài. sit /sɪt/, ship /ʃɪp/, live /lɪv/ đều có /ɪ/ ngắn.'
    },
    {
      tag: 'Nguyên âm',
      q: 'Which word has the /æ/ sound?',
      options: ['cart', 'cat', 'mate', 'pen'],
      answer: 1,
      explain: '“Cat” đọc /kæt/. cart /kɑːt/, mate /meɪt/, pen /pen/.'
    },
    {
      tag: 'Nguyên âm',
      q: 'Which word has the /eɪ/ sound?',
      options: ['pen', 'pain', 'pet', 'met'],
      answer: 1,
      explain: '“Pain” đọc /peɪn/ với âm đôi /eɪ/. pen, pet, met đều có /e/ ngắn.'
    },
    {
      tag: 'Nguyên âm',
      q: 'Which word has the /ɪ/ sound?',
      options: ['seat', 'sheep', 'sit', 'leave'],
      answer: 2,
      explain: '“Sit” đọc /sɪt/. seat /siːt/, sheep /ʃiːp/, leave /liːv/ đều có /iː/ dài.'
    },
    {
      tag: 'Trọng âm',
      q: 'Which word is stressed on the second syllable?',
      options: ['TAble', 'aGO', 'DOCtor', 'HAPpy'],
      answer: 1,
      explain: '“aGO” /əˈɡəʊ/ nhấn âm 2. table, doctor, happy là danh từ/tính từ nên thường nhấn âm 1.'
    },
    {
      tag: 'Trọng âm',
      q: 'Which word is stressed on the first syllable?',
      options: ['beGIN', 'deCIDE', 'TEAcher', 'enJOY'],
      answer: 2,
      explain: '“TEAcher” /ˈtiːtʃə/ nhấn âm 1. begin, decide, enjoy là động từ nên thường nhấn âm 2.'
    },
    {
      tag: 'Trọng âm',
      q: 'In the word “decision”, which syllable is stressed?',
      options: ['The first syllable', 'The second syllable', 'The third syllable', 'The last syllable'],
      answer: 1,
      explain: '“Decision” đọc /dɪˈsɪʒ.ən/, nhấn âm 2: deCI-sion. -sion / -tion hút trọng âm vào âm tiết ngay trước nó.'
    },
    {
      tag: 'Trọng âm',
      q: 'Which word has a different stress pattern from the others?',
      options: ['BEAUtiful', 'ACCident', 'imPORtant', 'INteresting'],
      answer: 2,
      explain: '“imPORtant” /ɪmˈpɔːtənt/ nhấn âm 2; beautiful, accident, interesting đều nhấn âm 1.'
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
        return Number(localStorage.getItem('engprep-pronunciation-best')) || 0;
      } catch (error) {
        return 0;
      }
    }

    function saveBest(value) {
      try {
        localStorage.setItem('engprep-pronunciation-best', String(value));
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
          message: 'Bạn đã nắm chắc quy tắc -ed, -s/-es, nguyên âm và trọng âm. Tự tin lấy trọn điểm câu 1–4 nhé.'
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
          message: 'Xem lại bảng -ed, -s/-es và các cặp nguyên âm. Khi làm bài, hãy đọc to trong đầu để nghe âm cuối.'
        };
      }
      return {
        title: 'Cần ôn thêm một vòng.',
        message: 'Đọc lại bốn nhóm âm, sau đó học bảng -ed, -s/-es và quy tắc trọng âm rồi làm lại bài kiểm tra.'
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
              '<a class="btn btn-ghost" href="#map">Ôn lại bản đồ âm</a>' +
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
