Deze website heeft als doel om mensen te helpen hoe ze AI kunnen gebruiken in het maken/schrijven van een lescursus. De website bestaat uit 4 delen:

1. Een startpagina die de vraag beantwoordt waarmee iemand binnenkomt: "hoe begin ik eraan". Zeven stappen in de volgorde waarin je ze zet. Zie De startpagina hieronder.
2. Een interactieve 'bevrager' die de gebruiker helpt te beslissen welke aanpak en tools moeten gebruikt worden. Gebaseerd op voorkennis en AI-abbonement.
3. Een naslagwerk met een overzicht van tools, prompts, en aanpakmogelijkheden. De valkuilen zitten hierin, als een van de deuren; ze stonden ooit als een vijfde knop in het menu.
4. Een gallerij met links naar externe voorbeelden (repos, websites). Staat er, met tien cursussen en sites, elk met maker, een regel uitleg en de techniek erachter. Ze staat in `voorbeelden` in `site/data.js`.

Naast die vier staan de slides van de talk, onder `/slides/`, met een knop in de kop en een strook op de startpagina. Ze worden gerenderd uit `slides/cursus-schrijven-met-ai.qmd`: lokaal met `npm run slides`, op Pages door de workflow. **De slides zijn de waarheid.** Loopt de site uit de pas met wat daar verteld wordt, dan volgt de site.


Het is belangrijk dat de website vooral catert naar beginnende en medium gebruikers van AI, en dat de informatie duidelijk en toegankelijk is. De interactieve bevrager moet gebruikers begeleiden door een reeks vragen die hun behoeften en kennisniveau in kaart brengen, zodat ze de meest geschikte tools en methoden kunnen vinden voor het maken van hun lescursus.

De bevrager was eerst zelf de startpagina. Dat verwarde: wie binnenkomt met een vraag kreeg vragen
terug, en daaronder een menu van vier gelijke knoppen. Nu staat het antwoord er eerst en maakt de
bevrager dat antwoord daarna persoonlijk: welke tool, welke werkwijze, welke drie prompts, en hoe de
knoppen in jouw venster heten.


**Doel:** een lector kan een olod herwerken met AI zonder dat het resultaat leest als AI, en zonder
afhankelijk te zijn van een tool.
**Niet het doel:** leren prompten. Prompten is tien procent van het werk. De rest is het expliciteren
en bewaren van je eigen afspraken.

# De startpagina

Zeven stappen, in de volgorde waarin je ze zet. Ze staan in `startplan` in `site/data.js`:

1. Schrijf eerst als schrijver. Outline, eerste versie, nalezen, herschrijven.
2. Zet je cursus in droge tekst: een map per hoofdstuk, een bestand per onderwerp.
3. Maak een contextmap, en hou ze proper: `context/` is wat een collega nodig heeft om je vak over te nemen, `content/` zijn je hoofdstukken zelf.
4. Zet je regels in een bestand: de handleiding voor je agents, met daarin ook wat elk document in je contextmap is.
5. Laat de AI bijhouden wat je corrigeert (`improve.md`), en maak daar later je skills van.
6. Kijk na. De AI zegt nooit dat ze het niet zeker weet. Huur er het A(I)-team bij: laat nalezen, telkens in een andere rol.
7. En dan pas je opmaak, in één keer.

Op de startpagina staat `volgorde.png` van de slides erboven, met de twee beugels eronder als tussenkop: *eerst schrijven* onder één en twee, *hier komt de AI erbij* onder drie tot zeven.

Stap 3 tot 6 zijn de lowhangingfruit-wins uit Het naslagwerk hieronder. Ze stonden er ooit als vier
gelijke knoppen naast elkaar; dat is een menu, en een menu zegt niet wat er eerst komt. De eerste
twee stappen gaan nog niet over AI, en dat is precies waarom ze eerst staan.

De opmaak stond ooit op drie, als "trek je nog niets aan van je layout". Dat is een verbod en geen
handeling: je *doet* je opmaak op het einde. Als lijst van dingen die je zet, hoort ze dus achteraan,
en dat is nog duidelijker geworden sinds de AI-stappen ertussen kwamen. Het verbod zelf is niet
verdwenen, het staat nu als waarschuwing bij stap 2, waar de verleiding zit.

