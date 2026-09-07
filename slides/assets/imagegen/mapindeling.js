// Stap 2. Eén bestand waar alles in zit, tegenover een map per hoofdstuk en
// een bestand per onderwerp.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node mapindeling.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

// ---------- links: alles in één bestand ----------
c.txt(250, 68, 'cursus_v7_finaal.docx', 38, C.GRAY, 700);
c.rect(95, 95, 310, 400, { strokeWidth: 2.6, roughness: 1.4 });
for (let i = 0; i < 12; i++) {
  const y = 140 + i * 29;
  c.line(130, y, 130 + (i % 4 === 3 ? 140 : 240), y, { strokeWidth: 1.8, roughness: 1.8 });
}
c.lines(250, 560, ['je stuurt alles mee,', 'elke keer opnieuw'], 36, C.GRAY, 600, 'middle', 1.22);

// ---------- rechts: de map ----------
function map(x, y, label, rood) {
  const k = rood ? C.RED : C.GRAY;
  const vul = rood ? C.RED_LIGHT : C.WHITE;
  c.poly([[x, y + 7], [x + 13, y - 6], [x + 37, y - 6], [x + 43, y + 7]],
    { fill: vul, fillStyle: 'solid', stroke: k, strokeWidth: 2, roughness: 1.3 });
  c.rect(x, y + 7, 43, 32, { fill: vul, fillStyle: 'solid', stroke: k, strokeWidth: 2, roughness: 1.3 });
  c.txt(x + 62, y + 34, label, 36, rood ? C.RED_DARK : C.GRAY, 700, 'start');
}
function blad(x, y, label, rood) {
  const k = rood ? C.RED : C.GRAY;
  c.poly([[x, y - 6], [x + 24, y - 6], [x + 34, y + 5], [x + 34, y + 39], [x, y + 39]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: 2, roughness: 1.3 });
  c.txt(x + 54, y + 34, label, 36, rood ? C.RED_DARK : C.GRAY, 500, 'start');
}

const RX = 520, RY = 100, RH = 56;
const rij = i => RY + i * RH;

map(RX, rij(0), 'kansrekenen/', false);
map(RX + 55, rij(1), '01-inleiding/', false);
blad(RX + 120, rij(2), 'wat-is-kans.md', false);
map(RX + 55, rij(3), '02-rekenregels/', false);
blad(RX + 120, rij(4), 'optellen.md', true);
blad(RX + 120, rij(5), 'vermenigvuldigen.md', false);
map(RX + 55, rij(6), 'context/', true);
blad(RX + 120, rij(7), 'regels.md', true);

// de verticale lijnen van de boom
c.line(RX + 22, rij(0) + 43, RX + 22, rij(6) + 22, { strokeWidth: 1.8, roughness: 1.6 });
c.line(RX + 77, rij(1) + 43, RX + 77, rij(2) + 22, { strokeWidth: 1.8, roughness: 1.6 });
c.line(RX + 77, rij(3) + 43, RX + 77, rij(5) + 22, { strokeWidth: 1.8, roughness: 1.6 });

// het ene bestand dat je doorgeeft
c.rect(RX + 110, rij(4) - 12, 330, 56, { fill: 'none', stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.arrow(RX + 460, rij(4) + 16, RX + 555, rij(4) + 16,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 18 });
c.lines(RX + 575, rij(4) + 4, ['dit ene bestand', 'geef je door'], 36, C.RED_DARK, 700, 'start', 1.22);

c.txt(800, 600, 'de andere twaalf blijven waar ze zijn', 36, C.RED_DARK, 700);

c.save('.', 'mapindeling', '');
