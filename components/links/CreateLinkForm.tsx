"use client";

import { useState } from "react";
import { Zap, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CopyButton } from "./CopyButton";

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function CreateLinkForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdShortCode, setCreatedShortCode] = useState<string | null>(null);

  const urlValid = url.length > 0 ? isValidUrl(url) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCreatedShortCode(null);

    try {
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

      const shortCode = data.link?.shortCode as string | undefined;
      setCreatedShortCode(shortCode ?? null);
      setUrl("");
      setLoading(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");

  return (
    <div
      className="p-5 mb-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      <p
        className="font-semibold mb-3"
        style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
      >
        Shorten a URL
      </p>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div
          className="flex items-center flex-1 overflow-hidden"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--bg)",
            border: `1px solid ${urlValid === false ? "#ef4444" : "var(--border)"}`,
            borderRadius: "var(--radius)",
            transition: "border-color 150ms ease",
          }}
        >
          <span
            className="px-3 py-3 font-mono border-r flex-shrink-0"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-subtle)",
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
            }}
          >
            shr.ly/
          </span>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (createdShortCode) setCreatedShortCode(null);
            }}
            placeholder="https://your-long-url.com/goes/here"
            required
            aria-label="URL to shorten"
            aria-describedby={error ? "url-error" : undefined}
            className="flex-1 px-4 py-3 placeholder:text-zinc-600 outline-none bg-transparent"
            style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)" }}
          />
          {url.length > 0 && (
            <span className="pr-3 flex-shrink-0">
              {urlValid ? (
                <CheckCircle className="w-4 h-4" style={{ color: "#22c55e" }} />
              ) : (
                <XCircle className="w-4 h-4" style={{ color: "#ef4444" }} />
              )}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || urlValid === false}
          className="flex items-center gap-2 px-5 py-3 font-semibold text-white transition-opacity disabled:opacity-50 flex-shrink-0 cursor-pointer"
          style={{
            fontSize: "var(--text-sm)",
            backgroundColor: "var(--accent)",
            borderRadius: "var(--radius)",
          }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4 fill-white" />
          )}
          {loading ? "Shortening…" : "Shorten"}
        </button>
      </form>

      {error && (
        <p
          id="url-error"
          role="alert"
          aria-live="polite"
          className="mt-2"
          style={{ fontSize: "var(--text-xs)", color: "#ef4444" }}
        >
          {error}
        </p>
      )}

      {createdShortCode && (
        <div
          className="flex items-center justify-between mt-3 px-3 py-2 animate-fade-in-up"
          style={{
            backgroundColor: "color-mix(in srgb, #22c55e 10%, transparent)",
            border: "1px solid color-mix(in srgb, #22c55e 30%, transparent)",
            borderRadius: "var(--radius)",
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "#22c55e" }}
            />
            <span
              className="font-medium flex-shrink-0"
              style={{ fontSize: "var(--text-xs)", color: "#22c55e" }}
            >
              Link created!
            </span>
            <span
              className="font-mono truncate"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--text-muted)",
              }}
            >
              {appUrl}/{createdShortCode}
            </span>
          </div>
          <div className="flex-shrink-0 ml-2">
            <CopyButton text={`${appUrl}/${createdShortCode}`} showLabel />
          </div>
        </div>
      )}
    </div>
  );
}
