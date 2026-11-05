# Prompt voor de Claude-extensie in Chrome: het contactformulier laten mailen (taak 2)

**Zo gebruikt u deze prompt**
- Open Chrome en log in op het Cloudflare-dashboard (account met `apexcollectioncare.be` en het Pages-project `apex-classic-car-care`).
- Houd uw telefoon bij de hand voor verificatiecodes, en de mailbox van info@apexcollectioncare.be.
- Plak alles vanaf "Je taak" in de Claude-extensie en kijk mee. De extensie stopt telkens als u iets moet doen of beslissen.

---

## Je taak

Je helpt de eigenaar van **APEX Collection Care** om het kennismakingsformulier op https://www.apexcollectioncare.be/contact/
te laten werken. Het formulier wordt verwerkt door een Cloudflare Pages Function. Die verstuurt elke aanvraag als e-mail via
de e-maildienst **Resend** naar **info@apexcollectioncare.be**. De code is klaar. Er ontbreken alleen een Resend-account,
de DNS-records voor het domein en drie instellingen in Cloudflare Pages. Werk de stappen in volgorde af en houd een
logboek bij.

### Spelregels: lees dit eerst

**Stop en vraag het aan de eigenaar**, in één duidelijke zin, telkens wanneer:
- er ingelogd moet worden, een account aangemaakt wordt, of een wachtwoord, code of tweestapsverificatie nodig is;
- er voorwaarden aanvaard moeten worden: noem de dienst;
- er betaald moet worden of een betaald plan aangeboden wordt. **Kies altijd het gratis plan** (Resend: Free);
- je een DNS-record wilt toevoegen of wijzigen: toon eerst type, naam en waarde, en wacht op "ok";
- een bestaand DNS-record in de weg lijkt te zitten: wijzig of verwijder het **nooit** zelf;
- iets er anders uitziet dan in deze prompt staat, of je twijfelt.

**Nooit:**
- een API-sleutel in de chat, in een notitie, in het logboek of in een gewone (niet-geheime) variabele zetten. De sleutel
  gaat alleen rechtstreeks van Resend naar het geheime veld in Cloudflare, en de eigenaar kopieert en plakt hem zelf;
- bestaande MX-, SPF-, DMARC- of Google-verificatierecords wijzigen of verwijderen (de TXT-record
  `google-site-verification=…` op `@` is voor Search Console en moet blijven);
- een DNS-record op "Proxied" (oranje wolk) zetten;
- bestanden in de GitHub-repository aanpassen.

---

### Stap 1: komt mail voor info@apexcollectioncare.be aan?

1. Open in Cloudflare de zone `apexcollectioncare.be` → **DNS → Records**. Noteer welke **MX**-records er op `@`
   (apexcollectioncare.be) staan, en of er al een TXT-record met `v=spf1` op `@` en een record op `_dmarc` is.
2. **Staan er geen MX-records op `@`**, dan kan info@apexcollectioncare.be geen mail ontvangen en heeft de rest geen zin.
   Stop en leg de eigenaar twee mogelijkheden voor:
   - een mailbox bij een provider (bv. Microsoft 365 of Google Workspace, betalend) die de eigenaar zelf instelt; of
   - gratis **Cloudflare Email Routing** (*Email → Email Routing*): info@apexcollectioncare.be doorsturen naar een
     bestaand adres van de eigenaar. Doe dit alleen als de eigenaar het kiest, en laat de eigenaar het doeladres zelf
     invullen en bevestigen.
   Ga pas verder als er MX-records staan.
3. Vraag de eigenaar welke provider de mailbox levert (Microsoft, Google, Cloudflare Email Routing of een andere).
   Noteer het antwoord: Claude Code heeft het nodig voor de privacyverklaring.

### Stap 2: Resend-account en domein

1. Open https://resend.com en laat de eigenaar een account aanmaken of inloggen. Kies het **gratis** plan.
2. Ga naar **Domains → Add Domain**. Vul in: `apexcollectioncare.be`. Kies als regio **Ireland (eu-west-1)**, zodat de
   mails vanuit de EU vertrekken. Toon de keuze en vraag een "ok".
3. Resend toont nu een lijst met DNS-records: meestal een **TXT** op `resend._domainkey` (DKIM), een **MX** en een
   **TXT** op `send` (voor SPF van het verzenddomein), en soms een voorgestelde **TXT** op `_dmarc`. Noteer type, naam,
   waarde en prioriteit van elk record precies.
4. Biedt Resend aan om de records automatisch in Cloudflare te zetten ("Sign in to Cloudflare" of "Auto configure"),
   dan mag dat, als de eigenaar akkoord gaat en zelf de toegang bevestigt. Anders: ga naar stap 3.

