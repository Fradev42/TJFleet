/**
 * Alle gidsen, in de volgorde van het overzicht op /gids/.
 * Voegt u een gids toe in src/pages/gids/, zet hem dan ook hier: zo verschijnt hij in het overzicht, in de sitemap
 * en onder "Verder lezen" bij verwante gidsen (via de tags).
 */
export type Gids = { href: string; tags: string[]; titel: string; tekst: string };

export const gidsen: Gids[] = [
  { href: '/gids/oldtimer-lez-gent-antwerpen-brussel/', tags: ['regels', 'oldtimer', 'rijden'], titel: 'Met uw oldtimer in de lage-emissiezone', tekst: 'Wanneer mag een oldtimer de LEZ van Gent, Antwerpen en Brussel in, en hoe registreert u hem?' },
  { href: '/gids/oldtimer-inschrijven/', tags: ['regels', 'oldtimer', 'papieren'], titel: 'Een oldtimer inschrijven in België', tekst: 'Vanaf 30 jaar: de eerste oldtimerkeuring, de O-plaat, de gebruiksregels en de voordelen.' },
  { href: '/gids/oldtimerkeuring/', tags: ['regels', 'oldtimer', 'onderhoud'], titel: 'De oldtimerkeuring in Vlaanderen', tekst: 'Hoe vaak een oldtimer naar de keuring moet, wat er gecontroleerd wordt en hoe u het overzicht houdt.' },
  { href: '/gids/oldtimer-verzekeren/', tags: ['verzekering', 'papieren', 'oldtimer'], titel: 'Een oldtimer verzekeren', tekst: 'Afgesproken waarde, omnium, rijden op events en meerdere wagens: waar u op let.' },
  { href: '/gids/oldtimer-laten-taxeren/', tags: ['waarde', 'verzekering', 'papieren'], titel: 'Een oldtimer laten taxeren', tekst: 'Waarom, wanneer en hoe vaak u laat taxeren, en wat u bewaart in het dossier van de wagen.' },
  { href: '/gids/oldtimer-restauratie-kosten/', tags: ['restauratie', 'waarde', 'onderhoud'], titel: 'Een oldtimer laten restaureren', tekst: 'Wat een restauratie kost, hoe u offertes vergelijkt en hoe u de juiste restaurateur kiest.' },
  { href: '/gids/oldtimer-winterklaar-maken/', tags: ['stalling', 'onderhoud', 'verzorging'], titel: 'Uw oldtimer winterklaar maken', tekst: 'Tank, batterij, banden en vocht: zo komt uw wagen goed de winter door.' },
  { href: '/gids/oldtimer-onderhoud-weinig-rijden/', tags: ['onderhoud', 'stalling', 'oldtimer'], titel: 'Onderhoud van een oldtimer die weinig rijdt', tekst: 'Ook zonder kilometers verouderen olie, remvloeistof en banden. Waar u op let.' },
  { href: '/gids/oldtimer-concours-rally-voorbereiden/', tags: ['events', 'rijden', 'verzekering'], titel: 'Met uw oldtimer naar een concours of rally', tekst: 'Rijklaar maken, papieren, verzekering en transport in een gesloten trailer.' },
  { href: '/gids/oldtimer-dossier-documenten/', tags: ['papieren', 'waarde', 'restauratie'], titel: 'Het dossier van een oldtimer', tekst: 'Welke documenten u bewaart, waarom ze de waarde beschermen en hoe u ze ordent.' },
  { href: '/gids/oldtimercollectie-overdragen/', tags: ['waarde', 'papieren', 'verzekering'], titel: 'Een oldtimercollectie overdragen', tekst: 'Schenking en nalatenschap: waardebepaling, nummerplaten, verzekering en goede afspraken.' },
  { href: '/gids/wax-of-keramische-coating/', tags: ['verzorging', 'exclusief', 'stalling'], titel: 'Wax of keramische coating?', tekst: 'Wax, coating of beschermfolie: wat elk kost, hoe lang het beschermt en wat past bij originele lak.' },
  { href: '/gids/youngtimer/', tags: ['regels', 'exclusief', 'verzekering'], titel: 'Youngtimers: waar let u op?', tekst: 'Geen wettelijk statuut, wel valkuilen: verzekering, keuring en vooral de LEZ, tot de wagen 30 is.' },
  { href: '/gids/exclusieve-wagen-weinig-rijden/', tags: ['stalling', 'onderhoud', 'exclusief'], titel: 'Een exclusieve wagen die weinig rijdt', tekst: 'Accu, banden, onderhoud per jaar of per kilometer, en uw garantie buiten de dealer.' },
  { href: '/gids/leder-hout-cabriodak-verzorgen/', tags: ['verzorging', 'restauratie', 'stalling'], titel: 'Leder, hout en cabriodak verzorgen', tekst: 'Zo reinigt en beschermt u het interieur en de kap, en wat u beter aan een specialist overlaat.' },
  { href: '/gids/diefstal-dure-wagen-voorkomen/', tags: ['beveiliging', 'verzekering', 'exclusief'], titel: 'Diefstal van een dure wagen voorkomen', tekst: 'Keyless diefstal, track and trace en wat uw verzekeraar eist: INCERT uitgelegd.' },
  { href: '/gids/elektrische-wagen-lang-stilstaan/', tags: ['stalling', 'exclusief', 'onderhoud'], titel: 'Een elektrische wagen lang stallen', tekst: 'Het juiste laadniveau, de vergeten 12V-accu en hybrides met twee systemen.' },
  { href: '/gids/oldtimers-na-2030/', tags: ['regels', 'rijden', 'oldtimer'], titel: 'Oldtimers na 2030: wat verandert er?', tekst: 'LEZ, verkeersbelasting, wegenvignet en Europese regels: wat er op komst is.' },
];

/**
 * Drie verwante gidsen voor het blok "Verder lezen": de gidsen met de meeste gedeelde tags,
 * bij gelijkspel in de volgorde van de lijst hierboven.
 */
export function verwanteGidsen(href: string, aantal = 3): Gids[] {
  const huidige = gidsen.find((g) => g.href === href);
  if (!huidige) return [];
  return gidsen
    .filter((g) => g.href !== href)
    .map((g, i) => ({ g, i, score: g.tags.filter((t) => huidige.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, aantal)
    .map((x) => x.g);
}
