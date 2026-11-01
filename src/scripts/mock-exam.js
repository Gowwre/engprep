/* =========================================================
   EngPrep — Thi thử 24 câu
   Interactions: timed exam, grading, skill breakdown, review
   ========================================================= */

(function () {
  'use strict';

  const dictProvide = {
    word: 'provide',
    meta: '/prəˈvaɪd/ · verb',
    meaning: 'to give something to somebody or make it available for them to use',
    examples: ['provide information', 'provides an opportunity', 'provide support', 'provide a service']
  };

  const partDefs = [
    {
      id: 'pronunciation',
      kicker: 'Phần 1 · Câu 1–2',
      label: 'Phát âm & trọng âm',
      instruction: 'Chọn từ có phần gạch chân phát âm khác hoặc trọng âm khác.',
      questions: [
        {
          tag: 'Phát âm · -ed',
          q: 'Which word has the underlined part pronounced differently from the others?',
          options: ['want<u>ed</u>', 'need<u>ed</u>', 'decid<u>ed</u>', 'laugh<u>ed</u>'],
          answer: 3,
          explain: '“Laughed” kết thúc bằng /f/ (vô thanh) nên -ed đọc /t/. wanted, needed, decided đọc /ɪd/.'
        },
        {
          tag: 'Trọng âm · 2 âm tiết',
          q: 'Which word has a different stress pattern from the others?',
          options: ['teacher', 'begin', 'student', 'happy'],
          answer: 1,
          explain: '“Begin” nhấn âm 2; teacher, student, happy nhấn âm 1.'
        }
      ]
    },
    {
      id: 'grammar-vocab',
      kicker: 'Phần 2 · Câu 3–6',
      label: 'Ngữ pháp & từ vựng',
      instruction: 'Chọn đáp án đúng nhất cho mỗi câu.',
      questions: [
        {
          tag: 'Từ nối',
          q: 'She was tired, ______ she finished her homework.',
          options: ['so', 'but', 'because', 'although'],
          answer: 1,
          explain: 'Hai vế tương phản: mệt nhưng vẫn làm xong bài → but.'
        },
        {
          tag: 'Mệnh đề quan hệ',
          q: 'The girl ______ won the contest is my cousin.',
          options: ['which', 'whose', 'who', 'where'],
          answer: 2,
          explain: 'Danh từ trước là người (the girl) và đại từ làm chủ ngữ → who.'
        },
        {
          tag: 'So sánh',
          q: 'This is ______ film I have ever seen.',
          options: ['the most interesting', 'more interesting', 'as interesting', 'interesting'],
          answer: 0,
          explain: 'Có “I have ever seen” → so sánh nhất: the most interesting.'
        },
        {
          tag: 'Cụm từ cố định',
          q: 'Students should ______ part in the school clean-up.',
          options: ['make', 'do', 'have', 'take'],
          answer: 3,
          explain: 'take part in = tham gia. Không dùng make/do/have part in.'
        }
      ]
    },
    {
      id: 'communication-signs',
      kicker: 'Phần 3 · Câu 7–10',
      label: 'Giao tiếp & biển báo',
      instruction: 'Chọn câu trả lời phù hợp hoặc nghĩa đúng của biển báo.',
      questions: [
        {
          tag: 'Giao tiếp · Gợi ý',
          q: 'Why don’t we go to the cinema tonight?',
          options: ['You’re welcome.', 'I’m sorry.', 'Good idea.', 'Never mind.'],
          answer: 2,
          explain: '“Why don’t we…?” là lời gợi ý → đáp “Good idea.”'
        },
        {
          tag: 'Giao tiếp · Xin lỗi',
          q: 'I’m sorry I broke your vase.',
          options: ['Never mind.', 'Good idea.', 'You’re welcome.', 'Yes, please.'],
          answer: 0,
          explain: 'Đáp lời xin lỗi bằng “Never mind.” hoặc “That’s all right.”'
        },
        {
          tag: 'Biển báo · Cấm',
          sign: 'NO FOOD OR DRINK',
          q: 'What does the sign mean?',
          options: [
            'You can bring drinks only.',
            'Food is free here.',
            'You cannot bring food or drinks in.',
            'You must buy food here.'
          ],
          answer: 2,
          explain: 'No food or drink = cấm cả đồ ăn và đồ uống.'
        },
        {
          tag: 'Thông báo · Điều kiện',
          sign: 'BOOKING REQUIRED',
          q: 'What should you do?',
          options: [
            'Come at any time.',
            'You should book before you come.',
            'Pay at the door.',
            'Wait for a free table.'
          ],
          answer: 1,
          explain: 'Required = bắt buộc; booking = đặt trước. Bạn phải đặt chỗ trước khi đến.'
        }
      ]
    },
    {
      id: 'cloze',
      kicker: 'Phần 4 · Câu 11–13',
      label: 'Điền khuyết',
      instruction: 'Chọn từ phù hợp nhất cho mỗi chỗ trống.',
      passage:
        '<p>Many students find it difficult to learn new words. They often write a word again and again, <strong>(11) ______</strong> they still forget it. A better way is to learn words in phrases. <strong>(12) ______</strong>, you can remember “make a decision” more easily than “decision” alone. You should also <strong>(13) ______</strong> the words in example sentences.</p>',
      questions: [
        {
          tag: 'Điền khuyết · Từ nối',
          context: 'They often write a word again and again, ______ they still forget it.',
          q: 'Chọn từ cho chỗ trống (11).',
          options: ['so', 'because', 'or', 'but'],
          answer: 3,
          explain: 'Hai vế tương phản: viết nhiều lần nhưng vẫn quên → but.'
        },
        {
          tag: 'Điền khuyết · Ví dụ',
          context: 'A better way is to learn words in phrases. ______, you can remember “make a decision” more easily than “decision” alone.',
          q: 'Chọn từ cho chỗ trống (12).',
          options: ['For example', 'However', 'Although', 'Therefore'],
          answer: 0,
          explain: 'Câu sau đưa ra ví dụ minh hoạ → For example.'
        },
        {
          tag: 'Điền khuyết · Từ vựng',
          context: 'You should also ______ the words in example sentences.',
          q: 'Chọn từ cho chỗ trống (13).',
          options: ['make', 'use', 'do', 'take'],
          answer: 1,
          explain: 'use the words in example sentences = dùng từ trong câu ví dụ.'
        }
      ]
    },
    {
      id: 'reading',
      kicker: 'Phần 5 · Câu 14–16',
      label: 'Đọc hiểu',
      instruction: 'Đọc đoạn văn và chọn đáp án đúng.',
      passage:
        '<p>Many people think that recycling is enough to solve the plastic problem. However, recycling has limits. Only a small percentage of plastic is actually recycled, and much of it ends up in landfills or the ocean. The best solution is to reduce the amount of plastic we use in the first place. Simple actions such as carrying a reusable bottle or refusing plastic bags can make a big difference.</p>',
      questions: [
        {
          tag: 'Đọc hiểu · Ý chính',
          q: 'What is the main idea of the passage?',
          options: [
            'Recycling is the best solution.',
            'We should reduce plastic use before recycling.',
            'Plastic is impossible to recycle.',
            'Reusable bottles are expensive.'
          ],
          answer: 1,
          explain: 'Đoạn văn nêu hạn chế của recycling và khuyên giảm dùng nhựa trước tiên.'
        },
        {
          tag: 'Đọc hiểu · Chi tiết',
          q: 'According to the passage, what happens to much of the plastic?',
          options: [
            'It is turned into new bottles.',
            'It is used to make reusable bags.',
            'It is sent to other countries.',
            'It ends up in landfills or the ocean.'
          ],
          answer: 3,
          explain: 'Thông tin trong bài: “much of it ends up in landfills or the ocean.”'
        },
        {
          tag: 'Đọc hiểu · Suy luận',
          q: 'What can we infer from the passage?',
          options: [
            'Plastic bags are always free.',
            'People should stop using bottles.',
            'Recycling alone cannot solve the plastic problem.',
            'Landfills are good for the environment.'
          ],
          answer: 2,
          explain: 'Bài nói recycling có hạn chế và cần giảm dùng nhựa → recycling một mình không đủ.'
        }
      ]
    },
    {
      id: 'word-forms',
      kicker: 'Phần 6 · Câu 17–19',
      label: 'Từ loại',
      instruction: 'Chọn dạng đúng của từ trong ngoặc.',
      questions: [
        {
          tag: 'Từ loại · Danh từ',
          q: 'The earthquake caused serious ______ to the city. (DAMAGE)',
          options: ['damage', 'damaged', 'damaging', 'damages'],
          answer: 0,
          explain: 'Sau tính từ “serious” cần danh từ. Damage là danh từ không đếm được → damage.'
        },
        {
          tag: 'Từ loại · Tính từ',
          q: 'She is a very ______ student; she always finishes her work on time. (RESPONSIBILITY)',
          options: ['responsibility', 'responsibly', 'responsibilities', 'responsible'],
          answer: 3,
          explain: 'Cần tính từ bổ nghĩa cho “student” → responsible.'
        },
        {
          tag: 'Từ loại · Trạng từ',
          q: 'The teacher explained the lesson ______. (CLEAR)',
          options: ['clear', 'clearness', 'clearly', 'clarify'],
          answer: 2,
          explain: 'Cần trạng từ bổ nghĩa cho động từ “explained” → clearly.'
        }
      ]
    },
    {
      id: 'part-vi',
      kicker: 'Phần 7 · Câu 20–21',
      label: 'Phần VI',
      instruction: 'Sắp xếp câu hoặc chọn cụm từ đúng từ mục từ điển.',
      questions: [
        {
          tag: 'Phần VI · Sắp xếp',
          chunks: ['The local government', 'has encouraged', 'people', 'to use public transport', 'to reduce pollution'],
          q: 'Which sentence is correctly arranged?',
          options: [
            'The local government has encouraged people to use public transport to reduce pollution.',
            'The local government has encouraged to use public transport people to reduce pollution.',
            'The local government has encouraged people to reduce pollution to use public transport.',
            'The local government people has encouraged to use public transport to reduce pollution.'
          ],
          answer: 0,
          explain: 'Cấu trúc: S + has encouraged + O + to-V + to reduce pollution. Cụm mục đích đứng cuối câu.'
        },
        {
          tag: 'Phần VI · Từ điển',
          dict: dictProvide,
          context: 'The school can ______ to students who need extra help.',
          q: 'Choose the best phrase (2–3 words) to fill the gap.',
          options: ['provides support', 'provide support', 'provide a support', 'providing support'],
          answer: 1,
          explain: 'Sau “can” dùng động từ nguyên mẫu: provide support. Support không đếm được nên không có “a”.'
        }
      ]
    },
    {
      id: 'transformation',
      kicker: 'Phần 8 · Câu 22–24',
      label: 'Viết lại câu',
      instruction: 'Chọn câu có nghĩa gần nhất với câu đã cho.',
      questions: [
        {
          tag: 'Viết lại · Since',
          q: 'She started learning English three years ago.',
          options: [
            'She learned English for three years.',
            'She has learned English since three years.',
            'She is learning English for three years.',
            'She has learned English for three years.'
          ],
          answer: 3,
          explain: 'S + started + V-ing + ago → S + has/have + V3/ed + for + khoảng thời gian.'
        },
        {
          tag: 'Viết lại · Because of',
          q: 'Because he was lazy, he failed the exam.',
          options: [
            'Because of he was lazy, he failed the exam.',
            'Because his laziness, he failed the exam.',
            'Because of his laziness, he failed the exam.',
            'Because of his lazy, he failed the exam.'
          ],
          answer: 2,
          explain: 'Because + mệnh đề → Because of + N/V-ing. “His laziness” là cụm danh từ.'
        },
        {
          tag: 'Viết lại · So/such',
          q: 'The film was so boring that we left early.',
          options: [
            'It was such a boring film that we left early.',
            'It was so a boring film that we left early.',
            'It was such boring film that we left early.',
            'It was a such boring film that we left early.'
          ],
          answer: 0,
          explain: 'so + adj + that → such + a/an + adj + N + that. “A boring film” là cụm danh từ đúng.'
        }
      ]
    }
  ];

  const letters = ['A', 'B', 'C', 'D'];
  const DURATION = 45 * 60;

  let flatQuestions = [];
  let questionNo = 0;

  const parts = partDefs.map(function (part) {
    const questions = part.questions.map(function (question) {
      questionNo += 1;
      const item = Object.assign({}, question, {
        no: questionNo,
        index: flatQuestions.length,
        partId: part.id,
        partLabel: part.label
      });
      flatQuestions.push(item);
      return item;
    });

    return Object.assign({}, part, { questions: questions });
  });

  const total = flatQuestions.length;

  let answers = new Array(total).fill(null);
  let timerId = null;
  let startedAt = 0;
  let remaining = DURATION;
  let submitted = false;
  let warningShown = false;

  const startPanel = document.getElementById('mx-start');
  const startBtn = document.getElementById('mx-start-btn');
  const exam = document.getElementById('mx-exam');
  const form = document.getElementById('mx-form');
  const result = document.getElementById('mx-result');
  const timerEl = document.getElementById('mx-timer');
  const progressText = document.getElementById('mx-progress-text');
  const barFill = document.getElementById('mx-bar-fill');
  const barTrack = document.querySelector('.mx-bar-track');
  const warning = document.getElementById('mx-warning');
  const barWarning = document.getElementById('mx-bar-warning');
  const bestEl = document.getElementById('mx-best');
  const submitTop = document.getElementById('mx-submit-top');
  const submitBottom = document.getElementById('mx-submit');

  if (!startPanel || !startBtn || !exam || !form || !result || !timerEl || !progressText || !barFill || !bestEl) {
    return;
  }

  function getBest() {
    try {
      return Number(localStorage.getItem('engprep-mock-best')) || 0;
    } catch (error) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      localStorage.setItem('engprep-mock-best', String(value));
    } catch (error) {
      /* Best score is a nice-to-have. */
    }
  }

  function updateBestLabel() {
    const best = getBest();
    bestEl.textContent = best > 0
      ? 'Điểm cao nhất: ' + best + '/' + total
      : 'Điểm cao nhất: chưa có';
  }

  function formatGap(text) {
    return text.replace('______', '<span class="gap"><span class="sr-only">chỗ trống</span></span>');
  }

  function dictHtml(dict) {
    return (
      '<div class="mx-dict">' +
        '<div class="mx-dict-head"><strong>' + dict.word + '</strong><span>' + dict.meta + '</span></div>' +
        '<p class="mx-dict-def">' + dict.meaning + '</p>' +
        '<div class="mx-dict-examples">' +
          dict.examples.map(function (example) {
            return '<span>' + example + '</span>';
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function signHtml(text) {
    return '<div class="mx-sign"><span>Notice</span><strong>' + text + '</strong></div>';
  }

  function chunksHtml(chunks) {
    return (
      '<div class="mx-chunks"><span class="mx-chunks-label">Các nhóm từ</span><div class="mx-chunk-list">' +
        chunks.map(function (chunk) {
          return '<span>' + chunk + '</span>';
        }).join('') +
      '</div></div>'
    );
  }

  function renderQuestion(question) {
    return (
      '<article class="mx-q" id="mx-q-' + question.no + '">' +
        '<div class="mx-q-head">' +
          '<span class="mx-q-no" aria-hidden="true">' + question.no + '</span>' +
          '<span class="mx-q-tag">' + question.tag + '</span>' +
        '</div>' +
        (question.sign ? signHtml(question.sign) : '') +
        (question.chunks ? chunksHtml(question.chunks) : '') +
        (question.dict ? dictHtml(question.dict) : '') +
        (question.context ? '<p class="mx-context">' + formatGap(question.context) + '</p>' : '') +
        '<p class="mx-q-text">' + formatGap(question.q) + '</p>' +
        '<div class="mx-options" role="group" aria-label="Câu ' + question.no + '">' +
          question.options.map(function (option, index) {
            return '<button class="mx-option" type="button" data-qindex="' + question.index + '" data-option="' + index + '" aria-pressed="false">' +
              '<span class="mx-option-letter">' + letters[index] + '</span>' +
              '<span class="mx-option-text">' + option + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +
      '</article>'
    );
  }

  function renderExam() {
    form.innerHTML = parts.map(function (part) {
      return (
        '<section class="mx-part" id="mx-part-' + part.id + '">' +
          '<div class="mx-part-head">' +
            '<p class="section-kicker">' + part.kicker + '</p>' +
            '<h3>' + part.label + '</h3>' +
            '<p>' + part.instruction + '</p>' +
          '</div>' +
          (part.passage ? '<div class="mx-passage">' + part.passage + '</div>' : '') +
          '<div class="mx-part-questions">' +
            part.questions.map(renderQuestion).join('') +
          '</div>' +
        '</section>'
      );
    }).join('');
  }

  function updateProgress() {
    const answered = answers.filter(function (answer) {
      return answer !== null;
    }).length;

    progressText.textContent = answered + ' / ' + total + ' đã chọn';
    barFill.style.width = (answered / total) * 100 + '%';
    if (barTrack) barTrack.setAttribute('aria-valuenow', String(answered));
  }

  function updateTimer() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timerEl.textContent = minutes + ':' + String(seconds).padStart(2, '0');
    timerEl.classList.toggle('is-warning', remaining <= 300);
  }

  function tick() {
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    remaining = Math.max(0, DURATION - elapsed);
    updateTimer();

    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      submitExam(true);
    }
  }

  function startExam() {
    startPanel.hidden = true;
    result.hidden = true;
    exam.hidden = false;
    submitted = false;
    warningShown = false;
    remaining = DURATION;
    startedAt = Date.now();
    if (timerId) clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    updateTimer();
    updateProgress();
    if (warning) warning.textContent = '';
    if (barWarning) barWarning.textContent = '';
  }

  function selectAnswer(button) {
    const questionIndex = Number(button.dataset.qindex);
    const optionIndex = Number(button.dataset.option);
    answers[questionIndex] = optionIndex;

    form.querySelectorAll('.mx-option[data-qindex="' + questionIndex + '"]').forEach(function (item) {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    if (warning) warning.textContent = '';
    if (barWarning) barWarning.textContent = '';
    warningShown = false;
    updateProgress();
  }

  function selectedText(question) {
    const selected = answers[question.index];
    if (selected === null) return 'Chưa chọn';
    return letters[selected] + '. ' + question.options[selected];
  }

  function reviewPrompt(question) {
    let html = '';

    if (question.sign) {
      html += '<p class="mx-review-context">Biển báo: <strong>' + question.sign + '</strong></p>';
    }

    if (question.chunks) {
      html += chunksHtml(question.chunks);
    }

    if (question.dict) {
      html += '<p class="mx-review-context">Mục từ: <strong>' + question.dict.word + '</strong> · ' + question.dict.meta + '</p>';
    }

    if (question.context) {
      html += '<p class="mx-review-context">' + formatGap(question.context) + '</p>';
    }

    return html;
  }

  function resultCopy(score) {
    if (score === total) {
      return {
        title: 'Xuất sắc, đủ điểm!',
        message: 'Bạn đã nắm rất chắc cả 11 chủ điểm. Hãy giữ nhịp làm đề và canh thời gian khi vào phòng thi thật.'
      };
    }
    if (score >= 20) {
      return {
        title: 'Rất tốt!',
        message: 'Chỉ còn vài lỗi nhỏ. Xem lại các câu sai, đặc biệt ở phần đọc hiểu và viết lại câu.'
      };
    }
    if (score >= 16) {
      return {
        title: 'Khá ổn, còn vài phần cần ôn.',
        message: 'Bạn đã có nền khá. Hãy xem thống kê bên dưới để biết phần nào kéo điểm xuống và ôn lại tờ tương ứng.'
      };
    }
    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đừng lo nếu điểm chưa cao. Xem lại câu sai, quay lại các tờ ôn tương ứng rồi làm đề lần nữa.'
    };
  }

  function resultHtml(score, timeUsed) {
    const percent = Math.round((score / total) * 100);
    const tenPoint = ((score / total) * 10).toFixed(1);
    const copy = resultCopy(score);
    const wrong = flatQuestions.filter(function (question) {
      return answers[question.index] !== question.answer;
    });

    const breakdown = parts.map(function (part) {
      const correct = part.questions.filter(function (question) {
        return answers[question.index] === question.answer;
      }).length;
      const partPercent = Math.round((correct / part.questions.length) * 100);

      return (
        '<div class="mx-break-row">' +
          '<span>' + part.label + '</span>' +
          '<strong>' + correct + '/' + part.questions.length + '</strong>' +
          '<div class="mx-break-bar"><i style="width:' + partPercent + '%"></i></div>' +
        '</div>'
      );
    }).join('');

    const review = wrong.length
      ? '<div class="mx-review">' +
          '<p class="mx-review-title">Câu cần xem lại</p>' +
          wrong.map(function (question) {
            return '<article class="mx-review-item">' +
              '<p class="mx-review-no">Câu ' + question.no + ' · ' + question.tag + '</p>' +
              reviewPrompt(question) +
              '<p class="mx-review-q">' + formatGap(question.q) + '</p>' +
              '<p class="mx-review-a">Bạn chọn: ' + selectedText(question) + ' · Đáp án: <strong>' + letters[question.answer] + '. ' + question.options[question.answer] + '</strong></p>' +
              '<p class="mx-review-why">' + question.explain + '</p>' +
            '</article>';
          }).join('') +
        '</div>'
      : '<p class="mx-perfect">Không có câu sai. Bạn có thể thử lại để giữ phong độ.</p>';

    return (
      '<div class="mx-result-card">' +
        '<div class="mx-result-head">' +
          '<div class="mx-result-score"><strong>' + score + '</strong><span>/' + total + '</span></div>' +
          '<div class="mx-result-meta">' +
            '<p class="mx-result-percent">' + percent + '% · ' + tenPoint + '/10</p>' +
            '<p class="mx-result-time">Thời gian: ' + formatTime(timeUsed) + '</p>' +
          '</div>' +
        '</div>' +
        '<h2>' + copy.title + '</h2>' +
        '<p class="mx-result-msg">' + copy.message + '</p>' +
        '<div class="mx-breakdown">' +
          '<p class="mx-review-title">Điểm theo phần</p>' +
          breakdown +
        '</div>' +
        review +
        '<div class="mx-result-actions">' +
          '<button class="btn btn-primary" id="mx-retry" type="button">Làm lại đề</button>' +
          '<a class="btn btn-ghost" href="#structure">Xem cấu trúc đề</a>' +
          '<a class="btn btn-ghost" href="#strategy">Xem chiến lược</a>' +
        '</div>' +
      '</div>'
    );
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return minutes + ' phút ' + String(rest).padStart(2, '0') + ' giây';
  }

  function submitExam(auto) {
    if (submitted) return;

    const unanswered = answers.filter(function (answer) {
      return answer === null;
    }).length;

    if (!auto && unanswered > 0 && !warningShown) {
      if (warning) {
        warning.textContent = 'Còn ' + unanswered + ' câu chưa chọn. Bấm “Nộp bài” lần nữa để nộp.';
      }
      if (barWarning) {
        barWarning.textContent = 'Còn ' + unanswered + ' câu chưa chọn.';
      }
      warningShown = true;
      return;
    }

    submitted = true;
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    const score = flatQuestions.reduce(function (sum, question) {
      return sum + (answers[question.index] === question.answer ? 1 : 0);
    }, 0);

    const timeUsed = Math.min(DURATION, Math.max(0, DURATION - remaining));
    if (score > getBest()) saveBest(score);

    exam.hidden = true;
    startPanel.hidden = true;
    result.hidden = false;
    result.innerHTML = resultHtml(score, timeUsed);
    updateBestLabel();

    const retry = document.getElementById('mx-retry');
    if (retry) retry.addEventListener('click', resetExam);

    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetExam() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    answers = new Array(total).fill(null);
    submitted = false;
    warningShown = false;
    remaining = DURATION;
    updateTimer();
    updateProgress();
    renderExam();
    exam.hidden = true;
    result.hidden = true;
    startPanel.hidden = false;
    if (warning) warning.textContent = '';
    if (barWarning) barWarning.textContent = '';
    updateBestLabel();
    startPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('click', function (event) {
    const button = event.target.closest('.mx-option');
    if (!button) return;
    selectAnswer(button);
  });

  startBtn.addEventListener('click', startExam);
  if (submitTop) submitTop.addEventListener('click', function () { submitExam(false); });
  if (submitBottom) submitBottom.addEventListener('click', function () { submitExam(false); });

  renderExam();
  updateTimer();
  updateProgress();
  updateBestLabel();
})();
