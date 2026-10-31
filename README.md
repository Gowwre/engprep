# EngPrep

Bộ cheat sheet tiếng Anh lớp 9, xây bằng [Astro](https://astro.build/).

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

Deploy thư mục `dist/` lên hosting tĩnh (Netlify, Vercel, GitHub Pages, Cloudflare Pages...).

Nếu deploy dưới một đường dẫn con, đặt `base` trong `astro.config.mjs`; các link nội bộ đã đi qua `src/lib/urls.ts` nên sẽ tự cập nhật.

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
│   ├── index.astro
│   ├── prepositions.astro
│   └── tenses.astro
├── scripts/
│   ├── site.js            # theme, menu, print, scrollspy
│   ├── tenses.js          # filter, search, quiz của trang 12 thì
│   └── prepositions.js    # filter, quiz của trang giới từ
└── styles/
    ├── global.css         # entry point, import theo đúng thứ tự
    ├── home.css
    ├── prepositions.css
    └── styles.css
```

## Thêm một cheat sheet mới

1. Thêm slug mới vào union `SheetSlug`, rồi thêm một object vào `sheets` trong `src/data/sheets.ts`:
   - `slug`, `href` (dùng `sitePath('slug/')`)
   - tiêu đề, mô tả, badge, preview, highlights
   - `sections` cho thanh điều hướng trong trang
   - `hero` cho phần mở đầu
   - `accent`: hiện có `tenses` và `prep`; thêm biến thể CSS nếu muốn màu mới
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
