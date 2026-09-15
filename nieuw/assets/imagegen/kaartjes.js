// kaartjes - een kaart per kernbegrip: citaat bovenaan, een tekening, de les eronder.
// Draaien vanuit deze map:  node kaartjes.js            (alle kaarten)
//                           node kaartjes.js contextisking   (een kaart)
//
// De tekening komt uit een beeldgenerator en staat zonder tekst in beelden/, met
// de prompt ernaast in beelden/<naam>.md. Het citaat en de les zet dit script
// erbij, want een beeldgenerator maakt van letters soep.
const fs = require('fs');
const path = require('path');
const { createCanvas, C } = require('./excal');

const kaarten = [
  {
    naam: 'contextisking',
    citaat: 'context is king',
    beeld: 'beelden/contextisking.png',
    les: 'De AI weet enkel wat in je map ligt. Leg er wat een collega nodig heeft om je vak over te nemen: je opbouw, je leerplan, je beginsituatie. Elk document ligt er met een reden.',
  },
];

const W = 1200, MARGE = 90, BEELD = 900;
const CITAAT = 96, LES = 44, LH = 1.25;
// Kalam is breder dan Caveat: reken ongeveer 0,45 x fontgrootte per teken.
const tekensPerRegel = Math.floor((W - 2 * MARGE) / (LES * 0.45));

function wikkel(tekst, max) {
  const regels = [];
  let regel = '';
  for (const woord of tekst.split(' ')) {
    if (regel && (regel + ' ' + woord).length > max) { regels.push(regel); regel = woord; }
    else regel = regel ? regel + ' ' + woord : woord;
  }
  if (regel) regels.push(regel);
  return regels;
}

function tekenKaart(k) {
  const regels = wikkel(k.les, tekensPerRegel);
  const beeldY = MARGE + CITAAT + 50;
  const lesY = beeldY + BEELD + 90;
  const H = lesY + (regels.length - 1) * LES * LH + MARGE;
  const c = createCanvas(W, H);

  c.rect(24, 24, W - 48, H - 48, { fill: 'none', strokeWidth: 2.4 });
  c.txt(W / 2, MARGE + CITAAT * 0.8, k.citaat, CITAAT, C.RED_DARK, 700);

  let bron = path.join(__dirname, k.beeld);
  if (!fs.existsSync(bron)) {
    console.warn(`${k.beeld} ontbreekt, temmen.png staat op zijn plek`);
    bron = path.join(__dirname, '../../../slides/assets/temmen.png');
  }
  const img = c.document.createElementNS('http://www.w3.org/2000/svg', 'image');
  const href = 'data:image/png;base64,' + fs.readFileSync(bron).toString('base64');
  img.setAttribute('href', href);
  img.setAttribute('x', (W - BEELD) / 2); img.setAttribute('y', beeldY);
  img.setAttribute('width', BEELD); img.setAttribute('height', BEELD);
  c.svg.appendChild(img);

  c.lines(W / 2, lesY, regels, LES, C.GRAY, 400, 'middle', LH);

  // SVG naast dit script, PNG een map hoger in assets/ als kaart-<naam>.png.
  c.save(__dirname, 'kaart-' + k.naam, '');
}

const gevraagd = process.argv[2];
kaarten.filter(k => !gevraagd || k.naam === gevraagd).forEach(tekenKaart);
