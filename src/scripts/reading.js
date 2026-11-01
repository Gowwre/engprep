/* =========================================================
   EngPrep — Đọc hiểu
   Interactions: connector filter and reading quiz
   ========================================================= */

import { initFilter } from './lib/filter.js';
import { initQuiz, formatGap } from './lib/quiz.js';

const questions = [
  {
    tag: 'Ý chính',
    passage: 'Our school has opened a small library in the school yard. Students can borrow books during the morning break and return them the next day. The library also has a quiet corner for reading. Many students say they read more now because books are easy to find.',
    q: 'What is the passage mainly about?',
    options: ['A new school library', 'A quiet corner in the yard', 'How to borrow books', 'Why students dislike reading'],
    answer: 0,
    explain: 'Cả đoạn nói về thư viện mới của trường: mở ở sân trường, cho mượn sách, có góc đọc. Các chi tiết còn lại chỉ hỗ trợ ý chính.'
  },
  {
    tag: 'Chi tiết',
    passage: 'The Mid-Autumn Festival takes place on the 15th day of the 8th lunar month. Children carry lanterns and eat mooncakes. Many families watch lion dances in the evening.',
    q: 'When does the Mid-Autumn Festival take place?',
    options: ['On the first day of the year', 'On the 15th day of the 8th lunar month', 'In the morning', 'Every weekend'],
    answer: 1,
    explain: 'Thông tin ngày tháng được nêu trực tiếp ở câu đầu. Khi câu hỏi có “when”, hãy scan ngày, tháng hoặc năm trong bài.'
  },
  {
    tag: 'Từ vựng',
    passage: 'The market sells fresh fruit at affordable prices. Many students buy bananas or oranges there because they are cheap and healthy.',
    q: 'The word “affordable” is closest in meaning to ______.',
    options: ['very expensive', 'not expensive', 'unhealthy', 'difficult to find'],
    answer: 1,
    explain: 'Câu sau giải thích affordable = cheap: giá phải chăng, không đắt. Đọc câu trước và sau để đoán nghĩa.'
  },
  {
    tag: 'Từ thay thế',
    passage: 'Many tourists visit Hoi An every year. They enjoy walking around the old town and trying local food.',
    q: 'In the passage, “They” refers to ______.',
    options: ['the old town', 'local food', 'many tourists', 'every year'],
    answer: 2,
    explain: '“They” là đại từ số nhiều thay cho “many tourists” ở câu trước. Chủ ngữ của câu trước là manh mối.'
  },
  {
    tag: 'Suy luận',
    passage: 'More people in the city are choosing to cycle to work. There are now more bike lanes, and air quality in some areas has improved.',
    q: 'What can be inferred from the passage?',
    options: ['Cycling can help reduce air pollution.', 'Nobody drives a car in the city.', 'Bike lanes are expensive to build.', 'Air quality is getting worse.'],
    answer: 0,
    explain: 'Bài nói nhiều người đi xe đạp hơn và chất lượng không khí ở một số khu vực đã cải thiện → có thể suy ra xe đạp giúp giảm ô nhiễm. Tránh đáp án cực đoan như “nobody”.'
  },
  {
    tag: 'NOT mentioned',
    passage: 'Last summer, Lan visited Da Nang with her family. They stayed in a hotel near My Khe Beach and tried seafood. Lan’s favourite place was the Dragon Bridge.',
    q: 'Which of the following is NOT mentioned in the passage?',
    options: ['My Khe Beach', 'Seafood', 'The Dragon Bridge', 'A museum'],
    answer: 3,
    explain: 'Bài nhắc đến My Khe Beach, seafood và Dragon Bridge; không có museum. Với NOT/EXCEPT, hãy kiểm tra từng phương án.'
  },
  {
    tag: 'Điền khuyết',
    passage: '______ plastic bags are convenient, they are harmful to the environment.',
    q: 'Choose the best word to fill in the blank.',
    options: ['Because', 'Although', 'So', 'Therefore'],
    answer: 1,
    explain: 'Hai mệnh đề tương phản: tiện lợi nhưng có hại → Although + mệnh đề. Because chỉ nguyên nhân; So/Therefore chỉ kết quả.'
  },
  {
    tag: 'Ý chính',
    passage: 'Our class started a recycling project last month. We collect used paper and plastic bottles every Friday. The money from selling them helps buy books for the school library. The project has also taught us to use less paper.',
    q: 'What is the passage mainly about?',
    options: ['A class recycling project', 'How to buy books', 'A trip to the library', 'Why paper is expensive'],
    answer: 0,
    explain: 'Câu đầu giới thiệu dự án tái chế; các câu sau nói hoạt động và kết quả. Đó là ý chính của cả đoạn.'
  },
  {
    tag: 'Chi tiết',
    passage: 'The school planted 2,000 trees around the playground last year. Students water the trees twice a week. The trees now provide shade and make the school greener.',
    q: 'How many trees did the school plant?',
    options: ['200', '2,000', '20,000', '12'],
    answer: 1,
    explain: 'Câu đầu nêu con số 2,000. Với câu hỏi “how many”, hãy scan số lượng trong bài.'
  },
  {
    tag: 'Từ vựng',
    passage: 'We should reduce the amount of water we use at home. Turning off the tap while brushing your teeth is a simple way to save water.',
    q: 'The word “reduce” is closest in meaning to ______.',
    options: ['make less', 'make more', 'drink quickly', 'turn on'],
    answer: 0,
    explain: 'reduce = làm giảm. Câu sau nói “save water” (tiết kiệm nước), giúp xác nhận nghĩa.'
  },
  {
    tag: 'Từ thay thế',
    passage: 'Lan joined a clean-up event at the beach. This event helped collect more than 100 kilograms of rubbish.',
    q: 'In the passage, “This event” refers to ______.',
    options: ['the beach', 'the rubbish', 'the clean-up event', '100 kilograms'],
    answer: 2,
    explain: '“This event” thay cho cụm “a clean-up event” ở câu trước. “This + danh từ” thường chỉ sự việc vừa được nhắc.'
  },
  {
    tag: 'Suy luận',
    passage: 'Nam listens to English songs every day. He writes down new words from the lyrics and looks them up in a dictionary. His English vocabulary has improved a lot.',
    q: 'What can be inferred about Nam?',
    options: ['He dislikes English music.', 'He learns vocabulary through songs.', 'He never uses a dictionary.', 'He only studies grammar.'],
    answer: 1,
    explain: 'Bài nói Nam nghe nhạc, ghi từ mới và tra từ điển; từ vựng tiến bộ → có thể suy ra anh ấy học từ vựng qua bài hát.'
  }
];

initFilter({
  items: document.querySelectorAll('.rc-connector-row'),
  tabs: document.querySelectorAll('.rc-toolbar .filter-tab'),
  search: document.getElementById('connector-search'),
  clear: document.getElementById('connector-clear'),
  count: document.getElementById('connector-count'),
  empty: document.getElementById('connector-empty'),
  reset: document.getElementById('connector-reset'),
  countSuffix: 'từ nối'
});

initQuiz({
  questions,
  storageKey: 'engprep-reading-best',
  instruction: 'Đọc đoạn và chọn đáp án',
  renderPrompt: (item) =>
    item.passage
      ? '<div class="rc-quiz-passage">' +
        '<span class="rc-quiz-passage-label">Đoạn đọc</span>' +
        '<p>' + formatGap(item.passage) + '</p>' +
        '</div>'
      : '',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc các dạng câu đọc hiểu và biết tìm bằng chứng. Tự tin làm bài đọc trong đề thi nhé.'
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
        message: 'Xem lại bảng dạng câu và phần từ nối. Khi làm bài, hãy luôn tìm câu chứng minh cho đáp án.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn bước skim – scan, sau đó xem bảng dạng câu và đoạn đọc mẫu rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#types', label: 'Ôn lại dạng câu' }]
});
