// Wat de site doet en deze talk niet: per tool zeggen hoe het daar heet.
// De kolommen komen uit assistenten[].plek en .termen.regelsplek in
// site/data.js. Wijzigt de site, wijzig dan ook dit script.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 32.
// Draaien vanuit de imagegen-map:  node pertool.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

const XTOOL = 55, XPLEK = 430, XREGELS = 950, RECHTS = 1520;

// ---------- kolomkoppen ----------
c.txt(XPLEK, 104, 'je vaste plek heet', 32, C.GRAY, 700, 'start');
c.txt(XREGELS, 104, 'je regels staan in', 32, C.GRAY, 700, 'start');
c.line(XTOOL - 5, 130, RECHTS, 130, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });

// ---------- de zes ----------
const rijen = [
  ['Claude',      'een Project',          'de projectinstructies'],
  ['ChatGPT',     'een Project',          'de projectinstructies'],
  ['Gemini',      'een Gem',              'de instructies van je Gem'],
  ['Copilot',     'een Notebook',         'de instructies van je notebook'],
  ['Iets anders', 'een space of een map', 'het instructieveld van je tool'],
  ['Nog geen',    'een gratis Project',   'het instructieveld, of je prompt'],
];

rijen.forEach(([tool, plek, regels], i) => {
  const y = 194 + i * 78;
  c.txt(XTOOL, y, tool, 36, C.RED_DARK, 700, 'start');
  c.txt(XPLEK, y, plek, 32, C.GRAY, 500, 'start');
  c.txt(XREGELS, y, regels, 32, C.GRAY, 500, 'start');
  if (i < rijen.length - 1) {
    c.line(XTOOL - 5, y + 26, RECHTS, y + 26, { strokeWidth: 1.4, roughness: 2 });
  }
});

c.save('.', 'pertool', '');
