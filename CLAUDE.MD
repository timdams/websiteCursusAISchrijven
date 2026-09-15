Deze repo is een site en een talk voor lesgevers die AI als extra hulp willen inzetten in het werk dat
ze al doen, en die AI daarbij in toom houden. De site heet **Jij houdt het touw vast**.

**Doel:** je brengt AI als extra hulp in het werk dat je al doet als lesgever (lessen voorbereiden,
oefeningen, slides, cursustekst) en je houdt ze in toom: jij kiest wat de AI leest, jij schrijft haar
regels en jij leest na wat ze maakt. Het resultaat leest niet als AI, en hangt niet vast aan één tool.
**Niet het doel:** leren prompten, of de AI het werk laten overnemen. Prompten is tien procent van het
werk. De rest is het expliciteren en bewaren van je eigen afspraken.

De site moet werken **na** de workshop, zonder Tim ernaast: wie ze opent, gaat er zelfstandig mee aan
de slag.

Schrijf **AI** zonder puntjes (niet A.I.), en **AI slop** met een p. Dat geldt op de site, in de live
slides en in tekst in tekeningen. Enkel de bevroren decks (zie Workshops) blijven zoals ze zijn.

# Wat waar staat

| Pad | Wat |
|---|---|
| `nieuw/` | de site, als Quarto-website in droge markdown |
| `slides/cursus-schrijven-met-ai.qmd` | de live slides van de talk, uitleg in `slides/README.md` |
| `nieuw/workshops/` | een bevroren deck per gegeven workshop |
| `context/` | de bron: `gettingstarted.md` (de huisregels die ik aan collega's meegeef) en de toonvoorbeelden |
| `site/` | de oude site (JS, bevrager). Ze wordt vervangen door `nieuw/`; schrijf er niets nieuws meer in |

`nieuw/` staat niet in de root: een `_quarto.yml` in de root maakt van `slides/` een deel van het
project, en dan breken `npm run slides` en de Pages-workflow. Daarom blijft `nieuw/` waar ze staat, en
zet de Pages-workflow `nieuw/_site` online, met de live slides eronder op `/slides/`. `site/` gaat niet
meer online.

**De slides zijn de waarheid voor wat er beweerd wordt.** Loopt de site uit de pas met wat in de talk
verteld wordt, dan volgt de site. De opbouw kiest de site zelf: de slides tellen zeven stappen, de site
twee stappen en recepten, omdat de talk na feedback te snel en te intimiderend bleek. De bron van de
volgorde blijft `context/gettingstarted.md`; wat daar staat en op de site nog ontbreekt, hoort er bij te
komen.

# De site

Start (`nieuw/index.qmd`), dan:

1. **Stap 1, je map** (`stappen/1-contextmap.qmd`): je cursus, geknipt per onderwerp, en je
   achtergrond, wat een collega nodig heeft om je vak over te nemen.
2. **Stap 2, je afspraken** (`stappen/2-regelbestand.qmd`): je toon, je niet-doen-lijst, en wat elk
   document in je map is.
3. **Voor gevorderden** (`gevorderden/index.qmd`), aangekondigd als "ohja, voor gevorderden": een hub met
   tegels, elk een recept dat op zichzelf staat. In deze volgorde: verbeterlijst, vaste werkwijzen
   (allebei met een klikpad voor Copilot), kaartjes bij je kernbegrippen (in elk venster dat beelden
   maakt), je cursus als website en kennisclips (allebei met Claude). Komt er een recept bij, pas dan ook
   de tegel op de startpagina en de knoppen *Volgend recept* aan.
4. **Galerij** (`galerij/`): cursussen van collega's, tips, resources en een rek skills van anderen.
5. **Workshops** en **woordenlijst** (`woordenlijst.qmd`, elk begrip met een voorbeeld).

Over je achtergrond is dit de zin: **"Elk document in je map ligt er met een reden, en die reden zeg je
in één zin."** "Hoe minder je erin legt, hoe beter" stond er eerst, en een collega las dat als "hoe
leger, hoe beter".

Transparantie over AI-gebruik staat op drie plekken: op de startpagina, als regel in de afspraken, en
in `nieuw/colofon.qmd`.

## Tools

Copilot van Microsoft 365 is de standaard en staat altijd als eerste tab: AP raadt hem aan, ook voor het
middelbaar. Daarna ChatGPT, Gemini en Claude. "Generiek" en "nog geen abonnement" vallen voorlopig weg.
Voor Copilot mag droge tekst Word zijn met enkel kopstijlen.

**Copilot schrijft niet in een notebook.** Tim testte het op zijn Microsoft 365 Copilot-account: een
instructie om bij elk gesprek een regel toe te voegen aan een Page wordt niet uitgevoerd, en Copilot zei
zelf dat het in een notebook enkel zoek-, open- en analysetools heeft. De verbeterlijst loopt voor
Copilot daarom zo:

- in de notebookinstructies: "Wanneer je merkt dat ik je al een paar keer heb moeten verbeteren in een
  chat, zeg me dan in de chat dat ik best volgende regel (geef de regel) opneem in de improve-page." en
  "Lees telkens de regels van de improve-page na en hanteer ze in al onze chats."
- de gebruiker plakt de regel zelf in de Copilot Page *improve*, die als referentie in het notebook zit.

Klikpad dat Tim bevestigde: Copilot, linksboven **Apps**, dan **Notebooks**. Instructies: linksboven op
het notebook klikken, dan bij de instellingen **Custom instructions**. De support-pagina van Microsoft
zegt *More options (...) > Instructions*, en dat klopt niet met zijn scherm.

**Verzin geen knopnamen.** Een knop of menu komt enkel in een klikpad als ze nagekeken is. Anders schrijf
je de stap zonder knopnaam, of komt `stappen/_tools/nog-niet.md` in de tab.

## Hoe een pagina opgebouwd is

Een stap of recept heeft deze blokken, in deze volgorde: *Wat je nodig hebt* (bij recepten), *Wat je
maakt*, de uitleg, *Doe het nu*, *Klaar als*, *Kijk na*, *Verder*.

- *Doe het nu* is een `panel-tabset` met `group="tool"`, in de volgorde Copilot, ChatGPT, Gemini, Claude.
  De inhoud van een tab staat in `stappen/_tools/<tool>/` en komt er met `include` in. Gedeeld:
  `nog-niet.md` (tab nog niet uitgewerkt), `copilot/geen-agent.md` (recept vraagt een AI die zelf in een
  map schrijft), `venster/` (dezelfde stappen voor elk chatvenster).
- *Klaar als* is een afvinklijst (`- [ ]`); `afvinken.html` maakt ze aanvinkbaar en onthoudt ze.
- *Kijk na* zegt wat de lezer zelf naleest, en welke vraag hij de AI stelt om het te controleren.
- Vragen om te kopiëren staan in een codeblok `{.kopieer}`, vragen om te stellen in `{.vraag}`.

Een stap of recept waar een filmpje bij hoort, zet dat erin met `::: {.reel}`.

## Afbeeldingen

- **Uit een script** (rough.js): `slides/assets/imagegen/` voor de slides, `nieuw/assets/imagegen/` voor
  de site. Allebei in **Kalam**: Caveat las achteraan de aula niet (zie `slides/MAATVOERING.md`). `site/`
  en `.claude/afbeelding/SKILL.md` gebruiken nog Caveat. Een script blijft altijd staan.
- **Uit een beeldgenerator**: altijd zonder tekst in het beeld, potloodstijl, grijs met één rood accent.
  De prompt staat ernaast, in `slides/PROMPT-<naam>.md` of `nieuw/assets/imagegen/beelden/<naam>.md`,
  met wat je moet weten als je het beeld opnieuw maakt. Voor de robot gaat `slides/assets/temmen.png`
  mee als referentie, zodat het dezelfde robot blijft.
- **Kaartjes** (citaat, tekening, les) komen uit `nieuw/assets/imagegen/kaartjes.js`. De tekst staat
  in het script, de tekening in `beelden/`.
- **Filmpjes** (Remotion, skill excalidraw-videoclip) staan in `nieuw/_kennisclips/`, in de stijl van de
  site: Kalam, de kleuren van `nieuw/theme.scss`, witte kaartjes en pillen zoals op de site, en de
  robots uit `slides/assets/titel.png` (uitgeknipt, met doorzichtige achtergrond, in `public/`). De mp4
  en de cover gaan naar `nieuw/assets/clips/`. Nieuwe clips komen in hetzelfde project en hergebruiken
  `src/stijl/`. Op de site zetten mag hier, ook al zegt de skill van niet.
- **Een skill delen** gebeurt als zip in `nieuw/downloads/`, met een `LEESMIJ.md` voor de lezer en de
  licentie van het lettertype erbij.

## Renderen

`quarto render` of `quarto preview` in `nieuw/`. Eén pagina apart renderen (`quarto render
gevorderden/x.qmd`) faalt met *Cannot copy nieuw to a subdirectory of itself*; render de hele site.
De slides: `npm run slides` in de root, of `quarto render cursus-schrijven-met-ai.qmd` in `slides/`.

## Workshops

Elke gegeven workshop krijgt een eigen map in `nieuw/workshops/`, met een volledige kopie van het deck
(geen includes naar gedeelde stukken) en een regel in `workshops.yml`. Na de sessie is dat deck
**bevroren**: nooit aanpassen, ook niet voor AI zonder puntjes. Hetzelfde geldt voor
`slides/cursus-schrijven-met-ai TALK AP 14-9-26.qmd`.

## Nog open

- Nederlandse knopnamen in Copilot: referenties toevoegen, nieuwe pagina, Custom instructions.
- Een schermafdruk van de Cowork-modus bij het recept *Je cursus als website*.
- De tabs van `stappen/_tools/venster/kaartjes.md` zijn niet nagekeken in Copilot, ChatGPT en Gemini.
  Vooral: maakt Copilot beelden in een notebook?

# Doelgroep en toon

- doelgroep: lesgever (middelbaar, hoger), sterk gemengd technisch niveau. Van "ik plak soms iets in
  ChatGPT" tot "ik zit in de terminal". De meesten schrijven in Word en blijven dat doen.
- beginsituatie: ze hebben allemaal al eens iets gevraagd in een chatvenster en waren teleurgesteld.
  Geen ervaring met mappen, versiebeheer of agents. Wel twintig jaar impliciete cursusafspraken in hun
  hoofd, en dat is het materiaal waar de site mee werkt.
- toon: collegiaal, geen goeroe, geen verkooppraat, en niet vlak. Hoe het wel klinkt staat onder
  Schrijfstijl.
- taal: Nederlands, Vlaams register, je-vorm.

## Schrijfstijl

Zo klinkt Tim in lopende tekst. Er zijn twee ijkpunten. Het eerste is het hoofdstuk over casting uit het
handboek C# Zie Scherp Scherper (`context/4_converteren_casting.md`, ook in `context/toonvoorbeeld.md`):
Tim aan het lesgeven. Het tweede is `context/toonvoorbeeld-blog.md`, een blog over zijn eerste optreden
als dj, geschreven zonder leerdoel en daardoor losser. Wat in allebei staat, is de stem. Leest een stuk
correct, vlot en volledig stemloos, dan is het nog niet af.

Alles hieronder geldt dus, maar lichter gedoseerd: een terzijde per pagina, niet een per sectie.

- **Open met een terzijde of met een vlakke feitenzin, nooit met een definitie.** Het terzijde is een
  grap, een verwijzing of een bekentenis, in cursief, en dan meteen weer aan het werk: "*Aah, Data, een
  geliefkoosd personage uit Star Trek.* Maar daar ga ik het niet over hebben." Zo'n terzijde mag
  zichzelf onderbreken ("Ahum, sorry."). De andere opening is een kale zin met een tijdstip erin en een
  belofte erachter: "Dit weekend ging ik voor het eerst, na meer dan twee jaar bedroom-dj'ing, draaien
  op een echte fuif. Hier de ongefilterde hoogtes en laagtes." De knipoog komt dan pas in zin drie.
  Wissel af: twee pagina's na elkaar dezelfde opening en het is een formule geworden.
- **Het terzijde staat ook midden in de zin, tussen haakjes.** Daar zeg je wat eerlijker of grappiger is
  dan de zin toeliet: "technisch rommelige (lees: slechte) overgangen", "(Walk Like an Egyptian past
  trouwens echt niet als handover van hiphop naar Zillion)". De "lees:"-variant zet het harde woord
  naast het beleefde woord dat eraan voorafgaat. Twee tot drie per pagina, anders wordt het een tic.
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
  terugstuurde. Verzin nooit een citaat of een antwoord van de AI.
