import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { POP, venster, voortgang } from "../../stijl/anim";
import { SANS } from "../../stijl/fonts";
import { Kaart } from "../../stijl/kaart";
import { C } from "../../stijl/kleuren";
import { Ruw, rechthoek } from "../../stijl/ruw";
import { Opmaak } from "../../stijl/tekst";
import { vinkje } from "./Tekeningen";
import { FASE } from "./tijdlijn";

// "Wat je nodig hebt" uit het recept, ingekort tot een regel per ding.
const ITEMS = [
  "een Claude-abonnement",
  "VS Code",
  "een map op je computer",
  "de skill *excalidraw-videoclip*",
  "de huisstijl van je school",
];
const RIJ0 = 712;
const RIJ = 148;
const VAKJES = ITEMS.map((_, i) =>
  rechthoek(135, RIJ0 + i * RIJ, 60, 60, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, roughness: 1.3, seed: 2300 + i }),
);
const VINKJES = ITEMS.map((_, i) => vinkje(135, RIJ0 + i * RIJ - 6, 2310 + i));

export const Nodig: React.FC = () => {
  const f = useCurrentFrame();
  const zicht = venster(f, FASE.nodig, FASE.klaarzetten, 15);
  if (zicht <= 0) return null;
  const pop = voortgang(f, FASE.nodig, 18, POP);
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      <Kaart vak={{ x: 80, y: 650, w: 920, h: 780 }} schaal={0.9 + 0.1 * pop} />
      {ITEMS.map((item, i) => {
        const s = FASE.nodig + 25 + i * 28;
        const o = voortgang(f, s, 12);
        if (o <= 0) return null;
        return (
          <React.Fragment key={i}>
            <Ruw vorm={VAKJES[i]} opacity={o} />
            <Ruw vorm={VINKJES[i]} toon={voortgang(f, s + 14, 12)} />
            <div
              style={{
                position: "absolute",
                left: 235 - (1 - voortgang(f, s, 18)) * 30,
                top: RIJ0 + i * RIJ - 2,
                fontFamily: SANS,
                fontSize: 44,
                lineHeight: "64px",
                color: C.GRAY,
                whiteSpace: "nowrap",
                opacity: o,
              }}
            >
              <Opmaak tekst={item} grootte={44} nadruk={C.RED} />
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
