# TODO voor de livegang

Taken uit de site-audit van 4 november 2026 die niet volledig af konden, omdat er eerst iets anders moet gebeuren.
Per taak staat waardoor ze geblokkeerd is, wie ze kan deblokkeren en wat er daarna nog te doen is.
Alles wat zonder deblokkering kon, is al gebouwd; meestal blijft er één kleine stap over.

Legende: 🔴 blokkerend voor livegang · 🟠 belangrijk · 🟢 kleiner

---

## 🔴 1. Eigen domein koppelen en doorverwijzen

- **Wat:** `www.apexcollectioncare.be` koppelen aan het Cloudflare Pages-project, en de pages.dev-host en de versie zonder www permanent (301) doorverwijzen naar `https://www.apexcollectioncare.be`.
- **Geblokkeerd door:** het domein is nog niet aan Cloudflare Pages gekoppeld.
- **Deblokkeren:** de eigenaars, in het Cloudflare-dashboard.
- **Al gedaan:** de basis-URL staat op één plek: `site.url` in `src/config.ts` (= `https://www.apexcollectioncare.be`). Canonicals, `og:url`, `og:image`, sitemap, robots.txt en JSON-LD worden daaruit opgebouwd. In de build staat `example.be` nergens meer.
- **Daarna:**
  1. *Workers & Pages → project → Custom domains*: `www.apexcollectioncare.be` en `apexcollectioncare.be` toevoegen; de DNS-records laat Cloudflare zelf aanmaken.
  2. Doorverwijzingen instellen met **Bulk Redirects** of een **Redirect Rule** in het dashboard (`public/_redirects` kan geen hostnamen omleiden):
     - `apexcollectioncare.be/*` → `https://www.apexcollectioncare.be/$1` (301)
     - `apex-classic-car-care.pages.dev/*` → `https://www.apexcollectioncare.be/$1` (301)
  3. Controleren: `curl -I https://www.apexcollectioncare.be/` geeft 200, en de canonical in de bron klopt.
  4. Een eigendom aanmaken in **Google Search Console** en `https://www.apexcollectioncare.be/sitemap.xml` indienen.
  5. Verandert het domein toch, dan enkel `site.url` in `src/config.ts` aanpassen.

## 🔴 1b. Noindex op pages.dev vervangen door een 301-redirect

- **Wat:** na de koppeling het noindex-blok voor pages.dev vervangen door een 301-redirect van `https://apex-classic-car-care.pages.dev/*` naar `https://www.apexcollectioncare.be/:splat`.
- **Geblokkeerd door:** het domein is nog niet gekoppeld (DNS en custom domain in Cloudflare Pages, zie taak 1).
- **Deblokkeren:** de eigenaars, in het Cloudflare-dashboard.
- **Al gedaan:** bovenaan `public/_headers` staat een blok dat enkel voor de pages.dev-host `X-Robots-Tag: noindex` meestuurt:
  ```
  https://:project.pages.dev/*
    X-Robots-Tag: noindex
  ```
  robots.txt blijft open (geen `Disallow`), zodat Google de noindex kan lezen. Er staat geen `<meta name="robots">` in de HTML, omdat die na de koppeling ook op het eigen domein zou gelden.
- **Waar:**
  - `public/_headers`: het blok hierboven, met de drie commentaarregels erboven, verwijderen.
  - De redirect toevoegen. Bij voorkeur gebeurt dat met een **Bulk Redirect** in het Cloudflare-dashboard (*Rules → Redirect Rules* of *Bulk Redirects*): bron `apex-classic-car-care.pages.dev`, doel `https://www.apexcollectioncare.be`, 301, met pad en querystring behouden. `public/_redirects` werkt alleen voor paden op de host zelf, niet voor een andere hostnaam.
- **Daarna:**
  1. `curl -I https://apex-classic-car-care.pages.dev/gids/oldtimer-verzekeren/` geeft `301` met `location: https://www.apexcollectioncare.be/gids/oldtimer-verzekeren/`.
  2. `curl -sI https://www.apexcollectioncare.be/ | grep -i x-robots-tag` geeft **niets**.
  3. De sitemap `https://www.apexcollectioncare.be/sitemap.xml` indienen in Google Search Console.

## 🔴 2. Contactformulier: e-maildienst instellen

