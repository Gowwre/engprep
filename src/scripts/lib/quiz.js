/* =========================================================
   EngPrep — shared multiple-choice quiz
   One engine for every sheet quiz; pages provide questions,
   copy and optional prompt/review markup.
   ========================================================= */

const LETTERS = ['A', 'B', 'C', 'D'];
const BEST_PREFIX = 'Điểm cao nhất của bạn: ';
const HINT_KEY = 'engprep-hints-hidden';

function readHintPreference() {
  try {
    return localStorage.getItem(HINT_KEY) === '1';
  } catch (error) {
    return false;
  }
}

function writeHintPreference(value) {
  try {
    localStorage.setItem(HINT_KEY, value ? '1' : '0');
  } catch (error) {
    /* Preference is optional. */
  }
}

/** Replace the first six-underscore gap with the shared gap markup. */
export function formatGap(text) {
  return String(text).replace(
    '______',
    '<span class="gap"><span class="sr-only">chỗ trống</span></span>'
  );
}

function readBest(storageKey, legacyStorageKeys) {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) return Number(saved) || 0;

    for (const key of legacyStorageKeys) {
      const legacy = localStorage.getItem(key);
      if (legacy !== null) return Number(legacy) || 0;
    }
  } catch (error) {
    /* Storage can be unavailable; the quiz still works without a best score. */
  }

  return 0;
}

function writeBest(storageKey, value) {
  try {
    localStorage.setItem(storageKey, String(value));
  } catch (error) {
    /* Best score is a nice-to-have; failure does not affect the quiz. */
  }
}

function defaultResultCopy(score, total) {
  if (score === total) {
    return {
      title: 'Hoàn hảo, không sai câu nào!',
      message: 'Bạn đã nắm chắc phần này. Thử lại để giữ phong độ nhé.'
    };
  }

  if (score >= total - 2) {
    return {
      title: 'Rất tốt!',
      message: 'Chỉ còn vài chỗ cần xem lại. Đọc kỹ các câu sai và thử lại để đạt điểm tối đa.'
    };
  }

  if (score >= Math.ceil(total * 0.7)) {
    return {
      title: 'Khá ổn, cần chú ý vài chỗ.',
      message: 'Xem lại các câu sai và phần lý thuyết liên quan rồi làm lại bài kiểm tra.'
    };
  }

  return {
    title: 'Cần ôn thêm một vòng.',
    message: 'Đọc lại phần lý thuyết phía trên rồi làm lại bài kiểm tra nhé.'
  };
}

/**
 * Mount a quiz into the standard quiz panel.
 *
 * Required markup: #quiz-stage, #quiz-step, #quiz-bar, #quiz-score, #quiz-best.
 * Optional: .quiz-progress.
 */
