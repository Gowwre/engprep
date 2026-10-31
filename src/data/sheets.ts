import { sitePath } from '../lib/urls';

export type SheetSlug = 'tenses' | 'prepositions';

export interface SheetAction {
  label: string;
  href: string;
  variant: 'primary' | 'ghost';
  icon: 'arrow' | 'chevron';
}

export interface SheetStat {
  value: string;
  label: string;
}

export interface SheetHighlight {
  strong?: string;
  text: string;
}

export interface SheetNavItem {
  id: string;
  label: string;
}

export interface SheetHero {
  eyebrow: string;
  titleHtml: string;
  lead: string;
  badges: string[];
  stats: SheetStat[];
  actions: SheetAction[];
}

export interface Sheet {
  slug: SheetSlug;
  href: string;
  navLabel: string;
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  cardNo: string;
  badge: string;
  accent: 'tenses' | 'prep';
  lead: string;
  preview: string[];
  highlights: SheetHighlight[];
  meta: string;
  questionCount: number;
  sections: SheetNavItem[];
  hero: SheetHero;
}

export const sheets: Sheet[] = [
  {
    slug: 'tenses',
    href: sitePath('tenses/'),
    navLabel: '12 thì',
    shortTitle: '12 thì',
    title: '12 thì tiếng Anh',
    metaTitle: '12 Thì Tiếng Anh — Cheatsheet lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn thi 12 thì tiếng Anh dành cho học sinh lớp 9: công thức, cách dùng, dấu hiệu nhận biết, ví dụ và bẫy đề thi theo chương trình Global Success 9.',
    cardNo: '01 / TENSES',
    badge: '12 thì',
    accent: 'tenses',
    lead: 'Sơ đồ 4 dạng × 3 mốc thời gian, công thức từng thì và những cặp dễ nhầm trong đề.',
    preview: ['S + V(s/es)', 'S + was/were + V-ing', 'S + have/has + V3/ed'],
    highlights: [
      { text: 'Sơ đồ 12 thì và dòng thời gian trực quan' },
      { text: 'Công thức, cách dùng, dấu hiệu của từng thì' },
      { strong: '4 cặp thì dễ nhầm', text: ' và 8 bẫy đề' },
      { text: '12 câu trắc nghiệm có giải thích' }
    ],
    meta: '12 thì · 12 câu hỏi',
    questionCount: 12,
    sections: [
      { id: 'map', label: 'Sơ đồ' },
      { id: 'timeline', label: 'Dòng thời gian' },
      { id: 'tenses', label: '12 thì' },
      { id: 'compare', label: 'So sánh' },
      { id: 'signals', label: 'Dấu hiệu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Unit 1–3',
      titleHtml:
        '12 thì tiếng Anh,<br>gói gọn trong <span class="marker">một tờ</span> <span class="nowrap">cheat sheet.</span>',
      lead: 'Công thức, cách dùng, dấu hiệu nhận biết và bẫy đề thi, tất cả trong một trang, kèm ví dụ về văn hoá, cộng đồng và lối sống lành mạnh.',
      badges: ['In được khổ A4', 'Không cần mạng', 'Giải thích tiếng Việt'],
      stats: [
        { value: '12', label: 'thì cần nắm' },
        { value: '3', label: 'mốc thời gian' },
        { value: '12', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Ôn 12 thì', href: '#tenses', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 12 câu trắc nghiệm', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'prepositions',
    href: sitePath('prepositions/'),
    navLabel: 'Giới từ',
    shortTitle: 'Giới từ',
    title: 'Giới từ tiếng Anh',
    metaTitle: 'Giới từ tiếng Anh — Cheatsheet lớp 9 | EngPrep',
    metaDescription:
      'Cheatsheet giới từ tiếng Anh cho học sinh lớp 9: cách dùng at/on/in, giới từ chỉ thời gian, nơi chốn, chuyển động, 54 cụm cố định, 10 lỗi thường gặp và bài kiểm tra 16 câu có giải thích.',
    cardNo: '02 / PREPOSITIONS',
    badge: '54 cụm',
    accent: 'prep',
    lead: 'at/on/in theo thời gian, vị trí, chuyển động và 54 cụm cố định cần thuộc lòng.',
    preview: ['at 7 p.m.', 'on Monday', 'in 2026', 'look forward to'],
    highlights: [
      { text: 'Bản đồ 4 nhóm giới từ và bảng tra nhanh' },
      { text: 'Hình minh hoạ vị trí, bảng chuyển động' },
      { strong: '54 cụm cố định', text: ' và 4 cặp dễ nhầm' },
      { text: '10 bẫy đề và 16 câu trắc nghiệm' }
    ],
    meta: '54 cụm · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'rules', label: 'Quy tắc' },
      { id: 'time', label: 'Thời gian' },
      { id: 'place', label: 'Vị trí' },
      { id: 'movement', label: 'Chuyển động' },
      { id: 'collocations', label: 'Cụm từ' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Giới từ theo cụm,<br>làm <span class="marker">đúng cả câu</span>.',
      lead: 'at, on, in tưởng dễ nhưng lại rất dễ mất điểm. Trang này tổng hợp cách dùng giới từ chỉ thời gian, nơi chốn, chuyển động, 54 cụm cố định và 10 lỗi thường gặp — kèm giải thích tiếng Việt và bài tập tự kiểm tra.',
      badges: ['Bản in A4', 'Dùng offline', 'Giải thích tiếng Việt'],
      stats: [
        { value: '54', label: 'cụm cố định' },
        { value: '16', label: 'câu luyện tập' },
        { value: '10', label: 'bẫy đề' }
      ],
      actions: [
        { label: 'Xem bản đồ giới từ', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm bài kiểm tra', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  }
];

export function getSheet(slug: SheetSlug): Sheet {
  const sheet = sheets.find((item) => item.slug === slug);

  if (!sheet) {
    throw new Error(`Unknown cheat sheet: ${slug}`);
  }

  return sheet;
}

export const totalQuestions = sheets.reduce(
  (total, sheet) => total + sheet.questionCount,
  0
);
