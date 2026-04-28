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
export type FontSize = "xs" | "sm" | "base" | "lg" | "xl";

export const fontSizeMap: Record<FontSize, number> = {
  xs: 12,
  sm: 13,
  base: 14,
  lg: 16,
  xl: 18,
};

interface ThemeContextValue {
  mode: Mode;
  font: FontFamily;
  fontSize: FontSize;
  shape: Shape;
  density: Density;
  accentColor: string;
  saturation: number;
  setMode: (m: Mode) => void;
  setFont: (f: FontFamily) => void;
  setFontSize: (s: FontSize) => void;
  setShape: (s: Shape) => void;
  setDensity: (d: Density) => void;
  setAccentColor: (c: string) => void;
  setSaturation: (s: number) => void;
  resetDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "shorly-theme";

const defaults = {
  mode: "dark" as Mode,
  font: "Inter" as FontFamily,
  fontSize: "base" as FontSize,
  shape: "default" as Shape,
  density: "normal" as Density,
  accentColor: "#3b82f6",
  saturation: 100,
};

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

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function applyAccentWithSaturation(hex: string, saturationOverride: number): string {
  const [h, , l] = hexToHsl(hex);
  return `hsl(${h}, ${saturationOverride}%, ${l}%)`;
}

// function loadFromStorage(): typeof defaults {
//   try {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (!stored) return defaults;
//     return { ...defaults, ...JSON.parse(stored) };
//   } catch {
//     return defaults;
//   }
// }

function loadFromStorage(): typeof defaults {
  if (typeof window === "undefined") return defaults;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaults;
    return { ...defaults, ...JSON.parse(stored) };
  } catch {
    return defaults;
  }
}

