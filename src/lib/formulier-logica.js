/**
 * Logica van het kennismakingsformulier, gedeeld door de Cloudflare Pages Function
 * (functions/api/kennismaking.js) en de tests (tests/formulier.test.mjs).
 * Geen Cloudflare- of Astro-specifieke code: puur inlezen, controleren en de e-mailtekst opbouwen.
 */

export const VELDEN = {
  naam: 'Naam',
  telefoon: 'Telefoonnummer',
  email: 'E-mailadres',
  aantal_wagens: 'Aantal wagens',
  voorkeursmoment: 'Beste belmoment',
  boodschap: 'Boodschap',
};

/** Foutmeldingen zoals de bezoeker ze te zien krijgt. */
export const FOUTMELDINGEN = {
  naam: 'Vul uw naam in.',
  telefoon: 'Vul een telefoonnummer in waarop we u kunnen bereiken, bijvoorbeeld 0470 12 34 56.',
  email: 'Dit e-mailadres lijkt niet te kloppen. Laat het veld leeg als u liever geen e-mailadres opgeeft.',
  aantal_wagens: 'Kies een van de mogelijkheden in de lijst.',
  voorkeursmoment: 'Kies een van de mogelijkheden in de lijst.',
};

const MAX = { naam: 120, telefoon: 40, email: 160, aantal_wagens: 10, voorkeursmoment: 20, boodschap: 3000 };
export const KEUZES = {
  aantal_wagens: ['', '1-3', '4-9', '10+'],
  voorkeursmoment: ['', 'voormiddag', 'namiddag', 'zaterdag'],
};

/** Zet FormData om naar een gewoon object met opgeschoonde, ingekorte tekst. */
export function leesFormulier(formData) {
  const gegevens = {};
  for (const veld of Object.keys(VELDEN)) {
    const waarde = formData.get(veld);
    let tekst = typeof waarde === 'string' ? waarde.replace(/\r\n?/g, '\n') : '';
    // Enkel de boodschap mag uit meerdere regels bestaan.
    if (veld !== 'boodschap') tekst = tekst.replace(/\n+/g, ' ');
    gegevens[veld] = tekst.trim().slice(0, MAX[veld]);
  }
  const lokaas = formData.get('website');
  gegevens._lokaas = typeof lokaas === 'string' ? lokaas : '';
  return gegevens;
}

export const telefoonGeldig = (t) => /^[0-9+()./\s-]{8,40}$/.test(t) && (t.match(/\d/g) || []).length >= 8;
export const emailGeldig = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/** Geeft de namen van de velden met een fout terug; leeg = in orde. */
export function controleer(g) {
  const fouten = [];
  if (!g.naam) fouten.push('naam');
  if (!telefoonGeldig(g.telefoon)) fouten.push('telefoon');
  if (g.email && !emailGeldig(g.email)) fouten.push('email');
  for (const [veld, lijst] of Object.entries(KEUZES)) if (!lijst.includes(g[veld])) fouten.push(veld);
  return fouten;
}

/** Spam: het onzichtbare lokaasveld is ingevuld. */
export const isSpam = (g) => g._lokaas.trim() !== '';

const eenRegel = (t) => t.replace(/[\r\n]+/g, ' ');

/** Bouwt onderwerp en tekst van de e-mail. */
export function bouwEmail(g) {
  const regels = Object.entries(VELDEN).map(([veld, label]) => `${label}: ${g[veld] || '-'}`).join('\n');
  return {
    onderwerp: eenRegel(`Kennismaking aangevraagd: ${g.naam}`),
    tekst: `Nieuwe aanvraag via het formulier op de website.\n\n${regels}\n`,
    antwoordAan: g.email ? eenRegel(g.email) : undefined,
  };
}

/**
 * Bevestiging voor de aanvrager. Bewust zonder de ingevulde naam of boodschap:
 * zo kan het formulier niet misbruikt worden om eigen tekst naar een vreemd adres te sturen.
 */
export function bouwBevestiging(g, { naam, telefoon, email }) {
  if (!g.email || !emailGeldig(g.email)) return undefined;
  return {
    aan: eenRegel(g.email),
    onderwerp: `Uw aanvraag bij ${naam} is goed ontvangen`,
    tekst: [
      'Goedendag,',
      '',
      `Hartelijk dank voor uw aanvraag via de website van ${naam}. We hebben ze goed ontvangen en bellen u binnen één werkdag terug.`,
      '',
      `Liever meteen iemand spreken? Bel ons op ${telefoon}.`,
      '',
      'Hebt u deze aanvraag niet zelf gedaan? Dan mag u deze e-mail negeren. We bewaren uw gegevens niet langer dan nodig.',
      '',
      'Met vriendelijke groeten,',
      naam,
      email,
      '',
    ].join('\n'),
  };
}
