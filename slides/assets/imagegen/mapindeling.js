// Stap 2. Eén bestand waar alles in zit, tegenover een map per hoofdstuk en
// een bestand per onderwerp. Alleen de vorm: geen contextmap, geen regels, geen
// rood. Die komen op stap 3 en 4, en de payoff staat in eerstesessie.js.
//
// Beamermaat: canvas hoogstens 670 hoog, zie MAATVOERING.md. Smaller dan 1560
// omdat de tekening anders rechts een lege strook krijgt; de schaal blijft 1,03.
// Draaien vanuit de imagegen-map:  node mapindeling.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1060, 650);

// ---------- links: alles in één bestand ----------
c.txt(250, 68, 'cursus_v7_finaal.docx', 38, C.GRAY, 700);
c.rect(95, 95, 310, 400, { strokeWidth: 2.6, roughness: 1.4 });
for (let i = 0; i < 12; i++) {
  const y = 140 + i * 29;
  c.line(130, y, 130 + (i % 4 === 3 ? 140 : 240), y, { strokeWidth: 1.8, roughness: 1.8 });
}
c.txt(250, 565, 'alles in één bestand', 36, C.GRAY, 600);

// ---------- rechts: dezelfde cursus als map ----------
function map(x, y, label) {
  c.poly([[x, y + 7], [x + 13, y - 6], [x + 37, y - 6], [x + 43, y + 7]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.3 });
  c.rect(x, y + 7, 43, 32, { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.3 });
  c.txt(x + 62, y + 34, label, 36, C.GRAY, 700, 'start');
}
function blad(x, y, label) {
  c.poly([[x, y - 6], [x + 24, y - 6], [x + 34, y + 5], [x + 34, y + 39], [x, y + 39]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.3 });
  c.txt(x + 54, y + 34, label, 36, C.GRAY, 500, 'start');
}

const RX = 560, RY = 150, RH = 56;
const rij = i => RY + i * RH;

map(RX, rij(0), 'kansrekenen/');
map(RX + 55, rij(1), '01-inleiding/');
blad(RX + 120, rij(2), 'wat-is-kans.md');
map(RX + 55, rij(3), '02-rekenregels/');
blad(RX + 120, rij(4), 'optellen.md');
blad(RX + 120, rij(5), 'vermenigvuldigen.md');

// de verticale lijnen van de boom
c.line(RX + 22, rij(0) + 43, RX + 22, rij(3) + 22, { strokeWidth: 1.8, roughness: 1.6 });
c.line(RX + 77, rij(1) + 43, RX + 77, rij(2) + 22, { strokeWidth: 1.8, roughness: 1.6 });
c.line(RX + 77, rij(3) + 43, RX + 77, rij(5) + 22, { strokeWidth: 1.8, roughness: 1.6 });

c.lines(760, 565, ['een map per hoofdstuk,', 'een bestand per onderwerp'], 36, C.GRAY, 600, 'middle', 1.22);

c.save('.', 'mapindeling', '');
