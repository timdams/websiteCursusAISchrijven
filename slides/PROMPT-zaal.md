# De prompt achter zaal.png

`assets/zaal.png` opent de talk, op de slide *Voor wie is dit?*. Ze is de enige
tekening in dit deck die uit twee lagen bestaat: de mensen komen uit een
beeldgenerator en staan in `assets/imagegen/zaal-bron.png`, de woorden komen uit
`assets/imagegen/zaal.js` en worden er met rough.js overheen gezet. Bewaar deze
prompt, want zonder haar is de onderlaag niet opnieuw te maken; met haar kom je
in de buurt.

De tekening was eerst helemaal getekend met `poppetje` uit `strip.js`: zeven
identieke stokfiguurtjes op een as, met alleen een ander mondje. Dat is een
staafdiagram met koppen erop, en de slide zegt net dat de zaal gemengd is. Nu
staat er een oude dame met een stapel papier tegen haar borst, een dikke man met
een baard die zijn handen in de lucht gooit, een lange vrouw met een sjaal, en
zo verder. Elk van hen is iemand anders, en dat is het punt van de slide.

De stijl is die van `ateam.png` en `vermomming.png`, en `ateam.png` ging als
referentiebeeld mee de generator in. Model was GPT-5.4 Image 2 op OpenRouter,
beeldverhouding 21:9, en dat leverde 1568 bij 672.

Zet het resultaat in `assets/imagegen/` onder de naam `zaal-bron.png`. Niet in
`assets/`: daar staat het eindresultaat, en `node zaal.js` schrijft dat.

## Geen letter op de tekening

Op de onderlaag staat geen woord. De labels van deze figuur zijn Nederlandse
zinnen van vier en vijf woorden, en daar maakt een beeldgenerator soep van.
Vandaar de laatste regel van de prompt, en vandaar dat `zaal.js` de tekst er
achteraf op zet, in dezelfde Caveat als de rest van het deck.

Om dezelfde reden zit er geen rood in de onderlaag. Het rood van deze figuur is
de beugel *hier begint deze talk* en het bordje *dit weet ik al*, en die komen
allebei uit `zaal.js`. Zo ligt het accent precies waar het hoort en niet op een
sjaal.

```
A loose hand-drawn pencil sketch on off-white paper, in the style of a quick
sketchbook doodle: scratchy graphite outlines with visible construction lines
and double strokes, light hatching for shadow, no colour fills, no gradients,
no 3D rendering, no photo texture.

Composition: a very wide panoramic strip. All eight figures stand with their
feet on one single straight horizontal pencil line that runs across the full
width at four fifths of the image height. No head reaches higher than one third
from the top. The paper above the heads and the paper below that line are
completely empty: no hatching, no props, no clouds. Nothing touches or crosses
the edges of the frame.

Scene: a row of eight visibly different people, each clearly a distinct
individual, all drawn in the same scratchy stick-figure style with simple round
heads and dot eyes. Seven of them form a group across the left two thirds of
the line, crowded shoulder to shoulder at the far left and standing further and
further apart towards the right. Then a wide empty gap, and the eighth stands
alone at the far right end of the line. From left to right: a small older woman
with a bun and a cardigan hugging a stack of papers to her chest; a heavy-set
bald man with a beard and a jumper throwing both hands up in alarm; a tall thin
woman with round glasses and a long scarf; a woman with curly hair, a blouse
and a lanyard; a young man in a hoodie with a laptop bag over one shoulder; a
man with a goatee and rolled-up shirtsleeves standing with his hands in his
pockets; a lanky young woman in dungarees with headphones round her neck, one
arm raised. Their faces run from worried and hunched on the left, through
uncertain in the middle, to relaxed and smiling on the right. The one standing
alone at the far right is a wiry man with messy hair and a t-shirt, a small
laptop tucked under one arm, grinning broadly with his chin up.

Colour: off-white background #f8f9fa. Every line in dark grey #4D4D4D. No other
colour anywhere in the drawing.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

## De maten waar `zaal.js` op staat

Opgemeten op `zaal-bron.png`, 1568 bij 672. Het canvas van `zaal.js` is 1560 bij
670, dus de getallen kan je zo overnemen; het scheelt een halve procent.

| wat | waar |
| --- | --- |
| de grondlijn | y = 509 |
| de zeven van de zaal | x = 111, 271, 439, 559, 681, 831, 958 |
| die ene rechts | x = 1446, kruin op y = 166 |
| de opgestoken hand | tot y = 120 |
| rechterrand van de groep | x = 1015 |

Daar hangt de hele tekstlaag aan vast. `mijn vrouw` staat onder de vrouw met het
krullend haar op 559 en `Yves` onder de man met het sikje op 831. De beugel loopt
van 46 tot 1062 en ligt op y = 95, want de opgestoken hand komt tot 120. Het
bordje staat in de gaping naast die ene rechts, op halve hoogte, met twee
lijntjes naar hem toe. Rechtsboven blijft vrij, want daar vliegt Kristof.

Vervang je `zaal-bron.png`, meet dan opnieuw. In `zaal.js` staat een klein
meetscript beschreven; sneller is de nieuwe tekening in een editor openen en de
x van elke kop aflezen.

## Wat je moet weten als je haar opnieuw maakt

- **De lege strook boven en onder is de hele truc.** Boven de koppen komt de
  beugel, onder de lijn komen de labels. Zet de generator er arcering, een wolkje
  of een schaduw neer, dan valt je tekst er middenin en moet je opnieuw vragen.
- **Eén rechte grondlijn, en iedereen erop.** Zonder die zin in de prompt zet de
  generator de mensen op verschillende hoogtes en heb je geen as meer maar een
  groepsfoto. De pijlpunt rechts en het streepje links komen uit `zaal.js` en
  liggen op die lijn; wiebelt ze, dan hangt de punt in de lucht.
- **De gaping rechts is de betekenis van de figuur.** De zaal staat dicht op
  elkaar links en ijler naar rechts, en dan komt er niets, en dan komt die ene.
  Vult de generator die gaping op, gooi het weg en vraag opnieuw.
- **Geen rood, en geen letter.** Allebei de laatste regels van de prompt staan er
  niet voor niets in. Kleurt de generator toch een trui rood, dan vecht die met
  de beugel.
- **De lector met de snor hoort hier niet bij.** Hij staat op `titel.png`,
  `vermomming.png` en `ateam.png`, en hij is degene die praat. Zet hem in de
  zaal en de lezer zoekt zichzelf op de verkeerde plek.
- **`zaal.svg` is 1,8 MB.** De onderlaag zit er als data-URI in, want resvg
  zoekt een relatief pad niet zelf op. Dat bestand wordt bij elke render opnieuw
  geschreven en rough.js tekent elk streepje net anders, dus het is elke keer een
  nieuwe blob in git. Wil je dat niet, zet `assets/imagegen/zaal.svg` in
  `.gitignore`; de PNG is wat het deck gebruikt.
- **Kristof zit er als tweede prentje bij.** Zie hieronder.

## Kristof

Op de slide erna staat dezelfde tekening met Kristof erbij. De grap werkt alleen
wanneer de rest van de tekening exact gelijk blijft: hij is het enige nieuwe.
Daarom staat hij in `zaal.js` onder `c.save('.', 'zaal', '')` en niet in een
eigen script. Twee scripts en rough.js tekent elk streepje van de tekstlaag net
anders, en dan zie je de hele slide opnieuw getekend worden.

Hij zweefde daar eerst met een aureool en rode stralen erboven. Dat leest als
een engeltje, en dus als iemand die dood is. Hij is nu een superheld met een
rode cape, die voorbij het einde van de as vliegt.

Hij komt uit dezelfde generator, met `zaal-bron.png` als referentiebeeld zodat
hij dezelfde hand krijgt. Model GPT-5.4 Image 2, beeldverhouding 16:9, en dat
leverde 1280 bij 720.

```
A single flying superhero drawn as a loose hand-drawn pencil sketch on plain
off-white paper, in exactly the same style as the reference image: scratchy
graphite outlines with visible construction lines and double strokes, light
hatching for shadow, simple round head with dot eyes, no colour fills, no
gradients, no 3D rendering, no photo texture.

