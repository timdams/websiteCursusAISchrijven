import React from "react";
import { SANS } from "./fonts";
import { C } from "./kleuren";
import type { Vak } from "./ruw";

export const CONSOLE_BALK = 60;

// Een consolevenster voor de uitvoer van code: zwart, met een donker labelbalkje en een klein label
// in hoofdletters ("Console", "Terminal", "Uitvoer").
export const ConsolePaneel: React.FC<{ vak: Vak; label?: string }> = ({ vak, label = "Console" }) => (
  <div
    style={{
      position: "absolute",
      left: vak.x,
      top: vak.y,
      width: vak.w,
      height: vak.h,
      background: C.CONSOLE_BG,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 6px 26px rgba(0, 0, 0, 0.18)",
    }}
  >
    <div
      style={{
        height: CONSOLE_BALK,
        boxSizing: "border-box",
        background: C.CONSOLE_BALK,
        borderBottom: `2px solid ${C.CONSOLE_RAND}`,
        color: C.CONSOLE_LABEL,
        fontFamily: SANS,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        paddingLeft: 28,
      }}
    >
      {label}
    </div>
  </div>
);
