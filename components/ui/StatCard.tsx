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
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--text-subtle)",
        }}
        className="font-semibold tracking-widest uppercase mb-3"
      >
        {label}
      </p>
      <p
        className={`font-bold mb-1 ${mono ? "font-mono" : ""}`}
        style={{
          fontSize: "var(--text-4xl)",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>
        {description}
      </p>
    </div>
  );
}