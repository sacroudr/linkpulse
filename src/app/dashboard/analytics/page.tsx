import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-sm mt-1" style={{ color: "#71717a" }}>
          Select a link to view its performance.
        </p>
      </div>

      {/* Empty state */}
      <div
        className="rounded-xl flex flex-col items-center justify-center py-32"
        style={{
          backgroundColor: "#111113",
          border: "1px solid #27272a",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: "#1c1c1f" }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: "var(--accent)" }} />
        </div>
        <p className="text-white font-medium mb-1">No link selected</p>
        <p className="text-sm mb-6" style={{ color: "#52525b" }}>
          Go to your dashboard and click the stats icon on any link.
        </p>
        <Link
          href="/dashboard"
          className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: "#1c1c1f",
            border: "1px solid #27272a",
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