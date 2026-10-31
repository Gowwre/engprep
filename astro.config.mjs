import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gowwre.github.io',
  base: '/engprep/',
  build: {
    format: 'directory'
  }
});
