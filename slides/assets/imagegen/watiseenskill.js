// Wat is een skill: er zijn twee manieren waarop het bestand opengaat. Jij typt
// het slash-commando, of je stelt gewoon je vraag en zij haalt er zelf uit dat
// deze skill erbij hoort. Wat er daarna gebeurt is in allebei de gevallen
// hetzelfde: de stappen die in dat bestand staan.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node watiseenskill.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 600);

c.txt(725, 68, 'allebei openen ze hetzelfde bestand', 32, C.RED_DARK, 700);

// ---------- links boven: jij typt het commando ----------
c.rect(30, 100, 420, 150, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.txt(240, 155, '/afbeelding', 40, C.RED_DARK, 700);
c.line(60, 175, 420, 175, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.2 });
c.txt(240, 223, 'jij typt het zelf', 32, C.GRAY, 700);

c.txt(240, 305, 'of', 34, C.GRAY, 700);

// ---------- links onder: je stelt gewoon je vraag ----------
c.rect(30, 350, 420, 200, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.lines(240, 400, ['“maak een figuur', 'voor module 2”'],
  32, C.RED_DARK, 600, 'middle', 1.35);
c.line(60, 470, 420, 470, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.2 });
c.txt(240, 520, 'zij haalt het uit je vraag', 32, C.GRAY, 700);

// ---------- de twee wegen komen samen ----------
c.path('M 455 175 Q 730 180 888 318',
  { stroke: C.RED, strokeWidth: 2.4, roughness: 1.3 });
c.path('M 455 450 Q 730 445 888 332',
  { stroke: C.RED, strokeWidth: 2.4, roughness: 1.3 });
c.arrow(890, 325, 1000, 325,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 17 });

// ---------- rechts: dat ene blad, opengeslagen ----------
c.rect(1010, 100, 520, 450, { strokeWidth: 2.6, roughness: 1.4, stroke: C.RED });
c.txt(1270, 162, 'een figuur tekenen', 36, C.RED_DARK, 700);
c.line(1045, 192, 1495, 192, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.2 });

const stappen = [
  [245, [{ t: 'draai ' }, { t: 'node figuur.js', color: C.RED_DARK, weight: 700 }],
        [{ t: 'vanuit de map ' }, { t: 'imagegen/', color: C.RED_DARK, weight: 700 }]],
  [350, [{ t: 'ik bekijk de PNG' }],
        [{ t: 'voor ze klaar zegt' }]],
  [455, [{ t: 'hij heet ' }, { t: '<naam>.png', color: C.RED_DARK, weight: 700 }],
        [{ t: 'en staat in ' }, { t: 'assets/', color: C.RED_DARK, weight: 700 }]],
];
stappen.forEach(([y, boven, onder], i) => {
  c.circle(1072, y + 8, 44, { stroke: C.RED, strokeWidth: 2.2, roughness: 1.4 });
  c.txt(1072, y + 19, String(i + 1), 30, C.RED_DARK, 700);
  c.txtSegs(1115, y, boven, 30, 'start');
  c.txtSegs(1115, y + 40, onder, 30, 'start');
});

c.save('.', 'watiseenskill', '');
