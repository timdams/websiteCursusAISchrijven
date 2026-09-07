// Stap 1. De vier bewegingen van elke schrijver, en de sprong die iedereen
// maakt zodra er een chatvenster openstaat.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node schrijverswerk.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

// ---------- de vier stappen ----------
const BW = 300, BH = 120, BY = 320;
const bx = i => 55 + i * 365;
const namen = ['outline', 'eerste versie', 'nalezen', 'herschrijven'];

namen.forEach((naam, i) => {
  c.rect(bx(i), BY, BW, BH, { strokeWidth: 2.6, roughness: 1.4 });
  c.txt(bx(i) + BW / 2, BY + BH / 2 + 15, naam, 44, C.GRAY, 700);
  if (i < 3) c.arrow(bx(i) + BW + 10, BY + BH / 2, bx(i + 1) - 14, BY + BH / 2,
    { strokeWidth: 2.4, roughness: 1.4, head: 16 });
});

// de lus terug: herschrijven stuurt je opnieuw naar je outline
c.carrow(bx(3) + BW / 2, BY + BH + 12, 752, BY + BH + 170, bx(0) + BW / 2, BY + BH + 14,
  { strokeWidth: 2.4, roughness: 1.4, head: 18 });
c.txt(752, 638, 'en dan nog een keer', 36, C.GRAY, 600);

// ---------- de sprong ----------
c.rect(55, 60, 500, 105, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.txt(305, 128, 'schrijf mij hoofdstuk 3', 42, C.RED_DARK, 700);

c.carrow(570, 112, 940, 150, 1295, BY - 16,
  { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, strokeLineDash: [14, 10], head: 22 });
c.txt(1055, 100, 'de sprong die iedereen maakt', 38, C.RED_DARK, 700);

c.save('.', 'schrijverswerk', '');
