"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

const ICONS: Record<ToastType, typeof Check> = {
  success: Check,
  error: AlertCircle,
  info: Info,
};

const STYLES: Record<ToastType, { color: string; borderColor: string }> = {
  success: { color: "#22c55e", borderColor: "#166534" },
  error: { color: "#ef4444", borderColor: "#7f1d1d" },
  info: { color: "var(--accent)", borderColor: "var(--border)" },
};

function SingleToast({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const Icon = ICONS[toast.type];
  const style = STYLES[toast.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2.5 animate-slide-in-right"
      style={{
        backgroundColor: "var(--surface)",
        border: `1px solid ${style.borderColor}`,
        borderRadius: "var(--radius)",
        color: style.color,
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        padding: "10px 14px",
        minWidth: "220px",
        maxWidth: "340px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="cursor-pointer ml-1 flex-shrink-0"
        style={{ color: style.color, opacity: 0.6 }}
        aria-label="Dismiss notification"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 z-50 pointer-events-none"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <SingleToast toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
