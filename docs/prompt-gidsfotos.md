# Prompts voor Gemini: een foto per gids en dienstpagina

Elke gids en de twee dienstpagina's hebben een vaste plek voor een foto. Zet u een foto in
`src/assets/paginafotos/` met als bestandsnaam de slug van de pagina, dan verschijnt ze vanzelf bovenaan die pagina.
Ze wordt ook de deelafbeelding op LinkedIn, WhatsApp en Facebook, en de afbeelding in het schema voor Google.
Zonder foto gebruikt de site de titelkaart uit `public/og/`.

## Zo werkt u

1. Open Gemini (afbeeldingen maken). Plak eerst de **basisprompt**, en daarna in hetzelfde bericht de prompt van één pagina.
2. Vraag om een **liggende foto in 16:9**, minstens **1600 × 900 px**. Vraag eventueel om een grotere versie.
3. Kijk elke foto na met de **controlelijst** hieronder. Eén fout is genoeg om opnieuw te genereren.
4. Sla ze op als `.jpg` met exact de bestandsnaam uit de tabel, in `src/assets/paginafotos/`.
5. Toont de foto iets anders dan de alt-tekst beschrijft? Pas dan de alt-tekst aan in `src/lib/paginafotos.ts`.
6. `npm run build`, en bekijk de pagina. De foto wordt bovenaan getoond in 16:9 en voor delen bijgesneden tot 1200 × 630.
   Houd het onderwerp dus in het midden, met wat ruimte rondom.

Maak liever een paar foto's goed dan alle twintig half. De gidsen werken ook zonder foto.

