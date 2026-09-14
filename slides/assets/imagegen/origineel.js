// De flow van voor de AI: schrijven, in droge tekst zetten, nakijken. Het is
// volgorde.js zonder het rode deel. Stap zes (nakijken) wordt hier drie, want
// zonder de AI-stappen komt ze meteen na twee. Alles is grijs en vol: het is
// allemaal eigen werk, dus ook het gestreepte bolletje van zes valt weg.
//
// Zelfde canvas, bolletjes en letters als volgorde.png, zodat de twee slides
// na elkaar op dezelfde schaal staan. De drie staan in het midden.
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 36.
// Draaien vanuit de imagegen-map:  node origineel.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 486);

const stappen = [
  { n: '1', regels: ['schrijf eerst', 'als schrijver'] },
  { n: '2', regels: ['alles in', 'droge tekst', '(markdown)'] },
  { n: '3', regels: ['nakijken'] },
];

// Zonder beugels eronder zakt de rij wat, zodat ze midden in het canvas staat.
const CY = 173, DIA = 94, R = DIA / 2;
const cx = i => 780 + (i - 1) * 300;

for (let i = 0; i < stappen.length - 1; i++) {
  c.arrow(cx(i) + R + 10, CY, cx(i + 1) - R - 14, CY, {
    stroke: C.GRAY, strokeWidth: 2.4, roughness: 1.4, head: 16,
  });
}

stappen.forEach((s, i) => {
  const x = cx(i);
  c.circle(x, CY, DIA, { strokeWidth: 2.8, roughness: 1.4 });
  c.txt(x, CY + 17, s.n, 48, C.GRAY, 700);
  c.lines(x, CY + 98, s.regels, 36, C.GRAY, 600, 'middle', 1.22);
});

c.save('.', 'origineel', '');
