// Waar een skill vandaan komt: in improve.md stapelen je correcties zich op, en
// zodra er drie over dezelfde taak gaan, verhuizen die drie naar een eigen kaart.
// De twee blokken staan even breed, op dezelfde hoogtes, en de drie regels staan
// links en rechts op exact dezelfde lijn: het zijn dezelfde regels.
//
// LET OP: dit is de slides-versie. site/assets/imagegen/afsprakenofskill.js is
// een andere tekening (regelbestand naast skill) en hoort bij de naslagpagina
// over skills. Die twee lopen bewust uiteen.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node afsprakenofskill.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 600);

const OVER_FIGUREN = [
  'geen titel boven de figuur',
  'tekst raakt nooit een pijl',
  'kijk de PNG na voor je klaar zegt',
];
const BAND_Y = 330, REGEL_Y = 358;
const band = (x) => c.rect(x, BAND_Y, 400, 160, { fill: C.RED_LIGHT, fillStyle: 'hachure',
  hachureGap: 8, fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.2, roughness: 1.4 });
const regels = (x) => OVER_FIGUREN.forEach((r, i) =>
  c.txt(x, REGEL_Y + i * 56, r, 30, C.RED_DARK, 600, 'start'));

// ---------- links: improve.md, waar alles op elkaar ligt ----------
c.rect(40, 70, 560, 460, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(320, 132, 'improve.md', 36, C.RED_DARK, 700);
c.line(75, 162, 565, 162, { stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.2 });
c.txt(150, 225, 'geen bullets in de uitleg', 30, C.GRAY, 500, 'start');
c.txt(150, 281, 'de student is enkelvoud', 30, C.GRAY, 500, 'start');
band(120);
regels(150);

// ---------- de drie die bij elkaar horen, verhuizen ----------
c.txt(780, 380, 'drie regels over dezelfde taak', 30, C.RED_DARK, 700);
c.arrow(610, 410, 950, 410,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 17 });

// ---------- rechts: hun eigen kaart ----------
c.rect(960, 70, 560, 460, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
c.txt(1240, 132, 'een skill: afbeelding', 36, C.RED_DARK, 700);
c.lines(1240, 176, ['wordt enkel meegelezen', 'bij die ene taak'],
  30, C.GRAY, 600, 'middle', 1.3);
c.line(995, 248, 1485, 248, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.2 });
band(1040);
regels(1070);

c.save('.', 'afsprakenofskill', '');
