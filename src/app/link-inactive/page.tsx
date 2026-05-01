import type { Metadata } from "next";
import { Zap, LinkIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Link Unavailable — LinkPulse",
};

export default function LinkInactivePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-12">
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
        >
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          LinkPulse
        </span>
      </div>

      {/* Icon */}
      <div
        className="w-16 h-16 flex items-center justify-center mb-6 rounded-full"
        style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <LinkIcon
          className="w-7 h-7"
          style={{ color: "var(--text-muted)" }}
        />
      </div>

      <h1
        className="font-bold mb-3 text-center"
        style={{ fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}
      >
        This link is no longer active
      </h1>
      <p
        className="text-center max-w-sm"
        style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
      >
        The owner of this link has disabled it. Please contact them for a
        working URL.
      </p>
    </div>
  );
}
