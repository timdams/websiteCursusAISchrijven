// Op je vaste plek staan twee dingen: je contextmap en je regelbestand,
// en die twee gelden voor elk gesprek dat je daar voert.
// Overgenomen uit site/assets/imagegen/kernidee.js en op beamermaat gezet.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node kernidee.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 14, y], [x + w, y + 14], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 10, y + 32 + j * 16, x + w - 10, y + 32 + j * 16,
    { strokeWidth: 1.4, roughness: 1.8 }));
}

// ---------- de vaste plek zelf ----------
c.rect(30, 55, 1500, 570, { strokeWidth: 2.8, roughness: 1.3 });
c.txt(62, 108, 'je vaste plek: een map of een project', 34, C.GRAY, 700, 'start');

// ---------- links boven: de contextmap ----------
c.rect(75, 140, 460, 185, { strokeWidth: 2.4, roughness: 1.4 });
c.txt(305, 188, 'je contextmap', 36, C.RED_DARK, 700);
for (let j = 0; j < 5; j++) doc(115 + j * 78, 212, 60, 88);
c.txt(305, 358, 'waar je vak over gaat', 32, C.GRAY, 600);

// ---------- links onder: het regelbestand ----------
c.rect(75, 388, 460, 180, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.txt(305, 434, 'je regelbestand', 36, C.RED_DARK, 700);
c.lines(305, 468, ['wie mijn publiek is', 'hoe ik klink', 'wat ik niet wil zien'],
  30, C.GRAY, 600, 'middle', 1.24);
c.txt(305, 606, 'wat altijd geldt', 32, C.GRAY, 600);

// ---------- de twee samen gaan mee naar elk gesprek ----------
c.line(575, 155, 575, 570, { strokeWidth: 2.4, roughness: 1.4 });

// ---------- rechts: elk gesprek ----------
c.txt(1105, 108, 'elk gesprek dat je hier voert', 34, C.RED_DARK, 700);
const rijen = [145, 300, 455];
const labels = ['een oefening vragen', 'een uitleg herschrijven', 'slides bij een hoofdstuk'];
rijen.forEach((y, i) => {
  c.rect(720, y, 790, 130, { strokeWidth: 2.4, roughness: 1.4 });
  c.txt(1115, y + 78, labels[i], 38, C.GRAY, 600);
});

rijen.forEach(y => c.arrow(590, 360, 700, y + 62,
  { stroke: C.RED, strokeWidth: 2.5, roughness: 1.3, head: 17 }));

c.save('.', 'kernidee', '');
