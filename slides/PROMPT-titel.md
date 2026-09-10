# De prompt achter titel.png

`assets/titel.png` is de tekening op de titelslide, en is net als `mimic.png`,
`ateam.png`, `temmen.png` en `zekerweten.png` een tekening zonder
generatorscript. Ze komt uit een beeldgenerator. Bewaar deze prompt, want zonder
haar is de tekening niet opnieuw te maken; met haar kom je in de buurt.

Ze is het groepsportret van de hele cast van dit deck. De lector met de snor en
het brilletje staat er, en het robotje met de rode nepbril staat er vier keer:
een keer per ding dat hij in de talk vasthoudt. Het rode touw uit `temmen.png`
loopt er van links naar rechts doorheen, en de scheve papiertoren uit
`meteenja.png` staat achteraan.

De hexwaarden komen uit `assets/imagegen/excal.js` (`C.RED`, `C.GRAY`,
`C.OFFWHITE`), zodat de illustratie naast de andere figuren staat zonder te
vloeken.

Zet het resultaat in `assets/` onder de naam `titel.png`.

## Vierkant, en toch een breed tableau

De generator levert 1024 bij 1024, en de slide is 1600 bij 900. Dat lost de
tekening zelf op: de hele optocht staat in een brede band in de onderste helft
van het vierkant, en de bovenste helft blijft leeg papier. `data-background-size:
cover` schaalt dat vierkant naar 1600 breed en toont er een venster van 900 hoog
van, en met `data-background-position` schuif je dat venster over de band. Wat
wegvalt is lege lucht boven en een strook grond onder.

Vraag dus geen 16:9. Vraag een vierkant met een lege bovenhelft.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture. Seen from a low dramatic camera angle, as if
it were the opening shot of a heist film.

Composition: a square canvas. The whole top half of the square is completely
empty off-white paper with nothing in it at all: no figures, no flying paper,
no clouds, no hatching. The entire drawing sits in one wide horizontal band
across the lower half, with every head at roughly half the image height and
every foot at roughly four fifths of the image height, and an empty strip of
floor along the bottom edge. All five figures are drawn whole, with a margin of
empty paper on the left and on the right, and nothing touching or crossing the
edges of the frame.

Scene: a crew of five marches straight towards the viewer in a loose line
spread across that band, kicking up a low cloud of dust at their feet, with a
few loose sheets of paper fluttering around their knees and long shadows
stretching behind them. In the centre walks a human stick figure professor with
a bushy moustache, small round spectacles and a jacket with elbow patches,
striding confidently, holding an oversized red pencil in his fist like a
conductor's baton. Around him walk four identical boxy vintage robots: square
head with a single antenna ending in a ball, accordion-tube arms with pincer
hands, a lab coat over a rectangular body, one leg ending in a small wheel.
Every robot wears the same novelty disguise of fake round glasses with a big
fake moustache attached, held on by an elastic band around its head, all of
them sitting slightly crooked. Each robot carries one thing: the first hugs a
fat cardboard folder stuffed with sheets, the second holds a single sheet of
paper up in front of it like a map, the third waves one pincer hand at the
viewer and grins, the fourth walks at the back and carries a teetering leaning
stack of dog-eared paper, drawn small enough to stay fully inside the frame,
with two sheets sliding off the top. A red rope is tied around the professor's
waist and runs slack from robot to robot across the whole width of the band.
Everyone looks delighted and slightly out of control.

Colour: off-white background #f8f9fa. All outlines in dark grey #4D4D4D.
Exactly one accent colour, red #FF0000, used only for the four disguises, the
professor's pencil and the rope, drawn as sketchy hatched lines instead of
solid colour. Everything else stays grey pencil.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## Hoe ze op de titelslide staat

Dit staat er al in. Hieronder wat ervoor nodig was, zodat je het terugvindt
wanneer je de tekening vervangt.

De titelslide van Quarto heeft geen body waar je een `![](...)` in kwijt kan,
dus ze hangt eraan als achtergrond. In het yaml-blok bovenaan
[cursus-schrijven-met-ai.qmd](cursus-schrijven-met-ai.qmd):

```yaml
    center-title-slide: false
lang: nl

title-slide-attributes:
  data-background-image: assets/titel.png
  data-background-size: cover
  data-background-position: 50% 48%
  data-background-color: "#f8f7f5"
```

