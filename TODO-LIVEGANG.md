# TODO voor de livegang

Taken uit de site-audit van 4 november 2026 die niet volledig af konden, omdat er eerst iets anders moet gebeuren.
Per taak staat waardoor ze geblokkeerd is, wie ze kan deblokkeren en wat er daarna nog te doen is.
Alles wat zonder deblokkering kon, is al gebouwd; meestal blijft er één kleine stap over.

Legende: 🔴 blokkerend voor livegang · 🟠 belangrijk · 🟢 kleiner

---

## ✅ 1. Eigen domein en doorverwijzingen (afgerond op 5 november 2026)

- `https://www.apexcollectioncare.be` is live. Nagekeken: canonical, robots.txt, sitemap (29 pagina's), 404-pagina, de 301 van `/gids/wagen-lang-stilstaan/`, de security-headers en het formulier (alleen een spamtest).
- In het Cloudflare-dashboard staan twee doorverwijzingen, allebei 301 met behoud van pad en querystring:
  - Redirect Rule **"Root naar www (301)"**: `apexcollectioncare.be` → `https://www.apexcollectioncare.be`;
  - Bulk Redirect **"pages.dev naar www (301)"** (lijst `apex_pages_dev_naar_www`): `apex-classic-car-care.pages.dev` → `https://www.apexcollectioncare.be`, zonder subdomeinen, zodat previews van andere branches blijven werken.
- Live nagekeken: `https://apex-classic-car-care.pages.dev/gids/oldtimer-verzekeren/?a=1` en `https://apexcollectioncare.be/gids/youngtimer/?a=1` geven 301 naar dezelfde pagina op www, en www zelf geeft 200.
- Verandert het domein toch, pas dan `site.url` in `src/config.ts` en beide doorverwijzingen aan.

## ✅ 1b. Noindex-blok voor pages.dev opgeruimd (5 november 2026)

- Het blok met `X-Robots-Tag: noindex` voor de pages.dev-host is uit `public/_headers` gehaald, want pages.dev verwijst nu door naar www. Nakijken na de volgende deploy: `curl -sI https://www.apexcollectioncare.be/ | grep -i x-robots-tag` geeft niets.

## ✅ 2. Contactformulier: e-maildienst ingesteld (6 november 2026)

- Het formulier op `/contact/` verstuurt aanvragen via **Resend** naar info@apexcollectioncare.be. Live getest op 6 november 2026: de functie aanvaardde een echte testaanvraag ("Test website (controle door Claude)") en gaf `ok` terug. Zonder ingestelde sleutel zou ze een fout geven.
- Code: `functions/api/kennismaking.js`, regels in `src/lib/formulier-logica.js`, tests met `npm test`. Spam wordt geweerd met een onzichtbaar lokaasveld; de inhoud wordt niet opgeslagen of gelogd.
- **Nakijken door de eigenaars:** kwam de testmail aan in de mailbox (ook in de spam kijken)? Staat in Cloudflare Pages geen variabele `MAIL_DRYRUN`? Die mag alleen lokaal bestaan, anders wordt er niets verstuurd.
- Een andere e-maildienst kan ook: alleen `stuurMail()` in `functions/api/kennismaking.js` aanpassen, en de privacyverklaring.
- **Optioneel:** Cloudflare Turnstile als extra spambescherming, pas na nakijken dat het geen cookies plaatst.

## ✅ 3. Privacyverklaring: verwerkers bij naam (6 november 2026)

- In `src/pages/privacy.astro`, onder "Wie verwerkt ze nog?", staan nu Cloudflare (hosting en formulier), **Resend** (Resend, Inc., Verenigde Staten) voor het versturen van de formuliermail, en **Zoho** (Zoho Mail) voor de mailbox, met de waarborgen bij verwerking buiten de EU. Datum: 6 november 2026.
- Verandert u van e-maildienst of mailbox, pas dan deze alinea en de datum aan.
- Wilt u het nauwkeuriger: kijk in Zoho na of uw account in het Europese datacentrum staat (adres `mail.zoho.eu`). Dan kan de zin over verwerking buiten de EU voor Zoho weg.

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

## ✅ 7. RPR-vermelding (5 november 2026)

- "RPR Gent, afdeling Gent" staat nu in de footer, op /contact/ (blok "Gegevens") en in de privacyverklaring. De waarde staat op één plek: `site.rpr` in `src/config.ts`.
- Afgeleid uit de maatschappelijke zetel in Zwijnaarde (Gent). Wijkt de KBO of de oprichtingsakte af, pas dan alleen `site.rpr` aan.

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

## 🟠 9c. SEO buiten de site

- **Stand op 5 november 2026** (verslag van de Chrome-extensie):

  | Dienst | Stand |
  |---|---|
  | Google Search Console | ✅ domeineigendom geverifieerd via DNS (TXT-record op `@`, niet verwijderen), sitemap ingediend (29 pagina's), indexering gevraagd voor de 6 kernpagina's. Nog niets geïndexeerd, normaal voor een nieuwe site. |
  | Bing Webmaster Tools | ✅ geïmporteerd uit Google, sitemap ingediend. |
  | Google Bedrijfsprofiel | ⏳ wacht op videoverificatie. Servicegebiedbedrijf (Oost- en West-Vlaanderen), adres verborgen, ma–vr 9–18 u, zaterdag op afspraak. Dat klopt met de site. |
  | Bing Places | ⏳ na de Google-verificatie importeren. |
  | Apple Business Connect | ⏳ nog te doen. |
  | Classics Online | ⏳ account nodig, kosten nakijken. |
  | Oldtimerweb.be (€180/jaar), BEHVA Professional Member (€250/jaar), Gouden Gids (adres verplicht publiek) | ✋ niet gedaan, beslissing van de eigenaars. |

- **Te doen door de eigenaars:**
  1. **Deze week:** de verificatievideo voor het Google Bedrijfsprofiel opnemen (Google Maps-app → APEX Collection Care → Verifiëren → Video). Zonder verificatie is het profiel onzichtbaar.
  2. **Na de verificatie:** logo en foto's toevoegen, Bing Places importeren uit Google, en Apple Business Connect invullen met dezelfde gegevens.
  3. **LinkedIn:** een bedrijfspagina voor APEX Collection Care maken, en APEX Collection Care met de website vermelden bij beide oprichters (nu staat er "Frades").
  4. **Over 1 à 2 weken:** in Search Console → Pagina's nakijken of de kernpagina's geïndexeerd zijn. Zo niet, opnieuw indexering aanvragen.
  5. **Beslissen** over één betaalde vermelding bij een vakorganisatie: BEHVA (nu 3 maanden gratis) of Oldtimerweb. En eventueel contact met de oldtimerclubs uit het verslag.
  6. **Om over na te denken:** hetzelfde telefoonnummer staat ook op apexworkshop.be. Twee merken op één nummer kan Google doen twijfelen. Niet dringend.
- **Daarna, voor mij:** geef me de link van de LinkedIn-bedrijfspagina en de deellink van het Google Bedrijfsprofiel. Ik zet ze in `site.profielen` in `src/config.ts`, zodat ze als `sameAs` in de gegevens voor Google komen.

## ✅ 10. Teamfoto's (vervallen op 5 november 2026)

- Het blok met namen, LinkedIn en foto's is van Over ons gehaald, en de portretten zijn verwijderd. Er zijn dus geen teamfoto's meer nodig.

## 🟢 11. Prijsindicatie

- **Wat:** beslissen of er een "vanaf"-bedrag op de site komt.
- **Geblokkeerd door:** een beslissing van de eigenaars.
- **Al gedaan:** op /diensten/ staat de sectie "Wat kost het?" zonder bedragen: "U krijgt na de kennismaking een vaste prijs op maat, zonder verrassingen. Het eerste gesprek is kosteloos."
- **Daarna:** het bedrag toevoegen in `src/pages/diensten.astro`, sectie `prijs-titel`.

## ✅ 12. HSTS-header (5 november 2026)

- In `public/_headers` staat nu `Strict-Transport-Security: max-age=31536000`, voor alle pagina's.
- Bewust **zonder** `includeSubDomains`: dat dwingt HTTPS af op elk subdomein van apexcollectioncare.be, ook op subdomeinen voor e-mail of andere diensten die u later toevoegt. Weet u zeker dat elk subdomein HTTPS heeft, dan kunt u `; includeSubDomains` toevoegen. Voeg `preload` alleen toe als u het domein ook op hstspreload.org wilt laten opnemen; dat is moeilijk terug te draaien.

## ✅ 13. Foto's per gids en dienst (afgerond op 4 november 2026)

- Alle 18 gidsen en de twee dienstpagina's hebben een eigen foto in `src/assets/paginafotos/`, die ook de deelafbeelding is. De alt-teksten staan in `src/lib/paginafotos.ts`.
- Nieuwe gids of dienst? Zet een foto met de slug als naam in die map en voeg een alt-tekst toe. Prompts en controlelijst: `docs/prompt-gidsfotos.md`.

## 🟠 14. Bevestigingsmail naar de aanvrager aanzetten

- **Wat:** wie het formulier invult met een e-mailadres, krijgt een korte bevestiging ("We bellen u binnen één werkdag terug").
- **Geblokkeerd door:** het formulier moet eerst werken (taak 2), en u beslist of u dit wilt.
- **Al gedaan:** de bevestiging is gebouwd en getest. Ze bevat bewust geen ingevulde tekst, zodat het formulier niet misbruikt kan worden om berichten naar vreemden te sturen. Een fout bij de bevestiging laat de aanvraag zelf niet mislukken.
- **Daarna:** in Cloudflare Pages de variabele `MAIL_BEVESTIGING` op `1` zetten. Belooft u "binnen één werkdag", hou u er dan ook aan; anders past u de tekst aan in `bouwBevestiging` in `src/lib/formulier-logica.js` en op `/contact/bedankt/`.

## 🟠 15. Automatische controle in GitHub

- **Wat:** bij elke push de build, de formuliertests en de SEO- en linkcontrole, en elke maand de externe bronlinks.
- **Al gedaan:** `.github/workflows/controle.yml`, `scripts/controle.mjs` en `scripts/links-extern.mjs` (ook lokaal: `npm run controle`, `npm run links:extern`).
- **Daarna:**
  1. ✅ Actions staat aan: de workflow "Controle" draaide al 24 keer, de laatste runs allemaal groen (nagekeken op 5 november 2026). De maandelijkse controle van de externe links loopt elke 1e van de maand, voor het eerst op 1 december 2026.
  Voor de stappen 2 en 3 is er een prompt voor de Claude-extensie in Chrome: `docs/prompt-github-controle.md` (deel A: meldingen, deel B: productiebranch `main`, optioneel).
  2. Onder uw GitHub-profiel → *Settings → Notifications → Actions* nakijken dat u een e-mail krijgt als een run faalt.
  3. Overweeg een vaste productiebranch (`main`) in Cloudflare Pages, met de andere branches als preview. Zo ziet u een wijziging eerst op een previewadres voordat ze live gaat. Zet in GitHub dan een *branch protection rule* op `main` die een groene controle vraagt.

## 🟢 16. Monitoring van de site en het formulier

- **Planning:** komt later (beslist op 5 november 2026).
- **Wat:** een melding krijgen als de site of het formulier niet werkt.
- **Geblokkeerd door:** alleen nog een account bij een monitoringdienst, dat kunnen alleen de eigenaars aanmaken. De site staat live.
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

## 🟠 19. Cloudflare Web Analytics uitzetten

- **Beslist op 5 november 2026:** Web Analytics gaat uit. De site meet geen bezoekersaantallen, zoals de privacyverklaring en het cookiebeleid zeggen. In de code verandert er niets.
- **Stand:** live staat het nog aan. Cloudflare voegt op elke pagina een script van `static.cloudflareinsights.com` toe. De CSP blokkeert het, zodat er niets gemeten wordt, maar de browser toont een fout en Lighthouse geeft 92 voor Best Practices.
- **Deblokkeren:** de eigenaars, in het Cloudflare-dashboard:
  1. *Workers & Pages → apex-classic-car-care → Metrics*, of *Analytics & Logs → Web Analytics*: de site uitschakelen of verwijderen.
  2. Staat het script er daarna nog, start dan een nieuwe deploy (*Deployments → Retry deployment* op de laatste productiedeploy).
- **Daarna:** zeg het mij, dan kijk ik live na dat het script weg is en dat Lighthouse weer 100 geeft voor Best Practices.

## Nog na te lopen (uit eerdere rondes)

- **De gidsen** laten nalezen door iemand met vakkennis, vooral die over de LEZ, de keuring, de verkeersbelasting en het overdragen van een collectie (notaris).
- **De sfeerfoto's** tonen herkenbare merken (Jaguar, Aston Martin). Dat mag, maar kijk na of het model en het embleem kloppen: liefhebbers zien een fout meteen.
