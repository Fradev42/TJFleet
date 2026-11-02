# Prompt: logo opnieuw opbouwen als vector, plus favicon en deelafbeelding

Gebruik deze prompt bij een grafisch ontwerper, of bij een AI-tool die SVG kan maken (bv. ChatGPT met afbeeldingen,
Claude, Recraft of Illustrator met Image Trace). Voeg het huidige logo (`src/assets/logo/logo.png`) als bijlage toe.
De prompt staat in het Engels, omdat de meeste beeldtools daar het best op reageren.

---

Attached is the current logo of "APEX Fleet Management", a discreet, independent service in Flanders (Belgium)
that manages collections of classic cars for private owners. The file is a low-resolution PNG with rough,
slightly blurry edges. Please recreate it as a clean vector logo. **Keep the design exactly as it is**: do not
restyle, modernise or "improve" it.

**Faithful redraw**
- Wordmark "APEX" in a heavy, wide geometric sans-serif, black, with the same letter shapes as the original.
  Note the stylised "A" without a crossbar and the "E" that is cut by the swoosh.
- Below it, "FLEET MANAGEMENT" in a bold geometric sans-serif (similar to Montserrat Bold), black, letter-spaced,
  aligned to the width of the wordmark as in the original.
- A single smooth green swoosh that starts thin at the bottom left, rises across and through the letters, and ends
  in a tapered point at the top right. Use clean Bézier curves, an even taper and no texture or noise.
  Colour: deep racing green **#1F3A2E** (or **#2E5B3F** if that matches the original better).
- Keep the overlap between the swoosh and the letters as in the original: the swoosh cuts through "APEX".

**Deliverables**
1. `logo.svg`: full colour, transparent background, text converted to outlines, tight viewBox with no extra margin.
2. `logo-licht.svg`: one-colour version in cream **#F7F4EE** for dark backgrounds (letters and swoosh all cream).
3. `logo-zwart.svg`: one-colour black version for print and fax.
4. `favicon.svg`: a square icon of 64 × 64 that stays legible at 16 px. Use only a simplified "A" with the green
   swoosh, or the swoosh alone, on a #1F3A2E rounded square with the mark in #F7F4EE. No small text.
5. `og-image.png`, 1200 × 630 px: cream background #F7F4EE, the full-colour logo centred at about 45 % of the
   width, and below it the line "Beheer van klassieke wagens" in a dark serif (#1E1E1E). Leave generous empty
   space around it, with no other elements.

**Technical requirements**
- Valid, optimised SVG (run it through SVGO): no embedded bitmaps, no `<text>` elements, no editor metadata,
  and no inline styles beyond `fill`.
- Paths are closed and smooth, and their coordinates are rounded to at most 2 decimal places.
- Each logo SVG should be under 15 KB.

---

## Daarna op de site plaatsen

Geef de bestanden aan Claude met de vraag: "Vervang het logo door deze SVG-bestanden, en gebruik ook de favicon
en de og-image." Of doe het zelf:

| Bestand | Plaats in het project |
|---|---|
| `logo.svg`, `logo-licht.svg` | `src/assets/logo/` (in `Header.astro` en `Footer.astro` de import van `.png` naar `.svg` wijzigen) |
| `favicon.svg` | `public/favicon.svg` (overschrijven) |
| `og-image.png` | `public/og-image.png`, en in `src/components/SEO.astro` de standaardwaarde `/og-image.jpg` vervangen door `/og-image.png` |
