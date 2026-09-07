// Dertig documenten zonder reden tegenover vijf met een reden erbij.
// Overgenomen uit site/assets/imagegen/vijfdocumenten.js en op beamermaat gezet.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node vijfdocumenten.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 620);

const PY = 95, PH = 420;

// ---------- links: de valkuil ----------
c.txt(360, 62, 'alles wat ik heb', 38, C.GRAY, 700);
c.rect(60, PY, 600, PH, { strokeWidth: 2.4, roughness: 1.4 });

const dw = 68, dh = 50, gx = 18, gy = 20;
const gx0 = 60 + (600 - (6 * dw + 5 * gx)) / 2;
const gy0 = PY + (PH - (5 * dh + 4 * gy)) / 2;
for (let r = 0; r < 5; r++) {
  for (let k = 0; k < 6; k++) {
    c.rect(gx0 + k * (dw + gx), gy0 + r * (dh + gy), dw, dh,
      { strokeWidth: 1.8, roughness: 1.6 });
  }
}
c.txt(360, 570, 'geen enkele reden opgeschreven', 34, C.GRAY, 600);

// ---------- rechts: de oefening ----------
c.txt(1130, 62, 'vijf documenten', 38, C.RED_DARK, 700);
c.rect(760, PY, 740, PH, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });

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
  c.rect(810, y, 74, 54, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7,
    fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.4, roughness: 1.5 });
  c.txt(915, y + 26, rij[0], 34, C.GRAY, 700, 'start');
  c.txt(915, y + 60, rij[1], 30, C.RED_DARK, 600, 'start');
});

c.txt(1130, 570, 'elk met een regel waarom', 34, C.RED_DARK, 700);

c.save('.', 'vijfdocumenten', '');
