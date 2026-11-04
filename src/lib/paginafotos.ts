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
  'oldtimer-lez-gent-antwerpen-brussel': 'Een donkergroene Mercedes-Benz 280 SL Pagode rijdt door een rustige straat met kasseien in een Vlaamse binnenstad',
  'oldtimer-inschrijven': 'Inschrijvingspapieren en een oude autosleutel op een houten tafel, met een Citroën DS op de achtergrond',
  'oldtimerkeuring': 'Een bordeauxrode Alfa Romeo Giulia GT Junior in de keuringslijn van een keuringscentrum',
  'oldtimer-verzekeren': 'Een eigenaar bekijkt een verzekeringsdossier aan tafel, met een groene MGB roadster op de achtergrond',
  'oldtimer-laten-taxeren': 'Een expert bekijkt met een klembord de flank van een zilvergrijze klassieke Porsche 911',
  'oldtimer-restauratie-kosten': 'Een Jaguar E-Type in grondverf in een restauratieatelier, met de deuren ernaast op standaards',
  'oldtimer-winterklaar-maken': 'Een klassieke Porsche 911 onder een ademende afdekhoes in een droge garage, met een onderhoudslader aangesloten',
  'oldtimer-onderhoud-weinig-rijden': 'Een mecanicien controleert het oliepeil in de motorruimte van een MGB',
  'oldtimer-concours-rally-voorbereiden': 'Een donkerblauwe Austin-Healey 3000 wordt voorzichtig in een gesloten aanhangwagen gereden',
  'oldtimer-dossier-documenten': 'Een geordend dossier met facturen, een onderhoudsboekje en oude foto’s van een Citroën DS',
  'oldtimercollectie-overdragen': 'Twee generaties bekijken samen een crèmekleurige Jaguar XK150 in een privégarage',
  'oldtimers-na-2030': 'Een bordeauxrode Alfa Romeo Spider Duetto rijdt op een landweg in de Vlaamse Ardennen',
  'wax-of-keramische-coating': 'Een hand brengt met een microvezeldoek wax aan op de motorkap van een donkergroene Jaguar E-Type',
  'youngtimer': 'Een donkergrijze BMW M3 E46 in een lichte garage',
  'exclusieve-wagen-weinig-rijden': 'Een Aston Martin DB11 in een garage, met een onderhoudslader aangesloten',
  'leder-hout-cabriodak-verzorgen': 'Het stoffen cabriodak van een donkerblauwe Mercedes-Benz SL wordt met een zachte borstel gereinigd',
  'diefstal-dure-wagen-voorkomen': 'Een autosleutel wordt in een metalen afschermdoos gelegd',
  'elektrische-wagen-lang-stilstaan': 'Een Porsche Taycan staat aan de lader in een moderne garage',
  'reiniging-en-coating': 'Een donkergroene Porsche 356 wordt met de hand gereinigd in een privégarage',
  'transport': 'Een gesloten aanhangwagen met een crèmekleurige Mercedes-Benz 190 SL erin, klaar voor vertrek',
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
