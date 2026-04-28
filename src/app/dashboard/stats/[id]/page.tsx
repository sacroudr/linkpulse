import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Share2, ChevronRight } from "lucide-react";
import { auth } from "../../../../../lib/auth";
import { getClicksByLinkId, getLinkById } from "../../../../../lib/queries";
import { StatCard } from "../../../../../components/ui/StatCard";
import { ClicksChart } from "../../../../../components/links/ClicksChart";
import { CopyButton } from "../../../../../components/links/CopyButton";

export const metadata: Metadata = {
  title: "Link Stats — LinkPulse",
};

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeAgo(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""} ago`;
}

function getPeakDay(chartData: { date: string; count: number }[]) {
  if (chartData.length === 0) return { date: "—", count: 0 };
  return chartData.reduce((peak, d) => (d.count > peak.count ? d : peak));
}

function getAvgPerDay(
  totalClicks: number,
  chartData: { date: string; count: number }[]
) {
  if (chartData.length === 0) return 0;
  return Math.round(totalClicks / chartData.length);
}

function buildChartData(clicks: { clickedAt: Date }[]) {
  if (clicks.length === 0) return [];

  const grouped = clicks.reduce(
    (acc, click) => {
      const day = new Date(click.clickedAt).toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const dates = Object.keys(grouped).sort();
  const start = new Date(dates[0]);
  const end = new Date(dates[dates.length - 1]);
  const result = [];

  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    result.push({ date: dateStr, count: grouped[dateStr] ?? 0 });
    current.setDate(current.getDate() + 1);
  }

  return result;
}

export default async function StatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const link = await getLinkById(id);

  if (!link) notFound();
  if (link.userId !== session.user.id) notFound();

  const clicks = await getClicksByLinkId(id);
  const chartData = buildChartData(clicks);
  const totalClicks = clicks.length;
  const peak = getPeakDay(chartData);
  const avg = getAvgPerDay(totalClicks, chartData);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const shortUrl = `${appUrl}/${link.shortCode}`;
  const displayShortUrl = `shr.ly/${link.shortCode}`;

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 mb-6"
        aria-label="Breadcrumb"
        style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
      >
        <Link
          href="/dashboard"
          className="transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--text-subtle)" }} />
        <span className="font-mono" style={{ color: "var(--accent)" }}>
          /{link.shortCode}
        </span>
      </nav>

      {/* Link info card */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="min-w-0">
            <p
              className="font-semibold tracking-widest uppercase mb-2"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
            >
              Short URL
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-bold font-mono"
                style={{ fontSize: "var(--text-2xl)", color: "var(--accent)" }}
              >
                {displayShortUrl}
              </span>
              <CopyButton text={shortUrl} />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Share button */}
            <CopyButton text={shortUrl} showLabel />

            <span
              className="font-semibold px-2.5 py-1"
              style={{
                fontSize: "var(--text-xs)",
                backgroundColor: "#052e16",
                color: "#22c55e",
                border: "1px solid #166534",
                borderRadius: "var(--radius)",
              }}
            >
              Active
            </span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>
              {formatTimeAgo(link.createdAt)}
            </span>
          </div>
        </div>

        {/* Destination */}
        <div>
          <p
            className="font-semibold tracking-widest uppercase mb-1.5"
            style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
          >
            Destination
          </p>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
            style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-xl">{link.originalUrl}</span>
          </a>
        </div>

        <p
          className="mt-3"
          style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
        >
          Created {formatDate(link.createdAt)}
        </p>
      </div>

      {/* Stat cards */}
      <div className="flex gap-4 mb-6">
        <StatCard
          label="Total clicks"
          value={formatCount(totalClicks)}
          description="all time"
          animationDelay={0}
        />
        <StatCard
          label="Peak day"
          value={
            peak.date !== "—"
              ? `${new Date(peak.date).getMonth() + 1}/${new Date(peak.date).getDate()}`
              : "—"
          }
          description={peak.count > 0 ? `${peak.count} clicks` : "no data yet"}
          animationDelay={80}
        />
        <StatCard
          label="Avg / day"
          value={avg}
          description="across tracked days"
          animationDelay={160}
        />
      </div>

      {/* Chart card */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="font-semibold"
              style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
            >
              Clicks over time
            </p>
            <p
              className="mt-0.5"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
            >
              Daily breakdown · all time
            </p>
          </div>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
            style={{ fontSize: "var(--text-xs)", color: "var(--accent)" }}
            title="Open short link in new tab"
          >
            <Share2 className="w-3.5 h-3.5" />
            Open link
          </a>
        </div>

        <ClicksChart data={chartData} />
      </div>
    </div>
  );
}
