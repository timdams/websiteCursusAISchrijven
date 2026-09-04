// Module 2 - de lus met module 3: nakijken levert de regels op die je hier opschrijft
// Draaien vanuit de imagegen-map:  node delus.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1480, 810);

const LX = 110, RX = 900, BW = 460, BH = 150;

// ---------- de vier stations ----------
c.txt(LX + BW / 2, 82, 'module 2', 30, C.RED_DARK, 700);
c.rect(LX, 110, BW, BH, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
  stroke: C.RED, strokeWidth: 2.4 });
c.txt(LX + BW / 2, 200, 'je afsprakendocument', 36, C.GRAY, 700);

c.rect(RX, 110, BW, BH, { strokeWidth: 2.2 });
c.txt(RX + BW / 2, 200, 'je vraagt een stuk tekst', 34, C.GRAY, 600);

c.txt(RX + BW / 2, 352, 'module 3', 30, C.RED_DARK, 700);
c.rect(RX, 380, BW, BH, { strokeWidth: 2.4, stroke: C.RED });
c.txt(RX + BW / 2, 470, 'je leest het na', 36, C.GRAY, 700);

c.rect(LX, 380, BW, BH, { strokeWidth: 2.2 });
c.txt(LX + BW / 2, 450, 'je vindt iets.', 34, C.GRAY, 600);
c.txt(LX + BW / 2, 496, 'keert het terug?', 34, C.GRAY, 700);

// ---------- de lus ----------
c.arrow(LX + BW + 20, 185, RX - 25, 185, { stroke: C.RED, strokeWidth: 2.4, head: 15 });
c.arrow(RX + BW - 90, 285, RX + BW - 90, 348, { stroke: C.RED, strokeWidth: 2.4, head: 15 });
c.arrow(RX - 25, 455, LX + BW + 20, 455, { stroke: C.RED, strokeWidth: 2.4, head: 15 });
c.arrow(LX + 150, 375, LX + 150, 268, { stroke: C.RED, strokeWidth: 2.4, head: 15 });
c.txt(LX + 176, 330, 'ja: schrijf hem op', 28, C.RED_DARK, 700, 'start');

// ---------- wat de lus verlaat ----------
c.arrow(LX + 340, 540, RX - 15, 690, { stroke: C.GRAY, strokeWidth: 2.4, head: 15 });
c.txt(620, 570, 'nee', 28, C.GRAY, 700, 'start');
c.rect(RX, 640, BW, 120, { strokeWidth: 2.2, strokeLineDash: [12, 10] });
c.txt(RX + BW / 2, 712, 'een oordeel, jouw werk', 34, C.GRAY, 600);

c.save('.', 'delus', '');
