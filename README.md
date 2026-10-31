# EngPrep

Bộ cheat sheet tiếng Anh lớp 9, xây bằng [Astro](https://astro.build/).

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

## Deploy

Repo đã được cấu hình cho GitHub Pages tại `https://gowwre.github.io/engprep/`:

- `astro.config.mjs` đặt `site` và `base: '/engprep/'`
- Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ chạy `npm ci`, `npm run check`, `npm run build` và deploy `dist/` lên Pages
- Có thể chạy lại thủ công bằng `gh workflow run deploy.yml`

Khi đổi tên repo, dùng custom domain hoặc deploy ở một đường dẫn khác, cập nhật `site`/`base` trong `astro.config.mjs`. Các link nội bộ đã đi qua `src/lib/urls.ts` nên sẽ tự cập nhật theo `base`.

## Cấu trúc

```text
src/
├── components/
│   ├── PageNav.astro
│   ├── SiteFooter.astro
│   └── SiteHeader.astro
├── data/
│   └── sheets.ts          # registry của tất cả cheat sheet
├── layouts/
│   ├── BaseLayout.astro   # head, theme, header/footer, shared JS
│   └── SheetLayout.astro  # hero + page nav cho một cheat sheet
├── lib/
│   └── urls.ts            # helper link có hỗ trợ base
├── pages/
│   ├── cloze.astro
│   ├── grammar.astro
│   ├── index.astro
│   ├── prepositions.astro
│   ├── pronunciation.astro
│   ├── reading.astro
│   ├── sentence-construction.astro
│   ├── sentence-transformation.astro
│   ├── signs.astro
│   ├── tenses.astro
│   ├── vocabulary.astro
│   └── word-forms.astro
├── scripts/
│   ├── site.js            # theme, menu, print, scrollspy
│   ├── tenses.js          # filter, search, quiz của trang 12 thì
│   ├── prepositions.js    # filter, quiz của trang giới từ
│   ├── word-forms.js      # filter, search, quiz của trang word forms
│   ├── reading.js         # filter, quiz của trang đọc hiểu
│   ├── pronunciation.js   # quiz của trang phát âm, trọng âm
│   ├── sentence-transformation.js # quiz của trang viết lại câu
│   ├── vocabulary.js      # filter, quiz của trang từ vựng
│   ├── cloze.js           # quiz của trang điền khuyết
│   ├── signs.js           # quiz của trang biển báo, giao tiếp
│   ├── grammar.js         # quiz của trang ngữ pháp cốt lõi
│   └── sentence-construction.js # quiz của trang sắp xếp câu, Part VI
└── styles/
    ├── cloze.css
    ├── global.css         # entry point, import theo đúng thứ tự
    ├── grammar.css
    ├── home.css
    ├── prepositions.css
    ├── pronunciation.css
    ├── reading.css
    ├── sentence-construction.css
    ├── sentence-transformation.css
    ├── signs.css
    ├── styles.css
    ├── vocabulary.css
    └── word-forms.css
```

## Thêm một cheat sheet mới

1. Thêm slug mới vào union `SheetSlug`, rồi thêm một object vào `sheets` trong `src/data/sheets.ts`:
   - `slug`, `href` (dùng `sitePath('slug/')`)
   - tiêu đề, mô tả, badge, preview, highlights
   - `sections` cho thanh điều hướng trong trang
   - `hero` cho phần mở đầu
   - `accent`: hiện có `tenses`, `prep`, `word`, `reading`, `sound`, `write`, `vocab`, `cloze`, `signs`, `grammar` và `sentence`; thêm biến thể CSS nếu muốn màu mới
2. Tạo `src/pages/<slug>.astro`:

```astro
---
import SheetLayout from '../layouts/SheetLayout.astro';
---

<SheetLayout slug="<slug>">
  <Fragment slot="visual">
    <!-- thẻ minh hoạ riêng của trang -->
  </Fragment>

  <!-- nội dung các section -->
</SheetLayout>

<script>
  import '../scripts/<slug>.js';
</script>
```

3. Nếu có CSS riêng, thêm file vào `src/styles/` và import trong `src/styles/global.css` (sau `styles.css`).
4. Nếu có tương tác riêng, thêm file vào `src/scripts/` và import bằng thẻ `<script>` của trang.

Header, footer, navigation và danh sách trên trang chủ tự động lấy từ registry, không cần sửa thủ công.
