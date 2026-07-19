"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Sparkles, Loader2, User, Mail } from "lucide-react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedName) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
      });

      if (res.ok) {
        // Automatic login on successful signup
        await signIn("credentials", {
          email: trimmedEmail,
          password: "demo",
          callbackUrl: "/dashboard",
        });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to sign up.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Create Account
        </h2>
        <p className="text-xs text-slate-400">
          Get started with Synora AI Digital Twin today.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-950/40 border border-rose-900/30 p-4 text-xs text-rose-450 text-center leading-relaxed">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Arun Kumar"
              className="w-full rounded-xl border border-slate-800 bg-[#0f172a]/30 pl-11 pr-4 py-3.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:bg-slate-950/80"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="arun@example.com"
              className="w-full rounded-xl border border-slate-800 bg-[#0f172a]/30 pl-11 pr-4 py-3.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:bg-slate-950/80"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3.5 text-xs font-bold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              Creating Account...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-white" />
              Register Now
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Sign in
        </Link>
      </div>
    </div>
  );
}
