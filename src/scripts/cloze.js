/* =========================================================
   EngPrep — Điền khuyết
   Interactions: quiz
   ========================================================= */

import { initQuiz, formatGap } from './lib/quiz.js';

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
    tag: 'Cụm từ cố định',
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
    tag: 'Cụm từ cố định',
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

initQuiz({
  questions,
  storageKey: 'engprep-cloze-best',
  renderPrompt: (item) =>
    item.passage
      ? '<div class="cz-quiz-passage">' +
        '<span class="cz-quiz-passage-label">Đoạn đọc</span>' +
        '<p>' + formatGap(item.passage) + '</p>' +
        '</div>'
      : '',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc cách xử lý gap ngữ pháp, từ vựng, collocation và từ nối. Tự tin làm bài điền khuyết nhé.'
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
        message: 'Xem lại bảng ngữ pháp, manh mối từ vựng và đoạn mẫu. Khi làm bài, hãy kiểm tra loại từ trước khi xét nghĩa.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn bước, bảng ngữ pháp và manh mối từ vựng rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#grammar', label: 'Ôn lại ngữ pháp' }]
});
