/**
 * Controleert de gebouwde site (dist/) op de SEO- en kwaliteitsregels van dit project.
 * Gebruik: npm run build && npm run controle   (stopt met een fout als er iets niet klopt)
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
if (!existsSync(dist)) throw new Error('Eerst npm run build uitvoeren.');

const paginas = [];
(function zoek(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) zoek(pad);
    else if (naam.endsWith('.html')) paginas.push(pad);
  }
})(dist);

const fouten = [];
const fout = (pagina, tekst) => fouten.push(`${pagina}: ${tekst}`);
const ontsnapt = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const bestaat = (href) => {
  const pad = decodeURI(href.split('#')[0].split('?')[0]);
  if (pad === '' ) return true;
  const doel = join(dist, pad);
  return existsSync(doel) && (statSync(doel).isFile() || existsSync(join(doel, 'index.html')));
};

for (const bestand of paginas) {
  const url = '/' + bestand.slice(dist.length + 1).replace(/index\.html$/, '');
  const html = readFileSync(bestand, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const titel = ontsnapt(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const beschrijving = ontsnapt(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!titel) fout(url, 'geen <title>');
  else if (titel.length > 60 && !noindex) fout(url, `title is ${titel.length} tekens (max. 60): ${titel}`);
  if (!noindex && (beschrijving.length < 110 || beschrijving.length > 160)) fout(url, `description is ${beschrijving.length} tekens (110 tot 160)`);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fout(url, `${h1} keer <h1> in plaats van 1`);
  if (!noindex && !/<link rel="canonical" href="https:\/\//.test(html)) fout(url, 'geen canonical');
  if (!/<html lang="nl-BE"/.test(html)) fout(url, 'lang="nl-BE" ontbreekt');

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { fout(url, 'ongeldige JSON-LD'); }
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(img)) fout(url, `afbeelding zonder alt: ${img.slice(0, 80)}`);
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api/') && !bestaat(href)) fout(url, `dode interne link: ${href}`);
    if (/example\.(be|com)|TODO|lorem/i.test(href)) fout(url, `voorlopige link: ${href}`);
  }
  for (const [, src] of html.matchAll(/\b(?:src|content)="(\/[^"]+\.(?:jpg|png|webp|svg|woff2))"/g)) {
    if (!bestaat(src)) fout(url, `ontbrekend bestand: ${src}`);
  }
  if (/\[(?:INVULLEN|TODO)\]|Lorem ipsum/i.test(html)) fout(url, 'voorlopige tekst gevonden');
}

// De sitemap mag alleen bestaande, indexeerbare pagina's bevatten.
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const pad = new URL(loc).pathname;
  if (!bestaat(pad)) fouten.push(`sitemap: ${pad} bestaat niet`);
}

if (fouten.length) {
  console.error(`${fouten.length} probleem/problemen:\n- ${fouten.join('\n- ')}`);
  process.exit(1);
}
console.log(`Alles in orde: ${paginas.length} pagina's gecontroleerd.`);
