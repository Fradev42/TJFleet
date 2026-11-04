/**
 * Optionele foto per gids of dienstpagina.
 *
 * Zet een foto in src/assets/paginafotos/ met als bestandsnaam de slug van de pagina,
 * bv. youngtimer.jpg voor /gids/youngtimer/ of reiniging-en-coating.jpg voor /diensten/reiniging-en-coating/.
 * De foto verschijnt dan vanzelf bovenaan de pagina en wordt de deelafbeelding (Open Graph en schema).
 * De alt-tekst staat hieronder; pas ze aan als uw foto iets anders toont. Prompts: docs/prompt-gidsfotos.md.
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const bestanden = import.meta.glob<ImageMetadata>('../assets/paginafotos/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const fotoAlt: Record<string, string> = {
  'oldtimer-lez-gent-antwerpen-brussel': 'Een klassieke wagen rijdt door een rustige straat in een Vlaamse binnenstad',
  'oldtimer-inschrijven': 'Inschrijvingspapieren en een nummerplaat op een houten tafel naast de sleutels van een klassieke wagen',
  'oldtimerkeuring': 'Een klassieke wagen staat klaar in de keuringslijn van een keuringscentrum',
  'oldtimer-verzekeren': 'Een eigenaar bekijkt een verzekeringsdossier aan tafel, met een klassieke wagen op de achtergrond',
  'oldtimer-laten-taxeren': 'Een expert bekijkt met een klembord de carrosserie van een klassieke wagen',
  'oldtimer-restauratie-kosten': 'Een klassieke wagen zonder carrosseriedelen in een restauratieatelier',
  'oldtimer-winterklaar-maken': 'Een klassieke wagen onder een ademende afdekhoes in een droge garage, met een onderhoudslader aangesloten',
  'oldtimer-onderhoud-weinig-rijden': 'Een mecanicien controleert het oliepeil van een klassieke wagen',
  'oldtimer-concours-rally-voorbereiden': 'Een klassieke wagen wordt voorzichtig in een gesloten aanhangwagen gereden',
  'oldtimer-dossier-documenten': 'Een geordend dossier met facturen, foto’s en documenten van een klassieke wagen',
  'oldtimercollectie-overdragen': 'Twee generaties bekijken samen een klassieke wagen in een privégarage',
  'oldtimers-na-2030': 'Een klassieke wagen rijdt op een landweg in de Vlaamse Ardennen',
  'wax-of-keramische-coating': 'Een hand brengt met een microvezeldoek wax aan op de glanzende lak van een donkergroene wagen',
  'youngtimer': 'Een sportieve coupé uit de jaren negentig in een lichte garage',
  'exclusieve-wagen-weinig-rijden': 'Een moderne sportwagen in een garage, met een onderhoudslader aangesloten',
  'leder-hout-cabriodak-verzorgen': 'Een lederen zetel en een houten dashboard van een klassieke cabrio worden verzorgd',
  'diefstal-dure-wagen-voorkomen': 'Een autosleutel wordt in een metalen afschermdoos gelegd',
  'elektrische-wagen-lang-stilstaan': 'Een elektrische sportwagen staat aan de lader in een moderne garage',
  'reiniging-en-coating': 'Een donkergroene klassieke wagen wordt met de hand gereinigd in een privégarage',
  'transport': 'Een gesloten aanhangwagen met een klassieke wagen erin, klaar voor vertrek',
};

export interface Paginafoto { foto: ImageMetadata; alt: string; og: string }

/** Geeft de foto voor een slug terug, of undefined als er (nog) geen is. */
export async function paginafoto(slug: string): Promise<Paginafoto | undefined> {
  const pad = Object.keys(bestanden).find((p) => p.split('/').pop()!.replace(/\.\w+$/, '') === slug);
  if (!pad) return undefined;
  const foto = bestanden[pad];
  const og = await getImage({ src: foto, width: 1200, height: 630, format: 'jpg', fit: 'cover' });
  return { foto, alt: fotoAlt[slug] ?? '', og: og.src };
}

/** Deelafbeelding voor een slug: eigen foto, anders de titelkaart uit public/og/, anders de algemene. */
export async function deelafbeelding(slug: string): Promise<string> {
  const f = await paginafoto(slug);
  if (f) return f.og;
  if (existsSync(join(process.cwd(), 'public', 'og', `${slug}.jpg`))) return `/og/${slug}.jpg`;
  return '/og-image.jpg';
}
