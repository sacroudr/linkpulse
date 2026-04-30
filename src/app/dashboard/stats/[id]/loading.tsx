export default function StatsLoading() {
  return (
    <div className="max-w-5xl">
      {/* Breadcrumb skeleton */}
      <div
        className="h-4 w-48 mb-6 animate-pulse"
        style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
      />

      {/* Info card skeleton */}
      <div
        className="p-6 mb-6 animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="h-3 w-20 rounded-full mb-3"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div
          className="h-8 w-48 mb-4"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
        <div
          className="h-3 w-64 rounded-full"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 p-6 animate-pulse"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div
              className="h-2.5 w-20 rounded-full mb-4"
              style={{ backgroundColor: "var(--border)" }}
            />
            <div
              className="h-8 w-16 mb-3"
              style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
            />
            <div
              className="h-2 w-24 rounded-full"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
        ))}
      </div>

      {/* Chart card skeleton */}
      <div
        className="p-6 animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          height: "380px",
        }}
      >
        <div
          className="h-4 w-32 mb-2"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
        <div
          className="h-3 w-24 rounded-full"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>
    </div>
  );
}
