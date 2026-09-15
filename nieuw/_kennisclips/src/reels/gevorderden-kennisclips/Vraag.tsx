import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { POP, getypt, venster, voortgang } from "../../stijl/anim";
import { HAND, SANS } from "../../stijl/fonts";
import { Kaart, KaartLabel, MapIcoon } from "../../stijl/kaart";
import { C } from "../../stijl/kleuren";
import { Op } from "../../stijl/op";
import { Ruw, cirkel, lijn, rechthoek } from "../../stijl/ruw";
import { Mannetje } from "./Tekeningen";
import { FASE } from "./tijdlijn";

// Stap 5 van het klikpad: de vraag, letterlijk uit het recept maar enkel het midden (vandaar het
// beletselteken). Daarna wat Claude maakt: de demoanimatie, een how-to en een eigen skill.
const PROMPT =
  '… Zorg daar eerst voor, en maak dan een demoanimatie van een mannetje dat "Hoera voor [naam van je school]" roept.';
const HAAK_OPEN = PROMPT.indexOf("[");
const HAAK_DICHT = PROMPT.indexOf("]") + 1;

const FILM = rechthoek(80, 1050, 700, 400, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, seed: 2500 });
const GAATJES = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce<ReturnType<typeof rechthoek>[]>(
  (alle, k) =>
    alle.concat([
      rechthoek(108 + k * 74, 1068, 30, 22, { strokeWidth: 2, roughness: 1, seed: 2510 + k }),
      rechthoek(108 + k * 74, 1410, 30, 22, { strokeWidth: 2, roughness: 1, seed: 2520 + k }),
    ]),
  [],
);
const LIJNEN = [0, 1, 2, 3].map((k) => lijn(44, 132 + k * 42, k === 3 ? 230 : 360, 132 + k * 42, { strokeWidth: 3, seed: 2530 + k }));
// Toegevoegd, niet uit de bron: de twee kleuren zijn het voorbeeld uit de prompt "De skill naar je
// hand zetten" in het recept (donkerblauw #1F3A5F en geel #F2C300).
const BLAUW = cirkel(80, 220, 76, { fill: "#1F3A5F", fillStyle: "solid", strokeWidth: 2.4, seed: 2540 });
const GEEL = cirkel(172, 220, 76, { fill: "#F2C300", fillStyle: "solid", strokeWidth: 2.4, seed: 2541 });

const tekst = (grootte: number, kleur: string, familie = HAND, gewicht = 700): React.CSSProperties => ({
  position: "absolute",
  fontFamily: familie,
  fontSize: grootte,
  fontWeight: gewicht,
  lineHeight: 1.2,
  color: kleur,
  whiteSpace: "nowrap",
});

export const Vraag: React.FC = () => {
  const f = useCurrentFrame();
  const V = FASE.vraag;
  const D = FASE.demo;
  const zicht = venster(f, V, FASE.installeren, 15);
  if (zicht <= 0) return null;

  const getikt = getypt(PROMPT, f, V + 15, 1);
  const prompt = venster(f, V, D + 5, 12);
  const film = voortgang(f, V + 120, 18, POP);
  const sprong = f > V + 150 ? -Math.abs(Math.sin((f - V - 150) / 6)) * 22 : 0;
  const resultaten = voortgang(f, D + 10, 18, POP);

  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      {prompt > 0 ? (
        <Kaart vak={{ x: 80, y: 640, w: 920, h: 350 }} rand={C.RED} opacity={prompt}>
          <KaartLabel tekst="Kopieer en pas aan" x={40} y={18} />
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 88,
              width: 830,
              fontFamily: SANS,
              fontSize: 40,
              lineHeight: 1.45,
              color: C.GRAY,
            }}
          >
            {getikt.slice(0, HAAK_OPEN)}
            <span style={{ color: C.RED, fontWeight: 700 }}>{getikt.slice(HAAK_OPEN, HAAK_DICHT)}</span>
            {getikt.slice(HAAK_DICHT)}
          </div>
        </Kaart>
      ) : null}

      {resultaten > 0 ? (
        <>
          <Kaart vak={{ x: 80, y: 650, w: 430, h: 330 }} opacity={voortgang(f, D + 10, 12)} schaal={0.85 + 0.15 * resultaten}>
            <div style={{ ...tekst(64, C.RED_DARK), left: 40, top: 22 }}>how-to</div>
            {LIJNEN.map((l, i) => (
              <Ruw key={i} vorm={l} toon={voortgang(f, D + 25 + i * 6, 10)} />
            ))}
          </Kaart>
          <Kaart
            vak={{ x: 550, y: 650, w: 450, h: 330 }}
            opacity={voortgang(f, D + 40, 12)}
            schaal={0.85 + 0.15 * voortgang(f, D + 40, 18, POP)}
          >
            <div style={{ ...tekst(60, C.RED_DARK), left: 40, top: 24, display: "flex", alignItems: "center", gap: 20 }}>
              <MapIcoon grootte={48} />
              eigen skill
            </div>
            <Ruw vorm={BLAUW} opacity={voortgang(f, D + 60, 10)} />
            <Ruw vorm={GEEL} opacity={voortgang(f, D + 68, 10)} />
            <div style={{ ...tekst(50, C.GRAY), left: 232, top: 186, opacity: voortgang(f, D + 76, 10) }}>huisstijl</div>
          </Kaart>
        </>
      ) : null}

      {film > 0 ? (
        <AbsoluteFill style={{ transform: `scale(${0.85 + 0.15 * film})`, transformOrigin: "430px 1250px", opacity: Math.min(1, film) }}>
          <Ruw vorm={FILM} />
          {GAATJES.map((g, i) => (
            <Ruw key={i} vorm={g} />
          ))}
          <Op x={170} y={1122 + sprong} schaal={1.05}>
            <Mannetje toon={voortgang(f, V + 130, 20)} />
          </Op>
          <div style={{ ...tekst(64, C.GRAY), left: 430, top: 1160, opacity: voortgang(f, V + 150, 10) }}>Hoera voor</div>
          <div
            style={{
              ...tekst(64, C.RED),
              left: 430,
              top: 1240,
              opacity: voortgang(f, V + 158, 10),
              transform: `scale(${0.7 + 0.3 * voortgang(f, V + 158, 16, POP)})`,
              transformOrigin: "0 50%",
            }}
          >
            je school!
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