De tekening die er nu ligt is opgemeten. Op het vierkant van 1024 beginnen de
antennes op regel 352, eindigen de wieltjes op 776 en loopt de arcering van de
grond door tot 838. `cover` schaalt dat naar 1600 breed, dus alles gaat maal
1,5625 en de tekening wordt 1600 bij 1600. Daarvan toont de slide een venster
van 900 hoog, en `48%` legt dat venster op bronregel 215 tot 791: de wieltjes
staan net boven de onderrand, de grond eronder valt weg, en boven de antennes
blijft ongeveer 210 pixels lucht over. Elke procent verschuift dat venster met
zeven pixels.

De `data-background-color` staat op `#f8f7f5` en niet op de `#f8f9fa` van de
rest van het deck. Dat is het wit dat de generator zelf op het papier legde,
opgemeten in de hoek van het bestand. Zo zie je geen naad waar de tekening
ophoudt.

In die 210 pixels moet je titel passen, en een h1 van 2,1em past er niet in.
Daarom staat het titelblok bovenaan in plaats van in het midden
(`center-title-slide: false`) en staat het in
[theme/site.scss](theme/site.scss) onder *de titelslide* een maat kleiner:

```scss
#title-slide h1.title { margin-top: .5em; font-size: 1.5em; }
#title-slide .subtitle { font-size: .8em; margin-bottom: .35em; }
#title-slide .quarto-title-authors { font-size: .68em; }
```

Schuif je `data-background-position`, kijk dan of die drie maten nog kloppen.
Valt je titel toch over een robot, zet dan `data-background-opacity: 0.55` bij
de attributen: de tekening verbleekt tot een waas en de tekst leest weer.

### Waarom niet gewoon `contain`

Een vierkant dat tot in de hoeken volstaat, zoals de eerste poging, krijg je met
`cover` nooit heel op de slide: elke stand van het venster snijdt door een kop
of door een paar voeten. Voor zo'n tekening hang je ze naast je titel, met
`data-background-size: contain` en `data-background-position: right center`. Ze
staat dan als vierkant van 900 bij 900 tegen de rechterrand en je titel staat in
de 700 pixels links. De volle breedte ben je kwijt, en aan de linkerrand zie je
dat daar iemand is afgesneden.

## Wat je moet weten als je haar opnieuw maakt

- **De lege bovenhelft is de hele truc.** Ze staat als eerste zin van de
  compositie, en generatoren negeren ze graag: een papiertje in de bovenhoek, een
  wolkje, een streepje arcering. Komt dat eruit, gooi het weg en vraag opnieuw.
  Zonder die lege helft is er geen plek voor je titel.
- **Niets mag het kader raken.** In de eerste poging liepen de robot links en de
  papiertoren rechts het beeld uit, en dan leest het als een uitsnede van iets
  groters. *Nothing touching or crossing the edges of the frame* staat er daarom
  in, en het is de zin die je bij een herkansing herhaalt.
- **Vier keer hetzelfde robotje, dat is de grap.** Vraagt de generator er vier
  verschillende van, of geeft hij er eentje een ronde kop, zet dan *four
  identical robots, same square head, same red fake glasses and moustache on all
  four* vooraan in de scenebeschrijving.
- **De papiertoren is hier kleiner dan in `meteenja.png`.** Twee keer zo hoog als
  een robot past niet in een band van een halve beeldhoogte. Vandaar *drawn small
  enough to stay fully inside the frame*.
- **Het rood ligt op de vermommingen, de pen en het touw.** Kleurt de generator
  ook de jassen, de map of de papiertoren rood, dan trekt je oog naar de
  verkeerde plek en valt je titel weg. Gooi het weg en vraag opnieuw.
- **Het touw is de verwijzing naar `temmen.png`.** Lukt het na twee pogingen niet
  om het slap door de scene te laten lopen, laat het dan vallen en hou het rood op
  de vier vermommingen en de pen.
- **De laatste regel is er niet voor niets.** Beeldgeneratoren maken van letters
  soep, en hier staat je titel er al overheen. Die komt uit het yaml-blok.
- **De achtergrond klopt zelden exact.** Over de volle slide zie je dat: het wit
  van de tekening ligt naast het wit van het thema. Daarom staat
  `data-background-color: "#f8f9fa"` in het yaml-blok hierboven.
