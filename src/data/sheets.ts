import { sitePath } from '../lib/urls';

export type SheetSlug =
  | 'tenses'
  | 'prepositions'
  | 'word-forms'
  | 'reading'
  | 'pronunciation'
  | 'sentence-transformation'
  | 'vocabulary'
  | 'cloze'
  | 'signs'
  | 'grammar'
  | 'sentence-construction'
  | 'mock-exam';

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
  stats: SheetStat[];
  actions: SheetAction[];
}

export interface Sheet {
  slug: SheetSlug;
  href: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  cardNo: string;
  badge: string;
  accent:
    | 'tenses'
    | 'prep'
    | 'word'
    | 'reading'
    | 'sound'
    | 'write'
    | 'vocab'
    | 'cloze'
    | 'signs'
    | 'grammar'
    | 'sentence'
    | 'mock';
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
    title: '12 thì',
    metaTitle: '12 thì tiếng Anh — Tờ ôn thi lớp 9 | EngPrep',
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
      { id: 'quick-review', label: 'Ôn nhanh' },
      { id: 'map', label: 'Sơ đồ' },
      { id: 'timeline', label: 'Dòng thời gian' },
      { id: 'tenses', label: '12 thì' },
      { id: 'compare', label: 'So sánh' },
      { id: 'signals', label: 'Dấu hiệu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        '12 thì tiếng Anh,<br>gói gọn trong <span class="marker">một tờ</span>.',
      lead: 'Công thức, cách dùng, dấu hiệu nhận biết và bẫy đề thi, tất cả trong một trang, kèm ví dụ về văn hoá, cộng đồng và lối sống lành mạnh.',
      stats: [
        { value: '12', label: 'thì cần nắm' },
        { value: '3', label: 'mốc thời gian' },
        { value: '12', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Ôn nhanh 12 thì', href: '#quick-review', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 12 câu trắc nghiệm', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'prepositions',
    href: sitePath('prepositions/'),
    navLabel: 'Giới từ',
    title: 'Giới từ',
    metaTitle: 'Giới từ tiếng Anh — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn giới từ tiếng Anh cho học sinh lớp 9: cách dùng at/on/in, giới từ chỉ thời gian, nơi chốn, chuyển động, 54 cụm cố định, 10 lỗi thường gặp và bài kiểm tra 16 câu có giải thích.',
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
    navLabel: 'Từ loại',
    title: 'Từ loại',
    metaTitle: 'Từ loại — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn từ loại cho học sinh lớp 9: vị trí từ loại trong câu, 33 hậu tố, 15 tiền tố, 40 họ từ thường gặp, 10 bẫy đề và 16 câu luyện tập có giải thích.',
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
        'Từ loại,<br>xác định đúng <span class="marker">dạng từ</span>.',
      lead: 'Đọc vị trí trong câu, nhận diện hậu tố và chọn đúng dạng từ. Trang này gom quy tắc, bảng hậu tố – tiền tố, 40 họ từ và 10 bẫy đề thường gặp, kèm 16 câu tự kiểm tra.',
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
    title: 'Đọc hiểu',
    metaTitle: 'Đọc hiểu — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn đọc hiểu tiếng Anh lớp 9: 7 dạng câu hỏi, chiến lược đọc lướt (skim) và đọc quét (scan), 26 từ nối, đoạn đọc mẫu có chú thích, 10 bẫy đề và 12 câu luyện tập có giải thích.',
    cardNo: '04 / READING',
    badge: '7 dạng câu',
    accent: 'reading',
    lead: 'Đọc lướt (skim) để nắm ý, đọc quét (scan) để tìm bằng chứng và xử lý 7 dạng câu hỏi đọc hiểu thường gặp.',
    preview: ['main idea', 'detail', 'inference', 'however'],
    highlights: [
      { text: 'Bản đồ 7 dạng câu hỏi và cách xử lý' },
      { text: 'Quy trình 4 bước: đọc lướt – đọc quét – chọn bằng chứng' },
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
        'Đọc hiểu,<br>nắm đúng <span class="marker">ý chính</span>.',
      lead: 'Không cần dịch từng chữ. Trang này dạy cách đọc lướt (skim), đọc quét (scan), tìm bằng chứng và xử lý 7 dạng câu hỏi đọc hiểu — kèm đoạn đọc mẫu, 10 bẫy đề và 12 câu luyện tập.',
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
    title: 'Phát âm & trọng âm',
    metaTitle: 'Phát âm & trọng âm — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn phát âm và trọng âm tiếng Anh lớp 9: quy tắc -ed, -s/-es, các cặp nguyên âm dễ nhầm, trọng âm 2 và 3 âm tiết, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '05 / PRONUNCIATION',
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
  },
  {
    slug: 'sentence-transformation',
    href: sitePath('sentence-transformation/'),
    navLabel: 'Viết lại câu',
    title: 'Viết lại câu',
    metaTitle: 'Viết lại câu — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn viết lại câu tiếng Anh lớp 9: câu điều kiện, câu ước (wish), cụm từ + V-ing, hiện tại hoàn thành + since, so/such, cụm động từ, tương phản và 16 câu luyện tập có giải thích.',
    cardNo: '06 / REWRITING',
    badge: '8 nhóm mẫu',
    accent: 'write',
    lead: 'Câu điều kiện, câu ước (wish), V-ing, since, so/such và cụm động từ: tám nhóm viết lại câu lặp lại qua các đề.',
    preview: ['If / Unless', 'wish + V2/ed', 'fond of + V-ing', 'so … that'],
    highlights: [
      { text: 'Bản đồ 8 nhóm mẫu viết lại câu' },
      { text: 'Công thức và ví dụ cho từng nhóm' },
      { strong: 'V-ing vs to-V', text: ' và các cụm động từ thường gặp' },
      { text: '10 bẫy đề và 16 câu luyện tập' }
    ],
    meta: '8 nhóm mẫu · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'formulas', label: 'Công thức' },
      { id: 'verb-patterns', label: 'Mẫu động từ' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Viết lại câu,<br>giữ nghĩa <span class="marker">đổi cấu trúc</span>.',
      lead: 'Câu 37–40 luôn là viết lại câu. Trang này gom 8 nhóm mẫu lặp lại, công thức, mẫu động từ và 16 câu luyện tập — kèm 10 bẫy đề thường gặp.',
      stats: [
        { value: '8', label: 'nhóm mẫu' },
        { value: '10', label: 'bẫy đề' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ mẫu câu', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu viết lại', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'vocabulary',
    href: sitePath('vocabulary/'),
    navLabel: 'Từ vựng',
    title: 'Từ vựng & cụm từ',
    metaTitle: 'Từ vựng & cụm từ — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn từ vựng và cụm từ tiếng Anh lớp 9: 32 cụm thường gặp, cụm động từ (phrasal verbs), từ vựng theo chủ đề, mục từ điển phần VI, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '07 / VOCABULARY',
    badge: '32 cụm',
    accent: 'vocab',
    lead: 'Cụm từ cố định (collocations), cụm động từ (phrasal verbs), từ vựng theo chủ đề và cách đọc mục từ điển ở phần VI.',
    preview: ['make a decision', 'look after', 'renewable energy', 'eating habits'],
    highlights: [
      { text: '32 cụm từ cố định thường gặp, có bộ lọc' },
      { text: 'Cụm động từ và từ vựng 6 chủ đề thi' },
      { strong: 'Mục từ điển', text: ' và cách chọn cụm 2–3 từ' },
      { text: '10 bẫy đề và 16 câu luyện tập' }
    ],
    meta: '32 cụm · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'collocations', label: 'Cụm từ' },
      { id: 'topics', label: 'Chủ đề' },
      { id: 'dictionary', label: 'Từ điển' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Từ vựng,<br>học theo <span class="marker">cả cụm</span>.',
      lead: 'Đừng học từ đơn lẻ. Trang này gom cụm từ cố định (collocations), cụm động từ (phrasal verbs), từ vựng theo chủ đề và cách xử lý mục từ điển ở phần VI — kèm 16 câu luyện tập.',
      stats: [
        { value: '32', label: 'cụm từ cố định' },
        { value: '10', label: 'bẫy đề' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ từ vựng', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu luyện tập', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'cloze',
    href: sitePath('cloze/'),
    navLabel: 'Điền khuyết',
    title: 'Điền khuyết',
    metaTitle: 'Điền khuyết — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn điền khuyết tiếng Anh lớp 9: 5 loại chỗ trống, chiến lược đọc cả đoạn, bảng ngữ pháp và từ vựng, đoạn mẫu có giải thích, 10 bẫy đề và 12 câu luyện tập.',
    cardNo: '08 / CLOZE',
    badge: '5 loại chỗ trống',
    accent: 'cloze',
    lead: 'Ngữ pháp, từ vựng, cụm từ cố định, từ nối và từ thay thế: năm loại chỗ trống trong bài điền khuyết.',
    preview: ['however', 'depend on', 'much water', 'instead of'],
    highlights: [
      { text: 'Bản đồ 5 loại chỗ trống và cách nhận diện' },
      { text: 'Quy trình 4 bước đọc cả đoạn' },
      { strong: 'Bảng ngữ pháp', text: ' và manh mối từ vựng' },
      { text: 'Đoạn mẫu, 10 bẫy đề và 12 câu luyện tập' }
    ],
    meta: '5 loại chỗ trống · 12 câu hỏi',
    questionCount: 12,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'strategy', label: 'Chiến lược' },
      { id: 'grammar', label: 'Ngữ pháp' },
      { id: 'vocabulary', label: 'Từ vựng' },
      { id: 'sample', label: 'Đoạn mẫu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Điền khuyết,<br>đọc cả câu để <span class="marker">điền đúng</span>.',
      lead: 'Bài điền khuyết kiểm tra cả ngữ pháp lẫn từ vựng. Trang này gom 5 loại chỗ trống, quy trình 4 bước, bảng tra nhanh và 12 câu luyện tập — kèm 10 bẫy đề.',
      stats: [
        { value: '5', label: 'loại chỗ trống' },
        { value: '10', label: 'bẫy đề' },
        { value: '12', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ chỗ trống', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 12 câu điền khuyết', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'signs',
    href: sitePath('signs/'),
    navLabel: 'Biển báo',
    title: 'Biển báo & giao tiếp',
    metaTitle:
      'Biển báo & giao tiếp — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn biển báo, thông báo và giao tiếp tiếng Anh lớp 9: 4 nhóm biển báo, 20 mẫu thường gặp, 8 chức năng giao tiếp, 4 câu đề mẫu, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '09 / SIGNS',
    badge: '4 nhóm biển',
    accent: 'signs',
    lead: 'Bốn nhóm biển báo, 20 mẫu thông báo và 8 chức năng giao tiếp thường gặp ở đề thi.',
    preview: ['NO PARKING', 'FREE ENTRY', 'BOOKING REQUIRED', 'Would you mind…?'],
    highlights: [
      { text: 'Bản đồ 4 nhóm biển báo và cách nhận diện' },
      { text: '20 mẫu biển báo, thông báo kèm nghĩa' },
      { strong: '8 chức năng giao tiếp', text: ' với câu hỏi và cách đáp' },
      { text: '10 bẫy đề và 16 câu luyện tập' }
    ],
    meta: '4 nhóm biển · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'strategy', label: 'Chiến lược' },
      { id: 'signs', label: 'Biển báo' },
      { id: 'communication', label: 'Giao tiếp' },
      { id: 'sample', label: 'Đề mẫu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Biển báo &amp; giao tiếp,<br>đọc đúng <span class="marker">ý đề</span>.',
      lead: 'Hai câu biển báo và hai câu giao tiếp trong mỗi đề — trọn 1 điểm. Trang này gom 4 nhóm biển báo, 20 mẫu thông báo, 8 chức năng giao tiếp và 16 câu luyện tập — kèm 10 bẫy đề.',
      stats: [
        { value: '4', label: 'nhóm biển' },
        { value: '8', label: 'chức năng' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ biển báo', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu luyện tập', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'grammar',
    href: sitePath('grammar/'),
    navLabel: 'Ngữ pháp',
    title: 'Ngữ pháp cốt lõi',
    metaTitle: 'Ngữ pháp cốt lõi — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn ngữ pháp cốt lõi tiếng Anh lớp 9: từ nối, mệnh đề quan hệ, so sánh, cấu trúc động từ, câu ước (wish), câu hỏi đuôi, lượng từ, cấu trúc nhờ vả, 10 bẫy đề và 18 câu luyện tập.',
    cardNo: '10 / GRAMMAR',
    badge: '4 nhóm lõi',
    accent: 'grammar',
    lead: 'Từ nối, mệnh đề quan hệ, so sánh và cấu trúc động từ: bốn nhóm ngữ pháp lặp lại ở câu 5–12.',
    preview: ['however', 'who / which', 'more crowded', 'encourage sb to V'],
    highlights: [
      { text: 'Bản đồ 4 nhóm ngữ pháp lõi và cách nhận diện' },
      { text: 'Bảng từ nối, mệnh đề quan hệ và so sánh' },
      { strong: 'Cấu trúc động từ', text: ' cùng 4 điểm ngữ pháp phụ dễ lấy' },
      { text: '10 bẫy đề và 18 câu luyện tập' }
    ],
    meta: '4 nhóm lõi · 18 câu hỏi',
    questionCount: 18,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'connectors', label: 'Từ nối' },
      { id: 'relatives', label: 'Mệnh đề quan hệ' },
      { id: 'comparisons', label: 'So sánh' },
      { id: 'verb-patterns', label: 'Mẫu động từ' },
      { id: 'quick-points', label: 'Điểm phụ' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Ngữ pháp cốt lõi,<br>chọn đúng <span class="marker">cấu trúc</span>.',
      lead: 'Từ nối, mệnh đề quan hệ, so sánh và cấu trúc động từ chiếm phần lớn câu 5–12. Trang này gom bảng tra nhanh, mẫu câu, 10 bẫy đề và 18 câu luyện tập.',
      stats: [
        { value: '4', label: 'nhóm lõi' },
        { value: '4', label: 'điểm phụ' },
        { value: '18', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ ngữ pháp', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 18 câu luyện tập', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'sentence-construction',
    href: sitePath('sentence-construction/'),
    navLabel: 'Sắp xếp câu',
    title: 'Sắp xếp câu',
    metaTitle:
      'Sắp xếp câu — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Tờ ôn sắp xếp câu và phần VI tiếng Anh lớp 9: trật tự từ, cụm danh từ, trạng từ, 4 bước ghép câu, mục từ điển, 10 bẫy đề và 16 câu luyện tập có giải thích.',
    cardNo: '11 / PART VI',
    badge: '2 dạng phần VI',
    accent: 'sentence',
    lead: 'Sắp xếp từ thành câu và chọn cụm từ từ mục từ điển: hai dạng phần VI trong bốn đề.',
    preview: ['S + V + O', 'not only … but also', 'by presenting', 'break the habit'],
    highlights: [
      { text: 'Bản đồ 2 dạng phần VI và cách nhận diện' },
      { text: 'Trật tự từ, cụm danh từ, trạng từ và 4 mẫu câu' },
      { strong: 'Mục từ điển', text: ' và cách chọn cụm 2–3 từ' },
      { text: '10 bẫy đề và 16 câu luyện tập' }
    ],
    meta: '2 dạng phần VI · 16 câu hỏi',
    questionCount: 16,
    sections: [
      { id: 'map', label: 'Bản đồ' },
      { id: 'word-order', label: 'Trật tự câu' },
      { id: 'strategy', label: 'Chiến lược' },
      { id: 'dictionary', label: 'Từ điển' },
      { id: 'sample', label: 'Câu mẫu' },
      { id: 'traps', label: 'Bẫy đề' },
      { id: 'quiz', label: 'Luyện tập' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Sắp xếp câu,<br>ghép đúng <span class="marker">trật tự</span>.',
      lead: 'Phần VI chỉ có 2 câu nhưng dễ mất điểm vì trật tự từ và dạng cụm. Trang này gom quy tắc ghép câu, cách đọc mục từ điển, 10 bẫy đề và 16 câu luyện tập.',
      stats: [
        { value: '2', label: 'dạng phần VI' },
        { value: '4', label: 'bước ghép câu' },
        { value: '16', label: 'câu luyện tập' }
      ],
      actions: [
        { label: 'Xem bản đồ phần VI', href: '#map', variant: 'primary', icon: 'arrow' },
        { label: 'Làm 16 câu luyện tập', href: '#quiz', variant: 'ghost', icon: 'chevron' }
      ]
    }
  },
  {
    slug: 'mock-exam',
    href: sitePath('mock-exam/'),
    navLabel: 'Thi thử',
    title: 'Thi thử',
    metaTitle: 'Thi thử 24 câu — Tờ ôn thi lớp 9 | EngPrep',
    metaDescription:
      'Đề thi thử tiếng Anh lớp 9 24 câu, 45 phút: phát âm, ngữ pháp, giao tiếp, biển báo, điền khuyết, đọc hiểu, từ loại, phần VI và viết lại câu. Chấm điểm, thống kê kỹ năng và giải thích đáp án.',
    cardNo: '12 / MOCK EXAM',
    badge: '24 câu · 45 phút',
    accent: 'mock',
    lead: 'Đề trộn 24 câu, đủ 8 nhóm câu, có đồng hồ 45 phút, chấm điểm và thống kê điểm yếu.',
    preview: ['24 câu', '45 phút', '8 nhóm câu', 'chấm tự động'],
    highlights: [
      { text: 'Đề 8 nhóm câu bám cấu trúc thi thật' },
      { text: 'Đồng hồ 45 phút và thanh tiến độ' },
      { strong: 'Chấm điểm', text: ', thống kê theo kỹ năng' },
      { text: 'Xem lại câu sai kèm giải thích' }
    ],
    meta: '24 câu · 45 phút',
    questionCount: 24,
    sections: [
      { id: 'structure', label: 'Cấu trúc' },
      { id: 'strategy', label: 'Chiến lược' },
      { id: 'exam', label: 'Làm bài' }
    ],
    hero: {
      eyebrow: 'Global Success 9 · Ôn thi vào 10',
      titleHtml:
        'Thi thử 24 câu,<br>đủ <span class="marker">8 nhóm câu</span>.',
      lead: 'Đề rút gọn 45 phút, trộn đủ phát âm, ngữ pháp, giao tiếp, biển báo, điền khuyết, đọc hiểu, từ loại, phần VI và viết lại câu. Làm bài, chấm điểm và xem lại lỗi sai.',
      stats: [
        { value: '24', label: 'câu hỏi' },
        { value: '45', label: 'phút' },
        { value: '8', label: 'nhóm câu' }
      ],
      actions: [
        { label: 'Bắt đầu làm bài', href: '#exam', variant: 'primary', icon: 'arrow' },
        { label: 'Xem cấu trúc đề', href: '#structure', variant: 'ghost', icon: 'chevron' }
      ]
    }
  }
];

export function getSheet(slug: SheetSlug): Sheet {
  const sheet = sheets.find((item) => item.slug === slug);

  if (!sheet) {
    throw new Error(`Unknown sheet: ${slug}`);
  }

  return sheet;
}

export const totalQuestions = sheets.reduce(
  (total, sheet) => total + sheet.questionCount,
  0
);
