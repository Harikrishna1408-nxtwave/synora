"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Mail, Calendar, NotebookPen, Filter, ChevronDown, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TimelineClientProps {
  connections: { provider: string }[];
}

interface TimelineEvent {
  id: string;
  provider: "github" | "gmail" | "google-calendar" | "notion";
  title: string;
  description: string;
  time: string;
  details: string;
  actionText?: string;
  actionHref?: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "evt-1",
    provider: "github",
    title: "Pushed 5 commits to synora:main",
    description: "Added type-safe JWT session callbacks and fixed percent-escaped db credentials.",
    time: "2 hours ago",
    details: "Commits included:\n• fix(auth): Cast Prisma Client parameters safely inside PrismaAdapter wrapper.\n• feat(styles): Styled settings forms, navbar, and hero pages for unified dark theme.\n• refactor(env): Rerouted port 6543 database connection direct to session port 5432.",
    actionText: "View commit logs",
    actionHref: "/chat?prompt=Show%20yesterday's%20Git%20commits",
  },
  {
    id: "evt-2",
    provider: "google-calendar",
    title: "Project Review Meeting",
    description: "Synced with development lead on schema migration constraints.",
    time: "Today • 10:00 AM",
    details: "Participants: Harikrishna, Arun\nAgenda:\n1. Discuss Supabase session port connection issues.\n2. Review NextAuth PKCE state verification constraints on localhost.\n3. Validate dashboard integrations timeline.",
    actionText: "Generate pre-meeting briefing",
    actionHref: "/chat?prompt=Show%20today's%20meetings",
  },
  {
    id: "evt-3",
    provider: "gmail",
    title: "Received: StartupBox Assessment Inquiry",
    description: "Email from StartupBox team requesting submission validation details.",
    time: "Yesterday • 4:15 PM",
    details: "From: team@startupbox.co\nSubject: Validation of assessment components\n\nHi Arun,\nWe noticed the prisma client was throwing P1001 connection errors yesterday. Could you please confirm if the Supabase instance is fully synchronized now?",
    actionText: "Draft reply email",
    actionHref: "/chat?prompt=Draft%20a%20reply%20email%20to%20StartupBox",
  },
  {
    id: "evt-4",
    provider: "notion",
    title: "Notion: Resolved database connection tickets",
    description: "Updated tasks backlog status to complete for Supabase pooler mapping.",
    time: "Yesterday • 2:30 PM",
    details: "Workspace: Synora Sprint Board\nPage: Supabase port pooling issues\nStatus: Complete\nOwner: Arun\nNotes: Verified that redirecting connection port to 5432 resolves pooling blocks.",
    actionText: "Summarize Notion changes",
    actionHref: "/chat?prompt=Summarize%2520my%2520recent%2520Notion%2520tasks",
  },
  {
    id: "evt-5",
    provider: "google-calendar",
    title: "Daily Standup Meeting",
    description: "Daily synchronization with product stakeholders.",
    time: "Yesterday • 9:30 AM",
    details: "Participants: Arun, PM Lead\nNotes:\n- Synced layout design requirements.\n- Aligned settings and persona behaviors.",
  }
];

export default function TimelineClient({ connections }: TimelineClientProps) {
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const connectedKeys = connections.map((c) => c.provider.toLowerCase());

  // Filter events based on active connections and selection
  const filteredEvents = mockEvents.filter((evt) => {
    // Check if the provider is connected (or fallback to showing all in demo mode)
    const isProviderConnected = connectedKeys.includes(evt.provider);
    if (!isProviderConnected && connectedKeys.length > 0) {
      // In strict mode, only show connected events. But if they have no connections, show all for demo value
      return false;
    }
    
    if (filter === "all") return true;
    return evt.provider === filter;
  });

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "github":
        return <GitCommit className="h-4 w-4" />;
      case "gmail":
        return <Mail className="h-4 w-4" />;
      case "google-calendar":
        return <Calendar className="h-4 w-4" />;
      case "notion":
        return <NotebookPen className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "github":
        return "text-indigo-400 bg-indigo-950/40 border-indigo-900/30";
      case "gmail":
        return "text-pink-400 bg-pink-950/40 border-pink-900/30";
      case "google-calendar":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-900/30";
      case "notion":
        return "text-amber-400 bg-amber-950/40 border-amber-900/30";
      default:
        return "text-slate-400 bg-slate-900 border-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5" />
          Filter Timeline:
        </div>

        {["all", "github", "gmail", "google-calendar", "notion"].map((f) => {
          const isSelected = filter === f;
          return (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setExpandedId(null);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold capitalize border transition-all cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-950/40"
                  : "bg-slate-950/30 border-slate-850 text-slate-400 hover:border-indigo-500/60 hover:text-white"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          );
        })}
      </div>

      {/* Timeline Loop */}
      <div className="relative border-l border-slate-800/80 ml-6 pl-8 space-y-8 py-4">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((evt, idx) => {
            const isExpanded = expandedId === evt.id;
            const iconColorClass = getProviderColor(evt.provider);

            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="relative"
              >
                {/* Timeline node dot */}
                <div className={`absolute -left-[49px] top-1.5 flex h-8 w-8 items-center justify-center rounded-xl border shadow-inner ${iconColorClass}`}>
                  {getProviderIcon(evt.provider)}
                </div>

                <div 
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                  className={`group rounded-3xl bg-slate-900/40 p-6 border transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? "border-indigo-500/50 bg-[#131b2e]/45" 
                      : "border-slate-805/85 hover:border-indigo-500/30 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {evt.provider.replace("-", " ")}
                    </span>

                    <span className="text-[10px] font-medium text-slate-500">
                      {evt.time}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-200 group-hover:text-white transition">
                    {evt.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {evt.description}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6 pt-5 border-t border-slate-800/80 overflow-hidden space-y-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing card when clicking actions
                      >
                        <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-4 text-xs text-slate-300 font-medium whitespace-pre-line leading-relaxed">
                          {evt.details}
                        </div>

                        {evt.actionText && (
                          <div className="flex justify-end pt-1">
                            <Link
                              href={evt.actionHref || "/chat"}
                              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-indigo-500/5 hover:shadow-indigo-500/15"
                            >
                              {evt.actionText}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-indigo-400 group-hover:text-indigo-300 transition uppercase tracking-wide">
                      Expand Details
                      <ChevronDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-center max-w-lg mx-auto">
            <Clock className="h-10 w-10 text-slate-650 mx-auto animate-pulse mb-3" />
            <h3 className="text-sm font-bold text-slate-350">No timeline events found</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Connect your GitHub, Notion, Gmail, or Google Calendar accounts under Connect Apps to see your digital activities populating in real-time.
            </p>
            <div className="mt-5">
              <Link
                href="/connect"
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white transition-all"
              >
                Go to Connect Apps
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
