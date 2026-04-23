"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateLinkForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setUrl("");
    setLoading(false);
    router.refresh();
  }

  return (
    <div
      className="rounded-xl p-5 mb-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-sm font-semibold text-white mb-3">Shorten a URL</p>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div
          className="flex items-center flex-1 rounded-lg overflow-hidden"
          style={{
            backgroundColor: "var(--bg)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Prefix */}
          <span
            className="px-3 py-3 text-sm font-mono border-r flex-shrink-0"
            style={{
              color: "var(--text-subtle)",
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
            }}
          >
            shr.ly/
          </span>
          {/* Input */}
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-long-url.com/goes/here"
            required
            className="flex-1 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none bg-transparent"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50 flex-shrink-0 cursor-pointer"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Zap className="w-4 h-4 fill-white" />
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {error && (
        <p className="text-xs mt-2" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}