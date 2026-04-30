"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Copy,
  Trash2,
  Check,
  ExternalLink,
  Download,
  Link2,
} from "lucide-react";
import { exportLinksToCSV } from "../../lib/csv";
import { useToast } from "../ui/Toast";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

interface LinkRow {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date | string;
  isActive: boolean;
}

interface LinkTableProps {
  links: LinkRow[];
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
  const { showToast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [confirmBulk, setConfirmBulk] = useState(false);

  const allSelected = links.length > 0 && selected.size === links.length;
  const someSelected = selected.size > 0;

  function toggleSelectAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(links.map((l) => l.id)));
    }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleCopy(shortCode: string) {
    try {
      await navigator.clipboard.writeText(`${APP_URL}/${shortCode}`);
      setCopied(shortCode);
      showToast("Link copied to clipboard", "success");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      showToast("Could not copy to clipboard", "error");
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    setConfirmDelete(null);
    try {
      const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
      if (!res.ok) {
        showToast("Failed to delete link", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setDeleting(null);
      router.refresh();
    }
  }

  async function handleBulkDelete() {
    const ids = Array.from(selected);
    const count = ids.length;
    setBulkDeleting(true);
    setConfirmBulk(false);
    try {
      const res = await fetch("/api/links/bulk", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (res.ok) {
        showToast(
          `${count} link${count !== 1 ? "s" : ""} deleted`,
          "success"
        );
        setSelected(new Set());
      } else {
        showToast("Failed to delete selected links", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setBulkDeleting(false);
      router.refresh();
    }
  }

  function handleExportCSV() {
    const toExport = someSelected
      ? links.filter((l) => selected.has(l.id))
      : links;

    exportLinksToCSV(
      toExport,
      `linkpulse-links-${new Date().toISOString().split("T")[0]}.csv`
    );
  }

  if (links.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <div
          className="w-14 h-14 flex items-center justify-center mb-5"
          style={{
            backgroundColor: "var(--bg)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <Link2 className="w-6 h-6" style={{ color: "var(--accent)" }} />
        </div>
        <p
          className="font-semibold mb-2"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-base)",
          }}
        >
          No links yet
        </p>
        <p
          className="text-center max-w-xs"
          style={{
            color: "var(--text-subtle)",
            fontSize: "var(--text-sm)",
          }}
        >
          Shorten your first URL above to start tracking clicks and analytics.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {someSelected && (
            <>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                }}
                className="font-medium"
              >
                {selected.size} selected
              </span>

              {confirmBulk ? (
                <div className="flex items-center gap-1.5">
                  <span
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                    }}
                  >
                    Delete {selected.size} link{selected.size !== 1 ? "s" : ""}?
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    disabled={bulkDeleting}
                    className="px-2.5 py-1 font-medium cursor-pointer disabled:opacity-50"
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      fontSize: "var(--text-xs)",
                      borderRadius: "var(--radius)",
                    }}
                    aria-label={`Confirm delete ${selected.size} links`}
                  >
                    {bulkDeleting ? "Deleting…" : "Confirm"}
                  </button>
                  <button
                    onClick={() => setConfirmBulk(false)}
                    className="px-2.5 py-1 font-medium cursor-pointer"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      fontSize: "var(--text-xs)",
                      borderRadius: "var(--radius)",
                    }}
                    aria-label="Cancel bulk delete"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmBulk(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 font-medium cursor-pointer transition-colors"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    fontSize: "var(--text-xs)",
                    borderRadius: "var(--radius)",
                  }}
                  aria-label={`Delete ${selected.size} selected links`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete selected
                </button>
              )}
            </>
          )}
        </div>

        {/* Export CSV */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 font-medium cursor-pointer transition-colors"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "var(--text-xs)",
            borderRadius: "var(--radius)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
          title={
            someSelected
              ? `Export ${selected.size} selected links`
              : "Export all links"
          }
          aria-label={
            someSelected
              ? `Export ${selected.size} selected links as CSV`
              : "Export all links as CSV"
          }
        >
          <Download className="w-3.5 h-3.5" />
          {someSelected ? `Export ${selected.size} selected` : "Export CSV"}
        </button>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        {/* Header */}
        <div
          className="grid font-semibold tracking-widest uppercase px-6 py-3"
          style={{
            minWidth: "720px",
            fontSize: "var(--text-xs)",
            color: "var(--text-subtle)",
            borderBottom: "1px solid var(--border)",
            gridTemplateColumns: "40px 200px 1fr 100px 130px 150px",
          }}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="cursor-pointer"
              style={{ accentColor: "var(--accent)" }}
              aria-label="Select all links"
            />
          </div>
          <span>Short code</span>
          <span>Original URL</span>
          <span>Clicks</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {links.map((link) => {
          const isSelected = selected.has(link.id);

          return (
            <div
              key={link.id}
              className="grid items-center px-6 py-4 transition-colors"
              style={{
                minWidth: "720px",
                borderBottom: "1px solid var(--bg)",
                gridTemplateColumns: "40px 200px 1fr 100px 130px 150px",
                backgroundColor: isSelected
                  ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(link.id)}
                  className="cursor-pointer"
                  style={{ accentColor: "var(--accent)" }}
                  aria-label={`Select /${link.shortCode}`}
                />
              </div>

              {/* Short code */}
              <a
                href={`${APP_URL}/${link.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono font-medium group"
                style={{
                  fontSize: "var(--text-sm)",
                  color: link.isActive
                    ? "var(--accent)"
                    : "var(--text-subtle)",
                  textDecoration: link.isActive ? "none" : "line-through",
                }}
                title={`Open ${APP_URL}/${link.shortCode}`}
                aria-label={`Open short link /${link.shortCode} in new tab`}
              >
                /{link.shortCode}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>

              {/* Original URL */}
              <span
                className="truncate pr-4"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-muted)",
                }}
                title={link.originalUrl}
              >
                {link.originalUrl}
              </span>

              {/* Clicks badge */}
              <span>
                <span
                  className="font-medium px-2.5 py-1"
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
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-subtle)",
                }}
              >
                {formatDate(link.createdAt)}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Link
                  href={`/dashboard/stats/${link.id}`}
                  className="p-1.5 transition-colors cursor-pointer"
                  style={{
                    color: "var(--text-subtle)",
                    borderRadius: "var(--radius)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--border)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  title="View stats"
                  aria-label={`View stats for /${link.shortCode}`}
                >
                  <TrendingUp className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleCopy(link.shortCode)}
                  className="p-1.5 transition-colors cursor-pointer"
                  style={{
                    color:
                      copied === link.shortCode
                        ? "#22c55e"
                        : "var(--text-subtle)",
                    borderRadius: "var(--radius)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--border)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  title={
                    copied === link.shortCode ? "Copied!" : "Copy short link"
                  }
                  aria-label={`Copy short link for /${link.shortCode}`}
                >
                  {copied === link.shortCode ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {confirmDelete === link.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(link.id)}
                      disabled={deleting === link.id}
                      className="px-2 py-1 font-medium cursor-pointer disabled:opacity-50"
                      style={{
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        fontSize: "var(--text-xs)",
                        borderRadius: "var(--radius)",
                      }}
                      aria-label={`Confirm delete /${link.shortCode}`}
                    >
                      {deleting === link.id ? "…" : "Yes"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 font-medium cursor-pointer"
                      style={{
                        backgroundColor: "var(--bg)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        fontSize: "var(--text-xs)",
                        borderRadius: "var(--radius)",
                      }}
                      aria-label="Cancel delete"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(link.id)}
                    className="p-1.5 transition-colors cursor-pointer"
                    style={{
                      color: "var(--text-subtle)",
                      borderRadius: "var(--radius)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#ef4444")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-subtle)")
                    }
                    title="Delete link"
                    aria-label={`Delete /${link.shortCode}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
