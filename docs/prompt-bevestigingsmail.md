# Prompt voor de Claude-extensie in Chrome: bevestigingsmail aanzetten (taak 14)

**Zo gebruikt u deze prompt**
- Open Chrome en log in op het Cloudflare-dashboard.
- Houd een e-mailadres bij de hand waarop u de test kunt ontvangen, en de mailbox van info@apexcollectioncare.be.
- Plak alles vanaf "Je taak" in de Claude-extensie en kijk mee.

---

## Je taak

Je helpt de eigenaar van **APEX Collection Care** om de bevestigingsmail van het kennismakingsformulier aan te zetten.
Wie op https://www.apexcollectioncare.be/contact/ het formulier invult met een e-mailadres, krijgt dan automatisch een
korte bevestiging: "We bellen u binnen één werkdag terug". De code is klaar. Er is alleen één variabele nodig in
Cloudflare Pages (project `apex-classic-car-care`), en daarna een nieuwe deploy.

### Spelregels

**Stop en vraag het aan de eigenaar** wanneer er ingelogd moet worden of een code nodig is, en voordat je iets opslaat of
een deploy start. Toon eerst wat je gaat doen.

**Nooit:**
- de waarde van `RESEND_API_KEY` bekijken, kopiëren, wijzigen of verwijderen;
- andere variabelen wijzigen of verwijderen dan `MAIL_BEVESTIGING`;
- `MAIL_DRYRUN` toevoegen;
- een deploy terugdraaien, of de Production branch of andere build-instellingen wijzigen;
- iets betalen of een plan wijzigen.

### Stap 1: variabele toevoegen

1. Open **Workers & Pages → apex-classic-car-care → Settings → Variables and Secrets**.
2. Kies de omgeving **Production**.
3. Noteer welke variabelen er staan, alleen de namen. Verwacht: `RESEND_API_KEY` (Secret), `MAIL_FROM`, `MAIL_TO`.
   Staat er `MAIL_DRYRUN`, stop dan en meld het aan de eigenaar: dan wordt er niets verstuurd.
4. Staat `MAIL_BEVESTIGING` er al: zet de waarde op `1`. Anders: **Add** → naam `MAIL_BEVESTIGING`, type **Text**,
   waarde `1`.
5. Toon de instelling aan de eigenaar en sla op na een "ok".

### Stap 2: nieuwe deploy

Een variabele geldt pas na een nieuwe deploy.

1. Open **Deployments**. Zoek de bovenste deploy met **Production** en branch `main`.
2. Kies bij die deploy **⋯ → Retry deployment**. Vraag eerst een "ok".
3. Wacht tot de deploy op **Success** staat. Dat duurt meestal één tot drie minuten.

### Stap 3: testen

1. Open https://www.apexcollectioncare.be/contact/ en vul het formulier in:
   - naam: `Test bevestiging`;
   - telefoon: een nummer van de eigenaar (vraag welk);
   - e-mailadres: het testadres dat de eigenaar opgeeft;
   - boodschap: `Test van de bevestigingsmail, mag gewist worden.`
2. Verstuur. Verwacht: de pagina **"Aanvraag ontvangen"**.
3. Vraag de eigenaar om in twee mailboxen te kijken, ook in de spam:
   - **het testadres:** een mail met als onderwerp "Uw aanvraag bij APEX Collection Care is goed ontvangen";
   - **info@apexcollectioncare.be:** de gewone melding "Kennismaking aangevraagd: Test bevestiging".
4. Komt de bevestiging niet aan, terwijl de melding bij info@ wel aankomt: kijk in Resend → **Emails** of **Logs**
   naar de bevestiging, en noteer de status of foutmelding letterlijk.

### Wat ik op het einde wil

Een kort logboek in het Nederlands: welke variabelen er stonden (alleen de namen), of `MAIL_BEVESTIGING` op `1` staat,
of de deploy gelukt is, en of beide testmails aangekomen zijn (en of ze in de spam stonden).

Geef het logboek aan de eigenaar. Die bezorgt het aan Claude Code, dat taak 14 in `TODO-LIVEGANG.md` afsluit.
