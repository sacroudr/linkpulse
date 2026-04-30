import { BarChart2 } from "lucide-react";

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
      className="p-5"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
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
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <div
            className="w-9 h-9 flex items-center justify-center mb-3"
            style={{
              backgroundColor: "var(--bg)",
              borderRadius: "var(--radius)",
            }}
          >
            <BarChart2 className="w-4 h-4" style={{ color: "var(--text-subtle)" }} />
          </div>
          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--text-subtle)",
              maxWidth: "180px",
            }}
          >
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(({ name, count }) => {
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;

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
                        color: "var(--text-subtle)",
                      }}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div
                  className="w-full overflow-hidden"
                  style={{
                    height: "4px",
                    backgroundColor: "var(--bg)",
                    borderRadius: "999px",
                  }}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: "var(--accent)",
                      opacity: 0.7,
                      borderRadius: "999px",
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
