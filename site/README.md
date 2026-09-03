# Een cursus schrijven met AI

Een zelfstandige website voor lesgevers (leerkrachten, lectoren, docenten van elke school) die AI
willen inschakelen bij het maken van hun cursusmateriaal. De site catert bewust naar beginnende en
gemiddelde AI-gebruikers: duidelijke taal, geen jargon, en niets dat een installatie vereist om te
kunnen starten.

De opzet is **gids eerst**: de startpagina is de bevrager zelf. Eén rustige vraag per scherm, en na
een handvol vragen ontvouwt zich **Jouw plan**, een persoonlijk stappenplan in de termen van de
gekozen AI-tool. Daarnaast zit alles achter een klein menu:

| Menu | Wat het is |
|---|---|
| De gids | het welkomstscherm en de vragen, één per scherm, met voortgangsbolletjes en een terugknop |
| Jouw plan | verschijnt na de gids: jouw werkwijze, de vier snelle winsten in de termen van jouw tool, waarom je die doet, wat je eerst doet, en wat er uit je antwoorden kwam |
| Naslagwerk | een zoekveld over alles, en daaronder zeven kaarten die elk een eigen onderdeel opendoen. Je ziet er altijd maar een tegelijk |
| Valkuilen | de meest voorkomende fouten, doorzoekbaar. Elke klacht wijst naar het onderwerp dat overgeslagen is |
| Voorbeelden | de galerij met externe voorbeelden, met keywords per kaart. Groeit nog |

De werkwijzenpagina (een pagina per werkwijze plus de vergelijkingstabel) hangt niet in het menu
maar is bereikbaar vanuit het plan, het naslagwerk en het zoekveld.

## Het naslagwerk: een hub met deuren

Het naslagwerk stond ooit als een lange lijst op een pagina. Dat leest niemand. Nu is het een hub:
zeven kaarten met een titel, een zin en een teller. Je klikt er een open, ziet alleen dat onderdeel,
en gaat met "Alle onderdelen" terug.

| Kaart | Vak (`data-vak`) | Wat erin staat |
|---|---|---|
| De onderwerpen | `onderwerpen` | de vijf onderwerpen, elk in een venster |
| De vier werkwijzen | (geen vak) | springt naar de werkwijzenpagina |
| Prompts om te plakken | `prompts` | de prompts met een kopieerknop |
| Met welke AI werk je? | `tool` | de toolkiezer en het kaartje van de gekozen tool |
| Wat moet eruit komen? | `uitkomst` | de formaatkiezer en het advies erbij |
| Gereedschap en links | `gereedschap` | de gereedschapskist en alle links van de site |
| Bij mij ligt dat anders | `randgevallen` | de situaties die buiten het standaardverhaal vallen |

De kaarten staan in `AFDELINGEN` in `app.js`; de vakken zelf zijn `<div class="naslagvak"
data-vak="...">` in `index.html`. Een vak bijzetten is dus een item in `AFDELINGEN` plus een div.
Een open vak staat in de adresbalk (`#naslag/prompts`), zodat je een onderdeel kan doorsturen.
Het zoekveld staat boven de kaarten en zoekt door alles heen; een treffer opent het juiste vak.

## Tool-specifieke teksten

De toolvraag kent zes antwoorden: **Claude, ChatGPT, Gemini, Microsoft Copilot, iets anders
(zelf gehost, OpenRouter, ...) of nog geen**. De keuze stuurt de hele site:

- teksten met de placeholders `{regelsbestand}` `{regelsplek}` `{projectplek}` `{skillplek}` en
  `{toolnaam}` in `data.js` vullen zich met de termen van de gekozen tool (functie `T()` in
  `app.js`, veld `termen` per assistent). Zonder toolkeuze komt er een neutrale omschrijving uit
  `NEUTRAAL` in `app.js` ("een vast bestand met je afspraken"), nooit een merknaam: gedeelde tekst
  blijft gedeeld
- linkblokken bij een werkwijze of onderwerp wisselen tool-links om naar die van de gekozen tool
  (functie `toolLinks()` in `app.js`)
