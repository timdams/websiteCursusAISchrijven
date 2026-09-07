// Strip 3 van de origin story: dit jaar, en de bekentenis erachteraan.
// Draaien vanuit de imagegen-map:  node strip-nu.js
const { createCanvas, C } = require('./excal');
const { paneel, bijschrift, poppetje, ballon, GROND } = require('./strip');

const c = createCanvas(1560, 640);

// ---------- paneel 1: dit jaar ----------
paneel(c, 20, 750);
bijschrift(c, 46, 'dit jaar');

const a = poppetje(c, 300, { armen: 'wijzen', gezicht: 'blij', naam: 'ik' });

// een laptop op de vloer ernaast
c.poly([[540, GROND], [700, GROND], [716, GROND - 14], [524, GROND - 14]],
  { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2.4, roughness: 1.3 });
c.rect(540, GROND - 130, 160, 116, { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2.6, roughness: 1.3 });
[0, 1, 2].forEach(j => c.line(560, GROND - 100 + j * 24, 680, GROND - 100 + j * 24,
  { stroke: C.RED, strokeWidth: 2, roughness: 1.8 }));

ballon(c, 380, 110, ['doen we dat samen?'], 300, a.top - 8);

// ---------- paneel 2: twee weken later ----------
paneel(c, 790, 750);
bijschrift(c, 816, 'twee weken later');

const b = poppetje(c, 1060, { armen: 'wijzen', gezicht: 'twijfel', naam: 'ik' });

// het venster met de site erin
c.rect(1230, GROND - 210, 250, 190, { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2.6, roughness: 1.3 });
c.line(1230, GROND - 168, 1480, GROND - 168, { strokeWidth: 2, roughness: 1.5 });
[1252, 1276, 1300].forEach(x => c.circle(x, GROND - 189, 13, { strokeWidth: 1.8, roughness: 1.3 }));
c.rect(1252, GROND - 148, 206, 46, { fill: C.RED_LIGHT, fillStyle: 'hachure',
  hachureGap: 7, fillWeight: 1.3, stroke: C.RED, strokeWidth: 2, roughness: 1.4 });
[0, 1].forEach(j => c.line(1252, GROND - 78 + j * 24, 1458, GROND - 78 + j * 24,
  { strokeWidth: 1.8, roughness: 1.8 }));

ballon(c, 1140, 110, ['en het voelt nog', 'wat AI aan'], 1060, b.top - 8);

c.save('.', 'strip-nu', '');
