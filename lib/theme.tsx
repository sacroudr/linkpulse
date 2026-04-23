// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// export type FontFamily =
//   | "Inter"
//   | "DM Sans"
//   | "Plus Jakarta Sans"
//   | "Space Grotesk"
//   | "Geist";

// export type Shape = "sharp" | "default" | "soft" | "round";
// export type Density = "compact" | "normal" | "spacious";

// interface ThemeState {
//   font: FontFamily;
//   fontSize: number;
//   shape: Shape;
//   density: Density;
//   accentColor: string;
//   bgColor: string;
//   surfaceColor: string;
// }

// interface ThemeContextValue extends ThemeState {
//   setFont: (f: FontFamily) => void;
//   setFontSize: (s: number) => void;
//   setShape: (s: Shape) => void;
//   setDensity: (d: Density) => void;
//   setAccentColor: (c: string) => void;
//   setBgColor: (c: string) => void;
//   setSurfaceColor: (c: string) => void;
// }

// const ThemeContext = createContext<ThemeContextValue | null>(null);

// const shapeRadius: Record<Shape, string> = {
//   sharp: "0px",
//   default: "8px",
//   soft: "14px",
//   round: "999px",
// };

// const densityPadding: Record<Density, string> = {
//   compact: "6px 12px",
//   normal: "10px 16px",
//   spacious: "14px 22px",
// };

// const fontStack: Record<FontFamily, string> = {
//   Inter: "var(--font-inter), sans-serif",
//   "DM Sans": "var(--font-dm-sans), sans-serif",
//   "Plus Jakarta Sans": "var(--font-plus-jakarta), sans-serif",
//   "Space Grotesk": "var(--font-space-grotesk), sans-serif",
//   Geist: "var(--font-inter), sans-serif",
// };

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [font, setFont] = useState<FontFamily>("Inter");
//   const [fontSize, setFontSize] = useState(14);
//   const [shape, setShape] = useState<Shape>("default");
//   const [density, setDensity] = useState<Density>("normal");
//   const [accentColor, setAccentColor] = useState("#3b82f6");
//   const [bgColor, setBgColor] = useState("#09090b");
//   const [surfaceColor, setSurfaceColor] = useState("#111113");

//   useEffect(() => {
//     const root = document.documentElement;
//     root.style.setProperty("--font-ui", fontStack[font]);
//     root.style.setProperty("--radius", shapeRadius[shape]);
//     root.style.setProperty("--density-padding", densityPadding[density]);
//     root.style.setProperty("--base-font-size", `${fontSize}px`);
//     root.style.setProperty("--accent", accentColor);
//     root.style.setProperty("--bg", bgColor);
//     root.style.setProperty("--surface", surfaceColor);

//     // Apply font and bg globally
//     document.body.style.fontFamily = fontStack[font];
//     document.body.style.fontSize = `${fontSize}px`;
//     document.body.style.backgroundColor = bgColor;
//   }, [font, fontSize, shape, density, accentColor, bgColor, surfaceColor]);

//   return (
//     <ThemeContext.Provider
//       value={{
//         font, fontSize, shape, density,
//         accentColor, bgColor, surfaceColor,
//         setFont, setFontSize, setShape, setDensity,
//         setAccentColor, setBgColor, setSurfaceColor,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
//   return ctx;
// }


// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";

// export type FontFamily =
//   | "Inter"
//   | "DM Sans"
//   | "Plus Jakarta Sans"
//   | "Space Grotesk"
//   | "Geist";

// export type Shape = "sharp" | "default" | "soft" | "round";
// export type Density = "compact" | "normal" | "spacious";
// export type Mode = "dark" | "light";

// interface ThemeState {
//   mode: Mode;
//   font: FontFamily;
//   fontSize: number;
//   shape: Shape;
//   density: Density;
//   accentColor: string;
//   bgColor: string;
//   surfaceColor: string;
// }

