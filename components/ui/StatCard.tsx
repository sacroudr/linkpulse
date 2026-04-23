interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  mono?: boolean;
}

export function StatCard({ label, value, description, mono }: StatCardProps) {
  return (
    <div
      className="flex-1 rounded-xl p-6"
      style={{
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border)",
      }}
    >
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: "var(--text-subtle)" }}
      >
        {label}
      </p>
      <p className={`text-4xl font-bold mb-1 ${mono ? "font-mono" : ""}`}
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
      <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
        {description}
      </p>
    </div>
  );
}