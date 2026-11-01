/* =========================================================
   EngPrep — Giới từ tiếng Anh
   Interactions: collocation filter and quiz
   ========================================================= */

import { initFilter } from './lib/filter.js';
import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: 'Thời gian',
    q: 'We have a meeting ______ Monday morning.',
    options: ['in', 'on', 'at', 'by'],
    answer: 1,
    explain: '“Monday morning” là một buổi cụ thể của một ngày → on. Ta nói in the morning, nhưng on Monday morning.'
  },
  {
    tag: 'Thời gian',
    q: 'My birthday is ______ 12th March.',
    options: ['in', 'at', 'on', 'for'],
    answer: 2,
    explain: 'Có ngày cụ thể (12th March) → on. Chỉ có tháng hoặc năm mới dùng in: in March, in 2026.'
  },
  {
    tag: 'Thời gian',
    q: 'The workshop opens ______ 8 a.m.',
    options: ['at', 'on', 'in', 'since'],
    answer: 0,
    explain: 'Giờ cụ thể → at: at 8 a.m. Nhớ nhóm at + giờ, on + ngày, in + tháng/năm.'
  },
  {
    tag: 'Thời gian',
    q: 'They have lived in Hue ______ 2015.',
    options: ['for', 'since', 'in', 'during'],
    answer: 1,
    explain: 'since + mốc thời gian (2015) và hành động kéo dài đến hiện tại → since. for + khoảng thời gian.'
  },
  {
    tag: 'Thời gian',
    q: 'I have studied English ______ five years.',
    options: ['since', 'during', 'for', 'by'],
    answer: 2,
    explain: '“Five years” là một khoảng thời gian → for. since + mốc: since 2021.'
  },
  {
    tag: 'Cụm cố định',
    q: 'She is very good ______ Maths.',
    options: ['in', 'on', 'at', 'for'],
    answer: 2,
    explain: 'good đi với at: good at something. Tương tự bad at, excellent at.'
  },
  {
    tag: 'Cụm cố định',
    q: 'It depends ______ the weather.',
    options: ['of', 'on', 'in', 'with'],
    answer: 1,
    explain: 'depend on = phụ thuộc vào. Đừng thấy “của” mà dùng of.'
  },
  {
    tag: 'Cụm cố định',
    q: 'I’m looking forward to ______ you.',
    options: ['see', 'seeing', 'seen', 'saw'],
    answer: 1,
    explain: 'Trong look forward to, “to” là giới từ nên sau nó dùng V-ing: look forward to seeing.'
  },
  {
    tag: 'Vị trí',
    q: 'We arrived ______ Da Nang late at night.',
    options: ['at', 'in', 'to', 'on'],
    answer: 1,
    explain: 'arrive in + thành phố/quốc gia; arrive at + địa điểm nhỏ (arrive at the airport). Không dùng arrive to.'
  },
  {
    tag: 'Vị trí',
    q: 'She is sitting ______ her two friends.',
    options: ['among', 'between', 'next', 'behind'],
    answer: 1,
    explain: 'between dùng cho hai người/vật; among dùng cho ba người/vật trở lên.'
  },
  {
    tag: 'Chuyển động',
    q: 'He walked ______ the bridge to the other side.',
    options: ['through', 'across', 'along', 'into'],
    answer: 1,
    explain: 'across = băng qua một bề mặt/một bên sang bên kia. through = đi xuyên qua bên trong.'
  },
  {
    tag: 'Chuyển động',
    q: 'We went ______ the tunnel.',
    options: ['across', 'along', 'through', 'onto'],
    answer: 2,
    explain: 'Đi xuyên qua bên trong đường hầm → through. across là băng ngang qua bề mặt.'
  },
  {
    tag: 'Cụm cố định',
    q: 'Don’t worry ______ the exam.',
    options: ['of', 'with', 'for', 'about'],
    answer: 3,
    explain: 'worry about = lo lắng về. Tương tự: be worried about.'
  },
  {
    tag: 'Bẫy đề',
    q: 'The show starts ______ time, so don’t be late.',
    options: ['in', 'on', 'at', 'by'],
    answer: 1,
    explain: 'on time = đúng giờ. in time = kịp lúc, trước khi quá muộn.'
  },
  {
    tag: 'Bẫy đề',
    q: '______ the end, we decided to stay home.',
    options: ['At', 'On', 'In', 'By'],
    answer: 2,
    explain: 'in the end = cuối cùng (kết quả). at the end of + địa điểm/thời gian: at the end of the street.'
  },
  {
    tag: 'Bẫy đề',
    q: 'I usually go to school ______ foot.',
    options: ['by', 'on', 'with', 'in'],
    answer: 1,
    explain: 'on foot = đi bộ. Với phương tiện: by bus, by car, by bike (không có mạo từ).'
  }
];

initFilter({
  items: document.querySelectorAll('.collocation-item'),
  tabs: document.querySelectorAll('.collocation-toolbar .filter-tab'),
  search: document.getElementById('collocation-search'),
  clear: document.getElementById('collocation-clear'),
  count: document.getElementById('collocation-count'),
  empty: document.getElementById('collocation-empty'),
  reset: document.getElementById('collocation-reset'),
  tabKey: 'category',
  itemKey: 'cat',
  countSuffix: 'cụm'
});

initQuiz({
  questions,
  storageKey: 'engprep-prepositions-best',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc giới từ và các cụm cố định. Tự tin làm phần giới từ trong đề thi nhé.'
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
        message: 'Xem lại bảng thời gian, vị trí và phần cụm cố định. Đừng học từng giới từ riêng lẻ.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại ba điều cần nắm, sau đó học các cụm trong phần Cụm cố định rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#collocations', label: 'Ôn lại cụm từ' }]
});
