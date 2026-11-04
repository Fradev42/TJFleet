# Prompts voor Gemini: de laatste vijf gidsfoto's

15 van de 20 foto's staan op de site. Deze vijf ontbreken nog. Elk blok hieronder bevat de basisprompt
en het onderwerp: kopieer één blok volledig in Gemini.

## Zo werkt u

1. Kopieer een blok volledig in Gemini (afbeeldingen maken).
2. Kijk de foto na met de **controlelijst** onderaan. Eén fout is genoeg om opnieuw te genereren, of vraag Gemini dat ene detail te verbeteren.
3. Sla de foto op als `.jpg` met exact de bestandsnaam uit de titel van het blok, in `src/assets/paginafotos/`.
4. Toont de foto iets anders dan de alt-tekst beschrijft? Pas dan de alt-tekst aan in `src/lib/paginafotos.ts`.
5. `npm run build` en bekijk de pagina. De foto staat bovenaan in 16:9 en wordt voor delen bijgesneden tot 1200 × 630. Houd het onderwerp dus in het midden.

Zolang een foto ontbreekt, gebruikt de pagina de titelkaart uit `public/og/`. De gidsen werken dus ook zonder foto.

## De vijf prompts

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
