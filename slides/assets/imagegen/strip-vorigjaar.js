// Strip 2 van de origin story: hetzelfde ja, en wat er vorig jaar op volgde.
// Draaien vanuit de imagegen-map:  node strip-vorigjaar.js
const { createCanvas } = require('./excal');
const { paneel, bijschrift, poppetje, ballon, stapel } = require('./strip');

const c = createCanvas(1560, 640);

// ---------- paneel 1: vorig jaar, hetzelfde antwoord ----------
paneel(c, 20, 750);
bijschrift(c, 46, 'vorig jaar');

const a = poppetje(c, 400, { armen: 'omhoog', gezicht: 'blij', naam: 'ik' });
ballon(c, 400, 150, ['Ja, sure!'], 400, a.top - 8, { size: 44 });

// ---------- paneel 2: een week later ----------
paneel(c, 790, 750);
bijschrift(c, 816, 'een week later');

stapel(c, 1400, 9, 170);
const b = poppetje(c, 1090, { armen: 'omhoog', gezicht: 'paniek', naam: 'ik' });
ballon(c, 1120, 150, ['wat heb ik gedaan'], 1090, b.top - 8);

c.save('.', 'strip-vorigjaar', '');
