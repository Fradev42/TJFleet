# Prompt voor de Claude-extensie in Chrome: schrijfrechten van Claude op GitHub herstellen

**Zo gebruikt u deze prompt**
- Open Chrome en log in op GitHub met het account dat eigenaar is van `Fradev42/TJFleet`, en op claude.ai.
- Houd uw telefoon bij de hand voor tweestapsverificatie.
- Plak alles vanaf "Je taak" in de Claude-extensie en kijk mee.

---

## Je taak

Claude Code (in de cloud) kan de repository **Fradev42/TJFleet** lezen, maar niet meer schrijven. Elke push en elke
schrijfactie via de GitHub-koppeling geeft **403** ("Resource not accessible by integration"). Zoek uit waarom, en help
de eigenaar het te herstellen. Werk de stappen in volgorde af en houd een logboek bij.

### Spelregels

**Stop en vraag het aan de eigenaar** wanneer er ingelogd moet worden, een code nodig is, of je op een knop wilt
klikken die rechten geeft, goedkeurt, installeert of opslaat. Toon eerst wat je gaat aanklikken.

**Nooit:**
- de Claude-app verwijderen, deïnstalleren of "Suspend" kiezen;
- toegang geven tot andere repositories dan `TJFleet`, tenzij de eigenaar dat uitdrukkelijk vraagt;
- rulesets, branch protection, deploy keys, secrets of collaborators wijzigen of verwijderen (in stap 3 alleen kijken);
- iets in de repository aanpassen of committen;
- iets betalen of een plan wijzigen.

### Stap 1: is de Claude-app geïnstalleerd, en op welke repositories?

1. Open https://github.com/settings/installations (bij een organisatie: *Organization → Settings → GitHub Apps*).
2. Zoek **Claude** in de lijst. Staat hij er niet? Noteer dat en ga naar stap 4.
3. Klik op **Configure** en noteer:
   - staat er een gele melding zoals "Claude is requesting updated permissions" of een knop **Review request**?
   - **Repository access**: "All repositories", of "Only select repositories"? Staat `TJFleet` in de lijst?
   - Staat de app op **Suspended**?
4. Toon wat je ziet aan de eigenaar.

### Stap 2: rechten in orde brengen

1. Is er een **Review request** of melding over nieuwe rechten: open ze, toon welke rechten gevraagd worden, en laat de
   eigenaar op **Accept new permissions** klikken.
2. Staat **Only select repositories** aan en ontbreekt `TJFleet`: stel voor `TJFleet` toe te voegen via
   **Select repositories**. Klik op **Save** pas na een "ok".
3. Staat de app op Suspended: laat de eigenaar kiezen of hij hem weer activeert (**Unsuspend**).
4. Bekijk onder **Permissions** of **Contents** op **Read and write** staat. Kun je dat hier niet zien of wijzigen, noteer
   het dan: het wordt in stap 4 opnieuw gevraagd.

### Stap 3: alleen kijken, zonder iets te wijzigen

1. Open https://github.com/Fradev42/TJFleet/settings/rules. Noteer elke ruleset: naam, status (Active, Disabled),
   op welke branches hij geldt, en of `claude/oldtimer-website` erdoor geraakt wordt. Wijzig niets.
2. Open https://github.com/Fradev42/TJFleet/settings/branches en noteer of er een oude *branch protection rule* staat.

### Stap 4: koppeling opnieuw maken

1. Open https://claude.ai/connect-github en laat de eigenaar GitHub opnieuw koppelen. Vraagt GitHub toestemming voor de
   Claude-app, toon de gevraagde rechten en laat de eigenaar op **Authorize** of **Install** klikken.
2. Vraagt GitHub op welke repositories: kies **Only select repositories** → `TJFleet`, tenzij de eigenaar iets anders
   wil.
3. Open daarna opnieuw https://github.com/settings/installations → Claude → Configure en controleer dat `TJFleet` erbij
   staat en dat er geen openstaande Review request meer is.

### Wat ik op het einde wil

Een kort logboek in het Nederlands, met per stap wat je zag en wat er veranderd is, en:
- of de Claude-app geïnstalleerd is, en op welke repositories;
- of er een Review request was, en of die aanvaard is;
- de rulesets en branch protection uit stap 3 (alleen beschrijven).

Zeg daarna tegen de eigenaar: "Schrijf in Claude Code: try again". Werkt het daarna nog niet, dan start de eigenaar
een nieuwe Claude Code-sessie met deze repository: de rechten worden bij de start van een sessie opgehaald.