## Basisprompt (altijd eerst plakken)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.
```

## Prompt per pagina

Het model is een voorstel. Kies gerust een wagen die beter bij uw klanten past, of een merk dat u zelf goed kent:
dan ziet u ook zelf meteen of de foto klopt. Pas in dat geval de alt-tekst aan in `src/lib/paginafotos.ts`.

| Bestandsnaam | Pagina | Prompt (na de basisprompt plakken) |
|---|---|---|
| `oldtimer-lez-gent-antwerpen-brussel.jpg` | Gids: oldtimers in de LEZ | Een donkergroene Mercedes-Benz 280 SL "Pagode" (W113, eind jaren zestig) met de kap open rijdt langzaam door een rustige straat met kasseien in een Vlaamse binnenstad, met bakstenen gevels en een paar fietsen tegen een muur. Ochtendlicht, geen andere wagens, geen verkeersborden met tekst. |
| `oldtimer-inschrijven.jpg` | Gids: een oldtimer inschrijven | Van dichtbij, op een houten tafel: een stapeltje papieren zonder leesbare tekst, een oude autosleutel aan een lederen sleutelhanger en een vulpen. Op de achtergrond, onscherp, de neus van een crèmekleurige Citroën DS in een garage. |
| `oldtimerkeuring.jpg` | Gids: de oldtimerkeuring | Een bordeauxrode Alfa Romeo Giulia GT Junior (Bertone-coupé, begin jaren zeventig) staat in een propere, lichte keuringshal op een rollenbank, volledig van opzij gezien. Geen nummerplaat vooraan of achteraan. Een keurder in donkere werkkledij hurkt met de rug naar de camera bij het voorwiel en schijnt met een zaklamp op de remmen. Geen schermen, borden of andere wagens. |
| `oldtimer-verzekeren.jpg` | Gids: een oldtimer verzekeren | Een oudere man, van achteren of van opzij zonder gezicht, zit aan een houten tafel in een lichte privégarage en bladert in een map met documenten zonder leesbare tekst. Op de achtergrond een MGB roadster in British racing green, met de kap open. |
| `oldtimer-laten-taxeren.jpg` | Gids: een oldtimer laten taxeren | Een zilvergrijze Porsche 911 uit de late jaren zestig (korte wielbasis, ronde koplampen, Fuchs-velgen) staat in een lichte garage, volledig van opzij gezien. Een expert in een donkere trui staat met de rug naar de camera bij het achterwiel en houdt een kleine lakdiktemeter tegen het achterscherm, met een klembord in de andere hand. Zacht zijlicht. |
| `oldtimer-restauratie-kosten.jpg` | Gids: een oldtimer laten restaureren | Een Jaguar E-Type Series 1 coupé in een verzorgd restauratieatelier, met de carrosserie volledig in lichtgrijze grondverf, de lange motorkap omhoog en één deur ernaast op een standaard. Gereedschap hangt netjes aan de wand. Geen dozen, borden, posters of verpakkingen met tekst of logo’s. Geen mensen. Warm licht door hoge ramen. |
| `oldtimer-winterklaar-maken.jpg` | Gids: een oldtimer winterklaar maken | Een klassieke Porsche 911 onder een crèmekleurige, ademende afdekhoes op maat, zodat alleen de vorm en de wielen te zien zijn, in een droge, propere garage met een bakstenen muur. Een onderhoudslader met een dunne kabel naar de voorkant. Door een raam valt winters licht binnen. |
| `oldtimer-onderhoud-weinig-rijden.jpg` | Gids: onderhoud van een oldtimer die weinig rijdt | Een MGB roadster in British racing green staat met de motorkap open in een propere, lichte garage met een bakstenen muur. Een mecanicien in een donkere overall buigt zich met de rug naar de camera over de motor, met een doek in de hand. De motor is van op afstand te zien, niet in close-up. Geen tekst op de motor, geen flessen of dozen met etiket. |
| `oldtimer-concours-rally-voorbereiden.jpg` | Gids: naar een concours of rally | Een glanzende, donkerblauwe Austin-Healey 3000 roadster wordt voorzichtig via de oprijplaat een gesloten, donkergroene autotrailer in gereden, op een grindpad voor een landhuis. Vroeg ochtendlicht. Geen tekst op de trailer. |
| `oldtimer-dossier-documenten.jpg` | Gids: het dossier van een oldtimer | Bovenaanzicht van een oude houten tafel met een geordend dossier: een open lederen map met vergeelde facturen en een klein onderhoudsboekje, waarop alleen onleesbaar handschrift en vage lijnen staan. Ernaast drie oude zwart-witfoto’s van een Citroën DS-sedan (geen break) op een landweg. Verder een oude autosleutel met een effen lederen sleutelhanger zonder opdruk, een leesbril en een potlood. Nergens leesbare woorden, cijfers of jaartallen. |
| `oldtimercollectie-overdragen.jpg` | Gids: een collectie overdragen | Een crèmekleurige Jaguar XK150 roadster staat in een ruime privégarage met eiken balken en bakstenen muren. Geen nummerplaat en geen plaathouder onder de voorbumper. Een oudere man en een jongere vrouw staan naast elkaar voor de wagen, allebei volledig met de rug naar de camera. De man legt een hand op de motorkap. Warm avondlicht. |
| `oldtimers-na-2030.jpg` | Gids: oldtimers na 2030 | Een bordeauxrode Alfa Romeo Spider "Duetto" (jaren zestig, ronde achterkant) met de kap open rijdt op een smalle landweg tussen glooiende velden en bomenrijen, zoals in de Vlaamse Ardennen. Van ver, in de late namiddag. Geen andere wagens. |
| `wax-of-keramische-coating.jpg` | Gids: wax of keramische coating | Close-up van de lange, glanzende motorkap van een donkergroene Jaguar E-Type Series 1. Eén rechterhand van één persoon brengt met een beige microvezeldoek in kleine cirkels wax aan. Alleen die ene hand en een stukje mouw zijn in beeld. In de diepe lak spiegelt zacht het licht van de garage. |
| `youngtimer.jpg` | Gids: youngtimers | Een BMW M3 (E46, begin jaren 2000) in donkergrijs metaal in een lichte, moderne garage met een betonvloer. Gezien van schuin voor, in originele staat. |
| `exclusieve-wagen-weinig-rijden.jpg` | Gids: een exclusieve wagen die weinig rijdt | Een Aston Martin DB11 coupé in donkergrijs staat in een rustige privégarage met bakstenen muren, volledig van opzij gezien. Op de vloer naast het voorwiel staat een effen zwarte onderhoudslader zonder logo of tekst. De kabel loopt zichtbaar van de lader naar de onderkant van de voorbumper en verdwijnt daar onder de wagen, zodat duidelijk is dat de wagen aan de lader hangt. Zacht licht, propere betonvloer. |
| `leder-hout-cabriodak-verzorgen.jpg` | Gids: leder, hout en cabriodak | Een donkergroene Porsche 911 Cabriolet (type 964, begin jaren negentig) met het zwarte stoffen dak gesloten, perfect van opzij gezien, in een lichte, lege garage met een betonvloer en een witte muur. Naast het voorwiel staan op de vloer een emmer en een zachte borstel. Geen mensen. Zacht daglicht. Het stoffen dak is scherp, met zijn fijne structuur en naden. |
| `diefstal-dure-wagen-voorkomen.jpg` | Gids: diefstal voorkomen | Van dichtbij: een moderne Porsche-sleutel wordt in een kleine, matte metalen doos gelegd, op een kast in een hal. Op de achtergrond, onscherp, een voordeur. Rustig avondlicht. |
| `elektrische-wagen-lang-stilstaan.jpg` | Gids: een elektrische wagen die lang stilstaat | Een Porsche Taycan in een lichte metaalkleur staat aan een laadpaal aan de muur van een moderne garage. De laadkabel is goed zichtbaar. Geen schermen met tekst. |
| `reiniging-en-coating.jpg` | Dienst: reiniging en lakbescherming | Een donkergroene Porsche 356 A coupé (eind jaren vijftig) staat in een privégarage met een eiken werkbank, volledig van opzij gezien. Zoals bij de echte 356 staat vooraan op de kofferklep alleen het Porsche-wapenschild, en staat het opschrift Porsche achteraan op de motorklep. Een persoon met de rug naar de camera droogt het dak af met een grote microvezeldoek. Op de vloer een emmer en een zachte borstel zonder opdruk. Warm licht. |
| `transport.jpg` | Dienst: transport | Een gesloten, donkergroene autotrailer met de laadklep open staat op een oprit voor een Vlaamse villa. In de trailer staat een crèmekleurige Mercedes-Benz 190 SL, vastgezet aan de wielen. Geen tekst of logo op de trailer. |

## Kant-en-klaar: opnieuw te maken (basisprompt inbegrepen)

Deze foto’s moeten opnieuw. Kopieer één blok volledig in Gemini.

### `oldtimerkeuring.jpg` (Gids: de oldtimerkeuring)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een bordeauxrode Alfa Romeo Giulia GT Junior (Bertone-coupé, begin jaren zeventig) staat in een propere, lichte keuringshal op een rollenbank, volledig van opzij gezien. Geen nummerplaat vooraan of achteraan. Een keurder in donkere werkkledij hurkt met de rug naar de camera bij het voorwiel en schijnt met een zaklamp op de remmen. Geen schermen, borden of andere wagens.
```

