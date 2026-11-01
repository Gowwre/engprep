/* =========================================================
   EngPrep — Biển báo & giao tiếp
   Interactions: quiz
   ========================================================= */

import { initQuiz } from './lib/quiz.js';

const questions = [
  {
    tag: 'Biển báo · Cấm',
    sign: { label: 'Sign', text: 'NO PARKING' },
    q: 'What does the sign mean?',
    options: [
      'You can park here.',
      'Parking is free today.',
      'You must not park here.',
      'You should park quickly.'
    ],
    answer: 2,
    explain: 'No + V-ing = cấm làm gì. “No parking” nghĩa là không được đỗ xe, không phải có chỗ đỗ.'
  },
  {
    tag: 'Biển báo · Thông tin',
    sign: { label: 'Notice', text: 'FREE ENTRY' },
    q: 'What does the notice mean?',
    options: [
      'You must pay to enter.',
      'Food is free inside.',
      'The museum is closed.',
      'You can enter without paying.'
    ],
    answer: 3,
    explain: 'Free entry = vào cửa miễn phí. Thông báo không nói gì về đồ ăn hay giờ mở cửa.'
  },
  {
    tag: 'Biển báo · Thông tin',
    sign: { label: 'Notice', text: 'OUT OF ORDER' },
    q: 'What does the notice mean?',
    options: [
      'The machine is broken.',
      'You can order here.',
      'The shop is open.',
      'The price is lower.'
    ],
    answer: 0,
    explain: 'Out of order = máy hoặc hệ thống bị hỏng. Đừng nhầm “order” với “đặt hàng”.'
  },
  {
    tag: 'Biển báo · Thông tin',
    sign: { label: 'Notice', text: '50% OFF' },
    q: 'What does the sign mean?',
    options: [
      'You must buy two items.',
      'Everything is free.',
      'The price is reduced by half.',
      'The shop closes at five.'
    ],
    answer: 2,
    explain: '50% off = giảm 50% giá, tức trả một nửa giá. Không phải mua 1 tặng 1.'
  },
  {
    tag: 'Biển báo · Điều kiện',
    sign: { label: 'Notice', text: 'BOOKING REQUIRED' },
    q: 'What should you do?',
    options: [
      'Come at any time.',
      'Book before you come.',
      'Pay at the door.',
      'Wait for a free table.'
    ],
    answer: 1,
    explain: 'Required = bắt buộc; booking = đặt trước. Bạn phải đặt chỗ trước khi đến.'
  },
  {
    tag: 'Biển báo · Giới hạn',
    sign: { label: 'Sign', text: 'STAFF ONLY' },
    q: 'What does the sign mean?',
    options: [
      'Everyone can enter.',
      'Customers can use it after five.',
      'Staff must wait outside.',
      'Only employees can enter.'
    ],
    answer: 3,
    explain: 'Only = chỉ. Staff only = chỉ nhân viên được vào; khách không được vào.'
  },
  {
    tag: 'Biển báo · Cảnh báo',
    sign: { label: 'Sign', text: 'WET FLOOR' },
    q: 'What does the sign mean?',
    options: [
      'Be careful because the floor is wet.',
      'The floor will be cleaned later.',
      'You can skate here.',
      'The floor is closed forever.'
    ],
    answer: 0,
    explain: 'Wet floor = sàn ướt, cảnh báo trượt. Không phải thông báo sàn đã khô hay sẽ được lau.'
  },
  {
    tag: 'Biển báo · Cấm',
    sign: { label: 'Sign', text: 'NO FOOD OR DRINK' },
    q: 'What does the sign mean?',
    options: [
      'You can bring drinks only.',
      'Food is free here.',
      'You cannot bring food or drinks in.',
      'You must buy food here.'
    ],
    answer: 2,
    explain: 'No food or drink = cấm cả đồ ăn và đồ uống. “Or” ở đây gom cả hai, không phải chỉ cấm một thứ.'
  },
  {
    tag: 'Giao tiếp · Nhờ vả',
    context:
      '<strong>Mai:</strong> “Would you mind opening the window?”<br><strong>Nam:</strong> “______”',
    q: 'Choose the best response.',
    options: ['Yes, I would.', 'You’re welcome.', 'Not at all.', 'Never mind.'],
    answer: 2,
    explain: '“Not at all.” = không phiền, tức là đồng ý giúp. “You’re welcome.” đáp lời cảm ơn; “Never mind.” đáp lời xin lỗi.'
  },
  {
    tag: 'Giao tiếp · Gợi ý',
    context:
      '<strong>Lan:</strong> “Why don’t we join the clean-up campaign?”<br><strong>Hoa:</strong> “______”',
    q: 'Choose the best response.',
    options: ['Because we are busy.', 'Good idea.', 'You’re welcome.', 'I’m sorry, I’m late.'],
    answer: 1,
    explain: '“Why don’t we…?” là lời gợi ý, không phải câu hỏi nguyên nhân. Đáp “Good idea.” là phù hợp.'
  },
  {
    tag: 'Giao tiếp · Xin lỗi',
    context:
      '<strong>Nam:</strong> “I’m sorry I’m late.”<br><strong>Mai:</strong> “______”',
    q: 'Choose the best response.',
    options: ['You’re welcome.', 'Good idea.', 'I’m sorry.', 'Never mind.'],
    answer: 3,
    explain: 'Đáp lời xin lỗi bằng “Never mind.” hoặc “That’s all right.”. “You’re welcome.” dùng để đáp lời cảm ơn.'
  },
  {
    tag: 'Giao tiếp · Cảm ơn',
    context:
      '<strong>Hoa:</strong> “Thank you for helping me.”<br><strong>Lan:</strong> “______”',
    q: 'Choose the best response.',
    options: ['Never mind.', 'Good idea.', 'You’re welcome.', 'Yes, please.'],
    answer: 2,
    explain: '“You’re welcome.” là cách đáp chuẩn cho lời cảm ơn. “Never mind.” dùng khi ai đó xin lỗi.'
  },
  {
    tag: 'Giao tiếp · Mời',
    context:
      '<strong>Nam:</strong> “Would you like to come to my birthday party?”<br><strong>Mai:</strong> “______”',
    q: 'Choose the best response.',
    options: ['I’d love to. Thanks.', 'You’re welcome.', 'Never mind.', 'I’m sorry I’m late.'],
    answer: 0,
    explain: 'Đây là lời mời. “I’d love to. Thanks.” là cách nhận lời tự nhiên; các đáp án còn lại sai chức năng.'
  },
  {
    tag: 'Giao tiếp · Xin phép',
    context:
      '<strong>Nam:</strong> “May I use your phone?”<br><strong>Mai:</strong> “______”',
    q: 'Choose the best response.',
    options: ['You’re welcome.', 'I’m afraid you can’t.', 'Good idea.', 'Thanks a lot.'],
    answer: 1,
    explain: '“May I…?” là câu xin phép. “I’m afraid you can’t.” là lời từ chối lịch sự; “You’re welcome.” đáp lời cảm ơn.'
  },
  {
    tag: 'Giao tiếp · Sức khoẻ',
    context:
      '<strong>Lan:</strong> “You look tired. You should take a rest.”<br><strong>Mai:</strong> “______”',
    q: 'Choose the best response.',
    options: ['You’re welcome.', 'Good idea, I’m full.', 'Never mind.', 'Thanks. I’ll take a break.'],
    answer: 3,
    explain: 'Đây là lời khuyên về sức khoẻ. “Thanks. I’ll take a break.” đáp đúng; “I’m full” nói về ăn no, không hợp.'
  },
  {
    tag: 'Giao tiếp · Động viên',
    context:
      '<strong>Nam:</strong> “Don’t worry. You can do it!”<br><strong>Mai:</strong> “______”',
    q: 'Choose the best response.',
    options: ['You’re welcome.', 'I’m sorry.', 'Thanks. I’ll try.', 'Not at all.'],
    answer: 2,
    explain: 'Đây là lời động viên. “Thanks. I’ll try.” là đáp phù hợp; “Not at all.” thường đáp lời cảm ơn hoặc lời nhờ.'
  }
];

