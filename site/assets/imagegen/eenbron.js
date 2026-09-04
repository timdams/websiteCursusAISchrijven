// Een bron, alle formaten: je past je cursustekst aan, en de rest rolt eruit.
// Draaien vanuit de imagegen-map:  node eenbron.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1660, 840);

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 14, y], [x + w, y + 14], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 10, y + 34 + j * 16, x + w - 10, y + 34 + j * 16,
    { strokeWidth: 1.3, roughness: 1.8 }));
}

// ---------- links: de bron ----------
c.rect(100, 300, 440, 240, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 9,
  fillWeight: 1.3, stroke: C.RED, strokeWidth: 2.6 });
c.txt(320, 350, 'je cursus als gewone tekst', 32, C.RED_DARK, 700);
for (let j = 0; j < 4; j++) doc(150 + j * 88, 380, 68, 110);
c.txt(320, 596, 'je past hier iets aan,', 30, C.GRAY, 600);
c.txt(320, 632, 'en verder nergens', 30, C.GRAY, 600);

// ---------- rechts: de vier formaten ----------
const outputs = [
  [80,  'Word in je schoolsjabloon', 'om in te leveren'],
  [265, 'een pdf om te printen', 'voor op papier'],
  [450, 'slides', 'voor in de les'],
  [635, 'een pagina op het leerplatform', 'voor je studenten'],
];
outputs.forEach(([y, kop, onder]) => {
  c.rect(980, y, 560, 145, { strokeWidth: 2.2 });
  c.txt(1260, y + 62, kop, 36, C.GRAY, 700);
  c.txt(1260, y + 106, onder, 27, C.RED_DARK, 600);
  c.arrow(560, 420, 955, y + 72, { stroke: C.RED, strokeWidth: 2.3, head: 15 });
});

c.save('.', 'eenbron', '');
