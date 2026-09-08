// Stap 5. De lus begint en eindigt in je regelbestand: daar staat de afspraak
// dat de AI je correcties bijhoudt, en daar komt de regel achteraf ook bij.
//
// De vorige versie startte bij "jij corrigeert" en liet het regelbestand pas
// rechts opduiken. Wie de tekening las, zag improve.md uit het niets komen: de
// afspraak die het aanzet stond er niet op, en dat is net het punt van deze
// stap. Nu staat het regelbestand links, met die afspraak voluit in een rood
// kader, en de terugpijl komt op datzelfde bestand uit.
//
// In het middelste kader staat de correctie met aanhalingstekens rond de twee
// stukken tekst zelf. Stond er "niet we gaan nu kijken, maar we bekijken",
// met één paar aanhalingstekens rond het geheel, dan las je niet welk stuk de
// afgekeurde zin was en welk de vervanging.
//
// Er lopen twee lussen terug, en dat onderscheid is het punt van de tekening.
// Bovenaan de snelle: improve.md gaat vanaf nu mee in elk volgend gesprek, het
// is dus geen lijstje dat ergens ligt te wachten tot jij het naleest. Onderaan
// de trage: wat daar blijft terugkomen, zet jij zelf bij je vaste regels.
//
// De terugpijl onderaan loopt onder de rij door in plaats van er dwars doorheen,
// en zijn bijschrift staat op de pijl zelf. Vroeger stond dat onderaan het
// canvas, een halve tekening verwijderd van de pijl waar het bij hoorde.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node improvelus.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 670);

// ---------- 1. je regelbestand: hier staat de afspraak ----------
c.rect(40, 60, 470, 430, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(275, 122, 'je regelbestand', 40, C.RED_DARK, 700);
c.line(75, 147, 475, 147, { strokeWidth: 1.8, roughness: 1.8 });

// die ene afspraak, voluit en in het rood: zonder deze zin gebeurt er niets
c.rect(68, 170, 414, 185, { fill: C.WHITE, fillStyle: 'solid',
  stroke: C.RED, strokeWidth: 3, roughness: 1.3 });
c.lines(275, 210, [
  '"hou in improve.md bij wat ik',
  'corrigeer in chats, als nieuwe',
  'toekomstige regels. Hou daar',
  'steeds rekening mee"',
], 32, C.RED_DARK, 700, 'middle', 1.28);

// je gewone regels eronder, en de nieuwe in het rood
[[395, 350], [430, 300]].forEach(([y, breed]) =>
  c.line(75, y, 75 + breed, y, { strokeWidth: 2, roughness: 1.9 }));
c.line(75, 468, 75 + 320, 468, { stroke: C.RED, strokeWidth: 3.2, roughness: 1.6 });

// Links uitgelijnd en niet gecentreerd: de terugpijl komt op de onderrand van
// dit kader uit, en die pijlpunt stond anders bovenop dit bijschrift.
c.txt(45, 533, 'geldt in elk gesprek', 32, C.GRAY, 600, 'start');

c.arrow(525, 255, 571, 255, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, head: 18 });

// ---------- 2. jij corrigeert, zoals je toch al deed ----------
c.rect(586, 140, 380, 250, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(776, 202, 'jij corrigeert', 38, C.RED_DARK, 700);
c.line(621, 226, 931, 226, { strokeWidth: 1.8, roughness: 1.8 });
c.lines(776, 278, ['Gebruik niet', '"we gaan nu kijken",', 'maar "we bekijken"'],
  32, C.GRAY, 500, 'middle', 1.35);

c.txt(776, 435, 'in het gesprek zelf', 32, C.GRAY, 600);

c.arrow(981, 255, 1027, 255, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, head: 18 });

// ---------- 3. improve.md ----------
// Wit gevuld met een zware rode rand: het is het enige bestand op deze tekening
// dat je echt moet kunnen lezen.
c.rect(1042, 60, 478, 430, { fill: C.WHITE, fillStyle: 'solid',
  stroke: C.RED, strokeWidth: 3.4, roughness: 1.3 });
c.txt(1281, 128, 'improve.md', 44, C.RED_DARK, 700);
c.line(1078, 153, 1484, 153, { stroke: C.RED, strokeWidth: 2, roughness: 1.8 });
c.lines(1078, 215, [
  'we bekijken, niet we gaan',
  'geen bullets in de uitleg',
  'een voorbeeld uit de klas',
  'de student is enkelvoud',
], 32, C.GRAY, 500, 'start', 1.6);

c.txt(1281, 533, 'de AI vult dit zelf aan', 32, C.GRAY, 600);

// ---------- de snelle lus: improve.md gaat mee in het volgende gesprek -------
// Over de opening tussen het middelste kader en improve.md, want daar is de
// enige plek waar deze boog niet door een ander kader loopt.
c.carrow(1042, 90, 950, 20, 862, 132,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, strokeLineDash: [14, 10], head: 18 });
// Op twee regels: op één regel liep dit bijschrift over de rechterrand van het
// regelbestand heen. Tussen dat kader en de boog is maar 340 pixels plaats.
c.lines(690, 68, ['improve.md gaat mee', 'in elk volgend gesprek'],
  32, C.RED_DARK, 700, 'middle', 1.3);

// ---------- de trage lus: wat blijft terugkomen, wordt een vaste regel -------
c.carrow(1281, 560, 790, 655, 400, 500,
  { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, strokeLineDash: [14, 10], head: 20 });
c.txt(790, 645, 'wat blijft terugkomen, zet jij bij je vaste regels', 34, C.RED_DARK, 700);

c.save('.', 'improvelus', '');