export function initQuiz({
  questions,
  storageKey,
  legacyStorageKeys = [],
  getLabel = (item) => item.tag || item.tense || '',
  instruction = 'Chọn đáp án đúng',
  renderPrompt = () => '',
  renderReviewPrompt = () => '',
  renderQuestion = formatGap,
  resultCopy = defaultResultCopy,
  retryLabel,
  reviewLinks = []
}) {
  const quizStage = document.getElementById('quiz-stage');
  const quizStep = document.getElementById('quiz-step');
  const quizBar = document.getElementById('quiz-bar');
  const quizScore = document.getElementById('quiz-score');
  const quizBest = document.getElementById('quiz-best');
  const quizProgress = document.querySelector('.quiz-progress');
  const quizShell = document.querySelector('.quiz-shell');

  if (!quizStage || !quizStep || !quizBar || !quizScore || !quizBest) return;

  const total = questions.length;
  let questionIndex = 0;
  let score = 0;
  let answers = [];
  let locked = false;
  let hintsHidden = readHintPreference();

  function applyHintPreference() {
    if (quizShell) quizShell.classList.toggle('hints-hidden', hintsHidden);
  }

  applyHintPreference();

  if (quizProgress) {
    quizProgress.setAttribute('aria-valuemax', String(total));
    quizProgress.setAttribute('aria-valuenow', '0');
  }

  function getBest() {
    return readBest(storageKey, legacyStorageKeys);
  }

  function updateBestLabel() {
    const best = getBest();
    quizBest.textContent =
      best > 0 ? `${BEST_PREFIX}${best}/${total}` : `${BEST_PREFIX}chưa có`;
  }

  function updateProgress() {
    const completed = answers.length;
    quizBar.style.width = `${(completed / total) * 100}%`;
    quizStep.textContent = `Câu ${questionIndex + 1} / ${total}`;
    quizScore.textContent = `${score} câu đúng`;
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(completed));
  }

  function renderCurrentQuestion() {
    const item = questions[questionIndex];
    locked = false;
    updateProgress();

    const options = item.options
      .map(
        (option, index) =>
          `<button class="option" type="button" data-index="${index}">
            <span class="option-letter">${LETTERS[index]}</span>
            <span class="opt-text">${option}</span>
          </button>`
      )
      .join('');

    quizStage.innerHTML = `
      <div class="quiz-body">
        <div class="quiz-meta">
          <span class="quiz-tag">${getLabel(item)}</span>
          <span class="quiz-instruction">${instruction}</span>
          <button class="quiz-hint-toggle" type="button" aria-pressed="${hintsHidden}">
            ${hintsHidden ? 'Hiện gợi ý' : 'Ẩn gợi ý'}
          </button>
        </div>
        ${renderPrompt(item)}
        <p class="quiz-question" tabindex="-1">${renderQuestion(item.q)}</p>
        <div class="options" role="group" aria-label="Các đáp án">${options}</div>
        <div class="feedback" id="feedback" role="status" hidden></div>
      </div>
      <div class="quiz-foot">
        <p class="quiz-hint" id="quiz-hint">Chọn một đáp án để xem giải thích.</p>
        <button class="btn btn-primary" id="next-btn" type="button" disabled>
          ${questionIndex === total - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>`;

    quizStage.querySelectorAll('.option').forEach((button) => {
      button.addEventListener('click', () => {
        chooseAnswer(Number(button.dataset.index));
      });
    });

    const hintToggle = quizStage.querySelector('.quiz-hint-toggle');
    if (hintToggle) {
      hintToggle.addEventListener('click', () => {
        hintsHidden = !hintsHidden;
        writeHintPreference(hintsHidden);
        applyHintPreference();
        hintToggle.setAttribute('aria-pressed', String(hintsHidden));
        hintToggle.textContent = hintsHidden ? 'Hiện gợi ý' : 'Ẩn gợi ý';
      });
    }

    document.getElementById('next-btn').addEventListener('click', nextQuestion);
  }

  function chooseAnswer(chosen) {
    if (locked) return;
    locked = true;

    const item = questions[questionIndex];
    const isCorrect = chosen === item.answer;
    const feedback = document.getElementById('feedback');
    const hint = document.getElementById('quiz-hint');
    const nextBtn = document.getElementById('next-btn');

    quizStage.querySelectorAll('.option').forEach((button) => {
      const optionIndex = Number(button.dataset.index);
      button.disabled = true;
      if (optionIndex === item.answer) button.classList.add('is-correct');
      if (optionIndex === chosen && !isCorrect) button.classList.add('is-wrong');
    });

    if (isCorrect) {
      score += 1;
      feedback.classList.add('feedback-correct');
      feedback.innerHTML = `
        <span class="feedback-icon" aria-hidden="true">✓</span>
        <div class="feedback-text">
          <strong>Chính xác!</strong>
          <p>${item.explain}</p>
        </div>`;
    } else {
      feedback.classList.add('feedback-wrong');
      feedback.innerHTML = `
        <span class="feedback-icon" aria-hidden="true">✗</span>
        <div class="feedback-text">
          <strong>Chưa đúng.</strong>
          <p>Đáp án đúng là ${LETTERS[item.answer]}. ${item.options[item.answer]}. ${item.explain}</p>
        </div>`;
    }

    feedback.hidden = false;
    feedback.tabIndex = -1;
    answers.push({ questionIndex, chosen, isCorrect });
    quizScore.textContent = `${score} câu đúng`;
    hint.textContent = isCorrect
      ? 'Làm tốt lắm. Bấm tiếp tục nhé.'
      : 'Đọc giải thích rồi bấm tiếp tục.';
    nextBtn.disabled = false;
    quizBar.style.width = `${(answers.length / total) * 100}%`;
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(answers.length));

    requestAnimationFrame(() => {
      feedback.focus({ preventScroll: true });
      feedback.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center'
      });
    });
  }

  function nextQuestion() {
    if (!locked) return;

    if (questionIndex === total - 1) {
      showResults();
      return;
    }

    questionIndex += 1;
    renderCurrentQuestion();
    const heading = quizStage.querySelector('.quiz-question');
    if (heading) heading.focus({ preventScroll: true });
  }

  function showResults() {
    const copy = resultCopy(score, total);
    const best = getBest();
    if (score > best) writeBest(storageKey, score);
    updateBestLabel();

    quizStep.textContent = 'Hoàn thành';
    quizScore.textContent = `${score}/${total}`;
    quizBar.style.width = '100%';
    if (quizProgress) quizProgress.setAttribute('aria-valuenow', String(total));

    const wrongAnswers = answers.filter((answer) => !answer.isCorrect);
    let reviewHTML = '';

    if (wrongAnswers.length > 0) {
      const rows = wrongAnswers
        .map((answer) => {
          const item = questions[answer.questionIndex];
          return `
            <div class="review-item">
              ${renderReviewPrompt(item)}
              <p class="review-q">${item.q}</p>
              <p class="review-a"><strong>${LETTERS[item.answer]}. ${item.options[item.answer]}</strong> · ${getLabel(item)}</p>
              <p class="review-why">${item.explain}</p>
            </div>`;
        })
        .join('');

      reviewHTML = `
        <div class="review">
          <p class="review-title">Các câu cần xem lại</p>
          ${rows}
        </div>`;
    }

    const links = reviewLinks
      .map((link) => `<a class="btn btn-ghost" href="${link.href}">${link.label}</a>`)
      .join('');

    quizStage.innerHTML = `
      <div class="quiz-body">
        <div class="result">
          <div class="result-emblem" aria-hidden="true">${score >= total - 2 ? '★' : '✎'}</div>
          <p class="result-score">${score}<small>/${total}</small></p>
          <h3 class="result-title">${copy.title}</h3>
          <p class="result-msg">${copy.message}</p>
          <div class="result-actions">
            <button class="btn btn-primary" id="retry-btn" type="button">${retryLabel || `Làm lại ${total} câu`}</button>
            ${links}
          </div>
          ${reviewHTML}
        </div>
      </div>`;

    document.getElementById('retry-btn').addEventListener('click', restartQuiz);
    const title = quizStage.querySelector('.result-title');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }

  function restartQuiz() {
    questionIndex = 0;
    score = 0;
    answers = [];
    locked = false;
    renderCurrentQuestion();
    const heading = quizStage.querySelector('.quiz-question');
    if (heading) heading.focus({ preventScroll: true });
  }

  updateBestLabel();
  renderCurrentQuestion();
}
