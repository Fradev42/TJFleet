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

Partnerlogo's: zet de bestanden in `public/partners/` en vervang in `src/pages/over-ons.astro` de tekst
`Logo partner` door bv. `<img src="/partners/naam.svg" alt="Naam partner" />`.

## 4. Online zetten op Cloudflare Pages

1. Zet dit project op GitHub.
2. Ga in het Cloudflare-dashboard naar **Workers & Pages → Create → Pages → Connect to Git** en kies de repository.
3. Build command `npm run build`, build output directory `dist`. Klik **Save and Deploy**.
4. **Domeinnaam**: *Custom domains → Set up a custom domain*. Pas daarna `site.url` in `src/config.ts` aan.

Elke wijziging die u naar GitHub pusht, zet Cloudflare automatisch online. Security-headers staan in `public/_headers`.

### Het contactformulier activeren (Cloudflare Worker)

Het formulier staat standaard **uit** (`formulier.provider: 'uit'` in `src/config.ts`): bezoekers zien dan een uitnodiging
om te bellen of te mailen. Om het te activeren, gebruikt u de Worker in de map `worker-formulier/`. Die stuurt elke aanvraag
als e-mail naar uw mailbox via Cloudflare Email Routing, en bewaart niets.

Nodig: uw eigen domein, beheerd in Cloudflare.

1. **Email Routing aanzetten**: in het dashboard van uw domein → *Email → Email Routing*. Voeg uw mailbox toe als
   **bestemmingsadres** en bevestig het via de mail die u krijgt.
2. **De Worker instellen**: vul in `worker-formulier/wrangler.jsonc` alle waarden tussen `[[ ]]` in:
   uw bevestigde mailbox, een afzender op uw domein (bv. `website@uwdomein.be`) en de adressen van uw site.
3. **De Worker online zetten**:
   ```bash
   cd worker-formulier
   node test.mjs          # snelle controle van de logica
   npx wrangler login
   npx wrangler deploy
   ```
   Wrangler toont daarna het adres van de Worker, bv. `https://apex-formulier.uwaccount.workers.dev`.
   U kunt er in het dashboard ook een eigen subdomein aan koppelen, bv. `formulier.uwdomein.be`.
4. **De site koppelen**: zet in `src/config.ts` `formulier.provider` op `'endpoint'` en `fallbackEndpoint` op het adres van de Worker.
   Pusht u dat naar GitHub, dan staat het formulier online.
5. **Testen**: verstuur een aanvraag en kijk of de mail binnenkomt.

### Toch Netlify?

Op Netlify werkt het formulier zonder Worker: zet `formulier.provider` op `'netlify'`. Netlify leest `netlify.toml`
(build `npm run build`, map `dist`). Pas dan ook de privacyverklaring aan, want Netlify wordt dan webhost en verwerker.

## 5. Statistieken (optioneel)

Plausible meet bezoekers zonder cookies, dus een cookiebanner blijft overbodig. Maak een account op plausible.io en zet
in `src/config.ts` `plausible.ingeschakeld` op `true` met uw domein. Vermeld het dan ook in de privacyverklaring.

## Kwaliteit

Getest op 375, 768 en 1280 px breed. Lighthouse (lokaal, mobiel en desktop): 99–100 voor Performance en 100 voor
Accessibility, Best Practices en SEO op alle pagina's — met de placeholderfoto's. Controleer na het plaatsen van echte
foto's opnieuw.
