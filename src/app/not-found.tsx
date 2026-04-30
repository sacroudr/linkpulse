import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found — LinkPulse",
};

export default function NotFound() {
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

      {/* 404 display */}
      <p
        className="font-bold mb-2"
        style={{
          fontSize: "clamp(4rem, 12vw, 8rem)",
          color: "var(--border)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </p>

      <h1
        className="font-bold mb-3 text-center"
        style={{ fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}
      >
        Page not found
      </h1>
      <p
        className="mb-8 text-center max-w-sm"
        style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
      >
        The link you followed may be broken or the page may have been removed.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--accent)",
            borderRadius: "var(--radius)",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Go to dashboard
        </Link>
        <Link
          href="/login"
          className="px-5 py-2.5 font-medium transition-opacity hover:opacity-80"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            borderRadius: "var(--radius)",
          }}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