- **Wat:** het formulier op `/contact/` stuurt aanvragen als e-mail naar info@apexcollectioncare.be.
- **Geblokkeerd door:** het versturen heeft een e-maildienst en een API-sleutel nodig, en DNS-records (SPF/DKIM) op het eigen domein (zie taak 1).
- **Deblokkeren:** de eigenaars (account bij de e-maildienst) en wie het DNS beheert.
- **Al gedaan:**
  - Een Cloudflare Pages Function in `functions/api/kennismaking.js`. Ze controleert de velden, weert spam met een onzichtbaar lokaasveld, stuurt de mail en verwijst door naar `/contact/bedankt/`.
  - Zonder JavaScript werkt het als gewone POST, met foutmeldingen op een eenvoudige pagina. Met JavaScript verschijnen meldingen per veld.
  - De inhoud wordt niet opgeslagen of gelogd.
  - Lokaal getest met `wrangler pages dev` (met en zonder JS, foutmeldingen, spam, vreemde herkomst, doorverwijzing).
  - Controleregels: `src/lib/formulier-logica.js`; tests: `npm test`.
- **Gekozen dienst: Resend** (eenvoudige HTTP-API). Een andere dienst kan ook: alleen de functie `verstuur()` in `functions/api/kennismaking.js` aanpassen.
- **Daarna:**
  1. Account aanmaken bij Resend en het domein `apexcollectioncare.be` verifiëren. Resend geeft SPF- en DKIM-records die u in Cloudflare DNS toevoegt.
  2. In Cloudflare Pages → *Settings → Variables and Secrets* (Production):
     - `RESEND_API_KEY` (type *secret*)
     - `MAIL_FROM` = `Website APEX <website@apexcollectioncare.be>`
     - `MAIL_TO` = `info@apexcollectioncare.be` (optioneel, dat is de standaard)
  3. Opnieuw deployen, en een testaanvraag versturen op de live site.
- ⚠️ **Tot dit gebeurd is**, krijgt wie het formulier op de live site verstuurt de melding "Het verzenden is niet gelukt", met het telefoonnummer. Er gaan geen aanvragen verloren zonder dat de bezoeker het weet, maar ze komen ook niet binnen. Wilt u het formulier tot dan verbergen: zet `formulier.actief` op `false` in `src/config.ts`.
- **Optioneel:** Cloudflare Turnstile als extra spambescherming. Pas toevoegen nadat is nagekeken dat het geen cookies plaatst, want de privacyverklaring belooft "geen cookies".

## 🔴 3. Privacyverklaring: verwerkers bij naam noemen

- **Wat:** de e-maildienst (taak 2) en de provider van de mailbox info@apexcollectioncare.be als verwerker vermelden.
- **Geblokkeerd door:** die zijn nog niet definitief gekozen of bevestigd.
- **Deblokkeren:** de eigenaars.
- **Al gedaan:**
  - De placeholder is weg.
  - De tekst beschrijft het formulier correct (Cloudflare Pages Functions, doorgestuurd via een e-maildienst, inhoud niet bewaard, spambescherming zonder cookies).
  - De zin over Plausible is geschrapt.
  - De datum staat op 4 november 2026.
- **Daarna:** in `src/pages/privacy.astro`, sectie "Wie verwerkt ze nog?", de zin "…stuurt ze via een e-maildienst…" aanvullen met de naam en het land (Resend is een Amerikaans bedrijf: vermeld de waarborgen). Voeg ook een zin toe over de mailboxprovider (bv. Microsoft of Google). Pas "Laatst bijgewerkt" aan.

## 🟠 4. Getuigenis van een klant

- **Wat:** een echte getuigenis op Home (blok "Een eigenaar aan het woord").
- **Geblokkeerd door:** er is nog geen goedgekeurde getuigenis.
- **Deblokkeren:** de eigenaars: een getuigenis verzamelen, met schriftelijke toestemming van de klant om ze te publiceren.
- **Al gedaan:** het blok is verborgen zolang er geen getuigenis is.
- **Daarna:** in `src/config.ts` een item toevoegen aan `getuigenissen`, bv.
  `{ citaat: '…', naam: 'Marc V.', omschrijving: 'eigenaar van een collectie van 7 wagens, Latem' }`. Het blok verschijnt dan vanzelf.

## 🟠 5. Persoonlijke tekst op Over ons

- **Wat:** een korte, echte tekst over de oprichters en hun band met wagens.
- **Geblokkeerd door:** tekst van de eigenaars. De audit noemt "Simon/Thomas"; op de site staan **Jasper Descamps en Thomas Vancoillie**. Kijk na wie bedoeld wordt.
- **Al gedaan:** de placeholder en de verzonnen voorbeeldtekst ("groeiden op met de geur van olie…") zijn vervangen door een neutrale tekst zonder biografische claims (sectie "Waarom we begonnen").
- **Daarna:** de tekst aanpassen in `src/pages/over-ons.astro`, sectie `verhaal-titel`.

## 🟠 6. Partnerlogo's

