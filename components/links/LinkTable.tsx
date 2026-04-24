"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Copy, Trash2 } from "lucide-react";

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date | string;
}

interface LinkTableProps {
  links: Link[];
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function LinkTable({ links }: LinkTableProps) {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleCopy(shortCode: string) {
    await navigator.clipboard.writeText(
      `${window.location.origin}/${shortCode}`
    );
    setCopied(shortCode);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    await fetch(`/api/links/${id}`, { method: "DELETE" });
    setDeleting(null);
    router.refresh();
  }

  if (links.length === 0) {
    return (
      <div
        className="rounded-xl flex flex-col items-center justify-center py-20"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p className="text-white font-medium mb-1">No links yet</p>
        <p className="text-sm" style={{ color: "#52525b" }}>
          Shorten your first URL above to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Table header */}
      <div
        className="grid text-xs font-semibold tracking-widest uppercase px-6 py-3"
        style={{
          fontSize: "var(--text-xs)",
          color: "var(--text-subtle)",
          borderBottom: "1px solid var(--border)",
          gridTemplateColumns: "200px 1fr 100px 130px 120px",
        }}
      >
        <span>Short code</span>
        <span>Original URL</span>
        <span>Clicks</span>
        <span>Created</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      {links.map((link) => (
        <div
          key={link.id}
          className="grid items-center px-6 py-4"
          style={{
            borderBottom: "1px solid var(--bg)",
            gridTemplateColumns: "200px 1fr 100px 130px 120px",
          }}
        >
          {/* Short code */}
          <span
            className="text-sm font-mono font-medium"
            style={{ fontSize: "var(--text-sm)", color: "var(--accent)" }}
          >
            /{link.shortCode}
          </span>

          {/* Original URL */}
          <span
            className="text-sm truncate pr-4"
            style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
          >
            {link.originalUrl}
          </span>

          {/* Clicks badge */}
          <span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{
                fontSize: "var(--text-xs)",
                backgroundColor: "var(--bg)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              {formatCount(link.clickCount)}
            </span>
          </span>

          {/* Created date */}
          <span className="text-sm" style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>
            {formatDate(link.createdAt)}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/dashboard/stats/${link.id}`)}
              className="p-1.5 rounded-md transition-colors cursor-pointer"
              
              style={{ color: "var(--text-subtle)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              title="View stats"
            >
              <TrendingUp className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleCopy(link.shortCode)}
              className="p-1.5 rounded-md transition-colors cursor-pointer"
              style={{
                color: copied === link.shortCode ? "#22c55e" : "#52525b",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#27272a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              title="Copy short link"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleDelete(link.id)}
              disabled={deleting === link.id}
              className="p-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              style={{ color: "#52525b" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#ef4444")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#52525b")
              }
              title="Delete link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}