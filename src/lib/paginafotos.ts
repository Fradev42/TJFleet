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
  'oldtimer-lez-gent-antwerpen-brussel': 'Een donkergroene Mercedes-Benz 280 SL Pagode in een rustige straat met kasseien, met fietsen tegen een bakstenen gevel',
  'oldtimer-inschrijven': 'Inschrijvingspapieren en een oude autosleutel op een houten tafel, met een Citroën DS op de achtergrond',
  'oldtimerkeuring': 'Een keurder bekijkt met een zaklamp het voorwiel van een bordeauxrode Alfa Romeo Giulia GT Junior op de rollenbank',
  'oldtimer-verzekeren': 'Een oudere man bladert in een map met documenten, met een groene MGB roadster op de achtergrond',
  'oldtimer-laten-taxeren': 'Een expert met een klembord bekijkt de lak van een zilvergrijze klassieke Porsche 911 in een garage',
  'oldtimer-restauratie-kosten': 'Een Jaguar E-Type in grondverf met de motorkap open in een restauratieatelier, met een carrosseriedeel op een standaard',
  'oldtimer-winterklaar-maken': 'Een klassieke Porsche 911 onder een ademende afdekhoes in een droge garage, met een onderhoudslader aangesloten',
  'oldtimer-onderhoud-weinig-rijden': 'Een mecanicien buigt zich over de motor van een groene MGB roadster in een garage met bakstenen muren',
  'oldtimer-concours-rally-voorbereiden': 'Een donkerblauwe Austin-Healey 3000 wordt voor een bakstenen villa in een gesloten aanhangwagen geladen',
  'oldtimer-dossier-documenten': 'Een lederen map met facturen en een onderhoudsboekje, oude foto’s van een Citroën DS, een sleutel en een leesbril op een houten tafel',
  'oldtimercollectie-overdragen': 'Twee generaties bekijken samen een crèmekleurige Jaguar XK150 in een privégarage',
  'oldtimers-na-2030': 'Een bordeauxrode Alfa Romeo Spider rijdt op een landweg tussen velden en bomenrijen',
  'wax-of-keramische-coating': 'Een hand brengt met een microvezeldoek wax aan op de motorkap van een donkergroene Jaguar E-Type',
  'youngtimer': 'Een donkergrijze BMW M3 E46 in een lichte garage, met de eigenaar bij de bestuurdersdeur',
  'exclusieve-wagen-weinig-rijden': 'Een donkergrijze Aston Martin DB11 in een garage, aangesloten op een onderhoudslader',
  'leder-hout-cabriodak-verzorgen': 'Een donkergroene Porsche 911 Cabriolet met gesloten stoffen dak in een garage, met een emmer verzorgingsproducten ernaast',
  'diefstal-dure-wagen-voorkomen': 'Een autosleutel wordt in een metalen afschermdoos gelegd',
  'elektrische-wagen-lang-stilstaan': 'Een zilvergrijze Porsche Taycan staat aan de laadpaal voor een garage',
  'reiniging-en-coating': 'Een donkergroene Porsche 356 wordt met de hand afgedroogd in een privégarage',
  'transport': 'Een crèmekleurige Mercedes-Benz 190 SL staat vastgezet in een gesloten aanhangwagen voor een bakstenen huis',
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