function signPrompt(item) {
  if (item.sign) {
    return (
      '<div class="sg-quiz-sign">' +
      '<span>' + item.sign.label + '</span>' +
      '<strong>' + item.sign.text + '</strong>' +
      '</div>'
    );
  }

  if (item.context) {
    return '<div class="sg-quiz-context"><p>' + item.context + '</p></div>';
  }

  return '';
}

function signReviewPrompt(item) {
  if (item.sign) {
    return '<p class="sg-review-context">Biển báo: <strong>' + item.sign.text + '</strong></p>';
  }

  if (item.context) {
    return '<p class="sg-review-context">' + item.context + '</p>';
  }

  return '';
}

initQuiz({
  questions,
  storageKey: 'engprep-signs-best',
  renderPrompt: signPrompt,
  renderReviewPrompt: signReviewPrompt,
  resultCopy: (score, total) => {
    if (score === total) {
      return {
        title: 'Hoàn hảo, không sai câu nào!',
        message: 'Bạn đã nắm chắc cách đọc biển báo, thông báo và chọn câu đáp giao tiếp. Tự tin làm hai phần này trong đề nhé.'
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
        message: 'Xem lại bảng biển báo và tám chức năng giao tiếp. Khi làm bài, hãy xác định chức năng trước khi chọn đáp án.'
      };
    }

    return {
      title: 'Cần ôn thêm một vòng.',
      message: 'Đọc lại bốn nhóm biển báo, bảng 20 mẫu và tám chức năng giao tiếp rồi làm lại bài kiểm tra.'
    };
  },
  reviewLinks: [
    { href: '#signs', label: 'Ôn biển báo' },
    { href: '#communication', label: 'Ôn giao tiếp' }
  ]
});
