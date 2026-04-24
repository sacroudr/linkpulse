"use client";

import { useState } from "react";
import { Zap, Copy, Check, Trash2, TrendingUp, AlertCircle } from "lucide-react";
import { StatCard } from "../../../../components/ui/StatCard";
// import { StatCard } from "@/components/ui/StatCard";

// ─── Section header ───────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-6 h-0.5" style={{ backgroundColor: "var(--accent)" }} />
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: "var(--text-subtle, #52525b)" }}
      >
        {label} — Component
      </span>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold tracking-widest uppercase mb-3"
      style={{ color: "var(--text-subtle, #52525b)" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      className="my-10"
      style={{ borderTop: "1px solid var(--border)" }}
    />
  );
}

// ─── Button showcase ──────────────────────────────────────────────
function ButtonShowcase() {
  const [loading, setLoading] = useState(false);

  const base = "font-medium cursor-pointer transition-opacity text-sm";

  return (
    <section>
      <SectionHeader label="Button" />

      <SubLabel>Variants</SubLabel>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={base}
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Primary
        </button>
        <button
          className={base}
          style={{
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Secondary
        </button>
        <button
          className={base}
          style={{
            backgroundColor: "transparent",
            color: "#ef4444",
            border: "1px solid #ef4444",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Destructive
        </button>
        <button
          className={base}
          style={{
            backgroundColor: "transparent",
            color: "var(--text-muted)",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Ghost
        </button>
      </div>

      <SubLabel>Sizes</SubLabel>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { label: "Small", px: "6px 12px", text: "12px" },
          { label: "Medium", px: "10px 16px", text: "14px" },
          { label: "Large", px: "14px 20px", text: "16px" },
        ].map(({ label, px, text }) => (
          <button
            key={label}
            className={base}
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "var(--radius)",
              padding: px,
              fontSize: text,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <SubLabel>States</SubLabel>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          className={base}
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Default
        </button>
        <button
          className={base}
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
            opacity: loading ? 0.8 : 1,
          }}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            {loading ? "Loading..." : "Loading"}
          </span>
        </button>
        <button
          className={base}
          disabled
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
            opacity: 0.4,
            cursor: "not-allowed",
          }}
        >
          Disabled
        </button>
        <button
          className={base}
          style={{
            backgroundColor: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Click to load
        </button>
      </div>

      <SubLabel>Full width</SubLabel>
      <button
        className={`${base} w-full flex items-center justify-center gap-2`}
        style={{
          backgroundColor: "var(--accent)",
          color: "#fff",
          borderRadius: "var(--radius)",
          padding: "var(--density-padding)",
          maxWidth: "360px",
        }}
      >
        <Zap className="w-4 h-4 fill-white" />
        Shorten URL
      </button>
    </section>
  );
}

// ─── Input showcase ───────────────────────────────────────────────
function InputShowcase() {
  const inputBase = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    color: "var(--text-primary)",
    padding: "var(--density-padding)",
    width: "100%",
    outline: "none",
    fontSize: "var(--text-sm)",
  };

  return (
    <section>
      <SectionHeader label="Input" />
      <div className="grid grid-cols-2 gap-6">
        {/* Default */}
        <div>
          <SubLabel>Default</SubLabel>
          <input
            placeholder="Enter a value"
            style={inputBase}
          />
        </div>

        {/* With prefix */}
        <div>
          <SubLabel>With prefix</SubLabel>
          <div
            className="flex items-center overflow-hidden"
            style={{
              backgroundColor: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <span
              className="text-sm font-mono border-r px-3 flex-shrink-0"
              style={{
                color: "var(--text-subtle, #52525b)",
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                padding: "var(--density-padding)",
              }}
            >
              shr.ly/
            </span>
            <input
              placeholder="short-code"
              className="flex-1 outline-none bg-transparent"
              style={{
                color: "var(--text-primary)",
                padding: "var(--density-padding)",
                fontSize: "var(--text-sm)",
              }}
            />
          </div>
        </div>

        {/* Error state */}
        <div>
          <SubLabel>Error state</SubLabel>
          <input
            defaultValue="not-an-email"
            style={{
              ...inputBase,
              border: "1px solid #ef4444",
            }}
          />
          <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>
            Enter a valid email
          </p>
        </div>

        {/* With hint */}
        <div>
          <SubLabel>With hint</SubLabel>
          <input
            placeholder="Password"
            type="password"
            style={inputBase}
          />
          <p className="text-xs mt-1.5" style={{ color: "var(--text-subtle, #52525b)" }}>
            At least 8 characters
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Card showcase ────────────────────────────────────────────────
function CardShowcase() {
  return (
    <section>
      <SectionHeader label="Card" />
      <div className="grid grid-cols-3 gap-4">
        <div
          className="p-5 cursor-default"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Default Card
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Subtle border, used for content panels and stat cards.
          </p>
        </div>

        <div
          className="p-5 cursor-pointer transition-all hover:translate-y-[-2px]"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Hover Card
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Lifts on hover. Used for clickable list items.
          </p>
        </div>

        <div
          className="p-5"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
            borderRadius: "var(--radius)",
          }}
        >
          <p
            className="font-semibold text-sm mb-1"
            style={{ color: "var(--accent)" }}
          >
            Accent Card
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Highlighted variant for featured content.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Badge showcase ───────────────────────────────────────────────
function BadgeShowcase() {
  const badge = (label: string, bg: string, color: string, border: string) => (
    <span
      key={label}
      className="text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: bg, color, border: `1px solid ${border}` }}
    >
      {label}
    </span>
  );

  return (
    <section>
      <SectionHeader label="Badge" />

      <SubLabel>Variants</SubLabel>
      <div className="flex flex-wrap gap-2 mb-4">
        {badge("Default", "var(--surface)", "var(--text-muted)", "var(--border)")}
        {badge("Active", "#052e16", "#22c55e", "#166534")}
        {badge("Error", "#450a0a", "#ef4444", "#7f1d1d")}
        {badge("Warning", "#451a03", "#f97316", "#7c2d12")}
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
          }}
        >
          Featured
        </span>
      </div>

      <SubLabel>In context</SubLabel>
      <div className="flex flex-wrap gap-2">
        {badge("2.1k clicks", "var(--surface)", "var(--text-muted)", "var(--border)")}
        {badge("✓ Copied", "#052e16", "#22c55e", "#166534")}
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)",
            color: "var(--accent)",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
          }}
        >
          Design System
        </span>
        {badge("Deleted", "#450a0a", "#ef4444", "#7f1d1d")}
      </div>
    </section>
  );
}

// ─── StatCard showcase ────────────────────────────────────────────
function StatCardShowcase() {
  return (
    <section>
      <SectionHeader label="StatCard" />

      {/* Real */}
      <div className="flex gap-4 mb-4">
        <StatCard label="Total links" value="24" description="active short links" />
        <StatCard label="Total clicks" value="18.4k" description="across all links" />
        <StatCard label="Top link" value="/ph-launch" description="2.1k clicks" mono />
      </div>

      {/* Skeleton */}
      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 p-6"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div
              className="h-2.5 w-20 rounded-full mb-4 animate-pulse"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="h-8 w-16 rounded-md mb-3 animate-pulse"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="h-2 w-24 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Toast showcase ───────────────────────────────────────────────
function ToastShowcase() {
  return (
    <section>
      <SectionHeader label="Toast" />
      <div className="flex gap-3">
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid #166534",
            borderRadius: "var(--radius)",
            color: "#22c55e",
          }}
        >
          <Check className="w-4 h-4" />
          Success toast
        </div>
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid #7f1d1d",
            borderRadius: "var(--radius)",
            color: "#ef4444",
          }}
        >
          <AlertCircle className="w-4 h-4" />
          Error toast
        </div>
      </div>
    </section>
  );
}

// ─── Skeleton showcase ────────────────────────────────────────────
function SkeletonShowcase() {
  return (
    <section>
      <SectionHeader label="Skeleton" />
      <SubLabel>Table rows</SubLabel>
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid items-center px-6 py-4 gap-4 animate-pulse"
            style={{
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              gridTemplateColumns: "180px 1fr 80px 120px 80px",
            }}
          >
            <div className="h-2.5 rounded-full" style={{ backgroundColor: "var(--border)", width: "70%" }} />
            <div className="h-2.5 rounded-full" style={{ backgroundColor: "var(--border)", width: "80%" }} />
            <div className="h-2.5 rounded-full" style={{ backgroundColor: "var(--border)", width: "60%" }} />
            <div className="h-2.5 rounded-full" style={{ backgroundColor: "var(--border)", width: "70%" }} />
            <div className="flex gap-1.5">
              <div className="h-6 w-6 rounded" style={{ backgroundColor: "var(--border)" }} />
              <div className="h-6 w-6 rounded" style={{ backgroundColor: "var(--border)" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── LinkTable showcase ───────────────────────────────────────────
function LinkTableShowcase() {
  const demoLinks = [
    { code: "/gh-pr-831", url: "https://github.com/vercel/next.js/pull/42831", clicks: "1.3k", date: "Apr 1, 2026" },
    { code: "/tw-thread", url: "https://twitter.com/rauchg/status/12345678...", clicks: "847", date: "Apr 5, 2026" },
    { code: "/stripe-api", url: "https://docs.stripe.com/api/payment_intent...", clicks: "523", date: "Apr 10, 2026" },
  ];

  return (
    <section>
      <SectionHeader label="LinkTable" />
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="grid text-xs font-semibold tracking-widest uppercase px-6 py-3"
          style={{
            color: "var(--text-subtle, #52525b)",
            borderBottom: "1px solid var(--border)",
            gridTemplateColumns: "180px 1fr 80px 130px 100px",
          }}
        >
          <span>Short code</span>
          <span>Original URL</span>
          <span>Clicks</span>
          <span>Created</span>
          <span>Actions</span>
        </div>
        {demoLinks.map((link, i) => (
          <div
            key={link.code}
            className="grid items-center px-6 py-4"
            style={{
              borderBottom: i < demoLinks.length - 1 ? "1px solid var(--border)" : "none",
              gridTemplateColumns: "180px 1fr 80px 130px 100px",
            }}
          >
            <span className="text-sm font-mono font-medium" style={{ color: "var(--accent)" }}>
              {link.code}
            </span>
            <span className="text-sm truncate pr-4" style={{ color: "var(--text-muted)" }}>
              {link.url}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-md w-fit"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {link.clicks}
            </span>
            <span className="text-sm" style={{ color: "var(--text-subtle, #52525b)" }}>
              {link.date}
            </span>
            <div className="flex items-center gap-2">
              {[TrendingUp, Copy, Trash2].map((Icon, j) => (
                <button
                  key={j}
                  className="p-1.5 rounded-md cursor-pointer"
                  style={{ color: "var(--text-subtle, #52525b)" }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Color palette showcase ───────────────────────────────────────
function ColorPaletteShowcase() {
  const swatches = [
    { label: "Background", color: "var(--bg)" },
    { label: "Surface", color: "var(--surface)" },
    { label: "Surface 2", color: "#1c1c1f" },
    { label: "Border", color: "var(--border)" },
    { label: "Text", color: "var(--text-primary)" },
    { label: "Text 2", color: "var(--text-muted)" },
    { label: "Accent", color: "var(--accent)" },
  ];

  const semanticSwatches = [
    { label: "Success", color: "#22c55e" },
    { label: "Danger", color: "#ef4444" },
    { label: "Warning", color: "#f97316" },
  ];

  return (
    <section>
      <SectionHeader label="Color Palette" />
      <div className="flex flex-wrap gap-3 mb-4">
        {swatches.map(({ label, color }) => (
          <div key={label} className="flex flex-col gap-2">
            <div
              className="w-24 h-16 rounded-lg"
              style={{
                backgroundColor: color,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            />
            <span className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {semanticSwatches.map(({ label, color }) => (
          <div key={label} className="flex flex-col gap-2">
            <div
              className="w-24 h-16"
              style={{
                backgroundColor: color,
                borderRadius: "var(--radius)",
              }}
            />
            <span className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Typography showcase ──────────────────────────────────────────
function TypographyShowcase() {
  const scale = [
    { label: "Display", size: "var(--text-4xl)", weight: "800", text: "Shorten your links." },
    { label: "H1", size: "var(--text-3xl)", weight: "700", text: "Dashboard" },
    { label: "H2", size: "var(--text-2xl)", weight: "600", text: "Your links" },
    { label: "Body", size: "var(--text-base)", weight: "400", text: "Manage and track all your short links in one place." },
    { label: "Small", size: "var(--text-sm)", weight: "400", text: "Created Apr 12, 2026 · 2.1k clicks" },
  ];

  return (
    <section>
      <SectionHeader label="Typography" />
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
        }}
      >
        {scale.map(({ label, size, weight, text }, i) => (
          <div
            key={label}
            className="flex items-baseline gap-6 px-6 py-4"
            style={{
              borderBottom: i < scale.length ? "1px solid var(--border)" : "none",
            }}
          >
            <span
              className="w-14 text-xs flex-shrink-0"
              style={{ color: "var(--text-subtle, #52525b)" }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: size,
                fontWeight: weight,
                color: "var(--text-primary)",
              }}
            >
              {text}
            </span>
          </div>
        ))}
        <div
          className="flex items-baseline gap-6 px-6 py-4"
        >
          <span
            className="w-14 text-xs flex-shrink-0"
            style={{ color: "var(--text-subtle, #52525b)" }}
          >
            Mono
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--accent)",
            }}
          >
            shr.ly/ph-launch
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────
export function DesignShowcase() {
  return (
    <div className="max-w-4xl">
      {/* Page header */}
      <div className="mb-10">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
            color: "var(--accent)",
          }}
        >
          Design System
        </span>
        <h1
          className="font-bold mb-2"
          style={{ fontSize: "var(--text-3xl)", color: "var(--text-primary)" }}
        >
          Shorly UI
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Edit tokens on the left — all components update instantly.
        </p>
      </div>

      <ButtonShowcase />
      <Divider />
      <InputShowcase />
      <Divider />
      <CardShowcase />
      <Divider />
      <BadgeShowcase />
      <Divider />
      <StatCardShowcase />
      <Divider />
      <ToastShowcase />
      <Divider />
      <SkeletonShowcase />
      <Divider />
      <LinkTableShowcase />
      <Divider />
      <ColorPaletteShowcase />
      <Divider />
      <TypographyShowcase />
    </div>
  );
}