/**
 * Pure logica van het contactformulier: inlezen, controleren en de e-mail opbouwen.
 * Bevat geen Cloudflare-specifieke code, zodat ze los getest kan worden.
 */

export const VELDEN = {
  naam: 'Naam',
  telefoon: 'Telefoonnummer',
  email: 'E-mailadres',
  aantal_wagens: 'Aantal wagens',
  voorkeursmoment: 'Wanneer bellen we best',
  boodschap: 'Boodschap',
};

const MAX = { naam: 120, telefoon: 40, email: 160, aantal_wagens: 10, voorkeursmoment: 20, boodschap: 3000 };
const TOEGELATEN = {
  aantal_wagens: ['', '1-3', '4-9', '10+'],
  voorkeursmoment: ['', 'voormiddag', 'namiddag', 'zaterdag'],
};

/** Zet FormData om naar een gewoon object met ingekorte, opgeschoonde tekst. */
export function leesFormulier(formData) {
  const gegevens = {};
  for (const veld of Object.keys(VELDEN)) {
    const waarde = formData.get(veld);
    let tekst = typeof waarde === 'string' ? waarde.replace(/\r\n?/g, '\n') : '';
    // Enkel de boodschap mag uit meerdere regels bestaan.
    if (veld !== 'boodschap') tekst = tekst.replace(/\n+/g, ' ');
    gegevens[veld] = tekst.trim().slice(0, MAX[veld]);
  }
  gegevens._gotcha = typeof formData.get('_gotcha') === 'string' ? formData.get('_gotcha') : '';
  return gegevens;
}

/** Geeft een lijst met fouten terug; leeg betekent in orde. */
export function controleer(g) {
  const fouten = [];
  if (!g.naam) fouten.push('naam');
  if (!/^[0-9+()./\s-]{6,40}$/.test(g.telefoon)) fouten.push('telefoon');
  if (g.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g.email)) fouten.push('email');
  for (const [veld, lijst] of Object.entries(TOEGELATEN)) {
    if (!lijst.includes(g[veld])) fouten.push(veld);
  }
  return fouten;
}

/** Spam: het onzichtbare veld is ingevuld. */
export const isSpam = (g) => g._gotcha.trim() !== '';

const b64 = (tekst) => btoa(String.fromCharCode(...new TextEncoder().encode(tekst)));
const kopTekst = (tekst) => `=?UTF-8?B?${b64(tekst)}?=`;
/** Verwijdert regeleinden uit waarden die in een e-mailkop terechtkomen. */
const veiligeKop = (tekst) => tekst.replace(/[\r\n]+/g, ' ');

/** Bouwt een eenvoudige MIME-e-mail (platte tekst, UTF-8). */
export function bouwEmail({ van, naar, gegevens, nu = new Date(), id = crypto.randomUUID() }) {
  const regels = Object.entries(VELDEN)
    .map(([veld, label]) => `${label}: ${gegevens[veld] || '-'}`)
    .join('\n');
  const tekst = `Nieuwe aanvraag via het contactformulier op de website.\n\n${regels}\n`;
  const onderwerp = `Nieuwe aanvraag: ${veiligeKop(gegevens.naam)}`;
  const domein = van.split('@')[1] || 'localhost';
  const koppen = [
    `From: ${kopTekst('Website APEX')} <${van}>`,
    `To: <${naar}>`,
    gegevens.email ? `Reply-To: <${veiligeKop(gegevens.email)}>` : null,
    `Subject: ${kopTekst(onderwerp)}`,
    `Date: ${nu.toUTCString()}`,
    `Message-ID: <${id}@${domein}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].filter(Boolean);
  const lichaam = b64(tekst).replace(/.{1,76}/g, '$&\r\n');
  return `${koppen.join('\r\n')}\r\n\r\n${lichaam}`;
}
