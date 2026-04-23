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

  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        backgroundColor: "#1c1c1f",
        border: "1px solid #27272a",
        color: "#ffffff",
      }}
    >
      <p style={{ color: "#71717a" }}>{label}</p>
      <p className="font-semibold mt-0.5">{payload[0].value} clicks</p>
    </div>
  );
}

export function ClicksChart({ data }: ClicksChartProps) {
  if (data.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 rounded-xl"
        style={{
          backgroundColor: "#111113",
          border: "1px solid #27272a",
        }}
      >
        <p className="text-white font-medium mb-1">No clicks yet</p>
        <p className="text-sm" style={{ color: "#52525b" }}>
          Share your short link to start seeing data here.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="0"
          stroke="#27272a"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          tick={{ fill: "#52525b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fill: "#52525b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#clicksGradient)"
          dot={<Dot r={3} fill="#3b82f6" stroke="#3b82f6" />}
          activeDot={{ r: 5, fill: "#3b82f6", stroke: "#09090b" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}