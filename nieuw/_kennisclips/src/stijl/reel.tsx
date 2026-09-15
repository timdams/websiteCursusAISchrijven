import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { POP, venster, voortgang } from "./anim";
import { HAND, MONO, MONO_BREEDTE, handBreedte } from "./fonts";
import { C } from "./kleuren";
import { PROJECT } from "./project";
import { Ruw, ellips, lijn, rechthoek, type Vak } from "./ruw";
import { Opmaak } from "./tekst";
import { Verteller } from "./verteller";

// Gedeeld door alle staande reels (1080x1920). Bovenaan ±250 px en onderaan ±420 px blijven leeg
// voor de naam, het bijschrift en de knoppen van Instagram.
const MET_VERTELLER = PROJECT.verteller !== null;

// Afgestemd op een verteller van ongeveer 3 op 4. Een andere afbeelding: x, hoogte en de staart
// van de ballon (STAART) bijstellen.
export const REEL_VERTELLER = { x: 20, y: 312, hoogte: 250 };
// Met een verteller staat de ballon rechts van hem, zonder verteller over de hele breedte.
export const REEL_BALLON: Vak = MET_VERTELLER
  ? { x: 250, y: 270, w: 750, h: 290 }
  : { x: 80, y: 270, w: 920, h: 290 };

/** Eén tekst in de ballon. `*nadruk*` en `` `code` `` mogen. */
export type ReelTekst = { van: number; tot: number; regels: string[] };

const BALLON_VORM = rechthoek(REEL_BALLON.x, REEL_BALLON.y, REEL_BALLON.w, REEL_BALLON.h, {
  fill: C.WHITE,
  fillStyle: "solid",
  strokeWidth: 2.6,
  roughness: 1.6,
  bowing: 1.2,
  seed: 500,
});
const STAART = lijn(REEL_BALLON.x, REEL_BALLON.y + 185, REEL_VERTELLER.x + 200, REEL_VERTELLER.y + 120, {
  strokeWidth: 2.6,
  roughness: 1.6,
  seed: 501,
});
// Kalam is breder dan Caveat: 46 px geeft ongeveer dezelfde 29 tekens per regel.
const BALLON_GROOTTE = 46;
const REGELHOOGTE = BALLON_GROOTTE * 1.18;

/**
 * De ballon, met de verteller ernaast als PROJECT.verteller ingevuld is.
 * Hoogstens 4 regels per tekst, van ±29 tekens met verteller en ±36 zonder.
 */
