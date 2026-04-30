"use client";

import { useState } from "react";
import { Sliders, X } from "lucide-react";
import { ThemePanel } from "./ThemePanel";

export function DesignPageShell({ children }: { children: React.ReactNode }) {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div
      className="-m-4 -mt-[72px] lg:-m-8 flex"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      {/* Mobile panel overlay */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-30 xl:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setPanelOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile panel toggle button */}
      <button
        className="xl:hidden fixed z-40 flex items-center gap-2 font-medium cursor-pointer"
        style={{
          bottom: "24px",
          left: "72px",
          backgroundColor: "var(--accent)",
          color: "#fff",
          fontSize: "var(--text-xs)",
          borderRadius: "var(--radius)",
          padding: "8px 14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        onClick={() => setPanelOpen((v) => !v)}
        aria-label={panelOpen ? "Close design tokens panel" : "Open design tokens panel"}
        aria-expanded={panelOpen}
      >
        {panelOpen ? (
          <X className="w-3.5 h-3.5" />
        ) : (
          <Sliders className="w-3.5 h-3.5" />
        )}
        Tokens
      </button>

      {/* Theme panel — always visible on xl+, toggled on smaller */}
      <div
        className={`xl:block ${panelOpen ? "block" : "hidden"}`}
        style={{ position: "relative", zIndex: panelOpen ? 40 : "auto" }}
      >
        <ThemePanel />
      </div>

      {/* Main content */}
      <div
        className="xl:ml-60 flex-1 overflow-y-auto theme-panel-scroll"
        style={{ height: "100dvh" }}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