### Stap 3: DNS-records in Cloudflare

1. Ga in Cloudflare naar de zone `apexcollectioncare.be` → **DNS → Records → Add record**.
2. Voeg elk record van Resend exact toe. Let op:
   - de naam zonder het domein erachter (dus `resend._domainkey` en `send`, niet `send.apexcollectioncare.be.apexcollectioncare.be`);
   - bij de MX de prioriteit van Resend (meestal 10);
   - **Proxy status: DNS only** (grijze wolk) waar Cloudflare die keuze toont;
   - TTL: Auto.
3. **DMARC:** bestaat er al een record op `_dmarc`, laat het dan staan en meld het. Bestaat er geen, stel dan voor
   `_dmarc` als TXT met waarde `v=DMARC1; p=none;` toe te voegen, en doe het alleen na een "ok".
4. Ga terug naar Resend en klik op **Verify DNS Records**. Het kan enkele minuten duren. Wacht tot het domein op
   **Verified** staat. Na 15 minuten nog niet? Vergelijk elk record opnieuw met wat Resend vraagt, en meld wat afwijkt.

### Stap 4: API-sleutel

1. In Resend: **API Keys → Create API Key**. Naam: `Website contactformulier`. Permission: **Sending access**.
   Domain: `apexcollectioncare.be`. Klik op Add.
2. Resend toont de sleutel **één keer**. Zeg nu aan de eigenaar: "Kopieer de sleutel zelf. Ik plak hem niet en lees
   hem niet voor." Laat het venster open tot stap 5.2 gedaan is.

### Stap 5: instellingen in Cloudflare Pages

1. Open **Workers & Pages → apex-classic-car-care → Settings → Variables and Secrets**, omgeving **Production**.
2. Voeg toe, met **Add**:
   - `RESEND_API_KEY`, type **Secret** (versleuteld). De **eigenaar** plakt de waarde zelf;
   - `MAIL_FROM`, type Text: `Website APEX <website@apexcollectioncare.be>`;
   - `MAIL_TO`, type Text: `info@apexcollectioncare.be`.
   Voeg **geen** `MAIL_DRYRUN` toe. `MAIL_BEVESTIGING` alleen als de eigenaar uitdrukkelijk vraagt dat aanvragers een
   bevestiging krijgen (dan waarde `1`).
3. Sla op. Toon de lijst van variabelen (zonder de waarde van de sleutel) en vraag een "ok".
4. Ga naar **Deployments** en kies bij de laatste **productiedeploy** → **Retry deployment**. Wacht tot de deploy klaar is.
   Variabelen gelden pas na een nieuwe deploy.

### Stap 6: testen op de live site

1. Open https://www.apexcollectioncare.be/contact/ en vul het formulier in, met:
   - naam: `Test website`;
   - telefoon: een nummer van de eigenaar (vraag welk);
   - e-mailadres: leeg laten, of een adres van de eigenaar;
   - boodschap: `Test van het formulier, mag gewist worden.`
2. Verstuur. Verwacht: de pagina **"Aanvraag ontvangen"** (`/contact/bedankt/`).
   Verschijnt "Het verzenden is niet gelukt"? Kijk in Resend → **Logs** (of **Emails**) wat er gemeld wordt, en noteer
   de foutmelding letterlijk. Kijk ook na of de deploy van stap 5.4 klaar was.
3. Vraag de eigenaar of de mail in de mailbox van info@apexcollectioncare.be aangekomen is. Kijk ook in de map spam.
   Komt hij aan, kijk dan of het onderwerp "Kennismaking aangevraagd: Test website" is en of "Antwoorden" naar het
   ingevulde e-mailadres gaat (als dat ingevuld was).
4. Staat de mail in de spam: noteer dat. Meestal helpt het om de afzender als veilig te markeren, en verbetert het
   vanzelf na enkele dagen met DKIM en DMARC.

---

### Wat ik op het einde wil

Een kort logboek in het Nederlands, met per stap: gedaan, overgeslagen (met reden) of mislukt (met de letterlijke
foutmelding), en:
- welke provider de mailbox van info@apexcollectioncare.be levert;
- de DNS-records die je toegevoegd hebt (type, naam, waarde), en welke er al stonden;
- de status van het domein in Resend, en de gekozen regio;
- de namen van de variabelen in Cloudflare Pages (**nooit** de waarde van de sleutel);
- het resultaat van de test: bedankpagina ja of nee, mail aangekomen ja of nee, in de spam ja of nee.

Geef het logboek aan de eigenaar. Die bezorgt het aan Claude Code, dat de privacyverklaring aanvult met Resend en de
mailboxprovider (taak 3), en taak 2 in `TODO-LIVEGANG.md` afsluit.
