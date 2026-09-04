/* Alle inhoud van de site. Wie de tekst wil wijzigen, wijzigt ze hier.
   Structuur: de rode draad en het waarom, keuzehulpvragen, werkwijzen,
   onderwerpen (het naslagwerk), valkuilen, prompts, gereedschap, voorbeelden
   en links. */

window.DATA = {

  /* ---------- De rode draad van de hele site ---------- */
  rodedraad: "Alles wat je een tweede keer tegen de AI moet zeggen, hoort in een bestand.",

  /* ---------- De tekeningen die niet bij een onderwerp horen ---------- */
  figuren: {
    kernidee: {
      bestand: "assets/kernidee.png",
      alt: "Tekening. Binnen een kader met het opschrift “je vaste plek: een map of een project” staan twee vakken onder elkaar: je contextmap met vijf documenten, en je afsprakendocument met wie je publiek is, hoe je klinkt en wat je niet wil zien. Pijlen lopen van die twee naar drie gesprekken rechts: een oefening vragen, een uitleg herschrijven, slides bij een hoofdstuk.",
      bijschrift: "Twee dingen op één plek, en ze gelden voor elk gesprek dat je daar voert."
    },
    werkwijzen: {
      bestand: "assets/vierwerkwijzen.png",
      alt: "Tekening. De vier werkwijzen naast elkaar. Per werkwijze staat waar je bestanden staan, wie erin schrijft en wat je installeert. Bij 1 en 2 schrijf jij, bij 3 en 4 de AI. Werkwijze 1 is aangeduid.",
      bijschrift: "Bij 1 en 2 hou je je bestanden zelf vast, bij 3 en 4 laat je de AI erin schrijven. De meeste lesgevers blijven bij 1."
    }
  },

  /* ---------- Waarom je dit doet: de winst achter de vier stappen ---------- */
  waaromKop: "Waarom je dit doet",
  waaromNoot: "*Dit is het saaie stuk:* je afspraken en je materiaal één keer op orde zetten, voor je iets vraagt. Wat je ervoor terugkrijgt:",
  waarom: [
    {
      kop: "Je herhaalt jezelf niet meer.",
      tekst: "Wat één keer opgeschreven staat, hoef je niet in elk nieuw gesprek opnieuw uit te leggen. Anders begin je elke keer weer bij wie je studenten zijn en wat ze al kennen."
    },
    {
      kop: "Het werkt ook op een gratis of goedkoop account.",
      tekst: "Wat je meegeeft weegt zwaarder dan wat je betaalt. Wie zijn materiaal en zijn afspraken klaar heeft staan, moet minder vaak iets overdoen, en loopt dus veel later tegen zijn limiet aan."
    },
    {
      kop: "Je hoofdstukken klinken hetzelfde.",
      tekst: "Ook die van maart, en die van na de kerstvakantie. Zonder vaste afspraken schrijft elk gesprek net iets anders."
    },
    {
      kop: "Het blijft achter.",
      tekst: "Je werk zit in bestanden, niet in een chatvenster dat je volgend jaar niet meer terugvindt. Een collega die je vak overneemt, kan ermee verder."
    },
    {
      kop: "Je zit niet vast aan één tool.",
      tekst: "Je afspraken en je materiaal zijn gewone tekstbestanden. Stapt je school over op een andere AI, dan verhuis je je map en niet je hele werkwijze."
    },
    {
      kop: "Je maakt een fout maar één keer.",
      tekst: "Wat je corrigeert, schrijf je erbij. De volgende keer komt ze er niet meer uit. Zo wordt het beter naarmate je het langer gebruikt."
    },
    {
      kop: "Je kan tonen hoe het gemaakt is.",
      tekst: "Vraagt iemand wat je aan de AI gaf en welke afspraken golden, dan wijs je gewoon je map aan."
    }
  ],

  /* ---------- Snel resultaat: de vier dingen die meteen lonen ---------- */
  snelwinst: [
    {
      onderwerp: "contextmap",
      titel: "Maak een contextmap",
      tekst: "Een handvol documenten die samen beschrijven waar je cursus over gaat. Dit bepaalt het resultaat meer dan hoe je de vraag stelt.",
      waarom: "Zodat je niet bij elk gesprek opnieuw moet uitleggen waar je vak over gaat, en een gewoon account al ver genoeg komt."
    },
    {
      onderwerp: "regels",
      titel: "Zet je regels in een bestand",
      tekst: "Je eigen afspraken (toon, structuur, wat niet mag) op één vaste plek, zodat je ze niet telkens opnieuw hoeft te typen. Bij jou: {regelsplek}.",
      waarom: "Zodat al je hoofdstukken op elkaar lijken, ook die je pas over drie maanden schrijft."
    },
    {
      onderwerp: "skills",
      titel: "Maak skills voor terugkerende taken",
      tekst: "Een apart document per soort taak: figuren maken, oefeningen opstellen, slides bouwen. Je schrijft het één keer en haalt het erbij wanneer die taak langskomt.",
      waarom: "Zodat een taak die terugkeert, de tweede keer een kwestie van één zin is."
    },
    {
      valkuilen: true,
      titel: "Ken de valkuilen",
      tekst: "De meest voorkomende fouten bij AI in cursusontwikkeling, en de stap die je telkens kan zetten om ze te vermijden.",
      waarom: "Zodat je de fouten die iedereen maakt, niet zelf hoeft te ontdekken."
    }
  ],

  /* ---------- Vraag: wat wil je met je cursus doen ----------
     De eerste vraag van de gids, en de enige die naar jouw plan vraagt in plaats
     van naar je omstandigheden. Het antwoord opent het plan met jouw eigen zin
     en kiest welke prompts je meekrijgt (de id's uit "prompts"). */
  doelNoot: "Kies wat het dichtst in de buurt komt. Dit bepaalt niet wat je later nog kan; het bepaalt waar we je laten beginnen.",
  doel: [
    {
      id: "opfrissen",
      label: "mijn bestaande cursus opfrissen en herwerken",
      hulp: "de tekst staat er al, en je wil hem beter",
      planKop: "Je bestaande cursus opfrissen",
      wat: "Begin bij één hoofdstuk: dat waar je zelf het minst tevreden over bent, want daar zie je het verschil. Dat zet je om, je legt je afspraken ernaast, en pas dan laat je herwerken.",
      eerst: "Kies vandaag één hoofdstuk. Niet de hele cursus: één.",
      prompts: ["omzetten", "contextmap-beoordelen", "stem"]
    },
    {
      id: "uitbreiden",
      label: "er nieuwe hoofdstukken bij schrijven",
      hulp: "wat er is blijft staan, er moet iets bij",
      planKop: "Nieuwe hoofdstukken erbij schrijven",
      wat: "Wat je al geschreven hebt is je beste materiaal: het zegt hoe jij schrijft en op welk niveau je zit. Zet twee bestaande hoofdstukken klaar voor je om een nieuw hoofdstuk vraagt, anders krijg je een hoofdstuk uit een ander boek terug.",
      eerst: "Zet je twee beste bestaande hoofdstukken klaar, met je vakbeschrijving erbij.",
      prompts: ["contextmap-beoordelen", "stem", "omzetten"]
    },
    {
      id: "oefeningen",
      label: "oefeningen, toetsen en examenvragen maken",
      hulp: "de cursus is er, het oefenmateriaal niet",
      planKop: "Oefeningen en toetsen bij je cursus",
      wat: "Hier loont een contextmap het snelst: met je hoofdstuk en je beginsituatie erbij klopt het niveau meteen. Zonder die twee krijg je vragen die te makkelijk zijn of over het vak in het algemeen gaan.",
      eerst: "Zet het hoofdstuk en je beginsituatie (wat kennen ze al) bij elkaar op één plek.",
      prompts: ["omzetten", "oefeningen", "contextmap-beoordelen"]
    },
    {
      id: "lesmateriaal",
      label: "slides en lesmateriaal uit mijn cursustekst halen",
      hulp: "de tekst is er, de slides lopen achter",
      planKop: "Slides en lesmateriaal uit je cursustekst",
      wat: "Slides maken lukt wel. Ze *gelijk houden* met je tekst is het probleem dat elk jaar terugkomt, en daar bestaat één afspraak voor die je één keer opschrijft.",
      eerst: "Neem het hoofdstuk waarvan je nu al weet dat de slides niet meer kloppen.",
      prompts: ["omzetten", "slides-sync", "oefeningen"]
    },
    {
      id: "nieuw",
      label: "een cursus die er nog niet is, van nul beginnen",
      hulp: "je begint met een leeg blad",
      planKop: "Een nieuwe cursus opzetten",
      wat: "Vraag niet om hoofdstuk 1. Begin bij de inhoudsopgave: hoofdstukken, met per hoofdstuk wat de student erna kan. Dat blad keur jij goed of niet, en het bepaalt al de rest.",
      eerst: "Verzamel wat er wél is: je vakbeschrijving, de vakken ervoor en erna, het handboek dat je volgt.",
      prompts: ["contextmap-beoordelen", "stem", "oefeningen"]
    }
  ],

  /* ---------- Vraag: mag dit materiaal naar een AI-dienst ---------- */
  materiaal: [
    {
      id: "studenten",
      label: "werk van studenten of leerlingen met hun naam erin",
      vlag: "buiten",
      advies: "Laat het buiten. Altijd. Ook geanonimiseerd zit je nog met de inhoud."
    },
    {
      id: "collega",
      label: "materiaal van een collega, of een vak dat je deelt",
      vlag: "vragen",
      advies: "Eerst vragen, en zeg erbij wat je ermee gaat doen."
    },
    {
      id: "handboek",
      label: "gescande hoofdstukken uit een handboek",
      vlag: "buiten",
      advies: "Laat je buiten. Je eigen slides en nota's erover zijn wel van jou, en die mogen mee."
    },
    {
      id: "examens",
      label: "examenvragen die nog in gebruik zijn",
      vlag: "afweging",
      advies: "Jouw afweging. Nieuwe vragen laten genereren is een andere vraag dan de oude opladen."
    },
    {
      id: "eigen",
      label: "niks van dit alles, alles is van mij",
      vlag: "ok",
      alleen: true,
      advies: "Dan valt er niks af. Wat overblijft na dit filter is bijna altijd nog genoeg: je contextmap heeft maar een handvol documenten nodig."
    }
  ],
  materiaalNoot: "Veel scholen hebben nog geen afspraken over cursusmateriaal in een AI-account. Vraag na wat er bij jou geldt; deze vier gevallen komen overal terug. Vink aan wat van toepassing is.",

  /* ---------- Vraag: waar staat je cursus nu ----------
     Per geval twee routes: een die niks vraagt, en een met Quarto of pandoc.
     Een route met "installeren" als derde element valt weg voor wie in de browser
     blijft; "letopBrowser" vervangt dan "letop", want dat gaat soms over pandoc.
     "letop" is telkens wat er stilletjes sneuvelt. */

  /* Het woord markdown valt hier voor het eerst. Wie nooit met AI werkte, is het
     nog nooit tegengekomen, dus staat de uitleg op de plek zelf en niet drie
     kaarten verderop. */
  markdownUitleg: "Markdown is gewone tekst met een paar tekens erin: een # voor een titel, sterretjes voor vet. Meer is het niet. Het opent in Kladblok, elke AI-tool kent het, en er komt later met één stap weer een Word-bestand of een pdf uit.",

  bron: [
    {
      id: "word",
      label: "Word-bestanden (.docx)",
      advies: "De makkelijkste start: Word is het enige veelgebruikte formaat dat netjes omzet. Doe het per hoofdstuk, en kijk de omzetting na voor je iets laat herwerken.",
      routes: [
        ["Zonder iets te installeren", "Laad één hoofdstuk op en vraag: geef dit terug als markdown, letterlijk, zonder iets te herschrijven. Of open het in Google Docs en kies Bestand → Downloaden → Markdown."],
        ["Met pandoc", "`pandoc hoofdstuk.docx -o hoofdstuk.md --wrap=none --extract-media=media`", "installeren"]
      ],
      letop: "Twee dingen die je hier best niet vergeet. Heb je je titels vet gemaakt in plaats van als “Kop 1” opgemaakt, dan komen er geen titels uit en krijg je één lange lap tekst: zet die stijlen eerst juist in Word. En je afbeeldingen belanden in de map `media` met namen als `rId10.png`, dus hernoem ze meteen.",
      letopBrowser: "Eén ding dat je hier best niet vergeet. Heb je je titels vet gemaakt in plaats van als “Kop 1” opgemaakt, dan komen er geen titels uit en krijg je één lange lap tekst. Zet die stijlen eerst juist in Word, en zet dan pas om.",
      links: ["pandoc", "quarto-docx", "gdocs"]
    },
    {
      id: "ppt",
      label: "alleen PowerPoint (.pptx)",
      advies: "In je slides staan trefwoorden, de lopende tekst zit in je notities of in je hoofd. Haal die twee apart op: de slides geven je de structuur, de notities de tekst.",
      routes: [
        ["Zonder iets te installeren", "Exporteren → Hand-outs maken → in Word. Je krijgt je slides met de notities ernaast in een tabel. Dat is de gewone export die je notities wél meeneemt."],
        ["Met pandoc", "`pandoc les.pptx -o les.md` pakt ook de losse tekstvakken en je tabellen mee. Je hebt er wel pandoc 3.8.3 of nieuwer voor nodig; oudere versies kunnen pptx helemaal niet lezen.", "installeren"]
      ],
      letop: "Opslaan als → Overzicht/RTF bestaat en werkt, maar neemt alleen de tekst mee die in de tekstvakken van de dia-indeling staat. Wat je zelf als los tekstvak op een dia zette, plus je tabellen, SmartArt en al je notities, blijft achter zonder dat je een waarschuwing krijgt. Prima als je slides netjes in de indeling zijn opgebouwd, riskant bij slides die door de jaren heen bij elkaar gegroeid zijn. Ook pandoc laat je notities vallen: wil je die mee, ga dan via Hand-outs maken, en kijk na of ze er staan.",
      letopBrowser: "Opslaan als → Overzicht/RTF bestaat en werkt, maar neemt alleen de tekst mee die in de tekstvakken van de dia-indeling staat. Wat je zelf als los tekstvak op een dia zette, plus je tabellen, SmartArt en al je notities, blijft achter zonder dat je een waarschuwing krijgt. Ga daarom via Hand-outs maken, en kijk na of je notities er echt bij staan.",
      links: ["pandoc", "quarto-pptx"]
    },
    {
      id: "pdf-tekst",
      label: "pdf waar je tekst in kan selecteren",
      advies: "Zoek eerst het Word- of LaTeX-bestand waar die pdf uit gemaakt is. Een pdf is een eindformaat: hij bewaart hoe de bladzijde er *uitziet*, niet hoe ze in elkaar zit.",
      routes: [
        ["Zonder iets te installeren", "Open de pdf gewoon in Word (Bestand → Openen). Word maakt er een bewerkbaar document van; bewaar dat als .docx en volg dan het Word-advies. Of laad de pdf op in je project en vraag het hoofdstuk terug als markdown."],
        ["Met pandoc", "Werkt hier niet: pandoc kan pdf wel maken, maar niet lezen. Ga eerst langs Word of langs je AI-tool.", "installeren"]
      ],
      letop: "Kolommen, kaderteksten, kop- en voetteksten komen door elkaar te staan, en formules en tabellen sneuvelen het eerst. Kijk de omzetting na met de pdf ernaast, hoofdstuk per hoofdstuk.",
      links: ["pandoc"]
    },
    {
      id: "pdf-scan",
      label: "pdf of scan waar je geen tekst in kan selecteren",
      advies: "Hier moet eerst tekstherkenning overheen. Reken op nalezen, want de fouten die daaruit komen zien eruit als gewone tekst.",
      routes: [
        ["Zonder iets te installeren", "AI-tools lezen gescande bladzijden verrassend goed, want ze zien de pagina als afbeelding. Laad een handvol bladzijden per keer op, niet het hele boek, en vraag de tekst letterlijk terug."],
        ["Met een tekstherkenner", "Word en Adobe Acrobat doen tekstherkenning op een scan. Je krijgt er een bewerkbaar bestand uit, en dan volg je het Word-advies."]
      ],
      letop: "Cijfers, formules en tabellen zijn precies waar tekstherkenning fout gaat, en dat zie je niet aan het resultaat: er staat gewoon een ander getal. Leg de scan ernaast bij het nalezen. Scan je materiaal van iemand anders in, kijk dan eerst het materiaalfilter na.",
      links: []
    },
    {
      id: "leerplatform",
      label: "in het leerplatform, geen bronbestand meer",
      advies: "Exporteer per pagina, en test meteen hoe je het er terug in krijgt. Die weg terug is de stap die achteraf tegenvalt, niet het eruit halen.",
      routes: [
        ["Zonder iets te installeren", "Bewaar de pagina als webpagina (Ctrl+S) of kopieer ze naar Word. Kijk ook of je leerplatform zelf een exportknop heeft: veel platformen kunnen een heel vak in één keer uitvoeren."],
        ["Met pandoc", "`pandoc pagina.html -o pagina.md`. Uit html komt de nettere markdown van de twee, want de koppen en lijsten zitten er al in.", "installeren"]
      ],
      letop: "Doe eerst één pagina helemaal rond: eruit, omzetten, herwerken, en er weer in. Pas als dat rondje werkt, begin je aan de andere twintig.",
      links: ["pandoc"]
    },
    {
      id: "verspreid",
      label: "verspreid over jaren en versies",
      advies: "Kies één versie als de echte voor je iets oplaadt. Welke dat is, weet alleen jij, en dit is de enige stap hier waar de AI je niet bij helpt.",
      routes: [
        ["Zonder iets te installeren", "Maak een map met de gekozen versie erin, en zet al de rest in een map “oud” die je verder met rust laat. Twijfel je tussen twee versies, neem dan de recentste en noteer in je contextmap wat er in de oude beter was."],
        ["Met versiebeheer", "Zet de gekozen versie in git voor je begint. Dan is elke wijziging die daarna komt zichtbaar en terug te draaien.", "installeren"]
      ],
      letop: "Twee versies samen opladen geeft een mengsel waar jij achteraf niks meer in herkent, en je merkt het pas bij het nalezen.",
      links: ["git"]
    },
    {
      id: "collega-weg",
      label: "bij een collega die weg is",
      advies: "Wat je vindt, is je bron. Je gaat het toch herwerken, dus je hoeft niet te wachten tot je alles compleet hebt.",
      routes: [
        ["Eerst dit", "Zet in je contextmap wat jij aan die cursus wil veranderen, en waarom. Zonder dat krijg je een nettere versie van andermans cursus terug in plaats van die van jou."],
        ["Dan pas", "Zet het materiaal om volgens het formaat waarin je het gevonden hebt: Word, PowerPoint of pdf, zoals hierboven."]
      ],
      letop: "Materiaal van een collega opladen is niet vanzelfsprekend, ook niet als die collega weg is. Vraag na wat de afspraken op je school zijn.",
      links: []
    },
    {
      id: "niks",
      label: "er is nog niks",
      advies: "Dan begin je bij wat er wél is: de vakbeschrijving of ECTS-fiche, de vakken ervoor en erna, het handboek dat je volgt, en je aantekeningen van vorig jaar.",
      routes: [
        ["Eerst dit", "Zet die documenten samen in je contextmap en laat er een inhoudsopgave uit maken: hoofdstukken, met per hoofdstuk wat de student erna kan. Dat blad keur jij goed of niet, en het is nog geen cursus."],
        ["Dan pas", "Maak per goedgekeurd hoofdstuk een bestand aan, en schrijf ze één voor één."]
      ],
      letop: "De verleiding is om meteen om hoofdstuk 1 te vragen. Doe eerst die inhoudsopgave. Ze past op één blad en ze bepaalt al de rest.",
      links: []
    }
  ],
  bronRegels: [
    ["Eerst omzetten, dan pas herwerken.", "Twee aparte vragen, in die volgorde. Vraag je ze tegelijk, dan weet je achteraf niet welke wijziging van de AI komt en welke van de omzetting."],
    ["Begin bij één hoofdstuk.", "Neem het hoofdstuk waar je zelf het minst tevreden over bent, want daar zie je het verschil. Een hele cursus in één keer levert een stapel tekst op die je alsnog woord voor woord moet nalezen."],
    ["Gooi je origineel niet weg.", "Hou je .docx of .pptx bij tot je hoofdstuk af is. Een omzetting die tegenvalt is dan een kwestie van opnieuw beginnen, niet van herschrijven."]
  ],

  /* ---------- Hoe je je bestanden zet: per hoofdstuk, in één map ---------- */
  bronMap: {
    kop: "Zet je cursus per hoofdstuk klaar",
    kern: "Eén bestand per hoofdstuk, in één map. Dat is de vorm waar al de rest op steunt: je contextmap, je afspraken, en elke vraag die je later stelt.",
    boom: [
      "mijn-cursus/",
      "  content/            ← je cursus zelf, één bestand per hoofdstuk",
      "    01-inleiding.md",
      "    02-normalisatie.md",
      "    03-queries.md",
      "  media/              ← je figuren, met een verwijzing in de tekst",
      "    02-tijdlijn.png",
      "  context/            ← wat óver je cursus gaat, niet je cursus",
      "    vakbeschrijving.md",
      "    beginsituatie.md",
      "  afspraken.md        ← je regels: toon, structuur, wat niet mag"
    ],
    regels: [
      ["Eén bestand per hoofdstuk.", "Een hoofdstuk past in één keer. Een hele cursus in één bestand komt er half doorgelezen weer uit, en je ziet niet welk stuk overgeslagen is."],
      ["Nummer je bestanden: 01-, 02-, 03-.", "Dan staat de volgorde vast, ook als je map alfabetisch sorteert, en kan je naar “hoofdstuk 02” verwijzen zonder uit te leggen welk bestand je bedoelt."],
      ["Hou je cursus en je context uit elkaar.", "In content staat wat de student leest. In context staat wat de AI moet weten om te kunnen helpen: je vakbeschrijving, je beginsituatie, de feedback van vorig jaar. Door elkaar gezet belandt je vakbeschrijving vroeg of laat in je cursustekst."],
      ["Werk je alleen in de browser?", "Dan is “de map” gewoon {projectplek}. Hetzelfde principe: één document per hoofdstuk, en je afspraken apart. Hoe de mappen heten doet er dan minder toe dan dat je die twee uit elkaar houdt."]
    ],
    noot: "Deze indeling is een voorstel, geen voorschrift. Wat telt is dat een hoofdstuk een eigen bestand is, en dat je cursus en je context niet door elkaar staan.",

    /* Wie in de browser blijft, heeft geen mappen op zijn schijf en dus ook geen
       boom nodig. Hetzelfde principe, in de woorden van zijn eigen tool. */
    browser: {
      kop: "Zet je cursus per hoofdstuk klaar",
      kern: "Eén document per hoofdstuk, samen op één plek: {projectplek}. Dat is de vorm waar al de rest op steunt: je contextmap, je afspraken, en elke vraag die je later stelt.",
      regels: [
        ["Eén document per hoofdstuk.", "Een hoofdstuk past in één keer. Een hele cursus in één document komt er half doorgelezen weer uit, en je ziet niet welk stuk overgeslagen is."],
        ["Nummer je documenten: 01-, 02-, 03-.", "Dan staat de volgorde vast, en kan je vragen naar “hoofdstuk 02” zonder uit te leggen welk document je bedoelt."],
        ["Hou je cursus en je context uit elkaar.", "Je cursus is wat de student leest. Je context is wat de AI moet weten om te kunnen helpen: je vakbeschrijving, je beginsituatie, de feedback van vorig jaar. Zet dat laatste soort in aparte documenten met een duidelijke naam, anders belandt je vakbeschrijving vroeg of laat in je cursustekst."]
      ],
      noot: "Je hoeft hier niets voor te installeren en geen mappen op je schijf te maken. Je documenten opladen en ze een duidelijke naam geven volstaat."
    }
  },

  /* ---------- De vier werkwijzen ---------- */
  werkwijzen: {
    "1": {
      nr: "1",
      naam: "Alles in de browser",
      pitch: "Je laadt je documenten op in {projectplek}, je vraagt je tekst in markdown, en je plakt het resultaat terug in Word.",
      uitleg: "De omzetting op het einde laat je aan de AI zelf, of je importeert je markdown in Google Docs, dat in beide richtingen werkt.",
      punten: [
        "je regels staan in {regelsplek}, en een kopie bewaar je bij je cursusbestanden",
        "een skill is hier “het document dat ik erbij haal als ik figuren maak”",
        "wat je hier mist: versiebeheer, en de zekerheid dat je huisstijl klopt"
      ],
      slot: "Werkwijze 2, 3 en 4 zetten hier bovenop. Ze vervangen niks van wat je hier doet.",
      installeren: "niks",
      voorwie: "de meeste lesgevers, en iedereen met een laptop waar je niks op mag installeren",
      stappen: [
        "Zet een handvol documenten bij elkaar in {projectplek}. Dat is je contextmap.",
        "Vraag een hoofdstuk in markdown, zonder iets te laten herwerken. Kijk die omzetting na.",
        "Schrijf drie regels op die je al drie keer hebt moeten zeggen, en zet ze in {regelsplek}. Hou er ook een kopie van bij je cursusbestanden: die neem je mee naar elke tool."
      ],
      volgendestap: {
        naar: "2",
        wanneer: "Als het heen en weer plakken begint te wegen, of als je in het sjabloon van je school moet aanleveren.",
        wat: "Werkwijze 2 is dezelfde werkwijze met één installatie erbij. Uit hetzelfde bestand rolt dan een Word-document in het sjabloon van je school, en met Quarto erbij ook een pdf of slides. Je bestanden blijven van jou, de AI schrijft er nog altijd niet in.",
        nognietnodig: "Niet nu. Doe eerst één hoofdstuk helemaal rond in de browser. Pas als je dat twee of drie keer gedaan hebt, weet je waar je hier iets tekortkomt."
      },
      overslaan: "Alles over installaties, versiebeheer en een AI die zelf in je bestanden schrijft, hoort bij werkwijze 2 tot 4. Dat heb je hier niet nodig.",
      onderwerpen: {
        "plat": "Vraag je tekst in markdown en plak terug in Word. De omzetting op het einde laat je aan de AI, of je gaat via Google Docs.",
        "contextmap": "Je documenten zet je op één plek: {projectplek}. Zo hoef je ze niet elk gesprek opnieuw bij elkaar te zoeken.",
        "regels": "Je regels staan in {regelsplek}. Hou er een kopie van bij je cursusbestanden, dan neem je ze mee naar de tool die je later kiest.",
        "skills": "Een skill is hier {skillplek}, voor als je aan figuren begint.",
        "lesmateriaal": "Slides en oefeningen vraag je op dezelfde plek, met je contextmap erbij. De opmaak doe je in PowerPoint zelf."
      },
      links: ["gdocs", "mermaid-live", "excalidraw", "claude-projects"]
    },
    "2": {
      nr: "2",
      naam: "Browser plus één installatie",
      pitch: "Zelfde als werkwijze 1, met één installatie erbij.",
      uitleg: "Wat je installeert hangt af van wat er uit moet komen. Voor een Word-document in het sjabloon van je school volstaat pandoc. Wil je er ook een pdf, slides of een webpagina uit, dan neem je Quarto: pandoc zit erin.",
      punten: [
        "moet je verplicht in het sjabloon van je school aanleveren, dan is dit je werkwijze. Met `--reference-doc=sjabloon.docx` haalt pandoc de stijlen uit een bestaand Word-document",
        "zet je Quarto erbij, dan komen je slides en je pdf uit dezelfde bron als je cursustekst",
        "je bestanden blijven van jou. De AI ziet ze, ze schrijft er niet in"
      ],
      slot: "",

      /* Deze werkwijze heette eerst “Browser plus Quarto”. Het omzetten zelf doet
         pandoc; Quarto is pandoc met een projectlaag erover. Wie enkel Word nodig
         heeft, installeert dus de kleinste van de twee. */
      routes: {
        kop: "Twee routes, en wat er uit moet komen beslist",
        items: [
          {
            naam: "Alleen Word, in het sjabloon van je school",
            wat: "pandoc",
            hoe: "pandoc 01-hoofdstuk.md -o 01-hoofdstuk.docx --reference-doc=sjabloon.docx",
            uitleg: "Die laatste optie is waar het hier om draait: pandoc haalt de stijlen uit dat bestaande .docx, dus jouw Kop 1 blijft jouw Kop 1. Quarto hoeft hier niet. Het omzetten zelf doet pandoc, en Quarto is pandoc met een projectlaag erover."
          },
          {
            naam: "Ook een pdf, slides of een webpagina",
            wat: "Quarto",
            hoe: "quarto render 01-hoofdstuk.md --to docx   (of --to pdf, of --to revealjs)",
            uitleg: "Nu betaalt die projectlaag zich terug: nummering en kruisverwijzingen die over hoofdstukken heen kloppen, een pdf via typst zonder dat je LaTeX installeert, en slides uit hetzelfde bestand als je tekst. Je sjabloon raak je niet kwijt: dat zet je in de kop van je bestand, met `reference-doc: sjabloon.docx`. Pandoc zit in Quarto, apart installeren hoeft niet."
          }
        ],
        noot: "Twijfel je, begin bij pandoc. Quarto installeer je erbij op de dag dat er een tweede formaat uit moet; je markdown-bestanden veranderen daar niet van.",
        zonderterminal: "Allebei vragen ze dat je één regel in een commandovenster typt. Wil je dat echt niet, dan bestaat Writage: een invoegtoepassing die .md-bestanden rechtstreeks in Word opent en opslaat, met je eigen stijlenset. Ze kost 29 dollar na een proefperiode van veertien dagen, en je moet ze mogen installeren, wat op een schoollaptop net het punt is."
      },

      installeren: "pandoc. Quarto als er meer dan Word uit moet",
      voorwie: "wie in een verplicht sjabloon moet aanleveren, en wie formules of code in zijn cursus heeft",
      stappen: [
        "Installeer pandoc. Moet er ook een pdf of slides uit, installeer dan meteen Quarto: pandoc zit erin.",
        "Zet een hoofdstuk om naar markdown en render het naar .docx met je eigen sjabloon als referentiedocument.",
        "Zet je drie regels in een .md-bestand naast dat hoofdstuk, en haal het erbij in elk gesprek."
      ],
      volgendestap: {
        naar: "3",
        wanneer: "Als je merkt dat je vooral bestanden aan het kopiëren bent in plaats van na te lezen.",
        wat: "Bij werkwijze 3 werkt de AI rechtstreeks in de map waar je bestanden al staan. Je draagt niets meer heen en weer. Zet die map wel eerst in git, anders zie je niet wat er veranderd is.",
        nognietnodig: "Alleen zinvol op een laptop waar je zelf software mag installeren."
      },
      overslaan: "Alles over de AI die in je map schrijft, hoort bij werkwijze 3 en 4. Jij houdt je bestanden zelf vast.",
      onderwerpen: {
        "plat": "Uit hetzelfde markdown-bestand komt een Word-document, en met Quarto erbij ook pdf, html of slides. Dit is de stap waarvoor je pandoc installeert.",
        "contextmap": "Zelfde als werkwijze 1: je documenten staan in {projectplek}.",
        "regels": "Je regels staan in {regelsplek} en als .md-bestand naast je cursus, zodat ze bij je bestanden blijven.",
        "skills": "Een skill is nog altijd een document dat je erbij haalt. Het automatische deel begint bij [[3]].",
        "lesmateriaal": "Hier zit je winst: een referentiedocument neemt het sjabloon van je school over. Moet er ook een pdf uit, dan is dat Quarto met typst, zonder LaTeX."
      },
      links: ["pandoc", "pandoc-refdoc", "quarto", "quarto-docx", "quarto-pptx", "quarto-typst", "writage", "vscode", "mermaid"]
    },
    "3": {
      nr: "3",
      naam: "De AI werkt in je map",
      pitch: "De AI werkt in je eigen bestanden, in de map waar ze al stonden.",
      uitleg: "Je draagt niets meer heen en weer, en je kijkt na wat er veranderd is.",
      punten: [
        "je regels staan in {regelsbestand} in die map",
        "vanaf hier lonen skills, want je geeft dezelfde uitleg vaker dan je denkt",
        "zet je map in git (versiebeheer) voor je de AI erin laat schrijven. Anders zie je niet wat er veranderde",
        "een commandovenster hoeft niet meer: Cowork wijst een map op je schijf aan vanuit de Claude-app zelf"
      ],
      slot: "",
      /* Sinds Cowork is de terminal niet meer de enige weg naar je eigen map.
         Dezelfde vorm als bij werkwijze 2: de route beslist wat je installeert,
         de werkwijze zelf blijft dezelfde. */
      routes: {
        kop: "Twee routes, en of je een commandovenster wil beslist",
        items: [
          {
            naam: "Zonder commandovenster",
            wat: "Cowork, in de Claude-app",
            hoe: "Nieuw project → “Use an existing folder on your computer”",
            uitleg: "Je maakt een project aan, wijst je cursusmap aan, en vanaf dan leest en schrijft Claude daar rechtstreeks. Opladen hoeft niet meer. Zo’n Cowork-project draagt zelf instructies, een map en een geheugen van wat je er eerder liet doen. Let op welke Claude je open hebt: aan de map op je schijf kom je met de app op je laptop, want de Cowork in je browser draait op de servers van Anthropic. En let op het woord: een Cowork-project is iets anders dan het Project uit je zijbalk, waar je bestanden oplaadt."
          },
          {
            naam: "In een commandovenster",
            wat: "Claude Code, of Gemini CLI",
            hoe: "cd Documenten/cursus/webontwikkeling, dan claude",
            uitleg: "Twee regels typen, en daarna praat je gewoon Nederlands tegen een venster. Je regels staan in CLAUDE.md in die map, je skills in .claude/skills/naam/SKILL.md. Bij Gemini CLI heet dat regelsbestand GEMINI.md. Dit is de route die naast de rest van je gereedschap ligt: git, je editor, je sjabloon."
          }
        ],
        noot: "Allebei moet je ze installeren. Mag dat niet op je laptop, dan blijft [[1]] je werkwijze. En zet in allebei de goedkeuring op vragen tot je gezien hebt wat er gebeurt: in Cowork heet die stand “Manually approve”, en “Skip all approvals” zet je pas aan als je map in git staat."
      },

      installeren: "Cowork of Claude Code, plus git",
      voorwie: "wie op zijn eigen laptop werkt en het heen en weer plakken beu is",
      stappen: [
        "Zet je cursusmap in git, voor je de AI er iets in laat schrijven.",
        "Zet een {regelsbestand} in die map met je drie regels erin.",
        "Laat een hoofdstuk herwerken en lees wat er veranderd is. Wat je daar corrigeert, is de volgende regel in dat bestand."
      ],
      volgendestap: {
        naar: "4",
        wanneer: "Als er meer dan één formaat uit je cursus moet, en ze uit elkaar beginnen te lopen.",
        wat: "Bij werkwijze 4 komen je website, je syllabus, je slides en je oefeningen uit dezelfde bestanden, met je huisstijl één keer vastgelegd in _brand.yml.",
        nognietnodig: "Zet de opbouw klaar op de dag dat er nog niets in staat. Staan je tien hoofdstukken er al, dan pas je ze alle tien opnieuw in."
      },
      overslaan: "De volledig automatische verwerking uit werkwijze 4 hoeft niet. Hier blijft het bij de bestanden die je al had.",
      onderwerpen: {
        "plat": "De AI schrijft rechtstreeks in je bestanden. Git is hier geen extraatje, want anders zie je niet wat er veranderde.",
        "contextmap": "Je contextmap is een map op je schijf. De tool leest ze zonder dat je iets oplaadt.",
        "regels": "{regelsbestand} in die map. Het geldt voor alles wat in die map gebeurt.",
        "skills": "Vanaf hier lonen skills, want je geeft dezelfde uitleg vaker dan je denkt.",
        "lesmateriaal": "Slides en oefeningen komen uit dezelfde map. Zet de controle-afspraak (kloppen de slides nog bij de tekst?) in je regelsbestand."
      },
      links: ["claude-cowork", "claude-cowork-projecten", "claude-md", "claude-code", "gemini-cli", "git", "vscode", "quarto"]
    },
    "4": {
      nr: "4",
      naam: "Eén bron, alle formaten",
      pitch: "Eén map met versiebeheer, waar website, syllabus, slides en oefeningen uit dezelfde bestanden komen.",
      uitleg: "Elke wijziging in de tekst kan meteen doorwerken in alle formaten, met een geschiedenis erbij.",
      punten: [
        "maak je website en je pdf één keer met een leeg hoofdstuk erin. Daarna zet je er tekst in, en de rendering staat er al",
        "de afspraak die dit sluitend maakt: zet in je regelsbestand dat de slides gecontroleerd worden als de tekst van een hoofdstuk verandert",
        "elf regels in _brand.yml leggen je kleuren en lettertypes één keer vast, voor je website, je slides en je pdf samen"
      ],
      slot: "",
      installeren: "Quarto, git, een editor",
      voorwie: "een cursus die jaren meegaat, en waar meer dan één formaat uit moet",
      stappen: [
        "Zet de map en de rendering klaar met een leeg hoofdstuk erin, en maak website en pdf voor er inhoud in staat.",
        "Zet je {regelsbestand} en _brand.yml in de hoofdmap.",
        "Schrijf pas daarna je eerste hoofdstuk. Anders raak je bij elke wijziging aan de opbouw elk bestand dat er al staat aan."
      ],
      overslaan: "Niks. Alles uit het naslagwerk geldt hier, en de controle-afspraak voor de slides staat in je regelsbestand.",
      onderwerpen: {
        "plat": "Een bestand per hoofdstuk, en de omzetting gebeurt automatisch in plaats van in een gesprek.",
        "contextmap": "Je contextmap staat mee in de map, en de chat waarin je het bedacht hebt ook.",
        "regels": "Je regelsbestand staat in de hoofdmap en geldt voor alles wat eronder staat.",
        "skills": "Skills staan als aparte bestanden bij je cursus. De figurenskill is het duidelijkste geval: de regels zien er raar uit, de figuur ziet er af uit.",
        "lesmateriaal": "Website, syllabus, slides en oefeningen uit dezelfde bron. _brand.yml legt kleuren en lettertypes één keer vast."
      },
      links: ["quarto", "quarto-book", "quarto-brand", "quarto-revealjs", "quarto-typst", "git", "claude-md", "mermaid"]
    }
  },

  /* ---------- Vraag: mag je iets installeren ---------- */
  installatie: [
    { id: "geen-rechten", label: "een laptop van school waar ik niks op mag installeren", gevolg: "Werkwijze 1. Alles wat je nodig hebt, gebeurt in je browser.", werkwijze: "1" },
    { id: "softwarecentrum", label: "een laptop van school met een softwarecentrum", gevolg: "Kijk of pandoc, Quarto en VS Code erin staan. Zo ja, dan ligt werkwijze 2 open en beslist de volgende vraag.", vervolg: true },
    { id: "eigen-laptop", label: "mijn eigen laptop", gevolg: "Werkwijze 2, 3 of 4. De volgende vraag beslist.", vervolg: true },
    { id: "wil-niet", label: "ik mag installeren maar ik wil er niet aan", gevolg: "Werkwijze 1. Daar blijven de meeste lesgevers; je mist versiebeheer en de zekerheid dat je huisstijl klopt.", werkwijze: "1" }
  ],
  installatieNoot: "Programma's die rechtstreeks in je map schrijven, raken op een strak beheerde schoollaptop meestal niet geïnstalleerd. In de browser kan je altijd terecht.",

  /* ---------- Vraag: hoeveel ervaring heb je ---------- */
  ervaring: [
    { id: "beginner", label: "weinig of geen: ik heb nog nauwelijks met een AI-chatbot gewerkt", hulp: "dan houden we het bij de browser, zonder installaties" },
    { id: "gemiddeld", label: "ik gebruik af en toe een chatbot, maar niet voor cursusmateriaal" },
    { id: "gevorderd", label: "ik werk er geregeld mee en durf iets te installeren" }
  ],

  /* ---------- Wat moet eruit komen ---------- */
  outputs: [
    { id: "docx", label: "Word in het sjabloon van je school", advies: "pandoc, met jouw sjabloon als referentiedocument: --reference-doc=sjabloon.docx. Quarto hoef je hier niet voor te installeren.", links: ["pandoc-refdoc", "quarto-docx"] },
    { id: "pptx", label: "PowerPoint in het sjabloon van je school", advies: "Idem, naar pptx. Wat je terugkrijgt is tekst en beeld op sjabloonlay-outs. Animaties en fijne plaatsing doe je nog altijd in PowerPoint zelf.", links: ["pandoc-refdoc", "quarto-pptx"] },
    { id: "moodle-html", label: "een pagina op het leerplatform, de editor slikt html", advies: "Zet je markdown om naar html en plak dat.", links: ["quarto-html", "pandoc"] },
    { id: "moodle-geen-html", label: "een pagina op het leerplatform, de editor slikt geen html", advies: "Via Word, en aanvaard dat de opmaak daar deels sneuvelt.", links: ["quarto-docx"] },
    { id: "pdf", label: "een pdf om te printen", advies: "Quarto met typst als motor. Je moet geen LaTeX installeren.", links: ["quarto-typst", "typst"] },
    { id: "slides", label: "slides", advies: "Marp als extensie in VS Code, of Quarto met reveal.js.", links: ["marp", "quarto-revealjs"] },
    { id: "oefeningen", label: "oefeningen en examens", advies: "Zelfde contextmap, andere vraag. Vraag de foute antwoorden erbij met een reden per fout, en vraag drie moeilijkheidsgraden in één keer. Je gooit er twee weg. Welke twee, dat zie je pas als ze naast elkaar staan.", links: [] },
    { id: "schema", label: "een schema of een tijdlijn", advies: "mermaid: tekst die een figuur wordt, en die meeverandert met je cursus. Snel iets uittekenen met de hand gaat met Excalidraw, zonder installatie.", links: ["mermaid", "mermaid-live", "excalidraw"] },
    { id: "weet-ik-niet", label: "weet ik nog niet", advies: "Vraag je tekst in markdown. Dan blijft alles hierboven mogelijk.", links: [] }
  ],
  outputNoot: "Deze vraag stel je pas als je weet wat je moet aanleveren. Weet je het nog niet, vraag je tekst dan in markdown en stel de vraag uit.",

  /* ---------- Valkuilen ----------
     Een klacht herkennen is de helft. Daarom loopt elke valkuil in twee
     richtingen door: "verder" wijst naar een plek op deze site (een onderwerp,
     een prompt om te plakken, een werkwijze, een vak van het naslagwerk),
     "links" naar de handleiding van de makers zelf. Zo hoeft niemand na het
     lezen van de fix opnieuw op zoek. */
  valkuilen: [
    {
      klacht: "het verzint dingen die niet bij mijn vak passen",
      fix: "Je contextmap is te dun. Zet er ook iets in dat niet in je cursus staat: je beginsituatie, wat studenten vorig jaar niet begrepen, de feedback van een collega.",
      onderwerp: "contextmap",
      verder: [
        { naar: "onderwerp", id: "contextmap", wat: "wat er in die map hoort. Het selecteren is het werk" },
        { naar: "prompt", id: "contextmap-beoordelen", wat: "de vraag die je ontbrekende document oplevert" },
        { naar: "vak", id: "eerstekeer", wat: "een sessie van begin tot eind, met je contextmap als eerste stap" }
      ],
      links: []
    },
    {
      klacht: "het klinkt niet als mij",
      fix: "Je regels staan nergens opgeschreven. Geef twee stukken die je zelf schreef en vraag welke regels die tekst volgt. Beschrijf je toon niet zelf, want “vlot en toegankelijk” levert precies niks op.",
      onderwerp: "regels",
      verder: [
        { naar: "onderwerp", id: "regels", wat: "hoe een regel eruitziet die je kan nakijken" },
        { naar: "prompt", id: "stem", wat: "de vraag die je regels uit twee eigen teksten haalt" },
        { naar: "vak", id: "colofon", wat: "het regelsbestand waarmee deze site geschreven is, om van te pikken" }
      ],
      toollink: "regels",
      links: []
    },
    {
      klacht: "ik moet elke keer hetzelfde corrigeren",
      fix: "Alles wat je een derde keer corrigeert, hoort in je regelsbestand.",
      onderwerp: "regels",
      verder: [
        { naar: "onderwerp", id: "regels", wat: "waar dat bestand staat en hoe kort een regel mag zijn" },
        { naar: "prompt", id: "regels-testen", wat: "leg je regels naast een stuk tekst dat je afgekeurd hebt" }
      ],
      toollink: "regels",
      links: []
    },
    {
      klacht: "ik moet dat alleen bij één soort taak zeggen",
      fix: "Dat wordt een skill. Je regelsbestand is voor wat altijd geldt.",
      onderwerp: "skills",
      verder: [
        { naar: "onderwerp", id: "skills", wat: "wanneer een afspraak bij één soort taak hoort" },
        { naar: "prompt", id: "skill-afleiden", wat: "schrijf de uitleg uit die je al drie keer gaf" }
      ],
      toollink: "skill",
      links: ["skills"]
    },
    {
      klacht: "het herschrijft ook wat al goed was",
      fix: "Kleinere stukken geven, en je bestanden in versiebeheer zetten zodat je ziet wat er veranderde.",
      onderwerp: "plat",
      verder: [
        { naar: "onderwerp", id: "plat", wat: "een bestand per hoofdstuk, en waarom dat het nalezen draaglijk maakt" },
        { naar: "werkwijze", id: "3", wat: "je cursus staat in een map, en elke wijziging is zichtbaar en terug te draaien" }
      ],
      links: ["git"]
    },
    {
      klacht: "halverwege vergeet het wat we afgesproken hadden",
      fix: "Je gesprek is te lang. Nieuw gesprek, een bestand per hoofdstuk.",
      onderwerp: "plat",
      verder: [
        { naar: "onderwerp", id: "contextmap", wat: "de vaste plek waar je bestanden blijven staan tussen twee gesprekken" },
        { naar: "vak", id: "tool", wat: "hoe die plek bij jouw tool heet en waar je ze vindt" },
        { naar: "vak", id: "eerstekeer", wat: "wat er in één gesprek gebeurt, stap per stap" }
      ],
      toollink: "project",
      links: []
    },
    {
      klacht: "ik zit aan mijn limiet",
      fix: "Eén hoofdstuk per gesprek, en zet je afspraken in een bestand. Dan begint een nieuw gesprek niet van nul. Werk je met Cowork, hou het dan voor het werk waar bestanden aan te pas komen: daar gaat meer van je limiet naartoe dan bij een gewoon gesprek.",
      onderwerp: "regels",
      verder: [
        { naar: "vak", id: "tool", wat: "wat je abonnement dekt, en waar je bestanden blijven staan" },
        { naar: "onderwerp", id: "regels", wat: "je afspraken in een bestand, zodat een nieuw gesprek niet van nul begint" }
      ],
      toollink: "project",
      links: []
    },
    {
      klacht: "het antwoord is lang en zegt niets",
      fix: "Vraag wat eruit kan zonder dat er een feit verdwijnt. Dat levert bijna altijd een regel op.",
      onderwerp: "regels",
      verder: [
        { naar: "prompt", id: "schrappen", wat: "één zin die je bij elk stuk gegenereerde tekst plakt" },
        { naar: "vak", id: "colofon", wat: "de lijst “niet doen” van deze site, met de zinnen die er telkens weer in kruipen" }
      ],
      links: []
    },
    {
      klacht: "de opmaak valt uiteen in de pdf",
      fix: "Dit blijft handwerk. Wat op een webpagina klopt, valt in een pdf uiteen op de plek waar je het niet verwacht: brede tabellen, code die over de rand loopt, een figuur die alleen op een lege bladzijde past. Kijk je pdf na per hoofdstuk, en begin bij de tabellen.",
      onderwerp: "lesmateriaal",
      verder: [
        { naar: "werkwijze", id: "2", wat: "uit hetzelfde bestand rolt een Word-document in het sjabloon van je school, en met Quarto erbij een pdf" },
        { naar: "vak", id: "uitkomst", wat: "wat je vraagt hangt af van wat je moet aanleveren" },
        { naar: "onderwerp", id: "lesmateriaal", wat: "slides, oefeningen en toetsen uit dezelfde bron" }
      ],
      links: ["quarto-typst", "quarto-docx", "pandoc-refdoc"]
    },
    {
      klacht: "ik weet niet meer wat er veranderd is",
      fix: "git (versiebeheer), of minstens een kopie met de datum in de naam.",
      onderwerp: "plat",
      verder: [
        { naar: "werkwijze", id: "3", wat: "hier hoort versiebeheer thuis, met je cursus in een map op je schijf" },
        { naar: "onderwerp", id: "plat", wat: "in platte tekst zie je een wijziging regel per regel" }
      ],
      links: ["git"]
    },
    {
      klacht: "ik laadde iets op dat ik beter niet had gedeeld",
      fix: "Loop het materiaalfilter uit de keuzehulp vooraf af: werk van studenten of leerlingen blijft altijd buiten, materiaal van collega's vraag je eerst. Verwijder het bestand uit je project, en vraag bij twijfel na wat de afspraken op je school zijn.",
      onderwerp: "contextmap",
      verder: [
        { naar: "tab", id: "gids", wat: "het materiaalfilter, met de vier gevallen die overal terugkomen" },
        { naar: "vak", id: "randgevallen", wat: "je deelt het vak, of je directie wil hier voorlopig niets van weten" }
      ],
      links: []
    }
  ],

  /* ---------- Randgevallen ---------- */
  randgevallen: [
    { geval: "je deelt het vak met twee collega's", wat: "Begin met je eigen hoofdstukken. Het regelsbestand is wat je later samen aanvult." },
    { geval: "je cursus is grotendeels formules of code", wat: "Markdown houdt die intact, Word verkleutert ze. Dit is het argument voor [[2]]." },
    { geval: "je cursus zit vol afbeeldingen", wat: "Haal ze uit de tekst en verwijs ernaar. Ingebedde afbeeldingen gaan bij elke omzetting een beetje meer kapot." },
    { geval: "je hebt geen twee teksten waarvan je weet dat ze goed zijn", wat: "Een mail aan studenten en een stuk uit je slidenotities doen het ook. Twee registers is wat je nodig hebt." },
    { geval: "je bent tevreden over je cursus", wat: "Dan hoef je niets te herwerken. Gebruik dezelfde contextmap voor je oefeningen en toetsen." },
    { geval: "je probeerde het al eens en het viel tegen", wat: "Dan ben je precies waar deze site voor gemaakt is. Waarschijnlijk ontbrak je contextmap of je regelsbestand." },
    { geval: "je directie of opleidingshoofd wil hier voorlopig niets van weten", wat: "Schrijf ondertussen je regels op. Dat bestand is van jou en werkt in elke tool." },
    { geval: "je hebt Copilot van je school, maar niemand weet welke", wat: "Copilot Chat en Microsoft 365 Copilot zien er hetzelfde uit en kunnen niet hetzelfde. Zonder de betalende licentie werkt Copilot met de bestanden die je zelf oplaadt of in een notebook zet, en komt hij niet aan je mail, je Teams-gesprekken of de rest van je SharePoint. In een notebook passen er dan 50 referenties in plaats van 300. Het model dat antwoordt is wel hetzelfde, al krijg je standaardtoegang in plaats van voorrang: op drukke momenten kan een functie wegvallen of kan er een ander model antwoorden. Kijk na welke van de twee je hebt, voordat je een hele olod in één notebook zet." }
  ],

  /* ---------- Nog geen tool? Zo kies je er een ----------
     Verschijnt in de plaats van een waarschuwing wanneer iemand "nog geen"
     antwoordt. Elk geval wijst naar een assistent-id, zodat je vanaf dat scherm
     meteen kan kiezen en de rest van de site zich meteen aanpast. Een geval
     zonder tool-id is advies zonder knop. */
  toolkeuzeKop: "Dan helpen we je kiezen",
  toolkeuzeNoot: "Loop de gevallen hieronder af en neem het eerste dat op jou past. Je hoeft dit niet vandaag te beslissen en je kan later nog wisselen: je contextmap en je afspraken zijn gewone documenten, die verhuizen mee.",
  toolkeuze: [
    {
      als: "Je school werkt met Microsoft 365: Word, Teams, Outlook",
      tool: "copilot",
      knop: "Ik neem Copilot",
      waarom: "Dan heb je Copilot waarschijnlijk al, zonder iets extra te betalen of te installeren. In de aparte Copilot-app maak je een notebook aan: daar zet je je hoofdstukken in en je afspraken in de instructies, en beide blijven staan tussen twee gesprekken. In diezelfde app staat de knop “Leren”, met kant-en-klare opdrachten voor lesgevers. In dat venster draait GPT-5.6, hetzelfde voorkeursmodel dat Microsoft in Word en Excel zet; wie Copilot kent als het zwakke broertje, mag dat oordeel herzien. Vraag na wat de licentie van je school precies dekt, want dat verschilt."
    },
    {
      als: "Je wil vandaag iets proberen zonder te betalen, met je eigen hoofdstukken erbij",
      tool: "gemini",
      knop: "Ik probeer NotebookLM",
      waarom: "Laad je hoofdstukken op als bronnen in NotebookLM. Dat kan met een gewoon Google-account, en alles wat eruit komt verwijst naar de bladzijde waar het vandaan komt. Precies wat je bij cursusmateriaal wil, want je moet het toch nakijken."
    },
    {
      als: "Je wil hele hoofdstukken laten herwerken, en er een abonnement voor nemen",
      tool: "",
      knop: "",
      waarom: "Claude en ChatGPT doen voor dit werk ongeveer hetzelfde, en ze hebben allebei Projects: een vaste plek waar je documenten en je instructies blijven staan. Kies er een en blijf erbij. Welke van de twee vandaag de betere is, verandert om de paar maanden; het verschil tussen “een vaste plek voor je bestanden” en “elk gesprek opnieuw beginnen” is veel groter dan het verschil tussen de merken."
    },
    {
      als: "Je school voorziet niets, en je wil er voorlopig geen geld aan uitgeven",
      tool: "gratis",
      knop: "Ik begin zonder abonnement",
      waarom: "Ook goed, en je krijgt er meer voor dan je denkt. Een gratis Claude-account geeft je al vijf Projects: je hoofdstukken en je instructies blijven daar staan tussen twee gesprekken, en dat is precies de vaste plek waar deze site op steunt. Bij een hele cursus loop je wel tegen de limieten van je gesprekken aan. Begin ondertussen bij je afspraken: schrijf drie regels op die je al drie keer hebt moeten zeggen, in een gewoon Word-bestand. Dat bestand werkt in elke tool die je later kiest."
    }
  ],
  toolkeuzeSlot: "Wat je ook kiest, de drie ideeën van deze site werken overal: een vaste plek voor je documenten, je afspraken in een bestand, en een document per terugkerende taak. Alleen de knopjes heten anders.",

  /* ---------- Met welke AI werk je ---------- */
  assistentNoot: "Het idee is van geen enkele tool. Overal vind je dezelfde drie dingen terug: een plek waar je bestanden blijven staan, een plek waar je regels staan, en een document dat je erbij haalt voor één soort taak. De naam verschilt, de plek verschilt. Namen veranderen ook, dus kijk na of het bij jou nog zo heet.",
  assistenten: [
    {
      id: "claude",
      naam: "Claude",
      kort: "Claude Pro of Team",
      betaald: "Een betalend abonnement. Vraag na of je school iets voorziet; meestal betaal je zelf.",
      plek: "een Project",
      regels: "de projectinstructies. Werk je in een map, dan is het CLAUDE.md",
      skill: "een echte Skill: je zet je SKILL.md in een map, maakt daar een zip van, en laadt die op. In een map op je schijf staat datzelfde bestand in .claude/skills/naam/SKILL.md",
      inmap: "Ja, op twee manieren. Cowork zit in de Claude-app en vraagt geen commandovenster: je wijst je cursusmap aan en Claude schrijft erin. Claude Code doet hetzelfde vanuit een commandovenster. Allebei moet je ze installeren, en op een strak beheerde schoollaptop raakt dat er meestal niet op.",
      waar: "Projects staan in de zijbalk. Je maakt er een aan, sleept je documenten erin, en zet je regels in de projectinstructies. Skills staan elders: onder Customize > Skills, met de knop “+ Create skill” en dan “Upload a skill”. Staan ze in het grijs, zet dan eerst “Code execution and file creation” aan bij Settings > Capabilities.",
      termen: {
        regelsbestand: "CLAUDE.md",
        regelsplek: "de projectinstructies",
        projectplek: "een Project",
        skillplek: "een document in je project"
      },
      /* Welke bladzijde van de makers hoort bij welk idee. Een valkuil noemt
         de rol ("regels"), niet het merk, en krijgt zo één link die klopt. */
      rollen: { regels: "claude-md", project: "claude-projects", skill: "claude-skills" },
      links: ["claude-projects", "claude-cowork", "claude-skills", "claude-md", "claude-code", "skills"]
    },
    {
      id: "chatgpt",
      naam: "ChatGPT",
      kort: "ChatGPT Plus of Pro",
      betaald: "Een betalend abonnement. Vraag na of je school iets voorziet; meestal betaal je zelf.",
      plek: "een Project",
      regels: "de instructies van dat project, plus de custom instructions van je account voor wat overal geldt",
      skill: "een document in het project dat je erbij haalt, of een aparte GPT voor die taak",
      inmap: "Voor werkwijze 3 en 4 is dit niet je eenvoudigste keuze. Je bestanden gaan op en neer tussen je schijf en het venster. Werk je toch in een map (met Codex), dan is AGENTS.md je regelsbestand.",
      waar: "Projects staan in de zijbalk. Elk project heeft een eigen lijst bestanden en een eigen instructieveld.",
      termen: {
        regelsbestand: "AGENTS.md",
        regelsplek: "de projectinstructies",
        projectplek: "een Project",
        skillplek: "een document in je project"
      },
      rollen: { regels: "openai-help", project: "chatgpt", skill: "" },
      links: ["chatgpt", "openai-help"]
    },
    {
      id: "gemini",
      naam: "Gemini",
      kort: "Gemini met een betalend Google-abonnement",
      betaald: "Een betalend Google AI-abonnement. Kijk na wat er aan je Google-account hangt.",
      plek: "een Gem, of NotebookLM als je met bronnen werkt",
      regels: "de instructies van je Gem. Werk je in een map (Gemini CLI), dan is het GEMINI.md",
      skill: "een tweede Gem, eentje per soort taak",
      inmap: "Ja, met de Gemini CLI, al is dat een programma voor de opdrachtregel. In de browser gaan je bestanden op en neer.",
      waar: "Gems maak je aan in de zijbalk van Gemini. Laad je cursus liever op als bronnen in NotebookLM: alles wat daar uitkomt verwijst naar de bron waar het vandaan komt, en dat is precies wat je bij cursusmateriaal wil.",
      termen: {
        regelsbestand: "GEMINI.md",
        regelsplek: "de instructies van je Gem",
        projectplek: "een Gem",
        skillplek: "een tweede Gem"
      },
      rollen: { regels: "gemini", project: "notebooklm", skill: "" },
      links: ["gemini", "notebooklm", "gemini-cli", "gemini-help"]
    },
    {
      id: "copilot",
      naam: "Microsoft Copilot",
      kort: "Copilot via je werk- of schoolaccount",
      betaald: "Copilot Chat zit bij een gewoon werk- of schoolaccount, zonder dat er iets bij betaald wordt. De volledige Microsoft 365 Copilot-licentie is betalend en komt daarnaast aan je mail, je Teams-gesprekken en je SharePoint. Het model dat antwoordt is in allebei hetzelfde: de licentie koopt voorrang en toegang tot je eigen werkinhoud. Vraag na wat je school afnam.",
      plek: "een Copilot Notebook. Je hoofdstukken zitten erin als referenties en blijven staan tussen twee gesprekken",
      regels: "de instructies van dat notebook. Ze gelden voor elk gesprek dat je erin voert",
      skill: "een tweede notebook, met dezelfde bestanden en andere instructies",
      inmap: "De Copilot in Word en PowerPoint werkt niet in een eigen map. De GitHub Copilot in VS Code is een andere: die leest .github/copilot-instructions.md en hoort bij [[3,4]].",
      waar: "Copilot zit in Word, PowerPoint en Teams, maar er is ook een aparte Copilot-app (en copilot.microsoft.com) waar je gewoon een gesprek voert. Daar staan de twee knoppen waar je iets aan hebt: “Notebooks”, waar je hoofdstukken en je afspraken blijven liggen, en “Leren”, met kant-en-klare hulpprogramma’s voor onderwijs.",
      termen: {
        regelsbestand: ".github/copilot-instructions.md",
        regelsplek: "de instructies van je notebook",
        projectplek: "een Copilot Notebook",
        skillplek: "een tweede notebook"
      },
      rollen: { regels: "copilot-notebook-instructies", project: "copilot-notebooks", skill: "" },
      wistjedat: [{
        kop: "Je hebt ook de Copilot-app zelf, met een knop “Leren”",
        tekst: [
          "Copilot via je werk of school is meer dan het zijbalkje in Word, Teams en Outlook. Er is ook een aparte Copilot-app (en copilot.microsoft.com) waar je gewoon een gesprek voert, bestanden oplaadt en een hele les uitschrijft. Veel mensen weten niet dat die bij hun licentie zit.",
          "In die app staat links een knop “Leren”. Daaronder vind je “Hulpprogramma’s voor onderwijs”: kant-en-klare opdrachten voor lesgevers, zodat je niet met een leeg venster hoeft te beginnen.",
          "Er staan er vier soorten: curriculumplanning, bestaande inhoud wijzigen (leesniveau aanpassen, differentiëren, voorbeelden toevoegen), huiswerk en evaluaties, en trainingsactiviteiten. Klik er een aan en je krijgt de prompt al ingevuld."
        ],
        afbeelding: "assets/copilot-leren.png",
        alt: "Schermafbeelding van de Copilot-app. In de zijbalk staat “Leren” aangeklikt; rechts staan de hulpprogramma’s voor onderwijs: curriculumplanning, bestaande inhoud wijzigen, huiswerk en evaluaties en trainingsactiviteiten.",
        bijschrift: "De knop “Leren” in de Copilot-app. Klik op de afbeelding om ze groter te bekijken.",
        slot: "Een goed startpunt, maar zo’n kant-en-klare opdracht kent jouw cursus niet. Wat eruit komt wordt pas van jou als je er je eigen contextmap en je eigen regels naast legt, en als je het nakijkt.",
        planregel: "Open de Copilot-app (of copilot.microsoft.com) en klik links op “Leren”. Daar staan kant-en-klare hulpprogramma’s voor onderwijs: curriculumplanning, bestaande inhoud herwerken, huiswerk en evaluaties."
      },
      {
        kop: "Er zit een topmodel in dat venster",
        tekst: [
          "Copilot heeft bij veel collega’s de reputatie van de mindere: goed genoeg om een mail samen te vatten, en voor het echte werk neem je er iets anders bij. Kijk eens na wat er in jouw venster antwoordt. Microsoft koos GPT-5.6 als voorkeursmodel voor Word, Excel, PowerPoint en de chat, en bij sommige scholen staat Claude Opus er als tweede keuze naast.",
          "Bij je promptvenster staat een keuzeknop die op “Auto” staat, met daarnaast “Quick response” en “Think deeper”. Microsoft zet de modelnamen er niet meer bij, dus je kiest een manier van antwoorden. Laat hem op Auto voor een gewone vraag. Zet hem op Think deeper wanneer je een heel hoofdstuk laat herwerken of je contextmap laat beoordelen.",
          "Voor je cursus betekent dat één ding: je hoeft er persoonlijk geen abonnement bij te nemen om met een goed model te werken. Wat je nog wel moet doen is dat model iets geven om mee te werken, en dat is je notebook en je instructies.",
          "Zonder de betalende licentie werkt dit ook, met standaardtoegang in plaats van voorrang. Op drukke momenten kan een functie wegvallen of kan er tijdelijk een ander model antwoorden."
        ],
        slot: "Welke modellen erin zitten wisselt. Kijk na wat er bij jou in de keuzeknop staat voor je besluit dat Copilot iets niet kan.",
        links: ["copilot-modellen", "copilot-toegang", "copilot-welke-licentie"]
      },
      {
        kop: "En in een notebook blijven je bestanden en je afspraken staan",
        tekst: [
          "Naast “Leren” staat in diezelfde app de knop “Notebooks”, in een Nederlandstalige Copilot “Notitieblokken”. Je maakt er één aan per olod, je zet je hoofdstukken erin als referenties, en elk gesprek dat je in dat notebook voert vertrekt van die bestanden. Opnieuw opladen hoeft niet meer.",
          "Referenties zoek je op naam, sleep je erin, of neem je als hele map uit OneDrive of SharePoint. Word, PowerPoint, Excel, pdf, txt en OneNote-pagina’s gaan erin; een link naar een website niet. Met Copilot Chat passen er 50 in een notebook, met de volledige Microsoft 365 Copilot-licentie 300.",
          "Rechtsboven staat de knop “Meer opties” met de drie puntjes, en daaronder “Instructies”. Wat je daar typt geldt voor elk gesprek in dat notebook: je toon, je opbouw, wat je nooit wil zien. Dat is je regelsbestand, alleen dan in een tekstvak. Microsoft zet er zelf dit voorbeeld bij: “Reageer altijd in het Spaans en met opsommingstekens. De klant geeft er de voorkeur aan dat zijn naam in kleine letters wordt geschreven.” Schrijf de jouwe even concreet.",
          "In een gewoon gesprek, buiten een notebook, tik je een schuine streep en dan de naam van een bestand. Heb je de volledige licentie, dan verwijs je op diezelfde manier ook naar een collega, een vergadering of een mail."
        ],
        slot: "Notebooks vraagt een Copilot- of Copilot Chat-licentie én een OneDrive- of SharePoint-licentie, dus het hangt aan wat je school afneemt. Hou daarom naast je notebook een kopie van je afspraken als gewoon Word- of tekstbestand op je eigen schijf.",
        links: ["copilot-chat", "copilot-notebooks", "copilot-notebook-instructies", "copilot-referenties", "copilot-verwijzen", "copilot-licentie"]
      }],
      links: ["copilot-chat", "copilot-notebooks", "copilot-web", "copilot-instructions"]
    },
    {
      id: "generiek",
      naam: "Iets anders",
      kort: "zelf gehost, OpenRouter, ...",
      betaald: "Je gebruikt een lokaal model, een dienst zoals OpenRouter, of nog een andere chatbot.",
      plek: "hangt van je tool af. Zoek naar “projects”, “spaces” of een map met bestanden die blijven staan",
      regels: "een tekstbestand met je afspraken, dat je bovenaan je prompt plakt of meestuurt",
      skill: "hetzelfde: een apart document per soort taak, dat je erbij haalt",
      inmap: "Sommige tools werken rechtstreeks in een map op je schijf (zoals Claude Code of open alternatieven). Kijk in de documentatie van jouw tool.",
      waar: "De drie principes werken overal: een vaste plek voor je bestanden, je regels in een bestand, en een document per terugkerende taak. Alles op deze site geldt dus ook voor jou; alleen de knopjes heten anders.",
      termen: {
        regelsbestand: "het regelsbestand van je tool",
        regelsplek: "het instructieveld van je tool",
        projectplek: "een vaste map of project",
        skillplek: "een apart document per taak"
      },
      rollen: { regels: "", project: "openrouter", skill: "" },
      links: ["openrouter"]
    },
    {
      id: "gratis",
      naam: "Nog geen",
      /* in de vraag staat er meer dan de naam: wie het niet weet, moet dit
         antwoord durven aanklikken. Daarna volgt het keuzescherm. */
      vraaglabel: "Nog geen, of ik weet het nog niet",
      kort: "kies dit gerust: het volgende scherm helpt je kiezen",
      geenaccount: true,
      betaald: "Uitproberen lukt prima gratis. Bij een hele cursus loop je tegen de limieten.",
      plek: "een Project, ook zonder te betalen. Een gratis Claude-account geeft je er vijf, en je bestanden blijven daar staan tussen twee gesprekken",
      regels: "het instructieveld van dat Project, of anders een Word-bestand dat je bovenaan je prompt plakt",
      skill: "hetzelfde document, dat je erbij haalt als die taak langskomt",
      inmap: "Nee. Cowork en Claude Code vragen allebei een betalend abonnement. In een gratis venster werk je met de bestanden die je oplaadt, en dat is [[1|Werkwijze 1]].",
      waar: "Kijk in de tool die jij open hebt na of er zoiets als een Project in zit; bij Claude zitten er vijf in een gratis account. Wat je daarnaast nu al kan doen: schrijf drie regels op die je al drie keer hebt moeten zeggen. Dat bestand werkt in elke tool die je later kiest.",
      termen: {
        regelsbestand: "je regelsbestand",
        regelsplek: "het instructieveld van je Project, of bovenaan je prompt",
        projectplek: "een Project, of een map op je eigen schijf",
        skillplek: "een document dat je erbij haalt"
      },
      rollen: { regels: "", project: "claude-projects", skill: "" },
      links: []
    }
  ],

  /* ---------- De onderwerpen: het hart van het naslagwerk ---------- */
  onderwerpen: [
    {
      id: "plat",
      figuur: {
        bestand: "assets/eenbron.png",
        alt: "Tekening. Links een vak met vier documenten en het opschrift “je cursus als gewone tekst”, met eronder “je past hier iets aan, en verder nergens”. Vier pijlen wijzen naar Word in je schoolsjabloon, een pdf om te printen, slides, en een pagina op het leerplatform.",
        bijschrift: "Je past je tekst op één plek aan. De formaten rollen eruit."
      },
      titel: "Werk in platte tekst",
      kort: "platte tekst",
      watis: "*Markdown klinkt als iets voor programmeurs. Het is een hekje voor een titel en twee sterretjes rond een woord, en daarmee ken je het zowat.* Je vraagt de tekst zonder opmaak, en je doet de opmaak op het einde, in één keer.",
      kern: "Het *formaat* waarin je de AI laat schrijven, bepaalt hoeveel werk al de rest is.",
      tips: [
        "Vraag alles in markdown, ook als je resultaat een Word-document of een pdf wordt. Markdown is platte tekst met een paar tekens erin voor titels en vet. Het opent in Kladblok.",
        "Van markdown naar Word, pdf, html of slides gaat automatisch. Van Word terug naar iets anders gaat met de hand.",
        "Werk in een bestand per hoofdstuk. Een chatvenster met vijf hoofdstukken erin verliest de draad, en jij vindt er achteraf niks meer in terug.",
        "Laat afbeeldingen buiten de tekst staan, met een verwijzing ernaar. Ingebedde afbeeldingen gaan bij elke omzetting een beetje meer kapot.",
        "Doe de omzetting in twee stappen: eerst omzetten naar markdown, dat nakijken, en pas dan laten herwerken.",
        "En hoe krijg je er weer opmaak op? Dat kan op drie manieren: niks installeren (de AI zet dat ene document om, of Google Docs), pandoc als er een Word-document in jouw sjabloon uit moet, en Quarto als er ook een pdf of slides uit moet."
      ],
      gevorderd: [
        "Moet je in het sjabloon van je school aanleveren? Pandoc neemt een bestaande PowerPoint of een bestaand Word-document over als referentie, met --reference-doc=sjabloon.pptx. Dat is [[2]] en verder, en Quarto heb je er pas bij nodig als er meer dan één formaat uit moet.",
        "Zet je bestanden in git (versiebeheer) voor je de AI eraan laat werken. Dan is elke wijziging zichtbaar en terug te draaien, en dat is precies wat het nalezen draaglijk maakt."
      ],
      links: ["pandoc-refdoc", "quarto", "gdocs"]
    },
    {
      id: "contextmap",
      figuur: {
        bestand: "assets/vijfdocumenten.png",
        alt: "Tekening. Links een vak met dertig lege documentjes en het opschrift “alles wat ik heb”, met eronder “geen enkele reden opgeschreven”. Rechts vijf documenten die elk een regel uitleg krijgen: het hoofdstuk, de vakbeschrijving, je beginsituatie, een goed voorbeeld en een slecht voorbeeld.",
        bijschrift: "Het selecteren is het werk. Vijf met een reden erbij doen meer dan dertig zonder."
      },
      titel: "De contextmap",
      kort: "contextmap",
      watis: "De map met documenten die je zou meegeven aan een collega die je vak overneemt.",
      kern: "Wat er *in* die map zit, bepaalt het resultaat meer dan hoe je de vraag stelt.",
      tips: [
        "*Toegegeven, het is verleidelijk om gewoon alles op te laden. Je hebt het toch al staan.* Vijf documenten, geen vijftig. Het selecteren is het werk. Bij dertig documenten weet het model niet meer wat het zwaarst weegt, en jij ook niet.",
        "Vanaf het derde gesprek over hetzelfde hoofdstuk loont {projectplek}. Je merkt het vanzelf, want dan ben je je ECTS-fiche voor de derde keer aan het opladen.",
        "Denk aan: de vakbeschrijving of ECTS-fiche, het hoofdstuk zelf, je beginsituatie (wat kennen ze al), een goed en een slecht voorbeeld, en de feedback van vorig jaar.",
        "Zet er iets in dat niet in je cursus staat: je beginsituatie, wat studenten vorig jaar niet begrepen, de mail van een collega over wat er ontbrak.",
        "Zet er ook een slecht voorbeeld in, met een regel erbij waarom het slecht is. Een tegenvoorbeeld stuurt harder dan drie goede voorbeelden.",
        "Laat de AI je map beoordelen: wat zou je nog willen weten voor je aan dit hoofdstuk begint? Wat er dan uitkomt, is je ontbrekende document.",
        "Zet er de chat in waarin je het bedacht hebt. Die staat vol beslissingen die nergens anders opgeschreven staan."
      ],
      gevorderd: "Diezelfde map is ook wat je oefeningen en examens hun niveau geeft.",
      links: ["claude-projects"]
    },
    {
      id: "regels",
      titel: "Je regels in een bestand",
      kort: "je regels",
      watis: "Het blad met huisafspraken dat je zou meegeven aan iemand die iets voor jou uittypt. Elke AI-tool heeft er een plek voor; onderaan staat hoe het bij de jouwe heet.",
      kern: "Je kan je eigen stijl niet *beschrijven*, maar je kan hem wel laten *afleiden* uit wat je vroeger geschreven hebt.",
      tips: [
        "Beschrijf je toon niet zelf. “Vlot en toegankelijk met een vleugje humor” levert precies niks op. Geef twee stukken die je zelf schreef en vraag: wat zijn de regels die deze tekst volgt?",
        "Twee ijkpunten: een lesstuk en een stuk waar je losser schrijft. Met één voorbeeld krijg je één register terug, en dan klinkt je hele cursus als je strengste bladzijde.",
        "De niet-doen-lijst weegt zwaarder dan de wel-doen-lijst. Geen em-dashes, geen wijze slotzin, geen “het gaat niet over X, het gaat over Y”. Daaraan herkent een lezer AI-tekst.",
        "Maak elke regel testbaar. “Schrijf helder” kan je niet nakijken. “Test elke zin met een ontkenning erin: staat er een feit in de ontkende helft?” kan je wel nakijken, en de AI ook.",
        "De lijst schrijf je niet vooraf. Alles wat je een derde keer corrigeert, is een afspraak die je nooit hebt opgeschreven.",
        "Zet er ook je structuurafspraken in: hoe een hoofdstuk begint, wat er altijd in staat, wat vet mag zijn."
      ],
      tabel: {
        kop: ["Wat je bewaart", "In een chatvenster", "In een project", "In een map op je schijf"],
        rijen: [
          ["je contextmap", "bestanden opladen per gesprek", "één keer opladen, blijft staan", "een map op je schijf"],
          ["je regels", "bovenaan je prompt plakken", "in het instructieveld van dat project", "{regelsbestand} in die map"],
          ["een skill", "een document dat je erbij haalt", "een document in het project", "een apart bestand per taak"]
        ],
        noot: "Het idee is niet aan één tool gebonden. De naam verschilt, de plek verschilt, het principe is hetzelfde."
      },
      voorbeeld: {
        kop: "Zes regels uit een echt bestand",
        intro: "Dit zijn er zes uit het regelsbestand waarmee deze site geschreven is. Let op hoe smal ze staan: elke regel noemt het geval waar ze over gaat.",
        regels: [
          "Geen em-dashes. Gebruik een gewoon streepje, een dubbele punt, haakjes of een nieuwe zin.",
          "Test elke zin met een ontkenning erin: staat er een feit in de ontkende helft? Zo nee, schrappen.",
          "Geen tijdsaanduidingen. Geen \u201creken op een namiddag\u201d, en geen belofte over tijdwinst.",
          "Getallen tot twintig voluit.",
          "Vet is voor de zin die je in de les twee keer zou zeggen, niet voor trefwoorden.",
          "Elke bewering krijgt onmiddellijk een concreet geval, en alles heeft een eigennaam."
        ],
        knop: "Bekijk het hele bestand"
      },
      gevorderd: "Laat je regelsbestand nakijken tegen een stuk tekst dat je afgekeurd hebt. Regels die die fout niet vangen, staan er te vaag in.",
      links: ["claude-md", "gemini-cli"]
    },
    {
      id: "skills",
      figuur: {
        bestand: "assets/afsprakenofskill.png",
        alt: "Tekening. Links je afsprakendocument, met pijlen naar alle vier de gesprekken in het midden. Rechts een skill, met één pijl naar alleen het gesprek waarin je een figuur maakt. Eronder staat: je haalt het erbij, en verder blijft het liggen.",
        bijschrift: "Je afspraken gelden altijd. Een skill haal je erbij als die ene taak langskomt."
      },
      titel: "Skills: vaste uitleg per taak",
      kort: "skills",
      watis: "Een receptenkaart die je erbij neemt voor één soort taak, en die de rest van de tijd in de la ligt.",
      kern: "Een instructie die maar bij *één* soort taak hoort, hoort niet in je algemene regelsbestand.",
      tips: [
        "Je regelsbestand is voor wat altijd geldt. Wordt een instructie lang en geldt ze maar voor één taak, dan wordt het een aparte skill.",
        "Schrijf een skill nooit vooraf. Je schrijft hem nadat je dezelfde uitleg drie keer hebt gegeven, en je laat hem afleiden uit die drie gesprekken.",
        "In een gewoon chatvenster bestaat dit ook. Daar heet het “het document dat ik erbij haal als ik figuren maak”.",
        "Het duidelijkste voorbeeld zijn de figuren: een skill die de stijl, de kleuren en het lettertype vastlegt, met regels als “geen titel boven de figuur” en “tekst overlapt nooit met een lijn of een pijl”.",
        "De figuren zelf komen uit een script en niet uit een chatvenster. Een figuur bijsturen is dan een getal veranderen en opnieuw uitvoeren."
      ],
      gevorderd: "Hier merk je dat je afspraken in twee soorten uiteenvallen: wat altijd geldt tegenover wat bij één taak hoort. Zit een regel in de verkeerde stapel, dan krijg je hem terug op een moment dat je hem niet vroeg: je figurenregels midden in een oefening.",
      links: ["skills", "claude-skills"]
    },
    {
      id: "lesmateriaal",
      titel: "Van tekst naar lesmateriaal",
      kort: "lesmateriaal",
      watis: "*De slides van vorig jaar kloppen al niet meer met je tekst. Dat weet je, en je gaat het dit jaar weer niet rechtzetten.* Uit één tekstbestand komen je slides, je syllabus en je oefeningen, zonder drie keer dezelfde zin te verbeteren.",
      kern: "Zodra je tekst plat is en je contextmap gevuld, is elk volgend formaat nog één vraag.",
      tips: [
        "Je mag in PowerPoint blijven aanleveren. De vraag is waar de tekst op die slides vandaan komt.",
        "Pandoc en Quarto maken een .pptx uit je markdown, met een bestaande presentatie als sjabloon. Wat je terugkrijgt is tekst en beeld op sjabloonlay-outs: animaties en fijne plaatsing doe je nog in PowerPoint zelf.",
        "Wil je op termijn van PowerPoint af: Marp is een extensie in VS Code, Quarto geeft je slides in de browser.",
        "De afspraak die dit sluitend maakt: zet in je regelsbestand dat de slides gecontroleerd worden als de tekst van een hoofdstuk verandert.",
        "Figuren: mermaid voor stroomschema's en tijdlijnen, Excalidraw om snel iets uit te tekenen, een script per figuur als je een eigen stijl over veel figuren heen wil.",
        "Oefeningen en examens: zelfde contextmap, andere vraag. Vraag de foute antwoorden met een reden per fout, en drie moeilijkheidsgraden in één keer."
      ],
      gevorderd: [
        "Je huisstijl leg je één keer vast met elf regels in _brand.yml, en de fijnere afwerking in een .scss. Het resultaat benadert het sjabloon van je school en is er geen kopie van.",
        "Zet je opbouw klaar op de dag dat er nog niks in staat. Staat je cursus er al, dan moet elk hoofdstuk opnieuw door de rendering."
      ],
      links: ["quarto-brand", "quarto-revealjs", "marp", "mermaid", "excalidraw"]
    }
  ],

  /* ---------- Werkwijzen naast elkaar ---------- */
  vergelijking: {
    kop: ["", "1", "2", "3", "4"],
    rijen: [
      ["waar je bestanden staan", "in {projectplek}", "op je schijf", "op je schijf", "in een map met versiebeheer"],
      ["wie erin schrijft", "jij", "jij", "de AI", "de AI"],
      ["wat je installeert", "niks", "pandoc, plus Quarto voor meer dan Word", "een tool in je map, plus git", "Quarto, git, een editor"],
      ["waar je regels staan", "{regelsplek}", "{regelsplek}, en een .md ernaast", "{regelsbestand} in de map", "{regelsbestand} in de hoofdmap"],
      ["hoe je ziet wat veranderde", "een kopie met de datum in de naam", "idem", "git", "git"],
      ["hoeveel formaten eruit komen", "één, met de hand", "Word; alle als je Quarto erbij zet", "alle, als je Quarto erbij zet", "alle, bij elke wijziging"],
      ["skills", "{skillplek}", "idem", "een bestand per skill", "een bestand per skill, bij de cursus"]
    ]
  },

  /* ---------- Prompts om te plakken ---------- */

  /* ---------- Eén sessie, van begin tot eind ----------
     Voor wie de losse onderdelen snapt maar niet weet hoe een gesprek eruitziet.
     Per stap: wat je doet, wat je typt, wat je terugkrijgt, en waar je op let.
     Bewust één doorlopend verhaal met één hoofdstuk, geen tips naast elkaar. */
  voorbeeldgesprek: {
    kop: "Zo ziet je eerste sessie eruit",
    intro: "Je hebt nog nooit met een AI gewerkt en je cursus staat in Word. Dit is wat er dan letterlijk gebeurt, van het openen van je laptop tot een hoofdstuk waar je tevreden over bent. Alles hieronder gebeurt in je browser; je hoeft niets te installeren.",
    situatie: "Eén hoofdstuk, niet je hele cursus. Neem dat waar je zelf het minst tevreden over bent: daar zie je het verschil, en als het tegenvalt heb je één hoofdstuk verloren en geen cursus.",
    tweedekeer: "Stap 1, 2 en 5 doe je maar één keer. Bij het volgende hoofdstuk staat je plek er, staan je afspraken er, en begin je meteen bij stap 3.",
    stappen: [
      {
        kop: "Zet een plek klaar en leg er drie documenten in",
        jij: "Maak {projectplek} aan en sleep er drie dingen in: het hoofdstuk zelf, je vakbeschrijving of ECTS-fiche, en een half blaadje over je beginsituatie: wat kennen je studenten al als ze aan dit hoofdstuk beginnen.",
        terug: "Nog niets. Dit is voorbereiding, en het is het enige stuk waar je zelf moet nadenken.",
        let: "Dat derde document is het belangrijkste en het is het enige dat nog niet bestaat. Vijf zinnen volstaan. Zonder dat krijg je uitleg voor de verkeerde groep."
      },
      {
        kop: "Zet je hoofdstuk om, zonder iets te laten veranderen",
        jij: "Vraag: “Zet dit hoofdstuk om naar markdown. Verander niets aan de inhoud en niets aan de volgorde. Zeg er onderaan bij wat er niet netjes over te zetten was.”",
        terug: "Je hoofdstuk als platte tekst, met onderaan een lijstje van wat niet meekon: een tabel, een formule, een afbeelding.",
        let: "Lees die omzetting na met je Word-bestand ernaast voor je verder gaat. Dit is de saaiste stap en de enige die je later niet meer kan rechtzetten: fouten die hier binnensluipen, herschrijf je in stap 6 mee."
      },
      {
        kop: "Vraag wat er in je map ontbreekt",
        jij: "Vraag: “Dit is alles wat ik heb over dit vak. Wat zou je nog willen weten voor je aan dit hoofdstuk begint?”",
        terug: "Een lijstje vragen. Meestal drie of vier, en meestal heb je op twee ervan meteen een antwoord in je hoofd.",
        let: "Die antwoorden typ je uit in een nieuw document en je legt het bij de andere drie. Dat is je contextmap aan het groeien, en het is precies het soort informatie dat nergens in je cursus staat."
      },
      {
        kop: "Laat je eigen schrijfstijl afleiden",
        jij: "Geef twee teksten die je zelf schreef en waarvan je weet dat ze goed zijn (een stuk cursus, en iets waar je losser schrijft: een mail aan studenten bijvoorbeeld). Vraag: “Wat zijn de regels die deze teksten volgen? Geef ze als een lijst waar ik het mee oneens kan zijn, en maak elke regel zo dat ik ze kan nakijken.”",
        terug: "Tien à vijftien regels over je toon, je zinslengte, hoe je voorbeelden gebruikt. Sommige kloppen, sommige niet.",
        let: "Schrap wat niet klopt. Wat overblijft plak je in een Word-bestand dat je afspraken.md of afspraken.docx noemt. Dít bestand is wat je overhoudt aan vandaag: het werkt in elke tool die je later kiest."
      },
      {
        kop: "Zeg er ook bij wat je niét wil zien",
        jij: "Zet onderaan datzelfde bestand drie dingen die je nooit wil terugzien. Bijvoorbeeld: geen opsommingen van meer dan vijf punten, geen slotzin die de hele les samenvat, geen woorden als “cruciaal” en “essentieel”.",
        terug: "Nog niets. Je bent nu iets aan het opschrijven dat je anders elke keer opnieuw zou moeten zeggen.",
        let: "De niet-doen-lijst werkt beter dan de wel-doen-lijst. Je weet meestal veel beter wat je stoort dan wat je wil."
      },
      {
        kop: "Nu pas: laat één stuk herwerken",
        jij: "Neem één paragraaf of één deelhoofdstuk, niet het hele hoofdstuk. Plak je afspraken erbij en vraag om dat stuk te herwerken.",
        terug: "Een herwerkte versie. De eerste keer is ze voor de helft goed.",
        let: "Alles wat je nu corrigeert, is een regel die nog niet in je afsprakenbestand stond. Schrijf ze erbij. Dat is de hele truc: de derde keer dat je iets corrigeert, hoort het in dat bestand en komt het er niet meer uit."
      }
    ],
    slot: "Na deze zes stappen staan er drie dingen klaar: één herwerkt hoofdstuk, een contextmap van vier of vijf documenten, en een afsprakenbestand met tien à vijftien regels erin. Dat afsprakenbestand open je bij het volgende hoofdstuk opnieuw, en je vult het aan met wat je daar corrigeert.",
    valkuil: "De meest gemaakte fout is stap 2 en 6 tegelijk vragen: omzetten en herwerken in één keer. Dan weet je achteraf niet welke wijziging van de omzetting komt en welke van de AI, en je vertrouwt het resultaat niet meer."
  },

  promptPlanKop: "Vandaag plakken: je eerste drie vragen",
  promptPlanNoot: "Nog nooit met een AI gewerkt? Begin hiermee, in deze volgorde, met één hoofdstuk. Kopieer de zin, plak ze in je gesprek en zet je hoofdstuk erbij. Meer moet er de eerste keer niet gebeuren.",
  prompts: [
    {
      titel: "Omzetten, zonder herwerken",
      id: "omzetten",
      onderwerp: "plat",
      start: 1,
      wanneer: "de eerste van de twee stappen",
      tekst: "(voeg je document toe als bijlage) Zet dit hoofdstuk om naar markdown. Verander niets aan de inhoud en niets aan de volgorde. Zeg er onderaan bij wat er niet netjes over te zetten was."
    },
    {
      titel: "Je contextmap laten beoordelen",
      id: "contextmap-beoordelen",
      onderwerp: "contextmap",
      start: 2,
      wanneer: "wat eruit komt, is je ontbrekende document",
      tekst: "Dit is alles wat ik heb over dit vak. Wat zou je nog willen weten voor je aan dit hoofdstuk begint?"
    },
    {
      titel: "Je stem laten afleiden",
      id: "stem",
      onderwerp: "regels",
      start: 3,
      wanneer: "geef twee registers: een lesstuk en iets lossers",
      tekst: "Deze twee teksten heb ik zelf geschreven en ik weet dat ze goed zijn. Wat zijn de regels die deze teksten volgen? Geef ze als een lijst waar ik het mee oneens kan zijn, en maak elke regel zo dat ik ze kan nakijken."
    },
    {
      titel: "Je regels testen tegen een afgekeurde tekst",
      id: "regels-testen",
      onderwerp: "regels",
      wanneer: "voor wie al een regelsbestand heeft",
      tekst: "Hier is een stuk tekst dat ik afgekeurd heb, en hier zijn mijn regels. Welke van die regels vangen deze fout niet? Stel een scherpere formulering voor."
    },
    {
      titel: "Schrappen",
      id: "schrappen",
      onderwerp: "",
      wanneer: "bij elk stuk gegenereerde tekst; levert bijna altijd een regel op",
      tekst: "Wat kan hier weg zonder dat er een feit verdwijnt?"
    },
    {
      titel: "Een skill laten afleiden",
      id: "skill-afleiden",
      onderwerp: "skills",
      wanneer: "pas nadat je dezelfde uitleg drie keer gaf",
      tekst: "In deze drie gesprekken heb ik drie keer dezelfde uitleg gegeven over hoe ik dit soort taak wil. Schrijf die uitleg uit als een set regels, met bij elke regel het geval waaruit ze komt."
    },
    {
      titel: "Oefeningen met foute antwoorden",
      id: "oefeningen",
      onderwerp: "lesmateriaal",
      wanneer: "met je contextmap erbij klopt het niveau",
      tekst: "Maak vijf meerkeuzevragen bij dit hoofdstuk. Geef bij elke foute optie een reden waarom een student ze zou kiezen. Geef daarna dezelfde vragen in drie moeilijkheidsgraden."
    },
    {
      titel: "Slides in sync houden",
      id: "slides-sync",
      onderwerp: "lesmateriaal",
      wanneer: "zet deze vraag als regel in je regelsbestand",
      tekst: "Zorg ervoor dat de inhoud in de cursus steeds synchroon blijft met de inhoud van de slides. Bij twijfel, odnervraag me. "
    }
  ],

  /* ---------- Gereedschapskist ---------- */
  gereedschap: [
    { waarvoor: "een document omzetten, nu meteen", wat: "Google Docs importeert en exporteert markdown", drempel: "geen", link: "gdocs" },
    { waarvoor: "een Copilot-gesprek naar Word krijgen", wat: "Copilot Pages: bewaar het antwoord als pagina, werk het daar bij en zet het om naar een Word-document", drempel: "geen", link: "copilot-pages" },
    { waarvoor: "markdown naar Word, met jouw sjabloon", wat: "pandoc, met --reference-doc=sjabloon.docx", drempel: "commandolijn", link: "pandoc-refdoc" },
    { waarvoor: "markdown naar PowerPoint, met jouw sjabloon", wat: "idem naar .pptx, met --reference-doc=sjabloon.pptx", drempel: "commandolijn", link: "quarto-pptx" },
    { waarvoor: "markdown in Word openen zonder commandolijn", wat: "Writage, een invoegtoepassing voor Word. Betalend na veertien dagen", drempel: "installatie", link: "writage" },
    { waarvoor: "markdown naar pdf, html, slides", wat: "Quarto. Pandoc zit erin", drempel: "commandolijn", link: "quarto" },
    { waarvoor: "pdf zonder LaTeX te installeren", wat: "Quarto met typst als motor", drempel: "commandolijn", link: "quarto-typst" },
    { waarvoor: "markdown schrijven", wat: "VS Code, Obsidian, Typora", drempel: "installatie", link: "obsidian" },
    { waarvoor: "slides zonder PowerPoint", wat: "Marp (extensie in VS Code) of reveal.js via Quarto", drempel: "extensie", link: "marp" },
    { waarvoor: "stroomschema's en tijdlijnen", wat: "mermaid", drempel: "geen", link: "mermaid-live" },
    { waarvoor: "snel iets uittekenen", wat: "Excalidraw, in de browser", drempel: "geen", link: "excalidraw" },
    { waarvoor: "huisstijl in je eigen output", wat: "_brand.yml voor kleuren en fonts, .scss voor de rest", drempel: "een bestand", link: "quarto-brand" },
    { waarvoor: "bijhouden wat de AI veranderde", wat: "git", drempel: "installatie", link: "git" },
    { waarvoor: "je regels bij de AI krijgen", wat: "{regelsplek}", drempel: "een bestand", link: "claude-md" }
  ],
  gereedschapNoot: "De volgorde is op drempel, niet op voorkeur. De bovenste rijen zijn voor wie vandaag nog iets wil proberen.",

  /* ---------- Voorbeelden (galerij, groeit nog) ---------- */
  voorbeeldenNoot: "Cursussen, websites en cursusmappen die op deze manier gemaakt zijn, zodat je kan zien waar je naartoe werkt. Deze galerij groeit nog.",

  /* Waarschuwing boven de galerij. Een paar van deze projecten liggen ver
     boven wat een lector met een dag goesting maakt; zonder dit blok leest de
     galerij als een lat waar je niet over geraakt. */
  voorbeeldenWaarschuwing: {
    kop: "Een paar van deze mensen zijn doorgeslagen",
    icoon: "raket",
    tekst: [
      "*En dat is een compliment.* Cloudsystemen van David Verhulst is een eigen webapplicatie met oefenterminals die in de pagina zelf draaien. In Circuit Crawler van Andie Similon schrijft een student een lus van drie stappen, en zet een robot op het scherm drie stappen. Knap gedaan, maar daar zit een technische achtergrond achter die de meesten van ons niet hebben.",
      "Je hoeft daar niet naartoe om hier iets aan te hebben. Onder elk van deze projecten liggen dezelfde twee bestanden als in werkwijze 1, Alles in de browser: een contextmap per hoofdstuk, en een regelsbestand met je eigen afspraken. Die twee maak je zonder één installatie.",
      "Kijk daarom eerst naar de bolletjes onderaan elke kaart. Die zeggen met welke techniek het gebouwd is. Staat er *markdown* bij, dan is de tekst het werk en komt de website er achteraf uit. Staat er *eigen webapplicatie*, dan is er iemand beginnen programmeren."
    ]
  },
  voorbeelden: [
    {
      titel: "Programmeren & OOP",
      maker: "Stephane Van Rossem & Vincent Van Camp",
      wat: "Een cursus C# als website, gebouwd met Docusaurus. Knap detail: er zit een AI-assistent in de pagina zelf, die studenten verder helpt terwijl ze aan de oefeningen zitten.",
      url: "https://vincentvcap.github.io/graduaat-csharp-programmeren/",
      tech: ["Docusaurus", "markdown", "GitHub Pages", "Gemini"]
    },
    {
      titel: "Slides naar sjabloon generator",
      maker: "Ward De Ridder",
      wat: "Resultaat van script (binnenkort beschikbaar) om je markdownbestanden om te zetten naar (in dit geval) de AP-layout (inclusief speakerview én pdfgenerator).",
      url: "https://cursus.hermans.casa/sjabloon/componenten/",
      tech: ["reveal.js", "markdown", "hugo", "github pages"]
    },
    {
      titel: "IT Essentials",
      maker: "Jannes Peeters",
      wat: "Een cursus waar de studenten in de pagina zelf werken: een terminal en een editor die in de browser draaien, quizjes tussendoor, en een stappenplan dat pas verder gaat als het vorige stuk af is.",
      url: "https://it-essentials.apload.be/",
      tech: ["Docusaurus", "Marp", "markdown"]
    },
    {
      titel: "Cloudsystemen",
      maker: "David Verhulst",
      wat: "Interactieve leerstof over webinfrastructuur, met oefenterminals in de pagina en stukken die pas opengaan als je het vorige afgewerkt hebt. Niet uit een documentgenerator, maar als een eigen webapplicatie gebouwd.",
      url: "https://webinfrastructuur-interactive.vercel.app/",
      tech: ["Next.js of React", "Vercel", "eigen webapplicatie"]
    },
    {
      titel: "Zie Scherp Scherper",
      maker: "Tim Dams",
      wat: "Een cursus C# waarbij het handboek, de slides en de website uit dezelfde markdown-bestanden komen. Verbeter je een zin in het hoofdstuk over casting, dan staat ze in alle drie.",
      url: "https://timdams.github.io/ziescherpscherper/",
      tech: ["Quarto", "markdown", "GitHub Pages"]
    },
    {
      titel: "Webontwikkeling",
      maker: "Andie Similon",
      wat: "Een cursus webontwikkeling als website, opgebouwd uit markdown-bestanden met Docusaurus. Onder elke pagina staat een link om ze te verbeteren, en na het opslaan staat de nieuwe versie vanzelf online.",
      url: "https://webontwikkeling.cloud-ap.be/",
      tech: ["Docusaurus", "markdown", "Vercel"]
    },
    {
      titel: "Circuit Crawler",
      maker: "Andie Similon",
      wat: "Het oefenplatform bij de eerste lessen TypeScript. Studenten schrijven code in de pagina en zien een robot hun instructies stap voor stap uitvoeren. Schrijft een student een lus van drie stappen, dan zet de robot drie stappen.",
      url: "https://cc.assimilate.be/",
      tech: ["TypeScript", "eigen webapplicatie"]
    },
    {
      titel: "Git Quest",
      maker: "Jannes Peeters",
      wat: "Git leren als een spel, met opdrachten die je een voor een afwerkt.",
      url: "https://jplectorap.github.io/git-quest/",
      tech: ["Gemini", "react"]
    },
    {
      titel: "Quarto gallery",
      wat: "Voorbeelden van websites, boeken en slides die uit markdown gemaakt zijn. Dit is wat er bij werkwijze 2 en 4 uit kan komen.",
      url: "https://quarto.org/docs/gallery/",
      tech: ["Quarto", "markdown"]
    },
    {
      titel: "R for Data Science",
      wat: "Een handboek dat als website en als boek uit dezelfde bronbestanden komt. Het grote voorbeeld van één bron, alle formaten.",
      url: "https://r4ds.hadley.nz",
      tech: ["Quarto", "markdown", "R"]
    }
  ],

  /* ---------- Colofon: hoe deze site gemaakt is ----------
     Twee dingen die bij elkaar horen: het regelsbestand waarmee deze site
     geschreven is, en wat er ondertussen misging. Het maakt de belofte uit
     "waarom" waar ("Je kan tonen hoe het gemaakt is"), en het geeft de lezer
     een echt regelsbestand te zien in plaats van het advies er een te maken.

     LET OP: "misliep" hieronder is een voorzet, op basis van wat er bij het
     nakijken van deze site effectief gevonden is. Vervang of vul aan met wat
     er bij jou misging; het hoort in jouw woorden te staan, met een cijfer
     erbij waar dat kan. */
  colofon: {
    kop: "Hoe deze site gemaakt is",
    intro: "Deze site is gemaakt zoals ze het zelf voorschrijft: met een contextmap, met een regelsbestand, en met een AI die in de map zelf werkte. Hieronder staat dat regelsbestand, en wat er ondertussen misging.",

    misliepKop: "Wat er misging",
    misliep: [
      "Het regelsbestand hieronder stond er al voor de eerste zin van deze site geschreven werd. Bij het nakijken stonden er negen em-dashes in de tekst, acht beloftes over hoe lang iets zou duren, en drie keer dezelfde zin over waar het meeste te halen valt. Alle drie staan ze met zoveel woorden in de niet-doen-lijst, een paar centimeter lager op deze pagina.",
      "De AI die het bestand leest, is dezelfde die eroverheen schrijft. Wat je opschrijft, kijk je nadien nog altijd zelf na, met de lijst ernaast."
    ],

    regelsKop: "Het regelsbestand van deze site",
    regelsIntro: [
      "Achtentwintig regels, waarvan er elf onder Niet doen staan. Die verhouding is geen toeval: je weet beter wat je stoort dan wat je wil.",
      "Neem het niet over. Jouw regels gaan over jouw vak en jouw studenten, en ze zullen er anders uitzien. Wat je hier wel kan zien, is hoe specifiek een regel moet zijn voor ze iets doet."
    ],

    welKop: "Zo moet het klinken",
    wel: [
      {
        kop: "Open met een terzijde of met een vlakke feitenzin, nooit met een definitie.",
        tekst: "Het terzijde is een grap, een verwijzing of een bekentenis, in cursief, en dan meteen weer aan het werk: “*Aah, Data, een geliefkoosd personage uit Star Trek.* Maar daar ga ik het niet over hebben.” De andere opening is een kale zin met een belofte erachter. Wissel af: twee modules na elkaar dezelfde opening en het is een formule geworden."
      },
      {
        kop: "Het terzijde staat ook midden in de zin, tussen haakjes.",
        tekst: "Daar zeg je wat eerlijker of grappiger is dan de zin toeliet: “technisch rommelige (lees: slechte) overgangen”. De “lees:”-variant zet het harde woord naast het beleefde woord dat eraan voorafgaat. Twee tot drie per module, anders wordt het een tic."
      },
      {
        kop: "De schrijver is aanwezig.",
        tekst: "“Laten we eens onderzoeken”, “het wordt tijd dat we onze werkkledij aantrekken”. Voor de instructie schakel je naar de je-vorm: “Test dit eens”, “Bekijk eens het volgende voorbeeld”."
      },
      {
        kop: "Stel de vraag die de lezer denkt, en antwoord meteen.",
        tekst: "“Wat zou je verwachten als resultaat? Inderdaad: 22,5.” Een kopje mag die vraag zijn: “Wat is casting”, “Casting, conversie of parsing?”"
      },
      {
        kop: "Het beeld komt uit een vak waar je zelf in zit, en je zegt erbij waar je het haalt.",
        tekst: "“Een proces dat wat aanvoelt als het plotten van een verhaal”, “de Steve Jobs-presentatietechniek die ik ook in mijn lessen toepas”. Het keert terug zolang het klopt: appelen en peren, een zwarte doos, de collega die je olod overneemt."
      },
      {
        kop: "Vet is voor de zin die je in de les twee keer zou zeggen, niet voor trefwoorden.",
        tekst: "Hele zinnen mogen vet. Een nieuwe term is vet bij zijn eerste vermelding, daarna plat."
      },
      {
        kop: "Cursief markeert het scharnierwoord van een zin.",
        tekst: "*tijdens*, *waarde*, *niet inpast*, *versmallen*."
      },
      {
        kop: "Noem de verleidelijke fout voor je ze afschiet.",
        tekst: "“Toegegeven, het is verleidelijk om vanaf nu alles met de Convert.To-methoden te doen.” Uit hetzelfde register: “Merk op dat”, “Let echter op dat”."
      },
      {
        kop: "Elke bewering krijgt onmiddellijk een concreet geval, en alles heeft een eigennaam.",
        tekst: "Echte waarden, echt scherm, echte foutboodschap, en ook echte merken en plaatsen. De zaal heet De Zure op de Dageraadplaats, het mengpaneel is een Pioneer FLx/4. 20 en 25 geven 22, niet 22,5. Waar een getal of een schermafbeelding kan staan, staat geen abstracte formulering."
      },
      {
        kop: "Mensen praten in de tekst, letterlijk geciteerd.",
        tekst: "“Drie aparte dames kwamen om rnb vragen, *dan konden ze er aan beginnen*.” Citeer wat een collega zei, wat een student vroeg, wat de AI terugstuurde."
      },
      {
        kop: "Leg hetzelfde in lagen uit.",
        tekst: "Eerst de regel, dan waarom ze bestaat, dan een geval uit de praktijk. Verwijs daarbij hardop terug (“zoals eerder vermeld”)."
      },
      {
        kop: "Laat de lezer nooit alleen bij een fout.",
        tekst: "Wat misgaat, dan de foutboodschap of het foute resultaat, dan de fix. Er staat niemand naast hem."
      },
      {
        kop: "Je noemt je eigen miskleun eerst, en je redt jezelf niet.",
        tekst: "Met een cijfer erbij waar dat kan: “de tot in de puntjes voorbereide set bleek achteraf slechts voor zo’n 30% bruikbaar.” Er komt geen “maar achteraf bekeken” achter."
      },
      {
        kop: "Callouts en kaderblokken zijn voor de uitzondering, de valkuil en het extraatje.",
        tekst: "Nooit voor een samenvatting."
      },
      {
        kop: "Een onderschrift bij een figuur is een feit, geen titel.",
        tekst: "“Casting naar `int` gooit alles na de komma weg, ook bij `20.9`. Er wordt niet afgerond.”"
      },
      {
        kop: "Spreektaal mag, en af en toe moet ze.",
        tekst: "“Eens”, “een dikke foutboodschap”, “goed testen is de boodschap”, “toegegeven”, “better safe than sorry”. Vlaams register, geen Hollands, en volkse woorden zonder verontschuldiging: “gepruts”, “op z’n gat gevallen”, “goesting”, “afwimpelen”. Engels jargon blijft onvertaald: prompt, context, skill, repo."
      },
      {
        kop: "Korte zinnen, en af en toe een hele korte om iets te laten landen.",
        tekst: "“Dit zal niet gaan.”"
      }
    ],

    nietKop: "Niet doen",
    niet: [
      {
        kop: "Geen em-dashes.",
        tekst: "Gebruik een gewoon streepje, een dubbele punt, haakjes of een nieuwe zin."
      },
      {
        kop: "Geen samenvattende wijze slotzin.",
        tekst: "Stop na het laatste feit. Eindigen op een praktische instructie of op een terzijde mag wel. De hardnekkigste vorm is de afronder die een waardeoordeel geeft en geen feit: “alles daarna is bonus”, “dat is het hele idee”. Schrap de zin en kijk of er een feit verdwijnt."
      },
      {
        kop: "Geen abstract woord op de plek van het ding zelf.",
        tekst: "“Je hebt er iets tastbaars aan het eind”, “daar maak je iets dat je aan een collega kan tonen”: er staan vijf documenten met een regel bij elk, of er staat niets."
      },
      {
        kop: "Geen symmetrische antithese, waar ze ook staat.",
        tekst: "De vormen die telkens terugkeren: “Dat is geen X, dat is Y”, “Het gaat niet over X, het gaat over Y”, “X, en niet Y”. “In plaats van” is dezelfde figuur in vermomming. Contrast dat een mechanisme uitlegt (“in het eerste geval gebeurt X, in het tweede Y”) mag wel."
      },
      {
        kop: "Test elke zin met een ontkenning erin: staat er een feit in de ontkende helft?",
        tekst: "Zo nee, schrappen en enkel de bevestigende helft houden. “Dat is geen ergernis, dat is een signaal” wordt “Alles wat je een derde keer corrigeert, is een afspraak die je nooit hebt opgeschreven”. Haalt de ontkende helft de test wel, dan mag ze blijven staan: “begin met drie regels en niet met twintig” blijft, want twintig is precies wat de lezer zou doen."
      },
      {
        kop: "Geen tel-formules als stijlbloempje.",
        tekst: "“Drie tools, hetzelfde idee.” Een aangekondigde opsomming (“dit kan op drie manieren”) is geen tel-formule en mag wel."
      },
      {
        kop: "Geen bullets over “de kracht van AI”.",
        tekst: ""
      },
      {
        kop: "Geen emoji in de cursustekst.",
        tekst: "In de slides mag ze wel."
      },
      {
        kop: "Getallen tot twintig voluit.",
        tekst: "“3 aparte dames” is blogsnelheid en leest in een cursus als slordigheid."
      },
      {
        kop: "Geen tijdsaanduidingen, waar dan ook.",
        tekst: "Geen duur boven een module, geen minuten in de tekst, geen “reken op een namiddag”, en geen belofte over tijdwinst. Ook niet in het negatief (“verspilde tijd”) en niet als vergelijking (“dan ben je in Word sneller klaar”). Wat de aanpak vraagt aan materiaal mag je wel benoemen: er lag twintig jaar cursusmateriaal klaar, en zonder dat begint het werk vroeger."
      },
      {
        kop: "De matrix niveau x module niet volschrijven.",
        tekst: "Waar een hoger niveau een zin oplevert, schrijf je die zin onderaan de hoofdtekst en geen apart blok."
      }
    ],

    slot: "Dit bestand is niet vooraf geschreven. De meeste regels staan erin omdat dezelfde correctie een derde keer langskwam, en de regel over em-dashes staat er omdat er negen in de tekst stonden."
  },

  /* ---------- Links ---------- */

  links: {
    "quarto":               { naam: "Quarto", url: "https://quarto.org", noot: "één installatie, en pandoc zit erin" },
    "quarto-docx":          { naam: "Quarto naar Word", url: "https://quarto.org/docs/output-formats/ms-word.html", noot: "met een referentiedocument voor je sjabloon" },
    "quarto-pptx":          { naam: "Quarto naar PowerPoint", url: "https://quarto.org/docs/presentations/powerpoint.html", noot: "tekst en beeld op sjabloonlay-outs" },
    "quarto-html":          { naam: "Quarto naar html", url: "https://quarto.org/docs/output-formats/html-basics.html", noot: "" },
    "quarto-typst":         { naam: "Quarto met typst", url: "https://quarto.org/docs/output-formats/typst.html", noot: "pdf zonder LaTeX" },
    "quarto-revealjs":      { naam: "Quarto revealjs", url: "https://quarto.org/docs/presentations/revealjs/", noot: "slides in de browser" },
    "quarto-book":          { naam: "Quarto book", url: "https://quarto.org/docs/books/", noot: "één bron, website en pdf" },
    "quarto-brand":         { naam: "Quarto brand.yml", url: "https://quarto.org/docs/authoring/brand.html", noot: "kleuren en fonts één keer opschrijven" },
    "pandoc":               { naam: "pandoc", url: "https://pandoc.org", noot: "de motor onder de omzetting" },
    "writage":              { naam: "Writage", url: "https://www.writage.com", noot: "markdown in Word, betalend na veertien dagen" },
    "pandoc-refdoc":        { naam: "pandoc, optie reference-doc", url: "https://pandoc.org/MANUAL.html#option--reference-doc", noot: "jouw bestaande .docx of .pptx als sjabloon" },
    "marp":                 { naam: "Marp", url: "https://marp.app", noot: "slides uit markdown, extensie in VS Code" },
    "mermaid":              { naam: "mermaid", url: "https://mermaid.js.org", noot: "tekst die een figuur wordt" },
    "mermaid-live":         { naam: "mermaid live editor", url: "https://mermaid.live", noot: "plakken en meteen zien, zonder installatie" },
    "excalidraw":           { naam: "Excalidraw", url: "https://excalidraw.com", noot: "met de hand tekenen in je browser" },
    "vscode":               { naam: "VS Code", url: "https://code.visualstudio.com", noot: "" },
    "obsidian":             { naam: "Obsidian", url: "https://obsidian.md", noot: "markdown schrijven zonder aan mappen te denken" },
    "typora":               { naam: "Typora", url: "https://typora.io", noot: "" },
    "typst":                { naam: "typst", url: "https://typst.app", noot: "" },
    "git":                  { naam: "git", url: "https://git-scm.com", noot: "zien wat er veranderde, en het terugdraaien" },
    "gdocs":                { naam: "Google Docs", url: "https://docs.google.com", noot: "importeert en exporteert markdown, in beide richtingen" },
    "claude-projects":      { naam: "Claude Projects", url: "https://claude.ai/projects", noot: "je bestanden blijven staan tussen twee gesprekken" },
    "chatgpt":              { naam: "ChatGPT", url: "https://chatgpt.com", noot: "Projects staan in de zijbalk, met bestanden en instructies per project" },
    "openai-help":          { naam: "Hulp bij ChatGPT", url: "https://help.openai.com", noot: "zoek er op projects en custom instructions" },
    "gemini":               { naam: "Gemini", url: "https://gemini.google.com", noot: "Gems zijn de plek voor je instructies" },
    "notebooklm":           { naam: "NotebookLM", url: "https://notebooklm.google.com", noot: "je documenten als bronnen, en alles verwijst terug naar de bron" },
    "gemini-cli":           { naam: "Gemini CLI", url: "https://github.com/google-gemini/gemini-cli", noot: "Gemini in je eigen map, leest GEMINI.md" },
    "gemini-help":          { naam: "Hulp bij Gemini", url: "https://support.google.com/gemini", noot: "" },
    "openrouter":           { naam: "OpenRouter", url: "https://openrouter.ai", noot: "één account voor veel verschillende modellen" },
    "copilot-chat":         { naam: "Aan de slag met Copilot Chat", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/get-started-with-microsoft-365-copilot-chat", noot: "de handleiding van Microsoft zelf, met de knoppen erbij" },
    "copilot-notebooks":    { naam: "Copilot Notebooks", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks", noot: "je bestanden blijven staan tussen twee gesprekken" },
    "copilot-notebook-instructies": { naam: "Instructies voor je notebook", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/provide-custom-instructions-for-your-microsoft-365-copilot-notebook", noot: "je afspraken, geldig in elk gesprek in dat notebook" },
    "copilot-referenties":  { naam: "Referenties toevoegen", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/add-references-to-your-microsoft-365-copilot-notebook", noot: "welke bestanden erin gaan, en hoeveel" },
    "copilot-verwijzen":    { naam: "Verwijzen met een schuine streep", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/refer-to-specific-files-and-more-in-microsoft-365-copilot", noot: "een / in het promptvenster, en dan de naam van je bestand" },
    "copilot-licentie":     { naam: "Copilot Chat met en zonder licentie", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/how-copilot-chat-works-with-and-without-a-microsoft-365-copilot-license", noot: "wat er wegvalt zonder de betalende licentie" },
    "copilot-modellen":     { naam: "Welk model er in Copilot zit", url: "https://techcommunity.microsoft.com/blog/microsoft365copilotblog/available-today-openai%E2%80%99s-gpt-5-6-in-microsoft-365-copilot/4533152", noot: "Microsoft kondigt zelf aan wat er onder Word, Excel en de chat draait" },
    "copilot-toegang":      { naam: "Standaardtoegang of voorrang", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/standard-versus-priority-access-to-features-in-microsoft-365-copilot-chat", noot: "wat er op drukke momenten wegvalt zonder licentie" },
    "copilot-welke-licentie": { naam: "Welke Copilot-licentie heb ik?", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/what-copilot-license-do-i-have", noot: "zelf na te kijken, zonder je ICT-dienst" },
    "copilot-pages":        { naam: "Copilot Pages", url: "https://support.microsoft.com/nl-nl/microsoft-365-copilot/get-started-with-microsoft-365-copilot-pages", noot: "een gesprek bewaren als pagina, en omzetten naar Word" },
    "copilot-web":          { naam: "Copilot-app en copilot.microsoft.com", url: "https://copilot.microsoft.com", noot: "hier zitten de knoppen “Notebooks” en “Leren”" },
    "copilot-instructions": { naam: "GitHub Copilot instructions", url: "https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot", noot: "de Copilot in je editor, niet die in Word" },
    "claude-md":            { naam: "CLAUDE.md", url: "https://docs.claude.com/en/docs/claude-code/memory", noot: "je afspraken in een bestand" },
    "claude-code":          { naam: "Claude Code", url: "https://docs.claude.com/en/docs/claude-code/overview", noot: "de AI werkt in de map zelf" },
    "skills":               { naam: "Agent Skills", url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview", noot: "een instructie die bij één soort taak hoort" },
    "claude-cowork":        { naam: "Aan de slag met Claude Cowork", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork", noot: "de AI in je eigen map, zonder commandovenster" },
    "claude-cowork-projecten": { naam: "Projecten in Cowork", url: "https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork", noot: "instructies, een map van je schijf en een geheugen per project" },
    "claude-skills":        { naam: "Skills in Claude", url: "https://support.claude.com/en/articles/12512180-use-skills-in-claude", noot: "een zip met je SKILL.md, onder Customize > Skills" }
  }
};
