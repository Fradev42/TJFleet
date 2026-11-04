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

Strikt verboden:
- merklogo's, emblemen, merknamen of herkenbare grilles van bestaande merken. De wagens zijn fictief en
  merkloos, maar wel geloofwaardig voor hun tijd;
- nummerplaten met tekst of cijfers. Laat de plaat weg of toon ze leeg en onscherp;
- leesbare tekst, cijfers, schermen met tekst, watermerken, handtekeningen;
- herkenbare gezichten. Mensen mogen alleen van achteren, van opzij zonder gezicht, of als handen in beeld komen;
- bekende gebouwen of plaatsen die u kunt herkennen.

De omgeving voelt Belgisch of Vlaams aan: bakstenen gevels, een privégarage bij een villa, landwegen met bomen.
```

## Prompt per pagina

| Bestandsnaam | Pagina | Prompt (na de basisprompt plakken) |
|---|---|---|
| `oldtimer-lez-gent-antwerpen-brussel.jpg` | Gids: oldtimers in de LEZ | Een donkergroene klassieke sedan uit de jaren zestig rijdt langzaam door een rustige straat met kasseien in een Vlaamse binnenstad, met bakstenen gevels en een paar fietsen tegen een muur. Ochtendlicht, geen andere wagens, geen verkeersborden met tekst. |
| `oldtimer-inschrijven.jpg` | Gids: een oldtimer inschrijven | Van dichtbij, op een houten tafel: een stapeltje papieren zonder leesbare tekst, een lege, onbedrukte nummerplaat, een lederen sleutelhanger met een oude autosleutel en een vulpen. Op de achtergrond, onscherp, de neus van een crèmekleurige klassieke wagen in een garage. |
| `oldtimerkeuring.jpg` | Gids: de oldtimerkeuring | Een bordeauxrode klassieke coupé uit de jaren zeventig staat in een propere keuringshal met een rollenbank, gezien van schuin voor. Een keurder in werkkledij, van achteren gezien, met een zaklamp bij het voorwiel. Geen schermen of borden met tekst. |
| `oldtimer-verzekeren.jpg` | Gids: een oldtimer verzekeren | Een oudere man, van achteren of van opzij zonder gezicht, zit aan een houten tafel in een lichte privégarage en bladert in een map met documenten zonder leesbare tekst. Op de achtergrond een donkergroene klassieke cabriolet. |
| `oldtimer-laten-taxeren.jpg` | Gids: een oldtimer laten taxeren | Een expert in een donkere trui, van opzij zonder gezicht, bekijkt met een klembord en een lakdiktemeter de flank van een zilvergrijze klassieke sportwagen uit de jaren zestig. Lichte garage, zacht zijlicht. |
| `oldtimer-restauratie-kosten.jpg` | Gids: een oldtimer laten restaureren | Een klassieke wagen in een verzorgd restauratieatelier, met de carrosserie deels in grijze grondverf, de deuren en motorkap ernaast op standaards. Gereedschap netjes aan de wand, warm licht. Geen mensen of alleen handen. |
| `oldtimer-winterklaar-maken.jpg` | Gids: een oldtimer winterklaar maken | Een klassieke wagen onder een crèmekleurige, ademende afdekhoes op maat, in een droge, propere garage met een bakstenen muur. Een onderhoudslader met een dunne kabel naar de motorkap. Door een raam valt winters licht binnen. |
| `oldtimer-onderhoud-weinig-rijden.jpg` | Gids: onderhoud van een oldtimer die weinig rijdt | Van dichtbij: handen in werkhandschoenen trekken de oliepeilstok uit de motor van een klassieke wagen. Een propere, oude motorruimte met verchroomde onderdelen. Zacht licht, ondiepe scherptediepte. |
| `oldtimer-concours-rally-voorbereiden.jpg` | Gids: naar een concours of rally | Een glanzende, donkerblauwe klassieke roadster wordt voorzichtig via de oprijplaat een gesloten, donkergroene autotrailer in gereden, op een grindpad voor een landhuis. Vroeg ochtendlicht. Geen tekst op de trailer. |
| `oldtimer-dossier-documenten.jpg` | Gids: het dossier van een oldtimer | Bovenaanzicht van een houten tafel met een geordend dossier: een lederen map, oude zwart-witfoto's van een klassieke wagen, een onderhoudsboekje en enkele facturen, allemaal zonder leesbare tekst. Een autosleutel en een leesbril ernaast. |
| `oldtimercollectie-overdragen.jpg` | Gids: een collectie overdragen | Een oudere man en een jongere vrouw, van achteren gezien, staan samen voor een crèmekleurige klassieke wagen in een ruime privégarage met houten balken. De man legt een hand op de motorkap. Warm avondlicht. |
| `oldtimers-na-2030.jpg` | Gids: oldtimers na 2030 | Een bordeauxrode klassieke cabriolet rijdt op een smalle landweg tussen glooiende velden en bomenrijen, zoals in de Vlaamse Ardennen. Van ver, in de late namiddag. Geen andere wagens. |
| `wax-of-keramische-coating.jpg` | Gids: wax of keramische coating | Van dichtbij: een hand met een microvezeldoek brengt wax aan op de diepe, glanzende lak van een donkergroene wagen. In de lak spiegelt zacht het licht van de garage. Geen logo's of embleem in beeld. |
| `youngtimer.jpg` | Gids: youngtimers | Een sportieve coupé uit de jaren negentig, fictief en merkloos, in een lichte, moderne garage met een betonvloer. Gezien van schuin voor, in een donkere metaalkleur. Geen nummerplaat. |
| `exclusieve-wagen-weinig-rijden.jpg` | Gids: een exclusieve wagen die weinig rijdt | Een moderne, fictieve grand tourer in donkergrijs staat in een rustige privégarage, met een onderhoudslader op een plank en een dunne kabel naar de wagen. Zacht licht, propere betonvloer. Geen merktekens. |
| `leder-hout-cabriodak-verzorgen.jpg` | Gids: leder, hout en cabriodak | Interieur van een klassieke cabriolet met cognackleurige lederen zetels en een houten dashboard met ronde meters zonder leesbare cijfers. Een hand met een zachte borstel reinigt de zetel. Zacht zonlicht. |
| `diefstal-dure-wagen-voorkomen.jpg` | Gids: diefstal voorkomen | Van dichtbij: een moderne autosleutel zonder logo wordt in een kleine, matte metalen doos gelegd, op een kast in een hal. Op de achtergrond, onscherp, een voordeur. Rustig avondlicht. |
| `elektrische-wagen-lang-stilstaan.jpg` | Gids: een elektrische wagen die lang stilstaat | Een moderne, fictieve elektrische sportwagen in een lichte metaalkleur staat aan een laadpaal aan de muur van een moderne garage. De laadkabel is goed zichtbaar. Geen schermen met tekst, geen merktekens. |
| `reiniging-en-coating.jpg` | Dienst: reiniging en lakbescherming | Een donkergroene klassieke wagen in een privégarage wordt met de hand gereinigd: een persoon, van achteren gezien, droogt de motorkap af met een grote microvezeldoek. Een emmer en zachte borstels op de vloer. Warm licht. |
| `transport.jpg` | Dienst: transport | Een gesloten, donkergroene autotrailer met de laadklep open staat op een oprit voor een Vlaamse villa. In de trailer staat een crèmekleurige klassieke wagen, vastgezet aan de wielen. Geen tekst of logo op de trailer. |

## Controlelijst per foto

- [ ] Geen merklogo, embleem, merknaam of herkenbare grille van een bestaand merk (ook niet op velgen, sleutels of stuur).
- [ ] Geen leesbare nummerplaat, tekst, cijfers of watermerk. Kijk ook naar papieren, schermen en meters.
- [ ] Geen herkenbaar gezicht.
- [ ] Geen rare details: vervormde handen, wielen die niet rond zijn, spiegels of deurgrepen op vreemde plaatsen.
- [ ] De foto klopt met de pagina en met de alt-tekst in `src/lib/paginafotos.ts`.
- [ ] Liggend, minstens 1600 × 900 px, met het onderwerp in het midden.

Twijfelt u aan een logo of een detail? Genereer opnieuw, of laat het wegwerken. Een fout logo op een foto is erger dan geen foto.
