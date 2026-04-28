interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  mono?: boolean;
  loading?: boolean;
  animationDelay?: number;
}

export function StatCard({
  label,
  value,
  description,
  mono,
  loading = false,
  animationDelay = 0,
}: StatCardProps) {
  if (loading) {
    return (
      <div
        className="flex-1 rounded-xl p-6"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="h-2.5 w-20 rounded-full mb-4 animate-pulse"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div
          className="h-8 w-16 rounded-md mb-3 animate-pulse"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div
          className="h-2 w-24 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex-1 rounded-xl p-6 animate-fade-in-up"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        animationDelay: `${animationDelay}ms`,
        animationFillMode: "both",
      }}
    >
      <p
        style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
        className="font-semibold tracking-widest uppercase mb-3"
      >
        {label}
      </p>
      <p
        className={`font-bold mb-1 ${mono ? "font-mono" : ""}`}
        style={{ fontSize: "var(--text-4xl)", color: "var(--text-primary)" }}
      >
        {value}
      </p>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>
        {description}
      </p>
    </div>
  );
}
