import { defineConfig } from 'astro/config';
import searchIntegration from './scripts/search-integration.mjs';

export default defineConfig({
  site: 'https://gowwre.github.io',
  base: '/engprep/',
  integrations: [searchIntegration()],
  build: {
    format: 'directory'
  }
});
