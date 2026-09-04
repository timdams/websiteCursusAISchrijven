// Module 2 - de posterprompt valt in twee helften, de onderste verhuist
// Draaien vanuit de imagegen-map:  node tweehelften.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1620, 640);

// ---------- links: de prompt ----------
const SX = 110, SY = 90, SW = 540, SH = 470;
const SPLIT = SY + 200;

c.rect(SX, SY, SW, SH, { strokeWidth: 2.4 });
c.line(SX, SPLIT, SX + SW, SPLIT, { strokeWidth: 2, strokeLineDash: [12, 10] });

// bovenste helft
c.txt(SX + SW / 2, SY + 52, 'verandert per hoofdstuk', 32, C.RED_DARK, 700);
c.lines(SX + SW / 2, SY + 108, [
  'dit hoofdstuk',
  'deze kernpunten',
], 30, C.GRAY, 500, 'middle', 1.5);

// onderste helft, met accent: dit is het stuk dat blijft
c.rect(SX + 16, SPLIT + 22, SW - 32, SH - 232, { fill: C.RED_LIGHT, fillStyle: 'hachure',
  hachureGap: 8, fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.2 });
c.txt(SX + SW / 2, SPLIT + 68, 'achttien keer hetzelfde', 32, C.RED_DARK, 700);
c.lines(SX + SW / 2, SPLIT + 124, [
  'mijn kleuren',
  'geen lange codeblokken',
  'tekst overlapt nooit',
], 29, C.GRAY, 500, 'middle', 1.45);

// ---------- de verhuizing ----------
c.arrow(690, SPLIT + 130, 950, SPLIT + 130, { stroke: C.RED, strokeWidth: 2.6, head: 16 });
c.txt(820, SPLIT + 96, 'verhuist', 32, C.RED_DARK, 700);

// ---------- rechts: het afsprakendocument ----------
const AX = 985, AY = SPLIT - 10, AW = 500, AH = 210;
c.rect(AX, AY, AW, AH, { stroke: C.RED, strokeWidth: 2.6 });
c.txt(AX + AW / 2, AY + 62, 'je afsprakendocument', 36, C.RED_DARK, 700);
c.lines(AX + AW / 2, AY + 116, [
  'staat er een keer in,',
  'en wordt altijd meegelezen',
], 29, C.GRAY, 500, 'middle', 1.45);

c.save('.', 'tweehelften', '');
