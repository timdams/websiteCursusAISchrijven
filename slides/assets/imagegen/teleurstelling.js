// Waar bijna iedereen begint: één zin in een leeg chatvenster, en een antwoord
// dat van niemand is.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 34.
// Draaien vanuit de imagegen-map:  node teleurstelling.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 660);

// ---------- links: de vraag ----------
c.rect(30, 190, 545, 165, { strokeWidth: 2.6, roughness: 1.5 });
c.lines(302, 252, [
  'schrijf een hoofdstuk over',
  'kansrekenen voor mijn studenten',
], 38, C.GRAY, 600, 'middle', 1.35);
c.txt(302, 425, 'wat je typte', 38, C.GRAY, 700);

c.arrow(595, 272, 650, 272, { stroke: C.RED, strokeWidth: 3, roughness: 1.3, head: 18 });

// ---------- rechts: het antwoord ----------
const PX = 670, PY = 40, PW = 850, PH = 460;
c.rect(PX, PY, PW, PH, { strokeWidth: 2.6, roughness: 1.4 });

c.lines(PX + 40, 112, [
  'Kansrekenen is een boeiend en veelzijdig',
  'vakgebied dat in tal van domeinen zijn',
  'toepassing vindt.',
], 34, C.GRAY, 400, 'start', 1.5);

const bullets = [
  'Kansen liggen altijd tussen 0 en 1',
  'De som van alle kansen is gelijk aan 1',
  'Gebeurtenissen kunnen onafhankelijk zijn',
];
bullets.forEach((b, i) => {
  const y = 312 + i * 56;
  c.circle(PX + 52, y - 11, 14, { fill: C.GRAY, fillStyle: 'solid', strokeWidth: 1.6 });
  c.txt(PX + 88, y, b, 34, C.GRAY, 400, 'start');
});

// ---------- het oordeel ----------
c.lines(PX + PW / 2, 562, [
  'klinkt als een reclamefolder',
  'geen enkel getal, geen enkel voorbeeld',
  'drie bullets waar een uitleg hoorde',
], 36, C.RED_DARK, 700, 'middle', 1.18);

c.save('.', 'teleurstelling', '');
