// Module 0 - wat je in een schermafbeelding ziet, en wat het gewoon is
// Draaien vanuit de imagegen-map:  node vertaling.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1200, 960);

const LX = 90, LW = 400, RX = 620, BH = 170;
const ROWS = [110, 325, 540, 755];

// mapje met een tab, gebruikt in de mappenboom
function folder(x, y, w, h) {
  c.poly([[x, y], [x + 24, y], [x + 32, y + 9], [x + w, y + 9], [x + w, y + h], [x, y + h]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.4 });
}

// ---------- kolomlabels ----------
c.txt(LX + LW / 2, 62, 'wat je ziet', 38, C.GRAY, 700);
c.txt(RX, 62, 'wat het is', 38, C.RED_DARK, 700, 'start');

// ---------- rij 1: de mappenboom ----------
(function boom(y) {
  c.rect(LX, y, LW, BH, { strokeWidth: 2.2 });
  const items = [[LX + 50, 'mijn olod'], [LX + 100, 'hoofdstuk 1'], [LX + 100, 'hoofdstuk 2']];
  items.forEach(([x, label], j) => {
    const iy = y + 34 + j * 44;
    folder(x, iy, 40, 30);
    c.txt(x + 56, iy + 25, label, 26, C.GRAY, 600, 'start');
  });
})(ROWS[0]);

// ---------- rij 2: de editor ----------
(function editor(y) {
  c.rect(LX, y, LW, BH, { strokeWidth: 2.2 });
  c.line(LX, y + 38, LX + LW, y + 38, { strokeWidth: 1.6 });
  c.line(LX + 40, y + 70, LX + 250, y + 70, { stroke: C.RED, strokeWidth: 2.4, roughness: 1.8 });
  [300, 190, 280, 140].forEach((w, j) =>
    c.line(LX + 40, y + 100 + j * 20, LX + 40 + w, y + 100 + j * 20, { strokeWidth: 2, roughness: 1.8 }));
})(ROWS[1]);

// ---------- rij 3: het zwarte venster ----------
(function terminal(y) {
  c.rect(LX, y, LW, BH, { fill: C.GRAY, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2.2 });
  c.txt(LX + 40, y + BH / 2 + 12, '> quarto render', 34, C.OFFWHITE, 700, 'start');
})(ROWS[2]);

// ---------- rij 4: de pagina online ----------
(function pagina(y) {
  c.rect(LX, y, LW, BH, { strokeWidth: 2.2 });
  c.rect(LX, y, LW, 38, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.3,
    stroke: C.GRAY, strokeWidth: 1.8 });
  ['hoofdstuk 7 herschreven', 'twee regels erbij', 'figuur vervangen'].forEach((r, j) => {
    const ry = y + 80 + j * 32;
    c.txt(LX + 30, ry, r, 24, C.GRAY, 600, 'start');
    c.line(LX + 320, ry - 8, LX + 370, ry - 8, { strokeWidth: 1.6, roughness: 1.8 });
  });
})(ROWS[3]);

// ---------- pijlen en de rechterkolom ----------
const uitleg = [
  'de Verkenner, met één map per hoofdstuk',
  'cursustekst, in Kladblok in plaats van in Word',
  'één regel die je één keer intikt',
  'dezelfde map, online, met de geschiedenis erbij',
];
ROWS.forEach((y, i) => {
  c.arrow(LX + LW + 20, y + BH / 2, RX - 30, y + BH / 2, { stroke: C.RED, strokeWidth: 2.2, head: 14 });
  c.txt(RX, y + BH / 2 + 11, uitleg[i], 32, C.GRAY, 600, 'start');
});

c.save('.', 'vertaling', '');
