// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/config.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  // Geen telemetrie of client-side router: pure statische HTML.
  devToolbar: { enabled: false },
});
