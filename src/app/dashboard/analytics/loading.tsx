export default function AnalyticsLoading() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <div
          className="h-8 w-32 mb-2 animate-pulse"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
        <div
          className="h-4 w-56 animate-pulse"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
      </div>
      <div
        className="animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          height: "400px",
        }}
      />
    </div>
  );
}
