/**
 * Cloudflare Pages Function: POST /api/kennismaking
 *
 * Ontvangt het kennismakingsformulier, controleert het en stuurt het als e-mail door.
 * De inhoud wordt niet opgeslagen en niet gelogd.
 *
 * Instellingen (Cloudflare Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY   (secret)  API-sleutel van de e-maildienst (Resend, https://resend.com)
 *   MAIL_FROM                  afzender op een geverifieerd domein, bv. "Website APEX <website@apexcollectioncare.be>"
 *   MAIL_TO                    ontvanger, standaard info@apexcollectioncare.be
 *   MAIL_BEVESTIGING = "1"     ook een korte bevestiging sturen naar de aanvrager, als die een e-mailadres opgaf
 *   MAIL_DRYRUN = "1"          alleen voor lokaal testen: niets versturen, wel "gelukt" antwoorden
 */
import { leesFormulier, controleer, isSpam, bouwEmail, bouwBevestiging, FOUTMELDINGEN } from '../../src/lib/formulier-logica.js';

const BEDANKT = '/contact/bedankt/';
const TELEFOON = '+32 473 76 09 09';
const TEL_LINK = 'tel:+32473760909';
const STANDAARD_ONTVANGER = 'info@apexcollectioncare.be';

const wilJson = (request) => (request.headers.get('Accept') || '').includes('application/json');

/** Eenvoudige foutpagina voor bezoekers zonder JavaScript. */
function foutPagina(titel, items, status) {
  const lijst = items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '';
  const html = `<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${titel} | APEX Collection Care</title>
<style>body{font:1.125rem/1.6 system-ui,sans-serif;color:#1e1e1e;background:#f7f4ee;margin:0;padding:2rem 1.25rem}main{max-width:38rem;margin:0 auto}
h1{font-family:Georgia,serif;font-weight:400;color:#1f3a2e}a{color:#1f3a2e}.knop{display:inline-block;margin-top:1rem;padding:.8rem 1.4rem;border:2px solid #1f3a2e;border-radius:4px;font-weight:600;text-decoration:none}</style></head>
<body><main><h1>${titel}</h1>${lijst}
<p>Ga terug naar het formulier om het aan te passen, of bel ons gerust op <a href="${TEL_LINK}">${TELEFOON}</a>.</p>
<p><a class="knop" href="/contact/#formulier" onclick="history.back();return false;">Terug naar het formulier</a></p></main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

function antwoord(request, { ok, fouten = [], status }) {
  if (wilJson(request)) {
    return new Response(JSON.stringify({ ok, fouten }), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  }
  if (ok) return Response.redirect(new URL(BEDANKT, request.url).href, 303);
  if (fouten.length) return foutPagina('Enkele velden kloppen nog niet', fouten.map((v) => FOUTMELDINGEN[v] || v), status);
  return foutPagina('Het verzenden is niet gelukt', [], status);
}

async function stuurMail(env, bericht) {
  if (env.MAIL_DRYRUN === '1') return;
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) throw new Error('e-maildienst niet ingesteld');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.MAIL_FROM, ...bericht }),
  });
  if (!res.ok) throw new Error(`e-maildienst antwoordde ${res.status}`);
}

const verstuur = (env, mail) => stuurMail(env, {
  to: [env.MAIL_TO || STANDAARD_ONTVANGER],
  subject: mail.onderwerp,
  text: mail.tekst,
  ...(mail.antwoordAan ? { reply_to: mail.antwoordAan } : {}),
});

/** Bevestiging naar de aanvrager; een fout hierbij laat de aanvraag zelf niet mislukken. */
async function bevestig(env, gegevens) {
  if (env.MAIL_BEVESTIGING !== '1') return;
  const b = bouwBevestiging(gegevens, { naam: 'APEX Collection Care', telefoon: TELEFOON, email: env.MAIL_TO || STANDAARD_ONTVANGER });
  if (!b) return;
  try {
    await stuurMail(env, { to: [b.aan], subject: b.onderwerp, text: b.tekst, reply_to: env.MAIL_TO || STANDAARD_ONTVANGER });
  } catch (fout) {
    console.error('Bevestiging niet verstuurd:', fout instanceof Error ? fout.message : 'onbekend');
  }
}

export async function onRequestPost({ request, env }) {
  // Enkel aanvragen van de eigen site aanvaarden.
  const herkomst = request.headers.get('Origin');
  if (herkomst && herkomst !== new URL(request.url).origin) return new Response('Forbidden', { status: 403 });

  let gegevens;
  try {
    gegevens = leesFormulier(await request.formData());
  } catch {
    return antwoord(request, { ok: false, status: 400 });
  }
  // Spam: doe alsof het gelukt is, maar verstuur niets.
  if (isSpam(gegevens)) return antwoord(request, { ok: true, status: 200 });

  const fouten = controleer(gegevens);
  if (fouten.length) return antwoord(request, { ok: false, fouten, status: 400 });

  try {
    await verstuur(env, bouwEmail(gegevens));
    await bevestig(env, gegevens);
    return antwoord(request, { ok: true, status: 200 });
  } catch (fout) {
    // Nooit de inhoud van het formulier loggen, enkel de technische oorzaak.
    console.error('Kennismaking niet verstuurd:', fout instanceof Error ? fout.message : 'onbekend');
    return antwoord(request, { ok: false, status: 502 });
  }
}

export const onRequest = () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
