// Wat staat er in je regelbestand: de robot uit mimic.png draagt je drie dingen.
// Je toon in de ballon, je niet-doen-lijst op het blad, je contextmap in het
// mapje. Linksonder het bestand zelf, met een pijl de robot in.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node regelbestand.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 670);

const HATCH = { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 6,
                fillWeight: 1.6, stroke: C.RED, strokeWidth: 2.4, roughness: 1.4 };
const GEZET = { strokeWidth: 2.4, roughness: 1.4 };

// ---------- de robot ----------
// kop, antenne en de rode vermomming: dat is waaraan je hem herkent.
c.line(780, 160, 780, 119, { strokeWidth: 2.4, roughness: 1.2 });
c.circle(780, 111, 20, GEZET);
c.rect(670, 160, 220, 180, GEZET);

// wenkbrauwen hoog: hij is heel tevreden over zichzelf
c.path('M 706 192 Q 733 176 760 192', { strokeWidth: 2.2, roughness: 1.3 });
c.path('M 800 192 Q 827 176 854 192', { strokeWidth: 2.2, roughness: 1.3 });

// de elastiek loopt van de rand tot aan de glazen, niet erdoor
c.line(666, 236, 701, 232, { stroke: C.RED, strokeWidth: 3, roughness: 1.3 });
c.line(859, 232, 894, 236, { stroke: C.RED, strokeWidth: 3, roughness: 1.3 });
c.circle(733, 230, 62, HATCH);
c.circle(827, 230, 62, HATCH);
c.line(764, 230, 796, 230, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.2 });
c.path('M 692 288 Q 738 276 780 300 Q 822 276 868 288 ' +
       'Q 846 330 780 314 Q 714 330 692 288 Z', HATCH);

// nek en romp, met de revers van dat jasje
c.line(757, 340, 757, 359, GEZET);
c.line(803, 340, 803, 359, GEZET);
c.rect(690, 358, 180, 180, GEZET);
c.line(735, 359, 780, 420, { strokeWidth: 2.2, roughness: 1.3 });
c.line(825, 359, 780, 420, { strokeWidth: 2.2, roughness: 1.3 });
c.circle(780, 453, 16, { strokeWidth: 2, roughness: 1.3 });
c.circle(780, 491, 16, { strokeWidth: 2, roughness: 1.3 });

// benen en voeten
c.rect(712, 538, 34, 68, GEZET);
c.rect(816, 538, 34, 68, GEZET);
c.rect(698, 606, 58, 24, GEZET);
c.rect(802, 606, 58, 24, GEZET);

// linkerarm omhoog, houdt het blad vast
c.line(690, 388, 617, 308, GEZET);
c.line(706, 372, 633, 292, GEZET);
c.line(622, 302, 548, 262, GEZET);
c.line(632, 283, 558, 243, GEZET);

// rechterarm omlaag, houdt het mapje vast
c.line(870, 388, 943, 438, GEZET);
c.line(856, 406, 929, 456, GEZET);
c.line(936, 430, 1006, 462, GEZET);
c.line(928, 448, 998, 480, GEZET);

// ---------- links: je niet-doen-lijst ----------
c.txt(310, 82, 'je niet-doen-lijst', 38, C.RED_DARK, 700);
c.rect(120, 105, 380, 270, GEZET);
const nietdoen = [[175, 'em-dashes', 100], [245, 'een wijze slotzin', 185],
                  [315, 'cijfers tot twintig', 205]];
nietdoen.forEach(([y, s, w]) => {
  c.txt(165, y, s, 32, C.GRAY, 500, 'start');
  c.line(157, y - 11, 173 + w, y - 13, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.6 });
});
c.circle(516, 252, 36, GEZET);

// ---------- rechtsboven: je toon ----------
c.txt(1220, 82, 'je toon', 38, C.RED_DARK, 700);
c.rect(990, 105, 460, 160, GEZET);
c.line(1024, 265, 898, 300, { strokeWidth: 2.2, roughness: 1.7 });
c.txt(1220, 170, 'Vlaams, je-vorm, korte zinnen.', 32, C.GRAY, 500);
c.txt(1220, 222, 'vet = wat je twee keer zegt', 32, C.GRAY, 500);

// ---------- rechtsonder: je contextmap ----------
c.txt(1220, 348, 'je contextmap', 38, C.RED_DARK, 700);
c.poly([[1000, 392], [1012, 366], [1120, 366], [1132, 392]],
  { strokeWidth: 2.2, roughness: 1.4 });
c.rect(1000, 390, 440, 180, GEZET);
c.txtSegs(1030, 462, [{ t: 'toonvoorbeeld.md', color: C.RED_DARK, weight: 700 },
                      { t: ': hier zit mijn stem' }], 30);
c.txtSegs(1030, 522, [{ t: 'gettingstarted.md', color: C.RED_DARK, weight: 700 },
                      { t: ': de huisregels' }], 30);

// de hand ligt op het mapje, dus na het mapje getekend
c.circle(1016, 474, 36, GEZET);

// ---------- linksonder: het bestand zelf ----------
c.rect(180, 430, 290, 180, GEZET);
c.poly([[420, 430], [470, 430], [470, 478]],
  { fill: C.OFFWHITE, fillStyle: 'solid', strokeWidth: 2.2, roughness: 1.3 });
c.txt(310, 500, 'claude.md', 36, C.RED_DARK, 700);
c.line(215, 535, 435, 535, { strokeWidth: 1.8, roughness: 1.2 });
c.line(215, 565, 435, 565, { strokeWidth: 1.8, roughness: 1.2 });
c.line(215, 595, 360, 595, { strokeWidth: 1.8, roughness: 1.2 });
c.carrow(480, 495, 590, 500, 684, 478,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 17 });

c.save('.', 'regelbestand', '');
