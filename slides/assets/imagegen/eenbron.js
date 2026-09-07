// Een bron, alle formaten: je past je cursustekst aan, en de rest rolt eruit.
// Overgenomen uit site/assets/imagegen/eenbron.js en op beamermaat gezet.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node eenbron.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 640);

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 14, y], [x + w, y + 14], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 10, y + 32 + j * 16, x + w - 10, y + 32 + j * 16,
    { strokeWidth: 1.4, roughness: 1.8 }));
}

// ---------- links: de bron ----------
c.rect(60, 230, 420, 220, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 9,
  fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });
c.txt(270, 286, 'je cursus als gewone tekst', 36, C.RED_DARK, 700);
for (let j = 0; j < 4; j++) doc(100 + j * 85, 315, 66, 105);
c.lines(270, 505, ['je past hier iets aan,', 'en verder nergens'], 34, C.GRAY, 600, 'middle', 1.25);

// ---------- rechts: de vier formaten ----------
const outputs = [
  [40,  'Word in je schoolsjabloon', 'om in te leveren'],
  [190, 'een pdf om te printen', 'voor op papier'],
  [340, 'slides', 'voor in de les'],
  [490, 'een pagina op het leerplatform', 'voor je studenten'],
];
outputs.forEach(([y, kop, onder]) => {
  c.rect(900, y, 620, 120, { strokeWidth: 2.4, roughness: 1.4 });
  c.txt(1210, y + 54, kop, 36, C.GRAY, 700);
  c.txt(1210, y + 96, onder, 30, C.RED_DARK, 600);
  c.arrow(500, 340, 875, y + 58, { stroke: C.RED, strokeWidth: 2.5, roughness: 1.3, head: 17 });
});

c.save('.', 'eenbron', '');
