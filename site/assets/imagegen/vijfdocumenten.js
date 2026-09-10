// Dertig documenten, waarvan je er vijf kiest en er de reden bij schrijft.
// Draaien vanuit de imagegen-map:  node vijfdocumenten.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1600, 800);

const PY = 150, PH = 520;
const LX = 60, LW = 600;          // links: je schijf
const RX = 1000, RW = 540;        // rechts: de vijf, uitvergroot

// documentje met omgeplooide hoek; gekozen exemplaren staan rood en gearceerd
function doc(x, y, w, h, gekozen) {
  const f = Math.max(11, w * 0.2);
  c.poly([[x, y], [x + w - f, y], [x + w, y + f], [x + w, y + h], [x, y + h]],
    gekozen
      ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.4,
          stroke: C.RED, strokeWidth: 2.4, roughness: 1.4 }
      : { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.5 });
  if (!gekozen) {
    [0, 1].forEach(j => c.line(x + 11, y + h * 0.55 + j * 15, x + w - 13, y + h * 0.55 + j * 15,
      { strokeWidth: 1.2, roughness: 1.0, bowing: 0.6 }));
  }
}

// ---------- links: alles wat er al staat ----------
c.txt(LX + LW / 2, 108, 'alles wat ik heb', 40, C.GRAY, 700);
c.rect(LX, PY, LW, PH, { strokeWidth: 2.2 });

// 30 documentjes, 6 kolommen x 5 rijen; deze vijf zijn de gekozen
const gekozen = new Set(['0,1', '1,4', '2,2', '3,0', '4,3']);
const dw = 70, dh = 60, gx = 18, gy = 26;
const gx0 = LX + (LW - (6 * dw + 5 * gx)) / 2;
const gy0 = PY + (PH - (5 * dh + 4 * gy)) / 2;
for (let r = 0; r < 5; r++) {
  for (let k = 0; k < 6; k++) {
    doc(gx0 + k * (dw + gx), gy0 + r * (dh + gy), dw, dh, gekozen.has(`${r},${k}`));
  }
}
c.txt(LX + LW / 2, PY + PH + 52, 'dertig, allemaal even zwaar', 32, C.GRAY, 600);

// ---------- ertussen: de handeling ----------
c.txt(830, 384, 'je kiest er vijf uit', 34, C.RED_DARK, 700);
c.arrow(675, 424, 985, 424, { stroke: C.RED, strokeWidth: 2.6, head: 18 });

// ---------- rechts: dezelfde vijf, met hun reden ----------
c.txt(RX + RW / 2, 108, 'vijf documenten', 40, C.RED_DARK, 700);
c.rect(RX, PY, RW, PH, { stroke: C.RED, strokeWidth: 2.4 });

const rijen = [
  ['het hoofdstuk',        'waar je nu aan werkt'],
  ['de vakbeschrijving',   'wat het vak moet opleveren'],
  ['je beginsituatie',     'wat ze al kennen'],
  ['een goed voorbeeld',   'zo moet het klinken'],
  ['een slecht voorbeeld', 'en waarom het slecht is'],
];

const rh = 96;
const ry0 = PY + (PH - rijen.length * rh) / 2 + 14;
rijen.forEach((rij, i) => {
  const y = ry0 + i * rh;
  doc(RX + 60, y, 92, 66, true);
  c.txt(RX + 180, y + 30, rij[0], 34, C.GRAY, 700, 'start');
  c.txt(RX + 180, y + 64, rij[1], 27, C.RED_DARK, 600, 'start');
});

c.txt(RX + RW / 2, PY + PH + 52, 'elk met een regel waarom', 32, C.RED_DARK, 700);

c.save('.', 'vijfdocumenten', '');
