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
Maak een fotorealistische, liggende foto in 16:9, geschikt als hoofdfoto op een rustige, verzorgde website
voor eigenaars van klassieke en exclusieve wagens in Vlaanderen.

Stijl: natuurlijk licht, zacht en warm, ingetogen kleuren. Crème, warm beige, diepgroen en een accent van
donker bordeauxrood passen goed. Echte materialen: hout, leder, beton, baksteen. Rustige compositie met het
onderwerp in het midden en wat ruimte rondom, zodat de foto bijgesneden kan worden. Geen dramatische effecten,
geen neonlicht, geen overdreven glans, geen HDR-look. Ziet eruit als een foto van een goede fotograaf, niet als
een render of een reclame.

Het model: maak exact het model dat ik hieronder noem, zoals het in de echte wereld bestaat. Juiste
verhoudingen, carrosserielijnen, grille, koplampen, velgen, embleem en merklogo op de juiste plaats en in de
juiste vorm voor dat bouwjaar. Liefhebbers zien elke fout, dus liever een eenvoudige compositie die klopt dan
een spectaculaire die niet klopt. Toon de wagen in originele staat, zonder tuning of moderne aanpassingen.

Verboden:
- nummerplaten, in welke vorm ook: geen plaat met tekst, geen lege of onscherpe plaat, geen plaathouder. De wagen
  heeft vooraan en achteraan gewoon geen plaat, zoals een wagen op een concours of in een showroom;
- andere leesbare tekst, schermen met tekst, watermerken, handtekeningen. Het merklogo en het typeplaatje van
  de wagen zelf mogen wel;
- herkenbare gezichten. Mensen mogen alleen van achteren, van opzij zonder gezicht, of als handen in beeld komen;
- logo's van garages, dealers, verzekeraars, evenementen of andere bedrijven;
- bekende gebouwen of plaatsen die u kunt herkennen.

