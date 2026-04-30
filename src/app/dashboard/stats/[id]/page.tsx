import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { auth } from "../../../../../lib/auth";
import { getClicksByLinkId, getLinkById } from "../../../../../lib/queries";
import { StatCard } from "../../../../../components/ui/StatCard";
import { CopyButton } from "../../../../../components/links/CopyButton";
import { ActiveToggle } from "../../../../../components/links/ActiveToggle";
import { ChartSection } from "../../../../../components/links/ChartSection";
import { BreakdownCard } from "../../../../../components/links/BreakdownCard";

export const metadata: Metadata = {
  title: "Link Analytics — LinkPulse",
  description: "View detailed click analytics and performance data for your short link.",
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

function getTopEntries(
  items: (string | null)[],
  limit = 5
): { name: string; count: number }[] {
  const counts: Record<string, number> = {};

  for (const item of items) {
    if (!item) continue;
    counts[item] = (counts[item] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
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

  // Breakdown data
  const topCountries = getTopEntries(clicks.map((c) => c.country));
  const topCities = getTopEntries(clicks.map((c) => c.city));
  const topOs = getTopEntries(clicks.map((c) => c.os));
  const topReferers = getTopEntries(clicks.map((c) => c.referer));

  const shortUrl = `shr.ly/${link.shortCode}`;

  return (
    <div className="max-w-5xl">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      {/* Link info card */}
      <div
        className="p-6 mb-6"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <p
              className="font-semibold tracking-widest uppercase mb-2"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-subtle)",
              }}
            >
              Short URL
            </p>
            <div className="flex items-center gap-2">
              <span
                className="font-bold font-mono"
                style={{
                  fontSize: "var(--text-2xl)",
                  color: "var(--accent)",
                }}
              >
                {shortUrl}
              </span>
              <CopyButton
                text={`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/${link.shortCode}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ActiveToggle linkId={link.id} isActive={link.isActive} />
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-subtle)",
              }}
            >
              Created {formatDate(link.createdAt)}
            </span>
          </div>
        </div>

        <div>
          <p
            className="font-semibold tracking-widest uppercase mb-1.5"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-subtle)",
            }}
          >
            Destination
          </p>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            }}
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            {link.originalUrl}
          </a>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total clicks"
          value={formatCount(totalClicks)}
          description="all time"
        />
        <StatCard
          label="Peak day"
          value={
            peak.date !== "—"
              ? `${new Date(peak.date).getMonth() + 1}/${new Date(peak.date).getDate()}`
              : "—"
          }
          description={peak.count > 0 ? `${peak.count} clicks` : "no data yet"}
        />
        <StatCard
          label="Avg / day"
          value={avg}
          description="last 30 days"
        />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ChartSection chartData={chartData} />
      </div>

      {/* Breakdown grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BreakdownCard
          title="Countries"
          items={topCountries}
          total={totalClicks}
          emptyMessage="No country data yet — click data will appear here after visitors use your link."
        />
        <BreakdownCard
          title="Region"
          items={topCities}
          total={totalClicks}
          emptyMessage="No city data yet."
        />
        
        <BreakdownCard
          title="Operating systems"
          items={topOs}
          total={totalClicks}
          emptyMessage="No OS data yet."
        />
        <BreakdownCard
          title="Referers"
          items={topReferers}
          total={totalClicks}
          emptyMessage="No referer data yet — appears when visitors click from another website."
        />
        <p
          className="mt-1.5"
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--text-subtle)",
          }}
        >
          * Region is estimated from IP address and may not reflect exact location.
        </p>
      </div>
    </div>
  );
}