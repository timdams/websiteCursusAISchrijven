// Dezelfde boom als in mapindeling.js, maar dan verderop in het deck: de
// contextmap en de regels staan er nu bij, en in het rood staat wat je in je
// eerste sessie aanraakt. Wijzig je de boom hier, wijzig hem dan ook daar.
//
// Beamermaat: canvas hoogstens 670 hoog, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node eerstesessie.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1000, 660);

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

// een tak: de verticale lijn onder een map, met een stuk naar elk kind toe
function tak(xv, yTop, kinderen, breedte, o = {}) {
  c.line(xv, yTop, xv, kinderen[kinderen.length - 1], { strokeWidth: 1.8, roughness: 1.6, ...o });
  kinderen.forEach((y, i) => c.line(xv, y, xv + (Array.isArray(breedte) ? breedte[i] : breedte), y,
    { strokeWidth: 1.8, roughness: 1.6, ...o }));
}

const RX = 110, RY = 100, RH = 56;
const rij = i => RY + i * RH;

map(RX, rij(0), 'kansrekenen/', false);
map(RX + 55, rij(1), '01-inleiding/', false);
blad(RX + 120, rij(2), 'wat-is-kans.md', false);
map(RX + 55, rij(3), '02-rekenregels/', false);
blad(RX + 120, rij(4), 'optellen.md', true);
blad(RX + 120, rij(5), 'vermenigvuldigen.md', false);
map(RX + 55, rij(6), 'context/', true);
blad(RX + 120, rij(7), 'regels.md', true);

// de takken van de boom; de tak bij optellen.md stopt tegen het rode kader
tak(RX + 22, rij(0) + 43, [rij(1) + 23, rij(3) + 23, rij(6) + 23], 33);
tak(RX + 77, rij(1) + 43, [rij(2) + 17], 43);
tak(RX + 77, rij(3) + 43, [rij(4) + 17, rij(5) + 17], [29, 43]);
tak(RX + 77, rij(6) + 43, [rij(7) + 17], 43, { stroke: C.RED });

// het ene bestand dat je doorgeeft
c.rect(RX + 110, rij(4) - 12, 330, 56, { fill: 'none', stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.arrow(RX + 460, rij(4) + 16, RX + 555, rij(4) + 16,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 18 });
c.lines(RX + 575, rij(4) + 4, ['dit ene bestand', 'geef je door'], 36, C.RED_DARK, 700, 'start', 1.22);

c.txt(500, 615, 'de andere twaalf blijven waar ze zijn', 36, C.RED_DARK, 700);

c.save('.', 'eerstesessie', '');
