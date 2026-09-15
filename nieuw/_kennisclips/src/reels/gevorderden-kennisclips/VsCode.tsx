import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BEWEEG, getypt, venster, voortgang } from "../../stijl/anim";
import { SANS } from "../../stijl/fonts";
import { BestandIcoon, MapIcoon, Pil } from "../../stijl/kaart";
import { C } from "../../stijl/kleuren";
import { Ruw, cirkel, lijn, rechthoek } from "../../stijl/ruw";
import { vinkje } from "./Tekeningen";
import { FASE } from "./tijdlijn";

// Stap 1 tot 4 van het klikpad voor Claude: de extensie van Anthropic, Open Folder, en de map
// excalidraw-videoclip zoals ze is in je map. De inhoud van de skill komt uit het mapje in het recept.

const RAAM = rechthoek(80, 640, 720, 790, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, seed: 2200 });
const BALK = lijn(80, 722, 800, 722, { seed: 2201 });
const BOLLETJES = [125, 162, 199].map((x, i) => cirkel(x, 681, 22, { seed: 2202 + i }));
const ZIJBALK = lijn(190, 722, 190, 1430, { seed: 2205 });
const ICOON_MAP = rechthoek(107, 762, 56, 56, { seed: 2206 });
const ICOON_EXT = rechthoek(107, 852, 56, 56, { seed: 2207 });
const AAN = { fill: C.RED_LIGHT, fillStyle: "hachure", hachureGap: 7, fillWeight: 2, stroke: C.RED, strokeWidth: 3 };
const ICOON_MAP_AAN = rechthoek(107, 762, 56, 56, { ...AAN, seed: 2208 });
const ICOON_EXT_AAN = rechthoek(107, 852, 56, 56, { ...AAN, seed: 2209 });
const ZOEKVAK = rechthoek(220, 808, 550, 74, { strokeWidth: 2.4, seed: 2210 });
const GEINSTALLEERD = vinkje(650, 930, 2211);

const kop: React.CSSProperties = {
  position: "absolute",
  left: 222,
  top: 748,
  fontFamily: SANS,
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: "0.06em",
  color: C.GRAY_STIL,
};

const rij = (left: number, top: number, opacity: number): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
  display: "flex",
  alignItems: "center",
  gap: 16,
  fontFamily: SANS,
  fontSize: 40,
  lineHeight: "56px",
  color: C.GRAY,
  whiteSpace: "nowrap",
  opacity,
});

const SKILL = [
  { naam: "SKILL.md", map: false },
  { naam: "references", map: true },
  { naam: "assets", map: true },
  { naam: "LEESMIJ.md", map: false },
];

export const VsCode: React.FC = () => {
  const f = useCurrentFrame();
  const K = FASE.klaarzetten;
  const M = FASE.map;
  const zicht = venster(f, K, FASE.vraag, 15);
  if (zicht <= 0) return null;
  const deel1 = venster(f, K, M, 10);
  const deel2 = venster(f, M, FASE.vraag + 30, 10);
  const binnen = voortgang(f, K, 20);

  return (
    <AbsoluteFill style={{ opacity: zicht, transform: `translateY(${(1 - binnen) * 40}px)` }}>
      <Ruw vorm={RAAM} />
      <Ruw vorm={BALK} />
      {BOLLETJES.map((b, i) => (
        <Ruw key={i} vorm={b} />
      ))}
      <div style={{ ...kop, left: 80, width: 720, top: 662, textAlign: "center", letterSpacing: 0, fontWeight: 400, fontSize: 32 }}>
        VS Code
      </div>
      <Ruw vorm={ZIJBALK} />
      <Ruw vorm={ICOON_MAP} />
      <Ruw vorm={ICOON_EXT} />

      {deel1 > 0 ? (
        <AbsoluteFill style={{ opacity: deel1 }}>
          <Ruw vorm={ICOON_EXT_AAN} />
          <div style={kop}>EXTENSIONS</div>
          <Ruw vorm={ZOEKVAK} />
          <div style={rij(244, 816, 1)}>{getypt("Claude", f, K + 15, 3)}</div>
          <div style={{ ...rij(226, 918, voortgang(f, K + 45, 12)), fontWeight: 700, fontSize: 42 }}>Claude</div>
          <div style={{ ...rij(226, 972, voortgang(f, K + 45, 12)), fontSize: 32, color: C.GRAY_STIL }}>Anthropic</div>
          <Pil tekst="Install" x={560} y={930} opacity={venster(f, K + 58, K + 100, 6)} schaal={1 - 0.08 * venster(f, K + 86, K + 98, 4)} />
          <Ruw vorm={GEINSTALLEERD} toon={voortgang(f, K + 100, 12)} />
        </AbsoluteFill>
      ) : null}

      {deel2 > 0 ? (
        <AbsoluteFill style={{ opacity: deel2 }}>
          <Ruw vorm={ICOON_MAP_AAN} />
          <div style={kop}>EXPLORER</div>
          <Pil tekst="Open Folder" x={222} y={820} opacity={venster(f, M, M + 58, 8)} schaal={1 - 0.08 * venster(f, M + 34, M + 46, 4)} />
          <div style={{ ...rij(222, 818, voortgang(f, M + 55, 10)), fontWeight: 700 }}>
            <MapIcoon grootte={40} />
            mijn map
          </div>
          <div
            style={{
              ...rij(262, 898, voortgang(f, M + 85, 8)),
              transform: `translateX(${(1 - voortgang(f, M + 85, 28, BEWEEG)) * 520}px)`,
            }}
          >
            <MapIcoon grootte={40} />
            excalidraw-videoclip
          </div>
          {SKILL.map((s, i) => (
            <div key={s.naam} style={rij(318, 978 + i * 72, voortgang(f, M + 125 + i * 10, 10))}>
              {s.map ? <MapIcoon grootte={34} /> : <BestandIcoon grootte={40} />}
              {s.naam}
            </div>
          ))}
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
