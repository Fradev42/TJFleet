/**
 * ─────────────────────────────────────────────────────────────
 *  ALLE BEDRIJFSGEGEVENS STAAN HIER.
 *  Pas dit bestand aan; de rest van de site leest het automatisch.
 *  Wat er nog moet gebeuren voor de livegang: zie TODO-LIVEGANG.md.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Naam van de dienst, zoals ze overal op de site verschijnt. */
  naam: 'APEX Collection Care',

  /**
   * Tekst van het logo, voor schermlezers en zoekmachines.
   * Het logo zelf staat in public/logo/logo.svg (kop en footer).
   */
  logoAlt: 'APEX Collection Care',

  /** Korte ondertitel bij de naam (logo-regel in de kop). */
  baseline: 'Beheer en verzorging van klassieke en exclusieve wagens',

  /**
   * Basis-URL van de website, zonder slash op het einde. DE ENIGE PLEK waar het domein staat:
   * canonicals, Open Graph, sitemap, robots.txt en JSON-LD worden hieruit opgebouwd
   * (astro.config.mjs leest deze waarde als `site`).
   */
  url: 'https://www.apexcollectioncare.be',

  telefoon: {
    /** Zoals het nummer getoond wordt. */
    weergave: '0473 76 09 09',
    /** Internationaal formaat zonder spaties, voor de tel:-link. Bv. '+3292345678'. */
    link: '+32473760909',
  },

  email: 'info@apexcollectioncare.be',

  /**
   * Vestigingen zoals ze op de site getoond worden (zonder straat en huisnummer).
   */
  vestigingen: [
    { gemeente: 'Zwijnaarde', postcode: '9052', provincie: 'Oost-Vlaanderen' },
    { gemeente: 'Sint-Eloois-Winkel', postcode: '8880', provincie: 'West-Vlaanderen' },
  ],

  /**
   * Volledig adres van de maatschappelijke zetel (wettelijke vermelding, WER):
   * getoond in de footer, op /contact/ en in de privacyverklaring.
   */
  adres: {
    straat: 'Eedstraat 42A',
    postcode: '9052',
    gemeente: 'Zwijnaarde',
    land: 'België',
    /** Landcode voor schema.org. */
    landCode: 'BE',
  },

  /** Juridische naam van de onderneming, getoond bij het adres en het ondernemingsnummer. */
  juridischeNaam: 'Frades BV',

  /** Ondernemingsnummer, bv. 'BE 0123.456.789'. */
  btwNummer: 'BE 1022.876.282',

  /** Openingsuren voor schema.org (zaterdag op afspraak hoort hier bewust niet bij). */
  openingsuren: { dagen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], van: '09:00', tot: '18:00' },

  /** Bereikbaarheid, getoond op de contactpagina. */
  bereikbaarheid: [
    'Klanten: altijd bereikbaar via hun vaste aanspreekpunt',
    'Nieuwe aanvragen: maandag tot vrijdag van 9 tot 18 uur',
    'Zaterdag op afspraak',
    'Afspraken bij u thuis of in uw stalling, in heel Oost- en West-Vlaanderen',
  ],

  /** Werkgebied, voor de tekst en voor schema.org. */
  regio: ['Oost-Vlaanderen', 'West-Vlaanderen'],
  /** Werkgebied zoals het in lopende tekst verschijnt. */
  regioTekst: 'Oost- en West-Vlaanderen',
} as const;

/**
 * Contactformulier (kennismaking aanvragen) op /contact/.
 * Het formulier post naar een Cloudflare Pages Function (functions/api/kennismaking.js),
 * die de aanvraag als e-mail doorstuurt. Instellen: zie TODO-LIVEGANG.md.
 *  - actief: false  → geen formulier, enkel een uitnodiging om te bellen of te mailen.
 */
export const formulier = {
  actief: true,
  /** Adres van de Pages Function (zelfde domein als de site). */
  actie: '/api/kennismaking',
  /** Pagina waarop de bezoeker belandt na verzenden. */
  bedanktPagina: '/contact/bedankt/',
};

/**
 * Statistieken via Plausible (zonder cookies). Standaard UIT.
 * Zet `ingeschakeld` op true en vul uw domein in om het te activeren.
 */
export const plausible = {
  ingeschakeld: false,
  /** Afgeleid van site.url; hier niets invullen. */
  domein: new URL(site.url).hostname.replace(/^www\./, ''),
  script: 'https://plausible.io/js/script.js',
};

/**
 * Team, getoond op de pagina Over ons.
 * Foto's: src/assets/images/persoon-1.jpg en persoon-2.jpg (zelfde volgorde als hieronder).
 */
export const team = [
  {
    naam: 'Thomas Vancoillie',
    rol: 'Medeoprichter',
    linkedin: 'https://www.linkedin.com/in/thomas-vancoillie-a189903b1/',
  },
  {
    naam: 'Jasper Descamps',
    rol: 'Medeoprichter',
    linkedin: 'https://www.linkedin.com/in/jasper-descamps/',
  },
] as const;

/**
 * Getuigenissen op Home. LEEG = het blok "Een eigenaar aan het woord" wordt niet getoond.
 * Enkel echte getuigenissen invullen, met schriftelijke toestemming van de klant.
 * Voorbeeld: { citaat: '…', naam: 'Marc V.', omschrijving: 'eigenaar van een collectie van 7 wagens, Latem' }
 */
export const getuigenissen: { citaat: string; naam: string; omschrijving: string }[] = [];

/**
 * Partners op Over ons. LEEG = het logoraster wordt niet getoond (de tekst over het netwerk blijft).
 * Enkel partners invullen die toestemming gaven. Logo's in public/partners/, bv. logo: '/partners/naam.svg'.
 */
export const partners: { naam: string; soort: string; logo: string }[] = [];

/** Standaardauteur van de gidsen (sleutel = naam in `team`). Per gids te overschrijven met de prop `auteur`. */
export const standaardAuteur = 'Jasper Descamps';

/** Hoofdmenu. Volgorde = volgorde in de navigatie. */
export const menu = [
  { href: '/', label: 'Home' },
  { href: '/diensten/', label: 'Diensten' },
  { href: '/werkwijze/', label: 'Werkwijze' },
  { href: '/gids/', label: 'Gidsen' },
  { href: '/over-ons/', label: 'Over ons' },
  { href: '/contact/', label: 'Contact' },
] as const;

// Afgeleide waarden — hier hoeft u niets aan te passen.
export const telHref = `tel:${site.telefoon.link}`;
export const mailHref = `mailto:${site.email}`;
export const vestigingRegels = site.vestigingen.map((v) => `${v.postcode} ${v.gemeente}`);
export const zetelTekst = `${site.adres.straat}, ${site.adres.postcode} ${site.adres.gemeente}`;
export const adresRegels = [
  site.adres.straat,
  `${site.adres.postcode} ${site.adres.gemeente}`,
];
