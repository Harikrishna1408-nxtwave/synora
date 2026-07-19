"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Bot, Sliders, CheckCircle2, Shield, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface SettingsClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const [name, setName] = useState(user.name || "");
  const [twinName, setTwinName] = useState("Synora AI");
  const [tone, setTone] = useState("balanced");
  const [detail, setDetail] = useState("detailed");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);

    // Simulate save timeout
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-8 z-50 flex items-center gap-2 rounded-2xl bg-emerald-950/50 border border-emerald-900/30 p-4 text-sm font-semibold text-emerald-450 shadow-lg backdrop-blur-md"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-450 animate-bounce" />
          Settings saved successfully!
        </motion.div>
      )}

      <form onSubmit={handleSave} className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-1 flex flex-col items-center justify-center rounded-3xl bg-slate-900/60 p-6 text-center border border-slate-805/85 backdrop-blur-md shadow-none"
        >
          <div className="relative h-20 w-20 rounded-3xl bg-[#0f172a]/60 border border-slate-800 flex items-center justify-center text-indigo-400 shadow-inner">
            {user.image ? (
              <img src={user.image} alt="User avatar" className="h-full w-full rounded-3xl object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>

          <h3 className="mt-4 font-bold text-slate-200 text-base">
            {name || "User"}
          </h3>

          <p className="text-xs text-slate-500">
            {user.email || "No email provided"}
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-[#0f172a]/60 border border-slate-800 px-3.5 py-1.5 text-[10px] font-bold tracking-wide uppercase text-slate-500">
            <Shield className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            Standard Account
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-rose-900/30 bg-rose-955/15 hover:bg-rose-950/40 px-4 py-2.5 text-xs font-bold text-rose-400 hover:text-rose-350 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log Out
          </button>
        </motion.div>

        {/* Configuration Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Persona Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-slate-900/60 p-6 border border-slate-805/80 backdrop-blur-md shadow-none space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
              <Bot className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                Digital Twin Settings
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-2">Digital Twin Label</label>
                <input
                  type="text"
                  value={twinName}
                  onChange={(e) => setTwinName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-[#0f172a]/30 px-4 py-3 text-xs text-slate-250 outline-none transition placeholder:text-slate-550 focus:border-indigo-500 focus:bg-slate-950/80 focus:ring-1 focus:ring-indigo-950/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-2">Profile Owner Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-[#0f172a]/30 px-4 py-3 text-xs text-slate-250 outline-none transition placeholder:text-slate-550 focus:border-indigo-500 focus:bg-slate-950/80 focus:ring-1 focus:ring-indigo-950/50"
                />
              </div>
            </div>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-slate-900/60 p-6 border border-slate-805/80 backdrop-blur-md shadow-none space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
              <Sliders className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                AI Behavior & Directives
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-2">Personality Tone</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {["professional", "balanced", "casual"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`rounded-xl py-3 text-xs font-bold capitalize border transition-all cursor-pointer ${
                        tone === t
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-950/40"
                          : "bg-slate-950/30 border-slate-850 text-slate-450 hover:border-indigo-500/60 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-2">Response Detail Level</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["concise", "detailed"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDetail(d)}
                      className={`rounded-xl py-3 text-xs font-bold capitalize border transition-all cursor-pointer ${
                        detail === d
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-950/40"
                          : "bg-slate-950/30 border-slate-850 text-slate-450 hover:border-indigo-500/60 hover:text-white"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit Block */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSaving}
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-xs text-white transition-all shadow-md shadow-indigo-500/10 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/20 disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? "Saving Settings..." : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>

        </div>
      </form>
    </div>
  );
}
