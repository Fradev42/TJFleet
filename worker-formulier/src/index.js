/**
 * Cloudflare Worker voor het contactformulier van APEX Collection Care.
 * Ontvangt het formulier, controleert het en stuurt het als e-mail naar uw eigen mailbox
 * via Cloudflare Email Routing. De inhoud wordt niet opgeslagen en niet gelogd.
 */
import { EmailMessage } from 'cloudflare:email';
import { leesFormulier, controleer, isSpam, bouwEmail } from './logica.js';

const toegelatenHerkomst = (env) => env.TOEGELATEN_HERKOMST.split(',').map((s) => s.trim());

function corsKoppen(request, env) {
  const herkomst = request.headers.get('Origin') || '';
  if (!toegelatenHerkomst(env).includes(herkomst)) return {};
  return { 'Access-Control-Allow-Origin': herkomst, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Accept, Content-Type', Vary: 'Origin' };
}

function antwoord(request, env, ok, status = ok ? 200 : 400) {
  const wilJson = (request.headers.get('Accept') || '').includes('application/json');
  if (wilJson) {
    return new Response(JSON.stringify({ ok }), { status, headers: { 'Content-Type': 'application/json', ...corsKoppen(request, env) } });
  }
  // Zonder JavaScript: terug naar de site (bedankpagina of contactpagina).
  return Response.redirect(ok ? env.BEDANKT_URL : env.FOUT_URL, 303);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsKoppen(request, env) });
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

    const herkomst = request.headers.get('Origin');
    if (herkomst && !toegelatenHerkomst(env).includes(herkomst)) return new Response('Forbidden', { status: 403 });

    let gegevens;
    try {
      gegevens = leesFormulier(await request.formData());
    } catch {
      return antwoord(request, env, false);
    }
    // Spam: doe alsof alles goed ging, maar verstuur niets.
    if (isSpam(gegevens)) return antwoord(request, env, true);
    if (controleer(gegevens).length) return antwoord(request, env, false);

    try {
      const raw = bouwEmail({ van: env.AFZENDER, naar: env.BESTEMMING, gegevens });
      await env.MAIL.send(new EmailMessage(env.AFZENDER, env.BESTEMMING, raw));
      return antwoord(request, env, true);
    } catch (fout) {
      console.error('Versturen mislukt:', fout instanceof Error ? fout.message : 'onbekend'); // nooit de formulierinhoud loggen
      return antwoord(request, env, false, 502);
    }
  },
};
