// De zeven stappen in de volgorde waarin je ze zet. Een en twee zijn
// schrijverswerk, drie tot zes is waar de AI bij komt, en zeven is de opmaak.
// De opmaak stond ooit op drie, maar dat was een verbod ("nog niet doen") en
// geen handeling. Als lijst van dingen die je doet, hoort ze achteraan.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node volgorde.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 470);

const stappen = [
  { n: '1', regels: ['schrijf eerst', 'als schrijver'] },
  { n: '2', regels: ['alles in', 'droge tekst'] },
  { n: '3', regels: ['een contextmap', 'sec gehouden'], ai: true },
  { n: '4', regels: ['je regels in', 'een bestand'], ai: true },
  { n: '5', regels: ['improve.md', 'en je skills'], ai: true },
  { n: '6', regels: ['nakijken'], ai: true },
  { n: '7', regels: ['en dan pas', 'je opmaak'] },
];

const CY = 150, DIA = 94, R = DIA / 2;
const cx = i => 128 + i * 218;

// Een pijl is rood zodra hij tussen twee AI-stappen loopt.
for (let i = 0; i < stappen.length - 1; i++) {
  const rood = stappen[i].ai && stappen[i + 1].ai;
  c.arrow(cx(i) + R + 10, CY, cx(i + 1) - R - 14, CY, {
    stroke: rood ? C.RED : C.GRAY, strokeWidth: 2.4, roughness: 1.4, head: 16,
  });
}

stappen.forEach((s, i) => {
  const rood = !!s.ai;
  const x = cx(i);
  c.circle(x, CY, DIA, rood
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.6,
        stroke: C.RED, strokeWidth: 3, roughness: 1.4 }
    : { strokeWidth: 2.8, roughness: 1.4 });
  c.txt(x, CY + 17, s.n, 48, rood ? C.RED_DARK : C.GRAY, 700);
  c.lines(x, 248, s.regels, 36, rood ? C.RED_DARK : C.GRAY, rood ? 700 : 600, 'middle', 1.22);
});

function beugel(x1, x2, y, kleur) {
  c.line(x1, y, x2, y, { stroke: kleur, strokeWidth: 2.4, roughness: 1.5 });
  c.line(x1, y - 16, x1, y, { stroke: kleur, strokeWidth: 2.4, roughness: 1.5 });
  c.line(x2, y - 16, x2, y, { stroke: kleur, strokeWidth: 2.4, roughness: 1.5 });
}

const BY = 358;
beugel(cx(0) - R, cx(1) + R, BY, C.GRAY);
c.txt((cx(0) + cx(1)) / 2, BY + 60, 'eerst schrijven', 40, C.GRAY, 600);

beugel(cx(2) - R, cx(5) + R, BY, C.RED);
c.txt((cx(2) + cx(5)) / 2, BY + 60, 'hier komt de AI erbij', 40, C.RED_DARK, 700);

// Zeven staat apart: de opmaak doe je op het einde, in één keer.
c.txt(cx(6), BY + 60, 'in één keer', 40, C.GRAY, 600);

c.save('.', 'volgorde', '');