Twee dingen lopen ernaast en staan apart onder de lijst: je afbeeldingen (schrijf per figuur één zin
op, en beslis pas later of het mermaid, Excalidraw of iets anders wordt) en git (alleen wanneer je
bestanden op je eigen schijf staan, en dan vanaf de eerste dag).

Onder de volgorde staan twee deuren. Links je eerste sessie: één hoofdstuk, van het openen van je
laptop tot een tekst waar je tevreden over bent, met het klikpad van je eigen tool erbij. Rechts de
bevrager.

De bron van deze volgorde is `context/gettingstarted.md`: de huisregels die ik meegeef aan een
collega die me die vraag stelt. Wat daar staat en op de site nog ontbreekt, hoort er dus bij te
komen.

# Bevraging

We willen in de bevraging zeker de gebruiker de optie geven dat hij informatie op maat krijgt gebaseerd op de AI-tool waarvoor hij een abbonement heeft. We voorzien ondersteuning voor **Claude, ChatGpt, Gemini, Microsoft CoPilot, "generiek" (bv selfhosted, openrouter, etc.) of "ik heb er nog geen" (geen abonnement)**. Op basis van deze keuze zal de bevrager de gebruiker specifieke aanbevelingen doen die passen bij hun situatie.

# Het naslagwerk

Ik wil zeker een vereenvoudigde flow tonen met de "lowhangingfruit" wins. Die staan op twee plekken:
als stap 3 tot 6 van de volgorde op de hoofdpagina, en in het plan dat na de bevraging verschijnt.
Het zijn dezelfde vier als op `meenemen.png` van de slides, met dezelfde nummers:

- **3, je contextmap** (een overzicht van de inhoud en structuur van de cursus, zodat de AI beter kan helpen bij het genereren van content). Vijf documenten, elk met een reden erbij
- **4, je regelbestand** (claude.md, AGENTS.md, of het instructieveld van je venster: je eigen regels, om niet telkens dezelfde dingen te moeten herhalen). Je toon, en vooral je niet-doen-lijst
- **5, `improve.md`** (de AI noteert je correcties terwijl je ze geeft). Wat blijft terugkomen wordt een vaste regel, wat over één soort taak gaat wordt een skill: een apart document per taak die terugkeert
- **6, NAKIJKEN!** De getallen, de namen en de bronnen: zelf lezen. Daaronder hangen de valkuilen, een overzicht van de meest voorkomende fouten bij het gebruik van AI in cursusontwikkeling

De negen onderwerpen in `onderwerpen` (`site/data.js`) staan in diezelfde volgorde: `plat`, `mapindeling`, `contextmap`, `regels`, `improve`, `skills`, `nakijken`, `lesmateriaal`, `figuren`.



## Doelgroep en toon

- doelgroep: lesgever (middelbaar, hoger), sterk gemengd technisch niveau. Van "ik plak soms iets in ChatGPT" tot  "ik zit in de terminal". De meesten schrijven in Word en blijven dat doen.
- beginsituatie: ze hebben allemaal al eens iets gevraagd in een chatvenster en waren teleurgesteld.
  Geen ervaring met mappen, versiebeheer of agents. Wel twintig jaar impliciete cursusafspraken in hun
  hoofd, en dat is het materiaal waar de cursus mee werkt.
- toon: collegiaal, geen goeroe, geen verkooppraat, en niet vlak. Hoe het wel klinkt staat onder
  Schrijfstijl.
- taal: Nederlands, Vlaams register, je-vorm.

## Schrijfstijl

Zo klinkt Tim in lopende tekst. Er zijn twee ijkpunten. Het eerste is het hoofdstuk over casting uit het handboek C# Zie Scherp Scherper (`context/4_converteren_casting.md` in de repo ziescherpscherper, ook in
`context/toonvoorbeeld.md`): Tim aan het lesgeven. Het tweede is `context/toonvoorbeeld-blog.md`, een
blog over zijn eerste optreden als dj, geschreven zonder leerdoel en daardoor losser. Wat in allebei
staat, is de stem. Leest een stuk correct, vlot en volledig stemloos, dan is het nog niet af.

Alles hieronder geldt dus, maar lichter gedoseerd: een terzijde per module, niet een per sectie.

