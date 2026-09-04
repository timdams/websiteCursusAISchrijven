// Module 2 - dezelfde map voor en na een opdracht op niveau 2
// De bestandsnamen en de vier gewijzigde bestanden komen uit de commit
// "Cowork er op los laten...spannend" (2026-06-04) in Zie Scherp Scherper.
// Draaien vanuit de imagegen-map:  node cowork.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1840, 830);

const PY = 150, PH = 580, PW = 800;
const LX = 70, RX = 970;
const RIJ = 60;

// niveau in de boom -> inspringing
const IN = [40, 95, 150];

const rijen = [
  [0, 'mijn cursusmap/',    null],
  [1, 'CLAUDE.md',          'afspraken'],
  [1, '21_bestanden/',      null],
  [2, 'bestandenintro.md',  null],
  [2, 'fileinfo.md',        'gewijzigd'],
  [2, 'kennisclips.md',     'gewijzigd'],
  [2, 'review.md',          'gewijzigd'],
  [2, 'schrijvenenlezen.md', null],
  [2, 'serialize.md',       'gewijzigd'],
];

const y0 = PY + (PH - rijen.length * RIJ) / 2;

function paneel(px, kop, onder, toonGewijzigd) {
  c.txt(px + PW / 2, 108, kop, 40, toonGewijzigd ? C.RED_DARK : C.GRAY, 700);
  c.rect(px, PY, PW, PH, { strokeWidth: 2.4, stroke: toonGewijzigd ? C.RED : C.GRAY });

  rijen.forEach(([niveau, naam, soort], i) => {
    const top = y0 + i * RIJ;
    const tx = px + IN[niveau];
    const bandX = tx - 16, bandW = 330;
    const labelX = px + 500;   // ruim voorbij de breedste band, zodat niets elkaar raakt

    if (soort === 'gewijzigd' && toonGewijzigd) {
      c.rect(bandX, top + 6, bandW, 48, { fill: C.RED_LIGHT, fillStyle: 'hachure',
        hachureGap: 7, fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.2, roughness: 1.5 });
      c.txt(labelX, top + 40, 'gewijzigd', 26, C.RED_DARK, 700, 'start');
    }
    if (soort === 'afspraken') {
      c.rect(bandX, top + 6, bandW, 48, { fill: C.WHITE, fillStyle: 'solid',
        stroke: C.RED, strokeWidth: 2.2, roughness: 1.5, strokeLineDash: [12, 10] });
      c.txt(labelX, top + 40, toonGewijzigd ? 'gelezen' : 'je afsprakendocument',
        26, C.RED_DARK, 700, 'start');
    }

    const vet = niveau === 0 || naam.endsWith('/') ? 700 : 500;
    c.txt(tx, top + 40, naam, 32, C.GRAY, vet, 'start');
  });

  c.txt(px + PW / 2, PY + PH + 54, onder, 30, toonGewijzigd ? C.RED_DARK : C.GRAY, 600);
}

paneel(LX, 'voor', 'zeven bestanden, je afspraken ertussen', false);
paneel(RX, 'na een opdracht', 'vier bestanden aangepast door de agent zelf', true);

c.arrow(LX + PW + 20, PY + PH / 2, RX - 20, PY + PH / 2,
  { stroke: C.RED, strokeWidth: 2.6, head: 16 });

c.save('.', 'cowork', '');
