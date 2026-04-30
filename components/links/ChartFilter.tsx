"use client";

type TimeRange = "7d" | "30d" | "90d" | "all";

interface ChartFilterProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
  totalDays: number;
}

const options: { value: TimeRange; label: string; minDays: number }[] = [
  { value: "7d", label: "7d", minDays: 0 },
  { value: "30d", label: "30d", minDays: 7 },
  { value: "90d", label: "90d", minDays: 30 },
  { value: "all", label: "All", minDays: 0 },
];

export function ChartFilter({
  selected,
  onChange,
  totalDays,
}: ChartFilterProps) {
  return (
    <div
      className="flex items-center gap-0.5 p-0.5"
      style={{
        backgroundColor: "var(--bg)",
        borderRadius: "var(--radius)",
      }}
      role="group"
      aria-label="Select time range"
    >
      {options.map(({ value, label, minDays }) => {
        const isActive = selected === value;
        const isDisabled =
          value !== "all" && value !== "7d" && totalDays < minDays;

        return (
          <button
            key={value}
            onClick={() => !isDisabled && onChange(value)}
            disabled={isDisabled}
            className="px-3 py-1 font-medium transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              fontSize: "var(--text-xs)",
              backgroundColor: isActive ? "var(--surface)" : "transparent",
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              border: isActive
                ? "1px solid var(--border)"
                : "1px solid transparent",
              borderRadius: "var(--radius)",
            }}
            aria-pressed={isActive}
            aria-label={`Show ${label} data`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export type { TimeRange };
