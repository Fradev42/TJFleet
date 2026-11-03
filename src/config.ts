/**
 * ─────────────────────────────────────────────────────────────
 *  ALLE BEDRIJFSGEGEVENS STAAN HIER.
 *  Pas dit bestand aan; de rest van de site leest het automatisch.
 *  Alles tussen [[ dubbele haken ]] moet u nog invullen.
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

  /** Volledige adres van de website, zonder slash op het einde. Nodig voor sitemap en Open Graph. */
  url: 'https://www.example.be',

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
 * Contactformulier.
 *  - provider 'uit': geen formulier; bezoekers zien een uitnodiging om te bellen of te mailen.
 *  - provider 'endpoint': het formulier wordt gepost naar `fallbackEndpoint`. Op Cloudflare Pages
 *    is dat de Worker in de map worker-formulier/ (zie README), bv. 'https://apex-formulier.uwaccount.workers.dev/'.
 *  - provider 'netlify': Netlify Forms (werkt ALLEEN als de site op Netlify gehost wordt).
 */
export const formulier = {
  provider: 'uit' as 'uit' | 'endpoint' | 'netlify',
  /** Naam van het formulier in het Netlify-dashboard. */
  netlifyNaam: 'kennismaking',
  /** URL van de Worker (of een andere dienst) die het formulier ontvangt. */
  fallbackEndpoint: 'https://apex-formulier.[[ACCOUNT]].workers.dev/',
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
    rol: 'Medeoprichter',
    linkedin: 'https://www.linkedin.com/in/thomas-vancoillie-a189903b1/',
  },
  {
    naam: 'Jasper Descamps',
    rol: 'Medeoprichter',
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
