# Site instructions

Session deck source lives in `../sessions/` and is built with
`../sessions/_kit/`. Do not add new deck source under `site/`.

Deployed session files are generated in `public/sessions/`:

```bash
cd ../sessions/_kit
npm run deploy -- ../midterm-unit1-3-v2
```

Then commit the changed files under `public/sessions/` in this repo.

For deck work, read `../sessions/_kit/AUTHORING.md` first. For site-only work,
run `npm run check` and `npm run build`.
