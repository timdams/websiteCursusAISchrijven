// Stap 1. Wat je zelf schrijft voor je de AI erbij haalt: een ruwe outline en
// één hoofdstuk dat af is. De rest van het handboek doe je samen.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node schrijverswerk.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

// ---------- links: de twee dingen die je zelf maakt ----------
c.txt(465, 62, 'dit maak je zelf', 42, C.RED_DARK, 700);
c.rect(50, 90, 830, 440, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });

// de outline: de hoofdstukken op een rij, meer niet
c.rect(90, 140, 340, 330, { strokeWidth: 2.4, roughness: 1.4 });
c.txt(260, 190, 'outline', 38, C.GRAY, 700);
c.line(120, 208, 400, 208, { strokeWidth: 1.6, roughness: 1.8 });
const rijen = ['hoofdstuk 1', 'hoofdstuk 2', 'hoofdstuk 3', 'hoofdstuk 4', '...'];
rijen.forEach((rij, i) => {
  const rood = rij === 'hoofdstuk 3';
  c.txt(130, 258 + i * 48, rij, 34, rood ? C.RED_DARK : C.GRAY, rood ? 700 : 600, 'start');
});
c.txt(260, 505, 'ruw, en mag rommelig', 32, C.GRAY, 600);

// het ene hoofdstuk dat helemaal af is
c.rect(510, 140, 330, 330, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.rect(510, 140, 330, 68, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.4, roughness: 1.5 });
c.txt(675, 190, 'hoofdstuk 3', 36, C.RED_DARK, 700);
[[540, 812], [540, 790], [540, 814], [540, 700], [540, 808], [540, 806], [540, 736]]
  .forEach(([x1, x2], j) => c.line(x1, 250 + j * 30 + (j > 3 ? 14 : 0), x2,
    250 + j * 30 + (j > 3 ? 14 : 0), { strokeWidth: 1.5, roughness: 1.9 }));
c.txt(675, 505, 'je lievelingshoofdstuk, af', 32, C.GRAY, 600);

// ---------- rechts: de rest van het handboek ----------
c.arrow(895, 310, 995, 310, { strokeWidth: 2.6, roughness: 1.4, head: 18 });

c.txt(1265, 62, 'de rest, samen met de AI', 38, C.GRAY, 700);
c.rect(1020, 90, 490, 440, { strokeWidth: 2.4, roughness: 1.4 });

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 16, y], [x + w, y + 16], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2, 3].forEach(j => c.line(x + 12, y + 44 + j * 20, x + w - 12, y + 44 + j * 20,
    { strokeWidth: 1.3, roughness: 1.9 }));
}
for (let r = 0; r < 2; r++) {
  for (let k = 0; k < 3; k++) doc(1085 + k * 130, 145 + r * 165, 90, 140);
}
c.txt(1265, 505, 'hoofdstuk per hoofdstuk', 32, C.GRAY, 600);

c.txt(780, 620, 'zo heeft de AI je opbouw en je stem al voor ze één zin schrijft',
  36, C.RED_DARK, 700);

c.save('.', 'schrijverswerk', '');
