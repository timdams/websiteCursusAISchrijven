// Waar de zaal zit en waar deze talk begint. Een as van "ik plak soms iets in
// ChatGPT" naar "ik zit in de terminal", met de zaal erop en één iemand rechts
// die het al weet: de professor met de snor, dezelfde als op ateam.png en
// pintje.png. Die ene is de feedbackgever.
//
// De mensen zelf komen niet uit rough.js maar uit een beeldgenerator:
// `zaal-bron.png`, in dezelfde potloodstijl als `ateam.png` en
// `vermomming.png`. Zie PROMPT-zaal.md voor de prompt. Dit script legt daar de
// tekstlaag overheen: de labels, de rode beugel en het bordje. Zo blijven de
// woorden scherp en correct gespeld, en dat lukt een beeldgenerator niet.
//
// Dit script maakt twee tekeningen op hetzelfde canvas: zaal.png, en daarna
// zaal-kristof.png met Kristof erbij, die als superheld voorbij het einde van
// de as vliegt. Ze komen uit dezelfde tekenbeurt, dus de rest van de tekening
// staat op beide exact gelijk. Zou ik ze in twee scripts zetten, dan wiebelt
// elk streepje bij de tweede render net iets anders en zie je de zaal opnieuw
// getekend worden.
//
// De maten hieronder zijn opgemeten op zaal-bron.png (1584 bij 672) en al
// omgerekend naar dit canvas van 1560 bij 670: bron-x maal 0,985. De grondlijn
// ligt op y=511 en de figuren staan op x=108, 294, 437, 556, 677, 827, 953 en
// 1427, die laatste is de professor. Vervang je de tekening, meet dan opnieuw:
// alles hieronder hangt eraan vast.
//
// Beamermaat: canvas 1560 bij 670, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node zaal.js
const fs = require('fs');
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 670);
const SVGNS = 'http://www.w3.org/2000/svg';

// Een png op het canvas leggen. Ingebed als data-URI, want resvg zoekt een
// relatief pad niet zelf op. Geen xlink:href erbij: jsdom schrijft dat prefix
// zonder namespace en dan weigert resvg de hele svg.
function plak(bestand, x, y, w, h) {
  const img = c.document.createElementNS(SVGNS, 'image');
  img.setAttribute('x', x); img.setAttribute('y', y);
  img.setAttribute('width', w); img.setAttribute('height', h);
  img.setAttribute('preserveAspectRatio', 'none');
  img.setAttribute('href', 'data:image/png;base64,' +
    fs.readFileSync(__dirname + '/' + bestand).toString('base64'));
  c.svg.appendChild(img);
}

// ---------- de tekening als ondergrond ----------
plak('zaal-bron.png', 0, 0, 1560, 670);

const LIJN = 508;          // de vloer waar iedereen op staat, uit de tekening

// ---------- de as ----------
// De lijn staat al op de tekening. Hier komt enkel de punt bij: zonder pijl
// leest ze als een vloer en niet als een as.
c.line(1548, LIJN, 1508, LIJN - 15, { stroke: C.GRAY, strokeWidth: 2.8, roughness: 1.1 });
c.line(1548, LIJN, 1508, LIJN + 15, { stroke: C.GRAY, strokeWidth: 2.8, roughness: 1.1 });
c.line(26, LIJN - 13, 26, LIJN + 13, { stroke: C.GRAY, strokeWidth: 2.4, roughness: 1.3 });

c.lines(40, 562, ['ik plak soms iets', 'in ChatGPT'], 34, C.GRAY, 700, 'start', 1.12);
c.txt(1520, 562, 'ik zit in de terminal', 34, C.GRAY, 700, 'end');
c.txt(780, 634, 'hoe technisch je werkt', 32, C.GRAY, 600);

// ---------- de twee met een naam ----------
c.txt(559, 562, 'mijn vrouw', 30, C.GRAY, 600);
c.txt(831, 562, 'Yves', 30, C.GRAY, 600);

// ---------- de beugel over de zaal ----------
// Op 95 en niet lager: de opgestoken hand van het meisje in de salopette komt
// tot 120.
const BX0 = 46, BX1 = 1062, BY = 95;
c.line(BX0, BY, BX1, BY, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.line(BX0, BY, BX0, BY + 30, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.line(BX1, BY, BX1, BY + 30, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.txt((BX0 + BX1) / 2, BY - 26, 'hier begint deze talk', 44, C.RED_DARK, 700);

// ---------- die ene rechts ----------
// Het bordje staat in de gaping naast hem, op halve hoogte. Rechtsboven blijft
// vrij, want daar vliegt Kristof op de tweede tekening.
c.rect(1040, 286, 228, 88, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });
c.line(1268, 316, 1362, 306, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.line(1268, 348, 1366, 340, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.txt(1154, 343, 'dit weet ik al', 36, C.RED_DARK, 700);

c.save('.', 'zaal', '');

// ---------- en dan Kristof ----------
// Hij staat niet op de as, hij vliegt erboven, voorbij de pijlpunt, met een
// rode cape. `kristof.png` is 1180 bij 396 en is vrijstaand gemaakt met
// vrijstaand.js; op 132 hoog wordt hij 394 breed en houdt hij 41 pixels over
// tot de kruin van de professor, die op 179 begint.
plak('kristof.png', 1138, 10, 394, 132);
c.txt(1250, 176, 'Kristof', 36, C.RED_DARK, 700);

c.save('.', 'zaal-kristof', '');
