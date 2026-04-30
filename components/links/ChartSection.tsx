"use client";

import { useState } from "react";
import { ChartFilter, TimeRange } from "./ChartFilter";
import { ClicksChart } from "./ClicksChart";

interface ChartData {
  date: string;
  count: number;
}

interface ChartSectionProps {
  chartData: ChartData[];
}

function filterChartData(data: ChartData[], range: TimeRange): ChartData[] {
  if (range === "all" || data.length === 0) return data;

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  cutoff.setHours(0, 0, 0, 0);

  return data.filter((d) => new Date(d.date) >= cutoff);
}

export function ChartSection({ chartData }: ChartSectionProps) {
  const [range, setRange] = useState<TimeRange>("30d");

  const filteredData = filterChartData(chartData, range);
  const totalDays = chartData.length;
  const totalInRange = filteredData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p
            className="font-semibold"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-primary)",
            }}
          >
            Clicks over time
          </p>
          <p
            className="mt-0.5"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-subtle)",
            }}
          >
            {range === "all"
              ? `All time · ${totalInRange} clicks`
              : `Last ${range} · ${totalInRange} clicks`}
          </p>
        </div>
        <ChartFilter
          selected={range}
          onChange={setRange}
          totalDays={totalDays}
        />
      </div>

      <ClicksChart data={filteredData} />

      {filteredData.length > 0 &&
        filteredData.every((d) => d.count === 0) && (
          <div className="flex flex-col items-center justify-center py-8">
            <p
              className="font-medium mb-1"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-primary)",
              }}
            >
              No clicks in this period
            </p>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-subtle)",
              }}
            >
              Try selecting a wider time range
            </p>
          </div>
        )}
    </div>
  );
}
