// Stap 5. Eén rechte lijn: jij corrigeert, de AI schrijft het op, en die regel
// staat morgen in je afsprakenbestand.
//
// De vorige versie splitste rechts nog naar "een regel" en "een skill". Dat
// maakte er vijf kaders en een kruisende pijl van, en skills komen toch al op de
// volgende slide (afsprakenofskill). Hier staat nu één lijn met drie stations.
// De rode arcering onder improve.md is er ook uit: grijze tekst op arcering las
// niet op een beamer.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node improvelus.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 640);

// ---------- 1. jij corrigeert ----------
c.rect(40, 170, 400, 250, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(240, 228, 'jij corrigeert', 38, C.RED_DARK, 700);
c.line(80, 252, 400, 252, { strokeWidth: 1.8, roughness: 1.8 });
c.lines(240, 308, ['"niet we gaan nu', 'kijken, maar', 'we bekijken"'],
  32, C.GRAY, 500, 'middle', 1.35);

c.arrow(455, 295, 508, 295, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, head: 18 });

// ---------- 2. improve.md ----------
// Wit gevuld met een zware rode rand: het is het enige bestand op deze tekening
// dat je echt moet kunnen lezen.
c.rect(528, 130, 440, 330, { fill: C.WHITE, fillStyle: 'solid',
  stroke: C.RED, strokeWidth: 3.4, roughness: 1.3 });
c.txt(748, 197, 'improve.md', 44, C.RED_DARK, 700);
c.line(568, 222, 928, 222, { stroke: C.RED, strokeWidth: 2, roughness: 1.8 });
c.lines(568, 278, [
  'we bekijken, niet we gaan',
  'geen bullets in de uitleg',
  'een voorbeeld uit de klas',
  'de student is enkelvoud',
], 32, C.GRAY, 500, 'start', 1.5);
c.txt(748, 508, 'de AI schrijft dit zelf op', 32, C.GRAY, 600);

c.arrow(985, 295, 1038, 295, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.3, head: 18 });

// ---------- 3. je afsprakenbestand, één regel langer ----------
c.rect(1058, 170, 462, 250, { strokeWidth: 2.6, roughness: 1.4 });
c.txt(1289, 228, 'je afsprakenbestand', 38, C.RED_DARK, 700);
c.line(1098, 252, 1480, 252, { strokeWidth: 1.8, roughness: 1.8 });

// drie regels die er al stonden, en de nieuwe eronder in het rood
[[300, 340], [335, 300], [370, 355]].forEach(([y, breed]) =>
  c.line(1098, y, 1098 + breed, y, { strokeWidth: 2, roughness: 1.9 }));
c.line(1098, 405, 1098 + 320, 405, { stroke: C.RED, strokeWidth: 3.2, roughness: 1.6 });
c.txt(1289, 462, 'die regel stond er nog niet', 32, C.RED_DARK, 700);

// ---------- en dan hoef je het niet meer te zeggen ----------
c.carrow(1289, 490, 780, 592, 240, 440,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, strokeLineDash: [14, 10], head: 20 });
c.txt(780, 622, 'en dan moet je het nooit meer zeggen', 34, C.RED_DARK, 700);

c.save('.', 'improvelus', '');
