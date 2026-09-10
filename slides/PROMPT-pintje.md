# De prompt achter pintje.png

`assets/pintje.png` is de afsluiter van de talk, en is net als `ateam.png`,
`meteenja.png` en `laatzeschrijven.png` een tekening zonder generatorscript. Ze
komt uit een beeldgenerator. Bewaar deze prompt, want zonder haar is de
tekening niet opnieuw te maken; met haar kom je in de buurt.

Ze is de derde in de reeks met dezelfde twee personages. In `temmen.png` trekt
de lector de robot aan een rood touw. In `laatzeschrijven.png` schrijft de robot
en staat de lector erbij te kijken. Hier zit de robot nog altijd te schrijven en
ligt de lector in een ligstoel met een pint, naast een stapel afgewerkte
cursussen die hoger staat dan hijzelf.

De hexwaarden komen uit `assets/imagegen/excal.js` (`C.RED`, `C.GRAY`,
`C.OFFWHITE`), zodat de illustratie naast de andere figuren staat zonder te
vloeken.

Model was GPT-5.4 Image 2 op OpenRouter, beeldverhouding 1:1, met
`assets/ateam.png` als referentiebeeld voor de lector en de potloodhand.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture.

Scene: on the left, a boxy vintage robot sits hunched over a small wooden
writing desk, working hard. It has a square head with a single antenna ending
in a ball, accordion-tube arms with pincer hands and a lab coat over a
rectangular body. It scribbles furiously on a sheet of paper with an oversized
pencil held in one pincer, loose sheets sliding off the desk onto the floor. On
the right, a human stick figure professor with a bushy moustache, small round
spectacles and a lab coat lounges far back in a striped deck chair, legs
crossed and stretched out, one hand raised holding a tall beer glass with a
foamy head, grinning broadly, doing nothing at all. Beside the deck chair a
towering wobbly stack of finished course books rises higher than his head,
leaning slightly to one side.

Colour: off-white background #f8f9fa. All outlines in dark grey #4D4D4D.
Exactly one accent colour, red #FF0000, used only for the towering stack of
course books, the beer glass and the stripes of the deck chair, filled with
sketchy diagonal hatching lines instead of solid colour. Lots of empty space
around the drawing. Square composition.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## Wat je moet weten als je haar opnieuw maakt

- **De grap zit in de afstand tussen de twee.** Zet de generator de lector aan
  hetzelfde bureau of laat ze hem meelezen, vraag dan opnieuw en hou *doing
  nothing at all* achteraan bij de lector staan. Een robot die schrijft is een
  robot die schrijft; het is de pint ernaast die de tekening maakt.
- **De stapel moet hoger zijn dan de lector.** Komt ze op ooghoogte, dan leest
  ze als een gewone stapel papier en verdwijnt de overdrijving. *Higher than his
  head* en *wobbly* zijn de twee woorden die dat doen.
- **Rood staat op drie plekken en niet meer.** De boeksneden, het bier en de
  strepen van de ligstoel. Zet de generator ook de bladen of de lab coat in het
  rood, dan valt ze uit de reeks; vraag opnieuw met *exactly one accent colour*
  vooraan in de kleurenparagraaf.
- **Vierkant, net als `ateam.png` en `mimic.png`.** Die staan op 1024 bij 1024.
  Vraag je 16:9, dan eet de tekening de tekstkolom op in een `.metnaast`-slide.
- **`ateam.png` als referentie meegeven scheelt.** Zonder referentiebeeld krijg
  je een andere snor, een andere bril en een gladdere lijn. GPT-5.4 Image 2
  neemt er maar één; wil je er twee (ook `mimic.png` voor de robot), dan moet je
  naar Gemini 3 Pro, en dat is een andere hand.
- **De laatste regel is er niet voor niets.** Beeldgeneratoren maken van letters
  meestal soep. Wat er aan tekst bij moet, staat op de slide zelf.
