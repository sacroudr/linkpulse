export default function DashboardLoading() {
  return (
    <div className="max-w-6xl">
      {/* Header skeleton */}
      <div className="mb-6">
        <div
          className="h-8 w-36 mb-2 animate-pulse"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
        <div
          className="h-4 w-64 animate-pulse"
          style={{ backgroundColor: "var(--border)", borderRadius: "var(--radius)" }}
        />
      </div>

      {/* Form skeleton */}
      <div
        className="p-5 mb-6 animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          height: "80px",
        }}
      />

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      {/* Table skeleton */}
      <div
        className="overflow-hidden animate-pulse"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="h-10 px-6"
          style={{ borderBottom: "1px solid var(--border)" }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid items-center px-6 py-4 gap-4"
            style={{
              borderBottom: i < 3 ? "1px solid var(--bg)" : "none",
              gridTemplateColumns: "200px 1fr 100px 130px 120px",
            }}
          >
            <div
              className="h-2.5 rounded-full"
              style={{ backgroundColor: "var(--border)", width: "70%" }}
            />
            <div
              className="h-2.5 rounded-full"
              style={{ backgroundColor: "var(--border)", width: "80%" }}
            />
            <div
              className="h-2.5 rounded-full"
              style={{ backgroundColor: "var(--border)", width: "60%" }}
            />
            <div
              className="h-2.5 rounded-full"
              style={{ backgroundColor: "var(--border)", width: "70%" }}
            />
            <div className="flex gap-1.5">
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  className="h-6 w-6"
                  style={{
                    backgroundColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
