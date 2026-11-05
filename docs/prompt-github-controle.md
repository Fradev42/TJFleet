# Prompt voor de Claude-extensie in Chrome: automatische controle in GitHub (taak 15)

**Zo gebruikt u deze prompt**
- Open Chrome en log in op GitHub met het account dat eigenaar is van de repository `Fradev42/TJFleet`, en op het Cloudflare-dashboard.
- Houd uw telefoon bij de hand voor tweestapsverificatie.
- Plak alles vanaf "Je taak" in de Claude-extensie en kijk mee. De extensie stopt telkens als u iets moet doen of beslissen.

---

## Je taak

Je helpt de eigenaar van **APEX Collection Care** om de automatische controle van de website af te werken. De website
staat in de GitHub-repository **Fradev42/TJFleet** en wordt gehost op **Cloudflare Pages** (project
`apex-classic-car-care`, live op https://www.apexcollectioncare.be). Bij elke push draait in GitHub Actions de workflow
**"Controle"** (job `site`): build, formuliertests en een SEO- en linkcontrole. Op de 1e van elke maand controleert hij ook
de externe links.

Er zijn twee delen. **Deel A** is klein en veilig. **Deel B** verandert hoe wijzigingen live gaan en is optioneel: begin er
pas aan als de eigenaar uitdrukkelijk "ja, deel B" zegt.

### Spelregels: lees dit eerst

**Stop en vraag het aan de eigenaar**, in één duidelijke zin, telkens wanneer:
- er ingelogd moet worden, of een wachtwoord, code of tweestapsverificatie nodig is;
- je een instelling wilt opslaan die bepaalt wat er live staat (deel B, stappen 2 tot 5): toon eerst wat je gaat kiezen;
- iets er anders uitziet dan in deze prompt staat, bijvoorbeeld als er al een branch `main` bestaat, of als de productiebranch in Cloudflare niet `claude/oldtimer-website` is;
- je twijfelt.

**Nooit:**
- iets betalen, een betaald plan of proefperiode kiezen;
- een branch, repository, workflow, deploy of Cloudflare-project verwijderen;
- bestanden in de repository aanpassen of committen;
- de instellingen voor *Secrets and variables*, *Deploy keys* of *Collaborators* openen of wijzigen;
- in deel B de regel voor `main` opslaan voordat stap 4 gelukt is: anders kan de site niet meer bijgewerkt worden.

---

### Deel A: e-mail krijgen als de controle mislukt

1. Open https://github.com/Fradev42/TJFleet/actions. Kijk of de laatste runs van "Controle" groen zijn. Noteer de datum en
   de uitkomst van de laatste run.
2. Open https://github.com/settings/notifications. Zoek het blok **System → Actions**, of **Actions** in de lijst.
3. Zet de meldingen voor Actions aan via **Email**, en kies **"Only notify for failed workflows"** (alleen bij mislukte
   workflows). Sla op als er een knop is.
4. Kijk bovenaan bij **Default notifications email** naar welk adres GitHub mailt. Vraag de eigenaar of dat het juiste
   adres is. Zo niet: laat de eigenaar het zelf aanpassen.
5. Open https://github.com/Fradev42/TJFleet en kijk rechtsboven bij **Watch**: staat het op "Ignore", dan komen er geen
   meldingen. Zet het dan op **Participating and @mentions** (of "All activity" als de eigenaar dat verkiest).
6. Optioneel, alleen als de eigenaar het vraagt: open de workflow "Controle" in Actions en kies **Run workflow** op de
   branch `claude/oldtimer-website`. Zo loopt ook de controle van de externe links meteen een keer. Meld het resultaat.
   Staat een link als "Kapot" in de uitvoer, noteer hem: die bron moet in de gids vervangen worden.

Deel A is klaar. Vraag nu: **"Wilt u ook deel B doen: een vaste productiebranch `main`, zodat een wijziging pas live gaat
na een groene controle?"** Leg uit wat dat betekent (zie hieronder) en wacht op een duidelijk ja.

---

### Deel B (optioneel): productiebranch `main` met verplichte groene controle

**Wat verandert er voor de eigenaar:** vandaag gaat elke push naar `claude/oldtimer-website` meteen live. Na deel B gaat
alleen `main` live. Een wijziging komt eerst op `claude/oldtimer-website`, met een previewadres in Cloudflare. Daarna
wordt ze via een pull request in `main` samengevoegd, en dat kan pas als de controle groen is. Claude Code kan zo'n pull
request op vraag aanmaken; de eigenaar klikt dan op **Merge**.

1. **Nakijken.** Open https://github.com/Fradev42/TJFleet/branches. Bestaat er al een branch `main`? Dan stop je en
   vraag je de eigenaar wat ermee moet. Open in Cloudflare *Workers & Pages → apex-classic-car-care → Settings → Builds*
   (of *Builds & deployments*) en noteer de huidige **Production branch**. Verwacht: `claude/oldtimer-website`. Is het iets
   anders, stop en vraag het.
2. **Branch `main` maken.** Op de pagina *Branches*: **New branch**, naam `main`, bron `claude/oldtimer-website`. Toon de
   keuze aan de eigenaar en maak hem na een "ok".
3. **Standaardbranch.** *Settings → General → Default branch*: wijzig naar `main` en bevestig. Vraag eerst een "ok".
4. **Cloudflare.** In de instellingen van stap 1: zet **Production branch** op `main`. Laat **Preview branches** op
   "All non-Production branches" staan. Vraag eerst een "ok" en sla dan op. Open daarna *Deployments* en wacht tot er een
   productiedeploy van `main` klaar is. Staat er geen, kies dan bij de laatste deploy van `main` **Retry deployment**, of
   vraag de eigenaar. Controleer daarna dat https://www.apexcollectioncare.be gewoon laadt en de juiste site toont.
   **Lukt dit niet, zet de Production branch dan terug op `claude/oldtimer-website`, stop, en meld het.**
5. **Regel voor `main`.** Open *Settings → Rules → Rulesets* → **New ruleset → New branch ruleset**:
   - naam: `main beschermen`, Enforcement status: **Active**;
   - Target branches: **Add target → Include default branch**;
   - aanvinken: **Restrict deletions**, **Block force pushes**, **Require a pull request before merging** (aantal
     goedkeuringen op **0** laten, zodat de eigenaar zelf kan samenvoegen), en **Require status checks to pass** met de
     check **`site`** (zoek op "site"; verschijnt hij niet, kies dan de check van de workflow "Controle");
   - **Bypass list** leeg laten, tenzij de eigenaar vraagt zichzelf toe te voegen.
   Toon de volledige instelling aan de eigenaar en sla pas op na een "ok".
6. **Testen.** Open https://github.com/Fradev42/TJFleet/compare/main...claude/oldtimer-website. Staat er "There isn't
   anything to compare", dan is alles in orde: beide branches zijn gelijk. Maak geen pull request aan.

---

### Wat ik op het einde wil

Een kort logboek in het Nederlands, met per stap: gedaan, overgeslagen (met reden) of mislukt (met de foutmelding), en:
- de uitkomst en datum van de laatste run van "Controle";
- naar welk e-mailadres GitHub meldingen stuurt (alleen het domein of de eerste letters, niet het volledige adres);
- bij deel B: de productiebranch in Cloudflare, de standaardbranch in GitHub, en de instellingen van de ruleset.

Geef het logboek aan de eigenaar. Die bezorgt het aan Claude Code, dat taak 15 in `TODO-LIVEGANG.md` bijwerkt en,
als deel B gedaan is, voortaan via pull requests naar `main` werkt.