// interface ThemeContextValue extends ThemeState {
//   setMode: (m: Mode) => void;
//   setFont: (f: FontFamily) => void;
//   setFontSize: (s: number) => void;
//   setShape: (s: Shape) => void;
//   setDensity: (d: Density) => void;
//   setAccentColor: (c: string) => void;
//   setBgColor: (c: string) => void;
//   setSurfaceColor: (c: string) => void;
//   resetDefaults: () => void;
// }

// const ThemeContext = createContext<ThemeContextValue | null>(null);

// const shapeRadius: Record<Shape, string> = {
//   sharp: "0px",
//   default: "8px",
//   soft: "14px",
//   round: "999px",
// };

// const densityPadding: Record<Density, string> = {
//   compact: "6px 12px",
//   normal: "10px 16px",
//   spacious: "14px 22px",
// };

// const fontStack: Record<FontFamily, string> = {
//   Inter: "var(--font-inter), sans-serif",
//   "DM Sans": "var(--font-dm-sans), sans-serif",
//   "Plus Jakarta Sans": "var(--font-plus-jakarta), sans-serif",
//   "Space Grotesk": "var(--font-space-grotesk), sans-serif",
//   Geist: "var(--font-inter), sans-serif",
// };

// const modeColors: Record<Mode, { bg: string; surface: string; border: string; textPrimary: string; textMuted: string }> = {
//   dark: {
//     bg: "#09090b",
//     surface: "#111113",
//     border: "#27272a",
//     textPrimary: "#ffffff",
//     textMuted: "#71717a",
//   },
//   light: {
//     bg: "#f4f4f5",
//     surface: "#ffffff",
//     border: "#e4e4e7",
//     textPrimary: "#09090b",
//     textMuted: "#71717a",
//   },
// };

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [mode, setMode] = useState<Mode>("dark");
//   const [font, setFont] = useState<FontFamily>("Inter");
//   const [fontSize, setFontSize] = useState(14);
//   const [shape, setShape] = useState<Shape>("default");
//   const [density, setDensity] = useState<Density>("normal");
//   const [accentColor, setAccentColor] = useState("#3b82f6");
//   const [bgColor, setBgColor] = useState("#09090b");
//   const [surfaceColor, setSurfaceColor] = useState("#111113");

//   useEffect(() => {
//     const root = document.documentElement;
//     const colors = modeColors[mode];

//     // Mode colors
//     root.style.setProperty("--bg", colors.bg);
//     root.style.setProperty("--surface", colors.surface);
//     root.style.setProperty("--border", colors.border);
//     root.style.setProperty("--text-primary", colors.textPrimary);
//     root.style.setProperty("--text-muted", colors.textMuted);

//     // Apply bg to body
//     document.body.style.backgroundColor = colors.bg;
//     document.body.style.color = colors.textPrimary;

//     // Sync bgColor and surfaceColor state with mode
//     setBgColor(colors.bg);
//     setSurfaceColor(colors.surface);
//   }, [mode]);

//   useEffect(() => {
//     const root = document.documentElement;
//     root.style.setProperty("--font-ui", fontStack[font]);
//     root.style.setProperty("--radius", shapeRadius[shape]);
//     root.style.setProperty("--density-padding", densityPadding[density]);
//     root.style.setProperty("--base-font-size", `${fontSize}px`);
//     root.style.setProperty("--accent", accentColor);
//     root.style.setProperty("--bg", bgColor);
//     root.style.setProperty("--surface", surfaceColor);

//     document.body.style.fontFamily = fontStack[font];
//     document.body.style.fontSize = `${fontSize}px`;
//     document.body.style.backgroundColor = bgColor;
//     document.body.style.color = mode === "dark" ? "#ffffff" : "#09090b";
//   }, [font, fontSize, shape, density, accentColor, bgColor, surfaceColor, mode]);

//   function resetDefaults() {
//     setMode("dark");
//     setFont("Inter");
//     setFontSize(14);
//     setShape("default");
//     setDensity("normal");
//     setAccentColor("#3b82f6");
//     setBgColor("#09090b");
//     setSurfaceColor("#111113");
//   }

