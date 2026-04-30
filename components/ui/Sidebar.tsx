"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Palette,
  LogOut,
  Zap,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    tooltip: "View your links and stats",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: TrendingUp,
    tooltip: "Analyze link performance",
  },
  {
    label: "Design System",
    href: "/dashboard/design",
    icon: Palette,
    tooltip: "Explore UI components and tokens",
  },
];

interface SidebarProps {
  userEmail: string;
  userName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  userEmail,
  userName,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const displayName = userName || userEmail.split("@")[0];
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      id="sidebar-nav"
      className={`fixed left-0 top-0 h-screen w-56 flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      style={{
        backgroundColor: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
      aria-label="Main navigation"
    >
      {/* Logo row */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "var(--accent)",
              borderRadius: "var(--radius)",
            }}
          >
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span
            className="font-semibold"
            style={{ fontSize: "var(--text-base)", color: "var(--text-primary)" }}
          >
            LinkPulse
          </span>
        </div>

        {/* Close button — mobile only */}
        <button
          className="lg:hidden p-1 cursor-pointer"
          style={{
            color: "var(--text-muted)",
            borderRadius: "var(--radius)",
          }}
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <div className="px-3 mt-4 flex-1">
        <p
          className="font-semibold tracking-widest uppercase px-2 mb-2"
          style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
        >
          Navigation
        </p>
        <nav className="space-y-0.5" role="navigation" aria-label="Main navigation">
          {navItems.map(({ label, href, icon: Icon, tooltip }) => {
            const isActive =
              pathname === href ||
              (href === "/dashboard/analytics" &&
                pathname.startsWith("/dashboard/stats"));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-2.5 px-2 py-2 transition-colors"
                style={{
                  backgroundColor: isActive ? "var(--bg)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  borderRadius: "var(--radius)",
                  fontSize: "var(--text-sm)",
                }}
                title={tooltip}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{label}</span>
                </div>
                {isActive && (
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 active-dot"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div
        className="px-3 py-4 space-y-1"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {/* User info */}
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <span
              className="font-semibold text-white"
              style={{ fontSize: "var(--text-xs)" }}
            >
              {initial}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className="font-medium truncate capitalize"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)" }}
            >
              {displayName}
            </span>
            <span
              className="truncate"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}
            >
              {userEmail}
            </span>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2.5 px-2 py-2 w-full transition-colors cursor-pointer"
          style={{
            color: "var(--text-muted)",
            borderRadius: "var(--radius)",
            fontSize: "var(--text-sm)",
          }}
          title="Sign out of your account"
          aria-label="Sign out"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--bg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
