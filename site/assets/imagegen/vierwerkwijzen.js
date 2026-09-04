// De vier werkwijzen naast elkaar: waar je bestanden staan en wie ze aanraakt.
// Draaien vanuit de imagegen-map:  node vierwerkwijzen.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(2240, 670);

const KW = 500, KG = 36, X0 = 66;
const BY = 140, BH = 380;

const kolommen = [
  {
    nr: '1', naam: 'alles in de browser',
    rijen: [['je bestanden', 'in je project, online'],
            ['wie schrijft', 'jij'],
            ['je installeert', 'niks']],
    beeld: ['je geeft een stapel', 'kopieën mee'],
    accent: true
  },
  {
    nr: '2', naam: 'browser plus Quarto',
    rijen: [['je bestanden', 'op je eigen laptop'],
            ['wie schrijft', 'jij'],
            ['je installeert', 'Quarto']],
    beeld: ['idem, en de opmaak', 'rolt er vanzelf uit']
  },
  {
    nr: '3', naam: 'de AI werkt in je map',
    rijen: [['je bestanden', 'op je eigen laptop'],
            ['wie schrijft', 'de AI'],
            ['je installeert', 'een tool in je map']],
    beeld: ['je geeft de sleutel', 'van je bureau']
  },
  {
    nr: '4', naam: 'een bron, alle formaten',
    rijen: [['je bestanden', 'in een map met geschiedenis'],
            ['wie schrijft', 'de AI'],
            ['je installeert', 'Quarto en een editor']],
    beeld: ['jullie werken samen', 'in dezelfde map']
  }
];

kolommen.forEach((k, i) => {
  const x = X0 + i * (KW + KG);
  const mid = x + KW / 2;

  c.txt(mid, 64, k.nr, 26, C.GRAY, 600);
  c.txt(mid, 108, k.naam, 34, C.RED_DARK, 700);

  c.rect(x, BY, KW, BH, k.accent
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 9, fillWeight: 1.3,
        stroke: C.RED, strokeWidth: 2.4 }
    : { strokeWidth: 2.2 });

  const rh = BH / 3;
  k.rijen.forEach(([label, waarde], r) => {
    const ry = BY + r * rh;
    if (r > 0) c.line(x + 10, ry, x + KW - 10, ry, { strokeWidth: 1.4, roughness: 1.8 });
    c.txt(mid, ry + 46, label, 25, C.GRAY, 500);
    c.txt(mid, ry + 94, waarde, 30, C.GRAY, 700);
  });

  c.lines(mid, 578, k.beeld, 28, C.GRAY, 600, 'middle', 1.25);
});

c.save('.', 'vierwerkwijzen', '');
