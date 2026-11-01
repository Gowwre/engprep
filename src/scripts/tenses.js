/* =========================================================
   EngPrep — 12 thì tiếng Anh
   Interactions: tense filtering, search and quiz
   ========================================================= */

import { initFilter } from './lib/filter.js';
import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tense: 'Present Simple',
    q: 'The artisan ______ conical hats by hand every day.',
    options: ['make', 'makes', 'is making', 'made'],
    answer: 1,
    explain: '“Every day” là dấu hiệu của thì hiện tại đơn. Chủ ngữ “The artisan” số ít nên động từ phải thêm -s: makes.'
  },
  {
    tense: 'Present Continuous',
    q: 'Look! The students ______ clay in the workshop right now.',
    options: ['mould', 'are moulding', 'moulded', 'have moulded'],
    answer: 1,
    explain: '“Look!” và “right now” cho biết hành động đang diễn ra → hiện tại tiếp diễn: are moulding.'
  },
  {
    tense: 'Present Perfect',
    q: 'I ______ Bat Trang pottery village three times.',
    options: ['visit', 'visited', 'have visited', 'am visiting'],
    answer: 2,
    explain: '“Three times” nói về trải nghiệm tính đến hiện tại, không gắn với thời điểm cụ thể → hiện tại hoàn thành: have visited.'
  },
  {
    tense: 'Present Perfect Continuous',
    q: "They ______ the old communal house since January, and it still isn't finished.",
    options: ['restore', 'restored', 'have restored', 'have been restoring'],
    answer: 3,
    explain: '“Since January” và việc vẫn chưa xong → hiện tại hoàn thành tiếp diễn, nhấn mạnh quá trình: have been restoring.'
  },
  {
    tense: 'Past Simple',
    q: 'Last summer, our class ______ My Son Sanctuary.',
    options: ['visits', 'visited', 'have visited', 'was visiting'],
    answer: 1,
    explain: '“Last summer” là thời gian đã kết thúc → quá khứ đơn: visited.'
  },
  {
    tense: 'Past Continuous',
    q: 'While Lan ______ the festival, she met an old friend.',
    options: ['watches', 'watched', 'was watching', 'has watched'],
    answer: 2,
    explain: '“While” đi với hành động đang diễn ra làm nền → quá khứ tiếp diễn: was watching. Hành động ngắn “met” chia quá khứ đơn.'
  },
  {
    tense: 'Past Perfect',
    q: 'By the time we ______, the water puppet show ______.',
    options: [
      'arrived / started',
      'arrived / had started',
      'had arrived / started',
      'arrive / has started'
    ],
    answer: 1,
    explain: 'Buổi diễn xảy ra trước khi chúng ta đến → quá khứ hoàn thành “had started”; việc đến sau chia quá khứ đơn “arrived”.'
  },
  {
    tense: 'Past Perfect Continuous',
    q: 'The dancers ______ for hours before the show began.',
    options: ['practise', 'practised', 'had been practising', 'have been practising'],
    answer: 2,
    explain: 'Việc kéo dài “for hours” trước một hành động quá khứ “began” → quá khứ hoàn thành tiếp diễn: had been practising.'
  },
  {
    tense: 'Future Simple',
    q: 'I think the new metro line ______ traffic congestion in the city.',
    options: ['reduces', 'reduced', 'will reduce', 'will be reducing'],
    answer: 2,
    explain: '“I think” + dự đoán về tương lai → tương lai đơn: will reduce.'
  },
  {
    tense: 'Future Continuous',
    q: 'At 8 a.m. tomorrow, we ______ the Hung King Temple.',
    options: ['visit', 'will visit', 'will be visiting', 'will have visited'],
    answer: 2,
    explain: '“At 8 a.m. tomorrow” là một mốc trong tương lai; hành động sẽ đang diễn ra tại mốc đó → tương lai tiếp diễn: will be visiting.'
  },
  {
    tense: 'Future Perfect',
    q: 'By 2030, the city ______ three new parks.',
    options: ['builds', 'will build', 'will have built', 'will be building'],
    answer: 2,
    explain: '“By 2030” → hành động sẽ hoàn thành trước mốc tương lai → tương lai hoàn thành: will have built.'
  },
  {
    tense: 'Future Perfect Continuous',
    q: 'By next June, she ______ English for five years.',
    options: ['will learn', 'will be learning', 'will have learned', 'will have been learning'],
    answer: 3,
    explain: '“By next June” và “for five years” → nhấn mạnh việc kéo dài đến mốc tương lai → tương lai hoàn thành tiếp diễn: will have been learning.'
  }
];

initFilter({
  items: document.querySelectorAll('.tense-card'),
  tabs: document.querySelectorAll('.filter-tab'),
  search: document.getElementById('tense-search'),
  clear: document.getElementById('search-clear'),
  count: document.getElementById('result-count'),
  empty: document.getElementById('empty-state'),
  reset: document.getElementById('reset-filters'),
  tabKey: 'group',
  itemKey: 'group',
  countSuffix: 'thì'
});

initQuiz({
  questions,
  storageKey: 'engprep-tenses-best',
  legacyStorageKeys: ['engprep-quiz-best'],
  getLabel: (item) => item.tense,
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc 12 thì, sẵn sàng làm phần thì trong đề giữa kỳ.'
      };
    }

    if (score >= total - 2) {
      return {
        title: 'Rất tốt!',
        message: 'Chỉ còn vài chỗ cần xem lại. Đọc kỹ các câu sai rồi làm lại để đạt 12/12 nhé.'
      };
    }

    if (score >= total - 5) {
      return {
        title: 'Khá ổn, cần chú ý vài chỗ.',
        message: 'Quay lại sơ đồ 12 thì và mục So sánh nhanh, chú ý các cặp thì dễ nhầm.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đừng vội làm đề. Đọc lại công thức và dấu hiệu nhận biết rồi làm lại bài kiểm tra nhé.'
    };
  },
  reviewLinks: [{ href: '#tenses', label: 'Ôn lại 12 thì' }]
});
