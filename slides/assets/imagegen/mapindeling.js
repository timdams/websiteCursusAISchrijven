// Stap 2. Dezelfde cursus twee keer: links het ene docx met zijn hoofdstukken
// erin, rechts diezelfde hoofdstukken als mappen. Alleen de vorm: geen
// contextmap, geen regels, geen rood. Die komen op stap 3 en 4, en de payoff
// staat in eerstesessie.js.
//
// Beamermaat: canvas hoogstens 670 hoog, zie MAATVOERING.md. Smaller dan 1560
// omdat de tekening anders rechts een lege strook krijgt; de schaal blijft 0,98.
// Draaien vanuit de imagegen-map:  node mapindeling.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1200, 650);

// ---------- links: alles in één bestand ----------
c.txt(245, 68, 'kansrekenen_v7_finaal.docx', 36, C.GRAY, 700);
c.rect(90, 95, 310, 400, { strokeWidth: 2.6, roughness: 1.4 });

// twee hoofdstukken, met dezelfde namen als de mappen rechts
[['1  Inleiding', 160], ['2  Rekenregels', 318]].forEach(([kop, y]) => {
  c.txt(122, y, kop, 30, C.GRAY, 700, 'start');
  [246, 246, 246, 152].forEach((len, i) =>
    c.line(122, y + 32 + i * 28, 122 + len, y + 32 + i * 28, { strokeWidth: 1.8, roughness: 1.8 }));
});
c.txt(245, 565, 'alles in één bestand', 36, C.GRAY, 600);

// ---------- ertussen: de handeling ----------
c.txt(550, 278, 'je knipt hem in stukken', 32, C.GRAY, 700);
c.arrow(420, 320, 680, 320, { strokeWidth: 2.6, roughness: 1.3, head: 18 });

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
// een tak: de verticale lijn onder een map, met een stuk naar elk kind toe
function tak(xv, yTop, kinderen, breedte, o = {}) {
  c.line(xv, yTop, xv, kinderen[kinderen.length - 1], { strokeWidth: 1.8, roughness: 1.6, ...o });
  kinderen.forEach((y, i) => c.line(xv, y, xv + (Array.isArray(breedte) ? breedte[i] : breedte), y,
    { strokeWidth: 1.8, roughness: 1.6, ...o }));
}

const RX = 700, RY = 150, RH = 56;
const rij = i => RY + i * RH;

map(RX, rij(0), 'kansrekenen/');
map(RX + 55, rij(1), '01-inleiding/');
blad(RX + 120, rij(2), 'wat-is-kans.md');
map(RX + 55, rij(3), '02-rekenregels/');
blad(RX + 120, rij(4), 'optellen.md');
blad(RX + 120, rij(5), 'vermenigvuldigen.md');

tak(RX + 22, rij(0) + 43, [rij(1) + 23, rij(3) + 23], 33);
tak(RX + 77, rij(1) + 43, [rij(2) + 17], 43);
tak(RX + 77, rij(3) + 43, [rij(4) + 17, rij(5) + 17], 43);

c.lines(900, 565, ['een map per hoofdstuk,', 'een bestand per onderwerp'], 36, C.GRAY, 600, 'middle', 1.22);

c.save('.', 'mapindeling', '');
