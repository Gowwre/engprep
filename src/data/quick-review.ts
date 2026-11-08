import type { SheetSlug } from './sheets';

export interface QuickReviewItem {
  label?: string;
  text: string;
  code?: boolean;
}

export interface QuickReviewTab {
  id: string;
  label: string;
  items: QuickReviewItem[];
}

export interface QuickReviewContent {
  kicker?: string;
  title: string;
  lead?: string;
  tabs: QuickReviewTab[];
  quizHref?: string;
  quizLabel?: string;
  moreHref?: string;
}

export const quickReviews: Partial<Record<SheetSlug, QuickReviewContent>> = {
  tenses: {
    title: '12 thì trong một màn hình.',
    lead: 'Sáu công thức, sáu dấu hiệu và ba bẫy lớn nhất. Cần chi tiết, mở bản đầy đủ bên dưới.',
    tabs: [
      {
        id: 'formula',
        label: 'Công thức',
        items: [
          { label: 'Hiện tại đơn', text: 'S + V(s/es)', code: true },
          { label: 'Hiện tại tiếp diễn', text: 'S + am/is/are + V-ing', code: true },
          { label: 'Hiện tại hoàn thành', text: 'S + have/has + V3/ed', code: true },
          { label: 'Quá khứ đơn', text: 'S + V2/ed', code: true },
          { label: 'Quá khứ tiếp diễn', text: 'S + was/were + V-ing', code: true },
          { label: 'Tương lai đơn', text: 'S + will + V', code: true }
        ]
      },
      {
        id: 'signals',
        label: 'Dấu hiệu',
        items: [
          { label: 'every day', text: '→ hiện tại đơn' },
          { label: 'now, Look!', text: '→ hiện tại tiếp diễn' },
          { label: 'since, for, already', text: '→ hiện tại hoàn thành' },
          { label: 'yesterday, ago, last', text: '→ quá khứ đơn' },
          { label: 'while, at 8 p.m. yesterday', text: '→ quá khứ tiếp diễn' },
          { label: 'tomorrow, next week', text: '→ tương lai đơn' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'Since / for', text: 'since + mốc, for + khoảng thời gian.' },
          { label: 'Last year', text: 'quá khứ đơn, không dùng hiện tại hoàn thành.' },
          { label: 'By the time', text: 'hành động xảy ra trước dùng quá khứ hoàn thành.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 12 câu thì'
  },
  prepositions: {
    title: 'Giới từ: nhớ điểm, bề mặt, không gian.',
    lead: 'Ba tầng nghĩa, sáu cụm cần thuộc và ba lỗi hay mất điểm.',
    tabs: [
      {
        id: 'rules',
        label: 'Quy tắc',
        items: [
          { label: 'AT', text: 'một điểm: at the door, at 7 p.m.' },
          { label: 'ON', text: 'một bề mặt: on the wall, on Monday.' },
          { label: 'IN', text: 'một không gian: in the room, in 2026.' },
          { label: 'Thời gian', text: 'at + giờ, on + ngày, in + tháng/năm.' },
          { label: 'Sau giới từ', text: 'N hoặc V-ing: interested in learning.' },
          { label: 'Học theo cụm', text: 'đừng dịch từng giới từ riêng lẻ.' }
        ]
      },
      {
        id: 'chunks',
        label: 'Cụm cần nhớ',
        items: [
          { label: 'depend on', text: 'phụ thuộc vào' },
          { label: 'good at', text: 'giỏi về' },
          { label: 'interested in', text: 'hứng thú với' },
          { label: 'look forward to + V-ing', text: 'mong chờ' },
          { label: 'in spite of + N/V-ing', text: 'mặc dù' },
          { label: 'on foot', text: 'đi bộ' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'Năm', text: 'in 2010, không dùng at 2010.' },
          { label: 'Phương tiện', text: 'by bus, nhưng on foot.' },
          { label: 'Khoảng thời gian', text: 'for three years, không dùng since three years.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 16 câu giới từ'
  },
  'word-forms': {
    title: 'Từ loại: nhìn vị trí trước, nhìn đuôi sau.',
    lead: 'Sáu vị trí trong câu, bốn nhóm hậu tố và ba cặp từ dễ nhầm.',
    tabs: [
      {
        id: 'signals',
        label: 'Dấu hiệu',
        items: [
          { label: 'a/an/the/my + ___ + N', text: 'cần tính từ' },
          { label: 'be/look/feel/seem + ___', text: 'cần tính từ' },
          { label: 'V + ___', text: 'cần trạng từ' },
          { label: 'prep + ___', text: 'cần danh từ hoặc V-ing' },
          { label: 'more/most/very + ___', text: 'cần tính từ/trạng từ' },
          { label: '___ + V', text: 'cần danh từ làm chủ ngữ' }
        ]
      },
      {
        id: 'suffixes',
        label: 'Hậu tố',
        items: [
          { label: 'Danh từ', text: '-tion, -ment, -ness, -ity', code: true },
          { label: 'Tính từ', text: '-ful, -less, -ive, -able', code: true },
          { label: 'Động từ', text: '-ize, -ify, -en', code: true },
          { label: 'Trạng từ', text: '-ly', code: true },
          { label: 'Phủ định', text: 'un-, im-, dis-, ir-', code: true },
          { label: 'Lưu ý', text: 'friendly là tính từ, không phải trạng từ.' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'interesting / interested', text: 'vật gây hứng thú / người cảm thấy hứng thú.' },
          { label: 'advice / advise', text: 'danh từ / động từ.' },
          { label: 'hard / hardly', text: 'chăm chỉ / hầu như không.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 16 câu từ loại'
  },
  reading: {
    title: 'Đọc hiểu: nhìn câu hỏi trước khi đọc bài.',
    lead: 'Sáu kiểu câu hỏi, bốn bước đọc và ba bẫy làm mất điểm.',
    tabs: [
      {
        id: 'types',
        label: '7 dạng câu',
        items: [
          { label: 'Ý chính', text: 'câu đầu, câu cuối, từ lặp lại.' },
          { label: 'Chi tiết', text: 'scan tên, số, ngày, địa điểm.' },
          { label: 'Từ vựng', text: 'đọc câu trước và câu sau.' },
          { label: 'Từ thay thế', text: 'tìm danh từ phù hợp với it/they/this.' },
          { label: 'Suy luận', text: 'ghép 2–3 manh mối, không chọn cực đoan.' },
          { label: 'Đúng/Sai/NOT + điền khuyết', text: 'đối chiếu từng phương án với bài.' }
        ]
      },
      {
        id: 'method',
        label: 'Cách làm',
        items: [
          { label: '1 phút', text: 'đọc lướt tiêu đề, câu đầu/cuối mỗi đoạn.' },
          { label: '1 phút', text: 'gạch keyword trong câu hỏi.' },
          { label: '5 phút', text: 'scan từ khoá, tìm từ đồng nghĩa và bằng chứng.' },
          { label: '1 phút', text: 'loại đáp án sai phạm vi hoặc quá cực đoan.' },
          { label: 'Quy tắc', text: 'đáp án đúng phải có bằng chứng trong bài.' },
          { label: 'Paraphrase', text: 'đáp án thường được viết lại, không lặp y nguyên.' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'Lặp từ', text: 'đáp án chép y nguyên từ trong bài thường là bẫy.' },
          { label: 'Phạm vi', text: 'đúng nhưng không trả lời đúng câu hỏi.' },
          { label: 'NOT / EXCEPT', text: 'bỏ qua từ phủ định trong câu hỏi.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 12 câu đọc hiểu'
  },
  cloze: {
    title: 'Điền khuyết: đọc cả câu trước khi chọn.',
    lead: 'Năm loại chỗ trống, bốn bước và ba lỗi hay mất điểm.',
    tabs: [
      {
        id: 'types',
        label: '5 loại chỗ trống',
        items: [
          { label: 'Ngữ pháp', text: 'giới từ, dạng động từ, mệnh đề quan hệ.' },
          { label: 'Từ vựng', text: 'nghĩa của từ trong câu và cả đoạn.' },
          { label: 'Cụm cố định', text: 'make a decision, depend on, heavy rain.' },
          { label: 'Từ nối', text: 'thêm ý, tương phản, nguyên nhân, kết quả.' },
          { label: 'Từ thay thế', text: 'it/they/this/that thay cho danh từ nào.' },
          { label: 'Mạo từ / lượng từ', text: 'a/an/the, many/much, some/any.' }
        ]
      },
      {
        id: 'method',
        label: '4 bước',
        items: [
          { label: '1 phút', text: 'đọc lướt để nắm chủ đề và giọng điệu.' },
          { label: '1 phút', text: 'đọc câu trước và câu sau chỗ trống.' },
          { label: '5 phút', text: 'kiểm tra loại từ, thì, giới từ, cụm cố định.' },
          { label: '1 phút', text: 'điền thử rồi đọc lại cả đoạn.' },
          { label: 'Thứ tự', text: 'loại từ → ngữ pháp → collocation → nghĩa.' },
          { label: 'Quy tắc', text: 'không chọn chỉ vì nghe quen tai.' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'many / much', text: 'many people, much water.' },
          { label: 'depend on', text: 'không dùng depend of.' },
          { label: 'Từ nối đôi', text: 'although … but là sai; chọn một.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 12 câu điền khuyết'
  },
  'sentence-transformation': {
    title: 'Viết lại câu: đổi cấu trúc, giữ nguyên nghĩa.',
    lead: 'Sáu nhóm công thức, sáu mẫu động từ và ba lỗi hay gặp.',
    tabs: [
      {
        id: 'formulas',
        label: 'Công thức',
        items: [
          { label: 'Điều kiện', text: 'If/Unless + S + V(s/es), S + will/can + V.' },
          { label: 'Wish', text: 'wish + V2/ed (hiện tại), wish + had + V3/ed (quá khứ).' },
          { label: 'V-ing', text: 'fond of / keen on / suggest + V-ing.' },
          { label: 'Since', text: 'It has been + time + since + S + last + V2/ed.' },
          { label: 'So/such', text: 'so + adj + that ↔ such + (a/an) + adj + N + that.' },
          { label: 'Cụm động từ / gián tiếp', text: 'break down, run out of; said/told + lùi thì.' }
        ]
      },
      {
        id: 'verb-patterns',
        label: 'Mẫu động từ',
        items: [
          { label: 'V-ing', text: 'enjoy, mind, avoid, suggest, look forward to.' },
          { label: 'to-V', text: 'want, decide, hope, plan, promise, refuse.' },
          { label: 'V + O + to-V', text: 'ask, tell, remind, encourage + sb + to-V.' },
          { label: 'stop + V-ing', text: 'dừng hành động.' },
          { label: 'stop + to-V', text: 'dừng lại để làm gì.' },
          { label: 'remember / try', text: 'đổi dạng là đổi nghĩa; học theo cặp.' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'Despite', text: 'Despite + N/V-ing, không dùng Despite of.' },
          { label: 'Since', text: 'since + mốc, for + khoảng thời gian.' },
          { label: 'So/such', text: 'so + adj, such + (a/an) + adj + N.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 16 câu viết lại'
  },
  'sentence-construction': {
    title: 'Sắp xếp câu: tìm S + V trước.',
    lead: 'Một khung câu, bốn bước ghép và ba lỗi thường gặp.',
    tabs: [
      {
        id: 'word-order',
        label: 'Trật tự từ',
        items: [
          { label: 'Khung', text: 'S + V + O + Manner + Place + Time.' },
          { label: 'Cụm bổ nghĩa', text: 'giữ cụm cố định đi liền nhau.' },
          { label: 'Mục đích', text: 'to-V thường đứng cuối câu.' },
          { label: 'By + V-ing', text: 'đi sau động từ chính hoặc cuối câu.' },
          { label: 'Not only … but also', text: 'giữ đúng cặp và trật tự.' },
          { label: 'Mệnh đề quan hệ', text: 'đi ngay sau danh từ được bổ nghĩa.' }
        ]
      },
      {
        id: 'steps',
        label: '4 bước',
        items: [
          { label: '30 giây', text: 'tìm chủ ngữ: ai/cái gì thực hiện hành động?' },
          { label: '30 giây', text: 'tìm động từ chính và thì của câu.' },
          { label: '1 phút', text: 'gắn tân ngữ, cụm cố định, giới từ.' },
          { label: '1 phút', text: 'đọc lại, kiểm tra hoa/dấu câu/nghĩa.' },
          { label: 'Từ điển', text: 'xác định chỗ trống rồi chọn cụm 2–3 từ.' },
          { label: 'Kiểm tra', text: 'cụm đúng nghĩa và đúng dạng ngữ pháp.' }
        ]
      },
      {
        id: 'traps',
        label: 'Bẫy',
        items: [
          { label: 'Ghép theo tai', text: 'cụm đọc xuôi tai chưa chắc đúng trật tự.' },
          { label: 'Thiếu động từ chính', text: 'mỗi câu cần một động từ chính chia theo S.' },
          { label: 'Từ điển', text: 'đừng viết cả câu vào chỗ trống 2–3 từ.' }
        ]
      }
    ],
    quizHref: '#quiz',
    quizLabel: 'Làm 16 câu phần VI'
  }
};
