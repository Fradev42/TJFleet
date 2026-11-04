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

## ✅ 9. Auteur per gids (afgerond op 4 november 2026)

- De 18 gidsen zijn 9/9 verdeeld, met de auteur expliciet in elke gids (prop `auteur` in `src/pages/gids/*.astro`):
  - **Thomas Vancoillie** (lak, rijklaar houden en technische verzorging): wax of keramische coating, exclusieve wagen die weinig rijdt, winterklaar maken, concours en rally, elektrische wagen lang stallen, oldtimer die weinig rijdt, leder/hout/cabriodak, restauratie, oldtimerkeuring.
  - **Jasper Descamps** (regels, papieren en waarde): LEZ, inschrijven, verzekeren, taxeren, dossier, collectie overdragen, oldtimers na 2030, youngtimers, diefstal voorkomen.
- Nieuwe gids? Zet `auteur="…"` erbij; zonder die prop geldt `standaardAuteur` in `src/config.ts`.

## 🟠 9b. Google-tag toevoegen (cookiebanner aanzetten)

- **Wat:** een Google-tag (Google Analytics 4, Google Ads of Tag Manager) op de site zetten, met de cookiebanner.
- **Geblokkeerd door:** er is nog geen tag-ID, en de keuze welke Google-dienst er komt is nog niet gemaakt.
- **Deblokkeren:** de eigenaars (account bij Google Analytics, Google Ads of Tag Manager).
- **Al gedaan:**
  - Cookiebanner (`src/components/CookieBanner.astro`) met Google Consent Mode v2: alles staat standaard op "geweigerd", en Google wordt pas geladen **na** toestemming.
  - De knoppen "Alles weigeren" en "Alles aanvaarden" zijn even groot, en "Zelf kiezen" laat per categorie kiezen (statistieken, marketing). Niets staat vooraf aangevinkt.
  - De keuze wordt 180 dagen bewaard; bij intrekking worden de Google-cookies gewist.
  - Een knop "Cookie-instellingen" in de footer en op het cookiebeleid.
  - Een cookiebeleid op `/cookiebeleid/`, en de privacyverklaring past zich vanzelf aan.
  - Getest met een test-ID: geen Google-aanvraag vóór toestemming of na weigeren, wel na aanvaarden, intrekken werkt, een verlopen keuze wordt opnieuw gevraagd, op mobiel staat de banner boven de vaste balk, en zonder JavaScript is er niets.
  - Zolang de ID leeg is, staat er niets van dit alles op de site, en blijft de site "zonder cookies".
- **Daarna:**
  1. In `src/config.ts` bij `cookies` de `googleTagId` invullen (`G-…`, `AW-…` of `GTM-…`).
  2. Bij Tag Manager: in de container **Consent Mode** gebruiken, zodat tags de toestemmingssignalen volgen. De banner geeft die door via `gtag('consent', 'update', …)`.
  3. Na het live zetten met een cookiescanner, of met de ontwikkelaarstools van de browser, nakijken welke cookies de tag echt plaatst. Werk dan de tabel `cookies.categorieen` in `src/config.ts` bij: namen, aanbieder en bewaartermijn. De huidige tabel bevat de standaardcookies van GA4 en Google Ads. Wordt een categorie niet gebruikt (bv. geen Google Ads), haal ze dan uit de lijst.
  4. In de **privacyverklaring** (`src/pages/privacy.astro`) Google als ontvanger vermelden, met het doel en de rechtsgrond (toestemming). Pas de datum aan in de privacyverklaring en in `src/pages/cookiebeleid.astro`.
  5. Overwegen in Google Analytics de **IP-anonimisering** en de bewaartermijn op het minimum te zetten, en **Google Signals** uit te laten, tenzij u dat nodig hebt.
  6. Verandert de cookiebanner wezenlijk (een nieuwe categorie of dienst), verhoog dan `cookies.versie`. Iedereen krijgt de vraag dan opnieuw.