De omgeving voelt Belgisch of Vlaams aan: bakstenen gevels, een privégarage bij een villa, landwegen met bomen.
```

## Prompt per pagina

Het model is een voorstel. Kies gerust een wagen die beter bij uw klanten past, of een merk dat u zelf goed kent:
dan ziet u ook zelf meteen of de foto klopt. Pas in dat geval de alt-tekst aan in `src/lib/paginafotos.ts`.

| Bestandsnaam | Pagina | Prompt (na de basisprompt plakken) |
|---|---|---|
| `oldtimer-lez-gent-antwerpen-brussel.jpg` | Gids: oldtimers in de LEZ | Een donkergroene Mercedes-Benz 280 SL "Pagode" (W113, eind jaren zestig) met de kap open rijdt langzaam door een rustige straat met kasseien in een Vlaamse binnenstad, met bakstenen gevels en een paar fietsen tegen een muur. Ochtendlicht, geen andere wagens, geen verkeersborden met tekst. |
| `oldtimer-inschrijven.jpg` | Gids: een oldtimer inschrijven | Van dichtbij, op een houten tafel: een stapeltje papieren zonder leesbare tekst, een oude autosleutel aan een lederen sleutelhanger en een vulpen. Op de achtergrond, onscherp, de neus van een crèmekleurige Citroën DS in een garage. |
| `oldtimerkeuring.jpg` | Gids: de oldtimerkeuring | Een bordeauxrode Alfa Romeo Giulia GT Junior (Bertone-coupé, jaren zeventig) staat in een propere keuringshal met een rollenbank, gezien van schuin voor. Een keurder in werkkledij, van achteren gezien, met een zaklamp bij het voorwiel. Geen schermen of borden met tekst. |
| `oldtimer-verzekeren.jpg` | Gids: een oldtimer verzekeren | Een oudere man, van achteren of van opzij zonder gezicht, zit aan een houten tafel in een lichte privégarage en bladert in een map met documenten zonder leesbare tekst. Op de achtergrond een MGB roadster in British racing green, met de kap open. |
| `oldtimer-laten-taxeren.jpg` | Gids: een oldtimer laten taxeren | Een expert in een donkere trui, van opzij zonder gezicht, bekijkt met een klembord en een lakdiktemeter de flank van een zilvergrijze Porsche 911 uit de late jaren zestig (korte wielbasis, ronde koplampen, Fuchs-velgen). Lichte garage, zacht zijlicht. |
| `oldtimer-restauratie-kosten.jpg` | Gids: een oldtimer laten restaureren | Een Jaguar E-Type Series 1 coupé in een verzorgd restauratieatelier, met de carrosserie deels in grijze grondverf, de lange motorkap open en de deuren ernaast op standaards. Gereedschap netjes aan de wand, warm licht. Geen mensen of alleen handen. |
| `oldtimer-winterklaar-maken.jpg` | Gids: een oldtimer winterklaar maken | Een klassieke Porsche 911 onder een crèmekleurige, ademende afdekhoes op maat, zodat alleen de vorm en de wielen te zien zijn, in een droge, propere garage met een bakstenen muur. Een onderhoudslader met een dunne kabel naar de voorkant. Door een raam valt winters licht binnen. |
| `oldtimer-onderhoud-weinig-rijden.jpg` | Gids: onderhoud van een oldtimer die weinig rijdt | Van dichtbij: handen in werkhandschoenen trekken de oliepeilstok uit de motor van een MGB roadster. Een propere, originele motorruimte. Zacht licht, ondiepe scherptediepte. |
| `oldtimer-concours-rally-voorbereiden.jpg` | Gids: naar een concours of rally | Een glanzende, donkerblauwe Austin-Healey 3000 roadster wordt voorzichtig via de oprijplaat een gesloten, donkergroene autotrailer in gereden, op een grindpad voor een landhuis. Vroeg ochtendlicht. Geen tekst op de trailer. |
| `oldtimer-dossier-documenten.jpg` | Gids: het dossier van een oldtimer | Bovenaanzicht van een houten tafel met een geordend dossier: een lederen map, oude zwart-witfoto's van een Citroën DS, een onderhoudsboekje en enkele facturen, allemaal zonder leesbare tekst. Een autosleutel en een leesbril ernaast. |
| `oldtimercollectie-overdragen.jpg` | Gids: een collectie overdragen | Een oudere man en een jongere vrouw, van achteren gezien, staan samen voor een crèmekleurige Jaguar XK150 in een ruime privégarage met houten balken. De man legt een hand op de motorkap. Warm avondlicht. |
| `oldtimers-na-2030.jpg` | Gids: oldtimers na 2030 | Een bordeauxrode Alfa Romeo Spider "Duetto" (jaren zestig, ronde achterkant) met de kap open rijdt op een smalle landweg tussen glooiende velden en bomenrijen, zoals in de Vlaamse Ardennen. Van ver, in de late namiddag. Geen andere wagens. |
| `wax-of-keramische-coating.jpg` | Gids: wax of keramische coating | Van dichtbij: een hand met een microvezeldoek brengt wax aan op de lange motorkap van een donkergroene Jaguar E-Type. In de diepe, glanzende lak spiegelt zacht het licht van de garage. |
| `youngtimer.jpg` | Gids: youngtimers | Een BMW M3 (E46, begin jaren 2000) in donkergrijs metaal in een lichte, moderne garage met een betonvloer. Gezien van schuin voor, in originele staat. |
| `exclusieve-wagen-weinig-rijden.jpg` | Gids: een exclusieve wagen die weinig rijdt | Een Aston Martin DB11 in donkergrijs staat in een rustige privégarage, met een onderhoudslader op een plank en een dunne kabel naar de wagen. Zacht licht, propere betonvloer. |
| `leder-hout-cabriodak-verzorgen.jpg` | Gids: leder, hout en cabriodak | Interieur van een Jaguar XJS Convertible uit de jaren negentig, met lichtbruine lederen zetels en een houten dashboard. Een hand met een zachte borstel reinigt de bestuurderszetel. Zacht zonlicht. |
| `diefstal-dure-wagen-voorkomen.jpg` | Gids: diefstal voorkomen | Van dichtbij: een moderne Porsche-sleutel wordt in een kleine, matte metalen doos gelegd, op een kast in een hal. Op de achtergrond, onscherp, een voordeur. Rustig avondlicht. |
| `elektrische-wagen-lang-stilstaan.jpg` | Gids: een elektrische wagen die lang stilstaat | Een Porsche Taycan in een lichte metaalkleur staat aan een laadpaal aan de muur van een moderne garage. De laadkabel is goed zichtbaar. Geen schermen met tekst. |
| `reiniging-en-coating.jpg` | Dienst: reiniging en lakbescherming | Een donkergroene Porsche 356 coupé in een privégarage wordt met de hand gereinigd: een persoon, van achteren gezien, droogt het dak af met een grote microvezeldoek. Een emmer en zachte borstels op de vloer. Warm licht. |
| `transport.jpg` | Dienst: transport | Een gesloten, donkergroene autotrailer met de laadklep open staat op een oprit voor een Vlaamse villa. In de trailer staat een crèmekleurige Mercedes-Benz 190 SL, vastgezet aan de wielen. Geen tekst of logo op de trailer. |

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
