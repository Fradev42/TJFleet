import type { APIRoute } from 'astro';
import { site } from '../config';
import { gidsen } from '../gidsen';

// Pagina's die in de sitemap komen. Bedankt- en 404-pagina horen er niet in.
const paginas = ['/', '/diensten/', '/werkwijze/', '/werkgebied/', '/gids/', ...gidsen.map((g) => g.href), '/over-ons/', '/contact/', '/privacy/'];

export const GET: APIRoute = () => {
  const vandaag = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map((p) => `  <url><loc>${new URL(p, site.url).href}</loc><lastmod>${vandaag}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
