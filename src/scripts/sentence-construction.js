/* =========================================================
   EngPrep — Sắp xếp câu
   Interactions: quiz
   ========================================================= */

import { initQuiz, formatGap } from './lib/quiz.js';

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

function dictHtml(dict) {
  return (
    '<div class="sc-quiz-dict">' +
    '<div class="sc-quiz-dict-head">' +
    '<strong>' + dict.word + '</strong>' +
    '<span>' + dict.meta + '</span>' +
    '</div>' +
    '<p class="sc-quiz-dict-def">' + dict.meaning + '</p>' +
    '<div class="sc-quiz-dict-examples">' +
    dict.examples.map((example) => '<span>' + example + '</span>').join('') +
    '</div>' +
    '</div>'
  );
}

function questionPrompt(item) {
  let html = '';

  if (item.chunks) {
    html +=
      '<div class="sc-quiz-chunks">' +
      '<span class="sc-quiz-label">Các nhóm từ</span>' +
      '<div class="sc-chunk-list">' +
      item.chunks.map((chunk) => '<span>' + chunk + '</span>').join('') +
      '</div>' +
      '</div>';
  }

  if (item.dict) html += dictHtml(item.dict);
  if (item.context) {
    html += '<div class="sc-quiz-context"><p>' + formatGap(item.context) + '</p></div>';
  }

  return html;
}

function reviewPrompt(item) {
  if (item.chunks) {
    return (
      '<div class="sc-review-chunks">' +
      item.chunks.map((chunk) => '<span>' + chunk + '</span>').join('') +
      '</div>'
    );
  }

  if (item.context) {
    return '<p class="sc-review-context">' + formatGap(item.context) + '</p>';
  }

  return '';
}

initQuiz({
  questions,
  storageKey: 'engprep-sentence-best',
  renderPrompt: questionPrompt,
  renderReviewPrompt: reviewPrompt,
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc trật tự câu và cách dùng mục từ điển. Hãy giữ thói quen đọc lại cả câu trước khi viết đáp án.'
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
        message: 'Xem lại khung S + V + O, các cụm cố định và bước kiểm tra dạng từ ở mục từ điển.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn bước ghép câu, bảng trật tự từ và cách đọc mục từ điển rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [
    { href: '#word-order', label: 'Ôn trật tự câu' },
    { href: '#dictionary', label: 'Ôn mục từ điển' }
  ]
});
