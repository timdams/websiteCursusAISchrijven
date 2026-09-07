# Slides

Een deck van zesentwintig slides over hoe je aan een cursus begint met AI, met de
site als afsluiter. Alleen voor lokaal gebruik: de workflow in
[.github/workflows/pages.yml](../.github/workflows/pages.yml) zet enkel `site/` op
GitHub Pages, dus deze map gaat er niet mee op.

## Twee origin stories, kies er een

Het deck opent met waar het vandaan komt: deze slides en de site zijn met Claude
gemaakt, en de aanpak die erin staat komt uit de olods waar wel jaren in zitten.
Die beats staan er **twee keer** in, zodat je kan kiezen voor je presenteert:

| Versie | Slides | Wat |
|---|---|---|
| A | 2 en 3 | kort: tekst met de tekening ernaast, dan de twee stapels |
| B | 4 tot en met 8 | dezelfde beats als strip met tekstballonnen |

Gooi voor de talk een van de twee blokken weg. In de qmd staat boven elk blok een
commentaarregel die zegt waar het begint en eindigt.

Dat commentaar staat bewust **onder** de kop en niet erboven: markdown-commentaar
boven een `##` valt buiten die slide en levert een lege slide op.

## Renderen

```bash
cd slides
quarto render cursus-schrijven-met-ai.qmd
```

Dat schrijft `cursus-schrijven-met-ai.html` naast de qmd. Dubbelklikken volstaat;
Caveat zit als base64 in `theme/caveat.css`, dus het werkt ook over `file://`.

Tijdens het schrijven is `quarto preview cursus-schrijven-met-ai.qmd` handiger:
die ververst bij elke opslag.

Een pdf maak je vanuit de browser: druk `e` voor de printweergave en print naar
pdf. Druk `s` voor de sprekersweergave, `o` voor het overzicht.

## Wat waar staat

| Pad | Wat |
|---|---|
| `cursus-schrijven-met-ai.qmd` | de slides zelf |
| `theme/site.scss` | de kleuren en het font van de site, omgezet naar reveal.js |
| `theme/caveat.css` | Caveat als base64, gegenereerd door `maak-font-css.js` |
| `assets/*.png` | de tekeningen |
| `assets/imagegen/*.js` | de scripts die die tekeningen maken |
| `MAATVOERING.md` | hoe groot tekst in een tekening moet zijn om te beamen |

## De tekeningen

Dezelfde machinerie als de site: rough.js plus Caveat, in de stijl uit
[.claude/afbeelding/SKILL.md](../.claude/afbeelding/SKILL.md). Elk script blijft
staan, dus een figuur bijsturen betekent een regel wijzigen en opnieuw renderen:

```bash
cd slides/assets/imagegen
node volgorde.js
```

Het script schrijft de SVG naast zichzelf en de PNG een map hoger, in `assets/`.
Werkt `require('roughjs')` niet, draai dan eerst `npm install` in de repo-root.

Alles opnieuw renderen:

```bash
cd slides/assets/imagegen
for f in *.js; do [ "$f" = excal.js ] || node "$f"; done
```

### Vijftien tekeningen

`prillebegin`, `teleurstelling`, `volgorde`, `schrijverswerk`, `mapindeling`,
`improvelus`, `nakijken` en `website` zijn voor dit deck getekend. `eenbron`,
`vijfdocumenten`, `kernidee` en `afsprakenofskill` staan ook op de site, maar de
scripts hier zijn een eigen versie: op de site zijn ze 1660 tot 1740 breed, hier
1560, met grotere tekst. Wijzig je zo'n figuur, wijzig hem dan op beide plekken.

`strip-vraag`, `strip-vorigjaar` en `strip-nu` zijn de stripversie van de origin
story. De panelen, de stokfiguurtjes en de tekstballonnen zitten in
`strip.js`, dat de andere drie inladen. `poppetje` neemt `armen` (`omhoog`,
`uit`, `wijzen`) en `gezicht` (`blij`, `paniek`, `twijfel`).

### De ene tekening die geen script heeft

`meteenja.png` komt uit Imagen, niet uit rough.js. Ze staat in allebei de origin
stories: op slide 2 naast de tekst, en op slide 8 als slot van de strip. Er is
geen script om aan te passen, dus wil je er iets aan wijzigen dan moet ze opnieuw
gegenereerd worden, en dan is het een andere tekening. De prompt die haar
opleverde staat in [PROMPT-meteenja.md](PROMPT-meteenja.md).

### Leesbaar op een beamer

Elke tekening is 1560 breed en hoogstens 670 hoog, met tekst van minstens 30. Zo
rendert ze op de slide op ongeveer één op één. De rekensom en de reden staan in
[MAATVOERING.md](MAATVOERING.md). Wijzig je een figuur, hou je daar dan aan: op
een canvas van 2300 breed valt tekst van 30 terug tot achttien pixels op het
scherm, en dat leest niemand achteraan de zaal.

### Het font opnieuw inbakken

```bash
cd slides/theme
node maak-font-css.js
```
