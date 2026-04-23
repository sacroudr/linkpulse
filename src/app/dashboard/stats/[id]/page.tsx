// import { auth } from "@/lib/auth";
// import { getLinkById, getClicksByLinkId } from "@/lib/queries";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { auth } from "../../../../../lib/auth";
import { getClicksByLinkId, getLinkById } from "../../../../../lib/queries";
import { StatCard } from "../../../../../components/ui/StatCard";
import { ClicksChart } from "../../../../../components/links/ClicksChart";
import { CopyButton } from "../../../../../components/links/CopyButton";
// import { StatCard } from "@/components/ui/StatCard";
// import { ClicksChart } from "@/components/links/ClicksChart";
// import { CopyButton } from "@/components/ui/CopyButton";

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

function getAvgPerDay(totalClicks: number, chartData: { date: string; count: number }[]) {
  if (chartData.length === 0) return 0;
  return Math.round(totalClicks / chartData.length);
}

function buildChartData(clicks: { clickedAt: Date }[]) {
  if (clicks.length === 0) return [];

  const grouped = clicks.reduce((acc, click) => {
    const day = new Date(click.clickedAt).toISOString().split("T")[0];
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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

  const shortUrl = `shr.ly/${link.shortCode}`;

  return (
    <div className="max-w-5xl">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
        style={{ color: "#71717a" }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      {/* Link info card */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{
          backgroundColor: "#111113",
          border: "1px solid #27272a",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "#52525b" }}
            >
              Short URL
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-2xl font-bold font-mono"
                style={{ color: "#3b82f6" }}
              >
                {shortUrl}
              </span>
              <CopyButton text={`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/${link.shortCode}`} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "#052e16",
                color: "#22c55e",
                border: "1px solid #166534",
              }}
            >
              Active
            </span>
            <span className="text-sm" style={{ color: "#52525b" }}>
              Created {formatDate(link.createdAt)}
            </span>
          </div>
        </div>

        {/* Destination */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1.5"
            style={{ color: "#52525b" }}
          >
            Destination
          </p>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: "#a1a1aa" }}
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            {link.originalUrl}
          </a>
        </div>
      </div>

      {/* Stat cards */}
      <div className="flex gap-4 mb-6">
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

      {/* Chart card */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: "#111113",
          border: "1px solid #27272a",
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-white">
              Clicks over time
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>
              Last 30 days · daily
            </p>
          </div>
        </div>

        <ClicksChart data={chartData} />
      </div>
    </div>
  );
}