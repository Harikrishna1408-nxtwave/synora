"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { Mail, Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: trimmedEmail,
        password: "demo",
        redirect: false,
      });

      if (res?.error) {
        // next-auth returns CredentialsSignin if authorize returns null
        setError("Account not found. Please register first.");
        setIsLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          Synora
        </h1>

        <p className="mt-2 text-xs text-slate-500">
          Your Digital Twin for Everyday Decisions
        </p>
      </div>

      {/* Welcome */}
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Welcome Back
        </h2>

        <p className="text-xs text-slate-400">
          Sign in to continue to your workspace.
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-950/40 border border-rose-900/30 p-4 text-xs text-rose-450 text-center leading-relaxed">
          {error}{" "}
          <Link href="/signup" className="underline font-bold text-rose-400 hover:text-rose-350 ml-1">
            Register here
          </Link>
        </div>
      )}

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3.5 text-xs font-bold text-white shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              Verifying Credentials...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 text-white" />
              Sign In
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-slate-850" />
        <span className="text-[9px] font-extrabold text-slate-550 uppercase tracking-wider">Alternative Entry</span>
        <div className="h-px flex-1 bg-slate-850" />
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Footer */}
      <div className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Create one
        </Link>
      </div>
    </div>
  );
}