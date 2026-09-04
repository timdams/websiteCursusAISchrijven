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
    regelsbestand: "je regelsbestand",
    regelsplek: "een vast bestand met je afspraken",
    projectplek: "een vaste map of project",
    skillplek: "een apart document per soort taak",
    toolnaam: "je AI-tool"
  };

  /* Vult {regelsbestand}, {regelsplek}, {projectplek}, {skillplek} en
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

  function el(tag, klas, tekst) {
    var n = document.createElement(tag);
    if (klas) n.className = klas;
    if (tekst !== undefined) n.textContent = T(tekst);
    return n;
  }

  function tn(tekst) { return document.createTextNode(T(tekst)); }

  /* Tekst met `iets tussen accenten` erin: dat stuk wordt een code-vakje,
     de rest gewone tekst. Hangt alles onder node. */
  function rijk(node, tekst) {
    var stukken = String(T(tekst)).split("`");
    for (var i = 0; i < stukken.length; i++) {
      if (!stukken[i]) continue;
      if (i % 2) {
        var c = document.createElement("code");
        c.textContent = stukken[i];
        node.appendChild(c);
      } else {
        node.appendChild(document.createTextNode(stukken[i]));
      }
    }
    return node;
  }

  function leeg(node) { while (node.firstChild) node.removeChild(node.firstChild); }

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

  function linkBlok(ids, titel) {
    if (!ids || !ids.length) return null;
    var wrap = el("div", "blokje");
    wrap.appendChild(el("h3", null, titel || "Links"));
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
    wrap.appendChild(el("h3", null, titel || ("Bij " + a.naam)));
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
     Optioneel per assistent in data.js; staat er niets, dan komt er niets. */
  function wistjedatBlok(a, compact) {
    var w = a && a.wistjedat;
    if (!w) return null;

    var wrap = el("div", "wistjedat" + (compact ? " compact" : ""));
    wrap.appendChild(el("p", "wistjedat-label", "Wist je dat"));
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
    "marp", "mermaid", "vscode", "obsidian", "typora", "typst", "git",
    "gemini-cli", "claude-code", "copilot-instructions"
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
     "waar staat je cursus" als in het onderwerp over platte tekst. Wie in de
     browser blijft, krijgt dezelfde regels zonder de boom: die gaat over mappen
     op een schijf die hij niet gaat aanmaken. */
  function bronMapBlok() {
    var m = D.bronMap;
    if (!m) return null;
    var browser = browserOnly() && m.browser;
    var b = browser ? m.browser : m;
    var wrap = el("section", "bronmap");
    wrap.appendChild(el("h3", "bronmapkop", T(b.kop)));
    wrap.appendChild(el("p", "bronmapkern", T(b.kern)));
    if (!browser) {
      var pre = el("pre", "boom");
      pre.textContent = m.boom.join("\n");
      wrap.appendChild(pre);
    }
    var lijst = el("div", "tussenadvies");
    b.regels.forEach(function (r) {
      var lijn = el("div", "advieslijn buiten");
      lijn.appendChild(el("b", null, T(r[0])));
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
      w.appendChild(el("b", null, "Wat is het"));
      w.appendChild(tn(o.watis));
      binnen.appendChild(w);
    }

    var h = el("div", "advieslijn buiten");
    h.appendChild(el("b", null, "De kern"));
    h.appendChild(tn(o.kern));
    binnen.appendChild(h);

    var ofig = figuurBlok(o.figuur);
    if (ofig) binnen.appendChild(ofig);

    if (o.tips.length) {
      binnen.appendChild(el("h3", null, "Tips"));
      var ul = el("ul", "bloktips");
      o.tips.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      binnen.appendChild(ul);
    }

    if (o.tabel) {
      binnen.appendChild(el("h3", null, "Waar dat bestand staat"));
      var wrap = el("div", "tabelwrap");
      wrap.appendChild(bouwTabel(o.tabel.kop, o.tabel.rijen));
      binnen.appendChild(wrap);
      if (o.tabel.noot) binnen.appendChild(el("p", "noot", o.tabel.noot));
    }

    if (o.id === "plat") {
      var mb = bronMapBlok();
      if (mb) binnen.appendChild(mb);
    }

    if (o.gevorderd) {
      binnen.appendChild(el("h3", null, "Voor wie al bezig is"));
      var gev = [].concat(o.gevorderd);
      gev.forEach(function (t) { binnen.appendChild(el("p", "gevorderd", t)); });
    }

    /* wat dit onderwerp betekent op de werkwijze die je leest, anders die van jezelf */
    var welke = werkwijzeNr || state.mijnWerkwijze;
    var r = welke && D.werkwijzen[welke];
    if (r && r.onderwerpen[o.id]) {
      var rb = el("div", "blokroute");
      rb.appendChild(el("b", null, "Bij werkwijze " + r.nr + ", " + r.naam));
      rb.appendChild(tn(r.onderwerpen[o.id]));
      binnen.appendChild(rb);
    }

    var mijn = mijnAssistent();
    if (o.id === "contextmap" || o.id === "regels" || o.id === "skills") {
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
    var venster = document.getElementById("blokvenster");
    /* klik naast het venster sluit het */
    venster.addEventListener("click", function (e) {
      if (e.target === venster) venster.close();
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
      hulp: "De rest van de site past zich aan je keuze aan: waar je bestanden blijven staan, hoe je regelsbestand heet, en de juiste links. Weet je het nog niet, kies dan het laatste antwoord: het volgende scherm helpt je kiezen. Wisselen kan altijd, met de knop rechtsboven.",
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
    if (a.ervaring === "beginner") return rij;
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

    return lijst;
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
  function waaromBlok() {
    var vak = el("section", "waarom");
    vak.appendChild(el("h3", "waarom-kop", D.waaromKop));
    vak.appendChild(el("p", "waarom-noot", D.waaromNoot));
    var lijst = el("ul", "waarom-lijst");
    D.waarom.forEach(function (w) {
      var li = el("li");
      li.appendChild(el("b", null, w.kop));
      li.appendChild(el("span", null, w.tekst));
      lijst.appendChild(li);
    });
    vak.appendChild(lijst);
    return vak;
  }

  function tekenWelkom() {
    var scherm = el("div", "welkom");

    scherm.appendChild(el("p", "vraagnr", "Voor leerkrachten, lectoren en docenten"));
    scherm.appendChild(el("h1", "welkom-kop", D.rodedraad));
    scherm.appendChild(el("p", "welkom-tekst",
      "Deze site helpt je AI in te schakelen bij het schrijven van je cursusmateriaal, ook als je nog nooit met een AI-chatbot werkte. " +
      "Beantwoord een handvol vragen en je krijgt een plan op maat: welke werkwijze bij jou past, en waar je vandaag mee begint."));

    var rij = el("div", "knoppenrij welkom-knoppen");

    if (state.mijnWerkwijze && huidigeStap() === null) {
      var r = D.werkwijzen[state.mijnWerkwijze];
      var a = mijnAssistent();
      scherm.appendChild(el("p", "welkom-status", "Je plan staat klaar: werkwijze " + r.nr + ", " + r.naam + (a && !a.geenaccount ? ", met " + a.naam : "") + "."));
      var naarPlan = el("button", "knop knop-groot", "Bekijk jouw plan");
      naarPlan.type = "button";
      naarPlan.addEventListener("click", function () { naarTab("plan"); });
      rij.appendChild(naarPlan);
      var opnieuw = el("button", "knop knop-stil", "Doe de gids opnieuw");
      opnieuw.type = "button";
      opnieuw.addEventListener("click", herbegin);
      rij.appendChild(opnieuw);
    } else if (Object.keys(state.antwoorden).length) {
      scherm.appendChild(el("p", "welkom-status", "Je bent halverwege de gids."));
      var verder = el("button", "knop knop-groot", "Ga verder waar je zat");
      verder.type = "button";
      verder.addEventListener("click", function () { state.gestart = true; bewaar(); tekenGids(); });
      rij.appendChild(verder);
      var opnieuw2 = el("button", "knop knop-stil", "Begin opnieuw");
      opnieuw2.type = "button";
      opnieuw2.addEventListener("click", herbegin);
      rij.appendChild(opnieuw2);
    } else {
      var start = el("button", "knop knop-groot", "Start de gids");
      start.type = "button";
      start.addEventListener("click", function () { state.gestart = true; bewaar(); tekenGids(); });
      rij.appendChild(start);
      var duurtje = el("span", "welkom-duur", "een handvol vragen, klaar in twee minuten");
      rij.appendChild(duurtje);
    }
    scherm.appendChild(rij);

    var naslagLijn = el("p", "welkom-naslag");
    naslagLijn.appendChild(tn("Liever zelf rondkijken? "));
    var naarNaslag = el("button", "tekstknop", "Naar het naslagwerk");
    naarNaslag.type = "button";
    naarNaslag.addEventListener("click", function () { naarTab("naslag"); });
    naslagLijn.appendChild(naarNaslag);
    scherm.appendChild(naslagLijn);

    var kern = figuurBlok(D.figuren && D.figuren.kernidee, "figuur-breed");
    if (kern) scherm.appendChild(kern);

    /* de vier snelle winsten, als één rustige rij */
    var winstKop = el("p", "winstmini-kop", "Of spring meteen naar wat vandaag al loont:");
    scherm.appendChild(winstKop);
    var mini = el("div", "winstmini");
    D.snelwinst.forEach(function (w, i) {
      var knop = el("button", "winstmini-knop");
      knop.type = "button";
      knop.appendChild(el("span", "winstnr", String(i + 1)));
      knop.appendChild(tn(w.titel));
      knop.addEventListener("click", function () {
        if (w.valkuilen) naarTab("valkuilen");
        else openOnderwerp(w.onderwerp);
      });
      mini.appendChild(knop);
    });
    scherm.appendChild(mini);
    scherm.appendChild(waaromBlok());

    wizard.appendChild(scherm);
  }

  /* knop die altijd in beeld staat terwijl je de gids doorloopt; twee klikken, zodat
     een misklik je antwoorden niet wist */
  function herbeginKnop() {
    var knop = el("button", "tekstknop herbeginknop", "Begin opnieuw");
    knop.type = "button";
    knop.title = "Wis je antwoorden en begin de gids van vooraf aan";
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
      lijn.appendChild(el("b", null, m.label));
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
        geval.appendChild(el("b", "toolgeval-als", k.als));
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
      kaart.appendChild(el("p", "routepitch", b.advies));

      /* Blijf je in de browser, dan valt de route met een installatie weg, en
         ook de commandoregel die erin staat. Die ene code-regel is genoeg om
         iemand te doen denken dat deze site niet voor hem is. */
      var inBrowser = browserOnly();
      var routes = (b.routes || []).filter(function (r) {
        return !(inBrowser && r[2] === "installeren");
      });

      if (routes.length) {
        var rts = el("div", "bronroutes" + (routes.length === 1 ? " een" : ""));
        routes.forEach(function (r) {
          var krt = el("div", "bronroute");
          krt.appendChild(el("b", "bronroutekop", r[0]));
          var pp = el("p", "bronroutetekst");
          rijk(pp, r[1]);
          krt.appendChild(pp);
          rts.appendChild(krt);
        });
        kaart.appendChild(rts);
      }

      /* het woord markdown valt hier voor het eerst; uitleggen op de plek zelf */
      if (D.markdownUitleg && /markdown/i.test(routes.map(function (r) { return r[1]; }).join(" "))) {
        var md = el("p", "markdownuitleg", D.markdownUitleg);
        kaart.appendChild(md);
      }

      var letop = (inBrowser && b.letopBrowser) || b.letop;
      if (letop) {
        var lo = el("div", "advieslijn vragen letop");
        lo.appendChild(el("b", null, "Let op"));
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

      kaart.appendChild(el("h3", "bronmapkop", "Wat hier altijd geldt"));
      var tw = el("div", "tussenadvies");
      D.bronRegels.forEach(function (r) {
        var lijn = el("div", "advieslijn buiten");
        lijn.appendChild(el("b", null, r[0]));
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
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    var n = parseInt(e.key, 10);
    if (!n || n < 1 || n > 9) return;
    var knoppen = wizard.querySelectorAll(".optie");
    if (knoppen[n - 1]) { knoppen[n - 1].click(); e.preventDefault(); }
  });

  /* ---------------- jouw plan ---------------- */

  function tekenPlan() {
    var doel = document.getElementById("plan");
    leeg(doel);

    var nr = state.mijnWerkwijze;
    if (!nr || !D.werkwijzen[nr]) {
      doel.appendChild(el("h2", null, "Nog geen plan"));
      doel.appendChild(el("p", "noot", "Doorloop eerst de gids, dan verschijnt hier je plan op maat."));
      var rij0 = el("div", "knoppenrij");
      var naarGids = el("button", "knop", "Start de gids");
      naarGids.type = "button";
      naarGids.addEventListener("click", function () { state.gestart = true; bewaar(); naarTab("gids"); });
      rij0.appendChild(naarGids);
      doel.appendChild(rij0);
      return;
    }

    var r = D.werkwijzen[nr];
    var a = mijnAssistent();

    var kopwrap = el("div");
    kopwrap.appendChild(el("p", "vraagnr", "Jouw plan" + (a && !a.geenaccount ? " · met " + a.naam : "")));

    /* Het plan opent met wat jij wil doen, niet met de werkwijze waar je in
       terechtkwam. De werkwijze is het middel; dit is waarvoor je kwam. */
    var doelnu = mijnDoel();
    if (doelnu) {
      var dk = el("div", "doelkaart");
      dk.appendChild(el("h2", "doelkop", doelnu.planKop));
      dk.appendChild(el("p", "doelwat", doelnu.wat));
      if (doelnu.eerst) {
        var eerst = el("p", "doeleerst");
        eerst.appendChild(el("b", null, "Waar je vandaag begint: "));
        eerst.appendChild(tn(doelnu.eerst));
        dk.appendChild(eerst);
      }
      kopwrap.appendChild(dk);
    }

    var kaart = el("div", "routekaart");
    var kop = el("div", "routekop");
    kop.appendChild(el("span", "routeletter", "Werkwijze " + r.nr));
    kop.appendChild(el("h2", "routenaam", r.naam));
    kaart.appendChild(kop);
    kaart.appendChild(el("p", "routepitch", r.pitch));
    kaart.appendChild(el("p", "routeuitleg", r.uitleg));
    var ul = el("ul");
    r.punten.forEach(function (p) { ul.appendChild(el("li", null, p)); });
    kaart.appendChild(ul);
    if (r.slot) kaart.appendChild(el("p", "routeslot", r.slot));
    kopwrap.appendChild(kaart);
    doel.appendChild(kopwrap);

    /* de vier stappen om vandaag te beginnen, in de termen van jouw tool */
    doel.appendChild(el("h3", null, "Vandaag beginnen: vier stappen"));
    var strip = el("div", "winst");
    D.snelwinst.forEach(function (w, i) {
      var knop = el("button", "winstkaart");
      knop.type = "button";
      knop.appendChild(el("span", "winstnr", String(i + 1)));
      var tekst = el("span", "winsttekst");
      tekst.appendChild(el("b", null, w.titel));
      tekst.appendChild(el("span", null, w.tekst));
      if (w.waarom) tekst.appendChild(el("span", "winstwaarom", w.waarom));
      if (a && !w.valkuilen) {
        var detail = "";
        if (w.onderwerp === "contextmap") detail = "Bij " + a.naam + ": " + a.plek + ".";
        if (w.onderwerp === "regels") detail = "Bij " + a.naam + ": " + a.regels + ".";
        if (w.onderwerp === "skills") detail = "Bij " + a.naam + ": " + a.skill + ".";
        if (detail) tekst.appendChild(el("span", "winstdetail", detail));
      }
      knop.appendChild(tekst);
      knop.addEventListener("click", function () {
        if (w.valkuilen) naarTab("valkuilen");
        else openOnderwerp(w.onderwerp, nr);
      });
      strip.appendChild(knop);
    });
    doel.appendChild(strip);
    doel.appendChild(waaromBlok());

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
      var allePrompts = el("button", "tekstknop", "Alle prompts in het naslagwerk");
      allePrompts.type = "button";
      allePrompts.addEventListener("click", function () { naarVak("prompts"); });
      pblok.appendChild(allePrompts);
      doel.appendChild(pblok);
    }

    /* Losse prompts zeggen nog niet hoe een sessie verloopt. Wie nog nooit een
       gesprek voerde, heeft één doorlopend verhaal nodig, niet zes tips. */
    if (D.voorbeeldgesprek) {
      var sess = el("div", "sessiewijzer");
      sess.appendChild(el("b", null, D.voorbeeldgesprek.kop));
      sess.appendChild(el("p", null, "Nog nooit zo'n gesprek gevoerd? Dit is wat er letterlijk gebeurt, van je laptop openen tot een hoofdstuk waar je tevreden over bent."));
      var naarSessie = el("button", "knop knop-klein", "Lees de zes stappen");
      naarSessie.type = "button";
      naarSessie.addEventListener("click", function () { naarVak("eerstekeer"); });
      sess.appendChild(naarSessie);
      doel.appendChild(sess);
    }

    var blokjes = el("div", "blokjes");

    var b1 = el("div", "blokje");
    b1.appendChild(el("h3", null, "Zo zet je werkwijze " + r.nr + " op"));
    var ol = el("ol", "stappenlijst");
    r.stappen.forEach(function (t) { ol.appendChild(el("li", null, t)); });
    b1.appendChild(ol);
    b1.appendChild(el("h3", null, "Wat je installeert"));
    b1.appendChild(el("p", null, r.installeren));
    blokjes.appendChild(b1);

    var nots = notities();
    if (nots.length) {
      var b2 = el("div", "blokje");
      b2.appendChild(el("h3", null, "Uit jouw antwoorden"));
      var ul3 = el("ul");
      nots.forEach(function (t) { ul3.appendChild(el("li", null, t)); });
      b2.appendChild(ul3);
      blokjes.appendChild(b2);
    }

    if (a) {
      var b3 = el("div", "blokje");
      var binnenkaart = assistentKaart(a, "Bij " + a.naam + " heet dat");
      binnenkaart.classList.add("kaal");
      b3.appendChild(binnenkaart);
      b3.appendChild(el("p", "toolinmap", a.inmap));
      blokjes.appendChild(b3);
    }

    var wjd = wistjedatBlok(a, true);
    if (wjd) {
      var meer = el("button", "knop knop-klein", "Lees hoe dat werkt");
      meer.type = "button";
      meer.addEventListener("click", function () { naarVak("tool"); });
      wjd.appendChild(meer);
      blokjes.appendChild(wjd);
    }

    var lb = linkBlok(toolLinks(r.links), "Links bij deze werkwijze");
    if (lb) blokjes.appendChild(lb);

    doel.appendChild(blokjes);

    /* Een ladder, geen plafond: waar je naartoe kan als dit bevalt, met erbij
       wanneer dat de moeite is — en de geruststelling dat het nu niet hoeft. */
    if (r.volgendestap) {
      var v = r.volgendestap;
      var vs = el("section", "ladder");
      vs.appendChild(el("h3", null, "Als dit bevalt: de volgende stap"));
      vs.appendChild(el("p", "ladder-wanneer", v.wanneer));
      vs.appendChild(el("p", "ladder-wat", v.wat));
      if (v.nognietnodig) vs.appendChild(el("p", "noot", v.nognietnodig));
      var naarVolgende = el("button", "tekstknop", "Lees werkwijze " + v.naar + " →");
      naarVolgende.type = "button";
      naarVolgende.addEventListener("click", function () {
        naarTab("werkwijzen");
        tekenWerkwijzen(v.naar);
      });
      vs.appendChild(naarVolgende);
      doel.appendChild(vs);
    }

    var rij = el("div", "knoppenrij");

    var naarWw = el("button", "knop", "Lees alles over deze werkwijze");
    naarWw.type = "button";
    naarWw.addEventListener("click", function () { naarTab("werkwijzen"); tekenWerkwijzen(r.nr); });
    rij.appendChild(naarWw);

    var naarNaslag = el("button", "knop knop-stil", "Naar het naslagwerk");
    naarNaslag.type = "button";
    naarNaslag.addEventListener("click", function () { naarTab("naslag"); });
    rij.appendChild(naarNaslag);

    var opnieuw = el("button", "knop knop-stil", "Doe de gids opnieuw");
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
    kaart.appendChild(el("p", "routepitch", r.pitch));
    kaart.appendChild(el("p", "routeuitleg", r.uitleg));
    var ul = el("ul");
    r.punten.forEach(function (p) { ul.appendChild(el("li", null, p)); });
    kaart.appendChild(ul);
    if (r.slot) kaart.appendChild(el("p", "routeslot", r.slot));
    doel.appendChild(kaart);

    /* blokjes: installeren, eerst doen, jouw tool */
    var blokjes = el("div", "blokjes");

    var b1 = el("div", "blokje");
    b1.appendChild(el("h3", null, "Wat je installeert"));
    b1.appendChild(el("p", null, r.installeren));
    b1.appendChild(el("h3", null, "Wat je overslaat"));
    b1.appendChild(el("p", null, r.overslaan));
    blokjes.appendChild(b1);

    var b2 = el("div", "blokje");
    b2.appendChild(el("h3", null, "Wat je eerst doet"));
    var ol = el("ol", "stappenlijst");
    r.stappen.forEach(function (t) { ol.appendChild(el("li", null, t)); });
    b2.appendChild(ol);
    blokjes.appendChild(b2);

    var mijnTool = mijnAssistent();
    if (mijnTool) {
      var tkaart = el("div", "blokje");
      var binnenkaart = assistentKaart(mijnTool, "Bij " + mijnTool.naam);
      binnenkaart.classList.add("kaal");
      tkaart.appendChild(binnenkaart);
      tkaart.appendChild(el("p", "toolinmap", mijnTool.inmap));
      blokjes.appendChild(tkaart);
    }

    var lb = linkBlok(toolLinks(r.links), "Links bij deze werkwijze");
    if (lb) blokjes.appendChild(lb);

    doel.appendChild(blokjes);

    /* de vijf onderwerpen, vertaald naar deze werkwijze */
    doel.appendChild(el("h3", "blokkenkop", "De vijf onderwerpen bij werkwijze " + r.nr));
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
    var naarHulp = el("button", "knop knop-stil", state.mijnWerkwijze ? "Doe de gids opnieuw" : "Twijfel je? Doe de gids");
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

  function tekenToolkiezer() {
    document.getElementById("assistent-noot").textContent = D.assistentNoot;

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
    inmap.appendChild(tn(gekozen.inmap));
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
        zoek: T([r.naam, r.pitch, r.uitleg, r.voorwie, r.punten.join(" "), r.stappen.join(" "), r.overslaan].join(" ")),
        waar: "Werkwijze",
        doe: function () { naarTab("werkwijzen"); tekenWerkwijzen(n); }
      });
    });

    D.assistenten.forEach(function (a) {
      ix.push({
        titel: a.naam,
        tekst: "Je contextmap: " + a.plek + ". Je regels: " + a.regels + ".",
        zoek: [a.naam, a.kort, a.plek, a.regels, a.skill, a.inmap, a.waar, a.betaald,
          a.wistjedat ? [a.wistjedat.kop, (a.wistjedat.tekst || []).join(" "), a.wistjedat.slot].join(" ") : ""].join(" "),
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
          naarTab("valkuilen");
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
        tekst: staart.length ? v.wat + " — " + staart.join(" · ") : v.wat,
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
      var hooi = (item.titel + " " + item.zoek).toLowerCase();
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
      kaart.appendChild(el("span", "treffertekst", item.tekst));
      doel.appendChild(kaart);
    });

    if (treffers.length > 24) {
      doel.appendChild(el("p", "noot", "Er staan er nog " + (treffers.length - 24) + " onder. Typ een woord bij."));
    }
  }

  /* ---------------- naslag: de hub en de zes vakken ---------------- */

  /* Het naslagwerk is een hub met zeven deuren. Je ziet altijd maar een vak
     tegelijk, zodat de pagina niet uitgroeit tot een muur tekst. */
  var AFDELINGEN = [
    {
      vak: "eerstekeer",
      titel: "Je eerste sessie, stap voor stap",
      kort: "Eén doorlopend verhaal: wat je typt, wat je terugkrijgt en waar je op let. Begin hier als je nog nooit met AI werkte.",
      tel: function () { return D.voorbeeldgesprek.stappen.length + " stappen"; }
    },
    {
      vak: "onderwerpen",
      titel: "De onderwerpen",
      kort: "Platte tekst, de contextmap, je eigen regels, skills en lesmateriaal. Dit is de kern.",
      tel: function () { return D.onderwerpen.length + " onderwerpen"; }
    },
    {
      tab: "werkwijzen",
      titel: "De vier werkwijzen",
      kort: "Waar je bestanden staan en wie ze aanraakt: van een chatvenster tot een map op je laptop.",
      tel: function () { return "4 werkwijzen"; }
    },
    {
      vak: "prompts",
      titel: "Prompts om te plakken",
      kort: "Vragen die je letterlijk kan overnemen. Ze werken in elk chatvenster.",
      tel: function () { return D.prompts.length + " prompts"; }
    },
    {
      vak: "tool",
      titel: "Met welke AI werk je?",
      kort: "Hoe je contextmap, je regels en je skills bij jouw tool heten, en waar ze staan.",
      tel: function () { return D.assistenten.length + " tools"; }
    },
    {
      vak: "uitkomst",
      titel: "Wat moet eruit komen?",
      kort: "Word, PowerPoint, leerplatform of pdf: wat je vraagt hangt af van wat je moet aanleveren.",
      tel: function () { return D.outputs.length + " formaten"; }
    },
    {
      vak: "gereedschap",
      titel: "Gereedschap en links",
      kort: "Programma's op volgorde van drempel, en alle links die op deze site staan.",
      tel: function () { return D.gereedschap.length + " programma's"; }
    },
    {
      vak: "randgevallen",
      titel: "Bij mij ligt dat anders",
      kort: "Je deelt het vak, je cursus zit vol formules, je directie wil er niets van weten.",
      tel: function () { return D.randgevallen.length + " situaties"; }
    }
  ];

  var VAKKEN = AFDELINGEN.filter(function (a) { return a.vak; }).map(function (a) { return a.vak; });

  var huidigVak = "";

  function tekenNaslagHub() {
    var hub = document.getElementById("naslaghub");
    leeg(hub);
    AFDELINGEN.forEach(function (a) {
      var knop = el("button", "hubkaart");
      knop.type = "button";
      knop.appendChild(el("b", null, a.titel));
      knop.appendChild(el("span", "hubkort", a.kort));
      knop.appendChild(el("span", "hubtel", a.tel()));
      knop.addEventListener("click", function () {
        if (a.tab) naarTab(a.tab);
        else naarVak(a.vak);
      });
      hub.appendChild(knop);
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

    advies.appendChild(el("h3", null, gekozen.label));
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

  /* ---------------- tab: valkuilen ---------------- */

  function tekenValkuilen(filter) {
    var lijst = document.getElementById("probleemlijst");
    var geen = document.getElementById("geen-treffer");
    leeg(lijst);
    var f = (filter || "").toLowerCase().trim();
    var treffers = 0;

    D.valkuilen.forEach(function (p) {
      var o = onderwerpBij(p.onderwerp);
      var hooi = (p.klacht + " " + p.fix + " " + (o ? o.titel : "")).toLowerCase();
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
      var plinks = toolLinks(p.links);
      if (plinks.length) {
        var links = el("div", "linkjes");
        plinks.forEach(function (id) {
          var k = linkKaart(id);
          if (k) links.appendChild(k);
        });
        binnen.appendChild(links);
      }
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

  /* Eén sessie van begin tot eind. Per stap vier dingen: wat je doet, wat je
     typt, wat je terugkrijgt en waar je op let. Die laatste twee kolommen zijn
     waar het om gaat: zonder die is het weer een lijstje tips. */
  function tekenSessie() {
    var g = D.voorbeeldgesprek;
    if (!g) return;
    document.getElementById("sessie-kop").textContent = g.kop;
    document.getElementById("sessie-intro").textContent = g.intro;

    var doel = document.getElementById("sessie-inhoud");
    leeg(doel);

    if (g.situatie) {
      var sit = el("div", "advieslijn buiten sessiesituatie");
      sit.appendChild(el("b", null, "Waarmee je begint"));
      rijk(sit, g.situatie);
      doel.appendChild(sit);
    }
    if (g.duur) doel.appendChild(el("p", "sessieduur", g.duur));

    var lijst = el("ol", "sessielijst");
    g.stappen.forEach(function (s) {
      var li = el("li", "sessiestap");
      li.appendChild(el("b", "sessiestapkop", T(s.kop)));
      [["Wat je doet", s.jij, "jij"], ["Wat je terugkrijgt", s.terug, "terug"], ["Waar je op let", s.let, "let"]]
        .forEach(function (r) {
          if (!r[1]) return;
          var regel = el("div", "sessieregel sessie-" + r[2]);
          regel.appendChild(el("b", null, r[0]));
          rijk(regel, r[1]);
          li.appendChild(regel);
        });
      lijst.appendChild(li);
    });
    doel.appendChild(lijst);

    if (g.valkuil) {
      var vk = el("div", "advieslijn vragen letop");
      vk.appendChild(el("b", null, "De fout die iedereen maakt"));
      rijk(vk, g.valkuil);
      doel.appendChild(vk);
    }
    if (g.slot) doel.appendChild(el("p", "sessieslot", g.slot));
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
      d.appendChild(el("b", null, r.geval));
      d.appendChild(el("span", null, r.wat));
      wrap.appendChild(d);
    });
  }

  /* ---------------- tab: voorbeelden ---------------- */

  function tekenVoorbeelden() {
    document.getElementById("voorbeelden-noot").textContent = D.voorbeeldenNoot;
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
    var geldig = ["gids", "plan", "werkwijzen", "naslag", "valkuilen", "voorbeelden"];
    if (start === "plan" && !state.mijnWerkwijze) start = "gids";
    naarTab(geldig.indexOf(start) >= 0 ? start : "gids", stukken[1]);
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
  tekenRandgevallen();
  tekenVoorbeelden();

  document.getElementById("zoek").addEventListener("input", function (e) {
    tekenValkuilen(e.target.value);
  });

  document.getElementById("zoekalles").addEventListener("input", function (e) {
    zoekAlles(e.target.value);
  });

})();
