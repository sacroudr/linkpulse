"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Power } from "lucide-react";

interface ActiveToggleProps {
  linkId: string;
  isActive: boolean;
}

export function ActiveToggle({ linkId, isActive }: ActiveToggleProps) {
  const router = useRouter();
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
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle link:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
      style={{
        backgroundColor: active ? "#052e16" : "var(--surface)",
        color: active ? "#22c55e" : "var(--text-muted)",
        border: `1px solid ${active ? "#166534" : "var(--border)"}`,
        borderRadius: "var(--radius)",
      }}
      title={active ? "Deactivate link" : "Activate link"}
    >
      <Power className="w-4 h-4" />
      {loading ? "Updating..." : active ? "Active" : "Inactive"}
    </button>
  );
}