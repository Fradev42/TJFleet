/**
 * Controleert of de externe links (vooral de bronnen in de gidsen) nog werken.
 * Gebruik: npm run build && npm run links:extern
 * Sommige sites weigeren automatische aanvragen (403); kijk die links dan even met de hand na.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '..', 'dist');
if (!existsSync(dist)) throw new Error('Eerst npm run build uitvoeren.');
const links = new Map();
(function zoek(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) zoek(pad);
    else if (naam.endsWith('.html')) {
      const pagina = '/' + pad.slice(dist.length + 1).replace(/index\.html$/, '');
      for (const [, href] of readFileSync(pad, 'utf8').matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"]+)"/g)) {
        const url = href.replace(/&amp;/g, '&');
        if (url.includes('apexcollectioncare.be')) continue;
        links.set(url, [...(links.get(url) || []), pagina]);
      }
    }
  }
})(dist);

const kapot = [];
const twijfel = [];
await Promise.all([...links.keys()].map(async (url) => {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'Mozilla/5.0 (linkcontrole)' } });
    if (res.status === 404 || res.status === 410 || res.status >= 500) kapot.push(`${res.status} ${url} (op ${links.get(url).join(', ')})`);
    else if (res.status >= 400) twijfel.push(`${res.status} ${url}`);
  } catch (e) {
    twijfel.push(`geen antwoord ${url}`);
  }
}));

console.log(`${links.size} externe links gecontroleerd.`);
if (twijfel.length) console.log(`Met de hand nakijken:\n- ${twijfel.join('\n- ')}`);
if (kapot.length) { console.error(`Kapot:\n- ${kapot.join('\n- ')}`); process.exit(1); }
