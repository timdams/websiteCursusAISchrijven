// Strip 1 van de origin story: de vraag, en het meteen ja.
// Draaien vanuit de imagegen-map:  node strip-vraag.js
const { createCanvas } = require('./excal');
const { paneel, poppetje, ballon } = require('./strip');

const c = createCanvas(1560, 640);

// ---------- paneel 1: Yves en Kelly vragen het ----------
paneel(c, 20, 750);

const yves = poppetje(c, 300, { armen: 'wijzen', gezicht: 'blij', naam: 'Yves' });
poppetje(c, 510, { armen: 'uit', gezicht: 'blij', naam: 'Kelly' });

ballon(c, 400, 100, ['Tim, geef jij die talk', 'over AI?'], 300, yves.top - 8);

// ---------- paneel 2: het antwoord ----------
paneel(c, 790, 750);

const tim = poppetje(c, 1165, { armen: 'omhoog', gezicht: 'blij', naam: 'ik' });

ballon(c, 1165, 130, ['Ja, sure!'], 1165, tim.top - 8, { size: 44 });

c.save('.', 'strip-vraag', '');
