/* =========================================================
   EngPrep — Từ loại (Word forms)
   Interactions: suffix filter, word-family filter and quiz
   ========================================================= */

import { initFilter } from './lib/filter.js';
import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: 'Vị trí',
    q: 'She is a very ______ singer.',
    options: ['success', 'successful', 'successfully', 'succeed'],
    answer: 1,
    explain: 'Sau “very” và trước danh từ “singer” cần tính từ → successful. success là danh từ, successfully là trạng từ, succeed là động từ.'
  },
  {
    tag: 'Hậu tố',
    q: 'Air ______ is a serious problem in big cities.',
    options: ['pollute', 'polluted', 'pollution', 'polluting'],
    answer: 2,
    explain: 'Chủ ngữ của câu cần danh từ → pollution. pollute là động từ; polluted và polluting là tính từ.'
  },
  {
    tag: 'Họ từ',
    q: 'We should protect the ______ environment.',
    options: ['nature', 'natural', 'naturally', 'naturalise'],
    answer: 1,
    explain: 'Trước danh từ “environment” cần tính từ → natural. nature là danh từ; naturally là trạng từ.'
  },
  {
    tag: 'Vị trí',
    q: 'He drives ______ on busy roads.',
    options: ['care', 'careful', 'carefully', 'careless'],
    answer: 2,
    explain: 'Bổ nghĩa cho động từ “drives” cần trạng từ → carefully. careful và careless là tính từ.'
  },
  {
    tag: 'Hậu tố',
    q: 'It is ______ to swim in this river.',
    options: ['danger', 'dangerous', 'dangerously', 'endanger'],
    answer: 1,
    explain: 'Sau “It is” cần tính từ → dangerous. danger là danh từ; dangerously là trạng từ; endanger là động từ.'
  },
  {
    tag: 'Bẫy đề',
    q: 'The teacher gave us some useful ______.',
    options: ['advices', 'advice', 'advise', 'advising'],
    answer: 1,
    explain: 'advice là danh từ không đếm được nên không thêm -s → advice. advise là động từ: She advised us to study.'
  },
  {
    tag: 'Họ từ',
    q: 'Our school has a lot of ______ activities.',
    options: ['culture', 'cultural', 'culturally', 'cultivate'],
    answer: 1,
    explain: 'Trước danh từ “activities” cần tính từ → cultural. culture là danh từ; culturally là trạng từ; cultivate là động từ.'
  },
  {
    tag: 'Bẫy đề',
    q: 'My brother is ______ in playing football.',
    options: ['interest', 'interested', 'interesting', 'interestingly'],
    answer: 1,
    explain: 'Cấu trúc be interested in + N/V-ing. Người cảm thấy hứng thú dùng -ed; interesting dùng cho vật hoặc việc gây hứng thú.'
  },
  {
    tag: 'Bẫy đề',
    q: 'The film was so ______ that we fell asleep.',
    options: ['bore', 'bored', 'boring', 'boringly'],
    answer: 2,
    explain: 'Bộ phim gây cảm giác buồn chán → boring. bored dùng khi người cảm thấy buồn chán.'
  },
  {
    tag: 'Hậu tố',
    q: 'We need to ______ the area with more trees.',
    options: ['beauty', 'beautiful', 'beautify', 'beautifully'],
    answer: 2,
    explain: 'Sau “to” cần động từ → beautify (làm đẹp). beauty là danh từ; beautiful là tính từ; beautifully là trạng từ.'
  },
  {
    tag: 'Hậu tố',
    q: 'The ______ of the new bridge has improved traffic.',
    options: ['construct', 'construction', 'constructive', 'constructively'],
    answer: 1,
    explain: 'Sau “The” và trước “of” cần danh từ → construction. construct là động từ; constructive là tính từ; constructively là trạng từ.'
  },
  {
    tag: 'Họ từ',
    q: 'She is an ______ person; she always comes up with new ideas.',
    options: ['imagine', 'imagination', 'imaginative', 'imaginatively'],
    answer: 2,
    explain: 'Trước danh từ “person” cần tính từ → imaginative. imagination là danh từ; imaginatively là trạng từ.'
  },
  {
    tag: 'Tiền tố',
    q: 'It is ______ to go out without an umbrella in this rain.',
    options: ['possible', 'impossible', 'possibly', 'possibility'],
    answer: 1,
    explain: 'Nghĩa câu cần “không thể” → impossible. Tiền tố im- đứng trước p. possibly là trạng từ; possibility là danh từ.'
  },
  {
    tag: 'Tiền tố',
    q: 'He is ______ because he lost his ticket.',
    options: ['happy', 'unhappy', 'happily', 'happiness'],
    answer: 1,
    explain: 'Sau “is” cần tính từ, và nghĩa câu là “không vui” → unhappy. Tiền tố un- tạo nghĩa phủ định.'
  },
  {
    tag: 'Bẫy đề',
    q: 'A smaller car is more ______ for a small family.',
    options: ['economic', 'economical', 'economically', 'economy'],
    answer: 1,
    explain: 'economical = tiết kiệm, ít tốn kém; economic = thuộc kinh tế. Sau “more” cần tính từ → economical.'
  },
  {
    tag: 'Bẫy đề',
    q: 'She studied very ______ for the exam.',
    options: ['hard', 'hardly', 'hardness', 'harder'],
    answer: 0,
    explain: 'hard = chăm chỉ; hardly = hầu như không. Bổ nghĩa cho “studied” và nghĩa câu là chăm chỉ → hard.'
  }
];

initFilter({
  items: document.querySelectorAll('.wf-suffix-row'),
  tabs: document.querySelectorAll('.wf-suffix-toolbar .filter-tab'),
  search: document.getElementById('suffix-search'),
  clear: document.getElementById('suffix-clear'),
  count: document.getElementById('suffix-count'),
  empty: document.getElementById('suffix-empty'),
  reset: document.getElementById('suffix-reset'),
  countSuffix: 'hậu tố'
});

initFilter({
  items: document.querySelectorAll('.wf-family'),
  tabs: document.querySelectorAll('.wf-family-toolbar .filter-tab'),
  search: document.getElementById('family-search'),
  clear: document.getElementById('family-clear'),
  count: document.getElementById('family-count'),
  empty: document.getElementById('family-empty'),
  reset: document.getElementById('family-reset'),
  tabKey: 'core',
  itemKey: 'core',
  countSuffix: 'họ từ',
  includeData: false,
  matches: (item, active) => active === 'all' || item.dataset.core === 'true',
  shortcut: false
});

initQuiz({
  questions,
  storageKey: 'engprep-word-forms-best',
  instruction: 'Chọn dạng đúng của từ',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc vị trí từ loại và các họ từ thường gặp. Tự tin làm phần từ loại trong đề thi nhé.'
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
        message: 'Xem lại bảng vị trí, hậu tố và các cặp -ed/-ing. Đừng chỉ học thuộc đuôi từ.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại ba bước xác định từ loại, sau đó xem bảng hậu tố và 40 họ từ rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#families', label: 'Ôn lại họ từ' }]
});
