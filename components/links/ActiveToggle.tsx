"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Power, Loader2 } from "lucide-react";
import { useToast } from "../ui/Toast";

interface ActiveToggleProps {
  linkId: string;
  isActive: boolean;
}

export function ActiveToggle({ linkId, isActive }: ActiveToggleProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const newState = !active;

    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newState }),
      });

      if (res.ok) {
        setActive(newState);
        showToast(
          newState ? "Link activated" : "Link deactivated",
          "success"
        );
        router.refresh();
      } else {
        showToast("Failed to update link status", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-2 font-medium cursor-pointer disabled:opacity-50"
      style={{
        backgroundColor: active ? "#052e16" : "var(--surface)",
        color: active ? "#22c55e" : "var(--text-muted)",
        border: `1px solid ${active ? "#166534" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        fontSize: "var(--text-sm)",
        transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
      }}
      title={active ? "Deactivate link" : "Activate link"}
      aria-label={active ? "Deactivate this link" : "Activate this link"}
      aria-pressed={active}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Power className="w-4 h-4" />
      )}
      {loading ? "Updating…" : active ? "Active" : "Inactive"}
    </button>
  );
}
