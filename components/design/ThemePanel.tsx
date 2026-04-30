"use client";

import {
  useTheme,
  FontFamily,
  Shape,
  Density,
  Mode,
  FontSize,
  fontSizeMap,
} from "../../lib/theme";

const fonts: { value: FontFamily; stack: string }[] = [
  { value: "Inter", stack: "Inter, sans-serif" },
  { value: "DM Sans", stack: "DM Sans, sans-serif" },
  { value: "Plus Jakarta Sans", stack: "Plus Jakarta Sans, sans-serif" },
  { value: "Space Grotesk", stack: "Space Grotesk, sans-serif" },
  { value: "Geist", stack: "Inter, sans-serif" },
];

const fontSizes: { value: FontSize; label: string }[] = [
  { value: "xs", label: "XS" },
  { value: "sm", label: "SM" },
  { value: "base", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
];

const accentSwatches = [
  "#3b82f6", "#8b5cf6", "#06b6d4", "#14b8a6", "#22c55e",
  "#84cc16", "#f97316", "#ef4444", "#ec4899", "#a855f7",
];

const shapes: { value: Shape; label: string }[] = [
  { value: "sharp", label: "Sharp" },
  { value: "default", label: "Default" },
  { value: "soft", label: "Soft" },
  { value: "round", label: "Round" },
];

const shapePreviewRadius: Record<Shape, string> = {
  sharp: "2px",
  default: "8px",
  soft: "20px",
  round: "999px",
};

const densities: { value: Density; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "spacious", label: "Spacious" },
];

const densityDots: Record<Density, number> = {
  compact: 1,
  normal: 3,
  spacious: 5,
};

function SectionHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ color: "var(--accent)", fontSize: 13 }}>{icon}</span>
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: "var(--text-subtle)" }}
      >
        {label}
      </span>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      className="my-5"
      style={{ borderTop: "1px solid var(--border)" }}
    />
  );
}

export function ThemePanel() {
  const {
    mode,
    font,
    fontSize,
    shape,
    density,
    accentColor,
    saturation,
    setMode,
    setFont,
    setFontSize,
    setShape,
    setDensity,
    setAccentColor,
    setSaturation,
    resetDefaults,
  } = useTheme();

  return (
    <aside
      className="fixed left-0 xl:left-56 top-0 h-screen w-60 flex flex-col overflow-y-auto z-40 theme-panel-scroll"
      style={{
        backgroundColor: "var(--bg)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h2
          className="font-bold mb-0.5"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
        >
          Design Tokens
        </h2>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
          Changes apply live across all components.
        </p>
      </div>

      <div className="mx-4" style={{ borderTop: "1px solid var(--border)" }} />

      <div className="px-4 py-4 space-y-5 flex-1">

        {/* COLOR */}
        <section>
          <SectionHeader icon="◑" label="Color" />

          <SubLabel>Mode</SubLabel>
          <div
            className="flex overflow-hidden mb-4 p-0.5"
            style={{
              backgroundColor: "var(--surface)",
              borderRadius: "var(--radius)",
            }}
          >
            {(["Dark", "Light"] as const).map((m) => {
              const isActive = mode === m.toLowerCase();
              return (
                <button
                  key={m}
                  onClick={() => setMode(m.toLowerCase() as Mode)}
                  className="flex-1 py-1.5 font-medium transition-colors cursor-pointer"
                  style={{
                    fontSize: "var(--text-xs)",
                    backgroundColor: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <SubLabel>Accent</SubLabel>
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {accentSwatches.map((color) => {
              const isActive = accentColor === color;
              return (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className="w-full aspect-square rounded-md cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    outline: isActive ? "2px solid var(--text-primary)" : "none",
                    outlineOffset: "2px",
                  }}
                  aria-label={`Set accent color to ${color}`}
                  title={color}
                >
                  {isActive && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-1.5">
            <SubLabel>Saturation</SubLabel>
            <span
              className="font-mono"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              {saturation}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: "var(--accent)" }}
            aria-label="Color saturation"
          />
          <div
            className="flex justify-between mt-1"
            style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
          >
            <span>0%</span>
            <span>100%</span>
          </div>
        </section>

        <Divider />

        {/* TYPOGRAPHY */}
        <section>
          <SectionHeader icon="T" label="Typography" />

          <SubLabel>Font family</SubLabel>
          <div className="space-y-1 mb-4">
            {fonts.map(({ value, stack }) => {
              const isActive = font === value;
              return (
                <button
                  key={value}
                  onClick={() => setFont(value)}
                  className="w-full flex items-center justify-between px-3 py-2 transition-colors cursor-pointer"
                  style={{
                    fontFamily: stack,
                    fontSize: "var(--text-sm)",
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "transparent",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    border: isActive
                      ? "1px solid color-mix(in srgb, var(--accent) 40%, transparent)"
                      : "1px solid transparent",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <span>{value}</span>
                  <span style={{ color: isActive ? "var(--accent)" : "var(--text-subtle)" }}>
                    Ag
                  </span>
                </button>
              );
            })}
          </div>

          <SubLabel>Base size</SubLabel>
          <div className="flex gap-1.5">
            {fontSizes.map(({ value, label }) => {
              const isActive = fontSize === value;
              return (
                <button
                  key={value}
                  onClick={() => setFontSize(value)}
                  className="flex-1 py-1.5 font-medium cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "var(--surface)",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    border: isActive
                      ? "1px solid color-mix(in srgb, var(--accent) 40%, transparent)"
                      : "1px solid transparent",
                    fontSize: `${fontSizeMap[value]}px`,
                    borderRadius: "var(--radius)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div
            className="flex justify-between mt-1.5"
            style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
          >
            <span>12px</span>
            <span>18px</span>
          </div>
        </section>

        <Divider />

        {/* SHAPE */}
        <section>
          <SectionHeader icon="▢" label="Shape" />
          <div className="grid grid-cols-2 gap-2">
            {shapes.map(({ value, label }) => {
              const isActive = shape === value;
              return (
                <button
                  key={value}
                  onClick={() => setShape(value)}
                  className="flex flex-col items-center gap-2 p-3 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "var(--surface)",
                    border: isActive
                      ? "1px solid color-mix(in srgb, var(--accent) 40%, transparent)"
                      : "1px solid transparent",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className="w-9 h-6"
                    style={{
                      backgroundColor: isActive ? "var(--accent)" : "var(--border)",
                      borderRadius: shapePreviewRadius[value],
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-muted)",
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* DENSITY */}
        <section>
          <SectionHeader icon="≡" label="Density" />
          <div className="space-y-1.5">
            {densities.map(({ value, label }) => {
              const isActive = density === value;
              return (
                <button
                  key={value}
                  onClick={() => setDensity(value)}
                  className="w-full flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors"
                  style={{
                    fontSize: "var(--text-sm)",
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "var(--surface)",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                    border: isActive
                      ? "1px solid color-mix(in srgb, var(--accent) 40%, transparent)"
                      : "1px solid transparent",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <span className="font-medium">{label}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: densityDots[value] }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: isActive
                            ? "var(--accent)"
                            : "var(--text-subtle)",
                        }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Reset button */}
      <div className="px-4 pb-6 pt-2">
        <button
          onClick={resetDefaults}
          className="w-full py-2.5 font-medium transition-colors cursor-pointer"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            borderRadius: "var(--radius)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--border)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--surface)")
          }
        >
          Reset to defaults
        </button>
      </div>
    </aside>
  );
}
