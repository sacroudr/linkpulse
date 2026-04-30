import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

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
        <p
          className="mt-1"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
        >
          Select a link to view its performance.
        </p>
      </div>

      {/* Empty state */}
      <div
        className="flex flex-col items-center justify-center py-32 text-center"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="w-14 h-14 flex items-center justify-center mb-5"
          style={{
            backgroundColor: "var(--bg)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <TrendingUp
            className="w-6 h-6"
            style={{ color: "var(--accent)" }}
          />
        </div>
        <p
          className="font-semibold mb-2"
          style={{ color: "var(--text-primary)", fontSize: "var(--text-base)" }}
        >
          No link selected
        </p>
        <p
          className="mb-6 max-w-xs"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}
        >
          Head to the dashboard and click the{" "}
          <TrendingUp
            className="w-3.5 h-3.5 inline-block align-text-bottom mx-0.5"
            style={{ color: "var(--accent)" }}
          />{" "}
          icon on any link to see detailed analytics.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-80"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--accent)",
            color: "#fff",
            borderRadius: "var(--radius)",
            padding: "var(--density-padding)",
          }}
        >
          Go to dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
