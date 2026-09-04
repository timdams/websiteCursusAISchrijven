// Module 4 - een bron, vier outputs
// Draaien vanuit de imagegen-map:  node vieroutputs.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1620, 840);

// documentje met een omgeplooide hoek
function doc(x, y, w, h) {
  c.poly([[x, y], [x + w - 14, y], [x + w, y + 14], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
  [0, 1, 2].forEach(j => c.line(x + 10, y + 34 + j * 16, x + w - 10, y + 34 + j * 16,
    { strokeWidth: 1.3, roughness: 1.8 }));
}

// ---------- links: de bron ----------
c.rect(100, 300, 440, 240, { strokeWidth: 2.6 });
c.txt(320, 350, 'je cursus als gewone tekst', 32, C.RED_DARK, 700);
for (let j = 0; j < 4; j++) doc(150 + j * 88, 380, 68, 110);
c.txt(320, 596, 'je past hier iets aan,', 30, C.GRAY, 600);
c.txt(320, 632, 'en verder nergens', 30, C.GRAY, 600);

// ---------- rechts: de vier outputs ----------
const outputs = [
  [80,  'de website', 'doorzoekbaar, met links'],
  [265, 'de syllabus als pdf', 'voor wie print'],
  [450, 'de slides', 'voor de sessie'],
  [635, 'de contextmap als zip', 'wat je meeneemt'],
];
outputs.forEach(([y, kop, onder], i) => {
  const opties = i === 3
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
        stroke: C.RED, strokeWidth: 2.4 }
    : { strokeWidth: 2.2 };
  c.rect(980, y, 520, 145, opties);
  c.txt(1240, y + 62, kop, 38, C.GRAY, 700);
  c.txt(1240, y + 106, onder, 27, C.RED_DARK, 600);
  c.arrow(560, 420, 955, y + 72, { stroke: C.RED, strokeWidth: 2.3, head: 15 });
});

c.save('.', 'vieroutputs', '');
