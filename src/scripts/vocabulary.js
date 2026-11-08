/* =========================================================
   EngPrep — Từ vựng & cụm từ
   Interactions: collocation filter and quiz
   ========================================================= */

import { initFilter } from './lib/filter.js';
import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: 'Cụm từ cố định',
    q: 'We need to ______ a decision about the trip.',
    options: ['do', 'make', 'take', 'have'],
    answer: 1,
    explain: 'make a decision = đưa ra quyết định. Không dùng do a decision.'
  },
  {
    tag: 'Cụm từ cố định',
    q: 'She ______ part in the school contest last week.',
    options: ['took', 'made', 'did', 'had'],
    answer: 0,
    explain: 'take part in = tham gia. Quá khứ của take là took.'
  },
  {
    tag: 'Word choice',
    q: 'Air pollution has a serious ______ on our health.',
    options: ['affect', 'effect', 'effort', 'afford'],
    answer: 1,
    explain: 'have an effect on = có tác động đến. affect là động từ; effect là danh từ.'
  },
  {
    tag: 'Cụm từ cố định',
    q: 'It depends ______ the weather.',
    options: ['of', 'on', 'in', 'for'],
    answer: 1,
    explain: 'depend on = phụ thuộc vào. Đây là cụm cố định, không dùng depend of.'
  },
  {
    tag: 'V-ing',
    q: 'I’m looking forward to ______ you.',
    options: ['see', 'seeing', 'saw', 'seen'],
    answer: 1,
    explain: 'look forward to + V-ing. “To” ở đây là giới từ, không phải to-V.'
  },
  {
    tag: 'Phrasal verb',
    q: 'Our car ______ on the way to the beach.',
    options: ['broke down', 'broke up', 'ran out', 'put off'],
    answer: 0,
    explain: 'break down = hỏng máy. break up = chia tay; run out = hết; put off = hoãn.'
  },
  {
    tag: 'Phrasal verb',
    q: 'We have ______ water. Can you buy some?',
    options: ['run out of', 'run out', 'run of', 'run off'],
    answer: 0,
    explain: 'run out of + N = hết, không còn. Không bỏ “of”.'
  },
  {
    tag: 'Mục từ điển',
    q: 'Volunteers ______ information about the museum.',
    options: ['provide', 'provides', 'providing', 'to provide'],
    answer: 0,
    explain: 'Chủ ngữ “Volunteers” số nhiều → provide. Cụm đúng là provide information.'
  },
  {
    tag: 'Mục từ điển',
    q: 'The school ______ students with books.',
    options: ['provides', 'provide', 'providing', 'provides to'],
    answer: 0,
    explain: 'Chủ ngữ “The school” số ít → provides. Cấu trúc: provide sb with sth.'
  },
  {
    tag: 'Cụm từ cố định',
    q: 'I’m trying to break the ______ of staying up late.',
    options: ['habit', 'custom', 'tradition', 'rule'],
    answer: 0,
    explain: 'break the habit of + V-ing = bỏ thói quen làm gì. Habit là thói quen cá nhân.'
  },
  {
    tag: 'Từ vựng theo chủ đề',
    q: 'A healthy ______ includes regular exercise.',
    options: ['lifestyle', 'lifeline', 'lifetime', 'living'],
    answer: 0,
    explain: 'healthy lifestyle = lối sống lành mạnh. Đây là collocation quen thuộc.'
  },
  {
    tag: 'Từ vựng theo chủ đề',
    q: 'We should use public ______ to reduce traffic.',
    options: ['transport', 'traffic', 'vehicle', 'travel'],
    answer: 0,
    explain: 'public transport = giao thông công cộng. Đây là cụm cố định trong chủ đề môi trường/giao thông.'
  },
  {
    tag: 'Từ vựng theo chủ đề',
    q: 'Solar power is a form of ______ energy.',
    options: ['renewable', 'renewed', 'renewing', 'renewal'],
    answer: 0,
    explain: 'renewable energy = năng lượng tái tạo. Tính từ đúng là renewable.'
  },
  {
    tag: 'Từ vựng theo chủ đề',
    q: 'Many teenagers use social ______ every day.',
    options: ['media', 'medium', 'medial', 'median'],
    answer: 0,
    explain: 'social media = mạng xã hội. “Media” là dạng số nhiều của medium trong cụm này.'
  },
  {
    tag: 'Từ vựng theo chủ đề',
    q: '“Deepfake” is most closely connected with ______.',
    options: ['artificial intelligence', 'traffic jams', 'cultural heritage', 'physical activity'],
    answer: 0,
    explain: 'Deepfake là công nghệ tạo video/âm thanh giả bằng AI → artificial intelligence.'
  },
  {
    tag: 'Mục từ điển',
    q: 'Which collocation is correct?',
    options: ['eating habits', 'eat habits', 'habits eating', 'habit of eat'],
    answer: 0,
    explain: 'eating habits = thói quen ăn uống. Habit đi với V-ing hoặc danh từ, không đi với “eat” đứng trước.'
  }
];

initFilter({
  items: document.querySelectorAll('.vc-collocation-row'),
  tabs: document.querySelectorAll('.vc-toolbar .filter-tab'),
  search: document.getElementById('collocation-search'),
  clear: document.getElementById('collocation-clear'),
  count: document.getElementById('collocation-count'),
  empty: document.getElementById('collocation-empty'),
  reset: document.getElementById('collocation-reset'),
  countSuffix: 'cụm',
  hashSection: 'collocations'
});

initQuiz({
  questions,
  storageKey: 'engprep-vocabulary-best',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc collocations, phrasal verbs và cách đọc mục từ điển. Tự tin làm phần từ vựng nhé.'
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
        message: 'Xem lại bảng collocations, phrasal verbs và các cụm trong mục từ điển. Đừng học từ đơn lẻ.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn nhóm từ vựng, sau đó học 32 cụm và hai mục từ mẫu rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#collocations', label: 'Ôn lại collocations' }]
});
