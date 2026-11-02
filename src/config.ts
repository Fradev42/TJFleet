/**
 * ─────────────────────────────────────────────────────────────
 *  ALLE BEDRIJFSGEGEVENS STAAN HIER.
 *  Pas dit bestand aan; de rest van de site leest het automatisch.
 *  Alles tussen [[ dubbele haken ]] moet u nog invullen.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Naam van de dienst, zoals ze overal op de site verschijnt. */
  naam: 'APEX Fleet Management',

  /**
   * Tekst van het logo, voor schermlezers en zoekmachines.
   * Het logo zelf staat in public/logo/logo.svg (kop en footer).
   */
  logoAlt: 'APEX Fleet Management',

  /** Korte ondertitel bij de naam (logo-regel in de kop). */
  baseline: 'Beheer van klassieke wagens',

  /** Volledige adres van de website, zonder slash op het einde. Nodig voor sitemap en Open Graph. */
  url: 'https://www.example.be',

  telefoon: {
    /** Zoals het nummer getoond wordt. */
    weergave: '0468 35 50 64',
    /** Internationaal formaat zonder spaties, voor de tel:-link. Bv. '+3292345678'. */
    link: '+32468355064',
  },

  email: 'info@apexfleet.be',

  /**
   * Vestigingen zoals ze op de site getoond worden (zonder straat en huisnummer).
   */
  vestigingen: [
    { gemeente: 'Zwijnaarde', postcode: '9052', provincie: 'Oost-Vlaanderen' },
    { gemeente: 'Sint-Eloois-Winkel', postcode: '8880', provincie: 'West-Vlaanderen' },
  ],

  /**
   * Volledig adres van de maatschappelijke zetel. Wordt NIET op de contactpagina of in de footer getoond,
   * enkel in de privacyverklaring (wettelijke vermelding).
   */
  adres: {
    straat: 'Eedstraat 42a',
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

  /** Bereikbaarheid, getoond op de contactpagina. */
  bereikbaarheid: [
    'Maandag tot vrijdag van 9 tot 18 uur',
    'Zaterdag op afspraak',
    'Afspraken bij u thuis of in uw stalling, in heel Oost- en West-Vlaanderen',
  ],

  /** Werkgebied, voor de tekst en voor schema.org. */
  regio: ['Oost-Vlaanderen', 'West-Vlaanderen'],
} as const;

/**
 * Contactformulier.
 *  - provider 'netlify': Netlify Forms vangt het formulier op (geen extra account nodig).
 *  - provider 'endpoint': het formulier wordt gepost naar `fallbackEndpoint`
 *    (bv. Formspree, Basin, Web3Forms) — gebruik dit op Cloudflare Pages.
 */
export const formulier = {
  provider: 'netlify' as 'netlify' | 'endpoint',
  /** Naam van het formulier in het Netlify-dashboard. */
  netlifyNaam: 'kennismaking',
  /** Alternatieve URL die POST-verzoeken aanvaardt. */
  fallbackEndpoint: 'https://formspree.io/f/[[FORMULIER-ID]]',
  /** Pagina waarop de bezoeker belandt na verzenden. */
  bedanktPagina: '/contact/bedankt/',
};

/**
 * Statistieken via Plausible (zonder cookies). Standaard UIT.
 * Zet `ingeschakeld` op true en vul uw domein in om het te activeren.
 */
export const plausible = {
  ingeschakeld: false,
  domein: 'example.be',
  script: 'https://plausible.io/js/script.js',
};

/**
 * Team, getoond op de pagina Over ons.
 * Foto's: src/assets/images/persoon-1.jpg en persoon-2.jpg (zelfde volgorde als hieronder).
 */
export const team = [
  {
    naam: 'Thomas Vancoillie',
    rol: 'Medeoprichter · uw vaste aanspreekpunt',
    linkedin: 'https://www.linkedin.com/in/thomas-vancoillie-a189903b1/',
  },
  {
    naam: 'Jasper Descamps',
    rol: 'Medeoprichter · uw vaste aanspreekpunt',
    linkedin: 'https://www.linkedin.com/in/jasper-descamps/',
  },
] as const;

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
export const adresRegels = [
  site.adres.straat,
  `${site.adres.postcode} ${site.adres.gemeente}`,
];
