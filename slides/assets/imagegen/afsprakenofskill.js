// Je afsprakendocument wordt altijd meegelezen, een skill alleen wanneer die
// taak langskomt.
// Overgenomen uit site/assets/imagegen/afsprakenofskill.js en op beamermaat gezet.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node afsprakenofskill.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 620);

// ---------- de gesprekken in het midden ----------
const taken = [
  [40,  'een oefening vragen'],
  [175, 'een uitleg herschrijven'],
  [310, 'een figuur maken'],
  [445, 'een examenvraag maken'],
];
taken.forEach(([y, label], i) => {
  const accent = i === 2;
  c.rect(560, y, 420, 105, { strokeWidth: accent ? 2.6 : 2.4, roughness: 1.4,
    stroke: accent ? C.RED : C.GRAY });
  c.txt(770, y + 64, label, 34, C.GRAY, 600);
});

// ---------- links: het afsprakendocument ----------
c.rect(40, 240, 400, 170, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(240, 298, 'je afsprakendocument', 36, C.RED_DARK, 700);
c.lines(240, 344, ['wordt bij elk gesprek', 'meegelezen'], 30, C.GRAY, 600, 'middle', 1.3);
taken.forEach(([y]) => c.arrow(450, 325, 545, y + 52,
  { stroke: C.RED, strokeWidth: 2.4, roughness: 1.3, head: 16 }));

// ---------- rechts: de skill ----------
c.rect(1100, 240, 420, 170, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.txt(1310, 298, 'een skill', 36, C.RED_DARK, 700);
c.lines(1310, 344, ['een apart blad', 'voor een taak'], 30, C.GRAY, 600, 'middle', 1.3);
c.arrow(1090, 350, 995, 385, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 17 });
c.lines(1310, 478, ['je haalt het erbij,', 'en verder blijft het liggen'],
  30, C.GRAY, 600, 'middle', 1.3);

c.save('.', 'afsprakenofskill', '');
