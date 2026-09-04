// Module 0 - de drie niveaus als oplopende trap, in Word-termen
// Draaien vanuit de imagegen-map:  node niveaus.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1620, 620);

const BW = 400, BH = 175;
const kolommen = [
  { x: 120,  y: 360, nr: 'niveau 1',
    metafoor: ['je geeft een stapel', 'kopieën mee'],
    bij: 'de AI kent je materiaal' },
  { x: 600,  y: 260, nr: 'niveau 2',
    metafoor: ['je geeft de sleutel', 'van je bureau'],
    bij: 'de AI werkt in je materiaal' },
  { x: 1080, y: 160, nr: 'niveau 3',
    metafoor: ['jullie werken samen', 'in dezelfde map'],
    bij: 'met geschiedenis erbij' },
];

kolommen.forEach((k, i) => {
  // nummer boven de box, ruim erboven zodat het de rand niet raakt
  c.txt(k.x + BW / 2, k.y - 32, k.nr, 38, C.RED_DARK, 700);

  // de laatste box krijgt het accent: daar komt het meeste bij
  const opties = i === 2
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.5,
        stroke: C.RED, strokeWidth: 2.4 }
    : { strokeWidth: 2.2 };
  c.rect(k.x, k.y, BW, BH, opties);

  // twee regels, verticaal gecentreerd in de box
  const size = 34;
  const startY = k.y + BH / 2 - size * 0.5 + size * 0.34;
  k.metafoor.forEach((r, j) => c.txt(k.x + BW / 2, startY + j * size * 1.15, r, size, C.GRAY, 600));

  // wat er bijkomt, onder de box
  c.txt(k.x + BW / 2, k.y + BH + 48, k.bij, 30, C.RED_DARK, 700);
});

// pijlen tussen de boxen: van rand tot rand, ruim onder het nummer van de volgende
c.arrow(535, 415, 585, 350, { stroke: C.RED, strokeWidth: 2.4, head: 14 });
c.arrow(1015, 315, 1065, 250, { stroke: C.RED, strokeWidth: 2.4, head: 14 });

c.save('.', 'niveaus', '');
