# Prompt voor de Claude-extensie in Chrome: SEO buiten de website

**Zo gebruikt u deze prompt**
- Open Chrome en log in op het Google-account dat het bedrijf beheert. Gebruik bij voorkeur een zakelijk account, niet uw persoonlijke.
- Houd uw telefoon bij de hand voor verificatiecodes, en het Cloudflare-dashboard voor de DNS.
- Plak alles vanaf "Je taak" in de Claude-extensie en kijk mee. De extensie stopt telkens als u iets moet doen.

---

## Je taak

Je helpt de eigenaar van **APEX Collection Care** om de website buiten de site zelf vindbaar te maken: bij Google,
Bing en in bedrijvengidsen. De eigenaar kijkt mee in dit browservenster en doet de stappen die jij niet mag of kan
doen. Werk de stappen hieronder in volgorde af, en houd een logboek bij (zie "Wat ik op het einde wil").

### Spelregels: lees dit eerst

**Stop en vraag het aan de eigenaar**, in één duidelijke zin, telkens wanneer:
- er ingelogd moet worden, er een wachtwoord, verificatiecode, sms of tweestapsverificatie nodig is;
- er betaald moet worden, of er een betaald plan, proefperiode of "upgrade" aangeboden wordt. **Kies altijd de gratis optie**;
- er voorwaarden aanvaard moeten worden of er een account aangemaakt wordt: noem welke dienst en welke voorwaarden;
- je iets **publiek** wilt zetten of publiceren. Toon eerst de volledige tekst en wacht op "ok";
- een keuze de privacy raakt, zoals het tonen van een adres, telefoonnummer of foto's van personen;
- je twijfelt aan een gegeven of een categorie;
- een site om een DNS-record, een bestand op de webserver of een code in de website vraagt. Geef de exacte waarde, en de eigenaar zet het in Cloudflare.

**Nooit:**
- betaalgegevens invullen of op advertenties of "Promote" klikken;
- gegevens verzinnen of andere gegevens gebruiken dan die hieronder;
- reviews schrijven, kopen of vragen in naam van anderen;
- trefwoorden toevoegen aan de bedrijfsnaam (dat is tegen de regels van Google);
- instellingen wijzigen die niet bij deze taak horen.

Werk rustig, één stap tegelijk. Lukt iets niet, beschrijf dan wat je ziet en ga verder met de volgende stap.

### Bedrijfsgegevens: gebruik deze overal exact zo