### `oldtimer-dossier-documenten.jpg` (Gids: het dossier van een oldtimer)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Bovenaanzicht van een oude houten tafel met een geordend dossier: een open lederen map met vergeelde facturen en een klein onderhoudsboekje, waarop alleen onleesbaar handschrift en vage lijnen staan. Ernaast drie oude zwart-witfoto’s van een Citroën DS-sedan (geen break) op een landweg. Verder een oude autosleutel met een effen lederen sleutelhanger zonder opdruk, een leesbril en een potlood. Nergens leesbare woorden, cijfers of jaartallen.
```

### `oldtimer-onderhoud-weinig-rijden.jpg` (Gids: onderhoud van een oldtimer die weinig rijdt)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een MGB roadster in British racing green staat met de motorkap open in een propere, lichte garage met een bakstenen muur. Een mecanicien in een donkere overall buigt zich met de rug naar de camera over de motor, met een doek in de hand. De motor is van op afstand te zien, niet in close-up. Geen tekst op de motor, geen flessen of dozen met etiket.
```

### `reiniging-en-coating.jpg` (Dienst: reiniging en lakbescherming)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een donkergroene Porsche 356 A coupé (eind jaren vijftig) staat in een privégarage met een eiken werkbank, volledig van opzij gezien. Zoals bij de echte 356 staat vooraan op de kofferklep alleen het Porsche-wapenschild, en staat het opschrift Porsche achteraan op de motorklep. Een persoon met de rug naar de camera droogt het dak af met een grote microvezeldoek. Op de vloer een emmer en een zachte borstel zonder opdruk. Warm licht.
```

### `exclusieve-wagen-weinig-rijden.jpg` (Gids: een exclusieve wagen die weinig rijdt)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een Aston Martin DB11 coupé in donkergrijs staat in een rustige privégarage met bakstenen muren, volledig van opzij gezien. Op de vloer naast het voorwiel staat een effen zwarte onderhoudslader zonder logo of tekst. De kabel loopt zichtbaar van de lader naar de onderkant van de voorbumper en verdwijnt daar onder de wagen, zodat duidelijk is dat de wagen aan de lader hangt. Zacht licht, propere betonvloer.
```