export const VertellerBallon: React.FC<{ teksten: ReelTekst[]; van: number; tot: number }> = ({
  teksten,
  van,
  tot,
}) => {
  const f = useCurrentFrame();
  const zicht = venster(f, van, tot, 12);
  if (zicht <= 0) return null;
  const wiebel = Math.sin(f / 6) * 3;

  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      {MET_VERTELLER ? (
        <>
          <Verteller x={REEL_VERTELLER.x} y={REEL_VERTELLER.y + wiebel} hoogte={REEL_VERTELLER.hoogte} />
          <Ruw vorm={STAART} />
        </>
      ) : null}
      <Ruw vorm={BALLON_VORM} />
      {teksten.map((t, i) => {
        const o = venster(f, t.van, t.tot, 10);
        if (o <= 0) return null;
        const hoogte = t.regels.length * REGELHOOGTE;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: REEL_BALLON.x + 40,
              width: REEL_BALLON.w - 80,
              top: REEL_BALLON.y + REEL_BALLON.h / 2 - hoogte / 2,
              fontFamily: HAND,
              fontSize: BALLON_GROOTTE,
              fontWeight: 700,
              lineHeight: `${REGELHOOGTE}px`,
              color: C.GRAY,
              opacity: o,
            }}
          >
            {t.regels.map((r, j) => (
              <div key={j} style={{ opacity: voortgang(f, t.van + j * 6, 10) }}>
                <Opmaak tekst={r} grootte={BALLON_GROOTTE} />
              </div>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const HAAK_REGEL = 90;
const haakRegel: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  textAlign: "center",
  fontFamily: HAND,
  fontSize: 92,
  fontWeight: 700,
  lineHeight: 1,
  color: C.GRAY,
};

/**
 * Het eerste beeld van een reel: een paar regels met één groot rood getal in een ovaal.
 * De tekst staat er vanaf frame 0, want dat frame moet al alles zeggen. Drie smalle cijfers passen
 * in de standaardovaal; een breder getal ("125") vraagt 720x380 en onderAfstand 400.
 */
export const Haak: React.FC<{
  boven: string[];
  groot: string;
  onder: string[];
  tot: number;
  top?: number;
  seed?: number;
  ovaalBreedte?: number;
  ovaalHoogte?: number;
  onderAfstand?: number;
  ovaalDy?: number;
}> = ({ boven, groot, onder, tot, top = 290, seed = 600, ovaalBreedte = 640, ovaalHoogte = 350, onderAfstand = 375, ovaalDy = 192 }) => {
  const f = useCurrentFrame();
  const zicht = venster(f, -30, tot, 15);
  if (zicht <= 0) return null;
  const grootTop = top + boven.length * HAAK_REGEL;
  const onderTop = grootTop + onderAfstand;
  // ovaalDy: Kalam zet een cijfer hoger in zijn regel dan Caveat, dus daar ligt het midden hoger.
  const ovaal = ellips(540, grootTop + ovaalDy, ovaalBreedte, ovaalHoogte, {
    stroke: C.RED_DARK,
    strokeWidth: 4,
    roughness: 1.4,
    seed,
  });
  const pop = voortgang(f, 0, 18, POP);

  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      {boven.map((r, i) => (
        <div key={`b${i}`} style={{ ...haakRegel, top: top + i * HAAK_REGEL }}>
          {r}
        </div>
      ))}
      <div
        style={{
          ...haakRegel,
          top: grootTop,
          fontSize: 340,
          color: C.RED,
          transform: `scale(${0.85 + 0.15 * pop})`,
        }}
      >
        {groot}
      </div>
      <Ruw vorm={ovaal} toon={voortgang(f, 22, 30)} />
      {onder.map((r, i) => (
        <div key={`o${i}`} style={{ ...haakRegel, top: onderTop + i * HAAK_REGEL }}>
          {r}
        </div>
      ))}
    </AbsoluteFill>
  );
};

// Zonder verteller schuift de eindkaart naar boven. Een lange titel krimpt tot hij in 960 px past.
const EIND_DY = MET_VERTELLER ? 0 : -260;
const TITEL_GROOTTE = Math.min(116, Math.floor((116 * 960) / Math.max(1, handBreedte(PROJECT.titel, 116))));
// Een lange website krimpt ook, tot ze in 960 px past.
const SITE_GROOTTE = Math.min(56, Math.floor(960 / Math.max(1, PROJECT.website.length * MONO_BREEDTE)));
const SITE_BREEDTE = PROJECT.website.length * SITE_GROOTTE * MONO_BREEDTE;
const SITE_TOP = 925 + (56 - SITE_GROOTTE) / 2;
const SITE_ONDER = SITE_TOP + SITE_GROOTTE * 1.35;
const EIND_ONDERLIJN = lijn(540 - SITE_BREEDTE / 2, SITE_ONDER + 5 + EIND_DY, 540 + SITE_BREEDTE / 2, SITE_ONDER + EIND_DY, {
  stroke: C.RED,
  strokeWidth: 4,
  roughness: 1.3,
  seed: 700,
});

const gecentreerd = (
  top: number,
  grootte: number,
  kleur: string,
  familie = HAND,
  gewicht = 700,
): React.CSSProperties => ({
  position: "absolute",
  left: 0,
  right: 0,
  top,
  textAlign: "center",
  fontFamily: familie,
  fontSize: grootte,
  fontWeight: gewicht,
  lineHeight: 1.15,
  color: kleur,
});

/**
 * Eindkaart met de verteller, de titel en website uit PROJECT, het onderdeel (hoofdstuk, module, les)
 * en de bron. Een leeg onderdeel valt weg.
 */
export const EindKaart: React.FC<{ start: number; onderdeel: string; bron: string[]; beelden?: string[] }> = ({
  start,
  onderdeel,
  bron,
  beelden,
}) => {
  const f = useCurrentFrame();
  const zicht = voortgang(f, start, 15);
  if (zicht <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      {beelden !== undefined ? (
        // Meer dan één figuur naast elkaar, in plaats van de verteller.
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 270,
            height: 370,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 60,
            transform: `scale(${0.8 + 0.2 * voortgang(f, start, 20, POP)})`,
          }}
        >
          {beelden.map((b) => (
            <Img key={b} src={staticFile(b)} style={{ height: 370, width: "auto" }} />
          ))}
        </div>
      ) : PROJECT.verteller !== null ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 300,
            height: 320,
            textAlign: "center",
            transform: `scale(${0.8 + 0.2 * voortgang(f, start, 20, POP)})`,
          }}
        >
          <Img
            src={staticFile(PROJECT.verteller)}
            style={{ height: 320, width: "auto", imageRendering: PROJECT.pixelart ? "pixelated" : "auto" }}
          />
        </div>
      ) : null}
      <div style={gecentreerd(680 + EIND_DY + (116 - TITEL_GROOTTE) / 2, TITEL_GROOTTE, C.GRAY)}>{PROJECT.titel}</div>
      {onderdeel !== "" ? <div style={gecentreerd(820 + EIND_DY, 64, C.RED_DARK)}>{onderdeel}</div> : null}
      {PROJECT.website !== "" ? (
        <>
          <div style={gecentreerd(SITE_TOP + EIND_DY, SITE_GROOTTE, C.GRAY, MONO)}>{PROJECT.website}</div>
          <Ruw vorm={EIND_ONDERLIJN} toon={voortgang(f, start + 20, 20)} />
        </>
      ) : null}
      <div style={{ ...gecentreerd(1250 + EIND_DY, 38, C.GRAY, HAND, 400), opacity: voortgang(f, start + 30, 15) }}>
        {bron.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