- **Open met een terzijde of met een vlakke feitenzin, nooit met een definitie.** Het terzijde is een
  grap, een verwijzing of een bekentenis, in cursief, en dan meteen weer aan het werk: "*Aah, Data, een
  geliefkoosd personage uit Star Trek.* Maar daar ga ik het niet over hebben." Zo'n terzijde mag
  zichzelf onderbreken ("Ahum, sorry."). De andere opening is een kale zin met een tijdstip erin en een
  belofte erachter: "Dit weekend ging ik voor het eerst, na meer dan twee jaar bedroom-dj'ing, draaien
  op een echte fuif. Hier de ongefilterde hoogtes en laagtes." De knipoog komt dan pas in zin drie.
  Wissel af: twee modules na elkaar dezelfde opening en het is een formule geworden.
- **Het terzijde staat ook midden in de zin, tussen haakjes.** Daar zeg je wat eerlijker of grappiger is
  dan de zin toeliet: "technisch rommelige (lees: slechte) overgangen", "(Walk Like an Egyptian past
  trouwens echt niet als handover van hiphop naar Zillion)". De "lees:"-variant zet het harde woord
  naast het beleefde woord dat eraan voorafgaat. Twee tot drie per module, anders wordt het een tic.
- **De schrijver is aanwezig.** "Laten we eens onderzoeken", "het wordt tijd dat we onze werkkledij
  aantrekken". Voor de instructie schakel je naar je-vorm: "Test dit eens", "Bekijk eens het volgende
  voorbeeld".
- **Stel de vraag die de lezer denkt, en antwoord meteen.** "Wat zou je verwachten als resultaat?
  Inderdaad: 22,5." Een kopje mag die vraag zijn: "Wat is casting", "Casting, conversie of parsing?"
- **Het beeld komt uit een vak waar je zelf in zit, en je zegt erbij waar je het haalt**: "een proces
  dat wat aanvoelt als het plotten van een verhaal", "de Steve Jobs-presentatietechniek die ik ook in
  mijn lessen toepas". Het keert terug zolang het klopt: appelen en peren, een zwarte doos, de collega
  die je olod overneemt. Het beeld staat in het kopje en in de tekst, niet enkel in een onderschrift.
- **Vet is voor de zin die je in de les twee keer zou zeggen**, niet voor trefwoorden. Hele zinnen mogen
  vet. Een nieuwe term is vet bij zijn eerste vermelding, daarna plat.
- **Cursief markeert het scharnierwoord** van een zin: *tijdens*, *waarde*, *niet inpast*, *versmallen*.
- **Noem de verleidelijke fout voor je ze afschiet.** "Toegegeven, het is verleidelijk om vanaf nu alles
  met de Convert.To-methoden te doen." Uit hetzelfde register: "Merk op dat", "Let echter op dat".
- **Elke bewering krijgt onmiddellijk een concreet geval, en alles heeft een eigennaam**: echte
  waarden, echt scherm, echte foutboodschap, en ook echte merken, plaatsen en uren. De zaal heet De
  Zure op de Dageraadplaats, het mengpaneel is een Pioneer FLx/4, de set liep van 23u tot 0u30. 20 en
  25 geven 22, niet 22,5. Waar een getal of een schermafbeelding kan staan, staat geen abstracte
  formulering.
- **Mensen praten in de tekst, letterlijk geciteerd**: "drie aparte dames kwamen om rnb vragen, *dan
  konden ze er aan beginnen*". Citeer wat een collega zei, wat een student vroeg, wat de AI
  terugstuurde.
- **Leg hetzelfde in lagen uit**: eerst de regel, dan waarom ze bestaat, dan een geval uit de praktijk.
  Verwijs daarbij hardop terug ("zoals eerder vermeld").
- **Laat de lezer nooit alleen bij een fout.** Wat misgaat, dan de foutboodschap of het foute resultaat,
  dan de fix. Er staat niemand naast hem.
- **Je noemt je eigen miskleun eerst, en je redt jezelf niet.** Met een cijfer erbij waar dat kan: "de
  tot in de puntjes voorbereide set bleek achteraf slechts voor zo'n 30% bruikbaar." Er komt geen "maar
  achteraf bekeken" achter. Wat er in het maken van deze cursus misliep hoort in
  [index.qmd](index.qmd), in [de colofon](content/colofon.qmd) en in
  [module 3](content/3_nakijken.qmd).
