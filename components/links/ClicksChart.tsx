"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartData {
  date: string;
  count: number;
}

interface ClicksChartProps {
  data: ChartData[];
}

function formatXAxis(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const formattedDate = label
    ? new Date(label).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : label;

  return (
    <div
      className="px-3 py-2"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
        {formattedDate}
      </p>
      <p
        className="font-semibold mt-0.5"
        style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
      >
        {payload[0].value}{" "}
        <span style={{ color: "var(--text-muted)" }}>
          click{payload[0].value !== 1 ? "s" : ""}
        </span>
      </p>
    </div>
  );
}

export function ClicksChart({ data }: ClicksChartProps) {
  if (data.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="w-12 h-12 flex items-center justify-center mb-4"
          style={{
            backgroundColor: "var(--bg)",
            borderRadius: "var(--radius)",
          }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: "var(--accent)" }} />
        </div>
        <p
          className="font-medium mb-1"
          style={{ color: "var(--text-primary)", fontSize: "var(--text-sm)" }}
        >
          No clicks yet
        </p>
        <p
          className="text-center max-w-xs"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}
        >
          Share your short link to start seeing data here.
        </p>
      </div>
    );
  }

  const dateRange =
    data.length >= 2
      ? `${formatDateLabel(data[0].date)} – ${formatDateLabel(data[data.length - 1].date)}`
      : formatDateLabel(data[0].date);

  return (
    <div>
      <p
        className="mb-4"
        style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
      >
        {dateRange}
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tick={{ fill: "var(--text-subtle)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "var(--text-subtle)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--accent)"
            strokeWidth={2}
            fill="url(#clicksGradient)"
            dot={<Dot r={3} fill="var(--accent)" stroke="var(--accent)" />}
            activeDot={{ r: 5, fill: "var(--accent)", stroke: "var(--bg)" }}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
