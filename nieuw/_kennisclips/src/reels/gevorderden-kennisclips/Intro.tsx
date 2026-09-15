import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { POP, venster, voortgang } from "../../stijl/anim";
import { Op } from "../../stijl/op";
import { Robot } from "../../stijl/robot";
import { Gsm } from "./Tekeningen";
import { FASE } from "./tijdlijn";

// De vraag van de collega: kennisclips, voor Instagram. Een gsm met een afspeelknop, en een robot.
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const zicht = venster(f, FASE.verhaal, FASE.nodig, 15);
  if (zicht <= 0) return null;
  const pop = voortgang(f, FASE.verhaal + 8, 20, POP);
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      <Op x={140} y={800} schaal={1.1 * (0.85 + 0.15 * pop)}>
        <Gsm inhoud="afspelen" toon={voortgang(f, FASE.verhaal + 25, 25)} />
      </Op>
      <Robot
        src="robot-papier.png"
        x={600}
        y={810}
        hoogte={630}
        hoek={Math.sin(f / 9) * 2}
        opacity={voortgang(f, FASE.verhaal + 15, 15)}
      />
    </AbsoluteFill>
  );
};
