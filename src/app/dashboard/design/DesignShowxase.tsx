"use client";

import { useState } from "react";
import { Zap, Copy, Check, Trash2, TrendingUp, AlertCircle } from "lucide-react";
import { StatCard } from "../../../../components/ui/StatCard";

// ─── Copy snippet hook ────────────────────────────────────────────
function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return { copy, copiedKey };
}

// ─── Section header with copyable snippet ─────────────────────────
function SectionHeader({ label, snippet }: { label: string; snippet?: string }) {
  const { copy, copiedKey } = useCopy();
  const key = `header-${label}`;

  return (
    <div className="flex items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-6 h-0.5" style={{ backgroundColor: "var(--accent)" }} />
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--text-subtle, #52525b)" }}
        >
          {label} — Component
        </span>
      </div>
      {snippet && (
        <button
          onClick={() => copy(snippet, key)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer transition-colors"
          style={{
            fontSize: "var(--text-xs)",
            color: copiedKey === key ? "#22c55e" : "var(--text-subtle)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            fontFamily: "monospace",
          }}
          title="Copy component import"
        >
          {copiedKey === key ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copiedKey === key ? "Copied!" : `<${label} />`}
        </button>
      )}
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
    <div className="my-10" style={{ borderTop: "1px solid var(--border)" }} />
  );
}

// ─── Button showcase ──────────────────────────────────────────────
function ButtonShowcase() {
  const [loading, setLoading] = useState(false);
  const base = "font-medium cursor-pointer transition-opacity text-sm";

  return (
    <section>
      <SectionHeader label="Button" snippet={`import { Button } from "@/components/ui/Button"`} />

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
            {loading ? "Loading…" : "Loading"}
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
      <SectionHeader label="Input" snippet={`import { Input } from "@/components/ui/Input"`} />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <SubLabel>Default</SubLabel>
          <input placeholder="Enter a value" style={inputBase} />
        </div>

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
              className="font-mono border-r px-3 flex-shrink-0"
              style={{
                color: "var(--text-subtle, #52525b)",
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                padding: "var(--density-padding)",
                fontSize: "var(--text-sm)",
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

        <div>
          <SubLabel>Error state</SubLabel>
          <input
            defaultValue="not-an-email"
            style={{ ...inputBase, border: "1px solid #ef4444" }}
          />
          <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>
            Enter a valid email
          </p>
        </div>

        <div>
          <SubLabel>With hint</SubLabel>
          <input placeholder="Password" type="password" style={inputBase} />
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
      <SectionHeader label="Card" snippet={`import { Card } from "@/components/ui/Card"`} />
      <div className="grid grid-cols-3 gap-4">
        <div
          className="p-5"
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
          <p className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>
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
      <SectionHeader label="Badge" snippet={`import { Badge } from "@/components/ui/Badge"`} />

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
    </section>
  );
}

// ─── StatCard showcase ────────────────────────────────────────────
function StatCardShowcase() {
  return (
    <section>
      <SectionHeader label="StatCard" snippet={`import { StatCard } from "@/components/ui/StatCard"`} />

      <div className="flex gap-4 mb-4">
        <StatCard label="Total links" value="24" description="active short links" />
        <StatCard label="Total clicks" value="18.4k" description="across all links" />
        <StatCard label="Top link" value="/ph-launch" description="2.1k clicks" mono />
      </div>

      <SubLabel>Loading skeleton</SubLabel>
      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <StatCard key={i} label="" value="" description="" loading />
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
      <div className="flex gap-3 flex-wrap">
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 font-medium"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid #166534",
            borderRadius: "var(--radius)",
            color: "#22c55e",
            fontSize: "var(--text-sm)",
          }}
        >
          <Check className="w-4 h-4" />
          Link shortened successfully
        </div>
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 font-medium"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid #7f1d1d",
            borderRadius: "var(--radius)",
            color: "#ef4444",
            fontSize: "var(--text-sm)",
          }}
        >
          <AlertCircle className="w-4 h-4" />
          Invalid URL format
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
      <SectionHeader label="LinkTable" snippet={`import { LinkTable } from "@/components/links/LinkTable"`} />
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="grid font-semibold tracking-widest uppercase px-6 py-3"
          style={{
            fontSize: "var(--text-xs)",
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
            className="grid items-center px-6 py-4 transition-colors"
            style={{
              borderBottom: i < demoLinks.length - 1 ? "1px solid var(--border)" : "none",
              gridTemplateColumns: "180px 1fr 80px 130px 100px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span className="font-mono font-medium" style={{ fontSize: "var(--text-sm)", color: "var(--accent)" }}>
              {link.code}
            </span>
            <span
              className="truncate pr-4"
              style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
              title={link.url}
            >
              {link.url}
            </span>
            <span
              className="font-medium px-2.5 py-1"
              style={{
                fontSize: "var(--text-xs)",
                backgroundColor: "var(--bg)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                width: "fit-content",
              }}
            >
              {link.clicks}
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle, #52525b)" }}>
              {link.date}
            </span>
            <div className="flex items-center gap-2">
              {[TrendingUp, Copy, Trash2].map((Icon, j) => (
                <button
                  key={j}
                  className="p-1.5 rounded-md cursor-pointer transition-colors"
                  style={{ color: "var(--text-subtle, #52525b)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--border)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
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
  const { copy, copiedKey } = useCopy();

  const swatches = [
    { label: "Background", color: "var(--bg)", token: "--bg" },
    { label: "Surface", color: "var(--surface)", token: "--surface" },
    { label: "Border", color: "var(--border)", token: "--border" },
    { label: "Text", color: "var(--text-primary)", token: "--text-primary" },
    { label: "Text Muted", color: "var(--text-muted)", token: "--text-muted" },
    { label: "Accent", color: "var(--accent)", token: "--accent" },
  ];

  const semanticSwatches = [
    { label: "Success", color: "#22c55e", token: "#22c55e" },
    { label: "Danger", color: "#ef4444", token: "#ef4444" },
    { label: "Warning", color: "#f97316", token: "#f97316" },
  ];

  return (
    <section>
      <SectionHeader label="Color Palette" />

      <SubLabel>Design tokens</SubLabel>
      <div className="flex flex-wrap gap-3 mb-6">
        {swatches.map(({ label, color, token }) => (
          <div key={label} className="flex flex-col gap-2">
            <div
              className="w-24 h-16 relative group cursor-pointer"
              style={{
                backgroundColor: color,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
              onClick={() => copy(`var(${token})`, token)}
              title={`Copy ${token}`}
            >
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "var(--radius)" }}
              >
                {copiedKey === token ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs text-center font-medium"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}
              >
                {label}
              </span>
              <span
                className="text-xs text-center font-mono"
                style={{ color: "var(--text-subtle)", fontSize: "10px" }}
              >
                {token}
              </span>
            </div>
          </div>
        ))}
      </div>

      <SubLabel>Semantic colors</SubLabel>
      <div className="flex gap-3">
        {semanticSwatches.map(({ label, color, token }) => (
          <div key={label} className="flex flex-col gap-2">
            <div
              className="w-24 h-16 relative group cursor-pointer"
              style={{ backgroundColor: color, borderRadius: "var(--radius)" }}
              onClick={() => copy(token, `semantic-${token}`)}
              title={`Copy ${token}`}
            >
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "var(--radius)" }}
              >
                {copiedKey === `semantic-${token}` ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs text-center font-medium"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)" }}
              >
                {label}
              </span>
              <span
                className="text-xs text-center font-mono"
                style={{ color: "var(--text-subtle)", fontSize: "10px" }}
              >
                {token}
              </span>
            </div>
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
    { label: "XSmall", size: "var(--text-xs)", weight: "600", text: "SHORT CODE" },
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
              borderBottom: i < scale.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span
              className="w-14 flex-shrink-0"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle, #52525b)" }}
            >
              {label}
            </span>
            <span
              style={{ fontSize: size, fontWeight: weight, color: "var(--text-primary)" }}
            >
              {text}
            </span>
          </div>
        ))}
        <div className="flex items-baseline gap-6 px-6 py-4">
          <span
            className="w-14 flex-shrink-0"
            style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle, #52525b)" }}
          >
            Mono
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "var(--text-sm)", color: "var(--accent)" }}
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
          className="inline-flex items-center px-3 py-1 rounded-full font-medium mb-4"
          style={{
            fontSize: "var(--text-xs)",
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
          LinkPulse UI
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Edit tokens on the left — all components update instantly. Click any color swatch to copy its token.
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
