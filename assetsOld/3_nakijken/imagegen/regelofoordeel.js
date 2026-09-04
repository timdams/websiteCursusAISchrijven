// Module 3 - wat je bij het nakijken vindt, valt in twee stapels
// Draaien vanuit de imagegen-map:  node regelofoordeel.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1680, 740);

// ---------- links: wat je vindt ----------
const LX = 80, LY = 250, LW = 400, LH = 250;
c.rect(LX, LY, LW, LH, { strokeWidth: 2.2 });
c.txt(LX + LW / 2, LY + 54, 'wat je vindt', 34, C.RED_DARK, 700);
c.lines(LX + LW / 2, LY + 110, [
  'een em-dash',
  'var in hoofdstuk 3',
  'klopt deze uitleg wel',
], 29, C.GRAY, 500, 'middle', 1.5);

// ---------- midden: de vraag ----------
c.arrow(495, 375, 570, 375, { stroke: C.GRAY, strokeWidth: 2.2, head: 14 });
c.ellipse(760, 375, 320, 140, { stroke: C.RED, strokeWidth: 2.6 });
c.txt(760, 366, 'regel of', 34, C.RED_DARK, 700);
c.txt(760, 404, 'oordeel?', 34, C.RED_DARK, 700);

// ---------- rechts boven: regel ----------
const RX = 1120, RW = 480;
const TY = 110, TH = 220;
c.rect(RX, TY, RW, TH, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.4 });
c.txt(RX + RW / 2, TY + 58, 'regel', 38, C.RED_DARK, 700);
c.lines(RX + RW / 2, TY + 112, [
  'keert terug',
  'schrijf je op',
  'naar je afsprakendocument',
], 28, C.GRAY, 500, 'middle', 1.45);

// ---------- rechts onder: oordeel ----------
const BY = 440, BH2 = 220;
c.rect(RX, BY, RW, BH2, { strokeWidth: 2.4 });
c.txt(RX + RW / 2, BY + 58, 'oordeel', 38, C.RED_DARK, 700);
c.lines(RX + RW / 2, BY + 112, [
  'elke keer anders',
  'vraagt je vakkennis',
  'blijft mensenwerk',
], 28, C.GRAY, 500, 'middle', 1.45);

// ---------- de twee wegen ----------
c.carrow(905, 330, 1020, 250, 1105, 215, { stroke: C.RED, strokeWidth: 2.6, head: 16 });
c.carrow(905, 420, 1020, 500, 1105, 545, { stroke: C.GRAY, strokeWidth: 2.6, head: 16 });

c.save('.', 'regelofoordeel', '');
