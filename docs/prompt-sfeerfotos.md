# Prompt voor Gemini: sfeerfoto's voor de website

Er zijn drie foto's nodig (foto 1 en 2 zijn al geplaatst). Plak in Gemini eerst de **basisprompt** en daarna de prompt van **één** foto.
Maak per foto een nieuw gesprek, of zeg tussendoor "nieuwe afbeelding, zelfde stijl".
De prompts staan in het Engels, omdat de beeldgenerator van Gemini daar het nauwkeurigst op reageert.

Vraag gerust 3 à 4 varianten en kies de rustigste.

---

## Basisprompt (altijd eerst plakken)

> You are creating photographs for the website of APEX Fleet Management, a discreet, independent service near
> Ghent (Belgium) that looks after collections of classic cars for private owners aged 55 and over.
> The mood is calm, personal and understated, like a private bank or a traditional English coachbuilder.
> It should never look flashy or like a sports-car advert.
>
> Style for every image:
> - Photorealistic, as if shot on a full-frame camera with a 35–50 mm lens. Natural, soft light with a slightly warm
>   colour temperature. Gentle contrast, no HDR look, no lens flares, no dramatic sky.
> - Colour palette: cream, warm grey, aged leather brown, dark racing green, a touch of deep burgundy.
> - Classic cars from the 1950s–1970s, **generic and unbranded**: no visible logos, badges, emblems, brand names,
>   recognisable grilles or radiator shapes of existing brands, no number plates (leave the plate area blank or
>   out of frame), no readable text anywhere.
> - No people's faces. At most hands or a figure seen from behind, out of focus.
> - Clean, orderly and well-maintained surroundings: craftsmanship and care, not a showroom.
> - No watermarks, no frames, no text in the image.

---

## Foto 1: Home, grote foto bovenaan

Bestand: `src/assets/images/hero.jpg` · beeldverhouding **16:9** · minstens 2400 × 1350 px

> Create a wide 16:9 photograph of a single elegant classic grand tourer from the late 1960s in dark racing green,
> parked in a quiet, spacious private garage with whitewashed brick walls and a polished concrete floor. Soft
> daylight falls in from a tall window on the right. The car is in the **right half** of the frame, seen from a low
> three-quarter front angle. The **left 45 % of the image is calm, dark and nearly empty** (shadowed wall), because
> white text will be placed there. A folded cream car cover and a leather-bound logbook lie on a wooden bench in the
> background. Atmosphere: serene, early evening.

## Foto 2: Diensten, werkplaats

Bestand: `src/assets/images/werkplaats.jpg` · beeldverhouding **16:10** · minstens 1600 × 1000 px

> Create a 16:10 photograph inside a small, spotless specialist workshop for classic cars. The engine bay of an
> unbranded 1960s roadster is open in the foreground, with chrome details and old-style carburettors. A mechanic's
> hands in a dark-green work jacket carefully adjust something with a spanner (hands only, face not visible).
> Neatly arranged hand tools hang on a pegboard in the background, slightly out of focus. Warm workshop lamps
> combine with daylight. Shallow depth of field. The feeling is meticulous craftsmanship and trust.

## Foto 3: Werkwijze, kennismaking

Bestand: `src/assets/images/kennismaking.jpg` · beeldverhouding **16:10** · minstens 1600 × 1000 px

Deze foto vervangt het vorige beeld van een grote stallingshal. Dat beeld liet uitschijnen dat APEX een eigen
stalling heeft. Het nieuwe beeld toont het eerste gesprek **bij de klant thuis**.

> Create a 16:10 photograph of a first meeting at a client's home in the Flemish countryside. Setting: the
> private garage of a stylish villa, partly opened up onto the garden, with whitewashed brick walls, a terracotta
> tiled floor and soft afternoon daylight coming through the open garage door. In the background, slightly out of
> focus, stand one or two unbranded classic cars from the 1960s (one in dark racing green, one under a cream
> fitted cover), parked as they would be at someone's home, not in a commercial storage hall.
>
> In the foreground is a simple oak table with two cups of coffee, a leather-bound notebook with a fountain pen,
> and a tablet lying flat that shows a calm, cream-coloured app screen with abstract shapes only (no readable
> text). Two people sit at the table, seen from behind or cropped at shoulder height, **with no faces visible**:
> an older owner (about 65, grey hair, navy knitted jumper) and a younger advisor (about 30, dark-green jacket).
> The advisor's hand points gently at the tablet. The mood is unhurried and trusting, a personal conversation
> rather than a sales pitch.
>
> Camera at seated eye level with a shallow depth of field, so the table and hands are sharp and the cars are soft.
> No logos, badges or number plates on the cars, no readable text anywhere.

**Extra, als de wagen toch een bekend merk lijkt:** iconische vormen zoals die van een Jaguar E-Type,
Mercedes 'Pagode' of Porsche 911 duiken vaak op. Vraag dan: "Make the classic car a generic, unrecognisable
1960s coupé with a simple oval grille and no emblem; keep everything else identical."

---

## Controleren vóór gebruik

- Zoom in op grilles, wielnaven, stuur en achterkant. Gemini tekent soms toch een logo of een nummerplaat.
  Vraag dan: "Remove all badges, emblems and the number plate, keep everything else identical."
- Let op vervormde details: wielen die niet rond zijn, spiegels op een vreemde plek, handen met te veel vingers.
- AI-beelden mogen niet suggereren dat het om uw eigen stalling of een echte klant gaat. Echte foto's van uw
  werking blijven de beste keuze zodra u ze hebt.

## Plaatsen

Sla de foto op als JPG met **exact de bestandsnaam hierboven** in `src/assets/images/` en overschrijf de
placeholder. De site maakt er zelf lichte WebP-versies van. Pas daarna de `alt`-tekst aan als het beeld anders is
dan beschreven:

| Foto | Alt-tekst staat in |
|---|---|
| `hero.jpg` | `src/pages/index.astro` |
| `werkplaats.jpg` | `src/pages/diensten.astro` |
| `kennismaking.jpg` | `src/pages/werkwijze.astro` |
