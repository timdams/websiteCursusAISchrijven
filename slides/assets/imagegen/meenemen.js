// De vier dingen die je meeneemt, in dezelfde nummering als volgorde.png:
// stap drie tot zes. Deze tekening staat twee keer in het deck, net zoals
// volgorde.png: een keer voor de workflow als aankondiging, en een keer als
// slotslide.
//
// De eerste drie zijn bestanden die je schrijft, de vierde is de enige stap
// die je met je eigen ogen doet. Daarom staat zes hier gestreept en leeg,
// precies zoals in volgorde.js: vol rood zou zeggen dat de AI dat werk
// overneemt.
//
// De terugpijl rechtsonder is geen versiering: wat je bij het nakijken
// corrigeert, is exact wat er in improve.md belandt. Zonder die pijl staan
// vijf en zes hier als vier losse kaarten naast elkaar.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node meenemen.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 585);

const KW = 348, GAP = 30, KY = 96, KH = 330;
const kx = i => 40 + i * (KW + GAP);
const mid = i => kx(i) + KW / 2;

const kaarten = [
  {
    n: '3', kop: 'je contextmap',
    regels: ['vijf documenten,', 'elk met een reden erbij'],
  },
  {
    n: '4', kop: 'je regelbestand',
    regels: ['je toon, en vooral', 'je niet-doen-lijst'],
  },
  {
    n: '5', kop: 'improve.md',
    regels: ['de AI noteert je correcties,', 'en daar komen je skills uit'],
  },
  {
    n: '6', kop: 'nakijken', zelf: true,
    regels: ['de getallen, de namen', 'en de bronnen: zelf lezen'],
  },
];

// ---------- de vier kaarten ----------
kaarten.forEach((k, i) => {
  const x = kx(i), m = mid(i);

  c.rect(x, KY, KW, KH, k.zelf
    ? { stroke: C.RED, strokeWidth: 3, roughness: 1.4, strokeLineDash: [12, 10] }
    : { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });

  // het nummer staat boven de kaart en niet erin: op de rand zelf sneed de
  // bovenlijn van de kaart dwars door het bolletje.
  c.circle(m, 56, 68, k.zelf
    ? { fill: C.WHITE, fillStyle: 'solid', stroke: C.RED, strokeWidth: 3,
        roughness: 1.4, strokeLineDash: [10, 8] }
    : { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.6,
        stroke: C.RED, strokeWidth: 3, roughness: 1.4 });
  c.txt(m, 69, k.n, 38, C.RED_DARK, 700);

  c.txt(m, 285, k.kop, 40, C.RED_DARK, 700);
  c.line(x + 46, 305, x + KW - 46, 305, { stroke: C.RED, strokeWidth: 1.8, roughness: 1.8 });
  c.lines(m, 350, k.regels, 30, C.GRAY, 600, 'middle', 1.3);
});

// ---------- 3. vijf documenten naast elkaar ----------
{
  const m = mid(0), dw = 40, dg = 12;
  const x0 = m - (5 * dw + 4 * dg) / 2;
  for (let i = 0; i < 5; i++) {
    c.rect(x0 + i * (dw + dg), 145, dw, 62, { strokeWidth: 2, roughness: 1.5 });
  }
}

// ---------- 4. een blad met een niet-doen-lijst eronder ----------
{
  const m = mid(1);
  c.rect(m - 72, 130, 144, 96, { strokeWidth: 2.4, roughness: 1.4 });
  [[152, 96], [172, 78]].forEach(([y, w]) =>
    c.line(m - 50, y, m - 50 + w, y, { strokeWidth: 2, roughness: 1.9 }));
  [[196, 92], [214, 68]].forEach(([y, w]) =>
    c.line(m - 50, y, m - 50 + w, y, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.7 }));
}

// ---------- 5. een blad waar een regel bij komt ----------
{
  const m = mid(2);
  c.rect(m - 62, 130, 128, 96, { strokeWidth: 2.4, roughness: 1.4 });
  [[154, 84], [176, 66]].forEach(([y, w]) =>
    c.line(m - 42, y, m - 42 + w, y, { strokeWidth: 2, roughness: 1.9 }));
  c.line(m - 42, 204, m - 42 + 90, 204, { stroke: C.RED, strokeWidth: 3, roughness: 1.7 });
  c.carrow(m + 74, 212, m + 132, 176, m + 74, 140,
    { stroke: C.RED, strokeWidth: 2.4, roughness: 1.3, head: 14 });
}

// ---------- 6. je eigen ogen ----------
{
  const m = mid(3), Y = 178;
  c.path(`M ${m - 78} ${Y} Q ${m} ${Y - 58} ${m + 78} ${Y}`,
    { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3 });
  c.path(`M ${m - 78} ${Y} Q ${m} ${Y + 58} ${m + 78} ${Y}`,
    { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3 });
  c.circle(m, Y, 48, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 6,
    fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
}

// ---------- de lus tussen zes en vijf ----------
c.carrow(mid(3), 434, mid(2) + 190, 545, mid(2), 434,
  { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, strokeLineDash: [14, 10], head: 20 });
c.txt(mid(2) + 190, 545, 'wat je hier corrigeert, gaat naar improve.md', 34, C.RED_DARK, 700);

// ---------- de rode draad, links onder de eerste twee kaarten ----------
c.lines(40, 498, ['Alles wat je een tweede keer tegen de AI',
  'moet zeggen, hoort in een bestand.'], 36, C.GRAY, 700, 'start', 1.3);

c.save('.', 'meenemen', '');
