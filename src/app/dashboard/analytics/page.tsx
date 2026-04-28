import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics — LinkPulse",
  description: "Select a link to view its performance analytics.",
};

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="font-bold"
          style={{ fontSize: "var(--text-3xl)", color: "var(--text-primary)" }}
        >
          Analytics
        </h1>
        <p className="mt-1" style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Select a link to view its performance.
        </p>
      </div>

      {/* Empty state */}
      <div
        className="rounded-xl flex flex-col items-center justify-center py-32"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: "var(--accent)" }} />
        </div>
        <p
          className="font-medium mb-1"
          style={{ color: "var(--text-primary)", fontSize: "var(--text-sm)" }}
        >
          No link selected
        </p>
        <p
          className="mb-6 text-center max-w-xs"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}
        >
          Go to your dashboard and click the stats icon on any link.
        </p>
        <Link
          href="/dashboard"
          className="font-medium px-4 py-2 transition-colors hover:opacity-80"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--accent)",
            borderRadius: "var(--radius)",
          }}
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
