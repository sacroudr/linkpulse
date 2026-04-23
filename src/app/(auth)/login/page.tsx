"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "../../../../components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
      {/* Logo */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm mb-6" style={{ color: "#71717a" }}>
          Sign in to your Linkpulse account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#71717a" }}
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="alex@example.com"
              required
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "#3b82f6")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "#27272a")
              }
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#71717a" }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "#3b82f6")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "#27272a")
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm" style={{ color: "#ef4444" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6" style={{ color: "#71717a" }}>
          No account?{" "}
          <a
            href="/register"
            className="font-medium"
            style={{ color: "#3b82f6" }}
          >
            Create one free
          </a>
        </p>
      </div>
    </div>
  );
}