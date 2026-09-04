// Module 3 - de drie lagen waarop je nakijkt, en wat elke laag aan regels oplevert
// Draaien vanuit de imagegen-map:  node drielagen.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1640, 740);

const BX = 290, BW = 760, BH = 170;
const lagen = [
  { y: 110, nr: 'laag 1', kop: 'klopt het',
    onder: 'een verkeerde uitleg ziet er even verzorgd uit', oogst: 'zelden een regel' },
  { y: 300, nr: 'laag 2', kop: 'past het bij mijn groep',
    onder: 'correcte uitleg, met voorkennis van later erin', oogst: 'soms een regel' },
  { y: 490, nr: 'laag 3', kop: 'klinkt het als jou',
    onder: 'de gladde slotzin, de em-dash', oogst: 'bijna altijd een regel', accent: true },
];

c.txt(BX + BW / 2, 64, 'waarop je nakijkt', 36, C.GRAY, 700);
c.txt(1360, 64, 'wordt dit een regel?', 36, C.RED_DARK, 700);

lagen.forEach(l => {
  c.txt(250, l.y + BH / 2 + 10, l.nr, 32, C.RED_DARK, 700, 'end');
  c.rect(BX, l.y, BW, BH, { strokeWidth: 2.2 });
  c.txt(BX + BW / 2, l.y + 68, l.kop, 40, C.GRAY, 700);
  c.txt(BX + BW / 2, l.y + 118, l.onder, 27, C.GRAY, 500);

  c.arrow(BX + BW + 25, l.y + BH / 2, 1130, l.y + BH / 2,
    { stroke: C.RED, strokeWidth: 2.2, head: 13 });

  const opties = l.accent
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
        stroke: C.RED, strokeWidth: 2.4 }
    : { strokeWidth: 2.2 };
  c.rect(1160, l.y + 35, 400, 100, opties);
  c.txt(1360, l.y + 98, l.oogst, 32, l.accent ? C.RED_DARK : C.GRAY, 700);
});

c.save('.', 'drielagen', '');
