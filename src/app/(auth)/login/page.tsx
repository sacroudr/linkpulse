"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "../../../../components/ui/Logo";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    router.push("/dashboard");
  }

  const inputStyle = {
    fontSize: "var(--text-sm)",
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "var(--radius)",
  };

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
        className={`w-full max-w-md rounded-2xl p-8 ${shake ? "animate-shake" : ""}`}
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <h1
          className="font-bold mb-1"
          style={{ fontSize: "var(--text-2xl)", color: "var(--text-primary)" }}
        >
          Welcome back
        </h1>
        <p className="mb-6" style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          Sign in to your LinkPulse account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="block font-semibold tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              Email address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="alex@example.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 placeholder:text-zinc-600 outline-none transition-colors"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="block font-semibold tracking-widest uppercase"
              style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 placeholder:text-zinc-600 outline-none transition-colors"
                style={{ ...inputStyle, paddingRight: "2.5rem" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                style={{ color: "var(--text-muted)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="flex items-center gap-1.5"
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
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p
          className="text-center mt-6"
          style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}
        >
          No account?{" "}
          <Link
            href="/register"
            className="font-medium"
            style={{ color: "var(--accent)" }}
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