function saveToStorage(theme: typeof defaults) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch {
    // localStorage unavailable — fail silently
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // const [mounted, setMounted] = useState(false);
  // const [mode, setModeState] = useState<Mode>(defaults.mode);
  // const [font, setFontState] = useState<FontFamily>(defaults.font);
  // const [fontSize, setFontSizeState] = useState<FontSize>(defaults.fontSize);
  // const [shape, setShapeState] = useState<Shape>(defaults.shape);
  // const [density, setDensityState] = useState<Density>(defaults.density);
  // const [accentColor, setAccentColorState] = useState(defaults.accentColor);
  // const [saturation, setSaturationState] = useState(defaults.saturation);

  // useEffect(() => {
  //   const saved = loadFromStorage();
  //   setModeState(saved.mode);
  //   setFontState(saved.font);
  //   setFontSizeState(saved.fontSize);
  //   setShapeState(saved.shape);
  //   setDensityState(saved.density);
  //   setAccentColorState(saved.accentColor);
  //   setSaturationState(saved.saturation ?? 100);
  //   setMounted(true);
  // }, []);

  // Lazy initialization — reads localStorage once on mount, no setState in effects
  const [mode, setModeState] = useState<Mode>(() => loadFromStorage().mode);
  const [font, setFontState] = useState<FontFamily>(() => loadFromStorage().font);
  const [fontSize, setFontSizeState] = useState<FontSize>(() => loadFromStorage().fontSize);
  const [shape, setShapeState] = useState<Shape>(() => loadFromStorage().shape);
  const [density, setDensityState] = useState<Density>(() => loadFromStorage().density);
  const [accentColor, setAccentColorState] = useState<string>(() => loadFromStorage().accentColor);
  const [saturation, setSaturationState] = useState<number>(() => loadFromStorage().saturation ?? 100);

  // useEffect(() => {
  //   if (!mounted) return;

  //   const colors = modeColors[mode];
  //   const root = document.documentElement;
  //   const px = fontSizeMap[fontSize];

  //   root.style.fontSize = `${px}px`;
  //   root.style.setProperty("--base-font-size", `${px}px`);
  //   root.style.setProperty("--text-xs", `${px * 0.75}px`);
  //   root.style.setProperty("--text-sm", `${px * 0.875}px`);
  //   root.style.setProperty("--text-base", `${px}px`);
  //   root.style.setProperty("--text-lg", `${px * 1.125}px`);
  //   root.style.setProperty("--text-xl", `${px * 1.25}px`);
  //   root.style.setProperty("--text-2xl", `${px * 1.5}px`);
  //   root.style.setProperty("--text-3xl", `${px * 1.875}px`);
  //   root.style.setProperty("--text-4xl", `${px * 2.25}px`);

  //   root.style.setProperty("--bg", colors.bg);
  //   root.style.setProperty("--surface", colors.surface);
  //   root.style.setProperty("--border", colors.border);
  //   root.style.setProperty("--text-primary", colors.textPrimary);
  //   root.style.setProperty("--text-muted", colors.textMuted);
  //   root.style.setProperty(
  //     "--accent",
  //     applyAccentWithSaturation(accentColor, saturation)
  //   );
  //   root.style.setProperty("--radius", shapeRadius[shape]);
  //   root.style.setProperty("--density-padding", densityPadding[density]);
  //   root.style.setProperty("--font-ui", fontStack[font]);

  //   document.body.style.fontFamily = fontStack[font];
  //   document.body.style.backgroundColor = colors.bg;
  //   document.body.style.color = colors.textPrimary;

  //   saveToStorage({ mode, font, fontSize, shape, density, accentColor, saturation });
  // }, [mounted, mode, font, fontSize, shape, density, accentColor, saturation]);

  useEffect(() => {
  const colors = modeColors[mode];
  const root = document.documentElement;
  const px = fontSizeMap[fontSize];

  root.style.fontSize = `${px}px`;
  root.style.setProperty("--base-font-size", `${px}px`);
  root.style.setProperty("--text-xs", `${px * 0.75}px`);
  root.style.setProperty("--text-sm", `${px * 0.875}px`);
  root.style.setProperty("--text-base", `${px}px`);
  root.style.setProperty("--text-lg", `${px * 1.125}px`);
  root.style.setProperty("--text-xl", `${px * 1.25}px`);
  root.style.setProperty("--text-2xl", `${px * 1.5}px`);
  root.style.setProperty("--text-3xl", `${px * 1.875}px`);
  root.style.setProperty("--text-4xl", `${px * 2.25}px`);

  root.style.setProperty("--bg", colors.bg);
  root.style.setProperty("--surface", colors.surface);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--text-primary", colors.textPrimary);
  root.style.setProperty("--text-muted", colors.textMuted);
  root.style.setProperty(
    "--accent",
    applyAccentWithSaturation(accentColor, saturation)
  );
  root.style.setProperty("--radius", shapeRadius[shape]);
  root.style.setProperty("--density-padding", densityPadding[density]);
  root.style.setProperty("--font-ui", fontStack[font]);

  document.body.style.fontFamily = fontStack[font];
  document.body.style.backgroundColor = colors.bg;
  document.body.style.color = colors.textPrimary;

  saveToStorage({ mode, font, fontSize, shape, density, accentColor, saturation });
}, [mode, font, fontSize, shape, density, accentColor, saturation]);

  function setMode(m: Mode) { setModeState(m); }
  function setFont(f: FontFamily) { setFontState(f); }
  function setFontSize(s: FontSize) { setFontSizeState(s); }
  function setShape(s: Shape) { setShapeState(s); }
  function setDensity(d: Density) { setDensityState(d); }
  function setAccentColor(c: string) { setAccentColorState(c); }
  function setSaturation(s: number) { setSaturationState(s); }

  function resetDefaults() {
    setModeState(defaults.mode);
    setFontState(defaults.font);
    setFontSizeState(defaults.fontSize);
    setShapeState(defaults.shape);
    setDensityState(defaults.density);
    setAccentColorState(defaults.accentColor);
    setSaturationState(defaults.saturation);
    saveToStorage(defaults);
  }


  return (
    <ThemeContext.Provider
      value={{
        mode, font, fontSize, shape, density, accentColor, saturation,
        setMode, setFont, setFontSize, setShape, setDensity,
        setAccentColor, setSaturation, resetDefaults,
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