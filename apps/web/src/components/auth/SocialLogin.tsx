"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleLogin = async (provider: "google" | "github") => {
    try {
      setLoading(provider);

      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleLogin("google")}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all py-3 font-medium text-white"
      >
        <FaGoogle size={20} />

        {loading === "google"
          ? "Signing in..."
          : "Continue with Google"}
      </button>

      <button
        onClick={() => handleLogin("github")}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all py-3 font-medium text-white"
      >
        <FaGithub size={20} />

        {loading === "github"
          ? "Signing in..."
          : "Continue with GitHub"}
      </button>
    </div>
  );
}