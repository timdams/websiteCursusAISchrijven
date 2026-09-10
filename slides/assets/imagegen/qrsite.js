// De QR-code naar de site, in de stijl van de rest van de tekeningen.
// Handgetekende modules (rough.js) in plaats van strakke vierkantjes, met de
// drie zoekvierkanten in het rood. Foutcorrectie staat op H (30%), zodat het
// gewiebel van de lijnen ruim binnen de marge van de scanner blijft.
//
// Draaien vanuit de imagegen-map:  node qrsite.js
const { createCanvas, C } = require('./excal');
const qrgen = require('qrcode-generator');

const URL = 'https://timdams.github.io/websiteCursusAISchrijven';

const qr = qrgen(0, 'H');
qr.addData(URL);
qr.make();
const N = qr.getModuleCount();          // 41 bij deze url op niveau H

const M = 18;                            // modulegrootte in px
const PAD = 81;                          // stille zone, ruim 4 modules
const SIZE = N * M + PAD * 2;

const c = createCanvas(SIZE, SIZE);

// De achtergrond van excal.js is offwhite; een QR wil wit onder zich.
c.rect(-4, -4, SIZE + 8, SIZE + 8, { fill: C.WHITE, fillStyle: 'solid', stroke: C.WHITE, roughness: 0 });

const px = i => PAD + i * M;

// ---------- de drie zoekvierkanten ----------
// Ring van 7x7 met een kern van 3x3. Als losse vormen getekend, want dat is
// het stuk waar de scanner op mikt en waar het handgetekende het best uitkomt.
function zoeker(col, row) {
  const x = px(col), y = px(row);
  c.rect(x + M / 2, y + M / 2, M * 6, M * 6, {
    fill: 'none', stroke: C.RED_DARK, strokeWidth: M, roughness: 0.55, bowing: 0.6, seed: col + row + 7
  });
  c.rect(x + M * 2, y + M * 2, M * 3, M * 3, {
    fill: C.RED_DARK, fillStyle: 'solid', fillWeight: M / 2,
    stroke: C.RED_DARK, strokeWidth: M / 1.6, roughness: 0.6, bowing: 0.6, seed: col + row + 13
  });
}
const zoekers = [[0, 0], [N - 7, 0], [0, N - 7]];
const inZoeker = (col, row) => zoekers.some(([zc, zr]) => col >= zc && col < zc + 7 && row >= zr && row < zr + 7);

// ---------- de datamodules ----------
// Vaste seed per module: hetzelfde script geeft twee keer dezelfde tekening.
// De vierkantjes worden een halve pixel te groot getekend, zodat buren aan
// elkaar vastzitten en er geen witte haarlijnen door een vlak lopen.
let seed = 1;
for (let row = 0; row < N; row++) {
  for (let col = 0; col < N; col++) {
    if (!qr.isDark(row, col) || inZoeker(col, row)) continue;
    const s = (seed = (seed * 1103515245 + 12345) & 0x7fffffff);
    const jx = ((s % 100) / 100 - 0.5) * 1.4;
    const jy = (((s >> 7) % 100) / 100 - 0.5) * 1.4;
    c.rect(px(col) + jx - 0.5, px(row) + jy - 0.5, M + 1, M + 1, {
      fill: C.GRAY, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.6,
      roughness: 0.7, bowing: 0.8, seed: s % 2048
    });
  }
}
zoekers.forEach(([col, row]) => zoeker(col, row));

c.save('.', 'qrsite', '');
