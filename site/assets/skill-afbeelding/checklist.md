# Checklist bij het nakijken van de PNG

Open de gerenderde PNG en loop dit af. Bijna elke fout hieronder is al
eens gebeurd.

## Tekst

- [ ] Geen enkele tekst raakt of kruist een boxrand, een lijn of een pijl.
- [ ] Geen twee teksten die elkaar overlappen.
- [ ] Alle tekst staat binnen het canvas, ook lange labels (die lopen makkelijk over de
      rechterrand; Caveat is smal, dus reken ~0,42 x fontgrootte per teken).
- [ ] Tekst in een box zit verticaal gecentreerd, niet tegen de boven- of onderrand.
- [ ] Font is overal Caveat. Blokletterige tekst betekent dat de PNG-render het font niet
      vond: staan `caveat-400.ttf` en `caveat-700.ttf` in de imagegen-map?

## Layout

- [ ] Geen titel bovenaan de figuur.
- [ ] Onderaan en rechts geen grote lege strook. Pas dan `createCanvas` aan.
- [ ] Elementen die bij elkaar horen staan ook visueel dicht bij elkaar, met duidelijk
      meer ruimte tussen de groepen.
- [ ] Bij twee situaties naast elkaar (voor/na): allebei even breed en op dezelfde
      hoogtes uitgelijnd.

## Pijlen

- [ ] Elke pijl begint aan de rand van zijn vertrekelement, niet er middenin.
- [ ] De pijlpunt stopt kort voor het doel, en overlapt geen tekst.
- [ ] Bij `carrow`: de bocht loopt niet dwars door een ander element. Verleg het
      controlepunt in plaats van het eindpunt.

## Inhoud

- [ ] Alles wat in het origineel stond, staat er ook. Niets stilzwijgend weggelaten.
- [ ] Niets toegevoegd dat niet in het origineel stond.
- [ ] De labels staan in de woorden van je lezer, niet in die van je gereedschap. Geen toolnamen
      en geen jargon, tenzij de figuur net daarover gaat.
- [ ] Geen em-dashes in de labels.
