"use client";

import Link from "next/link";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          Synora
        </h1>

        <p className="mt-3 text-slate-400">
          Your Digital Twin for Everyday Decisions
        </p>
      </div>

      {/* Welcome */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Welcome Back
        </h2>

        <p className="text-slate-400">
          Sign in to continue to your workspace.
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700" />
        <span className="text-sm text-slate-500">
          OR
        </span>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      {/* Future Credentials Form */}
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          disabled
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 cursor-not-allowed"
        />

        <input
          type="password"
          placeholder="Password"
          disabled
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 cursor-not-allowed"
        />

        <button
          disabled
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white opacity-60 cursor-not-allowed"
        >
          Email Login (Coming Soon)
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}