Scene: one cheerful man with short messy hair and stubble, flying horizontally
through the air from left to right, his body stretched out flat and level, one
fist punched forward ahead of him and the other arm tucked back along his side,
legs trailing straight out behind him with the feet together and the toes
pointed. He wears an ordinary t-shirt and trousers, and a cape knotted at his
neck that streams out in a long wavy sweep behind him. He is grinning broadly
with his chin up, looking where he is going. Three short speed lines trail in
the empty air behind him.

Composition: the flying figure is seen from the side and fills the frame from
the left edge to the right edge, floating in the middle of the picture with
plain empty paper above him and below him. Nothing else is in the picture at
all: no ground, no horizon, no clouds, no buildings, no other people.

Colour: plain flat off-white background #f8f9fa, evenly lit, no paper texture
and no shading behind the figure. Every line in dark grey #4D4D4D, except the
cape, which is drawn in red #FF0000 with sketchy diagonal hatching lines instead
of solid colour.

No text, no letters, no numbers, no speech bubbles, no labels, no watermark,
no signature.
```

### Het vel eronder weg

Een beeldgenerator levert altijd een gevulde rechthoek. Plak je die zo op de
zaal, dan zie je het randje van dat vel liggen. `vrijstaand.js` haalt het papier
eruit:

```bash
node vrijstaand.js kristof-bron.png kristof.png
```

Het leest de papierkleur uit de vier hoeken, rekent per pixel uit hoeveel inkt
erop staat en welke kleur die inkt heeft, en snijdt bij tot wat overblijft. Van
1280 bij 720 blijft 1180 bij 396 over. Een lijntje van 30% grijs blijft zo ook
op de nieuwe ondergrond 30% grijs, en de cape blijft rood. Zet je in plaats
daarvan het hele vel op `mix-blend-mode: multiply`, dan legt dat papier van 247
een grijze waas over alles wat eronder ligt.

Op de zaal staat hij op x=1138, y=10, 394 bij 132. Die 132 is het maximum: de
kruin van die ene rechts begint op 166, en zijn vuist houdt zo 26 pixels over
tot de rechterrand. Wil je hem groter, dan moet hij eerst een plek hebben.

- **Hij vliegt naar rechts, en dat is de betekenis.** Vraagt de generator hem
  spiegelverkeerd, gooi het weg en vraag opnieuw. Draai je hem zelf om, dan kijkt
  hij de zaal in en zweeft hij terug de as op.
- **De cape is het enige rode aan hem.** Kleurt de generator ook zijn schoenen of
  zijn t-shirt, dan vecht hij met de beugel links en met het bordje eronder.
- **De achtergrond moet effen zijn.** Legt de generator er papierkorrel of een
  schaduw onder, dan houdt `vrijstaand.js` daar spikkels van over rond zijn
  silhouet. In de prompt staat daarom *evenly lit, no paper texture and no
  shading behind the figure*.
