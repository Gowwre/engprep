/* =========================================================
   EngPrep — Ngữ pháp cốt lõi
   Interactions: quiz
   ========================================================= */

import { initQuiz, formatGap } from './lib/quiz.js';

const questions = [
  {
    tag: 'Từ nối · Thêm ý',
    context:
      '<strong>Student:</strong> Innovations in technology are very important.<br><strong>Teacher:</strong> Sure. They can both save money ______ conserve the Earth’s resources.',
    q: 'Choose the best word to fill the gap.',
    options: ['as', 'and', 'but', 'or'],
    answer: 1,
    explain: 'Hai động từ “save” và “conserve” cùng chiều → and. But/or chỉ tương phản hoặc lựa chọn.'
  },
  {
    tag: 'Từ nối · Tương phản',
    context:
      '<strong>Jack:</strong> Did everything go well with your presentation yesterday?<br><strong>Lucy:</strong> I had prepared everything carefully, ______ the projector didn’t work.',
    q: 'Choose the best word to fill the gap.',
    options: ['so', 'because', 'but', 'although'],
    answer: 2,
    explain: 'Hai vế tương phản: chuẩn bị kỹ nhưng máy chiếu không chạy → but. So chỉ kết quả; because chỉ nguyên nhân; although cần mệnh đề tương phản nhưng không nối trực tiếp sau dấu phẩy theo cách này.'
  },
  {
    tag: 'Từ nối · Nguyên nhân',
    context:
      '<strong>Teacher:</strong> Who was absent from class this morning?<br><strong>Peter:</strong> Sam was! He didn’t come ______ he was sick.',
    q: 'Choose the best word to fill the gap.',
    options: ['so', 'but', 'because', 'though'],
    answer: 2,
    explain: 'Vế sau giải thích lý do Sam không đến → because. So chỉ kết quả; but/though chỉ tương phản.'
  },
  {
    tag: 'Từ nối · Kết quả',
    context: 'It rained heavily all morning, ______ the match was cancelled.',
    q: 'Choose the best word to fill the gap.',
    options: ['because', 'although', 'so', 'or'],
    answer: 2,
    explain: 'Vế sau là kết quả của việc mưa to → so. Because chỉ nguyên nhân; although chỉ tương phản; or chỉ lựa chọn.'
  },
  {
    tag: 'Từ nối · Kết quả',
    context: 'She studied hard for the exam. ______, she passed with a high score.',
    q: 'Choose the best word to fill the gap.',
    options: ['However', 'Therefore', 'Although', 'But'],
    answer: 1,
    explain: 'Câu trước là nguyên nhân, câu sau là kết quả → Therefore. However chỉ tương phản; But không đứng một mình trước dấu phẩy theo cách này.'
  },
  {
    tag: 'Mệnh đề quan hệ · Người',
    context:
      '<strong>Mike:</strong> We’re looking for a talented artist for the music program next month.<br><strong>Sarah:</strong> My friend Anna, ______ sings folk songs very well, may be suitable.',
    q: 'Choose the best word to fill the gap.',
    options: ['who', 'whom', 'which', 'whose'],
    answer: 0,
    explain: 'Danh từ trước là người (Anna) và đại từ làm chủ ngữ → who. Có dấu phẩy nên không dùng that.'
  },
  {
    tag: 'Mệnh đề quan hệ · Vật',
    context:
      '<strong>Ms Lan:</strong> What’s your favorite holiday destination?<br><strong>Ms Mai:</strong> I love a town or city ______ has quiet streets and a lot of museums.',
    q: 'Choose the best word to fill the gap.',
    options: ['who', 'whom', 'whose', 'that'],
    answer: 3,
    explain: 'Danh từ trước là vật (town or city), mệnh đề xác định → that (hoặc which). Who/whom dùng cho người; whose chỉ sở hữu.'
  },
  {
    tag: 'Mệnh đề quan hệ · Sở hữu',
    context: 'The boy ______ bike was stolen reported it to the police.',
    q: 'Choose the best word to fill the gap.',
    options: ['who', 'which', 'whose', 'where'],
    answer: 2,
    explain: 'Cần đại từ sở hữu đứng trước danh từ “bike” → whose. Who thay cho người; which thay cho vật; where chỉ nơi chốn.'
  },
  {
    tag: 'Mệnh đề quan hệ · Nơi chốn',
    context: 'This is the house ______ we lived when I was a child.',
    q: 'Choose the best word to fill the gap.',
    options: ['which', 'who', 'whose', 'where'],
    answer: 3,
    explain: 'Danh từ trước là nơi chốn (house) → where = in which. Which không thay được vì câu đã có đủ tân ngữ.'
  },
  {
    tag: 'So sánh · Hơn',
    context: 'This city is ______ than I expected.',
    q: 'Choose the best answer.',
    options: ['more crowded', 'most crowded', 'crowded', 'more crowding'],
    answer: 0,
    explain: 'Có “than” → so sánh hơn. “Crowded” là tính từ dài nên dùng more crowded.'
  },
  {
    tag: 'So sánh · Nhất',
    context: 'She is ______ student in our class.',
    q: 'Choose the best answer.',
    options: ['tallest', 'taller', 'as tall', 'the tallest'],
    answer: 3,
    explain: 'So sánh nhất với “in our class” → the tallest. Không bỏ “the” trước so sánh nhất.'
  },
  {
    tag: 'So sánh · Bằng nhau',
    context: 'The film is not ______ interesting as the book.',
    q: 'Choose the best word to fill the gap.',
    options: ['more', 'most', 'as', 'than'],
    answer: 2,
    explain: 'Cấu trúc so sánh bằng phủ định: not as + adj + as. “Than” chỉ dùng với so sánh hơn.'
  },
  {
    tag: 'So sánh · Even',
    context: 'It is even ______ today than it was yesterday.',
    q: 'Choose the best answer.',
    options: ['hot', 'hotter', 'hottest', 'more hot'],
    answer: 1,
    explain: 'Có “than” → so sánh hơn. “Hot” là tính từ ngắn, gấp đôi phụ âm: hotter. Even + comparative = càng … hơn.'
  },
  {
    tag: 'Mẫu động từ · to-V',
    context:
      '<strong>Mark:</strong> What do you think about your Chemistry teacher?<br><strong>Helen:</strong> He’s great. He always ______ his students to do their best.',
    q: 'Choose the best word to fill the gap.',
    options: ['encourages', 'sends', 'lets', 'makes'],
    answer: 0,
    explain: 'encourage sb to do sth = khuyến khích ai làm gì. Let/make + sb + bare V, nên không hợp với “to do”.'
  },
  {
    tag: 'Mẫu động từ · Forget',
    context:
      '<strong>Mom:</strong> Don’t forget ______ all the lights and fans before you leave home.<br><strong>Tim:</strong> I sure will.',
    q: 'Choose the best answer.',
    options: ['turning off', 'to turn off', 'turning on', 'to turn on'],
    answer: 1,
    explain: 'forget to do = quên làm (chưa làm). “Turn off” là tắt; “turn on” là bật. Ngữ cảnh rời nhà → tắt điện → to turn off.'
  },
  {
    tag: 'Mẫu động từ · Prefer',
    context: 'I prefer ______ at home to going out on rainy days.',
    q: 'Choose the best answer.',
    options: ['staying', 'to stay', 'stay', 'stayed'],
    answer: 0,
    explain: 'prefer + V-ing + to + V-ing = thích làm gì hơn làm gì. “To going out” cho thấy vế trước cần V-ing → staying.'
  },
  {
    tag: 'Mẫu động từ · Nhờ vả',
    context:
      '<strong>Jane:</strong> There’s a crack in the pipe in my kitchen. What should I do?<br><strong>Annie:</strong> You should ______ a plumber check it tomorrow.',
    q: 'Choose the best word to fill the gap.',
    options: ['have', 'having', 'allow', 'allowing'],
    answer: 0,
    explain: 'have sb do sth = nhờ ai làm gì. Sau “should” cần động từ nguyên mẫu: have. Allow không hợp cấu trúc “allow sb do”.'
  },
  {
    tag: 'Điểm phụ · Wish',
    context:
      '<strong>Helen:</strong> I’ve got to help my mom with the housework so I can’t go with you tonight.<br><strong>Tom:</strong> What a pity! I wish you ______ with me.',
    q: 'Choose the best answer.',
    options: ['goes', 'go', 'can go', 'could go'],
    answer: 3,
    explain: 'Câu ước ở hiện tại: wish + S + V(past). “Could” là quá khứ của “can”, diễn tả điều ước không có thật ở hiện tại → could go.'
  }
];

initQuiz({
  questions,
  storageKey: 'engprep-grammar-best',
  renderPrompt: (item) => '<div class="gr-quiz-context"><p>' + formatGap(item.context) + '</p></div>',
  renderReviewPrompt: (item) => '<p class="gr-review-context">' + formatGap(item.context) + '</p>',
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc bốn nhóm ngữ pháp lõi. Hãy giữ thói quen đọc cả câu và kiểm tra lại cấu trúc trước khi chọn đáp án.'
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
        message: 'Xem lại bảng từ nối, mệnh đề quan hệ và mẫu động từ. Khi làm bài, hãy xác định cấu trúc trước khi dịch nghĩa.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn nhóm ngữ pháp lõi, bảng tra nhanh và mười bẫy đề rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [
    { href: '#map', label: 'Ôn bảng ngữ pháp' },
    { href: '#traps', label: 'Xem bẫy đề' }
  ]
});
