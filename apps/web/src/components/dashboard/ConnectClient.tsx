"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Mail, Calendar, NotebookPen, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface AppIntegration {
  name: string;
  key: string;
  description: string;
  icon: React.ReactNode;
}

const integrations: AppIntegration[] = [
  {
    name: "GitHub",
    key: "github",
    description: "Sync code repositories, track daily commits, and review PR activity.",
    icon: <FolderGit2 className="h-6 w-6" />,
  },
  {
    name: "Gmail",
    key: "gmail",
    description: "Scan inbox highlights, track high-priority messages, and draft AI templates.",
    icon: <Mail className="h-6 w-6" />,
  },
  {
    name: "Google Calendar",
    key: "google-calendar",
    description: "Review daily appointments, organize schedules, and receive pre-meeting details.",
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    name: "Notion",
    key: "notion",
    description: "Synchronize personal wikis, read task backlogs, and generate action points.",
    icon: <NotebookPen className="h-6 w-6" />,
  },
];

export default function ConnectClient() {
  const [connectedKeys, setConnectedKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingKey, setTogglingKey] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/connect");
      if (res.ok) {
        const data = await res.json();
        // map db values to connected keys
        setConnectedKeys(data.map((c: { provider: string }) => c.provider.toLowerCase()));
      } else {
        setError("Failed to load active connections.");
      }
    } catch {
      setError("Failed to reach connection server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (provider: string) => {
    const isConnected = connectedKeys.includes(provider.toLowerCase());
    const action = isConnected ? "disconnect" : "connect";
    setTogglingKey(provider.toLowerCase());

    try {
      const res = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, action }),
      });

      if (res.ok) {
        if (action === "connect") {
          setConnectedKeys((prev) => [...prev, provider.toLowerCase()]);
        } else {
          setConnectedKeys((prev) => prev.filter((k) => k !== provider.toLowerCase()));
        }
      } else {
        alert(`Failed to ${action} ${provider}. Please try again.`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please check your connection.");
    } finally {
      setTogglingKey(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-2xl bg-rose-950/40 border border-rose-900/30 p-4 text-sm text-rose-450">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {integrations.map((app, index) => {
          const isConnected = connectedKeys.includes(app.key);
          const isToggling = togglingKey === app.key;

          return (
            <motion.div
              key={app.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col justify-between rounded-3xl bg-slate-900/60 p-6 border border-slate-805/85 backdrop-blur-md transition-all hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`rounded-2xl p-3 border ${
                    isConnected ? "bg-indigo-950/50 text-indigo-400 border-indigo-900/25" : "bg-slate-950/50 text-slate-550 border-slate-850"
                  }`}>
                    {app.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isConnected && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 text-[10px] font-bold text-emerald-450 uppercase tracking-wider">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        Connected
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-200">
                  {app.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {app.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  disabled={isToggling}
                  onClick={() => handleToggle(app.name)}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
                    isConnected
                      ? "bg-[#131b2e]/60 border border-slate-800 text-slate-450 hover:bg-slate-800 hover:text-white"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20"
                  }`}
                >
                  {isToggling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      Syncing...
                    </>
                  ) : isConnected ? (
                    "Disconnect App"
                  ) : (
                    "Connect App"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
