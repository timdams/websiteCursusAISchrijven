// Waar de zaal zit en waar deze talk begint. Een as van "ik plak soms iets in
// ChatGPT" naar "ik zit in de terminal", met de zaal erop en één iemand rechts
// die het al weet. Die ene is de feedbackgever. De pijl rechts zegt welke kant
// technischer is; zonder pijl leest de lijn als een vloer en niet als een as.
//
// Dit script maakt twee tekeningen op hetzelfde canvas: zaal.png, en daarna
// zaal-kristof.png met Kristof erbij, zwevend voorbij het einde van de as. Ze
// komen uit dezelfde tekenbeurt, dus de rest van de tekening staat op beide
// exact gelijk. Zou ik ze in twee scripts zetten, dan wiebelt elk streepje bij
// de tweede render net iets anders en zie je de zaal opnieuw getekend worden.
//
// Beamermaat: canvas 1560 bij 670, zie MAATVOERING.md. Kleinste tekst 30.
// Draaien vanuit de imagegen-map:  node zaal.js
const { createCanvas, C } = require('./excal');
const { poppetje } = require('./strip');

const c = createCanvas(1560, 670);

const LIJN = 520;          // de vloer waar iedereen op staat
const X0 = 60, X1 = 1480;

// ---------- de as met zijn twee polen ----------
c.arrow(X0, LIJN, X1, LIJN, { strokeWidth: 3.4, roughness: 1.1, head: 30 });
c.line(X0, LIJN - 13, X0, LIJN + 13, { strokeWidth: 2.4, roughness: 1.3 });

c.lines(X0, 574, ['ik plak soms iets', 'in ChatGPT'], 34, C.GRAY, 700, 'start', 1.12);
c.txt(X1, 574, 'ik zit in de terminal', 34, C.GRAY, 700, 'end');
c.txt((X0 + X1) / 2, 644, 'hoe technisch je werkt', 32, C.GRAY, 600);

// ---------- de zaal ----------
// Dicht bij elkaar links, ijler naar rechts. Twee ervan hebben een naam.
poppetje(c, 160, { grond: LIJN, gezicht: 'twijfel' });
poppetje(c, 265, { grond: LIJN, gezicht: 'paniek' });
poppetje(c, 375, { grond: LIJN, gezicht: 'twijfel' });
poppetje(c, 500, { grond: LIJN, gezicht: 'twijfel', naam: 'mijn vrouw' });
poppetje(c, 640, { grond: LIJN, gezicht: 'twijfel' });
poppetje(c, 800, { grond: LIJN, gezicht: 'blij', naam: 'Yves' });
poppetje(c, 980, { grond: LIJN, armen: 'uit', gezicht: 'blij' });

// ---------- de beugel over de linkerkant ----------
const BX0 = 100, BX1 = 1050, BY = 150;
c.line(BX0, BY, BX1, BY, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.line(BX0, BY, BX0, BY + 30, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.line(BX1, BY, BX1, BY + 30, { stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
c.txt((BX0 + BX1) / 2, BY - 26, 'hier begint deze talk', 44, C.RED_DARK, 700);

// ---------- die ene rechts ----------
poppetje(c, 1310, { grond: LIJN, gezicht: 'blij' });
// Het bordje staat links van het hoofd, niet erboven: rechtsboven moet vrij
// blijven voor Kristof op de tweede tekening.
c.rect(1150, 55, 228, 88, { stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });
c.line(1234, 143, 1298, 250, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.line(1268, 143, 1314, 250, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.5 });
c.txt(1264, 112, 'dit weet ik al', 36, C.RED_DARK, 700);

c.save('.', 'zaal', '');

// ---------- en dan Kristof ----------
// Hij staat niet op de as, hij zweeft erboven, voorbij de pijlpunt. Aureool en
// stralen in het rood: op de tweede slide is hij het enige nieuwe.
const KX = 1466, KVOET = 424, KHOOFD = KVOET - 232;

poppetje(c, KX, { grond: KVOET, armen: 'uit', gezicht: 'blij' });
c.ellipse(KX, KHOOFD - 64, 68, 22, { fill: 'none', stroke: C.RED, strokeWidth: 3, roughness: 1.2 });
[150, 180, 210, 330, 30].forEach(deg => {
  const a = deg * Math.PI / 180;
  c.line(KX + 46 * Math.cos(a), KHOOFD + 46 * Math.sin(a),
         KX + 68 * Math.cos(a), KHOOFD + 68 * Math.sin(a),
         { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3 });
});
c.txt(KX, KVOET + 52, 'Kristof', 36, C.RED_DARK, 700);

c.save('.', 'zaal-kristof', '');
