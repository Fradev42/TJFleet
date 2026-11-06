/**
 * Maakt de algemene deelafbeelding (src/assets/og-image.jpg en een kopie in public/og-image.jpg, 1200 × 630) en het app-icoon
 * (public/apple-touch-icon.png, 180 × 180) opnieuw uit de logobestanden in public/logo/.
 * Gebruik: npm run merkbeelden   (daarna eventueel npm run build && npm run og voor de titelkaarten)
 */
import { createRequire } from 'node:module';
import { readFileSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const { chromium } = createRequire(import.meta.url)('playwright');
const root = resolve(import.meta.dirname, '..');
const svg = (naam) => readFileSync(join(root, 'public', 'logo', naam), 'utf8');
const font = (f) => `data:font/woff2;base64,${readFileSync(join(root, 'node_modules', f)).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Caslon; src: url(${font('@fontsource/libre-caslon-text/files/libre-caslon-text-latin-400-normal.woff2')}); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #F7F4EE; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 60px; position: relative; }
  .logo svg { width: 520px; height: auto; display: block; }
  p { font-family: Caslon; font-size: 34px; color: #1E1E1E; letter-spacing: .01em; }
  p span { color: #6B1E24; padding: 0 .45em; }
  .band { position: absolute; left: 0; right: 0; bottom: 0; height: 28px; background: #1F3A2E; border-top: 6px solid #6B1E24; }
</style></head><body>
  <div class="logo">${svg('apex-2-gestapeld-kleur.svg')}</div>
  <p>Oldtimers<span>·</span>Youngtimers<span>·</span>Exclusieve wagens</p>
  <div class="band"></div>
</body></html>`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, 'src', 'assets', 'og-image.jpg'), type: 'jpeg', quality: 88 });
copyFileSync(join(root, 'src', 'assets', 'og-image.jpg'), join(root, 'public', 'og-image.jpg'));

// App-icoon: volledig vlak (iOS rondt de hoeken zelf af), monogram in crème op racegroen.
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#1F3A2E;display:flex;align-items:center;justify-content:center">
  <div style="width:150px;height:150px">${svg('apex-3-monogram-creme.svg').replace('<svg ', '<svg width="150" height="150" ')}</div></body></html>`);
await page.screenshot({ path: join(root, 'public', 'apple-touch-icon.png') });
await browser.close();
console.log('og-image.jpg en apple-touch-icon.png gemaakt');
