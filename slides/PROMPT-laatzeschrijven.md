# De prompt achter laatzeschrijven.png

`assets/laatzeschrijven.png` hoort bij de slide *Moet je die zelf schrijven?*, en
is net als `meteenja.png` en `robotlector.png` een tekening zonder
generatorscript. Ze komt uit een beeldgenerator. Bewaar deze prompt, want zonder
haar is de tekening niet opnieuw te maken; met haar kom je in de buurt.

Ze is een variant op `assets/temmen.png`: dezelfde twee personages, dezelfde
potloodstijl, en de rollen omgedraaid. Daar trekt de lector de robot aan een
rood touw, hier zit de robot zelf te schrijven terwijl dat touw slap over de
stoelleuning hangt.

De hexwaarden komen uit `assets/imagegen/excal.js` (`C.RED`, `C.GRAY`,
`C.OFFWHITE`), zodat de illustratie naast de andere figuren staat zonder te
vloeken.

De slide verwijst al naar `assets/laatzeschrijven.png`. Zet het resultaat daar
neer onder die naam, dan staat ze meteen goed.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture.

Scene: on the left, a boxy vintage robot sits at a small wooden writing desk.
It has a square head with a single antenna ending in a ball, accordion-tube
arms with pincer hands, a lab coat over a rectangular body, and one leg ending
in a small wheel. It is bent over the desk, writing on a sheet of paper with an
oversized pencil held in one pincer, tongue-out concentration, with a neat
stack of finished sheets beside it. On the right, a human stick figure
professor with a bushy moustache, small round spectacles and a lab coat stands
with his hands in his pockets, leaning back on his heels, watching, eyebrows
raised, doing nothing at all. A red rope hangs slack over the back of the
robot's chair, one loose end trailing on the floor.

Colour: off-white background #f8f9fa. All outlines in dark grey #4D4D4D.
Exactly one accent colour, red #FF0000, used only for the sheet the robot is
writing on, the stack of finished sheets and the slack rope, filled with
sketchy diagonal hatching lines instead of solid colour. Lots of empty space
around the drawing. Square composition.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## Wat je moet weten als je haar opnieuw maakt

- **De grap zit in wie er niets doet.** Krijg je een lector die meehelpt of
  meeleest, vraag dan opnieuw en zet *hands in his pockets, doing nothing* in de
  scenebeschrijving vooraan bij de lector. Een robot die schrijft is een robot
  die schrijft; het is de lector die erbij staat te kijken die de tip maakt.
- **Het slappe touw is de verwijzing naar `temmen.png`.** Legt de generator het
  touw strak of terug in de hand van de lector, dan is de grap weg. Lukt het na
  twee pogingen niet, laat het touw dan vallen en hou het rood enkel op de
  bladen.
- **Vierkant, net als `temmen.png`.** Die staat op 1024 bij 1024. Hier staat ze
  in een kolom naast de tekst en rendert het thema haar op 720 hoog, dus vierkant
  laat 752 pixels over voor de opsomming ernaast. Vraag je 16:9, dan eet de
  tekening die kolom op en valt de tekst eronder.
- **De laatste regel is er niet voor niets.** Beeldgeneratoren maken van letters
  meestal soep. Wat er aan tekst bij moet, staat in de kolom ernaast.
- **De achtergrond klopt zelden exact.** Het thema geeft elke figuur al een
  vlakje met een randje, dus wit valt niet uit de toon.
