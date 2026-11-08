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
  }
};
