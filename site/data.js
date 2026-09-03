/* Alle inhoud van de site. Wie de tekst wil wijzigen, wijzigt ze hier.
   Structuur: de rode draad en het waarom, keuzehulpvragen, werkwijzen,
   onderwerpen (het naslagwerk), valkuilen, prompts, gereedschap, voorbeelden
   en links. */

window.DATA = {

  /* ---------- De rode draad van de hele site ---------- */
  rodedraad: "Alles wat je een tweede keer tegen de AI moet zeggen, hoort in een bestand.",

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

  /* ---------- Vraag: waar staat je cursus nu ---------- */
  bron: [
    {
      id: "word",
      label: "Word-bestanden",
      advies: "Laat per hoofdstuk omzetten naar markdown. Kijk die omzetting na voor je iets laat herwerken.",
      links: ["quarto-docx", "pandoc"]
    },
    {
      id: "ppt",
      label: "alleen PowerPoint",
      advies: "In je slides staan trefwoorden. De lopende tekst zit in je hoofd. Laat daar eerst tekst van maken, dan pas herwerken.",
      links: ["quarto-pptx"]
    },
    {
      id: "pdf-tekst",
      label: "pdf of scan waar je tekst in kan selecteren",
      advies: "Omzetten lukt. Kijk formules en tabellen na, want die sneuvelen het eerst.",
      links: ["pandoc"]
    },
    {
      id: "pdf-scan",
      label: "pdf of scan waar je geen tekst in kan selecteren",
      advies: "Eerst door een tekstherkenning. Reken op fouten, en dus op nalezen.",
      links: []
    },
    {
      id: "leerplatform",
      label: "in het leerplatform, geen bronbestand meer",
      advies: "Exporteer per pagina naar html of Word. Kijk meteen na hoe je het daar terug in krijgt, want dat is de stap die achteraf tegenvalt.",
      links: ["pandoc"]
    },
    {
      id: "verspreid",
      label: "verspreid over jaren en versies",
      advies: "Kies een versie als de echte. Twee versies samen opladen geeft een mengsel waar jij achteraf niks meer in herkent.",
      links: ["git"]
    },
    {
      id: "collega-weg",
      label: "bij een collega die weg is",
      advies: "Wat je vindt, is je bron. Zet in je contextmap wat jij eraan wil veranderen.",
      links: []
    },
    {
      id: "niks",
      label: "er is nog niks",
      advies: "Je bron is de vakbeschrijving of ECTS-fiche, de vakken ervoor en erna, het handboek dat je volgt, en je aantekeningen van vorig jaar.",
      links: []
    }
  ],
  bronRegels: [
    ["Eerst omzetten, dan pas herwerken.", "Vraag je beide tegelijk, dan weet je achteraf niet welke wijziging van de AI komt en welke van de conversie."],
    ["Begin bij één hoofdstuk.", "Het hoofdstuk waar je zelf het minst tevreden over bent, want daar zie je het verschil. Een hele cursus in één keer levert een stapel tekst op die je alsnog woord voor woord moet nalezen."]
  ],

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
      kort: "gratis chatvenster, geen abonnement",
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
  prompts: [
    {
      titel: "Omzetten, zonder herwerken",
      onderwerp: "plat",
      wanneer: "de eerste van de twee stappen",
      tekst: "Zet dit hoofdstuk om naar markdown. Verander niets aan de inhoud en niets aan de volgorde. Zeg er onderaan bij wat er niet netjes over te zetten was."
    },
    {
      titel: "Je contextmap laten beoordelen",
      onderwerp: "contextmap",
      wanneer: "wat eruit komt, is je ontbrekende document",
      tekst: "Dit is alles wat ik heb over dit vak. Wat zou je nog willen weten voor je aan dit hoofdstuk begint?"
    },
    {
      titel: "Je stem laten afleiden",
      onderwerp: "regels",
      wanneer: "geef twee registers: een lesstuk en iets lossers",
      tekst: "Deze twee teksten heb ik zelf geschreven en ik weet dat ze goed zijn. Wat zijn de regels die deze teksten volgen? Geef ze als een lijst waar ik het mee oneens kan zijn, en maak elke regel zo dat ik ze kan nakijken."
    },
    {
      titel: "Je regels testen tegen een afgekeurde tekst",
      onderwerp: "regels",
      wanneer: "voor wie al een regelsbestand heeft",
      tekst: "Hier is een stuk tekst dat ik afgekeurd heb, en hier zijn mijn regels. Welke van die regels vangen deze fout niet? Stel een scherpere formulering voor."
    },
    {
      titel: "Schrappen",
      onderwerp: "",
      wanneer: "bij elk stuk gegenereerde tekst; levert bijna altijd een regel op",
      tekst: "Wat kan hier weg zonder dat er een feit verdwijnt?"
    },
    {
      titel: "Een skill laten afleiden",
      onderwerp: "skills",
      wanneer: "pas nadat je dezelfde uitleg drie keer gaf",
      tekst: "In deze drie gesprekken heb ik drie keer dezelfde uitleg gegeven over hoe ik dit soort taak wil. Schrijf die uitleg uit als een set regels, met bij elke regel het geval waaruit ze komt."
    },
    {
      titel: "Oefeningen met foute antwoorden",
      onderwerp: "lesmateriaal",
      wanneer: "met je contextmap erbij klopt het niveau",
      tekst: "Maak vijf meerkeuzevragen bij dit hoofdstuk. Geef bij elke foute optie een reden waarom een student ze zou kiezen. Geef daarna dezelfde vragen in drie moeilijkheidsgraden."
    },
    {
      titel: "Slides in sync houden",
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
      titel: "Zie Scherp Scherper",
      maker: "Tim Dams",
      wat: "Een cursus C# waarbij het handboek, de slides en de website allemaal uit dezelfde markdown-bestanden gemaakt worden. Je schrijft één keer, en de rest rolt eruit.",
      url: "https://timdams.github.io/ziescherpscherper/",
      tech: ["Quarto", "markdown", "GitHub Pages"]
    },
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