## 🟠 9c. SEO buiten de site (Search Console, Bedrijfsprofiel, gidsen)

- **Wat:** de site aanmelden bij Google Search Console en Bing Webmaster Tools, een Google Bedrijfsprofiel aanmaken, Bing Places en Apple Business Connect invullen, en het bedrijf vermelden in bedrijvengidsen en bij vakorganisaties, overal met exact dezelfde gegevens.
- **Geblokkeerd door:** de site moet eerst live staan op het eigen domein (taak 1). Inloggen, verificatiecodes, DNS-records en het aanvaarden van voorwaarden kunnen alleen de eigenaars.
- **Deblokkeren:** de eigenaars, met de Claude-extensie in Chrome als hulp.
- **Al gedaan:**
  - Een volledige prompt voor de Claude-extensie in Chrome: `docs/prompt-seo-buitenaf.md`. Die werkt de stappen in volgorde af (Search Console, Bing, Bedrijfsprofiel, Bing Places en Apple, gidsen, consistentiecontrole), stopt telkens als u iets moet doen, en geeft op het einde een logboek.
  - Op de site zelf: sitemap op `/sitemap.xml`, `robots.txt`, canonical-URL's, LocalBusiness-, WebSite-, Article-, Service-, FAQPage- en BreadcrumbList-schema, en een deelafbeelding per pagina.
- **Daarna:**
  1. Open Chrome, log in op het zakelijke Google-account en plak de prompt vanaf "Je taak" in de Claude-extensie. Houd uw telefoon en het Cloudflare-dashboard bij de hand.
  2. Zet de DNS-records die Google en Bing vragen in Cloudflare (de extensie geeft de exacte waarde).
  3. Dien in Search Console en Bing de sitemap in: `https://www.apexcollectioncare.be/sitemap.xml`.
  4. Wacht op de briefkaart of videoverificatie van het Google Bedrijfsprofiel en rond die af.
  5. Bewaar het logboek van de extensie, met per dienst de link en de inloggegevens (in uw wachtwoordbeheerder, niet in de repository).
  6. Een maand later: in Search Console nakijken of alle pagina's geïndexeerd zijn, en bij "Verbeteringen" of de FAQ- en kruimelpadgegevens zonder fouten gelezen worden.

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

## 🟠 13. Foto's per gids en dienst (Gemini)

- **Wat:** een eigen foto bovenaan elke gids en dienstpagina, die ook de deelafbeelding wordt.
- **Geblokkeerd door:** de foto's moeten nog gemaakt en nagekeken worden (geen merklogo's, geen leesbare platen, geen gezichten).
- **Al gedaan:** de plek voor de foto op elke gids en dienstpagina, de alt-teksten (`src/lib/paginafotos.ts`), en een titelkaart per pagina in `public/og/` die gebruikt wordt zolang er geen foto is. Prompts per pagina: `docs/prompt-gidsfotos.md`.
- **Daarna:** de foto's opslaan als `src/assets/paginafotos/<slug>.jpg`, de alt-tekst nakijken, `npm run build`.

## 🟠 14. Bevestigingsmail naar de aanvrager aanzetten

- **Wat:** wie het formulier invult met een e-mailadres, krijgt een korte bevestiging ("We bellen u binnen één werkdag terug").
- **Geblokkeerd door:** het formulier moet eerst werken (taak 2), en u beslist of u dit wilt.
- **Al gedaan:** de bevestiging is gebouwd en getest. Ze bevat bewust geen ingevulde tekst, zodat het formulier niet misbruikt kan worden om berichten naar vreemden te sturen. Een fout bij de bevestiging laat de aanvraag zelf niet mislukken.
- **Daarna:** in Cloudflare Pages de variabele `MAIL_BEVESTIGING` op `1` zetten. Belooft u "binnen één werkdag", hou u er dan ook aan; anders past u de tekst aan in `bouwBevestiging` in `src/lib/formulier-logica.js` en op `/contact/bedankt/`.

## 🟠 15. Automatische controle in GitHub

