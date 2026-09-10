// Wat is een skill: de bovenste regel van het blad zorgt dat de AI het zelf
// oppikt, en daaronder staan de stappen die ze dan aflegt.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node watiseenskill.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 650);

// ---------- links: wat jij vraagt ----------
c.rect(30, 300, 300, 130, { strokeWidth: 2.4, roughness: 1.4 });
c.lines(180, 348, ['\u201cmaak een figuur', 'voor module 2\u201d'],
  32, C.RED_DARK, 600, 'middle', 1.35);

c.arrow(340, 365, 495, 363, { stroke: C.RED, strokeWidth: 2.4, roughness: 1.3, head: 16 });

// ---------- midden: drie bladen, elk met bovenaan zijn regel ----------
// Het blad dat past staat in het midden, zodat de pijl er recht op wijst.
c.txt(700, 70, 'ze herkent het aan de bovenste regel', 30, C.RED_DARK, 700);

const bladen = [
  [110, 'als de code getest moet',     'code testen',           false],
  [285, 'bij een vraag om een figuur', 'een figuur tekenen',    true],
  [460, 'bij een examenvraag',         'een examenvraag maken', false],
];
bladen.forEach(([y, regel, naam, actief]) => {
  c.rect(510, y, 380, 150, actief
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.5,
        stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 }
    : { strokeWidth: 2.4, roughness: 1.4 });
  c.txt(700, y + 45, regel, 30, actief ? C.RED_DARK : C.GRAY, 600);
  c.line(540, y + 68, 860, y + 68,
    { stroke: actief ? C.RED : C.GRAY, strokeWidth: 1.8, roughness: 1.2 });
  c.txt(700, y + 118, naam, 34, C.GRAY, 700);
});

c.arrow(900, 360, 995, 360, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 17 });

// ---------- rechts: dat ene blad, opengeslagen ----------
c.rect(1010, 110, 520, 500, { strokeWidth: 2.6, roughness: 1.4, stroke: C.RED });
c.txt(1270, 175, 'een figuur tekenen', 36, C.RED_DARK, 700);
c.line(1045, 205, 1495, 205, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.2 });

const stappen = [
  [270, [{ t: 'draai ' }, { t: 'node figuur.js', color: C.RED_DARK, weight: 700 }],
        [{ t: 'vanuit de map ' }, { t: 'imagegen/', color: C.RED_DARK, weight: 700 }]],
  [385, [{ t: 'ik bekijk de PNG' }],
        [{ t: 'voor ze klaar zegt' }]],
  [500, [{ t: 'hij heet ' }, { t: '<naam>.png', color: C.RED_DARK, weight: 700 }],
        [{ t: 'en staat in ' }, { t: 'assets/', color: C.RED_DARK, weight: 700 }]],
];
stappen.forEach(([y, boven, onder], i) => {
  c.circle(1072, y + 8, 44, { stroke: C.RED, strokeWidth: 2.2, roughness: 1.4 });
  c.txt(1072, y + 19, String(i + 1), 30, C.RED_DARK, 700);
  c.txtSegs(1115, y, boven, 30, 'start');
  c.txtSegs(1115, y + 40, onder, 30, 'start');
});

c.save('.', 'watiseenskill', '');
