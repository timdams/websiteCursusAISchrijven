# API-referentie

## excal.js

```js
const { createCanvas, C } = require('./excal');
const c = createCanvas(BREEDTE, HOOGTE);
```

`createCanvas` zet een SVG-canvas op met offwhite achtergrond en Caveat als font.

### Kleuren (`C`)

| Constante | Hex | Gebruik |
|---|---|---|
| `C.RED` | `#FF0000` | accentranden, pijlen die iets aanduiden |
| `C.RED_DARK` | `#B30000` | zwaardere randen, labeltekst in ballonnen |
| `C.RED_LIGHT` | `#FFE5E5` | vulkleur accentvlakken |
| `C.GRAY` | `#4D4D4D` | gewone tekst en lijnen |
| `C.OFFWHITE` | `#f8f9fa` | achtergrond |
| `C.WHITE` | `#ffffff` | vulling van gewone boxen |
| `C.BOX_TOP` / `C.BOX_SIDE` | `#fbe9e9` / `#f3d4d4` | boven- en zijvlak van 3D-doosjes |

### Tekst

```js
c.txt(x, y, tekst, size = 36, color = C.GRAY, weight = 400, anchor = 'middle')
c.lines(x, y, [regels], size = 32, color, weight, anchor, lh = 1.05)
c.txtSegs(x, y, [{t, color, weight}], size = 32, anchor = 'start')   // gemengde kleuren op 1 regel
```

`y` is de **basislijn**, niet de bovenkant. Voor verticaal centreren in een box van hoogte
`h`: `y = boxY + h/2 + size * 0.34`. `anchor` is `'start'`, `'middle'` of `'end'`.

### Vormen

```js
c.rect(x, y, w, h, opties)          // standaard wit gevuld, grijze rand
c.line(x1, y1, x2, y2, opties)
c.poly([[x,y], ...], opties)
c.path('M ... Q ...', opties)
c.circle(cx, cy, diameter, opties)
c.ellipse(cx, cy, w, h, opties)
```

Opties gaan rechtstreeks naar rough.js: `fill`, `fillStyle` (`'solid'` of `'hachure'`),
`hachureGap`, `fillWeight`, `stroke`, `strokeWidth`, `roughness`, `bowing`,
`strokeLineDash: [12, 10]`, `disableMultiStroke`.

### Pijlen

```js
c.arrow(x1, y1, x2, y2, opties)                  // rechte pijl
c.carrow(x1, y1, cx, cy, x2, y2, opties)         // gebogen pijl, (cx,cy) = controlepunt
```

`opties.head` (standaard 16) regelt de lengte van de pijlpunt. Laat het eindpunt ~20px
voor het label stoppen zodat de punt de tekst niet raakt.

### Samengestelde elementen

```js
c.bubble(cx, top, w, h, label, tx, ty, size = 36)   // opmerkingsballon met streepje naar (tx,ty)
c.cell(x, y, w, h, waarde, opties)                 // rood gearceerd vakje (array-cel)
c.box3d(x, y, w, h, label, {depth = 26, size = 28}) // doosje met perspectief
```

`label` mag een string of een array van regels zijn.

### Opslaan

```js
c.save('.', '<naam>', 'NEW');   // -> ./<naam>.svg  en  ../<naam>NEW.png
```

Embed de Caveat-woff2 in de SVG en rendert de PNG met resvg. Draai het script vanuit de
imagegen-map, want de eerste parameter is de cwd.

## Bestaande helpers

Deze cursus start met een lege `assets/imagegen/` (enkel `excal.js` en de fonts). De helpers uit de
C#-repo zijn er niet naartoe gekopieerd, want de meeste tekenen geheugen en code en dat komt hier niet
voor. Past er toch een bij wat je tekent, kopieer dan het bestand uit de repo ziescherpscherper naar de
imagegen-map van jouw module:

`../ziescherpscherper/content/assets/`, gerekend vanaf de root van deze repo.

| Bestand daar | Exporteert | Wat |
|---|---|---|
| `6_klassen/imagegen/mhelpers.js` | `codebox`, `monitor` | 3D-codedoos met titel en coderegels; monitor met output |
| `1_csharpbasics/imagegen/vhelpers.js` | `slot`, `bin` | vakje met rood naamplaatje; vuilnisbak |
| `1_csharpbasics/imagegen/ehelpers.js` | `badge`, `tokens`, `ring` | genummerd stapbolletje; losse tokens op vaste x; rode ovaal rond een deel |
| `5_arrays/imagegen/arr.js` | `createCanvas`, `region`, `cloud`, `cellRow`, `memframe`, `trashcan`, `garbage`, `REGION` | regio's, wolk, rij cellen |
| `5_arrays/imagegen/_sh.js` | `base`, `vslot` | kant-en-klaar canvas met twee regio's |

`badge` is de bruikbaarste voor deze cursus: genummerde stappen in een werkwijze.

`arr.js` heeft een eigen `createCanvas` die die van `excal.js` uitbreidt. Gebruik in een tekening met
regio's dus `require('./arr')`, niet `require('./excal')`.

### codebox

```js
const { codebox } = require('./mhelpers');
codebox(c, x, y, w, h, 'Titel', [
  'public Auto(string merk)',
  '{',
  { t: 'Merk = merk;', indent: 30 },
  '}',
], { codeSize: 30, titleSize: 38, pad: 28 });
```

Een regel is een string, een object `{t, color, weight, indent}`, of een array van
segmenten voor gemengde kleuren op een regel. Regels tussen accolades krijgen altijd
`indent`.
