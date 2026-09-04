// Voorwoord - de vijf modules op een rij, met waar je mag stoppen
// Draaien vanuit de imagegen-map:  node modules.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(2160, 490);

const BW = 350, GAP = 60, X0 = 90, BY = 130, BH = 210;

const modules = [
  { nr: 'module 0', kop: 'welke ingang',   duur: '5 min',
    onder: ['kies waar je start'] },
  { nr: 'module 1', kop: 'je contextmap',  duur: '15 min', accent: true,
    onder: ['wie hier stopt, heeft', 'het meeste binnen'] },
  { nr: 'module 2', kop: 'je eigen regels', duur: '40 min',
    onder: ['hier zit de meeste winst'] },
  { nr: 'module 3', kop: 'nakijken',        duur: '30 min',
    onder: ['regel of oordeel?', 'dit blijft jouw werk'] },
  { nr: 'module 4', kop: 'brontekst',       duur: 'kijken',
    onder: ['om naar te kijken,', 'niet om te doen'] },
];

modules.forEach((m, i) => {
  const x = X0 + i * (BW + GAP);
  c.txt(x + BW / 2, 92, m.nr, 32, C.RED_DARK, 700);

  const opties = m.accent
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
        stroke: C.RED, strokeWidth: 2.6 }
    : { strokeWidth: 2.2 };
  c.rect(x, BY, BW, BH, opties);
  c.txt(x + BW / 2, BY + 90, m.kop, 40, C.GRAY, 700);
  c.txt(x + BW / 2, BY + 150, m.duur, 32, C.RED_DARK, 700);

  m.onder.forEach((r, j) => c.txt(x + BW / 2, 400 + j * 38, r, 28, C.GRAY, 600));

  if (i < modules.length - 1) {
    c.arrow(x + BW + 10, BY + BH / 2, x + BW + GAP - 10, BY + BH / 2,
      { stroke: C.RED, strokeWidth: 2.2, head: 13 });
  }
});

c.save('.', 'modules', '');