- **Callouts en kaderblokken zijn voor de uitzondering, de valkuil en het extraatje**, nooit voor een
  samenvatting.
- **Een onderschrift bij een figuur is een feit, geen titel**: "Casting naar `int` gooit alles na de
  komma weg, ook bij `20.9`. Er wordt niet afgerond."
- **Spreektaal mag, en af en toe moet ze**: "eens", "een dikke foutboodschap", "goed testen is de
  boodschap", "toegegeven", "better safe than sorry". Vlaams register, geen Hollands, en volkse woorden
  zonder verontschuldiging: "gepruts", "op z'n gat gevallen", "goesting", "afwimpelen". Engels jargon
  blijft onvertaald: prompt, context, skill, repo, in the zone, all over the place.
- **Korte zinnen, en af en toe een hele korte** om iets te laten landen: "Dit zal niet gaan."



## Niet doen

- geen em-dashes. Gebruik een gewoon streepje, een dubbele punt, haakjes of een nieuwe zin
- geen samenvattende wijze slotzin. Stop na het laatste feit. Eindigen op een praktische instructie
  of op een terzijde mag wel. De hardnekkigste vorm is de afronder die een waardeoordeel geeft en
  geen feit: "alles daarna is bonus", "de rest is bonus", "meer betekent het niet", "dat is het hele
  idee", "het is hetzelfde document, op een andere plek". Twee korte zinnen na elkaar waarvan de
  tweede de eerste in waarde herhaalt, zijn dezelfde fout in twee stukken. Schrap de zin en kijk of
  er een feit verdwijnt
- geen abstract woord op de plek van het ding zelf. "Je hebt er iets tastbaars aan het eind", "daar
  maak je iets dat je aan een collega kan tonen": er staan vijf documenten met een regel bij elk, of
  er staat niets. Dit is de eigennaam-regel uit de schrijfstijl, en ze glipt er hier telkens door
  omdat de zin verder klopt
- geen symmetrische antithese, waar ze ook staat. De vormen die telkens terugkeren: "Dat is geen X,
  dat is Y", "Het gaat niet over X, het gaat over Y", "De valkuil is niet X, het is Y", "X, en niet
  Y", "X kiest gemak, Y kiest zekerheid". "In plaats van" en "en niet" zijn dezelfde figuur in
  vermomming: "een lijst van momenten met een reden erbij, in plaats van een tijdlijn van
  opslagmomenten" is "niet X, maar Y" met andere woorden. Contrast dat een mechanisme uitlegt ("in
  het eerste geval gebeurt X, in het tweede Y") mag wel
- test elke zin met een ontkenning erin: staat er een feit in de ontkende helft? Zo nee, schrappen en
  enkel de bevestigende helft houden. "Dat is geen ergernis, dat is een signaal" wordt "Alles wat je
  een derde keer corrigeert, is een afspraak die je nooit hebt opgeschreven". Haalt de ontkende helft
  de test wel, dan mag ze blijven staan: "begin met drie regels en niet met twintig" blijft, want
  twintig is precies wat de lezer zou doen
- geen tel-formules als stijlbloempje ("drie tools, hetzelfde idee"). Een aangekondigde opsomming
  ("dit kan op drie manieren") is geen tel-formule en mag wel
- geen bullets over "de kracht van AI"
- geen emoji in de cursustekst. In de slides mag ze wel
- getallen tot twintig voluit. "3 aparte dames" is blogsnelheid en leest in een cursus als slordigheid
- geen tijdsaanduidingen, waar dan ook. Geen duur boven een module, geen minuten in de tekst, geen
  "reken op een namiddag", en geen belofte over tijdwinst. Ook niet in het negatief ("verspilde
  tijd", "heeft je meer tijd gekost dan hij oplevert") en niet als vergelijking ("de vraag die het
  snelst gaat", "dan ben je in Word sneller klaar"). Wat de aanpak vraagt aan materiaal mag je
  wel benoemen: er lag twintig jaar cursusmateriaal klaar, en zonder dat begint het werk vroeger
- de matrix niveau x module niet volschrijven. Waar een hoger niveau een zin oplevert, schrijf je die
  zin onderaan de hoofdtekst en geen apart blok


