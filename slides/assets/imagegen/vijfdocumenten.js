// Dertig documenten, waarvan je er vijf kiest en er de reden bij schrijft.
// Overgenomen uit site/assets/imagegen/vijfdocumenten.js en op beamermaat gezet.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node vijfdocumenten.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 620);

const PY = 95, PH = 420;
const LX = 55, LW = 585;          // links: je schijf
const RX = 971, RW = 526;         // rechts: de vijf, uitvergroot

// documentje met omgeplooide hoek; gekozen exemplaren staan rood en gearceerd
function doc(x, y, w, h, gekozen) {
  const f = Math.max(11, w * 0.2);
  c.poly([[x, y], [x + w - f, y], [x + w, y + f], [x + w, y + h], [x, y + h]],
    gekozen
      ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.5,
          stroke: C.RED, strokeWidth: 2.4, roughness: 1.4 }
      : { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.5 });
  if (!gekozen) {
    [0, 1].forEach(j => c.line(x + 10, y + h * 0.55 + j * h * 0.25, x + w - 12, y + h * 0.55 + j * h * 0.25,
      { strokeWidth: 1.2, roughness: 1.0, bowing: 0.6 }));
  }
}

// ---------- links: alles wat er al staat ----------
c.txt(LX + LW / 2, 62, 'alles wat ik heb', 38, C.GRAY, 700);
c.rect(LX, PY, LW, PH, { strokeWidth: 2.4, roughness: 1.4 });

// 30 documentjes, 6 kolommen x 5 rijen; deze vijf zijn de gekozen
const gekozen = new Set(['0,1', '1,4', '2,2', '3,0', '4,3']);
const dw = 64, dh = 52, gx = 17, gy = 22;
const gx0 = LX + (LW - (6 * dw + 5 * gx)) / 2;
const gy0 = PY + (PH - (5 * dh + 4 * gy)) / 2;
for (let r = 0; r < 5; r++) {
  for (let k = 0; k < 6; k++) {
    doc(gx0 + k * (dw + gx), gy0 + r * (dh + gy), dw, dh, gekozen.has(`${r},${k}`));
  }
}
c.txt(LX + LW / 2, 570, 'dertig, allemaal even zwaar', 34, C.GRAY, 600);

// ---------- ertussen: de handeling ----------
c.txt(805, 268, 'je kiest er vijf uit', 34, C.RED_DARK, 700);
c.arrow(655, 308, 956, 308, { stroke: C.RED, strokeWidth: 2.8, head: 18 });

// ---------- rechts: dezelfde vijf, met hun reden ----------
c.txt(RX + RW / 2, 62, 'vijf documenten', 38, C.RED_DARK, 700);
c.rect(RX, PY, RW, PH, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });

const rijen = [
  ['het hoofdstuk',        'waar je nu aan werkt'],
  ['de vakbeschrijving',   'wat het vak moet opleveren'],
  ['je beginsituatie',     'wat ze al kennen'],
  ['een goed voorbeeld',   'zo moet het klinken'],
  ['een slecht voorbeeld', 'en waarom het slecht is'],
];

const rh = 78;
const ry0 = PY + (PH - rijen.length * rh) / 2 + 12;
rijen.forEach((rij, i) => {
  const y = ry0 + i * rh;
  doc(RX + 55, y, 74, 54, true);
  c.txt(RX + 150, y + 26, rij[0], 34, C.GRAY, 700, 'start');
  c.txt(RX + 150, y + 60, rij[1], 30, C.RED_DARK, 600, 'start');
});

c.txt(RX + RW / 2, 570, 'elk met een regel waarom', 34, C.RED_DARK, 700);

c.save('.', 'vijfdocumenten', '');