| Veld | Waarde |
|---|---|
| Bedrijfsnaam | APEX Collection Care |
| Juridische naam | Frades BV (APEX Collection Care is een handelsnaam van Frades BV) |
| Ondernemingsnummer / btw | BE 1022.876.282 |
| Website | https://www.apexcollectioncare.be |
| Telefoon | +32 473 76 09 09 (zo overal invullen; in een veld dat alleen nationale nummers aanvaardt: 0473 76 09 09) |
| E-mail | info@apexcollectioncare.be |
| Maatschappelijke zetel | Eedstraat 42A, 9052 Zwijnaarde, België |
| Tweede vestiging | 8880 Sint-Eloois-Winkel (geen straatadres publiceren) |
| Werkgebied | Oost-Vlaanderen en West-Vlaanderen: o.a. Gent, Sint-Martens-Latem, Deinze, Aalst, Oudenaarde, Brugge, Knokke-Heist, Kortrijk, Waregem, Roeselare |
| Openingsuren | maandag tot vrijdag 9:00 tot 18:00; zaterdag op afspraak; zondag gesloten |
| Oprichters | Thomas Vancoillie (https://www.linkedin.com/in/thomas-vancoillie-a189903b1/) en Jasper Descamps (https://www.linkedin.com/in/jasper-descamps/) |
| Taal | Nederlands (Vlaams) |

**Wat het bedrijf doet:** onafhankelijk beheer en verzorging van oldtimers, youngtimers en exclusieve wagens voor
particulieren. Eén vast aanspreekpunt voor onderhoud en keuring, reiniging met wax of coating, wagens altijd rijklaar,
restauratie via vaste specialisten, verzekering, inschrijving en LEZ, transport in een gesloten trailer (via een
partner), een dossier per wagen, en een klanten-app.

**Wat het niet doet:** geen eigen garage of stalling, geen verkoop van wagens, geen taxaties, geen commissie. Het
bedrijf komt bij de klant thuis of in diens stalling. Er is **geen winkel of werkplaats waar klanten langskomen**.

**Korte beschrijving** (± 250 tekens, voor gidsen met weinig ruimte):
> APEX Collection Care beheert en verzorgt oldtimers en exclusieve wagens in Oost- en West-Vlaanderen. Eén vast aanspreekpunt voor onderhoud, keuring, reiniging met wax of coating, transport en papieren. Wij komen bij u langs.

**Lange beschrijving** (± 700 tekens, voor het Google Bedrijfsprofiel):
> APEX Collection Care beheert en verzorgt collecties oldtimers, youngtimers en exclusieve wagens voor particulieren in Oost- en West-Vlaanderen. Eén vast aanspreekpunt plant onderhoud en keuring, reinigt uw wagens en beschermt de lak met wax of coating, en zorgt dat ze altijd rijklaar staan. Restauraties volgen we op bij vaste specialisten, met vergeleken offertes. We regelen verzekering, inschrijving en de registratie voor de lage-emissiezones, en transport in een gesloten trailer naar garage, rally of concours. Per wagen houden we een volledig dossier bij, dat u volgt in onze app. Wij werken onafhankelijk: geen eigen garage, geen verkoop, geen commissie. Wij komen bij u thuis of in uw stalling.

### Stap 0: is de website live?

1. Open https://www.apexcollectioncare.be en controleer of de site van APEX Collection Care verschijnt, met een slotje (https).
2. Open https://www.apexcollectioncare.be/sitemap.xml en https://www.apexcollectioncare.be/robots.txt. Beide moeten laden.
3. Open https://apexcollectioncare.be en https://apex-classic-car-care.pages.dev. Beide moeten doorverwijzen naar
   https://www.apexcollectioncare.be. Gebruik in alle stappen hieronder alleen het adres met www.
4. **Laadt de site niet op www?** Stop dan met de stappen 1 en 2, meld het aan de eigenaar en ga verder met stap 3.

### Stap 1: Google Search Console

1. Ga naar https://search.google.com/search-console.
2. Voeg een eigendom toe van het type **Domein** met de waarde `apexcollectioncare.be` (zonder www of https).
3. Google toont een **TXT-record**. Geef de exacte waarde aan de eigenaar en **stop**: de eigenaar voegt het toe in
   Cloudflare → DNS → Records (type TXT, naam `@`). Wacht tot de eigenaar "klaar" zegt en klik dan op "Verifiëren".
   Mislukt het, probeer het na enkele minuten opnieuw.
4. Dien bij *Sitemaps* de sitemap in: `https://www.apexcollectioncare.be/sitemap.xml`.
5. Vraag via *URL-inspectie* indexering aan voor deze pagina's, één voor één:
   `/`, `/diensten/`, `/werkwijze/`, `/werkgebied/`, `/gids/`, `/contact/`.
6. Noteer wat Search Console meldt over indexering, mobiel gebruik en eventuele problemen.

### Stap 2: Bing Webmaster Tools

1. Ga naar https://www.bing.com/webmasters en kies **Importeren uit Google Search Console** (de eigenaar logt in en geeft toestemming).
2. Controleer dat de sitemap is overgenomen; zo niet, dien ze in.
3. Noteer het resultaat.

### Stap 3: Google Bedrijfsprofiel

1. Ga naar https://business.google.com en zoek eerst of er al een profiel bestaat voor "APEX Collection Care", of op het
   telefoonnummer. Bestaat er een, stop dan en vraag de eigenaar hoe verder.
2. Maak een nieuw profiel aan:
   - **Naam:** exact `APEX Collection Care`, zonder extra woorden.
   - **Soort bedrijf:** een **servicegebiedbedrijf**. Het bedrijf gaat naar de klant, dus kies **geen** locatie
     waar klanten langskomen. Het adres (Eedstraat 42A, 9052 Zwijnaarde) wordt enkel voor de verificatie gebruikt en
     **verborgen** voor het publiek. Vraag de eigenaar dat expliciet te bevestigen.
   - **Hoofdcategorie:** zoek een categorie die het beheer dekt. Stel er 2 à 3 voor aan de eigenaar, bijvoorbeeld
     "Autoverzorging" of "Autodetailing" (voor de reiniging, wax en coating) of een advies- of serviceachtige categorie.
     Kies **niet** "Garage", "Autoreparatie" of "Autodealer": het bedrijf is geen werkplaats en verkoopt niets.
     Laat de eigenaar kiezen.
   - **Extra categorieën:** maximaal 2, na akkoord van de eigenaar.
   - **Servicegebied:** de gemeenten uit de tabel, of de provincies Oost-Vlaanderen en West-Vlaanderen (maximaal 20 gebieden).
   - **Telefoon, website:** zoals in de tabel.
   - **Openingsuren:** maandag tot vrijdag 9:00 tot 18:00; zaterdag en zondag gesloten. Zet bij de beschrijving dat zaterdag op afspraak kan.
   - **Beschrijving:** de lange beschrijving hierboven.
   - **Diensten:** voeg toe, elk met de korte uitleg van de website:
     beheer van oldtimercollecties · onderhoud en keuring op tijd · reiniging met wax of coating · wagens altijd rijklaar ·
     opvolging van restauraties · verzekering, inschrijving en LEZ · transport in gesloten trailer · dossier per wagen.
3. **Verificatie:** Google vraagt meestal een video, een telefoontje of een brief. **Stop** en laat de eigenaar dat doen.
4. Foto's: vraag de eigenaar welke foto's hij wil uploaden (logo, teamfoto's, een wagen bij een klant met toestemming).
   Upload niets zonder akkoord.
5. Zet "Berichten" en "Wat zijn uw openingsuren?" niet aan zonder akkoord van de eigenaar.

### Stap 4: Bing Places en Apple Business Connect

1. **Bing Places** (https://www.bingplaces.com): importeer uit het Google Bedrijfsprofiel, of maak een vermelding met dezelfde gegevens. Adres verborgen, servicegebied zoals hierboven.
2. **Apple Business Connect** (https://businessconnect.apple.com): maak een vermelding voor Apple Kaarten, met dezelfde gegevens. Vraag de eigenaar of hij een Apple-account wil gebruiken; zo niet, sla deze stap over.

### Stap 5: vermeldingen in gidsen en bij vakorganisaties

Doe per site eerst een zoekopdracht of APEX Collection Care er al staat. Zoek dan hoe een **gratis** vermelding
aangevraagd wordt. Vul de gegevens uit de tabel en de korte beschrijving in, en stop vóór het versturen.

1. **oldtimerweb.be**: de specialistenlijst of bedrijvengids (scoort op 1 voor "oldtimer garage" en "oldtimer onderhoud").
2. **Classics Online** (classicsonline.be of .nl): bedrijvengids.
3. **Gouden Gids** (goudengids.be): gratis basisvermelding. Laat betaalde pakketten liggen.
4. **BEHVA** (behva.be): kijk of er een lijst met dienstverleners of partners is, en hoe je daarop komt. Noteer enkel; niets versturen zonder overleg.
5. Zoek met Google naar **oldtimerclubs in Oost- en West-Vlaanderen**, en naar merkclubs met een lijst van
   specialisten of sponsors. Maak een lijst van maximaal 10, met de contactpagina. **Neem zelf geen contact op**:
   de eigenaar beslist.

### Stap 6: consistentie nakijken

1. Zoek in Google op `"APEX Collection Care"`, op `"+32 473 76 09 09"`, op `"0473 76 09 09"` en op `"Frades BV"`.
2. Noteer elke vermelding met afwijkende gegevens: een oude naam, een ander telefoonnummer of een ander adres.
   Oude namen waren onder meer "APEX Fleet Management" en "APEX Classic Car Care"; het oude e-mailadres was info@apexfleet.be.
3. Kijk ook de LinkedIn-profielen van de oprichters na: staat het bedrijf er met de juiste naam en website? Zo niet,
   noteer wat de eigenaar zelf moet aanpassen. Wijzig niets aan persoonlijke profielen.

### Wat ik op het einde wil

Eén overzichtelijk verslag in het Nederlands, met:

1. **Een tabel per dienst** (Search Console, Bing Webmaster Tools, Google Bedrijfsprofiel, Bing Places, Apple Business
   Connect, elke gids), met de status (klaar / wacht op verificatie / wacht op de eigenaar / niet gedaan), de datum, het
   account waarmee het gebeurde, en de link naar het beheerscherm.
2. **Wat de eigenaar nog moet doen**, per dienst, met de exacte stap (bv. "Brief van Google afwachten, code invoeren op …").
3. **De DNS-records** die de eigenaar toevoegde of nog moet toevoegen, met de exacte waarden.
4. **Gevonden afwijkingen** in naam, telefoon of adres op andere sites, met de link.
5. **De lijst met clubs en vakorganisaties** uit stap 5, met de contactpagina.
6. **Eerste indrukken uit Search Console:** geïndexeerde pagina's, fouten, waarschuwingen.
7. **Aanbevolen volgende stappen** voor de komende maand, maximaal 5, in volgorde van belang.