### `oldtimer-restauratie-kosten.jpg` (Gids: een oldtimer laten restaureren)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een Jaguar E-Type Series 1 coupé in een verzorgd restauratieatelier, met de carrosserie volledig in lichtgrijze grondverf, de lange motorkap omhoog en één deur ernaast op een standaard. Gereedschap hangt netjes aan de wand. Geen dozen, borden, posters of verpakkingen met tekst of logo’s. Geen mensen. Warm licht door hoge ramen.
```

### `wax-of-keramische-coating.jpg` (Gids: wax of keramische coating)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Close-up van de lange, glanzende motorkap van een donkergroene Jaguar E-Type Series 1. Eén rechterhand van één persoon brengt met een beige microvezeldoek in kleine cirkels wax aan. Alleen die ene hand en een stukje mouw zijn in beeld. In de diepe lak spiegelt zacht het licht van de garage.
```

### `oldtimercollectie-overdragen.jpg` (Gids: een collectie overdragen)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een crèmekleurige Jaguar XK150 roadster staat in een ruime privégarage met eiken balken en bakstenen muren. Geen nummerplaat en geen plaathouder onder de voorbumper. Een oudere man en een jongere vrouw staan naast elkaar voor de wagen, allebei volledig met de rug naar de camera. De man legt een hand op de motorkap. Warm avondlicht.
```

### `oldtimer-laten-taxeren.jpg` (Gids: een oldtimer laten taxeren)

```
Maak een fotorealistische, liggende foto in 16:9 (minstens 1600 x 900 px) voor een rustige, verzorgde website voor eigenaars van klassieke en exclusieve wagens in Vlaanderen. Natuurlijk, zacht en warm licht, ingetogen kleuren, echte materialen (hout, leder, baksteen, beton). Rustige compositie met het onderwerp in het midden en ruimte rondom. Geen HDR, geen dramatische effecten. Het moet eruitzien als een foto van een goede fotograaf.

De wagen is exact het genoemde model en bouwjaar, zoals het in werkelijkheid bestaat: juiste verhoudingen, carrosserielijnen, grille, koplampen, velgen, en het embleem en opschrift alleen op de plaatsen waar ze bij het echte model zitten. Originele staat, geen tuning. Liefhebbers zien elke fout: kies liever een eenvoudige compositie die klopt.

Strikt verboden:
- nummerplaten in welke vorm ook, ook geen lege plaat en geen plaathouder;
- leesbare tekst, cijfers, jaartallen of logo's, behalve het embleem en opschrift van de wagen zelf; ook niet op papieren, dozen, flessen, gereedschap of toestellen;
- gezichten, ook niet en profil: mensen staan volledig met de rug naar de camera, of alleen hun handen zijn in beeld;
- andere wagens in de achtergrond.

Omgeving: Belgisch of Vlaams, met bakstenen muren, eiken balken of een privégarage bij een villa.

Onderwerp:
Een zilvergrijze Porsche 911 uit de late jaren zestig (korte wielbasis, ronde koplampen, Fuchs-velgen) staat in een lichte garage, volledig van opzij gezien. Een expert in een donkere trui staat met de rug naar de camera bij het achterwiel en houdt een kleine lakdiktemeter tegen het achterscherm, met een klembord in de andere hand. Zacht zijlicht.
```

## Controlelijst per foto

- [ ] Het model klopt: carrosserielijnen, grille, koplampen, velgen, spiegels en interieur horen bij dat model en bouwjaar. Leg de foto naast een echte foto van het model.
- [ ] Het embleem en het merklogo zijn scherp, juist gespeld en staan op de juiste plaats. Een vervormd of verzonnen logo verraadt meteen een AI-beeld.
- [ ] Geen logo's van andere bedrijven (garages, dealers, verzekeraars, evenementen).
- [ ] Geen nummerplaat, ook geen lege, onscherpe of half zichtbare plaat. Kijk vooraan, achteraan en in spiegelingen.
- [ ] Geen leesbare tekst, cijfers of watermerk. Kijk ook naar papieren, schermen en meters.
- [ ] Geen herkenbaar gezicht.
- [ ] Geen rare details: vervormde handen, wielen die niet rond zijn, spiegels of deurgrepen op vreemde plaatsen.
- [ ] De foto klopt met de pagina en met de alt-tekst in `src/lib/paginafotos.ts`.
- [ ] Liggend, minstens 1600 × 900 px, met het onderwerp in het midden.

Twijfelt u aan een detail? Genereer opnieuw, of vraag Gemini dat ene detail te verbeteren ("maak de grille zoals bij een echte 280 SL Pagode"). Een fout model is erger dan geen foto.

Een foto toont een wagen van een merk, niet een samenwerking. Zet het merk dus niet in de tekst als partner, en gebruik geen merklogo los, als beeldmerk of naast uw eigen logo.
