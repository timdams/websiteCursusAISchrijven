// De site in vier delen. Alle vier gevuld: de galerij staat er sinds
// september 2026 met tien voorbeelden in.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 32.
// Draaien vanuit de imagegen-map:  node website.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 670);

// ---------- het venster ----------
c.rect(25, 30, 1510, 605, { strokeWidth: 2.8, roughness: 1.3 });
c.line(25, 92, 1535, 92, { strokeWidth: 2.2, roughness: 1.5 });
[65, 102, 139].forEach(x => c.circle(x, 62, 22, { strokeWidth: 2, roughness: 1.4 }));
c.txt(180, 74, 'timdams.github.io/websiteCursusAISchrijven', 30, C.GRAY, 500, 'start');

// ---------- de vier delen ----------
function deel(x, y, nr, kop, regels) {
  const w = 705, h = 215;
  c.rect(x, y, w, h, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 10,
    fillWeight: 1.4, stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });
  const k = C.RED_DARK;
  c.circle(x + 48, y + 48, 50, { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: 2.2, roughness: 1.3 });
  c.txt(x + 48, y + 59, nr, 32, k, 700);
  c.txt(x + 88, y + 61, kop, 40, k, 700, 'start');
  c.lines(x + 88, y + 116, regels, 32, C.GRAY, 500, 'start', 1.4);
}

deel(55, 125, '1', 'de startpagina', [
  'de zeven stappen op een rij,',
  'in de volgorde waarin je ze zet',
]);

deel(55, 375, '2', 'de bevrager', [
  'een handvol vragen, en je krijgt',
  'jouw plan met jouw knopnamen',
]);

deel(790, 125, '3', 'het naslagwerk', [
  'onderwerpen, prompts om te',
  'plakken, de tools, de valkuilen',
]);

deel(790, 375, '4', 'de voorbeelden', [
  'tien cursussen en sites,',
  'met de techniek erbij',
]);

// ---------- de weg erdoor ----------
// Alleen van de startpagina naar de bevrager. Een pijl van twee naar drie zou
// dwars door vak vier lopen, en de nummers zeggen de volgorde al.
c.arrow(408, 348, 408, 368, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, head: 16 });

c.save('.', 'website', '');
