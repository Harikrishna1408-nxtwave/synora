"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Sparkles, Loader2 } from "lucide-react";

export default function SocialLogin() {
  const [loading, setLoading] = useState<"google" | "github" | "demo" | null>(null);

  const handleLogin = async (provider: "google" | "github" | "demo") => {
    try {
      setLoading(provider);

      if (provider === "demo") {
        await signIn("credentials", {
          email: "demo@synora.ai",
          password: "demo",
          callbackUrl: "/dashboard",
        });
      } else {
        await signIn(provider, {
          callbackUrl: "/dashboard",
        });
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Authentication failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Premium Highlight Demo Access Button */}
      <button
        onClick={() => handleLogin("demo")}
        disabled={loading !== null}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/10 transition-all py-3.5 font-bold text-white shadow-md cursor-pointer"
      >
        {loading === "demo" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="h-5 w-5 animate-pulse" />
        )}
        <span>{loading === "demo" ? "Entering Workspace..." : "Instant Demo Access"}</span>
      </button>

      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-slate-800" />
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Social Login</span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleLogin("github")}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-[#0f172a]/60 hover:bg-slate-800/80 hover:text-white transition-all py-3 text-xs font-semibold text-slate-350 cursor-pointer"
        >
          {loading === "github" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FaGithub size={16} />}
          GitHub
        </button>

        <button
          onClick={() => handleLogin("google")}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-[#0f172a]/60 hover:bg-slate-800/80 hover:text-white transition-all py-3 text-xs font-semibold text-slate-350 cursor-pointer"
        >
          {loading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FaGoogle size={16} />}
          Google
        </button>
      </div>
    </div>
  );
}