//   return (
//     <ThemeContext.Provider
//       value={{
//         mode, font, fontSize, shape, density,
//         accentColor, bgColor, surfaceColor,
//         setMode, setFont, setFontSize, setShape, setDensity,
//         setAccentColor, setBgColor, setSurfaceColor,
//         resetDefaults,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
//   return ctx;
// }


"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type FontFamily =
  | "Inter"
  | "DM Sans"
  | "Plus Jakarta Sans"
  | "Space Grotesk"
  | "Geist";

export type Shape = "sharp" | "default" | "soft" | "round";
export type Density = "compact" | "normal" | "spacious";
export type Mode = "dark" | "light";

interface ThemeContextValue {
  mode: Mode;
  font: FontFamily;
  fontSize: number;
  shape: Shape;
  density: Density;
  accentColor: string;
  setMode: (m: Mode) => void;
  setFont: (f: FontFamily) => void;
  setFontSize: (s: number) => void;
  setShape: (s: Shape) => void;
  setDensity: (d: Density) => void;
  setAccentColor: (c: string) => void;
  resetDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const shapeRadius: Record<Shape, string> = {
  sharp: "0px",
  default: "8px",
  soft: "14px",
  round: "999px",
};

const densityPadding: Record<Density, string> = {
  compact: "6px 12px",
  normal: "10px 16px",
  spacious: "14px 22px",
};

const fontStack: Record<FontFamily, string> = {
  Inter: "var(--font-inter), sans-serif",
  "DM Sans": "var(--font-dm-sans), sans-serif",
  "Plus Jakarta Sans": "var(--font-plus-jakarta), sans-serif",
  "Space Grotesk": "var(--font-space-grotesk), sans-serif",
  Geist: "var(--font-inter), sans-serif",
};

export const modeColors: Record<Mode, {
  bg: string;
  surface: string;
  border: string;
  textPrimary: string;
  textMuted: string;
}> = {
  dark: {
    bg: "#09090b",
    surface: "#111113",
    border: "#27272a",
    textPrimary: "#ffffff",
    textMuted: "#71717a",
  },
  light: {
    bg: "#f4f4f5",
    surface: "#ffffff",
    border: "#e4e4e7",
    textPrimary: "#09090b",
    textMuted: "#71717a",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  const [font, setFont] = useState<FontFamily>("Inter");
  const [fontSize, setFontSize] = useState(14);
  const [shape, setShape] = useState<Shape>("default");
  const [density, setDensity] = useState<Density>("normal");
  const [accentColor, setAccentColor] = useState("#3b82f6");

  // Derived directly from mode — no separate state needed
  const colors = modeColors[mode];

  useEffect(() => {
    const root = document.documentElement;

    // Mode-derived colors
    root.style.setProperty("--bg", colors.bg);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--text-primary", colors.textPrimary);
    root.style.setProperty("--text-muted", colors.textMuted);

    // Other tokens
    root.style.setProperty("--accent", accentColor);
    root.style.setProperty("--radius", shapeRadius[shape]);
    root.style.setProperty("--density-padding", densityPadding[density]);
    root.style.setProperty("--base-font-size", `${fontSize}px`);
    root.style.setProperty("--font-ui", fontStack[font]);

    // Apply directly to body
    document.body.style.fontFamily = fontStack[font];
    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.textPrimary;
  }, [mode, font, fontSize, shape, density, accentColor, colors]);

  function resetDefaults() {
    setMode("dark");
    setFont("Inter");
    setFontSize(14);
    setShape("default");
    setDensity("normal");
    setAccentColor("#3b82f6");
  }

  return (
    <ThemeContext.Provider
      value={{
        mode, font, fontSize, shape, density, accentColor,
        setMode, setFont, setFontSize, setShape, setDensity,
        setAccentColor, resetDefaults,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}