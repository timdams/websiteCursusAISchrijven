// Kadert wat er komt: eerst de zeven stappen en waarom, daarna hetzelfde in een
// echt venster met de knoppen erbij. Staat voor de slide met volgorde.png.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node tweerondes.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 540);

const BY = 140, BH = 290, BW = 460;
const AX = 140, BX = 960;

// ---------- links: de volgorde ----------
c.txt(AX + BW / 2, 105, 'de volgorde', 44, C.GRAY, 700);
c.rect(AX, BY, BW, BH, { strokeWidth: 2.6 });

[['1', 'schrijf eerst zelf'], ['2', 'alles in droge tekst'], ['3', 'een contextmap']].forEach(([n, s], i) => {
  const y = 200 + i * 62;
  c.circle(AX + 65, y - 10, 46, { strokeWidth: 2.4, roughness: 1.4 });
  c.txt(AX + 65, y + 2, n, 30, C.GRAY, 700);
  c.txt(AX + 110, y + 2, s, 36, C.GRAY, 600, 'start');
});
c.txt(AX + 110, 390, '...', 40, C.GRAY, 700, 'start');

c.txt(AX + BW / 2, 485, 'wat je doet, en waarom', 36, C.GRAY, 600);

// ---------- de pijl ertussen ----------
c.arrow(620, 285, 940, 285, { stroke: C.RED, strokeWidth: 3.2, roughness: 1.4, head: 20 });
c.txt(780, 255, 'en dan', 36, C.RED_DARK, 700);

// ---------- rechts: jouw venster ----------
c.txt(BX + BW / 2, 105, 'in jouw venster', 44, C.RED_DARK, 700);
c.rect(BX, BY, BW, BH, { stroke: C.RED, strokeWidth: 2.8 });

// titelbalk met drie bolletjes, en een zijbalk met drie knoppen
c.line(BX, 195, BX + BW, 195, { strokeWidth: 2.2 });
[0, 1, 2].forEach(i => c.circle(BX + 25 + i * 27, 168, 15, { fill: C.GRAY, fillStyle: 'solid', strokeWidth: 1.4 }));
c.line(BX + 130, 195, BX + 130, BY + BH, { strokeWidth: 2.2 });
[235, 285, 335].forEach(y => c.line(BX + 45, y, BX + 112, y, { strokeWidth: 3, roughness: 1.2 }));

// de knop die je zoekt, met de muis ernaast
c.ellipse(BX + 75, 285, 100, 44, { fill: undefined, stroke: C.RED, strokeWidth: 3, roughness: 1.7 });
const mx = BX + 140, my = 268;
c.poly([[mx, my], [mx, my + 42], [mx + 10, my + 32], [mx + 17, my + 46], [mx + 25, my + 42],
  [mx + 18, my + 28], [mx + 31, my + 28]], { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2, roughness: 1 });

[235, 285, 335].forEach(y => c.line(BX + 200, y, BX + 430, y, { strokeWidth: 2.4, roughness: 1.2 }));

c.txt(BX + BW / 2, 485, 'waar je klikt, en hoe het heet', 36, C.RED_DARK, 700);

c.save('.', 'tweerondes', '');
