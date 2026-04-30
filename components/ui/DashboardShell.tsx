"use client";

import { useState, useEffect } from "react";
import { Menu, Zap } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail: string;
  userName?: string;
}

export function DashboardShell({
  children,
  userEmail,
  userName,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Mobile header */}
      <div
        className="fixed top-0 left-0 right-0 z-20 flex items-center gap-3 px-4 h-14 lg:hidden"
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 cursor-pointer"
          style={{ color: "var(--text-primary)", borderRadius: "var(--radius)" }}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar-nav"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "var(--accent)",
              borderRadius: "var(--radius)",
            }}
          >
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span
            className="font-semibold"
            style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
          >
            LinkPulse
          </span>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        userEmail={userEmail}
        userName={userName}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        id="main-content"
        className="lg:ml-56 p-4 pt-[72px] lg:pt-8 lg:p-8"
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        {children}
      </main>
    </div>
  );
}
