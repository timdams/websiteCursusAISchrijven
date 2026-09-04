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
      bijschrift: "Bij 1 en 2 hou je je bestanden zelf vast, bij 3 en 4 laat je de AI erin schrijven. De meeste lesgevers blijven bij 1, en daar valt al het meeste te halen."
    }
  },

  /* ---------- Waarom je dit doet: de winst achter de vier stappen ---------- */
  waaromKop: "Waarom je dit doet",
  waaromNoot: "Je afspraken en je materiaal één keer op orde zetten kost een namiddag. Dat is de moeite, want:",
  waarom: [
    {
      kop: "Je herhaalt jezelf niet meer.",
      tekst: "Wat één keer opgeschreven staat, hoef je niet in elk nieuw gesprek opnieuw uit te leggen. Dat scheelt telkens de eerste tien minuten."
    },
    {
      kop: "Het werkt ook op een gratis of goedkoop account.",
      tekst: "Wat je meegeeft weegt zwaarder dan wat je betaalt. Wie zijn materiaal en zijn afspraken klaar heeft staan, moet minder vaak iets overdoen — en loopt dus veel later tegen zijn limiet aan."
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
      wat: "Je begint niet bij je cursus maar bij één hoofdstuk: dat waar je zelf het minst tevreden over bent, want daar zie je het verschil. Dat zet je om, je legt je afspraken ernaast, en pas dan laat je herwerken.",
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
      wat: "De winst zit niet in het maken maar in het gelijk houden. Slides die achterlopen op je tekst zijn het probleem dat elk jaar terugkomt, en daar bestaat een afspraak voor die je één keer opschrijft.",
      eerst: "Neem het hoofdstuk waarvan je nu al weet dat de slides niet meer kloppen.",
      prompts: ["omzetten", "slides-sync", "oefeningen"]
    },
    {
      id: "nieuw",
      label: "een cursus die er nog niet is, van nul beginnen",
      hulp: "je begint met een leeg blad",
      planKop: "Een nieuwe cursus opzetten",
      wat: "Vraag niet om hoofdstuk 1. Begin bij de inhoudsopgave: hoofdstukken, met per hoofdstuk wat de student erna kan. Dat blad keur jij goed of niet, het kost tien minuten, en het bepaalt al de rest.",
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
        ["Met Quarto of pandoc", "`pandoc hoofdstuk.docx -o hoofdstuk.md --wrap=none --extract-media=media`", "installeren"]
      ],
      letop: "Twee dingen die je vooraf goedzet, schelen achteraf uren. Heb je je titels vet gemaakt in plaats van als “Kop 1” opgemaakt, dan komen er geen titels uit en krijg je één lange lap tekst: zet die stijlen eerst juist. En je afbeeldingen belanden in de map `media` met namen als `rId10.png`, dus hernoem ze meteen.",
      letopBrowser: "Eén ding dat je vooraf goedzet, scheelt achteraf uren. Heb je je titels vet gemaakt in plaats van als “Kop 1” opgemaakt, dan komen er geen titels uit en krijg je één lange lap tekst. Zet die stijlen eerst juist in Word, en zet dan pas om.",
      links: ["pandoc", "quarto-docx", "gdocs"]
    },
    {
      id: "ppt",
      label: "alleen PowerPoint (.pptx)",
      advies: "In je slides staan trefwoorden, de lopende tekst zit in je notities of in je hoofd. Haal die twee apart op: de slides geven je de structuur, de notities de tekst.",
      routes: [
        ["Zonder iets te installeren", "Exporteren → Hand-outs maken → in Word. Je krijgt je slides met de notities ernaast in een tabel. Dat is de gewone export die je notities wél meeneemt."],
        ["Met Quarto of pandoc", "`pandoc les.pptx -o les.md` — dit pakt ook de losse tekstvakken en je tabellen mee. Je hebt er wel pandoc 3.8.3 of nieuwer voor nodig; oudere versies kunnen pptx helemaal niet lezen.", "installeren"]
      ],
      letop: "Opslaan als → Overzicht/RTF bestaat en werkt, maar neemt alleen de tekst mee die in de tekstvakken van de dia-indeling staat. Wat je zelf als los tekstvak op een dia zette, plus je tabellen, SmartArt en al je notities, blijft achter zonder dat je een waarschuwing krijgt. Prima als je slides netjes in de indeling zijn opgebouwd, riskant bij slides die door de jaren heen bij elkaar gegroeid zijn. Ook pandoc laat je notities vallen: wil je die mee, ga dan via Hand-outs maken, en kijk na of ze er staan.",
      letopBrowser: "Opslaan als → Overzicht/RTF bestaat en werkt, maar neemt alleen de tekst mee die in de tekstvakken van de dia-indeling staat. Wat je zelf als los tekstvak op een dia zette, plus je tabellen, SmartArt en al je notities, blijft achter zonder dat je een waarschuwing krijgt. Ga daarom via Hand-outs maken, en kijk na of je notities er echt bij staan.",
      links: ["pandoc", "quarto-pptx"]
    },
    {
      id: "pdf-tekst",
      label: "pdf waar je tekst in kan selecteren",
      advies: "Zoek eerst het Word- of LaTeX-bestand waar die pdf uit gemaakt is. Een pdf is een eindformaat, geen bron: hij bewaart hoe de bladzijde eruitziet, niet hoe ze in elkaar zit.",
      routes: [
        ["Zonder iets te installeren", "Open de pdf gewoon in Word (Bestand → Openen). Word maakt er een bewerkbaar document van; bewaar dat als .docx en volg dan het Word-advies. Of laad de pdf op in je project en vraag het hoofdstuk terug als markdown."],
        ["Met Quarto of pandoc", "Werkt hier niet: pandoc kan pdf wel maken, maar niet lezen. Ga eerst langs Word of langs je AI-tool.", "installeren"]
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
        ["Met Quarto of pandoc", "`pandoc pagina.html -o pagina.md` — uit html komt de nettere markdown van de twee, want de koppen en lijsten zitten er al in.", "installeren"]
      ],
      letop: "Doe eerst één pagina helemaal rond: eruit, omzetten, herwerken, en er weer in. Pas als dat rondje werkt, begin je aan de andere twintig.",
      links: ["pandoc"]
    },
    {
      id: "verspreid",
      label: "verspreid over jaren en versies",
      advies: "Kies één versie als de echte voor je iets oplaadt. Dat is hier het echte werk, en het is werk dat alleen jij kan doen.",
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
      letop: "De verleiding is om meteen om hoofdstuk 1 te vragen. Doe eerst die inhoudsopgave: ze kost tien minuten en ze bepaalt al de rest.",
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
      kern: "Eén document per hoofdstuk, samen op één plek: {projectplek}. Dat is de vorm waar al de rest op steunt — je contextmap, je afspraken, en elke vraag die je later stelt.",
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
      slot: "Wie bij werkwijze 1 blijft, haalt nog altijd het meeste van wat er te halen valt.",
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
        wat: "Werkwijze 2 is dezelfde werkwijze met één installatie erbij: Quarto. Uit hetzelfde bestand rolt dan een Word-document in jouw sjabloon, een pdf of slides. Je bestanden blijven van jou, de AI schrijft er nog altijd niet in.",
        nognietnodig: "Niet nu. Doe eerst één hoofdstuk helemaal rond in de browser. Pas als je dat twee of drie keer gedaan hebt, weet je of dit je tijd waard is."
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
      naam: "Browser plus Quarto",
      pitch: "Zelfde als werkwijze 1, met één installatie erbij.",
      uitleg: "Uit hetzelfde markdown-bestand komt een Word-document, een pdf, een webpagina of slides. Pandoc zit in Quarto ingebakken.",
      punten: [
        "moet je verplicht in het sjabloon van je school aanleveren, dan is dit je werkwijze. Quarto en pandoc nemen een bestaand .docx of .pptx over als referentie",
        "slides komen uit dezelfde bron als je cursustekst",
        "je bestanden blijven van jou. De AI ziet ze, ze schrijft er niet in"
      ],
      slot: "",
      installeren: "Quarto",
      voorwie: "wie in een verplicht sjabloon moet aanleveren, en wie formules of code in zijn cursus heeft",
      stappen: [
        "Installeer Quarto. Pandoc zit erin, dat hoef je niet apart te doen.",
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
        "plat": "Uit hetzelfde markdown-bestand komt Word, pdf, html of slides. Dit is de stap waarvoor je Quarto installeert.",
        "contextmap": "Zelfde als werkwijze 1: je documenten staan in {projectplek}.",
        "regels": "Je regels staan in {regelsplek} en als .md-bestand naast je cursus, zodat ze bij je bestanden blijven.",
        "skills": "Een skill is nog altijd een document dat je erbij haalt. Het automatische deel begint bij werkwijze 3.",
        "lesmateriaal": "Hier zit je winst: een referentiedocument neemt het sjabloon van je school over, en typst maakt je pdf zonder LaTeX."
      },
      links: ["quarto", "quarto-docx", "quarto-pptx", "quarto-typst", "pandoc-refdoc", "vscode", "mermaid"]
    },
    "3": {
      nr: "3",
      naam: "De AI werkt in je map",
      pitch: "De AI werkt in je eigen bestanden, in de map waar ze al stonden.",
      uitleg: "Je draagt niets meer heen en weer, en je kijkt na wat er veranderd is.",
      punten: [
        "je regels staan in {regelsbestand} in die map",
        "vanaf hier lonen skills, want je geeft dezelfde uitleg vaker dan je denkt",
        "zet je map in git (versiebeheer) voor je de AI erin laat schrijven. Anders zie je niet wat er veranderde"
      ],
      slot: "",
      installeren: "een tool die in je map werkt, plus git",
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
        nognietnodig: "Zet de opbouw klaar op een dag dat er nog niets in staat. Achteraf overschakelen is een bouwdag."
      },
      overslaan: "De volledig automatische verwerking uit werkwijze 4 hoeft niet. Hier blijft het bij de bestanden die je al had.",
      onderwerpen: {
        "plat": "De AI schrijft rechtstreeks in je bestanden. Git is hier geen extraatje, want anders zie je niet wat er veranderde.",
        "contextmap": "Je contextmap is een map op je schijf. De tool leest ze zonder dat je iets oplaadt.",
        "regels": "{regelsbestand} in die map. Het geldt voor alles wat in die map gebeurt.",
        "skills": "Vanaf hier lonen skills, want je geeft dezelfde uitleg vaker dan je denkt.",
        "lesmateriaal": "Slides en oefeningen komen uit dezelfde map. Zet de controle-afspraak (kloppen de slides nog bij de tekst?) in je regelsbestand."
      },
      links: ["claude-md", "claude-code", "gemini-cli", "git", "vscode", "quarto"]
    },
    "4": {
      nr: "4",
      naam: "Eén bron, alle formaten",
      pitch: "Eén map met versiebeheer, waar website, syllabus, slides en oefeningen uit dezelfde bestanden komen.",
      uitleg: "Elke wijziging in de tekst kan meteen doorwerken in alle formaten, met een geschiedenis erbij.",
      punten: [
        "zet de opbouw klaar op de dag dat er nog niets in staat. Anders wordt de laatste dag een bouwdag",
        "de afspraak die dit sluitend maakt: zet in je regelsbestand dat de slides gecontroleerd worden als de tekst van een hoofdstuk verandert",
        "elf regels in _brand.yml leggen je kleuren en lettertypes één keer vast, voor je website, je slides en je pdf samen"
      ],
      slot: "",
      installeren: "Quarto, git, een editor",
      voorwie: "een cursus die jaren meegaat, en waar meer dan één formaat uit moet",
      stappen: [
        "Zet de map en de rendering klaar met een leeg hoofdstuk erin, en maak website en pdf voor er inhoud in staat.",
        "Zet je {regelsbestand} en _brand.yml in de hoofdmap.",
        "Schrijf pas daarna je eerste hoofdstuk. Anders wordt de laatste dag een bouwdag."
      ],
      overslaan: "Niks. Alles uit het naslagwerk geldt hier, en de controle-afspraak voor de slides is wat het sluitend maakt.",
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
    { id: "softwarecentrum", label: "een laptop van school met een softwarecentrum", gevolg: "Kijk of Quarto en VS Code erin staan. Zo ja, dan ligt werkwijze 2 open en beslist de volgende vraag.", vervolg: true },
    { id: "eigen-laptop", label: "mijn eigen laptop", gevolg: "Werkwijze 2, 3 of 4. De volgende vraag beslist.", vervolg: true },
    { id: "wil-niet", label: "ik mag installeren maar ik wil er niet aan", gevolg: "Werkwijze 1. Daar blijven de meeste lesgevers, en daar valt het meeste te halen.", werkwijze: "1" }
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
    { id: "docx", label: "Word in het sjabloon van je school", advies: "pandoc of Quarto, met jouw sjabloon als referentiedocument (--reference-doc=sjabloon.docx).", links: ["pandoc-refdoc", "quarto-docx"] },
    { id: "pptx", label: "PowerPoint in het sjabloon van je school", advies: "Idem, naar pptx. Wat je terugkrijgt is tekst en beeld op sjabloonlay-outs. Animaties en fijne plaatsing doe je nog altijd in PowerPoint zelf.", links: ["pandoc-refdoc", "quarto-pptx"] },
    { id: "moodle-html", label: "een pagina op het leerplatform, de editor slikt html", advies: "Zet je markdown om naar html en plak dat.", links: ["quarto-html", "pandoc"] },
    { id: "moodle-geen-html", label: "een pagina op het leerplatform, de editor slikt geen html", advies: "Via Word, en aanvaard dat de opmaak daar deels sneuvelt.", links: ["quarto-docx"] },
    { id: "pdf", label: "een pdf om te printen", advies: "Quarto met typst als motor. Je moet geen LaTeX installeren.", links: ["quarto-typst", "typst"] },
    { id: "slides", label: "slides", advies: "Marp als extensie in VS Code, of Quarto met reveal.js.", links: ["marp", "quarto-revealjs"] },
    { id: "oefeningen", label: "oefeningen en examens", advies: "Zelfde contextmap, andere vraag. Vraag de foute antwoorden erbij met een reden per fout, en vraag drie moeilijkheidsgraden in één keer. Je gooit er twee weg en dat is prima.", links: [] },
    { id: "schema", label: "een schema of een tijdlijn", advies: "mermaid: tekst die een figuur wordt, en die meeverandert met je cursus. Snel iets uittekenen met de hand gaat met Excalidraw, zonder installatie.", links: ["mermaid", "mermaid-live", "excalidraw"] },
    { id: "weet-ik-niet", label: "weet ik nog niet", advies: "Vraag je tekst in markdown. Dan blijft alles hierboven mogelijk.", links: [] }
  ],
  outputNoot: "Deze vraag stel je pas als je weet wat je moet aanleveren. Weet je het nog niet, vraag je tekst dan in markdown en stel de vraag uit.",

  /* ---------- Valkuilen ---------- */
  valkuilen: [
    { klacht: "het verzint dingen die niet bij mijn vak passen", fix: "Je contextmap is te dun. Zet er ook iets in dat niet in je cursus staat: je beginsituatie, wat studenten vorig jaar niet begrepen, de feedback van een collega.", onderwerp: "contextmap", links: [] },
    { klacht: "het klinkt niet als mij", fix: "Je regels staan nergens opgeschreven. Geef twee stukken die je zelf schreef en vraag welke regels die tekst volgt. Beschrijf je toon niet zelf, want “vlot en toegankelijk” levert precies niks op.", onderwerp: "regels", links: ["claude-md"] },
    { klacht: "ik moet elke keer hetzelfde corrigeren", fix: "Alles wat je een derde keer corrigeert, hoort in je regelsbestand.", onderwerp: "regels", links: ["claude-md"] },
    { klacht: "ik moet dat alleen bij één soort taak zeggen", fix: "Dat wordt een skill. Je regelsbestand is voor wat altijd geldt.", onderwerp: "skills", links: ["skills"] },
    { klacht: "het herschrijft ook wat al goed was", fix: "Kleinere stukken geven, en je bestanden in versiebeheer zetten zodat je ziet wat er veranderde.", onderwerp: "plat", links: ["git"] },
    { klacht: "halverwege vergeet het wat we afgesproken hadden", fix: "Je gesprek is te lang. Nieuw gesprek, een bestand per hoofdstuk.", onderwerp: "plat", links: [] },
    { klacht: "ik zit aan mijn limiet", fix: "Eén hoofdstuk per gesprek, en zet je afspraken in een bestand. Dan begint een nieuw gesprek niet van nul.", onderwerp: "regels", links: [] },
    { klacht: "het antwoord is lang en zegt niets", fix: "Vraag wat eruit kan zonder dat er een feit verdwijnt. Dat levert bijna altijd een regel op.", onderwerp: "regels", links: [] },
    { klacht: "de opmaak valt uiteen in de pdf", fix: "Dit blijft handwerk. Wat op een webpagina klopt, valt in een pdf uiteen op de plek waar je het niet verwacht.", onderwerp: "lesmateriaal", links: ["quarto-typst"] },
    { klacht: "ik weet niet meer wat er veranderd is", fix: "git (versiebeheer), of minstens een kopie met de datum in de naam.", onderwerp: "plat", links: ["git"] },
    { klacht: "ik laadde iets op dat ik beter niet had gedeeld", fix: "Loop het materiaalfilter uit de keuzehulp vooraf af: werk van studenten of leerlingen blijft altijd buiten, materiaal van collega's vraag je eerst. Verwijder het bestand uit je project, en vraag bij twijfel na wat de afspraken op je school zijn.", onderwerp: "contextmap", links: [] }
  ],

  /* ---------- Randgevallen ---------- */
  randgevallen: [
    { geval: "je deelt het vak met twee collega's", wat: "Begin met je eigen hoofdstukken. Het regelsbestand is wat je later samen aanvult." },
    { geval: "je cursus is grotendeels formules of code", wat: "Markdown houdt die intact, Word verkleutert ze. Dit is het argument voor werkwijze 2." },
    { geval: "je cursus zit vol afbeeldingen", wat: "Haal ze uit de tekst en verwijs ernaar. Ingebedde afbeeldingen gaan bij elke omzetting een beetje meer kapot." },
    { geval: "je hebt geen twee teksten waarvan je weet dat ze goed zijn", wat: "Een mail aan studenten en een stuk uit je slidenotities doen het ook. Twee registers is wat je nodig hebt." },
    { geval: "je bent tevreden over je cursus", wat: "Dan hoef je niets te herwerken. Gebruik dezelfde contextmap voor je oefeningen en toetsen." },
    { geval: "je probeerde het al eens en het viel tegen", wat: "Dan ben je precies waar deze site voor gemaakt is. Waarschijnlijk ontbrak je contextmap of je regelsbestand." },
    { geval: "je directie of opleidingshoofd wil hier voorlopig niets van weten", wat: "Schrijf ondertussen je regels op. Dat bestand is van jou en werkt in elke tool." }
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
      waarom: "Dan heb je Copilot waarschijnlijk al, zonder iets extra te betalen of te installeren. Er is ook een aparte Copilot-app met een knop “Leren”, met kant-en-klare opdrachten voor lesgevers. Vraag na wat de licentie van je school precies dekt, want dat verschilt."
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
      waarom: "Ook goed. Uitproberen lukt prima in een gratis venster; bij een hele cursus loop je tegen de limieten. Begin ondertussen bij je afspraken: schrijf drie regels op die je al drie keer hebt moeten zeggen, in een gewoon Word-bestand. Dat bestand werkt in elke tool die je later kiest."
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
      skill: "een document in het project. In een map: .claude/skills/naam/SKILL.md",
      inmap: "Ja. Claude Code werkt in de map zelf. Op een strak beheerde schoollaptop raakt dat er meestal niet op.",
      waar: "Projects staan in de zijbalk. Je maakt er een aan, sleept je documenten erin, en zet je regels in de projectinstructies.",
      termen: {
        regelsbestand: "CLAUDE.md",
        regelsplek: "de projectinstructies",
        projectplek: "een Project",
        skillplek: "een document in je project"
      },
      links: ["claude-projects", "claude-md", "claude-code", "skills"]
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
      links: ["gemini", "notebooklm", "gemini-cli", "gemini-help"]
    },
    {
      id: "copilot",
      naam: "Microsoft Copilot",
      kort: "Copilot via je werk- of schoolaccount",
      betaald: "Hangt aan je Microsoft 365-licentie. Vraag na wat je school daarvoor voorziet.",
      plek: "een map op je OneDrive of SharePoint. Copilot kijkt naar de bestanden waar jij al bij kan",
      regels: "een Word-bestand met je afspraken, waar je in je prompt naar verwijst",
      skill: "hetzelfde: een apart Word-bestand per soort taak",
      inmap: "De Copilot in Word en PowerPoint werkt niet in een eigen map. De GitHub Copilot in VS Code is een andere: die leest .github/copilot-instructions.md en hoort bij werkwijze 3 en 4.",
      waar: "Copilot zit in Word, PowerPoint en Teams, maar er is ook een aparte Copilot-app (en copilot.microsoft.com) waar je gewoon een gesprek voert. Daar hoort de knop “Leren” bij, met kant-en-klare hulpprogramma’s voor onderwijs. Zet je documenten in één map op OneDrive en verwijs ernaar.",
      termen: {
        regelsbestand: ".github/copilot-instructions.md",
        regelsplek: "een Word-bestand met je afspraken",
        projectplek: "een map op OneDrive of SharePoint",
        skillplek: "een apart Word-bestand"
      },
      wistjedat: {
        kop: "Je hebt ook de Copilot-app zelf, met een knop “Leren”",
        tekst: [
          "Copilot via je werk of school is meer dan het zijbalkje in Word, Teams en Outlook. Er is ook een aparte Copilot-app (en copilot.microsoft.com) waar je gewoon een gesprek voert, bestanden oplaadt en een hele les uitschrijft. Veel mensen weten niet dat die bij hun licentie zit.",
          "In die app staat links een knop “Leren”. Daaronder vind je “Hulpprogramma’s voor onderwijs”: kant-en-klare opdrachten voor lesgevers, zodat je niet met een leeg venster hoeft te beginnen.",
          "Er staan er vier soorten: curriculumplanning, bestaande inhoud wijzigen (leesniveau aanpassen, differentiëren, voorbeelden toevoegen), huiswerk en evaluaties, en trainingsactiviteiten. Klik er een aan en je krijgt de prompt al ingevuld."
        ],
        afbeelding: "assets/copilot-leren.png",
        alt: "Schermafbeelding van de Copilot-app. In de zijbalk staat “Leren” aangeklikt; rechts staan de hulpprogramma’s voor onderwijs: curriculumplanning, bestaande inhoud wijzigen, huiswerk en evaluaties en trainingsactiviteiten.",
        bijschrift: "De knop “Leren” in de Copilot-app. Klik op de afbeelding om ze groter te bekijken.",
        slot: "Een goed startpunt, maar zo’n kant-en-klare opdracht kent jouw cursus niet. Wat eruit komt wordt pas van jou als je er je eigen contextmap en je eigen regels naast legt — en als je het nakijkt.",
        planregel: "Open de Copilot-app (of copilot.microsoft.com) en klik links op “Leren”. Daar staan kant-en-klare hulpprogramma’s voor onderwijs: curriculumplanning, bestaande inhoud herwerken, huiswerk en evaluaties."
      },
      links: ["copilot-m365", "copilot-web", "copilot-instructions"]
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
      links: ["openrouter"]
    },
    {
      id: "gratis",
      naam: "Nog geen",
      /* in de vraag staat er meer dan de naam: wie het niet weet, moet dit
         antwoord durven aanklikken. Daarna volgt het keuzescherm. */
      vraaglabel: "Nog geen, of ik weet het nog niet",
      kort: "kies dit gerust — het volgende scherm helpt je kiezen",
      geenaccount: true,
      betaald: "Uitproberen lukt prima gratis. Bij een hele cursus loop je tegen de limieten.",
      plek: "niks dat blijft staan. Elk gesprek begint van nul, en je laadt je bestanden opnieuw op",
      regels: "een Word-bestand dat je bovenaan je prompt plakt",
      skill: "hetzelfde document, dat je erbij haalt als die taak langskomt",
      inmap: "Werkwijze 1 is je werkwijze, en daar valt het meeste te halen.",
      waar: "Wat je nu al kan doen: schrijf drie regels op die je al drie keer hebt moeten zeggen. Dat bestand werkt in elke tool die je later kiest.",
      termen: {
        regelsbestand: "je regelsbestand",
        regelsplek: "een Word-bestand dat je bovenaan je prompt plakt",
        projectplek: "een map op je eigen schijf",
        skillplek: "een document dat je erbij haalt"
      },
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
      watis: "Je vraagt de tekst zonder opmaak (markdown), en je doet de opmaak op het einde, in één keer.",
      kern: "Het formaat waarin je de AI laat schrijven, bepaalt hoeveel werk al de rest is.",
      tips: [
        "Vraag alles in markdown, ook als je resultaat een Word-document of een pdf wordt. Markdown is platte tekst met een paar tekens erin voor titels en vet. Het opent in Kladblok.",
        "Van markdown naar Word, pdf, html of slides gaat automatisch. Van Word terug naar iets anders gaat met de hand.",
        "Werk in een bestand per hoofdstuk. Een chatvenster met vijf hoofdstukken erin verliest de draad, en jij vindt er achteraf niks meer in terug.",
        "Laat afbeeldingen buiten de tekst staan, met een verwijzing ernaar. Ingebedde afbeeldingen gaan bij elke omzetting een beetje meer kapot.",
        "Doe de omzetting in twee stappen: eerst omzetten naar markdown, dat nakijken, en pas dan laten herwerken.",
        "En hoe krijg je er weer opmaak op? Drie niveaus: niks installeren (de AI zet dat ene document om, of Google Docs), één installatie (Quarto), en de motor eronder (pandoc)."
      ],
      gevorderd: [
        "Moet je in het sjabloon van je school aanleveren? Pandoc en Quarto nemen een bestaande PowerPoint of een bestaand Word-document over als referentie, met --reference-doc=sjabloon.pptx. Dat is werkwijze 2 en verder.",
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
      kern: "Wat er in die map zit, bepaalt het resultaat meer dan hoe je de vraag stelt.",
      tips: [
        "Vijf documenten, geen vijftig. Het selecteren is het werk. Bij dertig documenten weet het model niet meer wat het zwaarst weegt, en jij ook niet.",
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
      kern: "Je kan je eigen stijl niet beschrijven, maar je kan hem wel laten afleiden uit wat je vroeger geschreven hebt.",
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
      kern: "Een instructie die maar bij één soort taak hoort, hoort niet in je algemene regelsbestand.",
      tips: [
        "Je regelsbestand is voor wat altijd geldt. Wordt een instructie lang en geldt ze maar voor één taak, dan wordt het een aparte skill.",
        "Schrijf een skill nooit vooraf. Je schrijft hem nadat je dezelfde uitleg drie keer hebt gegeven, en je laat hem afleiden uit die drie gesprekken.",
        "In een gewoon chatvenster bestaat dit ook. Daar heet het “het document dat ik erbij haal als ik figuren maak”.",
        "Het duidelijkste voorbeeld zijn de figuren: een skill die de stijl, de kleuren en het lettertype vastlegt, met regels als “geen titel boven de figuur” en “tekst overlapt nooit met een lijn of een pijl”.",
        "De figuren zelf komen uit een script en niet uit een chatvenster. Een figuur bijsturen is dan een getal veranderen en opnieuw uitvoeren."
      ],
      gevorderd: "Hier merk je dat je afspraken in twee soorten uiteenvallen: wat altijd geldt tegenover wat bij één taak hoort. Dat onderscheid is de enige reden dat skills bestaan.",
      links: ["skills"]
    },
    {
      id: "lesmateriaal",
      titel: "Van tekst naar lesmateriaal",
      kort: "lesmateriaal",
      watis: "Uit één tekstbestand komen je slides, je syllabus en je oefeningen, zonder drie keer dezelfde zin te verbeteren.",
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
        "Zet je opbouw klaar op de dag dat er nog niks in staat. Anders wordt de laatste dag een bouwdag."
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
      ["wat je installeert", "niks", "Quarto", "een tool in je map, plus git", "Quarto, git, een editor"],
      ["waar je regels staan", "{regelsplek}", "{regelsplek}, en een .md ernaast", "{regelsbestand} in de map", "{regelsbestand} in de hoofdmap"],
      ["hoe je ziet wat veranderde", "een kopie met de datum in de naam", "idem", "git", "git"],
      ["hoeveel formaten eruit komen", "één, met de hand", "alle, uit één bron", "alle, als je Quarto erbij zet", "alle, bij elke wijziging"],
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
    duur: "Reken op een uur voor de eerste keer. De tweede keer ben je er in twintig minuten, want stap 1, 2 en 5 hoef je dan niet meer te doen.",
    stappen: [
      {
        kop: "Zet een plek klaar en leg er drie documenten in",
        jij: "Maak {projectplek} aan en sleep er drie dingen in: het hoofdstuk zelf, je vakbeschrijving of ECTS-fiche, en een half blaadje over je beginsituatie — wat kennen je studenten al als ze aan dit hoofdstuk beginnen.",
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
        jij: "Geef twee teksten die je zelf schreef en waarvan je weet dat ze goed zijn — een stuk cursus en iets waar je losser schrijft, een mail aan studenten bijvoorbeeld. Vraag: “Wat zijn de regels die deze teksten volgen? Geef ze als een lijst waar ik het mee oneens kan zijn, en maak elke regel zo dat ik ze kan nakijken.”",
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
    slot: "Na deze zes stappen heb je één herwerkt hoofdstuk, een contextmap van vier of vijf documenten, en een afsprakenbestand. Dat laatste is het waardevolste: het volgende hoofdstuk begint niet meer van nul, en over drie maanden klinkt het nog altijd als jou.",
    valkuil: "De meest gemaakte fout is stap 2 en 6 tegelijk vragen — omzetten en herwerken in één keer. Dan weet je achteraf niet welke wijziging van de omzetting komt en welke van de AI, en je vertrouwt het resultaat niet meer."
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
      tekst: "Zet dit hoofdstuk om naar markdown. Verander niets aan de inhoud en niets aan de volgorde. Zeg er onderaan bij wat er niet netjes over te zetten was."
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
      tekst: "De tekst van dit hoofdstuk is veranderd. Welke slides kloppen nu niet meer, en wat moet daar anders?"
    }
  ],

  /* ---------- Gereedschapskist ---------- */
  gereedschap: [
    { waarvoor: "een document omzetten, nu meteen", wat: "Google Docs importeert en exporteert markdown", drempel: "geen", link: "gdocs" },
    { waarvoor: "markdown naar PowerPoint, met jouw sjabloon", wat: "pandoc of Quarto naar .pptx, met --reference-doc=sjabloon.pptx", drempel: "commandolijn", link: "quarto-pptx" },
    { waarvoor: "markdown naar Word, met jouw sjabloon", wat: "idem, met --reference-doc=sjabloon.docx", drempel: "commandolijn", link: "pandoc-refdoc" },
    { waarvoor: "markdown naar pdf, html, slides", wat: "Quarto. Pandoc zit erin", drempel: "een installatie", link: "quarto" },
    { waarvoor: "pdf zonder LaTeX te installeren", wat: "Quarto met typst als motor", drempel: "een installatie", link: "quarto-typst" },
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
  voorbeeldenNoot: "Cursussen, websites en cursusmappen die op deze manier gemaakt zijn, zodat je kan zien waar je naartoe werkt. De bolletjes onderaan elke kaart zeggen met welke techniek het gebouwd is. Deze galerij groeit nog.",
  voorbeelden: [
    {
      titel: "Programmeren & OOP",
      maker: "Stephane Van Rossem & Vincent Van Camp",
      wat: "Een cursus C# als website, gebouwd met Docusaurus. Knap detail: er zit een AI-assistent in de pagina zelf, die studenten verder helpt terwijl ze aan de oefeningen zitten.",
      url: "https://vincentvcap.github.io/graduaat-csharp-programmeren/",
      tech: ["Docusaurus", "markdown", "GitHub Pages", "Gemini"]
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
      tech: ["Next.js of React", "Vercel"]
    },
    {
      titel: "Zie Scherp Scherper",
      maker: "Tim Dams",
      wat: "Een cursus C# waarbij het handboek, de slides en de website allemaal uit dezelfde markdown-bestanden gemaakt worden. Je schrijft één keer, en de rest rolt eruit.",
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
      wat: "Het oefenplatform bij de eerste lessen TypeScript. Studenten schrijven code in de pagina en zien een robot hun instructies stap voor stap uitvoeren. Zo wordt een concept iets dat je ziet gebeuren in plaats van iets dat je moet voorstellen.",
      url: "https://cc.assimilate.be/",
      tech: ["TypeScript", "eigen webapplicatie"]
    },
    {
      titel: "Git Quest",
      maker: "Jannes Peeters",
      wat: "Leer git op interactieve wijze én gamified.",
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
    "copilot-m365":         { naam: "Microsoft 365 Copilot", url: "https://www.microsoft.com/microsoft-365/copilot", noot: "de Copilot in Word en PowerPoint, via je werkaccount" },
    "copilot-web":          { naam: "Copilot-app en copilot.microsoft.com", url: "https://copilot.microsoft.com", noot: "hier zit de knop “Leren” met de hulpprogramma’s voor onderwijs" },
    "copilot-instructions": { naam: "GitHub Copilot instructions", url: "https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot", noot: "de Copilot in je editor, niet die in Word" },
    "claude-md":            { naam: "CLAUDE.md", url: "https://docs.claude.com/en/docs/claude-code/memory", noot: "je afspraken in een bestand" },
    "claude-code":          { naam: "Claude Code", url: "https://docs.claude.com/en/docs/claude-code/overview", noot: "de AI werkt in de map zelf" },
    "skills":               { naam: "Agent Skills", url: "https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview", noot: "een instructie die bij één soort taak hoort" }
  }
};
