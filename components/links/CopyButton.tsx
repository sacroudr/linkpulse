"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "../ui/Toast";

interface CopyButtonProps {
  text: string;
  showLabel?: boolean;
}

export function CopyButton({ text, showLabel = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [pressing, setPressing] = useState(false);
  const { showToast } = useToast();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setPressing(true);
      setCopied(true);
      showToast("Link copied to clipboard", "success");
      setTimeout(() => setPressing(false), 150);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Could not copy to clipboard", "error");
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      className="flex items-center gap-1.5 p-1.5 cursor-pointer"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        color: copied ? "#22c55e" : "var(--text-subtle)",
        borderRadius: "var(--radius)",
        transform: pressing ? "scale(0.9)" : "scale(1)",
        transition: "transform 150ms ease, color 200ms ease",
      }}
      title={copied ? "Copied!" : "Copy link"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {showLabel && (
        <span
          className="font-medium"
          style={{ fontSize: "var(--text-xs)" }}
        >
          {copied ? "Copied!" : "Copy"}
        </span>
      )}
    </button>
  );
}
