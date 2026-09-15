import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { POP, venster, voortgang } from "../../stijl/anim";
import { SANS } from "../../stijl/fonts";
import { Kaart } from "../../stijl/kaart";
import { C } from "../../stijl/kleuren";
import { Op } from "../../stijl/op";
import { Ruw, rechthoek } from "../../stijl/ruw";
import { Gsm, vinkje } from "./Tekeningen";
import { FASE } from "./tijdlijn";

// "Kijk na" uit het recept: klopt de tekst, is ze leesbaar op een gsm, en staat er iets in dat je
// niet vroeg? Het kaartje heeft de rode rand en de roze achtergrond van Kijk na op de site.
const VRAGEN = ["klopt de tekst?", "leesbaar op een gsm?", "staat er iets in dat je niet vroeg?"];
const RIJ0 = 868;
const RIJ = 170;
const VAKJES = VRAGEN.map((_, i) =>
  rechthoek(505, RIJ0 + i * RIJ, 58, 58, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, roughness: 1.3, seed: 2700 + i }),
);
const VINKJES = VRAGEN.map((_, i) => vinkje(503, RIJ0 + i * RIJ - 8, 2710 + i));

export const Nakijken: React.FC = () => {
  const f = useCurrentFrame();
  const N = FASE.nakijken;
  const zicht = venster(f, N, FASE.einde, 15);
  if (zicht <= 0) return null;
  const pop = voortgang(f, N, 20, POP);
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      <Op x={80} y={770} schaal={1.13 * (0.85 + 0.15 * pop)}>
        <Gsm inhoud="hoera" />
      </Op>
      <Kaart vak={{ x: 460, y: 800, w: 570, h: 560 }} rand={C.RED} achtergrond="#fffafa" opacity={voortgang(f, N + 8, 12)} />
      {VRAGEN.map((v, i) => {
        const s = N + 25 + i * 40;
        const o = voortgang(f, s, 12);
        if (o <= 0) return null;
        return (
          <React.Fragment key={i}>
            <Ruw vorm={VAKJES[i]} opacity={o} />
            <Ruw vorm={VINKJES[i]} toon={voortgang(f, s + 22, 12)} />
            <div
              style={{
                position: "absolute",
                left: 590,
                top: RIJ0 + i * RIJ - 2,
                width: 425,
                fontFamily: SANS,
                fontSize: 37,
                lineHeight: 1.3,
                color: C.GRAY,
                opacity: o,
              }}
            >
              {v}
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
