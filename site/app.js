/* De gids, het plan en het naslagwerk. Geen bibliotheken, geen build.
   Openen met een lokale webserver (bv. Live Server) volstaat. */

(function () {
  "use strict";

  var D = window.DATA;
  var BEWAARSLEUTEL = "cursuswijzer-v2";

  /* ---------------- state ---------------- */

  var state = {
    antwoorden: {},     // ervaring, account, materiaal: [id], bron, installatie, schrijven, duur
    tussenin: null,     // id van de stap waarvan het tussenadvies nu getoond wordt
    gestart: false,     // is de gids bezig
    assistent: "",      // claude, chatgpt, gemini, copilot, generiek of gratis
    mijnWerkwijze: "",  // de werkwijze waar de gids op uitkwam
    wwTab: "",          // de werkwijze die openstaat op de werkwijzenpagina
    output: ""          // gekozen formaat in het naslagwerk
  };

  function bewaar() {
    try { localStorage.setItem(BEWAARSLEUTEL, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  function laad() {
    try {
      var ruw = localStorage.getItem(BEWAARSLEUTEL);
      if (!ruw) return;
      var g = JSON.parse(ruw);
      if (g && typeof g === "object") {
        state.antwoorden = g.antwoorden || {};
        state.gestart = !!g.gestart;
        state.assistent = g.assistent || "";
        state.mijnWerkwijze = g.mijnWerkwijze || "";
        state.wwTab = g.wwTab || "";
        state.output = g.output || "";
      }
    } catch (e) { /* stuk bewaarde staat negeren */ }
  }

  /* ---------------- tool-specifieke termen ---------------- */

  function assistentBij(id) {
    return D.assistenten.filter(function (a) { return a.id === id; })[0] || null;
  }

  function mijnAssistent() {
    return assistentBij(state.assistent || state.antwoorden.account);
  }

  function mijnDoel() {
    return D.doel.filter(function (d) { return d.id === state.antwoorden.doel; })[0] || null;
  }

  /* Zonder toolkeuze komt hier een omschrijving te staan, nooit een merknaam.
     Zo blijft gedeelde tekst gedeeld, en zit het merk alleen in de toolkaart. */
  var NEUTRAAL = {
    regelbestand: "je regelbestand",
    regelsplek: "een vast bestand met je afspraken",
    projectplek: "een vaste map of project",
    skillplek: "een apart document per soort taak",
    toolnaam: "je AI-tool"
  };

  /* Vult {regelbestand}, {regelsplek}, {projectplek}, {skillplek} en
     {toolnaam} in met de termen van de gekozen tool. */
  function T(tekst) {
    if (typeof tekst !== "string" || tekst.indexOf("{") < 0) return tekst;
    var a = mijnAssistent();
    var termen = (a && a.termen) || {};
    return tekst.replace(/\{(\w+)\}/g, function (heel, naam) {
      if (naam === "toolnaam") return (a && a.naam) || NEUTRAAL.toolnaam;
      return termen[naam] || NEUTRAAL[naam] || heel;
    });
  }

  /* ---------------- hulpjes ---------------- */

  /* De site schrijft getallen tot twintig voluit, ook wanneer de code ze telt. */
  var VOLUIT = ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht",
    "negen", "tien", "elf", "twaalf", "dertien", "veertien", "vijftien", "zestien",
    "zeventien", "achttien", "negentien", "twintig"];

  function el(tag, klas, tekst) {
    var n = document.createElement(tag);
    if (klas) n.className = klas;
    if (tekst !== undefined) n.textContent = T(tekst);
    return n;
  }

  function tn(tekst) { return document.createTextNode(T(tekst)); }

  /* Tekst met opmaak erin, en verder niks: `tussen accenten` wordt een
     code-vakje, *tussen sterretjes* cursief (het terzijde en het scharnierwoord)
     en **tussen dubbele sterretjes** vet. [[2]] wordt een merkje dat een
     kort venster over werkwijze 2 opent. Hangt alles onder node. */
  function rijk(node, tekst) {
    var stukken = String(T(tekst)).split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[\[[^\]]+\]\])/);
    for (var i = 0; i < stukken.length; i++) {
      var s = stukken[i];
      if (!s) continue;
      if (s.slice(0, 2) === "[[") {
        var v = wwVerwijzing(s.slice(2, -2));
        node.appendChild(werkwijzeMerk(v) || document.createTextNode(v.label));
        continue;
      }
      var tag = null, kern = s;
      if (s.charAt(0) === "`") { tag = "code"; kern = s.slice(1, -1); }
      else if (s.slice(0, 2) === "**") { tag = "b"; kern = s.slice(2, -2); }
      else if (s.charAt(0) === "*") { tag = "em"; kern = s.slice(1, -1); }
      if (tag) {
        var n = document.createElement(tag);
        n.textContent = kern;
        node.appendChild(n);
      } else {
        node.appendChild(document.createTextNode(s));
      }
    }
    return node;
  }

  function leeg(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

  /* Dezelfde tekst zonder de markeringen die rijk() leest. Voor de plekken waar
     alleen platte tekst past: de zoekresultaten en de samenvatting in je plan. */
  function plat(tekst) {
    return String(T(tekst)).replace(/`([^`]+)`/g, "$1")
                           .replace(/\*\*([^*]+)\*\*/g, "$1")
                           .replace(/\*([^*]+)\*/g, "$1")
                           .replace(/\[\[([^\]]+)\]\]/g, function (heel, kern) {
                             return wwVerwijzing(kern).label;
                           });
  }

  /* ---------------- pictogrammen en kaderkoppen ---------------- */

  /* Wegwijzertjes op een raster van 24 bij 24. Ze staan in code en niet in een
     bestand: het zijn geen figuren maar pictogrammen, en ze nemen de kleur van
     het kader waar ze in staan over. */
  var ICONEN = {
    trap: ["M3.5 20.5h5.5V15h5.5V9.5H20"],
    blokken: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"],
    map: ["M3 8a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"],
    klembord: [
      "M9 4h6v3H9z",
      "M9 5.5H6.5A1.5 1.5 0 005 7v12.5A1.5 1.5 0 006.5 21h11a1.5 1.5 0 001.5-1.5V7a1.5 1.5 0 00-1.5-1.5H15",
      "M8.5 12.5h7",
      "M8.5 16.5h4"
    ],
    vonk: [
      "M11 3l1.7 4.8L17.5 9.5 12.7 11.2 11 16 9.3 11.2 4.5 9.5l4.8-1.7z",
      "M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"
    ],
    uitvoer: ["M12 3v10", "M8.5 9.5L12 13l3.5-3.5", "M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"],
    kist: [
      "M3 9h18v10a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19z",
      "M9 9V6.5A1.5 1.5 0 0110.5 5h3A1.5 1.5 0 0115 6.5V9",
      "M3 13.5h18"
    ],
    haakjes: ["M9 8l-4 4 4 4", "M15 8l4 4-4 4", "M13.5 5.5l-3 13"],
    splitsing: ["M12 21v-6", "M12 15L6.5 9.5V5", "M12 15l5.5-5.5V5", "M4.5 7l2-2 2 2", "M15.5 7l2-2 2 2"],
    raket: [
      "M12 3.2c2 2.4 3 5.3 3 8.1V16H9v-4.7c0-2.8 1-5.7 3-8.1z",
      "M9 12l-3 2.6v3.9l3-2.4",
      "M15 12l3 2.6v3.9l-3-2.4",
      "M12 7.9a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4",
      "M10.6 17.6c.3 1.7 1.4 3.2 1.4 3.2s1.1-1.5 1.4-3.2"
    ],

    /* de tweede reeks: de kaders in de lopende tekst */
    waarschuwing: ["M10.3 4.6L2.7 17.9a2 2 0 001.7 3h15.2a2 2 0 001.7-3L13.7 4.6a2 2 0 00-3.4 0z", "M12 9.6v4.2", "M12 17.2h.01"],
    verboden: ["M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z", "M6 6l12 12"],
    weegschaal: ["M12 4.5v14", "M7.5 18.5h9", "M3.8 7.2h16.4", "M3.8 7.2L1 13.8h5.6z", "M20.2 7.2L17.4 13.8h5.6z"],
    vink: ["M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z", "M8.2 12.2l2.5 2.5 5.1-5.4"],
    roos: ["M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z", "M12 8a4 4 0 100 8 4 4 0 000-8z", "M12 11.9h.01"],
    lamp: [
      "M12 3.5a5.5 5.5 0 00-3.2 9.9c.6.5.9 1.2.9 1.9v.2h4.6v-.2c0-.7.3-1.4.9-1.9A5.5 5.5 0 0012 3.5z",
      "M9.7 18h4.6",
      "M10.6 20.7h2.8"
    ],
    moersleutel: ["M20.3 4.9a4.5 4.5 0 01-5.8 5.8l-8 8a2 2 0 01-2.8-2.8l8-8a4.5 4.5 0 015.8-5.8l-2.6 2.6.9 2.9 2.9.9z"],
    gesprek: [
      "M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-8l-4 3.5V16a2 2 0 01-2-2z",
      "M8.5 10h.01", "M12 10h.01", "M15.5 10h.01"
    ],
    vlag: ["M6 21V4", "M6 4.8h11.5l-2.2 3.7 2.2 3.7H6"],
    klik: ["M6.5 3.2l11 6.6-4.8 1.1 2.4 5-2.3 1.1-2.4-5-3.4 3.2z"],
    terminal: [
      "M3.5 5.5A1.5 1.5 0 015 4h14a1.5 1.5 0 011.5 1.5v13A1.5 1.5 0 0119 20H5a1.5 1.5 0 01-1.5-1.5z",
      "M7.5 9.5l2.5 2.5-2.5 2.5", "M13 15h4"
    ],
    vraagteken: ["M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z", "M9.8 9.6a2.3 2.3 0 014.4.8c0 1.6-2.2 2-2.2 3.4", "M12 16.8h.01"],
    oog: ["M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z", "M12 9a3 3 0 100 6 3 3 0 000-6z"],
    kompas: ["M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17z", "M15.3 8.7l-1.9 4.7-4.7 1.9 1.9-4.7z"],
    schakel: ["M10 13.6a3.6 3.6 0 005.1 0l3-3a3.6 3.6 0 00-5.1-5.1l-1 1", "M14 10.4a3.6 3.6 0 00-5.1 0l-3 3a3.6 3.6 0 005.1 5.1l1-1"]
  };

  function icoonSvg(naam) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    (ICONEN[naam] || []).forEach(function (d) {
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    return svg;
  }

  /* Elk kader in de lopende tekst opent met een pictogram naast zijn titel. Het
     icoon zegt welk soort blok eronder staat (de kern, een valkuil, een
     afweging, een extraatje), de titel zegt waarover het gaat. Een kader met
     een echte kop krijgt "chip" mee: dan staat het icoon in een gekleurd
     vierkantje, zoals op de deuren van het naslagwerk. */
  function kaderKop(tag, klas, tekst, icoon, chip) {
    var kop = el(tag, (klas ? klas + " " : "") + "kaderkop" + (chip ? " kaderkop-chip" : ""));
    var vak = el("span", chip ? "kadericoon kaderchip" : "kadericoon");
    vak.appendChild(icoonSvg(icoon));
    kop.appendChild(vak);
    kop.appendChild(rijk(el("span", "kadertitel"), tekst));
    return kop;
  }

  /* Het materiaalfilter kleurt zijn adviezen per vlag; het icoon zegt hetzelfde
     nog eens, voor wie kleur niet ziet. */
  var VLAGICOON = { buiten: "verboden", vragen: "waarschuwing", afweging: "weegschaal", ok: "vink" };

  function linkKaart(id) {
    var l = D.links[id];
    if (!l) return null;
    var a = el("a", "linkje");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.appendChild(el("b", null, l.naam));
    if (l.noot) a.appendChild(el("span", null, l.noot));
    return a;
  }

  /* Werkwijze 2 draagt als enige twee routes: pandoc voor wie enkel Word nodig
     heeft, Quarto voor wie er meer uit wil. Een werkwijze zonder routes krijgt
     hier niets, en de kaart ziet er dan uit als voordien. */
  function routesBlok(r) {
    if (!r.routes || !r.routes.items || !r.routes.items.length) return null;
    var R = r.routes;
    var wrap = el("div", "wwroutes");
    if (R.kop) wrap.appendChild(el("h3", "wwrouteskop", R.kop));
    var rij = el("div", "wwrouterij");
    R.items.forEach(function (it) {
      var k = el("div", "wwroute");
      k.appendChild(el("b", "wwroutenaam", it.naam));
      k.appendChild(el("span", "wwroutewat", it.wat));
      if (it.hoe) k.appendChild(el("pre", "wwroutehoe", it.hoe));
      k.appendChild(rijk(el("p", "wwrouteuitleg"), it.uitleg));
      rij.appendChild(k);
    });
    wrap.appendChild(rij);
    if (R.noot) wrap.appendChild(rijk(el("p", "wwroutenoot"), R.noot));
    if (R.zonderterminal) wrap.appendChild(rijk(el("p", "wwrouteterminal"), R.zonderterminal));
    return wrap;
  }

  function linkBlok(ids, titel) {
    if (!ids || !ids.length) return null;
    var wrap = el("div", "blokje");
    wrap.appendChild(kaderKop("h3", null, titel || "Links", "schakel"));
    var lijst = el("div", "linkjes");
    ids.forEach(function (id) {
      var k = linkKaart(id);
      if (k) lijst.appendChild(k);
    });
    wrap.appendChild(lijst);
    return wrap;
  }

  /* Links die bij één tool horen, vervangen door die van de gekozen tool.
     Een lijst zonder tool-links blijft ongemoeid. */
  function toolLinks(ids) {
    if (!ids || !ids.length) return ids;
    var alle = {};
    D.assistenten.forEach(function (a) {
      (a.links || []).forEach(function (id) { alle[id] = true; });
    });
    delete alle.skills; /* het skills-idee is niet aan één tool gebonden */
    var rest = ids.filter(function (id) { return !alle[id]; });
    if (rest.length === ids.length) return ids;
    var a = mijnAssistent();
    if (!a) return rest; /* nog geen keuze: dan ook geen merkgebonden links */
    var eigen = a.links || [];
    return eigen.concat(rest.filter(function (id) { return eigen.indexOf(id) < 0; }));
  }

  /* Het kaartje "bij jouw tool", dat overal opduikt zodra je gekozen hebt. */
  function assistentKaart(a, titel) {
    if (!a) return null;
    var wrap = el("div", "toolkaart");
    /* titel false: de kop staat er al boven (in het plan is dat de vouw zelf),
       en dan blijven alleen de drie regels over. */
    if (titel !== false) wrap.appendChild(kaderKop("h3", null, titel || ("Bij " + a.naam), "vonk"));
    [
      ["je contextmap", a.plek],
      ["je regels", a.regels],
      ["een skill", a.skill]
    ].forEach(function (r) {
      var lijn = el("p", "toollijn");
      lijn.appendChild(el("b", null, r[0]));
      lijn.appendChild(tn(r[1]));
      wrap.appendChild(lijn);
    });
    return wrap;
  }

  /* "Wist je dat" bij een tool: iets dat je waarschijnlijk al hebt maar niet kent.
     Optioneel per assistent in data.js, één blok of een lijst; staat er niets,
     dan komt er niets. */
  function wistjedatLijst(a) {
    var w = a && a.wistjedat;
    return w ? [].concat(w) : [];
  }

  /* In het plan staat alleen het eerste blok, en verkort: daar is de knop
     "Lees hoe dat werkt" die naar de rest wijst. In het naslagwerk staan ze
     allemaal, achter elkaar. */
  function wistjedatBlok(a, compact) {
    var lijst = wistjedatLijst(a);
    if (!lijst.length) return null;
    if (compact) return wistjedatKaart(lijst[0], true);
    var frag = document.createDocumentFragment();
    lijst.forEach(function (w) { frag.appendChild(wistjedatKaart(w, false)); });
    return frag;
  }

  function wistjedatKaart(w, compact) {
    var wrap = el("div", "wistjedat" + (compact ? " compact" : ""));
    wrap.appendChild(kaderKop("p", "wistjedat-label", "Wist je dat", "vonk"));
    wrap.appendChild(el("h3", null, w.kop));

    if (compact) {
      wrap.appendChild(el("p", null, w.planregel || (w.tekst || [])[0]));
    } else {
      (w.tekst || []).forEach(function (t) { wrap.appendChild(el("p", null, t)); });
    }

    if (w.afbeelding && !compact) {
      var fig = el("figure", "wistjedat-beeld");
      var link = el("a");
      link.href = w.afbeelding;
      link.target = "_blank";
      link.rel = "noopener";
      var img = el("img");
      img.src = w.afbeelding;
      img.alt = w.alt || w.kop;
      img.loading = "lazy";
      link.appendChild(img);
      fig.appendChild(link);
      if (w.bijschrift) fig.appendChild(el("figcaption", null, w.bijschrift));
      wrap.appendChild(fig);
    }

    if (!compact && w.slot) wrap.appendChild(el("p", "wistjedat-slot", w.slot));

    if (!compact && w.links && w.links.length) {
      var linkjes = el("div", "linkjes");
      w.links.forEach(function (id) {
        var k = linkKaart(id);
        if (k) linkjes.appendChild(k);
      });
      wrap.appendChild(linkjes);
    }
    return wrap;
  }

  /* Een tekening met bijschrift. Klikken opent ze op ware grootte in een nieuw tabblad. */
  function figuurBlok(fig, klas) {
    if (!fig || !fig.bestand) return null;
    var f = el("figure", "figuur" + (klas ? " " + klas : ""));
    var link = el("a");
    link.href = fig.bestand;
    link.target = "_blank";
    link.rel = "noopener";
    link.title = "Bekijk de tekening op ware grootte";
    var img = el("img");
    img.src = fig.bestand;
    img.alt = fig.alt || "";
    img.loading = "lazy";
    link.appendChild(img);
    f.appendChild(link);
    if (fig.bijschrift) f.appendChild(el("figcaption", null, fig.bijschrift));
    return f;
  }

  /* Links waar een installatie achter zit. Wie in de browser blijft, krijgt ze
     niet te zien bij het klaarzetten van zijn bestanden; in het naslagwerk en
     de gereedschapskist staan ze wel, met hun drempel erbij. */
  var MOETJEINSTALLEREN = [
    "quarto", "quarto-docx", "quarto-pptx", "quarto-html", "quarto-typst",
    "quarto-revealjs", "quarto-book", "quarto-brand", "pandoc", "pandoc-refdoc",
    "marp", "mermaid", "vscode", "obsidian", "typora", "typst", "git", "writage",
    "antigravity", "antigravity-skills", "claude-code", "copilot-instructions"
  ];

  /* Blijft deze gebruiker in de browser? Dan is een mappenboom op zijn schijf,
     een commandoregel en een installatielink ruis: hij komt er niet aan toe.
     Waar staat: bij de bronvraag weten we de werkwijze nog niet, behalve bij
     wie "weinig of geen ervaring" antwoordde. Die zit altijd op werkwijze 1. */
  function browserOnly() {
    if (state.antwoorden.ervaring === "beginner") return true;
    if (state.mijnWerkwijze === "1") return true;
    var inst = D.installatie.filter(function (i) { return i.id === state.antwoorden.installatie; })[0];
    return !!(inst && inst.werkwijze === "1");
  }

  /* De mapindeling: één bestand per hoofdstuk. Staat zowel bij de vraag
     "waar staat je cursus" als in het onderwerp "Zet je cursus per hoofdstuk
     klaar". Daar komt ze zonder eigen kop binnen, want die staat er al. Wie in
     de browser blijft, krijgt dezelfde regels zonder de boom: die gaat over
     mappen op een schijf die hij niet gaat aanmaken. */
  function bronMapBlok(zonderKop) {
    var m = D.bronMap;
    if (!m) return null;
    var browser = browserOnly() && m.browser;
    var b = browser ? m.browser : m;
    var wrap = el("section", "bronmap");
    /* In het onderwerp staan die kop en die kern al bovenaan het venster. Daar
       hoeft alleen de boom met de regels eronder te komen. */
    if (!zonderKop) {
      wrap.appendChild(kaderKop("h3", "bronmapkop", T(b.kop), "map", true));
      wrap.appendChild(el("p", "bronmapkern", T(b.kern)));
    }
    if (!browser) {
      var pre = el("pre", "boom");
      pre.textContent = m.boom.join("\n");
      wrap.appendChild(pre);
    }
    var lijst = el("div", "tussenadvies");
    b.regels.forEach(function (r) {
      var lijn = el("div", "advieslijn buiten");
      lijn.appendChild(kaderKop("b", null, T(r[0]), "map"));
      rijk(lijn, r[1]);
      lijst.appendChild(lijn);
    });
    wrap.appendChild(lijst);
    if (b.noot) wrap.appendChild(el("p", "noot", T(b.noot)));
    return wrap;
  }

  /* ---------------- de onderwerpen, als venster ---------------- */

  function onderwerpBij(id) {
    return D.onderwerpen.filter(function (o) { return o.id === id; })[0];
  }

  /* Een onderwerp kan groepen keuzes dragen: manieren om hetzelfde te doen, met
     per manier wanneer je ze neemt, hoe het concreet gaat en waar ze op stukloopt.
     Tips zeggen wat je moet doen; dit zegt wat je moet kiezen, en dat is waar de
     vraag "hoe maak ik mijn figuren" op vastliep. */
  function keuzeBlokken(o) {
    if (!o.keuzes || !o.keuzes.length) return null;
    var frag = document.createDocumentFragment();
    o.keuzes.forEach(function (g) {
      var wrap = el("section", "keuzegroep");
      wrap.appendChild(kaderKop("h3", null, g.kop, "splitsing", true));
      if (g.noot) wrap.appendChild(rijk(el("p", "noot keuzegroepnoot"), g.noot));

      var rij = el("div", "keuzerij");
      (g.opties || []).forEach(function (k) {
        var kaart = el("div", "keuze");
        kaart.appendChild(el("b", "keuzenaam", k.naam));
        if (k.wanneer) kaart.appendChild(el("span", "keuzewanneer", k.wanneer));
        if (k.code) {
          var pre = el("pre", "keuzecode");
          pre.textContent = T(k.code);
          kaart.appendChild(pre);
        }
        if (k.hoe) kaart.appendChild(rijk(el("p", "keuzehoe"), k.hoe));
        if (k.letop) {
          var l = el("p", "keuzeletop");
          l.appendChild(kaderKop("b", null, "Let op", "waarschuwing"));
          rijk(l, k.letop);
          kaart.appendChild(l);
        }
        var ids = toolLinks(k.links);
        if (ids && ids.length) {
          var lijst = el("div", "linkjes keuzelinkjes");
          ids.forEach(function (id) {
            var kk = linkKaart(id);
            if (kk) lijst.appendChild(kk);
          });
          kaart.appendChild(lijst);
        }
        rij.appendChild(kaart);
      });
      wrap.appendChild(rij);

      if (g.slot) wrap.appendChild(rijk(el("p", "keuzeslot"), g.slot));
      frag.appendChild(wrap);
    });
    return frag;
  }

  /* Een merkje met de naam van een onderwerp wordt een knop die het venster opent. */
  function onderwerpMerk(id) {
    var o = onderwerpBij(id);
    if (!o) return null;
    var knop = el("button", "blokmerk blokknop", o.kort);
    knop.type = "button";
    knop.title = "Lees wat er bij “" + o.titel + "” staat";
    knop.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openOnderwerp(id);
    });
    return knop;
  }

  function openOnderwerp(id, werkwijzeNr) {
    var o = onderwerpBij(id);
    if (!o) return;
    var venster = document.getElementById("blokvenster");
    var binnen = document.getElementById("blokvenster-binnen");
    leeg(binnen);

    var idx = D.onderwerpen.indexOf(o);

    var kop = el("div", "blokkop");
    var titels = el("div");
    titels.appendChild(el("p", "vraagnr", "Onderwerp " + (idx + 1) + " van " + D.onderwerpen.length));
    titels.appendChild(el("h2", "vraag", o.titel));
    kop.appendChild(titels);
    var sluit = el("button", "sluitknop", "×");
    sluit.type = "button";
    sluit.setAttribute("aria-label", "Sluiten");
    sluit.addEventListener("click", function () { venster.close(); });
    kop.appendChild(sluit);
    binnen.appendChild(kop);

    if (o.watis) {
      var w = el("div", "advieslijn ok");
      w.appendChild(kaderKop("b", null, "Wat is het", "lamp"));
      rijk(w, o.watis);
      binnen.appendChild(w);
    }

    var h = el("div", "advieslijn buiten");
    h.appendChild(kaderKop("b", null, "De kern", "roos"));
    rijk(h, o.kern);
    binnen.appendChild(h);

    var ofig = figuurBlok(o.figuur);
    if (ofig) binnen.appendChild(ofig);

    if (o.id === "mapindeling") {
      var mb = bronMapBlok(true);
      if (mb) binnen.appendChild(mb);
    }

    if (o.tips.length) {
      binnen.appendChild(kaderKop("h3", null, "Tips", "vink", true));
      var ul = el("ul", "bloktips");
      o.tips.forEach(function (t) { ul.appendChild(rijk(el("li"), t)); });
      binnen.appendChild(ul);
    }

    /* Een tweede tekening, onder de tips. Het onderwerp draagt er twee wanneer
       de eerste zegt wat het is en de tweede hoe het werkt. */
    var ofig2 = figuurBlok(o.figuur2);
    if (ofig2) binnen.appendChild(ofig2);

    /* Een stuk uit een echt bestand, letterlijk. Voor wie nog nooit een
       regelbestand zag is de vorm de helft van het antwoord. */
    if (o.code) {
      var cb = el("section", "codevoorbeeld");
      cb.appendChild(kaderKop("h3", null, o.code.kop, "klembord", true));
      if (o.code.intro) cb.appendChild(rijk(el("p", "noot"), o.code.intro));
      var pre = el("pre", "codeblok");
      if (o.code.taal) pre.setAttribute("data-taal", o.code.taal);
      pre.appendChild(el("code", null, o.code.tekst));
      cb.appendChild(pre);
      binnen.appendChild(cb);
    }

    var kz = keuzeBlokken(o);
    if (kz) binnen.appendChild(kz);

    /* Het terzijde bij een onderwerp: de vraag die er telkens op volgt, met
       zijn eigen tekening erbij. */
    if (o.kader) {
      var kd = el("section", "onderwerpkader");
      kd.appendChild(kaderKop("h3", null, o.kader.kop, "lamp", true));
      /* Een schermafdruk moet je kunnen lezen, dus die krijgt de volle kolom.
         Een tekening naast de tekst mag smaller. */
      if (o.kader.figuur && o.kader.figuur.breed) {
        kd.appendChild(rijk(el("p", "kadertekst"), o.kader.tekst));
        kd.appendChild(figuurBlok(o.kader.figuur));
      } else {
        var knaast = el("div", "naastelkaar");
        knaast.appendChild(rijk(el("p"), o.kader.tekst));
        var kfig = figuurBlok(o.kader.figuur, "figuur-vierkant");
        if (kfig) knaast.appendChild(kfig);
        kd.appendChild(knaast);
      }
      binnen.appendChild(kd);
    }

    if (o.voorbeeld) {
      var vb = el("section", "regelvoorbeeld");
      vb.appendChild(kaderKop("h3", null, o.voorbeeld.kop, "klembord", true));
      vb.appendChild(rijk(el("p", "noot"), o.voorbeeld.intro));
      var vbfig = figuurBlok(o.voorbeeld.figuur);
      if (vbfig) vb.appendChild(vbfig);
      var vul = el("ul", "regellijst kaal");
      o.voorbeeld.regels.forEach(function (r) {
        vul.appendChild(rijk(el("li", "regelitem"), r));
      });
      vb.appendChild(vul);
      var naarColofon = el("button", "knop knop-klein", o.voorbeeld.knop);
      naarColofon.type = "button";
      naarColofon.addEventListener("click", function () {
        venster.close();
        naarVak("colofon");
      });
      vb.appendChild(naarColofon);
      binnen.appendChild(vb);
    }

    if (o.tabel) {
      binnen.appendChild(kaderKop("h3", null, "Waar dat bestand staat", "map", true));
      var wrap = el("div", "tabelwrap");
      wrap.appendChild(bouwTabel(o.tabel.kop, o.tabel.rijen));
      binnen.appendChild(wrap);
      if (o.tabel.noot) binnen.appendChild(el("p", "noot", o.tabel.noot));
    }

    if (o.gevorderd) {
      binnen.appendChild(kaderKop("h3", null, "Voor wie al bezig is", "moersleutel", true));
      var gev = [].concat(o.gevorderd);
      gev.forEach(function (t) { binnen.appendChild(rijk(el("p", "gevorderd"), t)); });
    }

    /* wat dit onderwerp betekent op de werkwijze die je leest, anders die van jezelf */
    var welke = werkwijzeNr || state.mijnWerkwijze;
    var r = welke && D.werkwijzen[welke];
    if (r && r.onderwerpen[o.id]) {
      var rb = el("div", "blokroute");
      rb.appendChild(kaderKop("b", null, "Bij werkwijze " + r.nr + ", " + r.naam, "splitsing"));
      rijk(rb, r.onderwerpen[o.id]);
      binnen.appendChild(rb);
    }

    var mijn = mijnAssistent();
    if (o.id === "contextmap" || o.id === "regels" || o.id === "skills" || o.id === "improve") {
      if (mijn) {
        var tk = assistentKaart(mijn, "Bij " + mijn.naam + " heet dat");
        tk.classList.add("kaal");
        binnen.appendChild(tk);
      } else {
        /* zonder keuze staat hierboven een omschrijving; hier het duwtje naar de namen */
        var nudge = el("div", "toolkaart kaal toolkaart-leeg");
        nudge.appendChild(el("h3", null, "Hoe heet dat bij jou?"));
        nudge.appendChild(el("p", null,
          "Je hebt nog niet gezegd met welke AI je werkt. Kies je tool bovenaan, dan zet de hele site de juiste namen erbij."));
        binnen.appendChild(nudge);
      }
    }

    /* Wat hier vroeger stond maar ergens anders thuishoort, staat nu daar, met
       hier een deur ernaartoe. */
    var vd = (o.verder || []).map(interneKaart).filter(Boolean);
    if (vd.length) {
      var vblok = el("div", "blokje");
      vblok.appendChild(kaderKop("h3", null, "Waar het verder gaat", "splitsing"));
      var vrij = el("div", "linkjes");
      vd.forEach(function (k) { vrij.appendChild(k); });
      vblok.appendChild(vrij);
      vblok.style.marginTop = "1.2rem";
      binnen.appendChild(vblok);
    }

    var lb = linkBlok(toolLinks(o.links), "Links bij dit onderwerp");
    if (lb) { lb.style.marginTop = "1.2rem"; binnen.appendChild(lb); }

    var nav = el("div", "knoppenrij");
    var vorige = D.onderwerpen[idx - 1];
    var volgende = D.onderwerpen[idx + 1];
    if (vorige) {
      var kv = el("button", "knop knop-stil", "← " + vorige.titel);
      kv.type = "button";
      kv.addEventListener("click", function () { openOnderwerp(vorige.id, werkwijzeNr); });
      nav.appendChild(kv);
    }
    if (volgende) {
      var kn = el("button", "knop knop-stil", volgende.titel + " →");
      kn.type = "button";
      kn.addEventListener("click", function () { openOnderwerp(volgende.id, werkwijzeNr); });
      nav.appendChild(kn);
    }
    binnen.appendChild(nav);

    if (!venster.open) venster.showModal();
    binnen.scrollTop = 0;
  }

  /* ---------------- verwijzen naar een andere werkwijze ---------------- */

  /* "[[2]]" in een tekst wordt een merkje in de zin, "[[3,4]]" noemt er twee,
     en "[[1|Werkwijze 1]]" zet er je eigen opschrift bij, voor waar de zin met
     de verwijzing begint. Een onbekend nummer valt weg. */
  function wwVerwijzing(kern) {
    var stuk = String(kern).split("|");
    var nrs = stuk[0].split(",").map(function (n) { return n.trim(); })
      .filter(function (n) { return D.werkwijzen[n]; });
    return { nrs: nrs, label: (stuk[1] || "").trim() || wwOpschrift(nrs) };
  }

  function wwOpschrift(nrs) {
    if (!nrs.length) return "";
    if (nrs.length === 1) return "werkwijze " + nrs[0];
    return "werkwijze " + nrs.slice(0, -1).join(", ") + " en " + nrs[nrs.length - 1];
  }

  /* Een verwijzing in de lopende tekst opent een klein venster en niet de tab.
     Wie leest waar hij zit, staat na het sluiten weer waar hij zat, en wie de
     lagere werkwijze niet wil doornemen, klikt niet. */
  function werkwijzeMerk(v) {
    if (!v.nrs.length) return null;
    var namen = v.nrs.map(function (n) { return D.werkwijzen[n].naam; }).join(", ");
    var knop = el("button", "wwmerk", v.label);
    knop.type = "button";
    knop.title = namen + ". Klik voor de kern ervan.";
    knop.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openWerkwijzePeek(v.nrs);
    });
    return knop;
  }

  /* Het kijkvenster: de pitch, wat je installeert en voor wie het is. Genoeg om
     te beslissen of je erheen wil. Het staat in een eigen dialog, zodat het ook
     boven op een openstaand onderwerp kan komen. */
  function openWerkwijzePeek(nrs) {
    var venster = document.getElementById("wwvenster");
    var binnen = document.getElementById("wwvenster-binnen");
    leeg(binnen);

    var kop = el("div", "blokkop");
    var titels = el("div");
    titels.appendChild(el("p", "vraagnr", "Even meekijken"));
    var t = wwOpschrift(nrs);
    titels.appendChild(el("h2", "vraag", t.charAt(0).toUpperCase() + t.slice(1)));
    kop.appendChild(titels);
    var sluit = el("button", "sluitknop", "×");
    sluit.type = "button";
    sluit.setAttribute("aria-label", "Sluiten");
    sluit.addEventListener("click", function () { venster.close(); });
    kop.appendChild(sluit);
    binnen.appendChild(kop);

    nrs.forEach(function (n) {
      var r = D.werkwijzen[n];
      var kaart = el("section", "wwpeek");
      var naam = el("h3", "wwpeek-naam", "Werkwijze " + r.nr + ": " + r.naam);
      if (state.mijnWerkwijze === n) naam.appendChild(el("span", "jouwroute", "jouw werkwijze"));
      kaart.appendChild(naam);
      kaart.appendChild(rijk(el("p", "wwpeek-pitch"), r.pitch));

      var dl = el("dl", "wwpeek-feiten");
      dl.appendChild(el("dt", null, "Wat je installeert"));
      dl.appendChild(el("dd", null, r.installeren));
      dl.appendChild(el("dt", null, "Voor wie"));
      dl.appendChild(el("dd", null, r.voorwie));
      kaart.appendChild(dl);

      var lees = el("button", "tekstknop", "Lees werkwijze " + r.nr + " helemaal →");
      lees.type = "button";
      lees.addEventListener("click", function () {
        venster.close();
        var blok = document.getElementById("blokvenster");
        if (blok.open) blok.close();
        naarTab("werkwijzen");
        tekenWerkwijzen(r.nr);
      });
      kaart.appendChild(lees);
      binnen.appendChild(kaart);
    });

    if (!venster.open) venster.showModal();
    binnen.scrollTop = 0;
  }

  function bouwTabel(kop, rijen) {
    var tabel = el("table", "vergelijking");
    var thead = el("thead");
    var trk = el("tr");
    kop.forEach(function (k) { trk.appendChild(el("th", null, k)); });
    thead.appendChild(trk);
    tabel.appendChild(thead);
    var tbody = el("tbody");
    rijen.forEach(function (rij) {
      var tr = el("tr");
      rij.forEach(function (cel, i) {
        var cl = el(i === 0 ? "th" : "td", null, cel);
        if (i === 0) cl.scope = "row";
        tr.appendChild(cl);
      });
      tbody.appendChild(tr);
    });
    tabel.appendChild(tbody);
    return tabel;
  }

  function bindVenster() {
    /* klik naast een venster sluit het */
    ["blokvenster", "wwvenster"].forEach(function (id) {
      var venster = document.getElementById(id);
      venster.addEventListener("click", function (e) {
        if (e.target === venster) venster.close();
      });
    });
  }

  /* ---------------- de vragen van de gids ---------------- */

  var STAPPEN = {
    doel: {
      kort: "Je doel",
      vraag: "Wat wil je met je cursus doen?",
      hulp: D.doelNoot,
      type: "single",
      opties: D.doel.map(function (d) {
        return { id: d.id, label: d.label, hulp: d.hulp || "" };
      })
    },
    ervaring: {
      kort: "Ervaring",
      vraag: "Hoeveel ervaring heb je met AI-chatbots?",
      hulp: "Eerlijk antwoorden mag. Beginnen zonder ervaring kan prima, we houden het dan bij de eenvoudigste werkwijze.",
      type: "single",
      opties: D.ervaring.map(function (e) {
        return { id: e.id, label: e.label, hulp: e.hulp || "" };
      })
    },
    account: {
      kort: "Tool",
      vraag: "Met welke AI werk je?",
      hulp: "De rest van de site past zich aan je keuze aan: waar je bestanden blijven staan, hoe je regelbestand heet, en de juiste links. Weet je het nog niet, kies dan het laatste antwoord: het volgende scherm helpt je kiezen. Wisselen kan altijd, met de knop rechtsboven.",
      type: "single",
      opties: D.assistenten.map(function (a) {
        return { id: a.id, label: a.vraaglabel || a.naam, hulp: a.kort };
      })
    },
    materiaal: {
      kort: "Materiaal",
      vraag: "Zit er materiaal bij dat niet van jou is?",
      hulp: D.materiaalNoot,
      type: "multi",
      opties: D.materiaal
    },
    bron: {
      kort: "Je bestanden",
      vraag: "In welke vorm staat je cursus nu?",
      hulp: "Kies wat het dichtst in de buurt komt. Je krijgt daarna te zien hoe je die bestanden gebruiksklaar zet.",
      type: "single",
      opties: D.bron
    },
    installatie: {
      kort: "Installeren",
      vraag: "Mag je software installeren op de laptop waar je aan die cursus werkt?",
      hulp: "Het antwoord ligt meestal niet bij jou, maar bij wie de laptop beheert.",
      type: "single",
      opties: D.installatie.map(function (i) {
        return { id: i.id, label: i.label, hulp: i.gevolg };
      })
    },
    schrijven: {
      kort: "Wie schrijft",
      vraag: "Wil je dat de AI zelf in je bestanden schrijft?",
      hulp: "Het verschil zit in wie de bestanden aanraakt. Jij, of de tool.",
      type: "single",
      opties: [
        { id: "nee", label: "nee, ik plak zelf terug", hulp: "de AI ziet je bestanden, ze wijzigt ze niet" },
        { id: "ja", label: "ja, in mijn eigen map", hulp: "zet die map eerst in versiebeheer (git)" }
      ]
    },
    duur: {
      kort: "Hoe lang",
      vraag: "Blijft deze cursus jaren meegaan, en moet er meer dan één formaat uit?",
      hulp: "Meer dan één formaat: een website en een syllabus, of slides naast je cursustekst.",
      type: "single",
      opties: [
        { id: "nee", label: "nee, dit is een opknapbeurt" },
        { id: "ja", label: "ja, en er moeten slides en een pdf uit dezelfde bron komen" }
      ]
    }
  };

  function volgorde() {
    var a = state.antwoorden;
    /* Doel eerst: het is de enige vraag die naar jouw plan vraagt in plaats van
       naar je omstandigheden, en ze opent het plan straks met je eigen zin.
       Daarna ervaring, want wie nog nooit met AI werkte kan de toolvraag niet
       beantwoorden. Door die volgorde weet de site dat al voor ze naar een merk
       vraagt, en wordt "nog geen" een keuzescherm in plaats van een muur. */
    var rij = ["doel", "ervaring", "account", "materiaal", "bron"];
    /* De vraag over installeren komt er alleen bij voor wie geen beginner is.
       Zolang we dat niet weten, tellen we ze niet mee: anders staat er "vraag 2
       van 6" en daarna "vraag 3 van 5", en een teller die krimpt terwijl je
       vooruitgaat leest als een fout. Erbij komen mag wel. */
    if (a.ervaring === undefined || a.ervaring === "beginner") return rij;
    rij.push("installatie");
    var inst = D.installatie.filter(function (i) { return i.id === a.installatie; })[0];
    if (inst && inst.vervolg) {
      rij.push("schrijven");
      if (a.schrijven === "ja") rij.push("duur");
    }
    return rij;
  }

  function huidigeStap() {
    var rij = volgorde();
    for (var i = 0; i < rij.length; i++) {
      if (state.antwoorden[rij[i]] === undefined) return rij[i];
    }
    return null;
  }

  function werkwijze() {
    var a = state.antwoorden;
    if (huidigeStap() !== null) return null;
    if (a.ervaring === undefined) return null;
    if (a.ervaring === "beginner") return "1";
    var inst = D.installatie.filter(function (i) { return i.id === a.installatie; })[0];
    if (!inst) return null;
    if (inst.werkwijze) return inst.werkwijze;
    if (a.schrijven === "nee") return "2";
    if (a.duur === "nee") return "3";
    if (a.duur === "ja") return "4";
    return null;
  }

  /* Wat je uit de gids meeneemt naar het plan. */
  function notities() {
    var a = state.antwoorden;
    var lijst = [];

    var d = mijnDoel();
    if (d) lijst.push("Je wil " + d.label + ". " + d.eerst);

    if (a.ervaring === "beginner") {
      lijst.push("Je begint zonder installaties, in de browser. De andere werkwijzen staan klaar wanneer je meer wil.");
    }

    var gevlagd = (a.materiaal || []).filter(function (id) { return id !== "eigen"; });
    gevlagd.forEach(function (id) {
      var m = D.materiaal.filter(function (x) { return x.id === id; })[0];
      if (m) lijst.push(m.label + ": " + m.advies);
    });
    if (a.materiaal !== undefined && !gevlagd.length) {
      lijst.push("Alles wat je wil opladen is van jou. Er valt niks af.");
    }

    var as = assistentBij(a.account);
    if (as && as.geenaccount) {
      lijst.push("Nog geen plek waar je bestanden blijven staan. Uitproberen lukt in een gratis venster, een hele cursus herwerken loopt op de limieten vast.");
    } else if (as && as.id === "generiek") {
      lijst.push("Je werkt met een eigen of andere tool. De principes gelden overal; kijk in de documentatie van je tool waar bestanden en instructies blijven staan.");
    } else if (as) {
      lijst.push("Je werkt met " + as.naam + ". Je contextmap wordt " + as.plek + ", je regels staan in " + as.regels + ".");
    }

    if (a.bron) {
      var b = D.bron.filter(function (x) { return x.id === a.bron; })[0];
      if (b) lijst.push("Je bestanden staan in: " + b.label + ". " + b.advies);
    }

    var inst = D.installatie.filter(function (i) { return i.id === a.installatie; })[0];
    if (inst) lijst.push("Laptop: " + inst.label + ".");

    return lijst.map(plat);
  }

  /* ---------------- de gids tekenen ---------------- */

  var wizard = document.getElementById("wizard");

  function tekenGids() {
    leeg(wizard);

    if (!state.gestart) { tekenWelkom(); return; }

    if (state.tussenin) { tekenTussenstap(state.tussenin); return; }

    var nu = huidigeStap();
    if (nu) {
      if (nu === "materiaal") {
        state.tijdelijk = state.tijdelijk || (state.antwoorden.materiaal || []).slice();
        tekenTijdelijk("materiaal");
      } else {
        state.tijdelijk = null;
        tekenVraag(nu);
      }
      return;
    }

    /* alles beantwoord maar hier beland: toon het welkom met de plan-knop */
    tekenWelkom();
  }

  /* waarom je die vier dingen doet; staat op het welkomscherm en onder je plan */
  function waaromBlok(zonderKop) {
    var vak = el("section", "waarom" + (zonderKop ? " kaal" : ""));
    if (!zonderKop) vak.appendChild(kaderKop("h3", "waarom-kop", D.waaromKop, "kompas", true));
    vak.appendChild(rijk(el("p", "waarom-noot"), D.waaromNoot));
    var lijst = el("ul", "waarom-lijst");
    D.waarom.forEach(function (w) {
      var li = el("li");
      li.appendChild(el("b", null, w.kop));
      li.appendChild(rijk(el("span"), w.tekst));
      lijst.appendChild(li);
    });
    vak.appendChild(lijst);
    return vak;
  }

  /* Het antwoord op "hoe begin ik eraan", in de volgorde waarin je het doet.
     Stond hier vroeger als vier gelijke knoppen naast elkaar; vier knoppen zijn
     een menu, en een menu zegt niet wat er eerst komt. De wegwijzer onder een
     stap kent zichzelf: de bestemming komt uit de data, via interneBestemming(). */
  function startplanBlok() {
    if (!D.startplan || !D.startplan.length) return null;
    var wrap = el("section", "startplan");
    wrap.appendChild(kaderKop("h2", "startplan-kop", D.startplanKop, "trap", true));
    if (D.startplanNoot) wrap.appendChild(rijk(el("p", "noot startplan-noot"), D.startplanNoot));

    /* De rij bolletjes van de slides staat boven de lijst. Wie de tekening al
       gezien heeft, herkent de zeven stappen eronder meteen; wie ze niet zag,
       ziet er de twee helften in staan. */
    var vfig = figuurBlok(D.figuren && D.figuren.volgorde, "figuur-breed startplan-figuur");
    if (vfig) wrap.appendChild(vfig);

    var ol = el("ol", "startplan-lijst");
    var vorigeGroep = null;
    D.startplan.forEach(function (st, i) {
      /* Op de plek waar de kleur in de tekening verspringt, staat hier de
         beugel als tussenkop. Zonder die twee regels zijn het zeven gelijke
         stappen, en dan verdwijnt dat de AI er pas bij drie bij komt. */
      var groepen = D.startplanGroepen || {};
      if (st.groep && st.groep !== vorigeGroep && groepen[st.groep]) {
        var tussen = el("li", "startplan-groep startplan-groep-" + st.groep);
        tussen.appendChild(el("span", null, groepen[st.groep]));
        tussen.setAttribute("aria-hidden", "true");
        ol.appendChild(tussen);
        vorigeGroep = st.groep;
      }
      var li = el("li", "startplan-stap");
      li.appendChild(el("b", "startplan-stapkop", st.kop));
      li.appendChild(rijk(el("span", "startplan-tekst"), st.tekst));
      var wijzers = st.wegwijzers || [st];
      wijzers.forEach(function (w) {
        var knop = wegwijzerKnop(w);
        if (knop) li.appendChild(knop);
      });
      ol.appendChild(li);
    });
    wrap.appendChild(ol);

    if (D.startplanNaast && D.startplanNaast.length) {
      var naast = el("div", "advieslijn afweging startplan-naast");
      naast.appendChild(kaderKop("b", null, D.startplanNaastKop, "splitsing"));
      D.startplanNaast.forEach(function (n) {
        var regel = rijk(el("p", "startplan-naastregel"), n.tekst);
        var k = wegwijzerKnop(n);
        if (k) { regel.appendChild(document.createTextNode(" ")); regel.appendChild(k); }
        naast.appendChild(regel);
      });
      wrap.appendChild(naast);
    }
    return wrap;
  }

  /* Een tekstknop naar een plek op deze site. Staat er geen eigen opschrift in
     de data, dan noemt de bestemming zichzelf. */
  function wegwijzerKnop(item) {
    var doel = item.wegwijzer ? interneBestemming(item.wegwijzer) : null;
    if (!doel) return null;
    var knop = el("button", "tekstknop startplan-naar", (item.knop || doel.naam) + " →");
    knop.type = "button";
    knop.addEventListener("click", doel.doe);
    return knop;
  }

  /* De twee deuren onder de volgorde. Links wat je vandaag doet, rechts de gids
     die er jouw versie van maakt. De gids stond hier vroeger bovenaan en alleen:
     wie binnenkomt met een vraag kreeg dan eerst vragen terug. */
  function startDeuren() {
    var wrap = el("div", "startdeuren");

    var eerste = el("div", "startdeur startdeur-groot");
    eerste.appendChild(el("h3", null, "Doe stap één vandaag"));
    eerste.appendChild(el("p", null, "Één hoofdstuk, van het openen van je laptop tot een tekst waar je tevreden over bent. Zes stappen, met het klikpad van jouw tool erbij."));
    var naarSessie = el("button", "knop knop-groot", "Naar je eerste sessie");
    naarSessie.type = "button";
    naarSessie.addEventListener("click", function () { naarVak("eerstekeer"); });
    eerste.appendChild(naarSessie);
    wrap.appendChild(eerste);

    var tweede = el("div", "startdeur");
    tweede.appendChild(el("h3", null, "Of laat het op jou afstemmen"));
    var klaar = state.mijnWerkwijze && huidigeStap() === null;
    if (klaar) {
      var r = D.werkwijzen[state.mijnWerkwijze];
      var a = mijnAssistent();
      tweede.appendChild(el("p", null, "Je plan staat klaar: werkwijze " + r.nr + ", " + r.naam + (a && !a.geenaccount ? ", met " + a.naam : "") + "."));
      var naarPlan = el("button", "knop", "Bekijk jouw plan");
      naarPlan.type = "button";
      naarPlan.addEventListener("click", function () { naarTab("plan"); });
      tweede.appendChild(naarPlan);
      var opnieuw = el("button", "tekstknop startdeur-stil", "Doe de bevrager opnieuw");
      opnieuw.type = "button";
      opnieuw.addEventListener("click", herbegin);
      tweede.appendChild(opnieuw);
    } else {
      var halfweg = Object.keys(state.antwoorden).length > 0;
      tweede.appendChild(el("p", null, halfweg
        ? "Je bent halverwege de bevrager. De rest van de vragen gaat over je ervaring, je AI-tool en wat er uit moet komen."
        : "Een handvol vragen over je vak, je ervaring en je AI-tool. Daarna staat er een plan met jouw werkwijze, jouw eerste drie prompts, en de knoppen zoals ze in jouw tool heten."));
      var start = el("button", "knop", halfweg ? "Ga verder waar je zat" : "Start de bevrager");
      start.type = "button";
      start.addEventListener("click", function () { state.gestart = true; bewaar(); tekenGids(); });
      tweede.appendChild(start);
      if (halfweg) {
        var opnieuw2 = el("button", "tekstknop startdeur-stil", "Begin opnieuw");
        opnieuw2.type = "button";
        opnieuw2.addEventListener("click", herbegin);
        tweede.appendChild(opnieuw2);
      }
    }
    wrap.appendChild(tweede);
    return wrap;
  }

  /* De band bovenaan de startpagina: dezelfde tekening als de titelslide van de
     talk. Geen figuurBlok(), want die hangt er een kader, een bijschrift en een
     link naar de volle grootte aan. Dit is geen figuur om te bestuderen maar de
     kop van de bladzijde, en ze staat boven de vouw, dus ze laadt meteen. */
  function heroBlok() {
    var h = D.figuren && D.figuren.hero;
    if (!h || !h.bestand) return null;
    var wrap = el("div", "hero");
    var img = el("img");
    img.src = h.bestand;
    img.alt = h.alt || "";
    img.decoding = "async";
    wrap.appendChild(img);
    return wrap;
  }

  function tekenWelkom() {
    var scherm = el("div", "welkom");

    var hero = heroBlok();
    if (hero) scherm.appendChild(hero);

    scherm.appendChild(el("p", "vraagnr", "Voor leerkrachten, lectoren en docenten"));
    scherm.appendChild(el("h1", "welkom-kop", D.rodedraad));
    scherm.appendChild(rijk(el("p", "welkom-tekst"),
      "*Je hebt het al eens geprobeerd. Je plakte een hoofdstuk in een chatvenster, vroeg om het wat vlotter te maken, " +
      "en kreeg iets terug dat las als een folder.* De AI wist niets van je vak, niets van je studenten, en niets van de " +
      "afspraken die al twintig jaar in je hoofd zitten. Op deze site zet je die drie in bestanden die bij elke vraag meegaan. " +
      "Hieronder staat in welke volgorde je dat doet."));

    var plan = startplanBlok();
    if (plan) scherm.appendChild(plan);

    scherm.appendChild(startDeuren());

    var sl = slidesBanner();
    if (sl) scherm.appendChild(sl);

    var naslagLijn = el("p", "welkom-naslag");
    naslagLijn.appendChild(tn("Liever eerst rondkijken? "));
    var naarNaslag = el("button", "tekstknop", "Naar het naslagwerk");
    naarNaslag.type = "button";
    naarNaslag.addEventListener("click", function () { naarTab("naslag"); });
    naslagLijn.appendChild(naarNaslag);
    scherm.appendChild(naslagLijn);

    var aan = aanleidingBlok();
    if (aan) scherm.appendChild(aan);

    var kern = figuurBlok(D.figuren && D.figuren.kernidee, "figuur-breed");
    if (kern) scherm.appendChild(kern);

    scherm.appendChild(waaromBlok());

    wizard.appendChild(scherm);
  }

  /* De twee slides waar de talk mee opent: iedereen heeft het al eens
     geprobeerd, en het lag niet alleen aan de vraag die je stelde. Staat onder
     het antwoord en niet erboven: wie binnenkomt met "hoe begin ik eraan" krijgt
     eerst de zeven stappen te zien. */
  function aanleidingBlok() {
    var a = D.aanleiding;
    if (!a) return null;
    var wrap = el("section", "aanleiding");
    wrap.appendChild(kaderKop("h2", null, a.kop, "lamp", true));

    /* De eerste tekening is breed en laag, dus die staat over de volle kolom
       met de tekst eronder. De tweede is vierkant en past naast zijn tekst. */
    var fig = figuurBlok(a.figuur);
    if (fig) wrap.appendChild(fig);
    wrap.appendChild(rijk(el("p"), a.tekst));

    if (a.tweede) {
      wrap.appendChild(el("h3", "aanleiding-kop", a.tweede.kop));
      var naast = el("div", "naastelkaar");
      naast.appendChild(rijk(el("p"), a.tweede.tekst));
      var fig2 = figuurBlok(a.tweede.figuur, "figuur-vierkant");
      if (fig2) naast.appendChild(fig2);
      wrap.appendChild(naast);
    }
    return wrap;
  }

  /* De slides van de talk, als een eigen strook onder de twee deuren. Ze zijn
     geen vijfde onderdeel van de site, maar wel de kortste weg door hetzelfde
     verhaal, dus ze staan hier en in de kop. */
  function slidesBanner() {
    var s = D.slides;
    if (!s) return null;
    var wrap = el("aside", "slidesbanner");
    var tekst = el("div", "slidesbanner-tekst");
    tekst.appendChild(el("b", null, s.kop));
    tekst.appendChild(el("span", "slidesbanner-titel", s.kort));
    tekst.appendChild(rijk(el("span", "slidesbanner-wat"), s.tekst));
    wrap.appendChild(tekst);
    var link = el("a", "knop slidesbanner-knop", s.knop);
    link.href = s.url;
    link.target = "_blank";
    link.rel = "noopener";
    wrap.appendChild(link);
    return wrap;
  }

  /* knop die altijd in beeld staat terwijl je de gids doorloopt; twee klikken, zodat
     een misklik je antwoorden niet wist */
  function herbeginKnop() {
    var knop = el("button", "tekstknop herbeginknop", "Begin opnieuw");
    knop.type = "button";
    knop.title = "Wis je antwoorden en begin de bevrager van vooraf aan";
    var wacht = null;
    knop.addEventListener("click", function () {
      if (wacht) { clearTimeout(wacht); herbegin(); return; }
      knop.textContent = "Zeker? Klik nog eens";
      knop.classList.add("bevestig");
      wacht = setTimeout(function () {
        wacht = null;
        knop.textContent = "Begin opnieuw";
        knop.classList.remove("bevestig");
      }, 4000);
    });
    return knop;
  }

  function herbegin() {
    /* de toolkeuze blijft staan als instelling in de kop (state.assistent),
       maar de toolvraag zelf komt terug als vraag 1, met die keuze al aangevinkt */
    state.antwoorden = {};
    state.tijdelijk = null;
    state.tussenin = null;
    state.mijnWerkwijze = "";
    state.gestart = true;
    bewaar();
    updateMenu();
    tekenGids();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function voortgang(id) {
    var rij = volgorde();
    var i = rij.indexOf(id);
    var wrap = el("div", "voortgang");
    var terug = el("button", "tekstknop terugknop", "← vorige");
    terug.type = "button";
    if (i > 0) {
      terug.addEventListener("click", function () { terugNaar(rij[i - 1]); });
    } else {
      terug.addEventListener("click", function () { state.gestart = false; bewaar(); tekenGids(); });
      terug.textContent = "← naar het begin";
    }
    wrap.appendChild(terug);
    var dots = el("span", "dots");
    rij.forEach(function (sid, j) {
      var d = el("span", "dot" + (j < i ? " klaar" : j === i ? " nu" : ""));
      dots.appendChild(d);
    });
    wrap.appendChild(dots);
    wrap.appendChild(el("span", "voortgang-tekst", "Vraag " + (i + 1) + " van " + rij.length));
    wrap.appendChild(herbeginKnop());
    return wrap;
  }

  function terugNaar(id) {
    var rij = volgorde();
    var vanaf = rij.indexOf(id);
    if (vanaf < 0) return;
    if (id === "materiaal") state.tijdelijk = (state.antwoorden.materiaal || []).slice();
    for (var i = vanaf; i < rij.length; i++) delete state.antwoorden[rij[i]];
    /* takken die door een eerder antwoord verdwijnen, ook opruimen */
    ["bron", "schrijven", "duur", "installatie"].forEach(function (k) {
      if (volgorde().indexOf(k) < 0) delete state.antwoorden[k];
    });
    state.tussenin = null;
    state.mijnWerkwijze = "";
    bewaar();
    updateMenu();
    tekenGids();
  }

  /* na elk antwoord: volgende vraag, of het plan */
  function verderOfKlaar() {
    if (state.tussenin) { tekenGids(); window.scrollTo({ top: 0, behavior: "auto" }); return; }
    var nr = werkwijze();
    if (nr) {
      state.mijnWerkwijze = nr;
      state.wwTab = nr;
      state.gestart = false;
      bewaar();
      updateMenu();
      naarTab("plan");
      return;
    }
    tekenGids();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function beantwoord(id, waarde, metTussenstap) {
    state.antwoorden[id] = waarde;
    state.tussenin = metTussenstap ? id : null;
    bewaar();
    verderOfKlaar();
  }

  function tekenVraag(id) {
    var stap = STAPPEN[id];
    var kaart = el("div", "gidsvraag");
    kaart.appendChild(voortgang(id));
    kaart.appendChild(el("h2", "vraag", stap.vraag));
    if (stap.hulp) kaart.appendChild(el("p", "vraaghulp", stap.hulp));

    var opties = el("div", "opties");
    var gekozen = state.antwoorden[id];
    /* na "Begin opnieuw" staat de toolvraag weer als vraag 1, met de vorige keuze
       (state.assistent, de instelling in de kop) al aangevinkt */
    var voorkeur = (id === "account" && gekozen === undefined) ? state.assistent : null;

    stap.opties.forEach(function (o, i) {
      var knop = el("button", "optie");
      knop.type = "button";
      knop.setAttribute("aria-pressed", voorkeur && o.id === voorkeur ? "true" : "false");
      knop.appendChild(el("span", "optie-nr", String(i + 1)));
      var tekst = el("span", "optie-tekst");
      tekst.appendChild(tn(o.label));
      var onder = o.hulp || "";
      if (onder) tekst.appendChild(el("small", null, onder));
      knop.appendChild(tekst);

      if (stap.type === "multi") {
        var aan = (gekozen || []).indexOf(o.id) >= 0;
        knop.setAttribute("aria-pressed", aan ? "true" : "false");
        knop.addEventListener("click", function () { vinkAan(id, o); });
      } else {
        knop.addEventListener("click", function () {
          var as = id === "account" ? assistentBij(o.id) : null;
          if (as) { state.assistent = as.id; INDEX = null; tekenToolChip(); }
          var tussen = (as && as.geenaccount) || id === "bron";
          beantwoord(id, o.id, tussen);
        });
      }
      opties.appendChild(knop);
    });

    kaart.appendChild(opties);

    if (stap.type === "multi") {
      var rij = el("div", "knoppenrij");
      var verder = el("button", "knop", "Verder");
      verder.type = "button";
      verder.addEventListener("click", function () {
        state.antwoorden.materiaal = state.tijdelijk || [];
        state.tijdelijk = null;
        bewaar();
        verderOfKlaar();
      });
      rij.appendChild(verder);
      var noot = el("span", "melding", "Niks aangevinkt mag ook.");
      noot.style.color = "var(--inkt-stil)";
      rij.appendChild(noot);
      kaart.appendChild(rij);
    }

    wizard.appendChild(kaart);
  }

  function vinkAan(id, optie) {
    var huidig = state.tijdelijk || state.antwoorden[id] || [];
    huidig = huidig.slice();
    var pos = huidig.indexOf(optie.id);
    if (pos >= 0) {
      huidig.splice(pos, 1);
    } else {
      if (optie.alleen) huidig = [];
      else huidig = huidig.filter(function (x) {
        var o = D.materiaal.filter(function (m) { return m.id === x; })[0];
        return !(o && o.alleen);
      });
      huidig.push(optie.id);
    }
    state.tijdelijk = huidig;
    tekenTijdelijk(id);
  }

  /* de multi-stap opnieuw tekenen zonder de rest van de pagina */
  function tekenTijdelijk(id) {
    leeg(wizard);
    var bewaardAntwoord = state.antwoorden[id];
    state.antwoorden[id] = state.tijdelijk;
    tekenVraag(id);
    tekenTussenadviesMateriaal();
    if (bewaardAntwoord === undefined) delete state.antwoorden[id];
    else state.antwoorden[id] = bewaardAntwoord;
  }

  function tekenTussenadviesMateriaal() {
    var gekozen = state.tijdelijk || [];
    if (!gekozen.length) return;
    var wrap = el("div", "tussenadvies");
    gekozen.forEach(function (mid) {
      var m = D.materiaal.filter(function (x) { return x.id === mid; })[0];
      if (!m) return;
      var lijn = el("div", "advieslijn " + m.vlag);
      lijn.appendChild(kaderKop("b", null, m.label, VLAGICOON[m.vlag] || "roos"));
      lijn.appendChild(tn(m.advies));
      wrap.appendChild(lijn);
    });
    wizard.querySelector(".gidsvraag").insertBefore(wrap, wizard.querySelector(".knoppenrij"));
  }

  function tekenTussenstap(id) {
    var kaart = el("div", "gidsvraag");
    var a = state.antwoorden;

    var balk = el("div", "voortgang");
    var terug = el("button", "tekstknop terugknop", "← vorige");
    terug.type = "button";
    terug.addEventListener("click", function () { terugNaar(id); });
    balk.appendChild(terug);
    balk.appendChild(herbeginKnop());
    kaart.appendChild(balk);

    if (id === "account") {
      kaart.appendChild(el("p", "vraagnr", "Nog geen tool"));
      kaart.appendChild(el("h2", "vraag", D.toolkeuzeKop));
      kaart.appendChild(el("p", "vraaghulp", D.toolkeuzeNoot));

      var keuzes = el("div", "toolkeuze");
      D.toolkeuze.forEach(function (k) {
        var geval = el("div", "toolgeval");
        geval.appendChild(kaderKop("b", "toolgeval-als", k.als, "splitsing"));
        geval.appendChild(el("p", "toolgeval-waarom", k.waarom));
        var doel = k.tool ? assistentBij(k.tool) : null;
        if (doel && k.knop) {
          var kies = el("button", "knop knop-klein", k.knop);
          kies.type = "button";
          kies.addEventListener("click", function () {
            state.assistent = doel.id;
            INDEX = null;
            tekenToolChip();
            state.antwoorden.account = doel.id;
            state.tussenin = null;
            bewaar();
            updateMenu();
            verderOfKlaar();
            window.scrollTo({ top: 0, behavior: "auto" });
          });
          geval.appendChild(kies);
        }
        keuzes.appendChild(geval);
      });
      kaart.appendChild(keuzes);

      if (D.toolkeuzeSlot) kaart.appendChild(el("p", "noot toolkeuzeslot", D.toolkeuzeSlot));
    }

    if (id === "bron") {
      var b = D.bron.filter(function (x) { return x.id === a.bron; })[0];
      kaart.appendChild(el("p", "vraagnr", "Zo zet je dit gebruiksklaar"));
      kaart.appendChild(el("h2", "vraag", b.label));
      rijk(kaart.appendChild(el("p", "routepitch")), b.advies);

      /* Blijf je in de browser, dan valt de route met een installatie weg, en
         ook de commandoregel die erin staat. Die ene code-regel is genoeg om
         iemand te doen denken dat deze site niet voor hem is. */
      var inBrowser = browserOnly();
      var routes = (b.routes || []).filter(function (r) {
        return !(inBrowser && r[2] === "installeren");
      });

      if (routes.length) {
        var rts = el("div", "bronroutes" + (routes.length === 1 ? " een" : ""));
        routes.forEach(function (r, i) {
          var krt = el("div", "bronroute");
          krt.appendChild(kaderKop("b", "bronroutekop", r[0],
            r[2] === "installeren" ? "terminal" : (i === 0 ? "klik" : "moersleutel")));
          var pp = el("p", "bronroutetekst");
          rijk(pp, r[1]);
          krt.appendChild(pp);
          rts.appendChild(krt);
        });
        kaart.appendChild(rts);
      }

      /* het woord markdown valt hier voor het eerst; uitleggen op de plek zelf */
      if (D.markdownUitleg && /markdown/i.test(routes.map(function (r) { return r[1]; }).join(" "))) {
        var md = el("p", "markdownuitleg");
        var mdicoon = el("span", "kadericoon");
        mdicoon.appendChild(icoonSvg("haakjes"));
        md.appendChild(mdicoon);
        md.appendChild(rijk(el("span"), D.markdownUitleg));
        kaart.appendChild(md);
      }

      var letop = (inBrowser && b.letopBrowser) || b.letop;
      if (letop) {
        var lo = el("div", "advieslijn vragen letop");
        lo.appendChild(kaderKop("b", null, "Let op", "waarschuwing"));
        rijk(lo, letop);
        kaart.appendChild(lo);
      }

      var bronlinks = toolLinks(b.links).filter(function (id) {
        return !(inBrowser && MOETJEINSTALLEREN.indexOf(id) >= 0);
      });
      var lb2 = linkBlok(bronlinks, "Waarmee");
      if (lb2) { lb2.style.marginTop = "1rem"; kaart.appendChild(lb2); }

      var mapblok = bronMapBlok();
      if (mapblok) kaart.appendChild(mapblok);

      kaart.appendChild(kaderKop("h3", "bronmapkop", "Wat hier altijd geldt", "vink", true));
      var tw = el("div", "tussenadvies");
      D.bronRegels.forEach(function (r) {
        var lijn = el("div", "advieslijn buiten");
        lijn.appendChild(kaderKop("b", null, r[0], "vink"));
        lijn.appendChild(tn(r[1]));
        tw.appendChild(lijn);
      });
      kaart.appendChild(tw);
    }

    var rij = el("div", "knoppenrij");
    /* op het toolkeuzescherm zijn de knoppen hierboven de echte keuze; deze is
       "ik beslis later", en zegt dat ook */
    var verder = el("button", id === "account" ? "knop knop-stil" : "knop",
                    id === "account" ? "Ik beslis later, ga verder" : "Verder");
    verder.type = "button";
    verder.addEventListener("click", function () {
      state.tussenin = null;
      bewaar();
      verderOfKlaar();
    });
    rij.appendChild(verder);
    kaart.appendChild(rij);
    wizard.appendChild(kaart);
  }

  /* toetsenbord: 1 tot 9 kiest een optie */
  document.addEventListener("keydown", function (e) {
    if (document.querySelector('[data-panel="gids"]').hidden) return;
    if (document.getElementById("blokvenster").open) return;
    if (document.getElementById("wwvenster").open) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    var n = parseInt(e.key, 10);
    if (!n || n < 1 || n > 9) return;
    var knoppen = wizard.querySelectorAll(".optie");
    if (knoppen[n - 1]) { knoppen[n - 1].click(); e.preventDefault(); }
  });

  /* ---------------- jouw plan ---------------- */

  /* Eén vouw uit de rij onderaan het plan: een titel met haar pictogram, en de
     inhoud eronder pas als je klikt. Het element krijgt zijn binnenkant als
     eigenschap mee, zodat de plek waar je in vult niet apart hoeft rond te
     reizen. */
  function planVouw(titel, icoon) {
    var det = el("details", "planvouw");
    var sum = el("summary");
    sum.appendChild(kaderKop("span", "planvouw-kop", titel, icoon));
    sum.appendChild(el("span", "planvouw-pijl", "▾"));
    det.appendChild(sum);
    det.binnen = el("div", "planvouw-binnen");
    det.appendChild(det.binnen);
    return det;
  }

  /* Het plan stond ooit als een stapel kaders onder elkaar: je doel in een
     kader, je werkwijze in een kader, de vier stappen als vier kaarten, en
     daaronder nog vijf blokjes die alle even hard riepen. Nu loopt er één lijn
     door de pagina (je doel, je werkwijze in één regel, de vier stappen, de
     zinnen om te plakken) en staat de rest in een rij vouwen onderaan. Er is
     niets geschrapt; het staat alleen niet meer allemaal tegelijk open. */
  function tekenPlan() {
    var doel = document.getElementById("plan");
    leeg(doel);

    var nr = state.mijnWerkwijze;
    if (!nr || !D.werkwijzen[nr]) {
      doel.appendChild(el("h2", null, "Nog geen plan"));
      doel.appendChild(el("p", "noot", "Doorloop eerst de bevrager, dan verschijnt hier je plan op maat."));
      var rij0 = el("div", "knoppenrij");
      var naarGids = el("button", "knop", "Start de bevrager");
      naarGids.type = "button";
      naarGids.addEventListener("click", function () { state.gestart = true; bewaar(); naarTab("gids"); });
      rij0.appendChild(naarGids);
      doel.appendChild(rij0);
      return;
    }

    var r = D.werkwijzen[nr];
    var a = mijnAssistent();
    var doelnu = mijnDoel();

    /* Het plan opent met wat jij wil doen, niet met de werkwijze waar je in
       terechtkwam. De werkwijze is het middel; dit is waarvoor je kwam. Geen
       kader eromheen: dit is de kop van de pagina. */
    var kop = el("header", "plankop");
    kop.appendChild(el("p", "vraagnr", "Jouw plan" + (a && !a.geenaccount ? " · met " + a.naam : "")));
    kop.appendChild(el("h2", "plandoel", doelnu ? doelnu.planKop : "Zo begin je"));
    if (doelnu) {
      kop.appendChild(rijk(el("p", "plandoel-wat"), doelnu.wat));
      if (doelnu.eerst) {
        var eerst = el("p", "planeerst");
        eerst.appendChild(el("b", null, "Waar je vandaag begint: "));
        rijk(eerst, doelnu.eerst);
        kop.appendChild(eerst);
      }
    }
    doel.appendChild(kop);

    /* De werkwijze als één regel. De volledige kaart met haar punten en routes
       staat op de werkwijzenpagina, en de knop ernaartoe staat ernaast: twee
       keer hetzelfde tonen is wat deze pagina druk maakte. */
    var ws = el("div", "planww");
    var wt = el("div", "planww-tekst");
    var wnaam = el("p", "planww-naam");
    wnaam.appendChild(el("span", "planww-nr", "Werkwijze " + r.nr));
    wnaam.appendChild(el("b", null, r.naam));
    wt.appendChild(wnaam);
    wt.appendChild(rijk(el("p", "planww-pitch"), r.pitch));
    ws.appendChild(wt);
    var wknop = el("button", "tekstknop", "Lees alles over werkwijze " + r.nr + " →");
    wknop.type = "button";
    wknop.addEventListener("click", function () { naarTab("werkwijzen"); tekenWerkwijzen(r.nr); });
    ws.appendChild(wknop);
    doel.appendChild(ws);

    /* de vier stappen om vandaag te beginnen, in de termen van jouw tool. Eén
       kolom met een lijn ertussen: zo is het een weg, en geen vier kaarten die
       om je aandacht vechten. */
    doel.appendChild(el("h3", "planstapkop", D.snelwinstKop || "Wat je opzet: vier stappen"));
    var mnm = figuurBlok(D.figuren && D.figuren.meenemen, "figuur-breed");
    if (mnm) doel.appendChild(mnm);
    var stappen = el("ol", "planstappen");
    D.snelwinst.forEach(function (w, i) {
      var li = el("li");
      var knop = el("button", "planstap");
      knop.type = "button";
      /* Het nummer is de stap uit de volgorde op de startpagina (drie tot zes),
         en niet de plaats in deze lijst. Zo staan hier dezelfde cijfers als op
         de tekening en in de zeven stappen. */
      knop.appendChild(el("span", "winstnr", w.nr || String(i + 1)));
      var tekst = el("span", "planstap-tekst");
      tekst.appendChild(el("b", null, w.titel));
      tekst.appendChild(rijk(el("span", "planstap-wat"), w.tekst));
      var onder = el("span", "planstap-onder");
      if (a) {
        var plek = "";
        if (w.onderwerp === "contextmap") plek = a.plek;
        if (w.onderwerp === "regels") plek = a.regels;
        if (w.onderwerp === "skills") plek = a.skill;
        if (plek) {
          var detail = el("span", "winstdetail");
          detail.appendChild(el("b", null, "Bij " + a.naam + ": "));
          detail.appendChild(tn(plek + "."));
          onder.appendChild(detail);
        }
      }
      if (w.waarom) onder.appendChild(el("span", "winstwaarom", w.waarom));
      if (onder.childNodes.length) tekst.appendChild(onder);
      knop.appendChild(tekst);
      knop.appendChild(el("span", "planstap-pijl", "→"));
      knop.addEventListener("click", function () { openOnderwerp(w.onderwerp, nr); });
      li.appendChild(knop);
      stappen.appendChild(li);
    });
    doel.appendChild(stappen);

    /* De zinnen om te plakken, hier en niet alleen in het naslagwerk. Wie hier
       zijn eerste gesprek gaat voeren, heeft geen reden om daar te klikken.
       Koos je een doel, dan kiest dat doel de drie; anders de vaste starters. */
    var starters = doelPrompts() || startPrompts();
    if (starters.length) {
      var pblok = el("section", "planprompts");
      pblok.appendChild(el("h3", null, D.promptPlanKop || "Vandaag plakken"));
      if (D.promptPlanNoot) pblok.appendChild(el("p", "noot", D.promptPlanNoot));
      var plijst = el("div", "promptlijst");
      starters.forEach(function (p, i) { plijst.appendChild(promptKaart(p, i + 1)); });
      pblok.appendChild(plijst);

      /* Losse prompts zeggen nog niet hoe een sessie verloopt. Wie nog nooit
         een gesprek voerde, heeft één doorlopend verhaal nodig, en dat staat
         een klik verderop. */
      var voet = el("div", "planvoet");
      if (D.voorbeeldgesprek) {
        voet.appendChild(el("p", "noot", "Nog nooit zo'n gesprek gevoerd? In het naslagwerk staat wat er letterlijk gebeurt, van je laptop openen tot een hoofdstuk waar je tevreden over bent."));
        var naarSessie = el("button", "tekstknop", "Lees de zes stappen →");
        naarSessie.type = "button";
        naarSessie.addEventListener("click", function () { naarVak("eerstekeer"); });
        voet.appendChild(naarSessie);
      }
      var allePrompts = el("button", "tekstknop", "Alle prompts in het naslagwerk →");
      allePrompts.type = "button";
      allePrompts.addEventListener("click", function () { naarVak("prompts"); });
      voet.appendChild(allePrompts);
      pblok.appendChild(voet);
      doel.appendChild(pblok);
    }

    /* Wat je niet nodig hebt om vandaag te beginnen, staat hieronder dicht: het
       hoort bij je plan, maar niet allemaal tegelijk op je scherm. */
    var meer = el("section", "planmeer");
    meer.appendChild(el("h3", "planmeerkop", "Als je verder wil"));

    var v1 = planVouw("Zo zet je werkwijze " + r.nr + " op", "trap");
    var ol1 = el("ol", "stappenlijst");
    r.stappen.forEach(function (t) { ol1.appendChild(rijk(el("li"), t)); });
    v1.binnen.appendChild(ol1);
    var inst = el("p", "planregel");
    inst.appendChild(el("b", null, "Wat je installeert: "));
    inst.appendChild(tn(r.installeren));
    v1.binnen.appendChild(inst);
    var rb = routesBlok(r);
    if (rb) v1.binnen.appendChild(rb);
    var lb = linkBlok(toolLinks(r.links), "Links bij deze werkwijze");
    if (lb) v1.binnen.appendChild(lb);
    meer.appendChild(v1);

    if (a) {
      var v2 = planVouw("Bij " + a.naam + " heet dat", "vonk");
      var tk = assistentKaart(a, false);
      tk.classList.add("kaal");
      v2.binnen.appendChild(tk);
      v2.binnen.appendChild(rijk(el("p", "toolinmap"), a.inmap));
      var wjd = wistjedatBlok(a, true);
      if (wjd) {
        var wknop2 = el("button", "tekstknop", "Lees hoe dat werkt →");
        wknop2.type = "button";
        wknop2.addEventListener("click", function () { naarVak("tool"); });
        wjd.appendChild(wknop2);
        v2.binnen.appendChild(wjd);
      }
      meer.appendChild(v2);
    }

    var nots = notities();
    if (nots.length) {
      var v3 = planVouw("Uit jouw antwoorden", "klembord");
      var ul3 = el("ul", "planlijst");
      nots.forEach(function (t) { ul3.appendChild(el("li", null, t)); });
      v3.binnen.appendChild(ul3);
      meer.appendChild(v3);
    }

    var v4 = planVouw(D.waaromKop || "Waarom je dit doet", "kompas");
    v4.binnen.appendChild(waaromBlok(true));
    meer.appendChild(v4);

    /* Een ladder, geen plafond: waar je naartoe kan als dit bevalt, met erbij
       wanneer dat de moeite is, en de geruststelling dat het nu niet hoeft. */
    if (r.volgendestap) {
      var v = r.volgendestap;
      var v5 = planVouw("Als dit bevalt: werkwijze " + v.naar, "raket");
      v5.binnen.appendChild(el("p", "ladder-wanneer", v.wanneer));
      v5.binnen.appendChild(el("p", "ladder-wat", v.wat));
      if (v.nognietnodig) v5.binnen.appendChild(el("p", "noot", v.nognietnodig));
      var naarVolgende = el("button", "tekstknop", "Lees werkwijze " + v.naar + " →");
      naarVolgende.type = "button";
      naarVolgende.addEventListener("click", function () {
        naarTab("werkwijzen");
        tekenWerkwijzen(v.naar);
      });
      v5.binnen.appendChild(naarVolgende);
      meer.appendChild(v5);
    }

    doel.appendChild(meer);

    var rij = el("div", "knoppenrij");

    var naarNaslag = el("button", "knop", "Naar het naslagwerk");
    naarNaslag.type = "button";
    naarNaslag.addEventListener("click", function () { naarTab("naslag"); });
    rij.appendChild(naarNaslag);

    var opnieuw = el("button", "knop knop-stil", "Doe de bevrager opnieuw");
    opnieuw.type = "button";
    opnieuw.addEventListener("click", function () { herbegin(); naarTab("gids"); });
    rij.appendChild(opnieuw);

    doel.appendChild(rij);
  }

  /* ---------------- tab: de vier werkwijzen ---------------- */

  function tekenWerkwijzen(nr) {
    if (nr) state.wwTab = nr;
    var actief = state.wwTab || state.mijnWerkwijze || "1";
    state.wwTab = actief;
    bewaar();

    var figdoel = document.getElementById("werkwijzenfiguur");
    if (figdoel) {
      leeg(figdoel);
      var wfig = figuurBlok(D.figuren && D.figuren.werkwijzen, "figuur-breed");
      if (wfig) figdoel.appendChild(wfig);
    }

    var tabs = document.getElementById("routetabs");
    leeg(tabs);
    ["1", "2", "3", "4"].forEach(function (n) {
      var r = D.werkwijzen[n];
      var knop = el("button", "routetab");
      knop.type = "button";
      knop.setAttribute("aria-pressed", n === actief ? "true" : "false");
      knop.appendChild(el("b", null, n));
      knop.appendChild(el("span", null, r.naam));
      knop.addEventListener("click", function () { tekenWerkwijzen(n); });
      tabs.appendChild(knop);
    });

    var r = D.werkwijzen[actief];
    var doel = document.getElementById("routepagina");
    leeg(doel);

    /* kop */
    var kaart = el("div", "routekaart");
    var kop = el("div", "routekop");
    kop.appendChild(el("span", "routeletter", "Werkwijze " + r.nr));
    kop.appendChild(el("h2", "routenaam", r.naam));
    if (state.mijnWerkwijze === actief) kop.appendChild(el("span", "jouwroute", "jouw werkwijze"));
    kaart.appendChild(kop);
    kaart.appendChild(el("p", "voorwie", "Voor " + r.voorwie + "."));
    kaart.appendChild(rijk(el("p", "routepitch"), r.pitch));
    kaart.appendChild(rijk(el("p", "routeuitleg"), r.uitleg));
    var ul = el("ul");
    r.punten.forEach(function (p) { ul.appendChild(rijk(el("li"), p)); });
    kaart.appendChild(ul);
    if (r.slot) kaart.appendChild(rijk(el("p", "routeslot"), r.slot));
    var rb2 = routesBlok(r);
    if (rb2) kaart.appendChild(rb2);
    doel.appendChild(kaart);

    /* blokjes: installeren, eerst doen, jouw tool */
    var blokjes = el("div", "blokjes");

    var b1 = el("div", "blokje");
    b1.appendChild(kaderKop("h3", null, "Wat je installeert", "kist"));
    b1.appendChild(el("p", null, r.installeren));
    b1.appendChild(kaderKop("h3", null, "Wat je overslaat", "verboden"));
    b1.appendChild(el("p", null, r.overslaan));
    blokjes.appendChild(b1);

    var b2 = el("div", "blokje");
    b2.appendChild(kaderKop("h3", null, "Wat je eerst doet", "trap"));
    var ol = el("ol", "stappenlijst");
    r.stappen.forEach(function (t) { ol.appendChild(rijk(el("li"), t)); });
    b2.appendChild(ol);
    blokjes.appendChild(b2);

    var mijnTool = mijnAssistent();
    if (mijnTool) {
      var tkaart = el("div", "blokje");
      var binnenkaart = assistentKaart(mijnTool, "Bij " + mijnTool.naam);
      binnenkaart.classList.add("kaal");
      tkaart.appendChild(binnenkaart);
      tkaart.appendChild(rijk(el("p", "toolinmap"), mijnTool.inmap));
      blokjes.appendChild(tkaart);
    }

    var lb = linkBlok(toolLinks(r.links), "Links bij deze werkwijze");
    if (lb) blokjes.appendChild(lb);

    doel.appendChild(blokjes);

    /* de onderwerpen, vertaald naar deze werkwijze */
    doel.appendChild(kaderKop("h3", "blokkenkop",
      "De " + (VOLUIT[D.onderwerpen.length] || D.onderwerpen.length) + " onderwerpen bij werkwijze " + r.nr,
      "blokken", true));
    doel.appendChild(el("p", "noot", "Zelfde onderwerpen, andere plek waar je bestanden staan. Klik een onderwerp open voor de tips zelf."));
    var lijst = el("div", "blokvertaling");
    D.onderwerpen.forEach(function (o) {
      var rij = el("div", "blokrij-item");
      var knop = el("button", "blokknop-groot");
      knop.type = "button";
      knop.appendChild(el("b", null, o.titel));
      knop.addEventListener("click", function () { openOnderwerp(o.id, actief); });
      rij.appendChild(knop);
      rij.appendChild(el("p", null, r.onderwerpen[o.id]));
      lijst.appendChild(rij);
    });
    doel.appendChild(lijst);

    /* knoppen */
    var rij2 = el("div", "knoppenrij");
    var naarHulp = el("button", "knop knop-stil", state.mijnWerkwijze ? "Doe de bevrager opnieuw" : "Twijfel je? Doe de bevrager");
    naarHulp.type = "button";
    naarHulp.addEventListener("click", function () { state.gestart = true; bewaar(); naarTab("gids"); });
    rij2.appendChild(naarHulp);
    doel.appendChild(rij2);

    tekenVergelijking(actief);
  }

  function tekenVergelijking(actief) {
    var tabel = document.getElementById("vergelijking");
    leeg(tabel);
    var v = D.vergelijking;
    var kolom = v.kop.indexOf(actief);

    var thead = el("thead");
    var trk = el("tr");
    v.kop.forEach(function (k, i) {
      var th = el("th", i === kolom ? "actief" : null, k ? "Werkwijze " + k : "");
      trk.appendChild(th);
    });
    thead.appendChild(trk);
    tabel.appendChild(thead);

    var tbody = el("tbody");
    v.rijen.forEach(function (rij) {
      var tr = el("tr");
      rij.forEach(function (cel, i) {
        var cl = el(i === 0 ? "th" : "td", i === kolom ? "actief" : null, cel);
        if (i === 0) cl.scope = "row";
        tr.appendChild(cl);
      });
      tbody.appendChild(tr);
    });
    tabel.appendChild(tbody);
  }

  /* ---------------- naslag: toolkiezer ---------------- */

  /* De twee tabellen van de slides. Ze staan onder de toolkiezer, want daar
     stelt iemand de vraag waar ze het antwoord op zijn: hoe heet dat ding bij
     mij. De rij van jouw tool staat aangeduid. De namen komen uit
     assistenten[], zodat er maar één plek is waar ze wijzigen. */
  function tekenTermentabellen() {
    var doel = document.getElementById("termentabellen");
    if (!doel || !D.termentabellen) return;
    leeg(doel);

    var fig = figuurBlok(D.assistentFiguur, "figuur-breed");
    if (fig) doel.appendChild(fig);

    D.termentabellen.forEach(function (t) {
      var wrap = el("section", "termenblok");
      wrap.appendChild(kaderKop("h3", null, t.kop, "map", true));

      /* Alleen de tools die de gevraagde namen dragen. "Iets anders" en "nog
         geen" hebben geen map op je schijf, dus die vallen in de tweede tabel
         weg in plaats van er met een streepje in te staan. */
      var rijen = D.assistenten.filter(function (a) {
        return t.uitMap ? !!a.map : !a.geenaccount && a.id !== "generiek";
      });
      if (!rijen.length) return;

      var tabel = el("table", "termen");
      var thead = el("thead");
      var trk = el("tr");
      trk.appendChild(el("th", "hoek"));
      t.kolommen.forEach(function (k) { trk.appendChild(el("th", null, k)); });
      thead.appendChild(trk);
      tabel.appendChild(thead);

      var tbody = el("tbody");
      rijen.forEach(function (a) {
        var tr = el("tr");
        if (a.id === state.assistent) tr.className = "jouwrij";
        tr.appendChild(el("th", null, a.naam));
        var k3 = a.kort3 || { plek: a.plek, regels: a.regels, skill: a.skill };
        var cellen = t.uitMap
          ? [[a.map.waarmee, a.map.via], [a.map.regelbestand, a.map.regelbestandVia], [a.map.skills, ""]]
          : [[k3.plek, ""], [k3.regels, ""], [k3.skill, ""]];
        cellen.forEach(function (c) {
          var td = el("td");
          rijk(td, c[0]);
          if (c[1]) td.appendChild(el("span", "via", c[1]));
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      tabel.appendChild(tbody);

      var tw = el("div", "tabelwrap");
      tw.appendChild(tabel);
      wrap.appendChild(tw);
      if (t.noot) wrap.appendChild(rijk(el("p", "noot"), t.noot));
      doel.appendChild(wrap);
    });
  }

  function tekenToolkiezer() {
    document.getElementById("assistent-noot").textContent = D.assistentNoot;
    tekenTermentabellen();

    var rij = document.getElementById("toolrij");
    leeg(rij);
    D.assistenten.forEach(function (a) {
      var knop = el("button", "toolknop");
      knop.type = "button";
      knop.setAttribute("aria-pressed", state.assistent === a.id ? "true" : "false");
      knop.appendChild(el("b", null, a.naam));
      knop.appendChild(el("span", null, a.kort));
      knop.addEventListener("click", function () { kiesAssistent(a.id); });
      rij.appendChild(knop);
    });

    var doel = document.getElementById("tooldetail");
    leeg(doel);
    var gekozen = assistentBij(state.assistent);
    if (!gekozen) return;

    var kaart = el("div", "advies");
    kaart.appendChild(el("h3", null, gekozen.naam));
    kaart.appendChild(el("p", null, gekozen.betaald));
    kaart.appendChild(el("p", null, gekozen.waar));

    var k = assistentKaart(gekozen, "Zo heet het daar");
    if (k) { k.classList.add("kaal"); kaart.appendChild(k); }

    var inmap = el("p", "toolinmap");
    inmap.appendChild(el("b", null, "In je eigen map schrijven"));
    rijk(inmap, gekozen.inmap);
    kaart.appendChild(inmap);

    var wjd = wistjedatBlok(gekozen);
    if (wjd) kaart.appendChild(wjd);

    if (gekozen.links.length) {
      var lijst = el("div", "linkjes");
      gekozen.links.forEach(function (id) {
        var kk = linkKaart(id);
        if (kk) lijst.appendChild(kk);
      });
      kaart.appendChild(lijst);
    }
    doel.appendChild(kaart);
  }

  function kiesAssistent(id) {
    state.assistent = state.assistent === id ? "" : id;
    /* je antwoord op de toolvraag in de gids is dezelfde keuze, dus die vult zichzelf in */
    if (state.assistent) state.antwoorden.account = state.assistent;
    else delete state.antwoorden.account;
    INDEX = null;
    bewaar();
    tekenToolChip();
    tekenToolkiezer();
    tekenNaslagVast();
    tekenPlan();
    tekenWerkwijzen();
    tekenKist();
    tekenSessie();
    tekenGids();
  }

  /* ---------------- de toolschakelaar in de kop ---------------- */

  /* De keuze staat op elke pagina, zodat je altijd ziet in welke stand je leest. */
  function tekenToolChip() {
    var knop = document.getElementById("toolchip");
    var menu = document.getElementById("toolmenu");
    if (!knop || !menu) return;

    var a = mijnAssistent();
    leeg(knop);
    knop.appendChild(el("span", "toolchip-label", a ? "Je werkt met" : "Met welke AI werk je?"));
    if (a) knop.appendChild(el("b", null, a.naam));
    knop.classList.toggle("toolchip-leeg", !a);

    leeg(menu);
    D.assistenten.forEach(function (x) {
      var o = el("button", "toolmenu-optie");
      o.type = "button";
      o.setAttribute("role", "option");
      o.setAttribute("aria-selected", state.assistent === x.id ? "true" : "false");
      o.appendChild(el("b", null, x.naam));
      o.appendChild(el("span", null, x.kort));
      o.addEventListener("click", function () {
        if (state.assistent !== x.id) kiesAssistent(x.id);
        sluitToolMenu();
        knop.focus();
      });
      menu.appendChild(o);
    });
  }

  function sluitToolMenu() {
    var menu = document.getElementById("toolmenu");
    var knop = document.getElementById("toolchip");
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    knop.setAttribute("aria-expanded", "false");
  }

  function bindToolChip() {
    var knop = document.getElementById("toolchip");
    var menu = document.getElementById("toolmenu");
    if (!knop || !menu) return;
    knop.addEventListener("click", function (e) {
      e.stopPropagation();
      var openen = menu.hidden;
      menu.hidden = !openen;
      knop.setAttribute("aria-expanded", openen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && e.target !== knop) sluitToolMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") sluitToolMenu();
    });
  }

  /* ---------------- zoeken over alles ---------------- */

  function bouwIndex() {
    var ix = [];

    D.onderwerpen.forEach(function (o) {
      ix.push({
        titel: o.titel,
        tekst: T(o.kern + (o.watis ? " " + o.watis : "")),
        zoek: T([o.titel, o.kort, o.kern, o.watis, o.tips.join(" "), [].concat(o.gevorderd).join(" ")].join(" ")),
        waar: "Onderwerp",
        doe: function () { openOnderwerp(o.id); }
      });
    });

    ["1", "2", "3", "4"].forEach(function (n) {
      var r = D.werkwijzen[n];
      ix.push({
        titel: "Werkwijze " + n + ". " + r.naam,
        tekst: T(r.pitch + " Installeren: " + r.installeren + "."),
        zoek: T([r.naam, r.pitch, r.uitleg, r.voorwie, r.punten.join(" "), r.stappen.join(" "), r.overslaan,
          r.routes ? [r.routes.kop, r.routes.items.map(function (it) { return [it.naam, it.wat, it.hoe, it.uitleg].join(" "); }).join(" "),
            r.routes.noot, r.routes.zonderterminal].join(" ") : ""].join(" ")),
        waar: "Werkwijze",
        doe: function () { naarTab("werkwijzen"); tekenWerkwijzen(n); }
      });
    });

    D.assistenten.forEach(function (a) {
      ix.push({
        titel: a.naam,
        tekst: "Je contextmap: " + a.plek + ". Je regels: " + a.regels + ".",
        zoek: [a.naam, a.kort, a.plek, a.regels, a.skill, a.inmap, a.waar, a.betaald,
          wistjedatLijst(a).map(function (w) {
            return [w.kop, (w.tekst || []).join(" "), w.slot].join(" ");
          }).join(" ")].join(" "),
        waar: "Tool",
        doe: function () { if (state.assistent !== a.id) kiesAssistent(a.id); naarVak("tool"); }
      });
    });

    D.waarom.forEach(function (w) {
      ix.push({
        titel: w.kop,
        tekst: w.tekst,
        zoek: D.waaromKop + " " + w.kop + " " + w.tekst,
        waar: "Waarom",
        doe: function () { naarTab(state.mijnWerkwijze && huidigeStap() === null ? "plan" : "gids"); }
      });
    });

    D.valkuilen.forEach(function (p) {
      ix.push({
        titel: "“" + p.klacht + "”",
        tekst: p.fix,
        zoek: p.klacht + " " + p.fix,
        waar: "Valkuil",
        doe: function () {
          naarVak("valkuilen");
          var veld = document.getElementById("zoek");
          veld.value = p.klacht.split(" ").slice(0, 3).join(" ");
          tekenValkuilen(veld.value);
        }
      });
    });

    D.prompts.forEach(function (p) {
      ix.push({
        titel: p.titel,
        tekst: p.tekst,
        zoek: p.titel + " " + p.tekst + " " + p.wanneer,
        waar: "Prompt",
        doe: function () { naarVak("prompts"); }
      });
    });

    if (D.voorbeeldgesprek) {
      var g = D.voorbeeldgesprek;
      ix.push({
        titel: g.kop,
        tekst: g.intro,
        zoek: [g.kop, g.intro, g.situatie, g.valkuil, g.slot,
               g.stappen.map(function (s) { return s.kop + " " + s.jij + " " + s.terug + " " + s.let; }).join(" "),
               "eerste keer beginnen sessie gesprek voorbeeld stap voor stap hoe begin ik"].join(" "),
        waar: "Je eerste sessie",
        doe: function () { naarVak("eerstekeer"); }
      });
      g.stappen.forEach(function (s, i) {
        ix.push({
          titel: "Stap " + (i + 1) + ": " + s.kop,
          tekst: s.jij,
          zoek: s.kop + " " + s.jij + " " + s.terug + " " + s.let,
          waar: "Je eerste sessie",
          doe: function () { naarVak("eerstekeer"); }
        });
      });
    }

    D.doel.forEach(function (d) {
      ix.push({
        titel: d.planKop,
        tekst: d.wat,
        zoek: d.label + " " + d.hulp + " " + d.planKop + " " + d.wat + " " + d.eerst,
        waar: "Wat wil je doen",
        doe: function () { naarVak("eerstekeer"); }
      });
    });

    D.gereedschap.forEach(function (g) {
      ix.push({
        titel: g.waarvoor,
        tekst: g.wat + ". Drempel: " + g.drempel + ".",
        zoek: g.waarvoor + " " + g.wat + " " + g.drempel,
        waar: "Gereedschap",
        doe: function () { naarVak("gereedschap"); }
      });
    });

    D.outputs.forEach(function (o) {
      ix.push({
        titel: o.label,
        tekst: o.advies,
        zoek: o.label + " " + o.advies,
        waar: "Wat komt eruit",
        doe: function () { state.output = o.id; bewaar(); tekenOutputs(); naarVak("uitkomst"); }
      });
    });

    D.bron.forEach(function (b) {
      var routetekst = (b.routes || []).map(function (r) { return r[0] + " " + r[1]; }).join(" ");
      ix.push({
        titel: "Mijn cursus staat in: " + b.label,
        tekst: b.advies,
        zoek: b.label + " " + b.advies + " " + routetekst + " " + (b.letop || ""),
        waar: "Je bestanden klaarzetten",
        doe: function () {
          state.gestart = true;
          state.antwoorden.bron = b.id;
          state.tussenin = "bron";
          bewaar();
          naarTab("gids");
        }
      });
    });

    if (D.bronMap) {
      ix.push({
        titel: D.bronMap.kop,
        tekst: D.bronMap.kern,
        zoek: [D.bronMap.kop, D.bronMap.kern, D.bronMap.boom.join(" "),
               D.bronMap.regels.map(function (r) { return r[0] + " " + r[1]; }).join(" "),
               "map mappen mappenstructuur hoofdstuk hoofdstukken content contentfolder folder indeling bestandsnaam nummeren"].join(" "),
        waar: "Je bestanden klaarzetten",
        doe: function () { openOnderwerp("plat"); }
      });
    }

    D.materiaal.forEach(function (m) {
      ix.push({
        titel: "Mag dit naar een AI: " + m.label,
        tekst: m.advies,
        zoek: m.label + " " + m.advies,
        waar: "Materiaal",
        doe: function () { state.gestart = true; bewaar(); naarTab("gids"); }
      });
    });

    if (D.colofon) {
      var c = D.colofon;
      ix.push({
        titel: c.kop,
        tekst: c.intro,
        zoek: [c.kop, c.intro, (c.misliep || []).join(" "), (c.regelsIntro || []).join(" "), c.slot].join(" "),
        waar: "Colofon",
        doe: function () { naarVak("colofon"); }
      });
      [].concat(c.wel, c.niet).forEach(function (r) {
        ix.push({
          titel: r.kop,
          tekst: r.tekst || c.regelsKop,
          zoek: r.kop + " " + (r.tekst || "") + " regel regels regelbestand schrijfstijl",
          waar: "Het regelbestand",
          doe: function () { naarVak("colofon"); }
        });
      });
    }

    D.randgevallen.forEach(function (g) {
      ix.push({
        titel: g.geval,
        tekst: g.wat,
        zoek: g.geval + " " + g.wat,
        waar: "Randgeval",
        doe: function () { naarVak("randgevallen"); }
      });
    });

    D.voorbeelden.forEach(function (v) {
      var tech = v.tech || [];
      var staart = [];
      if (v.maker) staart.push("door " + v.maker);
      if (tech.length) staart.push(tech.join(", "));
      ix.push({
        titel: v.titel,
        tekst: staart.length ? v.wat + " · " + staart.join(" · ") : v.wat,
        zoek: v.titel + " " + v.wat + " " + (v.maker || "") + " " + tech.join(" "),
        waar: "Voorbeeld",
        url: v.url
      });
    });

    Object.keys(D.links).forEach(function (id) {
      var l = D.links[id];
      ix.push({
        titel: l.naam,
        tekst: l.noot || l.url,
        zoek: l.naam + " " + l.noot + " " + l.url,
        waar: "Link",
        url: l.url
      });
    });

    return ix;
  }

  var INDEX = null;

  function zoekAlles(term) {
    if (!INDEX) INDEX = bouwIndex();
    var doel = document.getElementById("zoekresultaat");
    leeg(doel);

    var f = (term || "").toLowerCase().trim();
    if (f.length < 2) {
      toonVak(huidigVak);
      return;
    }
    document.getElementById("naslaghub").hidden = true;
    document.getElementById("naslagvakken").hidden = true;
    document.getElementById("naslag-noot").hidden = true;

    var woorden = f.split(/\s+/);
    var treffers = INDEX.filter(function (item) {
      var hooi = plat(item.titel + " " + item.zoek).toLowerCase();
      return woorden.every(function (w) { return hooi.indexOf(w) >= 0; });
    });

    if (!treffers.length) {
      doel.appendChild(el("p", "geen-treffer", "Niks gevonden voor “" + term + "”. Probeer bijvoorbeeld: sjabloon, skill, contextmap, limiet, pdf."));
      return;
    }

    doel.appendChild(el("p", "noot", treffers.length + " treffer" + (treffers.length === 1 ? "" : "s")));

    treffers.slice(0, 24).forEach(function (item) {
      var kaart = el(item.url ? "a" : "button", "treffer");
      if (item.url) {
        kaart.href = item.url;
        kaart.target = "_blank";
        kaart.rel = "noopener";
      } else {
        kaart.type = "button";
        kaart.addEventListener("click", function () { item.doe(); });
      }
      var kop = el("div", "trefferkop");
      kop.appendChild(el("b", null, item.titel));
      kop.appendChild(el("span", "blokmerk", item.waar));
      kaart.appendChild(kop);
      kaart.appendChild(el("span", "treffertekst", plat(item.tekst)));
      doel.appendChild(kaart);
    });

    if (treffers.length > 24) {
      doel.appendChild(el("p", "noot", "Er staan er nog " + (treffers.length - 24) + " onder. Typ een woord bij."));
    }
  }

  /* ---------------- naslag: de hub en de vakken ---------------- */

  /* Het naslagwerk is een hub met deuren. Je ziet altijd maar een vak tegelijk,
     zodat de pagina niet uitgroeit tot een muur tekst. De deuren staan in
     groepen, en boven elke groep staat de vraag die je stelt op het moment dat
     je hier terechtkomt. Wie zijn vraag herkent, leest de andere groepen niet. */
  var HUBGROEPEN = [
    {
      id: "start",
      vraag: "Waar begin ik?",
      noot: "Nog nooit met AI aan je cursus gewerkt? Dan is dit de enige deur die je nu nodig hebt.",
      items: [
        {
          vak: "eerstekeer",
          icoon: "trap",
          groot: true,
          titel: "Je eerste sessie, stap voor stap",
          kort: "Eén doorlopend verhaal: wat je typt, wat je terugkrijgt en waar je op let.",
          tel: function () { return D.voorbeeldgesprek.stappen.length + " stappen"; }
        }
      ]
    },
    {
      id: "mis",
      vraag: "Het ging mis. Wat ontbrak er?",
      noot: "De klacht die je hebt, wijst telkens naar een stap die overgeslagen is. Zoek de jouwe en je leest meteen waar ze thuishoort.",
      items: [
        {
          vak: "valkuilen",
          icoon: "verboden",
          groot: true,
          titel: "Valkuilen",
          kort: "Het verzint dingen, het klinkt niet als jou, je zit aan je limiet: per klacht de stap die eronder zit.",
          tel: function () { return D.valkuilen.length + " valkuilen"; }
        }
      ]
    },
    {
      id: "kern",
      vraag: "Hoe werkt dit dan?",
      noot: "De twee stukken waar de rest van de site op staat: wat je klaarzet, en waar die bestanden staan.",
      items: [
        {
          vak: "onderwerpen",
          icoon: "blokken",
          titel: "De onderwerpen",
          kort: "Van platte tekst en je mapindeling tot je eigen regels, je skills en je figuren.",
          tel: function () { return D.onderwerpen.length + " onderwerpen"; }
        },
        {
          tab: "werkwijzen",
          icoon: "map",
          titel: "De vier werkwijzen",
          kort: "Van een chatvenster tot een map op je laptop, en wie er in je bestanden schrijft.",
          tel: function () { return "4 werkwijzen"; },
          merk: function () {
            var r = state.mijnWerkwijze && D.werkwijzen[state.mijnWerkwijze];
            return r ? "jouw werkwijze: " + r.naam : "";
          }
        }
      ]
    },
    {
      id: "maat",
      vraag: "Wat geldt er bij mij?",
      noot: "Hier zet je vast wat de rest van de site over jou moet weten: je tool, wat je moet aanleveren, en het geval dat buiten het standaardverhaal valt.",
      items: [
        {
          vak: "tool",
          icoon: "vonk",
          titel: "Met welke AI werk je?",
          kort: "Hoe je contextmap, je regels en je skills bij jouw tool heten, en waar ze staan.",
          tel: function () { return D.assistenten.length + " tools"; },
          merk: function () {
            var a = mijnAssistent();
            return a ? "nu ingesteld: " + a.naam : "";
          }
        },
        {
          vak: "uitkomst",
          icoon: "uitvoer",
          titel: "Wat moet eruit komen?",
          kort: "Word, PowerPoint, leerplatform of pdf: wat je vraagt hangt af van wat je moet aanleveren.",
          tel: function () { return D.outputs.length + " formaten"; },
          merk: function () {
            var o = D.outputs.filter(function (x) { return x.id === state.output; })[0];
            return o ? "gekozen: " + o.label : "";
          }
        },
        {
          vak: "randgevallen",
          icoon: "splitsing",
          titel: "Bij mij ligt dat anders",
          kort: "Je deelt het vak, je cursus zit vol formules, je directie wil er niets van weten.",
          tel: function () { return D.randgevallen.length + " situaties"; }
        }
      ]
    },
    {
      id: "pak",
      vraag: "Wat kan ik nu meteen gebruiken?",
      noot: "Tekst om te kopiëren, en de programma's waarin het gebeurt.",
      items: [
        {
          vak: "prompts",
          icoon: "klembord",
          titel: "Prompts om te plakken",
          kort: "Vragen die je letterlijk kan overnemen. Ze werken in elk chatvenster.",
          tel: function () { return D.prompts.length + " prompts"; }
        },
        {
          vak: "gereedschap",
          icoon: "kist",
          titel: "Gereedschap en links",
          kort: "Programma's op volgorde van drempel, en alle links die op deze site staan.",
          tel: function () { return D.gereedschap.length + " programma's"; }
        }
      ]
    },
    {
      id: "achter",
      vraag: "Achter de schermen",
      noot: "",
      items: [
        {
          vak: "colofon",
          icoon: "haakjes",
          smal: true,
          titel: "Hoe deze site gemaakt is",
          kort: "Het regelbestand waarmee deze site geschreven is, en wat er ondertussen misging.",
          tel: function () { return (D.colofon.wel.length + D.colofon.niet.length) + " regels"; }
        }
      ]
    }
  ];

  var AFDELINGEN = HUBGROEPEN.reduce(function (alles, g) { return alles.concat(g.items); }, []);

  var VAKKEN = AFDELINGEN.filter(function (a) { return a.vak; }).map(function (a) { return a.vak; });

  var huidigVak = "";

  /* Wat je gekozen hebt kan een hele zin zijn ("Word in het sjabloon van je
     school"). Op een kaart past een halve regel: afkappen op een woordgrens,
     de volledige tekst blijft in de titel staan. */
  function kortMerk(tekst, max) {
    if (tekst.length <= max) return tekst;
    var kort = tekst.slice(0, max);
    var spatie = kort.lastIndexOf(" ");
    if (spatie > max * 0.6) kort = kort.slice(0, spatie);
    return kort + "…";
  }

  function hubKaart(a) {
    var knop = el("button", "hubkaart" + (a.groot ? " hubkaart-groot" : "") + (a.smal ? " hubkaart-smal" : ""));
    knop.type = "button";

    var vak = el("span", "hubicoon");
    vak.appendChild(icoonSvg(a.icoon));
    knop.appendChild(vak);

    var tekst = el("span", "hubtekst");
    tekst.appendChild(el("b", null, a.titel));
    tekst.appendChild(el("span", "hubkort", a.kort));

    var voet = el("span", "hubvoet");
    voet.appendChild(el("span", "hubtel", a.tel()));
    var eigen = a.merk ? a.merk() : "";
    if (eigen) {
      var chip = el("span", "hubjouw", kortMerk(eigen, 46));
      chip.title = eigen;
      voet.appendChild(chip);
    }
    tekst.appendChild(voet);

    knop.appendChild(tekst);
    knop.addEventListener("click", function () {
      if (a.tab) naarTab(a.tab);
      else naarVak(a.vak);
    });
    return knop;
  }

  function tekenNaslagHub() {
    var hub = document.getElementById("naslaghub");
    leeg(hub);
    HUBGROEPEN.forEach(function (g) {
      var groep = el("section", "hubgroep hubgroep-" + g.id);

      var kop = el("div", "hubkop");
      kop.appendChild(el("h3", "hubvraag", g.vraag));
      if (g.noot) kop.appendChild(rijk(el("p", "hubnoot"), g.noot));
      groep.appendChild(kop);

      var raster = el("div", "hubkaarten");
      g.items.forEach(function (a) { raster.appendChild(hubKaart(a)); });
      groep.appendChild(raster);

      hub.appendChild(groep);
    });
  }

  /* toont een vak, of de hub als er geen vak gekozen is */
  function toonVak(id) {
    huidigVak = VAKKEN.indexOf(id) >= 0 ? id : "";
    document.querySelectorAll(".naslagvak").forEach(function (v) {
      v.hidden = v.getAttribute("data-vak") !== huidigVak;
    });
    document.getElementById("naslagvakken").hidden = !huidigVak;
    document.getElementById("naslaghub").hidden = !!huidigVak;
    document.getElementById("naslag-noot").hidden = !!huidigVak;
  }

  function naarVak(id) {
    naarTab("naslag", id);
  }

  function wisZoek() {
    var veld = document.getElementById("zoekalles");
    if (veld) veld.value = "";
    var uit = document.getElementById("zoekresultaat");
    if (uit) leeg(uit);
  }

  function bindNaslag() {
    document.getElementById("naslag-terug").addEventListener("click", function () { naarVak(""); });
  }

  function tekenNaslagVast() {
    var rij = document.getElementById("onderwerprij");
    leeg(rij);
    D.onderwerpen.forEach(function (o) {
      var knop = el("button", "blokknop-groot");
      knop.type = "button";
      knop.appendChild(el("b", null, o.titel));
      knop.addEventListener("click", function () { openOnderwerp(o.id); });
      rij.appendChild(knop);
    });
  }

  function tekenOutputs() {
    document.getElementById("output-noot").textContent = D.outputNoot;
    var raster = document.getElementById("output-keuzes");
    var advies = document.getElementById("output-advies");
    leeg(raster);

    D.outputs.forEach(function (o, i) {
      var knop = el("button", "optie");
      knop.type = "button";
      knop.setAttribute("aria-pressed", state.output === o.id ? "true" : "false");
      knop.appendChild(el("span", "optie-nr", String(i + 1)));
      knop.appendChild(el("span", "optie-tekst", o.label));
      knop.addEventListener("click", function () {
        state.output = o.id;
        bewaar();
        tekenOutputs();
        advies.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      raster.appendChild(knop);
    });

    var gekozen = D.outputs.filter(function (o) { return o.id === state.output; })[0];
    leeg(advies);
    advies.hidden = !gekozen;
    if (!gekozen) return;

    advies.appendChild(kaderKop("h3", null, gekozen.label, "uitvoer", true));
    advies.appendChild(el("p", null, gekozen.advies));
    var olinks = toolLinks(gekozen.links);
    if (olinks.length) {
      var lijst = el("div", "linkjes");
      olinks.forEach(function (id) {
        var k = linkKaart(id);
        if (k) lijst.appendChild(k);
      });
      advies.appendChild(lijst);
    }
  }

  /* ---------------- wegwijzers onder een valkuil ---------------- */

  /* Een valkuil wijst twee kanten op. "verder" gaat naar een plek op deze site,
     "links" naar de handleiding van de makers. Een bestemming kent zichzelf: de
     naam komt uit de data, zodat een hernoemd onderwerp of een hernoemde
     werkwijze hier vanzelf meeverandert. */
  function interneBestemming(v) {
    if (v.naar === "onderwerp") {
      var o = onderwerpBij(v.id);
      if (!o) return null;
      return { naam: "Onderwerp: " + o.titel, doe: function () { openOnderwerp(v.id); } };
    }
    if (v.naar === "prompt") {
      var p = D.prompts.filter(function (x) { return x.id === v.id; })[0];
      if (!p) return null;
      return { naam: "Prompt: " + p.titel, doe: function () { naarPrompt(v.id); } };
    }
    if (v.naar === "werkwijze") {
      var r = D.werkwijzen[v.id];
      if (!r) return null;
      return {
        naam: "Werkwijze " + r.nr + ": " + r.naam,
        doe: function () { openWerkwijzePeek([v.id]); }
      };
    }
    if (v.naar === "vak") {
      var a = AFDELINGEN.filter(function (x) { return x.vak === v.id; })[0];
      if (!a) return null;
      return { naam: a.titel, doe: function () { naarVak(v.id); } };
    }
    if (v.naar === "tab") {
      var link = document.querySelector('.menulink[data-tab="' + v.id + '"]');
      if (!link) return null;
      /* De knop in het menu heet kort ("Start"). Wijst een wegwijzer naar één
         blok op zo'n bladzijde, dan mag hij dat blok noemen in plaats van de
         bladzijde: dat zet je met "naam" op de wegwijzer zelf. */
      return { naam: v.naam || link.textContent, doe: function () { naarTab(v.id); } };
    }
    return null;
  }

  /* Ziet eruit als een linkje naar buiten, met een pijl naar rechts in plaats
     van een pijl schuin omhoog. Wie klikt blijft op deze site. */
  function interneKaart(v) {
    var doel = interneBestemming(v);
    if (!doel) return null;
    var knop = el("button", "linkje intern");
    knop.type = "button";
    knop.appendChild(el("b", null, doel.naam));
    if (v.wat) knop.appendChild(el("span", null, v.wat));
    knop.addEventListener("click", function (e) {
      e.preventDefault();
      doel.doe();
    });
    return knop;
  }

  /* Naar de promptkaart zelf, en niet naar de bovenkant van een lijst met acht
     prompts waar je de jouwe nog moet zoeken. De kaart licht even op. */
  function naarPrompt(id) {
    naarVak("prompts");
    var kaart = document.querySelector('.promptkaart[data-prompt="' + id + '"]');
    if (!kaart) return;
    kaart.scrollIntoView({ block: "center", behavior: "auto" });
    kaart.classList.remove("aangewezen");
    void kaart.offsetWidth; /* de animatie opnieuw laten starten */
    kaart.classList.add("aangewezen");
  }

  /* De twee rijen wegwijzers onder de fix. Geeft null als er niets te wijzen
     valt, zodat een valkuil zonder verwijzingen eruitziet als voordien. */
  function verderBlok(p) {
    var intern = (p.verder || []).map(interneKaart).filter(Boolean);

    /* Hier gaat toolLinks() niet op: onder een valkuil hoort de bladzijde die
       het antwoord geeft, en geen zes links van je eigen merk. De valkuil noemt
       de rol ("regels", "project", "skill"), en wie een tool koos krijgt er de
       bladzijde bij die bij jouw tool hoort. */
    var ids = (p.links || []).slice();
    var a = mijnAssistent();
    var rol = a && a.rollen && p.toollink ? a.rollen[p.toollink] : "";
    if (rol && ids.indexOf(rol) < 0) ids.push(rol);

    var extern = [];
    ids.forEach(function (id) {
      var k = linkKaart(id);
      if (k) extern.push(k);
    });
    if (!intern.length && !extern.length) return null;

    var wrap = el("div", "verder");
    if (intern.length) {
      wrap.appendChild(el("p", "verderkop", "Verder op deze site"));
      var a = el("div", "linkjes");
      intern.forEach(function (k) { a.appendChild(k); });
      wrap.appendChild(a);
    }
    if (extern.length) {
      wrap.appendChild(el("p", "verderkop", "Bij de makers zelf"));
      var b = el("div", "linkjes");
      extern.forEach(function (k) { b.appendChild(k); });
      wrap.appendChild(b);
    }
    return wrap;
  }

  /* ---------------- tab: valkuilen ---------------- */

  function tekenValkuilen(filter) {
    var lijst = document.getElementById("probleemlijst");
    var geen = document.getElementById("geen-treffer");
    leeg(lijst);
    var f = (filter || "").toLowerCase().trim();
    var treffers = 0;

    D.valkuilen.forEach(function (p) {
      var o = onderwerpBij(p.onderwerp);
      var wegwijzers = (p.verder || []).map(function (v) {
        var doel = interneBestemming(v);
        return (doel ? doel.naam : "") + " " + (v.wat || "");
      }).join(" ");
      var hooi = (p.klacht + " " + p.fix + " " + (o ? o.titel : "") + " " +
                  wegwijzers).toLowerCase();
      if (f && hooi.indexOf(f) < 0) return;
      treffers++;

      var det = el("details", "probleem");
      if (f) det.open = true;
      var sum = el("summary");
      sum.appendChild(tn("“" + p.klacht + "”"));
      var merk = onderwerpMerk(p.onderwerp);
      if (merk) sum.appendChild(merk);
      det.appendChild(sum);

      var binnen = el("div", "binnen");
      binnen.appendChild(el("p", null, p.fix));
      var verder = verderBlok(p);
      if (verder) binnen.appendChild(verder);
      det.appendChild(binnen);
      lijst.appendChild(det);
    });

    geen.hidden = treffers > 0;
  }

  /* ---------------- naslag: prompts en gereedschapskist ---------------- */

  /* Eén promptkaart met kopieerknop. Staat in het naslagwerk én in het plan:
     voor wie nog nooit een gesprek voerde is een zin die hij kan plakken de
     hele oprit, en die mag niet achter een kaart in het naslagwerk blijven. */
  function promptKaart(p, nr) {
    var kaart = el("div", "promptkaart");
    if (p.id) kaart.setAttribute("data-prompt", p.id);
    var kop = el("div", "promptkop");
    if (nr) kop.appendChild(el("span", "winstnr", String(nr)));
    kop.appendChild(el("b", null, p.titel));
    var merk = p.onderwerp ? onderwerpMerk(p.onderwerp) : null;
    if (merk) kop.appendChild(merk);
    kaart.appendChild(kop);
    kaart.appendChild(el("p", "promptwanneer", p.wanneer));
    kaart.appendChild(el("blockquote", "prompttekst", p.tekst));

    var knop = el("button", "knop knop-stil", "Kopieer");
    knop.type = "button";
    knop.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(p.tekst).then(function () {
          knop.textContent = "Gekopieerd";
          setTimeout(function () { knop.textContent = "Kopieer"; }, 1800);
        }, function () { knop.textContent = "Lukte niet"; });
      }
    });
    kaart.appendChild(knop);
    return kaart;
  }

  /* De prompts waarmee je begint, op volgorde. */
  function startPrompts() {
    return D.prompts.filter(function (p) { return p.start; }).sort(function (x, y) {
      return x.start - y.start;
    });
  }

  /* De drie prompts die bij je doel horen, in de volgorde waarin je ze stelt.
     Geeft null als er geen doel gekozen is, zodat de vaste starters het overnemen. */
  function doelPrompts() {
    var d = mijnDoel();
    if (!d || !d.prompts) return null;
    var rij = d.prompts.map(function (id) {
      return D.prompts.filter(function (p) { return p.id === id; })[0];
    }).filter(Boolean);
    return rij.length ? rij : null;
  }

  function tekenPrompts() {
    var lijst = document.getElementById("promptlijst");
    leeg(lijst);
    D.prompts.forEach(function (p) { lijst.appendChild(promptKaart(p)); });
  }

  /* De vraag die na de eerste versie van deze bladzijde het vaakst terugkwam:
     waar zet ik die map dan? "Een Project" is een naam en geen plek, dus staat
     hier het klikpad van de tool die bovenaan gekozen is, met de knoppen zoals
     ze daar heten, en eronder wat er in die plek ligt als de stap klaar is. */
  function sessiePlekBlok() {
    var p = D.voorbeeldgesprek && D.voorbeeldgesprek.plek;
    if (!p) return null;
    var a = mijnAssistent();
    var wrap = el("div", "advieslijn buiten sessieplek");
    wrap.appendChild(kaderKop("b", null, a ? "Bij " + a.naam + ", klik voor klik" : p.kop, "map"));

    var stappen = (a && a.sessieplek) || null;
    if (stappen && stappen.length) {
      var ol = el("ol", "plekstappen");
      stappen.forEach(function (t) { ol.appendChild(rijk(el("li"), t)); });
      wrap.appendChild(ol);
    } else {
      wrap.appendChild(rijk(el("p", "plekzonder"), p.zonderTool));
    }

    if (p.boom && p.boom.length) {
      if (p.boomKop) wrap.appendChild(el("p", "plekboomkop", p.boomKop));
      var pre = el("pre", "boom");
      pre.textContent = p.boom.join("\n");
      wrap.appendChild(pre);
    }
    if (p.schijf) wrap.appendChild(rijk(el("p", "pleknoot"), p.schijf));

    /* de bladzijde van de makers zelf: daar staan de schermafbeeldingen die
       hier niet passen, en die blijven kloppen als een knop verhuist */
    var lid = a ? (a.sessieplekLink !== undefined ? a.sessieplekLink : (a.rollen || {}).project) : "";
    var kaart = lid ? linkKaart(lid) : null;
    if (kaart) {
      var lijstje = el("div", "linkjes");
      lijstje.appendChild(kaart);
      wrap.appendChild(lijstje);
    }
    return wrap;
  }

  /* Eén sessie van begin tot eind. Per stap vier dingen: wat je doet, wat je
     typt, wat je terugkrijgt en waar je op let. Die laatste twee kolommen zijn
     waar het om gaat: zonder die is het weer een lijstje tips. */
  function tekenSessie() {
    var g = D.voorbeeldgesprek;
    if (!g) return;
    document.getElementById("sessie-kop").textContent = g.kop;
    rijk(leeg(document.getElementById("sessie-intro")), g.intro);

    var doel = document.getElementById("sessie-inhoud");
    leeg(doel);

    var sfig = figuurBlok(g.figuur, "figuur-breed");
    if (sfig) doel.appendChild(sfig);

    if (g.situatie) {
      var sit = el("div", "advieslijn buiten sessiesituatie");
      sit.appendChild(kaderKop("b", null, "Waarmee je begint", "map"));
      rijk(sit, g.situatie);
      doel.appendChild(sit);
    }
    if (g.tweedekeer) doel.appendChild(rijk(el("p", "sessieduur"), g.tweedekeer));

    var lijst = el("ol", "sessielijst");
    g.stappen.forEach(function (s, i) {
      var li = el("li", "sessiestap");
      li.appendChild(el("b", "sessiestapkop", T(s.kop)));
      [["Wat je doet", s.jij, "jij", "klik"], ["Wat je terugkrijgt", s.terug, "terug", "gesprek"], ["Waar je op let", s.let, "let", "oog"]]
        .forEach(function (r) {
          if (!r[1]) return;
          var regel = el("div", "sessieregel sessie-" + r[2]);
          regel.appendChild(kaderKop("b", null, r[0], r[3]));
          rijk(regel, r[1]);
          li.appendChild(regel);
        });
      if (i === 0) {
        var plek = sessiePlekBlok();
        if (plek) li.appendChild(plek);
      }
      lijst.appendChild(li);
    });
    doel.appendChild(lijst);

    if (g.valkuil) {
      var vk = el("div", "advieslijn vragen letop");
      vk.appendChild(kaderKop("b", null, "De fout die iedereen maakt", "waarschuwing"));
      rijk(vk, g.valkuil);
      doel.appendChild(vk);
    }
    if (g.slot) doel.appendChild(rijk(el("p", "sessieslot"), g.slot));
  }

  /* Het colofon: het regelbestand van deze site, en wat er misging. Staat er
     omdat het onderwerp "je regels" wel zegt dat een regel testbaar moet zijn
     en er tot nu toe geen enkele liet zien. */
  function tekenColofon() {
    var c = D.colofon;
    if (!c) return;
    document.getElementById("colofon-kop").textContent = c.kop;
    document.getElementById("colofon-intro").textContent = c.intro;

    var doel = document.getElementById("colofon-inhoud");
    leeg(doel);

    if (c.delenFiguur) {
      var db = el("section", "colofon-delen");
      db.appendChild(kaderKop("h3", null, c.delenKop, "blokken", true));
      if (c.delenIntro) db.appendChild(rijk(el("p", "noot"), c.delenIntro));
      var dfig = figuurBlok(c.delenFiguur, "figuur-breed");
      if (dfig) db.appendChild(dfig);
      doel.appendChild(db);
    }

    var cfig = figuurBlok(c.figuur, "figuur-breed");
    if (cfig) doel.appendChild(cfig);

    if (c.mapFiguur) {
      var mb = el("section", "colofon-map");
      mb.appendChild(kaderKop("h3", null, c.mapKop, "map", true));
      if (c.mapIntro) mb.appendChild(rijk(el("p", "noot"), c.mapIntro));
      var mfig = figuurBlok(c.mapFiguur, "figuur-breed");
      if (mfig) mb.appendChild(mfig);
      doel.appendChild(mb);
    }

    if (c.nogNiet && c.nogNiet.length) {
      var nn = el("div", "advieslijn afweging colofon-nogniet");
      nn.appendChild(kaderKop("b", null, c.nogNietKop, "splitsing"));
      var nul = el("ul");
      c.nogNiet.forEach(function (t) { nul.appendChild(rijk(el("li"), t)); });
      nn.appendChild(nul);
      doel.appendChild(nn);
    }

    if (c.misliep && c.misliep.length) {
      var mis = el("div", "advieslijn vragen colofon-misliep");
      mis.appendChild(kaderKop("b", null, c.misliepKop, "waarschuwing"));
      c.misliep.forEach(function (t) { mis.appendChild(rijk(el("p"), t)); });
      doel.appendChild(mis);
    }

    doel.appendChild(kaderKop("h3", null, c.regelsKop, "klembord", true));
    (c.regelsIntro || []).forEach(function (t) {
      doel.appendChild(rijk(el("p", "noot"), t));
    });

    [[c.welKop, c.wel, "vink"], [c.nietKop, c.niet, "verboden"]].forEach(function (paar) {
      doel.appendChild(kaderKop("h4", "regelkopje", paar[0] + " (" + paar[1].length + ")", paar[2]));
      var ul = el("ul", "regellijst");
      paar[1].forEach(function (r) {
        var li = el("li", "regelitem");
        li.appendChild(el("b", "regelkop", r.kop));
        if (r.tekst) li.appendChild(rijk(el("span", "regeltekst"), r.tekst));
        ul.appendChild(li);
      });
      doel.appendChild(ul);
    });

    /* De enige skill die deze site heeft, en de vier bestanden waar ze uit
       bestaat. Staat hier om dezelfde reden als het regelbestand erboven: het
       onderwerp zegt wel wat een skill is en liet er tot nu geen enkele zien. */
    if (c.skill) {
      var sk = el("section", "colofonskill");
      doel.appendChild(kaderKop("h3", null, c.skill.kop, "vonk", true));
      (c.skill.intro || []).forEach(function (t) {
        sk.appendChild(rijk(el("p", "noot"), t));
      });

      if (c.skill.bestanden && c.skill.bestanden.length) {
        if (c.skill.bestandenKop) {
          sk.appendChild(kaderKop("h4", "regelkopje", c.skill.bestandenKop + " (" + c.skill.bestanden.length + ")", "klembord"));
        }
        var bl = el("ul", "skillbestanden");
        c.skill.bestanden.forEach(function (b) {
          var li = el("li", "skillbestand");
          var l = D.links[b[2]];
          if (l) {
            var a = el("a", "skillbestandnaam");
            a.href = l.url;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = b[0];
            li.appendChild(a);
          } else {
            li.appendChild(el("b", "skillbestandnaam", b[0]));
          }
          li.appendChild(rijk(el("span", "skillbestandwat"), b[1]));
          bl.appendChild(li);
        });
        sk.appendChild(bl);
      }

      if (c.skill.slot) sk.appendChild(rijk(el("p", "skillslot"), c.skill.slot));

      var sl = linkBlok(c.skill.links, "Wat ernaast staat");
      if (sl) sk.appendChild(sl);

      doel.appendChild(sk);
    }

    if (c.slot) doel.appendChild(rijk(el("p", "sessieslot"), c.slot));
  }

  function tekenKist() {
    document.getElementById("kist-noot").textContent = D.gereedschapNoot;
    var lijst = document.getElementById("kist-lijst");
    leeg(lijst);

    D.gereedschap.forEach(function (g) {
      var rij = el("div", "kist-rij");
      rij.appendChild(el("div", "waarvoor", g.waarvoor));
      var wat = el("div", "wat");
      var l = D.links[g.link];
      if (l) {
        var a = el("a", null, g.wat);
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        wat.appendChild(a);
      } else {
        wat.textContent = T(g.wat);
      }
      rij.appendChild(wat);
      var d = el("span", "drempel", g.drempel);
      d.setAttribute("data-d", g.drempel);
      rij.appendChild(d);
      lijst.appendChild(rij);
    });

    var raster = document.getElementById("linkraster");
    leeg(raster);
    Object.keys(D.links).forEach(function (id) {
      var k = linkKaart(id);
      if (k) raster.appendChild(k);
    });
  }

  /* ---------------- naslag: randgevallen ---------------- */

  function tekenRandgevallen() {
    var wrap = document.getElementById("randgevallen-lijst");
    leeg(wrap);
    D.randgevallen.forEach(function (r) {
      var d = el("div", "randgeval");
      d.appendChild(kaderKop("b", null, r.geval, "vraagteken"));
      d.appendChild(rijk(el("span"), r.wat));
      wrap.appendChild(d);
    });
  }

  /* ---------------- tab: voorbeelden ---------------- */

  function tekenVoorbeelden() {
    document.getElementById("voorbeelden-noot").textContent = D.voorbeeldenNoot;

    /* Dichtgeklapt is de kop de hele boodschap. Wie wil weten welke projecten
       bedoeld zijn, klapt open. */
    var haak = document.getElementById("voorbeelden-waarschuwing");
    leeg(haak);
    if (D.voorbeeldenWaarschuwing) {
      var w = D.voorbeeldenWaarschuwing;
      var det = el("details", "voorbeeldwaarschuwing");
      var sum = el("summary");
      var ic = el("span", "vw-icoon");
      ic.appendChild(icoonSvg(w.icoon || "raket"));
      sum.appendChild(ic);
      sum.appendChild(el("span", "vw-kop", w.kop));
      sum.appendChild(el("span", "vw-pijl", "▾"));
      det.appendChild(sum);
      var binnen = el("div", "vw-binnen");
      w.tekst.forEach(function (t) { binnen.appendChild(rijk(el("p"), t)); });
      det.appendChild(binnen);
      haak.appendChild(det);
    }

    var raster = document.getElementById("voorbeeldenraster");
    leeg(raster);
    D.voorbeelden.forEach(function (v) {
      var a = el("a", "linkje voorbeeldkaart");
      a.href = v.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.appendChild(el("b", null, v.titel));
      if (v.maker) a.appendChild(el("span", "maker", "door " + v.maker));
      a.appendChild(el("span", null, v.wat));
      if (v.tech && v.tech.length) {
        var rij = el("span", "techrij");
        v.tech.forEach(function (t) { rij.appendChild(el("span", "techje", t)); });
        a.appendChild(rij);
      }
      raster.appendChild(a);
    });
  }

  /* ---------------- menu en tabs ---------------- */

  function updateMenu() {
    document.getElementById("menu-plan").hidden = !state.mijnWerkwijze;
  }

  function naarTab(naam, vak) {
    wisZoek();
    document.querySelectorAll(".paneel").forEach(function (p) {
      p.hidden = p.getAttribute("data-panel") !== naam;
    });
    document.querySelectorAll(".menulink").forEach(function (t) {
      if (t.getAttribute("data-tab") === naam) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    if (naam === "gids") tekenGids();
    if (naam === "plan") tekenPlan();
    if (naam === "werkwijzen") tekenWerkwijzen();
    if (naam === "naslag") {
      tekenToolkiezer();
      tekenNaslagVast();
      tekenSessie();   /* staat vol {projectplek}: hertekenen met de tool van nu */
      tekenNaslagHub();
      toonVak(vak || "");
    } else {
      huidigVak = "";
    }
    var adres = "#" + naam + (huidigVak ? "/" + huidigVak : "");
    if (location.hash !== adres) history.replaceState(null, "", adres);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function bindTabs() {
    document.querySelectorAll(".menulink, .merk").forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        naarTab(t.getAttribute("data-tab"));
      });
    });
    var stukken = (location.hash || "").replace("#", "").split("/");
    var start = stukken[0];
    var vak = stukken[1];
    var geldig = ["gids", "plan", "werkwijzen", "naslag", "voorbeelden"];
    /* #valkuilen was een eigen tab en staat nog in links en bladwijzers van
       voor de verhuizing. Ze komt nu uit als het vak in het naslagwerk. */
    if (start === "valkuilen") { start = "naslag"; vak = "valkuilen"; }
    if (start === "plan" && !state.mijnWerkwijze) start = "gids";
    naarTab(geldig.indexOf(start) >= 0 ? start : "gids", vak);
  }

  /* ---------------- start ---------------- */

  laad();
  updateMenu();
  bindVenster();
  bindNaslag();
  bindToolChip();
  tekenToolChip();
  bindTabs();
  tekenPlan();
  tekenWerkwijzen();
  tekenToolkiezer();
  tekenNaslagVast();
  tekenNaslagHub();
  tekenOutputs();
  tekenValkuilen("");
  tekenPrompts();
  tekenSessie();
  tekenKist();
  tekenColofon();
  tekenRandgevallen();
  tekenVoorbeelden();

  document.getElementById("zoek").addEventListener("input", function (e) {
    tekenValkuilen(e.target.value);
  });

  document.getElementById("zoekalles").addEventListener("input", function (e) {
    zoekAlles(e.target.value);
  });

})();
