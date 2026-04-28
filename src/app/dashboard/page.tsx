import type { Metadata } from "next";
import { CreateLinkForm } from "../../../components/links/CreateLinkForm";
import { LinkTable } from "../../../components/links/LinkTable";
import { StatCard } from "../../../components/ui/StatCard";
import { auth } from "../../../lib/auth";
import { getLinksByUserId } from "../../../lib/queries";

export const metadata: Metadata = {
  title: "Dashboard — LinkPulse",
  description: "Manage and track all your short links.",
};

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

  const userName = session?.user?.name ?? undefined;
  const firstName = userName
    ? userName.split(" ")[0]
    : (session?.user?.email?.split("@")[0] ?? "there");

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
          {links.length === 0
            ? `Welcome, ${firstName}! Start by shortening your first URL below.`
            : "Manage and track all your short links."}
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
          animationDelay={0}
        />
        <StatCard
          label="Total clicks"
          value={formatCount(totalClicks)}
          description="across all links"
          animationDelay={80}
        />
        <StatCard
          label="Top link"
          value={topLink ? `/${topLink.shortCode}` : "—"}
          description={
            topLink
              ? `${formatCount(topLink.clickCount)} clicks`
              : "no links yet"
          }
          mono
          animationDelay={160}
        />
      </div>

      {/* Links table */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2
            className="font-semibold"
            style={{ fontSize: "var(--text-base)", color: "var(--text-primary)" }}
          >
            Your links
          </h2>
          <span
            className="font-medium px-2 py-0.5"
            style={{
              fontSize: "var(--text-xs)",
              backgroundColor: "var(--bg)",
              color: "var(--text-muted)",
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
