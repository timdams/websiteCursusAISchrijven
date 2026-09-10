# De prompt achter zekerweten.png

`assets/zekerweten.png` hoort bij de slide *[6] Kijk na*, en is net als
`meteenja.png` en `laatzeschrijven.png` een tekening zonder generatorscript. Ze
komt uit een beeldgenerator. Bewaar deze prompt, want zonder haar is de tekening
niet opnieuw te maken; met haar kom je in de buurt.

Ze is de derde in dezelfde reeks. In `assets/temmen.png` trekt de lector de robot
aan een rood touw, in `assets/laatzeschrijven.png` schrijft de robot terwijl dat
touw slap over de stoelleuning hangt, hier zit de lector aan datzelfde bureau met
een rode pen in het werk van de robot, en staat de robot ernaast met zijn duimen
omhoog.

De hexwaarden komen uit `assets/imagegen/excal.js` (`C.RED`, `C.GRAY`,
`C.OFFWHITE`), zodat de illustratie naast de andere figuren staat zonder te
vloeken.

Zet het resultaat in `assets/` onder de naam `zekerweten.png`, dan klopt de
verwijzing op de slide.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture.

Scene: on the right, a human stick figure professor with a bushy moustache,
small round spectacles and a lab coat sits at a small wooden writing desk,
hunched over a sheet of paper and frowning, marking it up with an oversized red
pencil. The sheet is covered in big circled corrections and crossings-out, and
more marked-up sheets lie scattered over the desk and on the floor around his
chair. On the left stands a boxy vintage robot, square head with a single
antenna ending in a ball, accordion-tube arms with pincer hands, a lab coat
over a rectangular body, one leg ending in a small wheel. It stands upright
with its chest out and both pincer hands raised in a proud thumbs-up, beaming,
completely untroubled, not looking at the desk at all. A red rope hangs slack
from its waist and trails loose across the floor.

Colour: off-white background #f8f9fa. All outlines in dark grey #4D4D4D.
Exactly one accent colour, red #FF0000, used only for the professor's pencil,
the circles and crossings-out on the sheets, and the slack rope, drawn as
sketchy hatched lines instead of solid colour. Lots of empty space around the
drawing. Square composition.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## Wat je moet weten als je haar opnieuw maakt

- **De grap zit in de duim.** Krijg je een robot die meekijkt, of eentje die
  schuldig staat te wachten, vraag dan opnieuw en zet *beaming, both thumbs up,
  not looking at the desk* vooraan bij de robot. Een lector met een rode pen is
  een lector die verbetert; het is de robot die er onaangedaan zeker naast staat
  die de slide maakt.
- **Het rood moet leesbaar zijn als correctie.** Rondjes en doorhalingen, geen
  rood vlak en geen rode inkt over het hele blad. Vult de generator de bladen
  rood in, vraag dan *only circles and crossings-out in red, the sheets stay
  white*.
- **Het slappe touw is de verwijzing naar de twee vorige.** Legt de generator het
  touw strak of terug in de hand van de lector, dan is de reeks weg. Lukt het na
  twee pogingen niet, laat het touw dan vallen en hou het rood op de pen en de
  correcties.
- **Vierkant, net als `temmen.png` en `laatzeschrijven.png`.** Die staan op 1024
  bij 1024. Hier staat ze in een kolom naast de tekst en rendert het thema haar
  op 720 hoog, dus vierkant laat 752 pixels over voor de opsomming ernaast. Vraag
  je 16:9, dan eet de tekening die kolom op en valt de tekst eronder.
- **De laatste regel is er niet voor niets.** Beeldgeneratoren zetten graag
  echte woorden op zo'n blad en daar maken ze soep van. Wat er aan tekst bij
  moet, staat in de kolom ernaast.
- **De achtergrond klopt zelden exact.** Het thema geeft elke figuur al een
  vlakje met een randje, dus wit valt niet uit de toon.
