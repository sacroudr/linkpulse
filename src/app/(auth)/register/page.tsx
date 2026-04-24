"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "../../../../components/ui/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
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
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  const inputClass =
    "w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors";

  const inputStyle = {
    backgroundColor: "#1c1c1f",
    border: "1px solid #27272a",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "currentTarget.style.borderColor";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#27272a";
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: "#09090b",
        backgroundImage: `radial-gradient(circle, #27272a 1px, transparent 1px)`,
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
          backgroundColor: "#111113",
          border: "1px solid #27272a",
        }}
      >
        {/* Heading */}
        <h1 className="text-2xl font-bold text-white mb-1">
          Create an account
        </h1>
        <p className="text-sm mb-6" style={{ color: "#71717a" }}>
          Start shortening links in seconds.
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
              placeholder="you@example.com"
              required
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              placeholder="At least 6 characters"
              required
              minLength={6}
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p className="text-xs" style={{ color: "#52525b" }}>
              Use a mix of letters and numbers
            </p>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label
              className="block text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#71717a" }}
            >
              Confirm password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6" style={{ color: "#71717a" }}>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium"
            style={{ color: "var(--accent)" }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}