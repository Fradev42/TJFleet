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
| Openingsuren | `site.bereikbaarheid` |
| Team (naam, rol, LinkedIn) | `team` |
| Webadres (voor sitemap en delen) | `site.url` |
| Formulier (Netlify of ander endpoint) | `formulier` |
| Plausible-statistieken (standaard uit) | `plausible` |

Zoek in het hele project naar `[[` om alles te vinden wat nog ingevuld moet worden.

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

Partnerlogo's: zet de bestanden in `public/partners/` en vervang in `src/pages/over-ons.astro` de tekst
`Logo partner` door bv. `<img src="/partners/naam.svg" alt="Naam partner" />`.

## 4. Online zetten op Netlify

1. Zet dit project op GitHub (of GitLab/Bitbucket).
2. Ga naar [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** en kies de repository.
3. Netlify leest `netlify.toml` en vult zelf in: build command `npm run build`, publish directory `dist`. Klik **Deploy**.
4. **Domeinnaam**: *Site configuration → Domain management → Add a domain*. Pas daarna `site.url` in `src/config.ts` aan.
5. **Formulier**: na de eerste deploy verschijnt het formulier `kennismaking` onder *Forms*. Zet onder
   *Forms → Form notifications* een e-mailmelding naar uw adres. Spam wordt via het honeypot-veld weggefilterd.

Elke wijziging die u naar GitHub pusht, zet Netlify automatisch online.

**Cloudflare Pages** in plaats van Netlify? Build command `npm run build`, output `dist`. Netlify Forms werkt daar niet:
zet in `src/config.ts` `formulier.provider` op `'endpoint'` en vul `fallbackEndpoint` in (bv. een gratis Formspree-formulier).

## 5. Statistieken (optioneel)

Plausible meet bezoekers zonder cookies, dus een cookiebanner blijft overbodig. Maak een account op plausible.io en zet
in `src/config.ts` `plausible.ingeschakeld` op `true` met uw domein. Vermeld het dan ook in de privacyverklaring.

## Kwaliteit

Getest op 375, 768 en 1280 px breed. Lighthouse (lokaal, mobiel en desktop): 99–100 voor Performance en 100 voor
Accessibility, Best Practices en SEO op alle pagina's — met de placeholderfoto's. Controleer na het plaatsen van echte
foto's opnieuw.
