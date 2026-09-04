// <hoofdstuk> - <in 1 zin: wat toont deze figuur>
// Draaien vanuit de imagegen-map:  node <naam>.js
const { createCanvas, C } = require('./excal');
// const { codebox } = require('./mhelpers');   // 3D-codedoos, indien nodig

const c = createCanvas(1400, 440);   // strak rond de inhoud, geen lege stroken

// ---------- links ----------
c.txt(350, 90, 'kop van dit deel', 36, C.RED_DARK, 700);

c.rect(180, 160, 340, 200);
c.txt(350, 275, 'inhoud', 44, C.GRAY, 700);

// ---------- pijl naar rechts ----------
// stop kort voor het doel zodat de punt de tekst niet raakt
c.arrow(540, 260, 840, 260, { stroke: C.RED, strokeWidth: 2.4, head: 15 });
c.txt(690, 225, 'label bij de pijl', 30, C.RED_DARK, 700);

// ---------- rechts ----------
c.rect(880, 160, 340, 200, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 6,
  fillWeight: 1.5, stroke: C.RED, strokeWidth: 2.4 });
c.txt(1050, 275, 'resultaat', 44, C.GRAY, 700);

// Derde argument: 'NEW' naast een bestaand origineel, '' voor een nieuwe figuur.
c.save('.', 'naam', 'NEW');
