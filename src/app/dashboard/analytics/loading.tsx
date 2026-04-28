export default function AnalyticsLoading() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <div
          className="h-8 w-32 rounded-lg mb-2 animate-pulse"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div
          className="h-4 w-56 rounded-md animate-pulse"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>
      <div
        className="rounded-xl animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          height: "400px",
        }}
      />
    </div>
  );
}
