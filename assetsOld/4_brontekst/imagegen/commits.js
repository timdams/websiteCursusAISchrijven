// Module 4 - de commitgeschiedenis van Zie Scherp Scherper, vier golven
// Berichten letterlijk uit `git log` van die repo. Niets bijverzonnen.
// Draaien vanuit de imagegen-map:  node commits.js
const { createCanvas, C } = require('./excal');

const golven = [
  ['de pipeline', [
    ['2026-03-23', "let's go"],
    ['2026-03-23', 'build flow'],
    ['2026-03-23', 'build pipeline prepping'],
  ]],
  ['elk hoofdstuk nagelezen', [
    ['2026-06-11', 'h1 review verwerkt'],
    ['2026-06-11', 'h8 review verwerkt'],
    ['2026-06-12', 'h13 review verwerkt'],
    ['2026-06-12', 'exceptions review verwerkt'],
  ]],
  ['de didactiek', [
    ['2026-06-15', 'slides fase 1'],
    ['2026-06-25', 'zie verder sectie'],
    ['2026-06-29', 'stagiari steven'],
    ['2026-07-01', 'poster prompts'],
  ]],
  ['de tekeningen', [
    ['2026-08-25', 'casting afbeeldingen'],
    ['2026-08-28', 'enum en switch tekst en afbeeldingen'],
    ['2026-09-01', 'methoden afbeeldingen'],
  ]],
];

const HKOP = 84, HRIJ = 56, GAP = 34;          // kophoogte, rijhoogte, ruimte tussen golven
const XLIJN = 250, XDATUM = 222, XBERICHT = 296, XKOP = 164;
const TOP = 96;

let hoogte = TOP;
golven.forEach(([, cs], i) => { hoogte += HKOP + cs.length * HRIJ + (i < 3 ? GAP : 0); });
const BODEM = hoogte + 96;

const c = createCanvas(940, BODEM + 40);

let y = TOP;
golven.forEach(([naam, commits], gi) => {
  // kop van de golf: genummerd bolletje plus naam
  const ky = y + HKOP / 2;
  c.circle(XKOP - 44, ky - 6, 52,
    { fill: C.RED_LIGHT, fillStyle: 'solid', stroke: C.RED, strokeWidth: 2.4 });
  c.txt(XKOP - 44, ky + 8, String(gi + 1), 34, C.RED_DARK, 700);
  c.txt(XKOP, ky + 8, naam, 42, C.RED_DARK, 700, 'start');

  y += HKOP;
  // de draad loopt enkel langs de commits, niet door de kop van de golf
  c.line(XLIJN, y + 8, XLIJN, y + commits.length * HRIJ - 8,
    { strokeWidth: 2.4, roughness: 1.6, bowing: 0.6 });

  commits.forEach(([datum, bericht]) => {
    const ry = y + HRIJ / 2;
    c.circle(XLIJN, ry, 22,
      { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2.2 });
    c.txt(XDATUM, ry + 10, datum, 28, C.GRAY, 400, 'end');
    c.txt(XBERICHT, ry + 11, bericht, 34, C.GRAY, 600, 'start');
    y += HRIJ;
  });

  // tussen twee golven zit meer dan wat hier staat
  if (gi < golven.length - 1) {
    for (let k = 0; k < 3; k++) {
      c.circle(XLIJN, y + 6 + k * 10, 5,
        { fill: C.GRAY, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.2, roughness: 0.8 });
    }
    y += GAP;
  }
});

c.txt(470, BODEM + 4, 'tachtig momenten, en bij elk staat waarom', 34, C.RED_DARK, 700);

c.save('.', 'commits', '');
