# EngPrep

Bộ tờ ôn thi tiếng Anh lớp 9, xây bằng [Astro](https://astro.build/).

**Live:** https://gowwre.github.io/engprep/

## Chạy local

```bash
npm install
npm run dev
```

Mặc định Astro chạy ở `http://localhost:4321`.

## Build và preview

```bash
npm run check
npm run build
npm run preview
```

## Open Graph

Mỗi trang có metadata Open Graph/Twitter đầy đủ, canonical URL và JSON-LD. Ảnh chia sẻ 1200×630 cho trang chủ và từng tờ nằm trong `public/og/`.

Ảnh được render từ route nội bộ `/og/<slug>/` (có `noindex`) để giữ đúng font, màu accent và nội dung của từng tờ:

```bash
npm run og
```

Lệnh này build site, render lại toàn bộ 13 ảnh rồi ghi vào `public/og/`. Cần Chrome/Chromium; nếu có ImageMagick (`magick`), ảnh được render ở 2× rồi hạ về 1200×630.

## Deploy

Repo đã được cấu hình cho GitHub Pages tại `https://gowwre.github.io/engprep/`:

- `astro.config.mjs` đặt `site` và `base: '/engprep/'`
- Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ chạy `npm ci`, `npm run check`, `npm run build` và deploy `dist/` lên Pages
- Có thể chạy lại thủ công bằng `gh workflow run deploy.yml`

Khi đổi tên repo, dùng custom domain hoặc deploy ở một đường dẫn khác, cập nhật `site`/`base` trong `astro.config.mjs`. Các link nội bộ đã đi qua `src/lib/urls.ts` nên sẽ tự cập nhật theo `base`.

## Design system

Hướng thiết kế đã chốt được codify thành token và primitive dùng chung:

- `src/styles/tokens.css` — palette, semantic alias, accent role, type/space/radius/shadow/motion, dark và print.
- `src/styles/base.css` — reset, document, focus, container, skip link, reduced motion.
- `src/styles/ui.css` — nút, badge, chip, card, callout, map card, table, empty state.
- `src/lib/accents.ts` — mapping accent của 12 tờ, dùng chung cho header, trang chủ và OG.
- `DESIGN-SYSTEM.md` — quy ước đầy đủ.
- `/design-system/` — trang tham chiếu sống, `noindex`, xem token và component ở cả light/dark.

Khi thêm component hoặc tờ mới, dùng `data-accent` thay vì hard-code màu, và ưu tiên primitive trong `ui.css` trước khi viết CSS riêng.

## Cấu trúc

```text
src/
├── assets/fonts/          # font self-hosted (Be Vietnam Pro, Lora, Roboto Mono)
├── components/
│   ├── BrandMark.astro
│   ├── ClueCard.astro     # manh mối điền khuyết
│   ├── CommunicationCard.astro # chức năng giao tiếp
│   ├── EmptyState.astro   # trạng thái “không tìm thấy” của bộ lọc
│   ├── FigurePanel.astro  # khung sơ đồ / hình minh hoạ dùng chung
│   ├── FilterToolbar.astro # tabs + ô tìm kiếm + đếm kết quả
│   ├── MovementScene.astro # hình minh hoạ giới từ chuyển động
│   ├── PageNav.astro
│   ├── QuizPanel.astro    # khung quiz dùng chung cho mọi tờ
│   ├── SectionHead.astro  # kicker + tiêu đề + lead + aside
│   ├── SignalCard.astro   # dấu hiệu nhận biết → thì
│   ├── SiteFooter.astro
│   ├── SiteHeader.astro
│   ├── StepCard.astro     # thẻ bước làm bài có số thứ tự
│   ├── StudyStackVisual.astro # thẻ hero, sticky note và stamp
│   ├── TableShell.astro   # wrapper + caption + hint cho bảng
│   ├── TenseCard.astro    # thẻ công thức một thì
│   ├── TrapCard.astro     # câu sai / câu đúng / lý do
│   └── WordFamilyCard.astro # thẻ họ từ
├── data/
│   └── sheets.ts          # registry của tất cả tờ ôn thi
├── layouts/
│   ├── BaseLayout.astro   # head, theme, header/footer, shared JS
│   └── SheetLayout.astro  # hero + page nav cho một tờ
├── lib/
│   ├── accents.ts         # mapping accent cho header, home, OG
│   └── urls.ts            # helper link có hỗ trợ base
├── pages/
│   ├── og/
│   │   └── [slug].astro   # render ảnh Open Graph 1200×630
│   ├── design-system.astro # style guide sống (noindex)
│   └── <slug>.astro       # một page cho mỗi tờ
├── scripts/
│   ├── lib/
│   │   ├── filter.js      # filter + search dùng chung
│   │   └── quiz.js        # engine trắc nghiệm dùng chung
│   ├── generate-og.mjs    # render PNG vào public/og/
│   ├── site.js            # theme, menu, print, scrollspy
│   └── <slug>.js          # câu hỏi + cấu hình riêng của từng tờ
└── styles/
    ├── fonts.css          # @font-face
    ├── tokens.css         # design tokens + accent + dark/print
    ├── base.css           # reset, document, a11y, container
    ├── ui.css             # primitive dùng chung
    ├── figures.css        # khung figure, caption và legend dùng chung
    ├── global.css         # entry point: fonts + tokens + base + ui + styles + figures
    ├── styles.css         # layout, header/footer, hero, quiz shell, 12 thì
    ├── og.css             # style cho ảnh Open Graph
    ├── design-system.css  # layout riêng của trang style guide
    └── <slug>.css         # style riêng, chỉ load ở page tương ứng
```

Mỗi page import `global.css` trước rồi mới import CSS riêng của trang:

```astro
---
import '../styles/global.css';
import SheetLayout from '../layouts/SheetLayout.astro';
import QuizPanel from '../components/QuizPanel.astro';
import '../styles/<slug>.css';
---
```

Thứ tự này giữ cascade đúng và để mỗi route chỉ tải stylesheet nó cần. Trang chủ import thêm `home.css`; trang 12 thì dùng luôn phần tenses trong `styles.css`.

Class nào được dùng ở nhiều trang phải nằm trong `styles.css` hoặc `ui.css`, không đặt trong CSS riêng của một trang — nếu không các trang khác sẽ mất style sau khi tách CSS theo route. Primitive mới (nút, badge, card, callout, bảng, map card) đặt trong `ui.css`; token mới đặt trong `tokens.css`.

## Thêm một tờ ôn thi mới

1. Thêm slug mới vào union `SheetSlug`, rồi thêm một object vào `sheets` trong `src/data/sheets.ts`:
   - `slug`, `href` (dùng `sitePath('slug/')`)
   - tiêu đề, mô tả, badge, preview, highlights
   - `questionCount` phải khớp số câu trong script của trang
   - `sections` cho thanh điều hướng trong trang
   - `hero` cho phần mở đầu
   - `accent`: hiện có `tenses`, `prep`, `word`, `reading`, `sound`, `write`, `vocab`, `cloze`, `signs`, `grammar`, `sentence` và `mock`; thêm biến thể CSS nếu muốn màu mới
2. Tạo `src/pages/<slug>.astro`, import `global.css`, layout, các component dùng chung và CSS riêng như mẫu ở trên.
   - `SectionHead` cho tiêu đề từng section.
   - `StudyStackVisual` cho thẻ hero (truyền nội dung mặt trước qua slot).
   - `FilterToolbar` + `EmptyState` nếu section có bộ lọc.
   - `TableShell` cho bảng có caption và gợi ý kéo ngang.
   - `StepCard` cho các bước làm bài có số thứ tự.
   - `FigurePanel` cho sơ đồ, biểu đồ hoặc hình minh hoạ có caption.
   - `TrapCard` cho các cặp câu sai/câu đúng.
   - Các thẻ chuyên biệt: `TenseCard`, `WordFamilyCard`, `SignalCard`, `ClueCard`, `CommunicationCard`.
   - Lưới thẻ dùng `map-grid` + `map-card`; bảng dùng `TableShell` với `wrapperClass="table-shell"` và `tableClass="data-table <slug>-table"`.
   - Đặt `data-accent="<accent>"` ở khối cha để primitive tự lấy màu accent của tờ.
3. Dùng khung quiz chung trong section luyện tập:

```astro
<QuizPanel total={16} />
```

4. Tạo `src/scripts/<slug>.js` với mảng `questions` và gọi engine dùng chung. Không copy lại phần render/chấm điểm:

```js
import { initQuiz } from './lib/quiz.js';

const questions = [/* ... */];

initQuiz({
  questions,
  storageKey: 'engprep-<slug>-best',
  reviewLinks: [{ href: '#<section>', label: 'Ôn lại lý thuyết' }]
});
```

5. Nếu trang có bộ lọc/tìm kiếm, dùng `initFilter` từ `src/scripts/lib/filter.js` thay vì viết lại logic `hidden`, đếm kết quả và nút xoá.
6. Import script bằng thẻ `<script>` ở cuối page:

```astro
<script>
  import '../scripts/<slug>.js';
</script>
```

Header, footer, navigation và danh sách trên trang chủ tự động lấy từ registry, không cần sửa thủ công.
