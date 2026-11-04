# Website — beheer van klassieke wagens

Kleine statische website (Astro, geen JavaScript-framework). Vijf pagina's plus privacy, bedankt en 404.
Geen cookies, geen tracking, lettertypes worden van de eigen server geladen.

## 1. Lokaal starten

Nodig: [Node.js](https://nodejs.org) versie 22 of hoger.

```bash
npm install        # eenmalig
npm run dev        # open http://localhost:4321 — wijzigingen verschijnen meteen
npm run build      # maakt de definitieve site in de map dist/
npm run preview    # bekijk de gebouwde site lokaal
```

## 2. Gegevens en teksten aanpassen

**Bedrijfsgegevens** — alles staat in één bestand: `src/config.ts`

| Wat | Waar in `src/config.ts` |
|---|---|
| Naam, ondertitel | `site.naam`, `site.baseline` |
| Telefoon (getoond + link) | `site.telefoon.weergave` en `site.telefoon.link` (formaat `+3292345678`) |
| E-mail, adres, BTW-nr. | `site.email`, `site.adres`, `site.btwNummer` |
| Openingsuren (tekst / schema.org) | `site.bereikbaarheid` / `site.openingsuren` |
| Team (naam, rol, LinkedIn) | `team` |
| Webadres: de enige plek met het domein (canonicals, sitemap, robots, JSON-LD) | `site.url` |
| Contactformulier aan/uit | `formulier` |
| Getuigenissen op Home (leeg = verborgen) | `getuigenissen` |
| Partnerlogo's op Over ons (leeg = verborgen) | `partners` |
| Standaardauteur van de gidsen | `standaardAuteur` |
| Google-tag en cookiebanner (leeg = geen cookies, geen banner) | `cookies` |
| Plausible-statistieken (standaard uit) | `plausible` |

Wat er nog moet gebeuren voor de livegang, staat in `TODO-LIVEGANG.md`.

**Teksten** staan rechtstreeks in de pagina's, in gewone HTML:

| Pagina | Bestand |
|---|---|
| Home (incl. getuigenis) | `src/pages/index.astro` |
| Diensten | `src/pages/diensten.astro` (de vier blokken staan bovenaan in een lijstje) |
| Werkwijze | `src/pages/werkwijze.astro` |
| Voorbeeld van de app (Werkwijze) | `src/components/AppVoorbeeld.astro` |
| Over ons (tekst, partners) | `src/pages/over-ons.astro` (teamleden staan in `src/config.ts`) |
| Contact / bedankt | `src/pages/contact/index.astro`, `src/pages/contact/bedankt.astro` |
| Formuliervelden | `src/components/Contactformulier.astro` |
| Groen belblok onderaan | `src/components/BelBlok.astro` |
| Werkgebied | `src/pages/werkgebied.astro` |
| Gidsen (overzicht en vijf gidsen) | `src/pages/gids/` — opmaak in `src/layouts/Gids.astro`; pas bij elke controle `bijgewerkt` aan |
| Privacyverklaring | `src/pages/privacy.astro` |

**Kleuren en lettergrootte** staan als variabelen bovenaan `src/styles/global.css`.

## 3. Foto's vervangen

De foto's staan in `src/assets/images/`. Vervang een bestand door uw eigen foto **met exact dezelfde naam**:

| Bestand | Gebruikt op | Aanbevolen |
|---|---|---|
| `hero.jpg` | grote foto bovenaan Home | liggend, min. 2400 × 1350 px, onderwerp liefst rechts |
| `werkplaats.jpg` | Diensten | liggend, min. 1600 × 1000 px |
| `kennismaking.jpg` | Werkwijze | liggend, min. 1600 × 1000 px |
| `persoon-1.jpg`, `persoon-2.jpg` | Over ons (zelfde volgorde als `team` in `src/config.ts`) | vierkant, liefst min. 800 × 800 px |

Astro maakt er bij het bouwen automatisch kleinere WebP-versies van; u hoeft niets te verkleinen.
Pas daarna de **alt-tekst** (korte beschrijving voor blinde bezoekers en Google) aan in de pagina waar de foto staat (`alt="..."`).

Het **logo** staat in `public/logo/logo.svg` en wordt in de kop en de footer gebruikt.
Vervang het bestand met dezelfde naam. De alt-tekst staat in `site.logoAlt`.

De afbeelding die verschijnt als iemand de site deelt (WhatsApp, LinkedIn, e-mail) is `public/og-image.jpg` (1200 × 630 px).

Partnerlogo's: zet de bestanden in `public/partners/` en voeg per partner een regel toe aan `partners` in
`src/config.ts`. Het logoraster op Over ons verschijnt vanzelf zodra die lijst niet leeg is.

## 4. Online zetten op Cloudflare Pages

1. Zet dit project op GitHub.
2. Ga in het Cloudflare-dashboard naar **Workers & Pages → Create → Pages → Connect to Git** en kies de repository.
3. Build command `npm run build`, build output directory `dist`. Klik **Save and Deploy**.
4. **Domeinnaam**: *Custom domains → Set up a custom domain*. Pas daarna `site.url` in `src/config.ts` aan.

Elke wijziging die u naar GitHub pusht, zet Cloudflare automatisch online. Security-headers staan in `public/_headers`.

### Het contactformulier

Het formulier op `/contact/` post naar een **Cloudflare Pages Function** (`functions/api/kennismaking.js`).
Die controleert de aanvraag, stuurt ze als e-mail door via de e-maildienst Resend en verwijst daarna door naar
`/contact/bedankt/`. De inhoud wordt niet opgeslagen. Spam wordt tegengehouden met een onzichtbaar lokaasveld.
Zonder JavaScript werkt het formulier als gewone POST; met JavaScript krijgt de bezoeker foutmeldingen per veld.
De controleregels staan op één plek: `src/lib/formulier-logica.js` (gedeeld door de Function en de pagina).

Instellen in Cloudflare Pages → *Settings → Variables and Secrets*:

| Variabele | Waarde |
|---|---|
| `RESEND_API_KEY` (secret) | API-sleutel van Resend |
| `MAIL_FROM` | afzender op een geverifieerd domein, bv. `Website APEX <website@apexcollectioncare.be>` |
| `MAIL_TO` | ontvanger (standaard `info@apexcollectioncare.be`) |

Lokaal testen, zonder iets te versturen:

```bash
npm run build
npx wrangler pages dev dist --binding MAIL_DRYRUN=1
npm test                 # test van de formulierlogica
```

## 5. Cookies en Google-tag (optioneel)

Standaard plaatst de site **geen cookies** en toont ze geen banner. Vult u in `src/config.ts` bij `cookies` een
`googleTagId` in (`G-…`, `AW-…` of `GTM-…`), dan verschijnen automatisch de cookiebanner, de knop "Cookie-instellingen"
in de footer en de cookietabel op `/cookiebeleid/`. Google wordt pas geladen na toestemming (Consent Mode v2).
Zie `TODO-LIVEGANG.md`, taak 9b, voor de stappen daarna.

## Kwaliteit

Getest op 375, 768 en 1280 px breed. Lighthouse (lokaal, mobiel en desktop): 99–100 voor Performance en 100 voor
Accessibility, Best Practices en SEO op alle pagina's — met de placeholderfoto's. Controleer na het plaatsen van echte
foto's opnieuw.
