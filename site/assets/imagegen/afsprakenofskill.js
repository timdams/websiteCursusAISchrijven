// Je afsprakendocument wordt altijd meegelezen, een skill alleen wanneer die taak langskomt.
// Draaien vanuit de imagegen-map:  node afsprakenofskill.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1660, 760);

// ---------- de gesprekken in het midden ----------
const taken = [
  [90,  'een oefening vragen'],
  [250, 'een uitleg herschrijven'],
  [410, 'een figuur maken'],
  [570, 'een examenvraag maken'],
];
taken.forEach(([y, label], i) => {
  const accent = i === 2;
  c.rect(630, y, 400, 120, { strokeWidth: accent ? 2.4 : 2.2, stroke: accent ? C.RED : C.GRAY });
  c.txt(830, y + 72, label, 30, C.GRAY, 600);
});

// ---------- links: het afsprakendocument ----------
c.rect(90, 300, 440, 200, { strokeWidth: 2.4 });
c.txt(310, 356, 'je afsprakendocument', 34, C.RED_DARK, 700);
c.lines(310, 404, ['wordt bij elk gesprek', 'meegelezen'], 28, C.GRAY, 600, 'middle', 1.3);
taken.forEach(([y]) => c.arrow(540, 400, 615, y + 60, { stroke: C.RED, strokeWidth: 2.2, head: 13 }));

// ---------- rechts: de skill ----------
c.rect(1130, 300, 440, 200, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
  stroke: C.RED, strokeWidth: 2.4 });
c.txt(1350, 356, 'een skill', 34, C.RED_DARK, 700);
c.lines(1350, 404, ['een apart blad', 'voor een taak'], 28, C.GRAY, 600, 'middle', 1.3);
c.arrow(1120, 420, 1045, 470, { stroke: C.RED, strokeWidth: 2.4, head: 14 });
c.txt(1350, 566, 'je haalt het erbij,', 28, C.GRAY, 600);
c.txt(1350, 600, 'en verder blijft het liggen', 28, C.GRAY, 600);

c.save('.', 'afsprakenofskill', '');
