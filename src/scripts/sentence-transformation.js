/* =========================================================
   EngPrep — Viết lại câu
   Interactions: quiz
   ========================================================= */

import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: 'Điều kiện',
    q: 'Choose the correct rewriting: “Study hard, or you will fail the exam.”',
    options: [
      'If you study hard, you will fail the exam.',
      'If you don’t study hard, you will fail the exam.',
      'Unless you study hard, you will pass the exam.',
      'If you studied hard, you would fail the exam.'
    ],
    answer: 1,
    explain: '“Study hard, or …” = “If you don’t study hard, …” / “Unless you study hard, …”. Câu B giữ đúng nghĩa và thì.'
  },
  {
    tag: 'Wish',
    q: '“I don’t have a bike,” said Lan. → Lan wishes ______.',
    options: [
      'she has a bike',
      'she had a bike',
      'she will have a bike',
      'she didn’t have a bike'
    ],
    answer: 1,
    explain: 'Wish diễn tả điều không có thật ở hiện tại: lùi hiện tại đơn thành quá khứ đơn → she had a bike.'
  },
  {
    tag: 'V-ing',
    q: '“I really like playing football,” said Michael. → Michael is fond ______.',
    options: ['of playing football', 'to play football', 'of play football', 'playing football'],
    answer: 0,
    explain: 'be fond of + V-ing. Không dùng to-V sau “fond of”.'
  },
  {
    tag: 'Gián tiếp',
    q: '“Would you mind helping me with this exercise?” she asked. → She asked me ______.',
    options: [
      'to help her with that exercise',
      'helping her with that exercise',
      'help her with that exercise',
      'if I helped her with that exercise'
    ],
    answer: 0,
    explain: '“Would you mind + V-ing?” là lời nhờ lịch sự; khi tường thuật dùng ask sb to do sth → asked me to help her with that exercise.'
  },
  {
    tag: 'V-ing',
    q: '“Why don’t we go to the cinema?” he said. → He suggested ______.',
    options: [
      'to go to the cinema',
      'going to the cinema',
      'go to the cinema',
      'that go to the cinema'
    ],
    answer: 1,
    explain: 'suggest + V-ing. Cũng có thể dùng “suggested that we (should) go”, nhưng phương án đúng ở đây là “going”.'
  },
  {
    tag: 'Since',
    q: 'She last wrote to her grandparents in April. → She hasn’t ______.',
    options: [
      'written to her grandparents since April',
      'wrote to her grandparents since April',
      'written to her grandparents for April',
      'written to her grandparents in April'
    ],
    answer: 0,
    explain: 'last + V2/ed + mốc → have/has not + V3/ed + since + mốc. “Since April” là mốc thời gian.'
  },
  {
    tag: 'Since',
    q: 'It has been two years since she last participated in a competition. → She hasn’t ______.',
    options: [
      'participated in a competition for two years',
      'participated in a competition since two years',
      'participate in a competition for two years',
      'participated in a competition two years ago'
    ],
    answer: 0,
    explain: 'It has been + khoảng thời gian + since … → S + has/have not + V3/ed + for + khoảng thời gian. Không dùng since với “two years”.'
  },
  {
    tag: 'So / such',
    q: 'The weather was so awful that we couldn’t go picnicking. → It was ______.',
    options: [
      'such awful weather that we couldn’t go picnicking',
      'so awful weather that we couldn’t go picnicking',
      'such an awful weather that we couldn’t go picnicking',
      'so an awful weather that we couldn’t go picnicking'
    ],
    answer: 0,
    explain: 'such + (a/an) + adj + N + that. “Weather” không đếm được nên không dùng “an”.'
  },
  {
    tag: 'So / such',
    q: 'Tom is very lazy, so he can’t get good marks. → Tom is so ______.',
    options: [
      'lazy that he can’t get good marks',
      'lazy so he can’t get good marks',
      'lazy because he can’t get good marks',
      'lazy to get good marks'
    ],
    answer: 0,
    explain: 'so + adj + that + clause. “Very lazy, so …” đổi thành “so lazy that …”.'
  },
  {
    tag: 'Tương phản',
    q: 'Although the project was practical, nobody wanted to carry it out. → Despite ______.',
    options: [
      'the project was practical, nobody wanted to carry it out',
      'the practicality of the project, nobody wanted to carry it out',
      'being practical, nobody wanted to carry the project out',
      'practical, nobody wanted to carry out the project'
    ],
    answer: 1,
    explain: 'Despite + N/N phrase. “the practicality of the project” là cụm danh từ đúng; các phương án còn lại sai cấu trúc.'
  },
  {
    tag: 'Lý do',
    q: 'Because he performed well, he was nominated as Singer of the Year. → Because of ______.',
    options: [
      'he performed well, he was nominated as Singer of the Year',
      'his good performance, he was nominated as Singer of the Year',
      'performing well, he was nominated as Singer of the Year',
      'his perform well, he was nominated as Singer of the Year'
    ],
    answer: 1,
    explain: 'Because of + N/N phrase. “his good performance” là cụm danh từ đúng; because of không đi với mệnh đề.'
  },
  {
    tag: 'Cụm động từ',
    q: 'Our car stopped working on the way to the beach. → Our car ______.',
    options: [
      'broke down on the way to the beach',
      'broke up on the way to the beach',
      'ran out of on the way to the beach',
      'put off on the way to the beach'
    ],
    answer: 0,
    explain: 'break down = stop working (hỏng máy). break up = chia tay; run out of = hết; put off = hoãn.'
  },
  {
    tag: 'Cụm động từ',
    q: 'The shop has no more roses. → The shop has ______.',
    options: [
      'run out of roses',
      'run out roses',
      'run out of rose',
      'run out from roses'
    ],
    answer: 0,
    explain: 'run out of + N = hết, không còn. “Roses” giữ số nhiều vì bài nói nhiều bông hồng.'
  },
  {
    tag: 'Gián tiếp',
    q: '“I will help you tomorrow,” he said. → He said ______.',
    options: [
      'he will help me tomorrow',
      'he would help me the next day',
      'he would help you tomorrow',
      'he helped me the next day'
    ],
    answer: 1,
    explain: 'Will → would; tomorrow → the next day; you → me. Không giữ nguyên will/tomorrow khi tường thuật.'
  },
  {
    tag: 'V-ing',
    q: '“I’m looking forward to seeing you,” she said. → She said she was looking forward ______.',
    options: ['to see me', 'to seeing me', 'seeing me', 'for seeing me'],
    answer: 1,
    explain: 'look forward to + V-ing; “to” là giới từ, không phải dấu hiệu to-V.'
  },
  {
    tag: 'V-ing',
    q: 'It takes me two hours to do my homework every day. → I spend ______.',
    options: [
      'two hours to do my homework every day',
      'two hours doing my homework every day',
      'two hours do my homework every day',
      'two hours for doing my homework every day'
    ],
    answer: 1,
    explain: 'It takes + time + to-V ↔ S + spend + time + V-ing. “spend two hours doing …” là cấu trúc đúng.'
  }
];

initQuiz({
  questions,
  storageKey: 'engprep-sentence-transformation-best',
  instruction: 'Chọn câu viết lại đúng',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc các nhóm viết lại câu và kiểm soát được thì, cấu trúc. Tự tin làm câu 37–40 nhé.'
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
        message: 'Xem lại bảng công thức và các bẫy về thì, giới từ, V-ing/to-V. Đừng viết lại theo cảm giác.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại tám nhóm mẫu, sau đó học mẫu động từ và bảng bẫy rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [{ href: '#formulas', label: 'Ôn lại công thức' }]
});
