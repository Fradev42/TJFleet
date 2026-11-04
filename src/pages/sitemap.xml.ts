import type { APIRoute } from 'astro';
import { site } from '../config';
import { gidsen } from '../gidsen';

// Pagina's die in de sitemap komen. Bedankt- en 404-pagina horen er niet in.
const paginas = [
  '/', '/diensten/', '/diensten/reiniging-en-coating/', '/diensten/transport/', '/werkwijze/', '/werkgebied/',
  '/gids/', ...gidsen.map((g) => g.href), '/over-ons/', '/contact/', '/privacy/', '/cookiebeleid/',
];

// Bij gidsen komt de datum uit `bijgewerkt`; andere pagina's krijgen geen lastmod, liever dan een verkeerde.
const bronnen = import.meta.glob<string>('./gids/*.astro', { query: '?raw', import: 'default', eager: true });
const bijgewerkt: Record<string, string> = {};
for (const [pad, tekst] of Object.entries(bronnen)) {
  const datum = tekst.match(/bijgewerkt="(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (datum) bijgewerkt[`/gids/${pad.split('/').pop()!.replace('.astro', '')}/`] = datum;
}

export const GET: APIRoute = () => {
  const urls = paginas
    .map((p) => {
      const lastmod = bijgewerkt[p] ? `<lastmod>${bijgewerkt[p]}</lastmod>` : '';
      return `  <url><loc>${new URL(p, site.url).href}</loc>${lastmod}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
