/**
 * De algemene deelafbeelding (LinkedIn, WhatsApp, Facebook). Ze staat in src/assets, zodat Astro er een adres met
 * een hash van maakt (bv. /_astro/og-image.Ab12Cd.jpg). Een nieuwe versie krijgt zo een nieuw adres, en sociale
 * media halen ze meteen opnieuw op in plaats van een oude kopie te tonen.
 * public/og-image.jpg blijft bestaan voor oude links. Beide maakt `npm run merkbeelden` opnieuw.
 */
import og from '../assets/og-image.jpg';

export const standaardDeelafbeelding: string = og.src;
