// Dertig documenten zonder reden tegenover vijf met een reden erbij.
// Draaien vanuit de imagegen-map:  node vijfdocumenten.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1740, 800);

const PY = 150, PH = 520;
const LX = 90, RX = 900, PW = 700;

// ---------- links: de valkuil ----------
c.txt(LX + PW / 2, 108, 'alles wat ik heb', 40, C.GRAY, 700);
c.rect(LX, PY, PW, PH, { strokeWidth: 2.2 });

// 30 documentjes, 6 kolommen x 5 rijen
const dw = 82, dh = 62, gx = 22, gy = 26;
const gridW = 6 * dw + 5 * gx;
const gridH = 5 * dh + 4 * gy;
const gx0 = LX + (PW - gridW) / 2;
const gy0 = PY + (PH - gridH) / 2;
for (let r = 0; r < 5; r++) {
  for (let k = 0; k < 6; k++) {
    c.rect(gx0 + k * (dw + gx), gy0 + r * (dh + gy), dw, dh,
      { strokeWidth: 1.8, roughness: 1.6 });
  }
}
c.txt(LX + PW / 2, PY + PH + 52, 'geen enkele reden opgeschreven', 32, C.GRAY, 600);

// ---------- rechts: de oefening ----------
c.txt(RX + PW / 2, 108, 'vijf documenten', 40, C.RED_DARK, 700);
c.rect(RX, PY, PW, PH, { stroke: C.RED, strokeWidth: 2.4 });

const rijen = [
  ['het hoofdstuk',       'waar je nu aan werkt'],
  ['de vakbeschrijving',  'wat het vak moet opleveren'],
  ['je beginsituatie',    'wat ze al kennen'],
  ['een goed voorbeeld',  'zo moet het klinken'],
  ['een slecht voorbeeld', 'en waarom het slecht is'],
];

const rh = 96;
const ry0 = PY + (PH - rijen.length * rh) / 2 + 14;
rijen.forEach((rij, i) => {
  const y = ry0 + i * rh;
  c.rect(RX + 100, y, 92, 66, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7,
    fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.2, roughness: 1.5 });
  c.txt(RX + 226, y + 30, rij[0], 34, C.GRAY, 700, 'start');
  c.txt(RX + 226, y + 64, rij[1], 27, C.RED_DARK, 600, 'start');
});

c.txt(RX + PW / 2, PY + PH + 52, 'elk met een regel waarom', 32, C.RED_DARK, 700);

c.save('.', 'vijfdocumenten', '');
