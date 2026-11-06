# Herkomst van deze skill

- Bron: https://github.com/pbakaus/impeccable, map `plugin/skills/impeccable`
- Versie: 4.8.0 (commit c3bb418, 2026-11-05)
- Licentie: Apache 2.0 (zie LICENSE en NOTICE.md)
- Bewust **alleen de skill**, niet de volledige plugin: er draaien geen automatische hooks bij het begin van een sessie, na een bewerking of aan het einde van een beurt. De skill werkt alleen op vraag, bv. "/impeccable audit".
- Bij het eerste gebruik kan het script `scripts/impeccable` een vastgepinde motor (versie 0.1.18) downloaden. Die wordt gecontroleerd tegen `scripts/engine-checksums.txt`. Werkt dat niet, dan leest de skill de projectcontext gewoon zelf.
- Bijwerken: alleen op vraag. Kopieer de map opnieuw uit de bron en pas deze notitie aan.
