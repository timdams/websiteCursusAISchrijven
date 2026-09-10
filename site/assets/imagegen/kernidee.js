// Kernidee - op je vaste plek staan twee dingen: je contextmap en je regelbestand,
// en die twee gelden voor elk gesprek dat je daar voert.
// Draaien vanuit de imagegen-map:  node kernidee.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1620, 820);

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 16, y], [x + w, y + 16], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 12, y + 40 + j * 18, x + w - 12, y + 40 + j * 18,
    { strokeWidth: 1.4, roughness: 1.8 }));
}

// ---------- de vaste plek zelf ----------
c.rect(70, 90, 1480, 660, { strokeWidth: 2.6 });
c.txt(105, 142, 'je vaste plek: een map of een project', 34, C.GRAY, 700, 'start');

// ---------- links boven: de contextmap ----------
c.rect(130, 200, 500, 215, { strokeWidth: 2.2 });
c.txt(380, 248, 'je contextmap', 34, C.RED_DARK, 700);
for (let j = 0; j < 5; j++) doc(180 + j * 84, 278, 64, 100);
c.txt(380, 452, 'waar je vak over gaat', 30, C.GRAY, 600);

// ---------- links onder: het regelbestand ----------
c.rect(130, 495, 500, 190, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
  stroke: C.RED, strokeWidth: 2.4 });
c.txt(380, 537, 'je regelbestand', 34, C.RED_DARK, 700);
c.lines(380, 581, ['wie mijn publiek is', 'hoe ik klink', 'wat ik niet wil zien'],
  27, C.GRAY, 600, 'middle', 1.3);
c.txt(380, 722, 'wat altijd geldt', 30, C.GRAY, 600);

// ---------- de twee samen gaan mee naar elk gesprek ----------
c.line(665, 215, 665, 670, { strokeWidth: 2.2, roughness: 1.4 });

// ---------- rechts: elk gesprek ----------
c.txt(1200, 143, 'elk gesprek dat je hier voert', 32, C.RED_DARK, 700);
const gesprekken = [175, 365, 555];
const labels = ['een oefening vragen', 'een uitleg herschrijven', 'slides bij een hoofdstuk'];
gesprekken.forEach((y, i) => {
  c.rect(920, y, 560, 150, { strokeWidth: 2.2 });
  c.txt(1200, y + 88, labels[i], 36, C.GRAY, 600);
});

gesprekken.forEach(y => c.arrow(680, 442, 905, y + 75,
  { stroke: C.RED, strokeWidth: 2.2, head: 14 }));

c.save('.', 'kernidee', '');
