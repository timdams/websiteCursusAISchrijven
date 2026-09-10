# De prompt achter vermomming.png

`assets/vermomming.png` vervangt `assets/regelbestand.png` op de slide *Wat zet
je daar dan in?*, en is net als `mimic.png`, `meteenja.png` en
`laatzeschrijven.png` een tekening zonder generatorscript. Ze komt uit een
beeldgenerator. Bewaar deze prompt, want zonder haar is de tekening niet opnieuw
te maken; met haar kom je in de buurt.

Ze hangt vast aan `assets/mimic.png`. Daar draagt de robot de rode bril met snor
van de lector; hier zie je waar die vandaan komt: van het blad dat de lector
hem voorhoudt. Daarom staat het rood hier op #B30000 en niet op het #FF0000 van
`temmen.png` en `laatzeschrijven.png`.

Op het blad staan geen woorden. Wat er in je regelbestand hoort, staat op de
volgende slide (*Voorbeeldje*) al voluit; de tekening hoeft het niet te herhalen.

De hexwaarden komen uit `assets/imagegen/excal.js` (`C.RED_DARK`, `C.GRAY`,
`C.OFFWHITE`), zodat de illustratie naast de andere figuren staat zonder te
vloeken.

Zet het resultaat in `assets/` onder de naam `vermomming.png`. Niet onder
`regelbestand.png`: `assets/imagegen/regelbestand.js` schrijft dat bestand, en
overschrijft je tekening zodra iemand dat script draait.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture.

Scene: two figures facing each other in the centre. On the right, a human stick
figure professor with a bushy moustache, small round spectacles and a jacket
with elbow patches holds up a single sheet of paper in both hands, presenting
it the way a tailor shows a suit. Drawn on that sheet, in red: a pair of round
glasses and a big curly moustache, with a few rows of wavy scribble lines
underneath standing in for handwriting, half of them struck through. On the
left, a boxy vintage robot leans in eagerly towards the sheet: square head with
a single antenna ending in a ball, accordion-tube arms with pincer hands, a lab
coat over a rectangular body, one leg ending in a small wheel. Its square face
is still bare. A second, identical red pair of glasses and moustache floats in
mid-air between the sheet and that bare face, on its way over, with two light
motion arcs behind it. The robot looks delighted.

Colour: off-white background #f8f9fa. All outlines in dark grey #4D4D4D.
Exactly one accent colour, red #B30000, used only for the glasses and moustache
on the sheet, the pair floating through the air, and the struck-through
scribble lines, filled with sketchy diagonal hatching lines instead of solid
colour. Lots of empty space around the drawing. Square composition.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## Wat je moet weten als je haar opnieuw maakt

- **De grap zit in de overdracht.** Zet de generator de bril meteen op de robot,
  dan heb je `mimic.png` een tweede keer. Vraag opnieuw en zet *the robot's face
  is still bare, the glasses and moustache are in mid-air between the sheet and
  the face* vooraan in de scenebeschrijving.
- **Het rood is #B30000, niet #FF0000.** Het is hetzelfde rood als de vermomming
  in `mimic.png`, en die twee slides gaan over hetzelfde ding. Kleurt de
  generator ook het blad of de jas rood, gooi het weg en vraag opnieuw.
- **De doorstreepte regels zijn je niet-doen-lijst.** Dat is de helft van het
  punt van de slide. Wordt het blad er rommelig van, laat ze vallen en hou het
  rood enkel op de bril en de snor.
- **Vierkant, zoals `mimic.png`, `temmen.png` en `laatzeschrijven.png`.** Die
  staan op 1024 bij 1024. `regelbestand.png` was liggend (1560 bij 670) en stond
  daarom op `.metonder`, over de volle breedte. Een vierkante hangt daar met veel
  lucht links en rechts, dus zet de slide om naar `.metnaast` en schuif de regel
  eronder mee in de kolom ernaast.
- **De laatste regel is er niet voor niets.** Beeldgeneratoren zetten graag echte
  woorden op zo'n blad en daar maken ze soep van. Vandaar de golfjes.
- **De achtergrond klopt zelden exact.** Het thema geeft elke figuur al een
  vlakje met een randje, dus wit valt niet uit de toon.
