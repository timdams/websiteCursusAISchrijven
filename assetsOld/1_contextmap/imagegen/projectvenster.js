// Module 1 - in een project zitten twee dingen: je documenten en je instructies
// Draaien vanuit de imagegen-map:  node projectvenster.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1620, 800);

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 16, y], [x + w, y + 16], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 12, y + 40 + j * 18, x + w - 12, y + 40 + j * 18,
    { strokeWidth: 1.4, roughness: 1.8 }));
}

// ---------- het project zelf ----------
c.rect(70, 90, 1480, 640, { strokeWidth: 2.6 });
c.txt(105, 142, 'je project', 34, C.GRAY, 700, 'start');

// ---------- links boven: de documenten ----------
c.rect(130, 200, 500, 210, { strokeWidth: 2.2 });
c.txt(380, 246, 'documenten', 34, C.RED_DARK, 700);
for (let j = 0; j < 5; j++) doc(180 + j * 84, 272, 64, 100);
c.txt(380, 450, 'dit is module 1', 30, C.RED_DARK, 700);

// ---------- links onder: het instructieveld ----------
c.rect(130, 482, 500, 180, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
  stroke: C.RED, strokeWidth: 2.4 });
c.txt(380, 524, 'instructies', 34, C.RED_DARK, 700);
c.lines(380, 568, ['wie mijn publiek is', 'hoe ik klink', 'wat ik niet wil zien'],
  27, C.GRAY, 600, 'middle', 1.3);
c.txt(380, 702, 'dit is module 2', 30, C.RED_DARK, 700);

// ---------- rechts: elk gesprek in dit project ----------
c.txt(1200, 148, 'elk gesprek in dit project', 32, C.RED_DARK, 700);
const gesprekken = [170, 360, 550];
const labels = ['een oefening vragen', 'een uitleg herschrijven', 'een poster maken'];
gesprekken.forEach((y, i) => {
  c.rect(920, y, 560, 150, { strokeWidth: 2.2 });
  c.txt(1200, y + 88, labels[i], 36, C.GRAY, 600);
});

// ---------- de instructies gaan mee naar elk gesprek ----------
gesprekken.forEach(y => c.arrow(645, 572, 905, y + 75,
  { stroke: C.RED, strokeWidth: 2.2, head: 14 }));

c.save('.', 'projectvenster', '');
