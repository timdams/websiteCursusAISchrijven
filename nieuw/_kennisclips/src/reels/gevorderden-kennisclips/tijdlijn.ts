import type { ReelTekst } from "../../stijl/reel";

// De bron is het recept nieuw/gevorderden/kennisclips.qmd, met het klikpad voor Claude uit
// nieuw/stappen/_tools/claude/kennisclips.md.
export const FASE = {
  verhaal: 120,
  nodig: 270,
  klaarzetten: 480,
  map: 640,
  vraag: 840,
  demo: 1010,
  installeren: 1200,
  nakijken: 1380,
  einde: 1590,
  eind: 1710,
};
export const DUUR = FASE.eind;

export const TEKSTEN: ReelTekst[] = [
  { van: FASE.verhaal, tot: FASE.nodig, regels: ["Een collega wou *kennisclips*", "maken van cursusbegrippen,", "voor Instagram."] },
  { van: FASE.nodig, tot: FASE.klaarzetten, regels: ["Dit is wat ik antwoordde.", "Eerst: wat je *nodig* hebt."] },
  { van: FASE.klaarzetten, tot: FASE.map, regels: ["Installeer *VS Code* en", "de extensie van Claude."] },
  { van: FASE.map, tot: FASE.vraag, regels: ["Open je *map*, en zet de", "skill er zoals ze is in."] },
  { van: FASE.vraag, tot: FASE.demo, regels: ["Stel dan deze *vraag*.", "Claude zet eerst de tools", "klaar en maakt een demo."] },
  { van: FASE.demo, tot: FASE.installeren, regels: ["Daarna een *how-to*, en een", "*eigen skill* in de", "huisstijl van je school."] },
  { van: FASE.installeren, tot: FASE.nakijken, regels: ["De eerste keer installeert", "Claude *programma's*.", "Dat gebeurt één keer."] },
  { van: FASE.nakijken, tot: FASE.einde, regels: ["Speel ze af, en kijk ze na", "zoals een *figuur* in", "je cursus."] },
];
