import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { IN, venster, voortgang } from "../../stijl/anim";
import { C } from "../../stijl/kleuren";
import { EindKaart, Haak, VertellerBallon } from "../../stijl/reel";
import { Robot } from "../../stijl/robot";
import { Installeren } from "./Installeren";
import { Intro } from "./Intro";
import { Nakijken } from "./Nakijken";
import { Nodig } from "./Nodig";
import { Vraag } from "./Vraag";
import { VsCode } from "./VsCode";
import { FASE, TEKSTEN } from "./tijdlijn";

export { DUUR } from "./tijdlijn";

// Instagram-reel bij het recept Kennisclips en animaties (nieuw/gevorderden/kennisclips.qmd), in de
// kleuren en het handschrift van de site. De robots komen uit de titelprent.

const HaakRobot: React.FC = () => {
  const f = useCurrentFrame();
  const zicht = venster(f, -30, FASE.verhaal, 15);
  if (zicht <= 0) return null;
  return <Robot src="robot-zwaait.png" x={447} y={1030} hoogte={450} hoek={Math.sin(f / 5) * 3} opacity={zicht} />;
};

// De robot met de stapel papier helpt mee van de extensie tot de demoanimatie.
const Werkrobot: React.FC = () => {
  const f = useCurrentFrame();
  const zicht = venster(f, FASE.klaarzetten, FASE.installeren, 15);
  if (zicht <= 0) return null;
  const binnen = voortgang(f, FASE.klaarzetten, 25, IN);
  return (
    <Robot
      src="robot-papier.png"
      x={812 + (1 - binnen) * 300}
      y={1010}
      hoogte={440}
      hoek={Math.sin(f / 10) * 2}
      opacity={zicht}
    />
  );
};

export const ReelKennisclips: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.OFFWHITE }}>
    <Haak
      boven={["Kennisclips maken", "met Claude?"]}
      groot="5"
      onder={["dingen nodig,", "en één vraag."]}
      tot={FASE.verhaal}
      seed={2020}
      ovaalBreedte={460}
      ovaalHoogte={290}
      ovaalDy={146}
      onderAfstand={330}
    />
    <HaakRobot />
    <Intro />
    <Nodig />
    <VsCode />
    <Vraag />
    <Werkrobot />
    <Installeren />
    <Nakijken />
    <VertellerBallon teksten={TEKSTEN} van={FASE.verhaal} tot={FASE.einde} />
    <EindKaart
      start={FASE.einde}
      onderdeel="Kennisclips en animaties"
      bron={["Een recept voor gevorderden.", "Deze reel is met die skill gemaakt."]}
      beelden={["robot-zwaait.png", "robot-papier.png"]}
    />
  </AbsoluteFill>
);
