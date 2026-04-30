"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "../../../../components/ui/Logo";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password,
        confirmPassword,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    router.push("/login");
  }

  const inputStyle = {
    fontSize: "var(--text-sm)",
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "var(--radius)",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--accent)";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--border)";
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: "var(--bg)",
        backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mb-8">
        <Logo />
      </div>

      <div
        className={`w-full max-w-md p-8 ${shake ? "animate-shake" : ""}`}
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <h1
          className="font-bold mb-1"
          style={{ fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}
        >
          Create an account
        </h1>
        <p className="mb-6" style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Start shortening links in seconds.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-email"
              className="block font-semibold tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              Email address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 placeholder:text-zinc-600 outline-none transition-colors"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-password"
              className="block font-semibold tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full px-4 py-3 placeholder:text-zinc-600 outline-none transition-colors"
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: "var(--text-muted)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
              Use a mix of letters and numbers
            </p>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-confirm"
              className="block font-semibold tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="reg-confirm"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full px-4 py-3 placeholder:text-zinc-600 outline-none transition-colors"
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: "var(--text-muted)" }}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              style={{ fontSize: "var(--text-sm)", color: "#ef4444" }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold text-white transition-opacity disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            style={{ fontSize: "var(--text-sm)", backgroundColor: "var(--accent)" }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p
          className="text-center mt-6"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium"
            style={{ color: "var(--accent)" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