- **Wat:** logo's van vaste partners op Over ons.
- **Geblokkeerd door:** de partners moeten toestemming geven, en de logobestanden moeten er zijn.
- **Al gedaan:** het raster met "LOGO PARTNER" is verborgen; de tekst over het netwerk van specialisten blijft.
- **Daarna:** de logo's in `public/partners/` zetten en per partner een item toevoegen aan `partners` in `src/config.ts`: `{ naam: '…', soort: 'Carrosserie', logo: '/partners/naam.svg' }`.

## 🟠 7. RPR-vermelding nakijken

- **Wat:** de vermelding "RPR Gent, afdeling Gent" bij de ondernemingsgegevens (WER).
- **Geblokkeerd door:** de juiste rechtbank en afdeling bevestigen, bv. in de KBO of de oprichtingsakte van Frades BV.
- **Al gedaan:** het volledige adres van de maatschappelijke zetel (Eedstraat 42A, 9052 Zwijnaarde), Frades BV, het ondernemingsnummer en het e-mailadres staan in de footer en op /contact/.
- **Daarna:** de RPR toevoegen aan de zetelregel. Het makkelijkst is `zetelTekst` uit te breiden in `src/config.ts`, of een veld `rpr` toe te voegen en dat te tonen in `src/components/Footer.astro` (regel `sitefooter__klein`) en in `src/pages/contact/index.astro` (blok "Gegevens").

## 🟠 8. Straatadres van de vestiging in Sint-Eloois-Winkel

- **Wat:** het straatadres van de tweede vestiging, voor de JSON-LD (`location`).
- **Geblokkeerd door:** het adres is niet bekend, en de eigenaars moeten beslissen of het publiek mag.
- **Al gedaan:** de vestiging staat al als `Place` in de JSON-LD, met postcode en gemeente.
- **Daarna:** in `src/config.ts` bij `vestigingen` een `straat` toevoegen, en in `src/components/SEO.astro` (`location` → `address`) `streetAddress: v.straat` toevoegen.

## 🟠 9. Auteur per gids bevestigen

- **Wat:** elke gids heeft nu Jasper Descamps als auteur (`standaardAuteur` in `src/config.ts`), zichtbaar en in de JSON-LD.
- **Geblokkeerd door:** wie welke gids schreef of nalas, weten enkel de eigenaars.
- **Daarna:** per gids de prop `auteur="Thomas Vancoillie"` toevoegen waar dat klopt (in `src/pages/gids/*.astro`), of `standaardAuteur` aanpassen.

## 🟢 10. Nieuwe teamfoto's

- **Wat:** twee portretten in dezelfde stijl en resolutie.
- **Geblokkeerd door:** `persoon-2.jpg` (Jasper) is maar 400 × 400 px, tegenover 800 × 800 px voor persoon-1. Er is geen beter bronbestand.
- **Al gedaan:** beide worden nu met dezelfde afmetingen (400 × 400), dezelfde beeldverhouding (1:1) en dezelfde object-position getoond.
- **Daarna:** nieuwe foto's van minstens 800 × 800 px, met dezelfde achtergrond en hetzelfde licht, opslaan als `src/assets/images/persoon-1.jpg` en `persoon-2.jpg`. De weergavemaat past zich vanzelf aan.

## 🟢 11. Prijsindicatie

- **Wat:** beslissen of er een "vanaf"-bedrag op de site komt.
- **Geblokkeerd door:** een beslissing van de eigenaars.
- **Al gedaan:** op /diensten/ staat de sectie "Wat kost het?" zonder bedragen: "U krijgt na de kennismaking een vaste prijs op maat, zonder verrassingen. Het eerste gesprek is kosteloos."
- **Daarna:** het bedrag toevoegen in `src/pages/diensten.astro`, sectie `prijs-titel`.

## 🟢 12. HSTS-header

- **Wat:** `Strict-Transport-Security: max-age=31536000; includeSubDomains` toevoegen.
- **Geblokkeerd door:** het eigen domein moet eerst met HTTPS live zijn (taak 1). Met `includeSubDomains` moeten ook alle subdomeinen HTTPS hebben.
- **Daarna:** in `public/_headers`, onder `/*`, de regel toevoegen:
  ```
    Strict-Transport-Security: max-age=31536000; includeSubDomains
  ```

## Nog na te lopen (uit eerdere rondes)

- **De gidsen** laten nalezen door iemand met vakkennis, vooral die over de LEZ, de keuring, de verkeersbelasting en het overdragen van een collectie (notaris).
- **De sfeerfoto's** tonen herkenbare merken (Jaguar, Aston Martin, met embleem). Overweeg versies zonder logo.