- het plan en de onderwerpvensters tonen het kaartje "Bij [tool] heet dat" met de plek voor je
  bestanden, je regels en een skill (velden `plek`, `regels`, `skill` per assistent)
- een assistent kan een optioneel blok `wistjedat` hebben: iets dat gebruikers van die tool
  waarschijnlijk al hebben maar niet kennen. Het verschijnt volledig (met schermafbeelding) in de
  toolkiezer van het naslagwerk, en verkort in het plan met een knop ernaartoe. Microsoft Copilot
  heeft er een: de aparte Copilot-app met de knop "Leren" en de hulpprogramma's voor onderwijs

Wisselen kan altijd via de toolkiezer in het naslagwerk; de rest van de antwoorden blijft staan.

## De gids

De volgorde van de vragen staat in `volgorde()` in `app.js`, de werkwijzebepaling in `werkwijze()`.
Wie bij de eerste vraag "weinig of geen ervaring" antwoordt, krijgt een korter traject (geen vragen
over installeren of versiebeheer) en komt altijd uit op werkwijze 1. Antwoorden blijven in de
browser staan (localStorage); halverwege stoppen en later verdergaan werkt. Toetsenbord: de cijfers
1 tot 9 kiezen een antwoord.

## Lokaal draaien

Open `index.html` met de Live Server-extensie in VS Code (rechtsklik, *Open with Live Server*). Dat
is alles. Er is geen build, geen npm en geen internet nodig: de pagina bestaat uit vier bestanden en
laadt niets van buiten.

Zonder Live Server kan ook:

```bash
python -m http.server 8080     # en dan http://localhost:8080
npx serve .                    # idem
```

`index.html` rechtstreeks openen met dubbelklik werkt ook, alleen bewaart de browser dan je
antwoorden niet tussen twee bezoeken.

## Waar de tekst staat

Alle inhoud staat in `data.js`, in het Nederlands, in een object per onderdeel: `waarom`,
`snelwinst`, `materiaal`, `bron`, `werkwijzen`, `installatie`, `ervaring`, `onderwerpen`,
`vergelijking`, `outputs`, `valkuilen`, `randgevallen`, `prompts`, `assistenten`, `gereedschap`,
`voorbeelden` en `links`. Een tip toevoegen is een regel bijzetten in dat bestand.

- een werkwijze krijgt haar pagina uit `voorwie`, `pitch`, `punten`, `installeren`, `stappen`,
  `overslaan` en `onderwerpen` (een zin per onderwerp)
- een onderwerp krijgt zijn venster uit `watis`, `kern`, `tips`, `gevorderd` en optioneel een `tabel`
- een assistent krijgt zijn kaartjes uit `plek`, `regels`, `skill`, `inmap`, `waar` en
  `termen.regelsbestand`, en eventueel `wistjedat` met `kop`, `tekst` (lijst alinea's),
  `afbeelding` (een bestand uit `assets/`), `alt`, `bijschrift`, `slot` en `planregel`
- `waarom` is de opbrengst van de hele aanpak (jezelf niet herhalen, ver komen op een gratis
  account, werk dat achterblijft): een lijst `kop` + `tekst`, met `waaromKop` en `waaromNoot`
  erboven. Functie `waaromBlok()` in `app.js` tekent ze, onderaan het welkomscherm en onder de
  vier stappen in het plan. Elk item van `snelwinst` heeft daarnaast een eigen `waarom`-regel,
  zodat de reden naast het ding staat waar ze over gaat
- het zoekveld indexeert alles in `bouwIndex()` in `app.js`
- een voorbeeld toevoegen aan de galerij is een item bijzetten onder `voorbeelden`, met
  `titel`, `wat`, `url`, `tech` (de keywords die als bolletjes op de kaart komen) en
  optioneel `maker` (de naam onder de titel, zodat collega's weten bij wie ze terecht kunnen)

Schermafbeeldingen staan in `assets/`.

`app.js` bevat de logica, `styles.css` de opmaak (licht papier, petrolblauw als accent, ook een
donkere versie).
