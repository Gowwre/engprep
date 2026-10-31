import { sitePath } from '../lib/urls';

export type SheetSlug = 'tenses' | 'prepositions' | 'word-forms' | 'reading' | 'pronunciation';

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
  accent: 'tenses' | 'prep' | 'word' | 'reading' | 'sound';
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
  },
  {
    slug: 'word-forms',
    href: sitePath('word-forms/'),
    navLabel: 'Word forms',
    shortTitle: 'Word forms',
    title: 'Word forms tiếng Anh',
    metaTitle: 'Word Forms (Cấu tạo từ) — Cheatsheet lớp 9 | EngPrep',
    metaDescription:
      'Cheatsheet word forms cho học sinh lớp 9: vị trí từ loại trong câu, 33 hậu tố, 15 tiền tố, 40 họ từ thường gặp, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '03 / WORD FORMS',
    badge: '40 họ từ',
    accent: 'word',
    lead: 'Từ gốc → danh từ → tính từ → trạng từ: nhận diện hậu tố, tiền tố và 40 họ từ thường gặp.',
    preview: ['success', 'successful', 'successfully', 'un- + happy'],
    highlights: [
      { text: 'Bản đồ 4 dạng từ và bảng vị trí trong câu' },
      { text: '33 hậu tố, 15 tiền tố kèm ví dụ' },
      { strong: '40 họ từ', text: ' thường gặp, tra nhanh khi làm đề' },
      { text: '10 bẫy đề và 16 câu trắc nghiệm' }
    ],
    meta: '40 họ từ · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'rules', label: 'Quy tắc' },
      { id: 'suffixes', label: 'Hậu tố' },
      { id: 'prefixes', label: 'Tiền tố' },
      { id: 'families', label: 'Họ từ' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Word forms,<br>xác định đúng <span class="marker">từ loại</span>.',
      lead: 'Đọc vị trí trong câu, nhận diện hậu tố và chọn đúng dạng từ. Trang này gom quy tắc, bảng hậu tố – tiền tố, 40 họ từ và 10 bẫy đề thường gặp, kèm 16 câu tự kiểm tra.',
      badges: ['Bản in A4', 'Dùng offline', 'Giải thích tiếng Việt'],
      stats: [
        { value: '40', label: 'họ từ' },
        { value: '33', label: 'hậu tố' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ từ loại', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu trắc nghiệm', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'reading',
    href: sitePath('reading/'),
    navLabel: 'Đọc hiểu',
    shortTitle: 'Reading',
    title: 'Reading comprehension',
    metaTitle: 'Reading Comprehension (Đọc hiểu) — Cheatsheet lớp 9 | EngPrep',
    metaDescription:
      'Cheatsheet đọc hiểu tiếng Anh lớp 9: 7 dạng câu hỏi, chiến lược skim và scan, 26 từ nối, đoạn đọc mẫu có chú thích, 10 bẫy đề và 12 câu luyện tập có giải thích.',
    cardNo: '04 / READING',
    badge: '7 dạng câu',
    accent: 'reading',
    lead: 'Skim để nắm ý, scan để tìm bằng chứng và xử lý 7 dạng câu hỏi đọc hiểu thường gặp.',
    preview: ['main idea', 'detail', 'inference', 'however'],
    highlights: [
      { text: 'Bản đồ 7 dạng câu hỏi và cách xử lý' },
      { text: 'Quy trình 4 bước skim – scan – chọn bằng chứng' },
      { strong: '26 từ nối', text: ' và đoạn đọc mẫu có chú thích' },
      { text: '10 bẫy đề và 12 câu luyện tập' }
    ],
    meta: '7 dạng câu · 12 câu hỏi',
    questionCount: 12,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'strategy', label: 'Chiến lược' },
      { id: 'types', label: 'Dạng câu' },
      { id: 'connectors', label: 'Từ nối' },
      { id: 'sample', label: 'Đọc mẫu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Reading comprehension,<br>đọc đúng <span class="marker">ý chính</span>.',
      lead: 'Không cần dịch từng chữ. Trang này dạy cách skim, scan, tìm bằng chứng và xử lý 7 dạng câu hỏi đọc hiểu — kèm đoạn đọc mẫu, 10 bẫy đề và 12 câu luyện tập.',
      badges: ['Bản in A4', 'Dùng offline', 'Giải thích tiếng Việt'],
      stats: [
        { value: '7', label: 'dạng câu hỏi' },
        { value: '4', label: 'bước đọc' },
        { value: '12', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ dạng câu', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 12 câu đọc hiểu', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'pronunciation',
    href: sitePath('pronunciation/'),
    navLabel: 'Phát âm',
    shortTitle: 'Pronunciation',
    title: 'Pronunciation & stress',
    metaTitle: 'Pronunciation & Stress (Phát âm, trọng âm) — Cheatsheet lớp 9 | EngPrep',
    metaDescription:
      'Cheatsheet phát âm và trọng âm tiếng Anh lớp 9: quy tắc -ed, -s/-es, các cặp nguyên âm dễ nhầm, trọng âm 2 và 3 âm tiết, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '05 / SOUNDS',
    badge: '4 nhóm âm',
    accent: 'sound',
    lead: 'Đuôi -ed, -s/-es, nguyên âm và trọng âm: bốn nhóm âm thanh xuất hiện ở câu 1–4 của đề.',
    preview: ['watched /t/', 'played /d/', 'needed /ɪd/', 'PHO-to-graph'],
    highlights: [
      { text: 'Quy tắc -ed, -s/-es theo âm cuối' },
      { text: 'Các cặp nguyên âm dễ nhầm và âm câm' },
      { strong: 'Trọng âm 2–3 âm tiết', text: ' và đuôi từ hút trọng âm' },
      { text: '10 bẫy đề và 16 câu luyện tập' }
    ],
    meta: '4 nhóm âm · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'ed', label: '-ed' },
      { id: 's', label: '-s / -es' },
      { id: 'vowels', label: 'Nguyên âm' },
      { id: 'stress', label: 'Trọng âm' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Phát âm &amp; trọng âm,<br>lấy trọn <span class="marker">1 điểm</span> đầu tiên.',
      lead: 'Câu 1–4 trong đề luôn là phát âm và trọng âm. Trang này gom quy tắc -ed, -s/-es, các cặp nguyên âm dễ nhầm, trọng âm 2–3 âm tiết và 16 câu luyện tập.',
      badges: ['Bản in A4', 'Dùng offline', 'Giải thích tiếng Việt'],
      stats: [
        { value: '4', label: 'nhóm âm' },
        { value: '10', label: 'bẫy đề' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ âm', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu luyện tập', href: '#quiz', variant: 'ghost', icon: 'chevron' }
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
