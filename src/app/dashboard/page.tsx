
// "use client";

import { CreateLinkForm } from "../../../components/links/CreateLinkForm";
import { LinkTable } from "../../../components/links/LinkTable";
import { StatCard } from "../../../components/ui/StatCard";
import { auth } from "../../../lib/auth";
import { getLinksByUserId } from "../../../lib/queries";

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default async function DashboardPage() {
  const session = await auth();
  const links = await getLinksByUserId(session!.user.id);

  const totalClicks = links.reduce((sum, l) => sum + (l.clickCount ?? 0), 0);
  const topLink = links.reduce(
    (top, l) => (l.clickCount > (top?.clickCount ?? 0) ? l : top),
    links[0]
  );

  return (
    <div className="max-w-6xl">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="font-bold"
          style={{ fontSize: "var(--text-3xl)", color: "var(--text-primary)" }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Manage and track all your short links.
        </p>
      </div>

      {/* Shorten form */}
      <CreateLinkForm />

      {/* Stat cards */}
      <div className="flex gap-4 mb-8">
        <StatCard
          label="Total links"
          value={links.length}
          description="active short links"
        />
        <StatCard
          label="Total clicks"
          value={formatCount(totalClicks)}
          description="across all links"
        />
        <StatCard
          label="Top link"
          value={topLink ? `/${topLink.shortCode}` : "—"}
          description={topLink ? `${formatCount(topLink.clickCount)} clicks` : "no links yet"}
          mono
        />
      </div>

      {/* Links table */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-white">Your links</h2>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "#1c1c1f",
              color: "#71717a",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            {links.length}
          </span>
        </div>
      </div>

      <LinkTable links={links} />
    </div>
  );
}