- **Leg hetzelfde in lagen uit**: eerst de regel, dan waarom ze bestaat, dan een geval uit de praktijk.
  Verwijs daarbij hardop terug ("zoals eerder vermeld").
- **Laat de lezer nooit alleen bij een fout.** Wat misgaat, dan de foutboodschap of het foute resultaat,
  dan de fix. Er staat niemand naast hem.
- **Je noemt je eigen miskleun eerst, en je redt jezelf niet.** Met een cijfer erbij waar dat kan: "de
  tot in de puntjes voorbereide set bleek achteraf slechts voor zo'n 30% bruikbaar." Er komt geen "maar
  achteraf bekeken" achter. Wat er in het maken van deze site misliep hoort op
  [de startpagina](nieuw/index.qmd) en in [de colofon](nieuw/colofon.qmd).
- **Callouts en kaderblokken zijn voor de uitzondering, de valkuil en het extraatje**, nooit voor een
  samenvatting.
- **Een onderschrift bij een figuur is een feit, geen titel**: "Casting naar `int` gooit alles na de
  komma weg, ook bij `20.9`. Er wordt niet afgerond."
- **Spreektaal mag, en af en toe moet ze**: "eens", "een dikke foutboodschap", "goed testen is de
  boodschap", "toegegeven", "better safe than sorry". Vlaams register, geen Hollands, en volkse woorden
  zonder verontschuldiging: "gepruts", "op z'n gat gevallen", "goesting", "afwimpelen".
