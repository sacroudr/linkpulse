// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { TrendingUp, Copy, Trash2, Check, ExternalLink } from "lucide-react";

// const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// interface Link {
//   id: string;
//   shortCode: string;
//   originalUrl: string;
//   clickCount: number;
//   createdAt: Date | string;
//   isActive: boolean;
// }

// interface LinkTableProps {
//   links: Link[];
// }

// function formatDate(date: Date | string) {
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function formatCount(n: number) {
//   if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
//   return String(n);
// }

// export function LinkTable({ links }: LinkTableProps) {
//   const router = useRouter();
//   const [copied, setCopied] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState<string | null>(null);
//   const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

//   async function handleCopy(shortCode: string) {
//     try {
//       await navigator.clipboard.writeText(`${APP_URL}/${shortCode}`);
//       setCopied(shortCode);
//       setTimeout(() => setCopied(null), 2000);
//     } catch {
//       // clipboard not available
//     }
//   }

//   async function handleDelete(id: string) {
//     setDeleting(id);
//     setConfirmDelete(null);
//     try {
//       await fetch(`/api/links/${id}`, { method: "DELETE" });
//     } finally {
//       setDeleting(null);
//       router.refresh();
//     }
//   }

//   if (links.length === 0) {
//     return (
//       <div
//         className="rounded-xl flex flex-col items-center justify-center py-20"
//         style={{
//           backgroundColor: "var(--surface)",
//           border: "1px solid var(--border)",
//         }}
//       >
//         <p
//           className="font-medium mb-1"
//           style={{ color: "var(--text-primary)", fontSize: "var(--text-sm)" }}
//         >
//           No links yet
//         </p>
//         <p style={{ color: "var(--text-subtle)", fontSize: "var(--text-sm)" }}>
//           Shorten your first URL above to get started.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="rounded-xl overflow-x-auto"
//       style={{
//         backgroundColor: "var(--surface)",
//         border: "1px solid var(--border)",
//       }}
//     >
//       {/* Table header */}
//       <div
//         className="grid font-semibold tracking-widest uppercase px-6 py-3"
//         style={{
//           minWidth: "680px",
//           fontSize: "var(--text-xs)",
//           color: "var(--text-subtle)",
//           borderBottom: "1px solid var(--border)",
//           gridTemplateColumns: "200px 1fr 100px 130px 150px",
//         }}
//       >
//         <span>Short code</span>
//         <span>Original URL</span>
//         <span>Clicks</span>
//         <span>Created</span>
//         <span>Actions</span>
//       </div>

//       {/* Rows */}
//       {links.map((link) => (
//         <div
//           key={link.id}
//           className="grid items-center px-6 py-4 transition-colors"
//           style={{
//             minWidth: "680px",
//             borderBottom: "1px solid var(--bg)",
//             gridTemplateColumns: "200px 1fr 100px 130px 150px",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = "var(--bg)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "transparent")
//           }
//         >
//           {/* Short code — clickable link */}
//             <a
//               href={`${APP_URL}/${link.shortCode}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-1.5 font-mono font-medium group"
//               style={{
//                 fontSize: "var(--text-sm)",
//                 color: link.isActive ? "var(--accent)" : "var(--text-subtle)",
//                 textDecoration: link.isActive ? "none" : "line-through",
//               }}
//               title={`Open ${APP_URL}/${link.shortCode}`}
//             >
//               /{link.shortCode}
//               <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
//             </a>

//           {/* //   href={`${APP_URL}/${link.shortCode}`}
//           //   target="_blank"
//           //   rel="noopener noreferrer"
//           //   className="inline-flex items-center gap-1.5 font-mono font-medium group"
//           //   style={{ fontSize: "var(--text-sm)", color: "var(--accent)" }}
//           //   title={`Open ${APP_URL}/${link.shortCode}`}
//           //   aria-label={`Open short link /${link.shortCode} in new tab`}
//           // >
//           //   /{link.shortCode}
//           //   <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
//           // </a> */}

//           {/* Original URL with full-URL tooltip */}
//           <span
//             className="truncate pr-4"
//             style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
//             title={link.originalUrl}
//           >
//             {link.originalUrl}
//           </span>

//           {/* Clicks badge */}
//           <span>
//             <span
//               className="font-medium px-2.5 py-1"
//               style={{
//                 fontSize: "var(--text-xs)",
//                 backgroundColor: "var(--bg)",
//                 color: "var(--text-muted)",
//                 border: "1px solid var(--border)",
//                 borderRadius: "var(--radius)",
//               }}
//             >
//               {formatCount(link.clickCount)}
//             </span>
//           </span>

//           {/* Created date */}
//           <span
//             style={{
//               fontSize: "var(--text-sm)",
//               color: "var(--text-subtle)",
//             }}
//           >
//             {formatDate(link.createdAt)}
//           </span>

//           {/* Actions */}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => router.push(`/dashboard/stats/${link.id}`)}
//               className="p-1.5 rounded-md transition-colors cursor-pointer"
//               style={{ color: "var(--text-subtle)" }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "var(--border)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "transparent")
//               }
//               title="View stats"
//               aria-label={`View stats for /${link.shortCode}`}
//             >
//               <TrendingUp className="w-4 h-4" />
//             </button>

//             <button
//               onClick={() => handleCopy(link.shortCode)}
//               className="p-1.5 rounded-md transition-colors cursor-pointer"
//               style={{
//                 color:
//                   copied === link.shortCode
//                     ? "#22c55e"
//                     : "var(--text-subtle)",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "var(--border)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "transparent")
//               }
//               title={copied === link.shortCode ? "Copied!" : "Copy short link"}
//               aria-label={`Copy short link for /${link.shortCode}`}
//             >
//               {copied === link.shortCode ? (
//                 <Check className="w-4 h-4" />
//               ) : (
//                 <Copy className="w-4 h-4" />
//               )}
//             </button>

//             {confirmDelete === link.id ? (
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => handleDelete(link.id)}
//                   disabled={deleting === link.id}
//                   className="px-2 py-1 font-medium cursor-pointer disabled:opacity-50 transition-opacity"
//                   style={{
//                     backgroundColor: "#ef4444",
//                     color: "#ffffff",
//                     fontSize: "var(--text-xs)",
//                     borderRadius: "4px",
//                   }}
//                   aria-label="Confirm delete"
//                 >
//                   {deleting === link.id ? "…" : "Yes"}
//                 </button>
//                 <button
//                   onClick={() => setConfirmDelete(null)}
//                   className="px-2 py-1 font-medium cursor-pointer"
//                   style={{
//                     backgroundColor: "var(--bg)",
//                     color: "var(--text-muted)",
//                     border: "1px solid var(--border)",
//                     fontSize: "var(--text-xs)",
//                     borderRadius: "4px",
//                   }}
//                   aria-label="Cancel delete"
//                 >
//                   No
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setConfirmDelete(link.id)}
//                 className="p-1.5 rounded-md transition-colors cursor-pointer"
//                 style={{ color: "var(--text-subtle)" }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.color = "#ef4444")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.color = "var(--text-subtle)")
//                 }
//                 title="Delete link"
//                 aria-label={`Delete /${link.shortCode}`}
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

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
} from "lucide-react";
import { exportLinksToCSV } from "../../lib/csv";
// import { exportLinksToCSV } from "@/lib/csv";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date | string;
  isActive: boolean;
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
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // clipboard not available
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    setConfirmDelete(null);
    try {
      await fetch(`/api/links/${id}`, { method: "DELETE" });
    } finally {
      setDeleting(null);
      router.refresh();
    }
  }

  // async function handleBulkDelete() {
  //   setBulkDeleting(true);
  //   setConfirmBulk(false);
  //   try {
  //     await fetch("/api/links/bulk", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ids: Array.from(selected) }),
  //     });
  //     setSelected(new Set());
  //   } finally {
  //     setBulkDeleting(false);
  //     router.refresh();
  //   }
  // }

  async function handleBulkDelete() {
  const ids = Array.from(selected);
  console.log("sending ids:", ids);
  console.log("ids type:", typeof ids, Array.isArray(ids));
  
  setBulkDeleting(true);
  setConfirmBulk(false);
  try {
    const res = await fetch("/api/links/bulk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    
    const data = await res.json();
    console.log("response:", data);
    
    setSelected(new Set());
  } finally {
    setBulkDeleting(false);
    router.refresh();
  }
}

  function handleExportCSV() {
    const toExport =
      someSelected
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
        className="rounded-xl flex flex-col items-center justify-center py-20"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <p
          className="font-medium mb-1"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-sm)",
          }}
        >
          No links yet
        </p>
        <p
          style={{
            color: "var(--text-subtle)",
            fontSize: "var(--text-sm)",
          }}
        >
          Shorten your first URL above to get started.
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
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {selected.size} selected
              </span>

              {confirmBulk ? (
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Delete {selected.size} links?
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    disabled={bulkDeleting}
                    className="px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer disabled:opacity-50"
                    style={{
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    {bulkDeleting ? "Deleting..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setConfirmBulk(false)}
                    className="px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      borderRadius: "var(--radius)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmBulk(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer transition-colors"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete selected
                </button>
              )}
            </>
          )}
        </div>

        {/* Export CSV button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
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
        >
          <Download className="w-3.5 h-3.5" />
          {someSelected ? `Export ${selected.size} selected` : "Export CSV"}
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-x-auto"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
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
          {/* Select all checkbox */}
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
                  className="p-1.5 rounded-md transition-colors cursor-pointer"
                  style={{ color: "var(--text-subtle)" }}
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
                  className="p-1.5 rounded-md transition-colors cursor-pointer"
                  style={{
                    color:
                      copied === link.shortCode
                        ? "#22c55e"
                        : "var(--text-subtle)",
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
                        borderRadius: "4px",
                      }}
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
                        borderRadius: "4px",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(link.id)}
                    className="p-1.5 rounded-md transition-colors cursor-pointer"
                    style={{ color: "var(--text-subtle)" }}
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