- **Wat:** bij elke push de build, de formuliertests en de SEO- en linkcontrole, en elke maand de externe bronlinks.
- **Al gedaan:** `.github/workflows/controle.yml`, `scripts/controle.mjs` en `scripts/links-extern.mjs` (ook lokaal: `npm run controle`, `npm run links:extern`).
- **Daarna:**
  1. Op GitHub bij **Actions** nakijken of de eerste run groen is. Staat Actions uit voor de repository, zet het dan aan.
  2. Onder uw GitHub-profiel → *Settings → Notifications → Actions* nakijken dat u een e-mail krijgt als een run faalt.
  3. Overweeg een vaste productiebranch (`main`) in Cloudflare Pages, met de andere branches als preview. Zo ziet u een wijziging eerst op een previewadres voordat ze live gaat. Zet in GitHub dan een *branch protection rule* op `main` die een groene controle vraagt.

## 🟢 16. Monitoring van de site en het formulier

- **Wat:** een melding krijgen als de site of het formulier niet werkt.
- **Geblokkeerd door:** de site moet live staan (taak 1), en een account bij een monitoringdienst kunnen alleen de eigenaars aanmaken.
- **Daarna:** een gratis account bij bv. UptimeRobot of Better Stack, met een controle op `https://www.apexcollectioncare.be/` (elke 5 minuten) en een melding per e-mail of sms. Verstuur daarnaast elke maand zelf een testaanvraag via het formulier.

## 🟢 17. Meten wat werkt (conversies)

- **Wat:** klikken op "Bel ons", op het e-mailadres en verstuurde formulieren meten als conversie.
- **Geblokkeerd door:** de Google-tag (taak 9b).
- **Al gedaan:** zodra de tag er is en de bezoeker toestemming gaf, stuurt de site de gebeurtenissen `telefoon_klik`, `email_klik` en `generate_lead` (na het formulier) door.
- **Daarna:** in Google Analytics `generate_lead` en `telefoon_klik` als **belangrijke gebeurtenis** (conversie) markeren. Bij Tag Manager: triggers op die gebeurtenissen maken.

## 🟢 18. Beslissingen en inhoud van de eigenaars

Dit kan ik niet zelf invullen; zodra u beslist, bouw ik het.

- **WhatsApp-knop** naast "Bel ons". Nodig: het nummer dat u daarvoor wilt gebruiken, en of iemand er ook op antwoordt.
- **Afspraak via een online agenda** (bv. Cal.com of Calendly) bij "Kennismaking aanvragen". Nodig: de dienst en de link. Vraagt een aanpassing van de CSP en mogelijk van het cookiebeleid.
- **Concrete garanties**, bv. "offerte binnen 5 werkdagen", "elke wagen verzekerd tijdens transport", "maandelijks opzegbaar". Nodig: wat u echt kunt beloven.
- **Korte video** (± 1 minuut) waarin jullie je voorstellen, zonder automatisch afspelen. Nodig: de video. Bij YouTube of Vimeo: CSP en cookiebeleid aanpassen, of de video zelf hosten.
- **Echte screenshots of een rondleiding van de app**, zodra die werkt, in plaats van het nagebouwde voorbeeld.
- **Algemene voorwaarden** voor de dienstverlening. Die horen in uw offerte; een link op de site kan daarna.
- **Een test met twee of drie mensen uit de doelgroep:** laat ze een gids zoeken en een aanvraag doen, en kijk mee zonder te helpen.
- **Jaarlijkse controle van de gidsen**, elk jaar in januari, met `docs/controle-gidsen.md`. Zet een herinnering in uw agenda.

## Nog na te lopen (uit eerdere rondes)

- **De gidsen** laten nalezen door iemand met vakkennis, vooral die over de LEZ, de keuring, de verkeersbelasting en het overdragen van een collectie (notaris).
- **De sfeerfoto's** tonen herkenbare merken (Jaguar, Aston Martin, met embleem). Overweeg versies zonder logo.
