// De slide waar deze talk mee opent, in zijn twee versies. Links de muur tekst
// die er tot vandaag stond, rechts wat ervan overbleef. Hoort achteraan, bij
// wat er nog niet af is.
//
// Beamermaat: canvas 1560 bij 640, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node versies.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 640);

const PY = 110, PH = 450, PW = 690;
const LX = 40, RX = 830;

// Een slide in het klein: kader, kop en een streepje eronder.
function slide(x, kop) {
  c.rect(x, PY, PW, PH, { strokeWidth: 2.8, roughness: 1.3 });
  c.txt(x + 36, PY + 66, kop, 44, C.GRAY, 700, 'start');
  c.line(x + 36, PY + 90, x + PW - 36, PY + 90, { strokeWidth: 2.2, roughness: 1.4 });
}

// Een stokfiguurtje op een tiende van de gewone maat.
function mini(x, g) {
  const o = { stroke: C.GRAY, strokeWidth: 2, roughness: 1.2 };
  c.circle(x, g - 52, 24, { ...o, fill: C.WHITE, fillStyle: 'solid' });
  c.line(x, g - 40, x, g - 18, o);
  c.line(x, g - 34, x - 13, g - 21, o);
  c.line(x, g - 34, x + 13, g - 21, o);
  c.line(x, g - 18, x - 10, g, o);
  c.line(x, g - 18, x + 10, g, o);
}

c.txt(LX + PW / 2, PY - 26, 'de vorige versie', 34, C.GRAY, 700);
c.txt(RX + PW / 2, PY - 26, 'wat het werd', 34, C.RED_DARK, 700);

// ---------- links: drie punten die niemand leest ----------
slide(LX, 'Disclaimer');
const punten = [
  ['Iedereen werkt hier vermoedelijk al met A.I.', 'De ene wat meer dan de andere.'],
  ['Alles wat hier komt is proefondervindelijk', 'gevonden. Ik reken op jullie voor feedback.'],
  ['Practice what you preach: uiteraard heeft', 'A.I. geholpen met deze slides.'],
];
let y = PY + 152;
punten.forEach((regels, i) => {
  c.txt(LX + 44, y, `${i + 1}.`, 32, C.RED, 700, 'start');
  c.lines(LX + 88, y, regels, 30, C.GRAY, 400, 'start', 1.3);
  y += 112;
});

// ---------- rechts: dezelfde slide, maar dan de tekening ----------
slide(RX, 'Waar deze talk begint');

const G = PY + 320;
c.line(RX + 46, G, RX + PW - 46, G, { strokeWidth: 2.4, roughness: 1.2 });
[64, 116, 168, 226, 292].forEach(d => mini(RX + d, G));
mini(RX + 590, G);

c.line(RX + 46, G - 118, RX + 340, G - 118, { stroke: C.RED, strokeWidth: 2.4, roughness: 1.2 });
c.line(RX + 46, G - 118, RX + 46, G - 100, { stroke: C.RED, strokeWidth: 2.4, roughness: 1.2 });
c.line(RX + 340, G - 118, RX + 340, G - 100, { stroke: C.RED, strokeWidth: 2.4, roughness: 1.2 });
c.txt(RX + 193, G - 134, 'hier begint deze talk', 32, C.RED_DARK, 700);

c.txt(RX + PW / 2, G + 78, 'Roep wanneer iets niet klopt.', 32, C.GRAY, 400);

c.save('.', 'versies', '');
