/**
 * Maakt per gids en dienstpagina een deelafbeelding (1200 × 630) in public/og/<slug>.jpg,
 * met de titel van de pagina. Een eigen foto in src/assets/paginafotos/ gaat altijd voor.
 *
 * Gebruik: npm run build && npm run og && npm run build
 * (de tweede build neemt de nieuwe kaarten op in de meta-tags).
 */
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Playwright hoeft geen projectafhankelijkheid te zijn: lokaal eenmalig `npm i -g playwright && npx playwright install chromium`.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
if (!existsSync(dist)) throw new Error('Eerst npm run build uitvoeren.');
mkdirSync(join(root, 'public', 'og'), { recursive: true });

const paginas = [];
for (const [map, label] of [['gids', 'Gids'], ['diensten', 'Dienst']]) {
  for (const slug of readdirSync(join(dist, map), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    const html = readFileSync(join(dist, map, slug, 'index.html'), 'utf8');
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '').trim();
    if (h1) paginas.push({ slug, label, titel: h1 });
  }
}

// Als data-URL, want een pagina uit setContent mag geen file://-lettertypes laden.
const font = (f) => `data:font/woff2;base64,${readFileSync(join(root, 'node_modules', f)).toString('base64')}`;
const logo = readFileSync(join(root, 'public', 'logo', 'logo.svg'), 'utf8');
const ontsnap = (s) => s.replace(/&(?!\w+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const p of paginas) {
  await page.setContent(`<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><style>
    @font-face { font-family: Caslon; src: url(${font('@fontsource/libre-caslon-text/files/libre-caslon-text-latin-400-normal.woff2')}); }
    @font-face { font-family: Sans; src: url(${font('@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2')}); font-weight: 200 900; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: #F7F4EE; color: #1E1E1E; font-family: Sans; display: flex; flex-direction: column; justify-content: space-between; padding: 64px 80px 0; position: relative; }
    .logo svg { height: 36px; width: auto; display: block; }
    .label { font-size: 26px; font-weight: 650; letter-spacing: .08em; text-transform: uppercase; color: #6B1E24; margin-bottom: 18px; }
    h1 { font-family: Caslon; font-weight: 400; font-size: 66px; line-height: 1.12; color: #1F3A2E; max-width: 1000px; hyphens: manual; }
    h1.lang { font-size: 56px; }
    .band { height: 28px; margin: 0 -80px; background: #1F3A2E; border-top: 6px solid #6B1E24; }
    .lijn { height: 1px; background: #D9D3C7; margin-bottom: 40px; }
  </style></head><body>
    <div class="logo">${logo}</div>
    <div><div class="label">${p.label}</div><h1 class="${p.titel.length > 48 ? 'lang' : ''}">${ontsnap(p.titel)}</h1></div>
    <div><div class="lijn"></div><div class="band"></div></div>
  </body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const passend = await page.evaluate(() => document.body.scrollHeight <= 630);
  if (!passend) console.warn(`Te lange titel voor ${p.slug}`);
  await page.screenshot({ path: join(root, 'public', 'og', `${p.slug}.jpg`), type: 'jpeg', quality: 86 });
  console.log(`og/${p.slug}.jpg`);
}
await browser.close();
