// Wat deze talk wel doet: de volgorde aflopen. Het klikwerk komt één keer in
// beeld en staat verder op de site. De verhouding in de tekening is het punt:
// een lange weg, een klein zijstapje, en een bord op het einde.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 32.
// Draaien vanuit de imagegen-map:  node dezetalk.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 460);

// ---------- de weg: de volgorde ----------
c.txt(630, 88, 'deze talk: de volgorde', 44, C.GRAY, 700);
c.txt(630, 138, 'wat je doet, en waarom', 36, C.GRAY, 600);
c.arrow(110, 190, 1150, 190, { stroke: C.GRAY, strokeWidth: 4, roughness: 1.4, head: 24 });

// De zeven stappen als haltes op die weg. Zonder cijfers: die staan op de
// volgende slide, hier gaat het enkel over hoeveel er komt.
const halte = i => 180 + i * 145;
for (let i = 0; i < 7; i++) c.circle(halte(i), 190, 26, { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2.4 });

// ---------- het zijstapje: één echt venster, na stap vier ----------
c.arrow(halte(3), 208, halte(3), 256, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4, head: 15 });
c.rect(515, 275, 200, 110, { stroke: C.RED, strokeWidth: 2.6 });
c.line(515, 307, 715, 307, { strokeWidth: 2 });
[0, 1, 2].forEach(i => c.circle(532 + i * 22, 291, 12, { fill: C.GRAY, fillStyle: 'solid', strokeWidth: 1.2 }));
c.line(535, 337, 695, 337, { strokeWidth: 2.2, roughness: 1.2 });
c.line(535, 363, 655, 363, { strokeWidth: 2.2, roughness: 1.2 });
c.txt(615, 425, 'één keer een echt venster', 32, C.RED_DARK, 700);

// ---------- het bord op het einde ----------
c.rect(1190, 130, 280, 120, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.6, stroke: C.RED, strokeWidth: 3 });
c.txt(1330, 205, 'de site', 46, C.RED_DARK, 700);
c.txt(1330, 300, 'het klikwerk,', 32, C.RED_DARK, 700);
c.txt(1330, 338, 'per tool', 32, C.RED_DARK, 700);

c.save('.', 'dezetalk', '');
