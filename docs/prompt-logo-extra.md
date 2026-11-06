# Prompt: extra logo-ontwerpen in de kleuren van de website

Gebruik deze prompt in Gemini, ChatGPT (afbeeldingen) of een andere beeldtool. Voeg het huidige logo als bijlage toe:
`public/logo/logo.svg`, of een schermafdruk ervan. De prompt staat in het Engels, omdat beeldtools daar het best op
reageren. Kopieer het blok volledig. Wilt u maar één soort ontwerp, schrap dan de andere onder "What I need".

De kleuren zijn exact die van de website (`src/styles/global.css`):

| Kleur | Hex | Gebruik op de site |
|---|---|---|
| Crème (achtergrond) | `#F7F4EE` | achtergrond van elke pagina |
| Donker crème | `#EFEAE0` | afwisselende vlakken |
| Bijna-zwart | `#1E1E1E` | tekst |
| Donker racegroen | `#1F3A2E` | hoofdkleur: titels, knoppen, accenten |
| Bordeaux | `#6B1E24` | spaarzaam accent |

Let op: het huidige logo gebruikt nog `#111111` (zwart) en `#2E5B3F` (een lichter groen). De nieuwe ontwerpen gebruiken de
kleuren van de site.

```
Attached is the current logo of "APEX Collection Care", a discreet, independent service in Flanders (Belgium)
that looks after collections of classic and exclusive cars for private owners aged 55 and over. The brand feels
calm, trustworthy, understated and premium: a family butler for cars, not a racing team or a car dealer.

Use ONLY these exact colours, as flat fills (no gradients, no shadows, no glow, no metallic or 3D effects):
- deep racing green #1F3A2E (primary)
- near-black #1E1E1E (text)
- bordeaux #6B1E24 (small accent only, at most one detail)
- cream #F7F4EE (background, or the mark itself on dark backgrounds)
Show every design on a flat cream #F7F4EE background, unless I ask for a dark version.

Typography: the website uses Libre Caslon Text (a classic serif) for headings and Source Sans 3 for body text.
The wordmark may stay in the heavy geometric sans of the current logo, or use a refined serif that sits well next
to Libre Caslon Text. Spell the name exactly: "APEX" and "COLLECTION CARE". No other words, no slogan, no year,
no "est.", no "BV".

What I need (show each on its own, clearly labelled):
1. Horizontal logo: the mark to the left of "APEX COLLECTION CARE" on one line, for a narrow website header.
2. Stacked logo: "APEX" large with "COLLECTION CARE" below, for social media and print.
3. Monogram: a compact mark based on the letter "A" and the green swoosh of the current logo, that stays legible
   at 32 x 32 px (favicon, app icon, LinkedIn profile picture). Also show it as cream #F7F4EE on a #1F3A2E square.
4. Two alternative concepts that keep the spirit of the current logo (the swoosh through the letters) but feel
   more refined and timeless. One of them may use a thin bordeaux #6B1E24 line as the only accent.

Rules:
- No car silhouettes, steering wheels, tyres, chequered flags, crowns, shields or crests.
- No logos, emblems or lettering of existing car brands, and nothing that resembles them.
- Clean vector-style shapes with crisp edges, enough white space around the logo, and no texture.
- Text must be perfectly spelled and evenly spaced. If you cannot render the text cleanly, show the mark alone
  and leave the text out.
- Each design must also work in a single colour: all #1F3A2E on cream, and all #F7F4EE on #1F3A2E.
```

## Daarna

- **Controleer elke versie:** is de spelling juist ("COLLECTION CARE", niet "COLLECTIONS")? Zijn er geen kleurverlopen of schaduwen? En is het monogram nog herkenbaar als u de afbeelding klein bekijkt?
- **Vraag gerust bij:** "Maak versie 2 met een serif in de stijl van Libre Caslon Text" of "Toon het monogram op 16 × 16 px".
- **Kiest u een ontwerp,** stuur het dan naar Claude Code of een ontwerper om het als zuivere SVG op te bouwen. Een AI-beeldtool levert meestal een pixelafbeelding, geen vectorbestand. De bestanden komen in `public/logo/` (logo.svg, logo-licht.svg, logo-zwart.svg) en `public/favicon.svg`. Daarna moeten de deelafbeelding `public/og-image.jpg` en de titelkaarten (`npm run og`) opnieuw gemaakt worden.
