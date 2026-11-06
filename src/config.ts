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
   * Het logo staat in public/logo/: logo.svg (liggend, kop op tablet/desktop en footer), apex-2-gestapeld-kleur.svg (kop op smartphone),
   * de monogrammen (app-voorbeeld) en de crème/groene varianten. Favicon: public/favicon.svg. Na een nieuw logo: npm run merkbeelden.
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
    weergave: '+32 473 76 09 09',
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
  /** Rechtspersonenregister (WER): de ondernemingsrechtbank van de maatschappelijke zetel. */
  rpr: 'RPR Gent, afdeling Gent',
  /**
   * Officiële profielen van het bedrijf elders, voor schema.org (sameAs). Helpt Google om site en profielen te koppelen.
   * Vul aan zodra ze bestaan, bv. de LinkedIn-bedrijfspagina of de link "Delen" van het Google Bedrijfsprofiel.
   */
  profielen: [] as string[],

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
 * Team: de auteurs van de gidsen (naam en LinkedIn bij elke gids) en de medewerkers in de gegevens voor Google.
 * Niet meer getoond op Over ons.
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

/**
 * Cookies en Google-tag.
 * ZOLANG `googleTagId` LEEG IS: geen cookies, geen banner, geen Google-code. De site belooft dan "geen cookies".
 * Vult u een ID in, dan verschijnen automatisch de cookiebanner, de knop "Cookie-instellingen" in de footer
 * en de cookietabel op /cookiebeleid/. Google wordt pas geladen NA toestemming (Consent Mode v2, standaard alles geweigerd).
 *  - 'G-XXXXXXXXXX'  = Google Analytics 4 (gtag.js)
 *  - 'AW-XXXXXXXXX'  = Google Ads (gtag.js)
 *  - 'GTM-XXXXXXX'   = Google Tag Manager
 * Werk na het invullen ook de cookietabel hieronder bij met de cookies die de tag echt plaatst (zie TODO-LIVEGANG.md).
 */
export const cookies = {
  googleTagId: '',
  /** Na hoeveel dagen we de bezoeker opnieuw om toestemming vragen. */
  bewaarDagen: 180,
  /** Verhoog dit getal als de categorieën of het beleid wezenlijk veranderen: iedereen krijgt de vraag dan opnieuw. */
  versie: 1,
  /** Cookietabel voor /cookiebeleid/, per categorie. */
  categorieen: [
    {
      sleutel: 'noodzakelijk',
      titel: 'Noodzakelijk',
      uitleg: 'Nodig om de site te laten werken en uw cookiekeuze te onthouden. Hiervoor vragen we geen toestemming.',
      altijdAan: true,
      items: [
        { naam: 'apex-cookiekeuze', aanbieder: 'APEX Collection Care', doel: 'Onthoudt uw cookiekeuze (opgeslagen in uw browser, niet als cookie, en niet naar ons verstuurd).', duur: '180 dagen' },
      ],
    },
    {
      sleutel: 'statistieken',
      titel: 'Statistieken',
      uitleg: 'Helpen ons begrijpen hoe bezoekers de site gebruiken, zodat we ze kunnen verbeteren. Enkel met uw toestemming.',
      altijdAan: false,
      items: [
        { naam: '_ga', aanbieder: 'Google (Google Analytics)', doel: 'Onderscheidt bezoekers voor bezoekersstatistieken.', duur: '2 jaar' },
        { naam: '_ga_<ID>', aanbieder: 'Google (Google Analytics)', doel: 'Bewaart de status van uw bezoek voor statistieken.', duur: '2 jaar' },
      ],
    },
    {
      sleutel: 'marketing',
      titel: 'Marketing',
      uitleg: 'Meten of onze advertenties werken en tonen u relevantere advertenties. Enkel met uw toestemming.',
      altijdAan: false,
      items: [
        { naam: '_gcl_au', aanbieder: 'Google (Google Ads)', doel: 'Meet welke advertentie tot een bezoek of aanvraag leidde.', duur: '90 dagen' },
      ],
    },
  ],
};
/** Staan er Google-cookies op de site? Afgeleid; hier niets aanpassen. */
export const cookiesActief = cookies.googleTagId.trim() !== '';

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
