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
  }
};
