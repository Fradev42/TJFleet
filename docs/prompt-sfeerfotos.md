# Prompt voor Gemini: sfeerfoto's voor de website

Er zijn drie foto's nodig. Plak in Gemini eerst de **basisprompt** en daarna de prompt van **één** foto.
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

## Foto 3: Werkwijze, stalling

Bestand: `src/assets/images/stalling.jpg` · beeldverhouding **16:10** · minstens 1600 × 1000 px

> Create a 16:10 photograph of a calm, climate-controlled storage hall holding four or five classic cars of
> different shapes (a coupé, a roadster, a saloon), all unbranded. Most are under fitted cream-coloured covers;
> one dark-green car is uncovered. The cars stand in a neat row on a light-grey epoxy floor, each with a small
> battery maintainer plugged in. Soft, even overhead lighting, timber roof beams, a dehumidifier unit in the
> corner. Eye-level view along the row, with a slight perspective. The atmosphere is secure, orderly and quiet.

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
| `stalling.jpg` | `src/pages/werkwijze.astro` |
