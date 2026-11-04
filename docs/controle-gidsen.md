# Jaarlijkse controle van de gidsen

De regels rond oldtimers veranderen geregeld. Loop de gidsen daarom minstens **elk jaar in januari** na,
en daarnaast telkens als er groot nieuws is (een nieuwe LEZ-fase, een hervorming van de verkeersbelasting, een nieuw decreet).

## Vaste momenten

| Wanneer | Wat verandert er vaak | Gidsen |
|---|---|---|
| 1 januari | keuringstarieven, LEZ-fases (Brussel), Vlaamse hervormingen | oldtimerkeuring, LEZ, youngtimer, oldtimers na 2030, inschrijven |
| 1 juli | indexering van het oldtimerforfait in de verkeersbelasting | inschrijven, oldtimers na 2030 |
| voorjaar 2027 | wegenvignet (verkoop vanaf 2 april, verplicht vanaf 1 mei 2027, volgens de plannen) | oldtimers na 2030 |
| 1 januari 2027 | hervorming verkeersbelasting, O-plaat nodig voor het forfait bij nieuwe inschrijvingen (volgens de plannen) | inschrijven, youngtimer, oldtimers na 2030, collectie overdragen |
| 31 mei 2028 | einde van de Europese groepsvrijstelling voor motorvoertuigen | exclusieve wagen die weinig rijdt |
| tegen 2030 | evaluatie van de oldtimeruitzondering in de Brusselse LEZ | LEZ, oldtimers na 2030 |

## Per gids

1. Open elke bron onderaan de gids. Werkt de link nog, en zegt de bron nog hetzelfde? De maandelijkse controle in GitHub (`npm run links:extern`) meldt dode links, maar niet of de inhoud veranderd is.
2. Kijk elk bedrag, elke datum en elke termijn na. Zoek op de officiële site (vlaanderen.be, lez.brussels, de site van de stad, DIV, GOCA).
3. Staat er "volgens de plannen" of "nog niet definitief"? Kijk na of de maatregel intussen goedgekeurd, gewijzigd of geschrapt is, en pas de tekst aan.
4. Kijk ook de **veelgestelde vragen** (`vragen={[ … ]}`) na: die moeten hetzelfde zeggen als de tekst.
5. Pas `bijgewerkt="JJJJ-MM-DD"` aan in de gids, ook als er niets veranderd is maar u alles nagekeken hebt. Die datum staat op de pagina, in de sitemap en in de gegevens voor Google.
6. Veranderde de titel van een gids? Maak dan de deelafbeeldingen opnieuw: `npm run build && npm run og && npm run build`.

## Stijlregels bij het aanpassen

- Spreek de lezer aan met "u", in korte zinnen.
- Geen gedachtestreepjes (—).
- Niets beloven wat wij niet doen: wij taxeren niet, verkopen geen verzekeringen, restaureren niet zelf en hebben geen stalling.
- Bij twijfel: schrijf "kijk dit na bij …" en verwijs naar de officiële bron.

## Na afloop

`npm run build && npm run controle`, nakijken in de preview, committen en pushen.
