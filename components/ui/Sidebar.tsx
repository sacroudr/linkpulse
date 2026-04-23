"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Palette,
  Sun,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { label: "Design System", href: "/dashboard/design", icon: Palette },
];

interface SidebarProps {
  userEmail: string;
}

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const initial = userEmail.charAt(0).toUpperCase();
  const name = userEmail.split("@")[0];

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-56 flex flex-col z-10"
      style={{
        backgroundColor: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
          LinkPulse
        </span>
      </div>

      {/* Navigation */}
      <div className="px-3 mt-4 flex-1">
        <p
          className="text-xs font-semibold tracking-widest uppercase px-2 mb-2"
          style={{ color: "var(--text-subtle)" }}
        >
          Navigation
        </p>
        <nav className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive =
                pathname === href ||
                (href === "/dashboard/analytics" &&
                    pathname.startsWith("/dashboard/stats"));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors group"
                style={{
                  backgroundColor: isActive ? "var(--bg)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{label}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
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
        {/* Light mode toggle */}
        <button
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm w-full transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--bg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <Sun className="w-4 h-4" />
          <span className="font-medium">Light mode</span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white">{initial}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-white truncate capitalize">
              {name}
            </span>
            <span
              className="text-xs truncate"
              style={{ color:  "var(--text-subtle)" }}
            >
              {userEmail}
            </span>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm w-full transition-colors"
          style={{ color: "#71717a" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1c1c1f")
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