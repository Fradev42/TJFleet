import type { APIRoute } from 'astro';
import { site } from '../config';

// Geen Disallow voor /contact/bedankt/: die pagina heeft al <meta name="robots" content="noindex">,
// en Google moet ze kunnen ophalen om die noindex te lezen.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