- **Engels jargon** blijft onvertaald in de slides en bij gevorderden: prompt, repo, in the zone, all
  over the place. Een gekende Engelse quote mag overal Engels blijven, zoals "context is king". In de
  basisstappen krijgen de kernbegrippen een Nederlandse hoofdnaam, met het Engelse woord tussen haakjes
  bij de eerste vermelding: je cursus (content), je achtergrond (context), je afspraken
  (regelbestand), je verbeterlijst (improve), een vaste werkwijze (skill). De mappen heten *Cursus* en
  *Achtergrond*, het document *Afspraken*, en de map *Werkwijzen* staat ernaast. Geen bestandsnotatie
  in de basis (geen `.md`, geen schuine strepen, geen boomstructuren): die hoort onder *Verder* en bij
  gevorderden. Het woord em-dash heet op de site "lang gedachtestreepje".
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
- geen emoji in de tekst van de site. In de slides mag ze wel
- getallen tot twintig voluit. "3 aparte dames" is blogsnelheid en leest op de site als slordigheid
- geen tijdsaanduidingen, waar dan ook. Geen duur boven een stap of recept, geen minuten in de tekst,
  geen "reken op een namiddag", en geen belofte over tijdwinst. Ook niet in het negatief ("verspilde
  tijd", "heeft je meer tijd gekost dan hij oplevert") en niet als vergelijking ("de vraag die het
  snelst gaat", "dan ben je in Word sneller klaar"). Wat de aanpak vraagt aan materiaal mag je
  wel benoemen: er lag twintig jaar cursusmateriaal klaar, en zonder dat begint het werk vroeger
- de matrix niveau x stap niet volschrijven. Waar een hoger niveau een zin oplevert, schrijf je die
  zin onderaan de hoofdtekst (onder *Verder*) en geen apart blok
