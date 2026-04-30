interface BreakdownItem {
  name: string;
  count: number;
}

interface BreakdownCardProps {
  title: string;
  items: BreakdownItem[];
  total: number;
  emptyMessage?: string;
}

export function BreakdownCard({
  title,
  items,
  total,
  emptyMessage = "No data yet",
}: BreakdownCardProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <p
        className="font-semibold mb-4"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </p>

      {items.length === 0 ? (
        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--text-subtle, #52525b)",
          }}
        >
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map(({ name, count }) => {
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

            return (
              <div key={name}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="truncate max-w-[70%]"
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-primary)",
                    }}
                    title={name}
                  >
                    {name}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {count}
                    </span>
                    <span
                      className="w-10 text-right"
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-subtle, #52525b)",
                      }}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{
                    height: "4px",
                    backgroundColor: "var(--bg)",
                  }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: "var(--accent)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}