"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, ArrowRight, TrendingUp, CheckSquare, Zap, BarChart2, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface InsightsClientProps {
  connections: { provider: string }[];
}

export default function InsightsClient({ connections }: InsightsClientProps) {
  const connectedKeys = connections.map((c) => c.provider.toLowerCase());
  const githubConnected = connectedKeys.includes("github");
  const gmailConnected = connectedKeys.includes("gmail");
  const calendarConnected = connectedKeys.includes("google-calendar");
  const notionConnected = connectedKeys.includes("notion");

  return (
    <div className="space-y-6">
      
      {/* "If I Were You Today" Priority Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/30 to-indigo-950/60 border border-indigo-900/30 p-8 text-white backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-indigo-400" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-350">
            If I Were You Today
          </h2>
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-white leading-tight">
          Today&apos;s Core Focus: Resolving Client Queries & Preparing Synora Demo Run
        </h3>

        <div className="mt-6 space-y-4">
          <p className="text-xs text-indigo-200/80 leading-relaxed">
            Based on aggregate data from Gmail and GitHub, your most critical priority is replying to **StartupBox&apos;s email inquiry** regarding Supabase connectivity. Second, you have code metrics indicating pending pull requests that need code review on the main repository.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 pt-6 border-t border-indigo-900/40">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Suggested Action 1</span>
              <p className="text-xs font-bold text-white">Draft reply to StartupBox Lead</p>
              <p className="text-[10px] text-slate-400">Addresses P1001 database questions.</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Suggested Action 2</span>
              <p className="text-xs font-bold text-white">Review 4 GitHub PRs</p>
              <p className="text-[10px] text-slate-400">Pending team dev mergers.</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Suggested Action 3</span>
              <p className="text-xs font-bold text-white">Prepare standup slides</p>
              <p className="text-[10px] text-slate-400">For review meeting at 10 AM.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of Productivity metrics and Action recommendations */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Productivity score taking 1 col */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-slate-900/60 p-6 border border-slate-805/85 backdrop-blur-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2.5">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Productivity Score</h3>
            </div>

            <div className="my-8 flex justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-slate-800 bg-slate-950/20 shadow-inner">
                <svg className="absolute inset-0 h-full w-full -rotate-90 p-1">
                  <circle
                    className="text-slate-850"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-indigo-500"
                    strokeWidth="8"
                    strokeDasharray={339.29}
                    strokeDashoffset={339.29 - (339.29 * 85) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-white">85%</span>
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Focus Index</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>Weekly Goals Completed</span>
              <span className="font-bold text-slate-200">12 / 15</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Code Focus Hours</span>
              <span className="font-bold text-slate-200">18.4 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Task Efficiency Rate</span>
              <span className="font-bold text-emerald-400">+4.2%</span>
            </div>
          </div>
        </motion.div>

        {/* Actionable recommendations taking 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 rounded-3xl bg-slate-900/60 p-6 border border-slate-805/85 backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80">
            <Zap className="h-5 w-5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">AI Priority Actions</h3>
          </div>

          <div className="mt-6 space-y-3">
            
            {/* Action 1 */}
            <Link
              href="/chat?prompt=Draft%20a%20reply%20email%20to%20StartupBox"
              className="flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-950/20 p-4.5 text-left transition hover:border-indigo-500/50 hover:bg-slate-800/20 group"
            >
              <div className="flex gap-3">
                <div className="rounded-xl bg-pink-950/30 border border-pink-900/20 p-2 text-pink-400 h-9 w-9 flex items-center justify-center self-start shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-250 group-hover:text-white transition">Draft StartupBox Reply</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Prepare a response discussing Supabase port redirect and schema generation successes.</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-650 group-hover:text-indigo-400 transition self-center ml-2" />
            </Link>

            {/* Action 2 */}
            <Link
              href="/chat?prompt=Show%20today's%20meetings"
              className="flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-950/20 p-4.5 text-left transition hover:border-indigo-500/50 hover:bg-slate-800/20 group"
            >
              <div className="flex gap-3">
                <div className="rounded-xl bg-emerald-950/30 border border-emerald-900/20 p-2 text-emerald-400 h-9 w-9 flex items-center justify-center self-start shrink-0">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-250 group-hover:text-white transition">Review Project Sync Agenda</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Review credentials and deployment constraints list before standup meeting starts.</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-650 group-hover:text-indigo-400 transition self-center ml-2" />
            </Link>

            {/* Action 3 */}
            <Link
              href="/chat?prompt=Show%20yesterday's%20Git%20commits"
              className="flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-950/20 p-4.5 text-left transition hover:border-indigo-500/50 hover:bg-slate-800/20 group"
            >
              <div className="flex gap-3">
                <div className="rounded-xl bg-indigo-950/30 border border-indigo-900/20 p-2 text-indigo-400 h-9 w-9 flex items-center justify-center self-start shrink-0">
                  <GitBranch className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-250 group-hover:text-white transition">Summarize Pending Code Diff</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Synthesize git commits to draft a sprint changelog review notes.</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-650 group-hover:text-indigo-400 transition self-center ml-2" />
            </Link>

          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Inline Mail icon or other duplicate elements if needed, or import
const GitBranch = ({ className }: { className?: string }) => <TrendingUp className={className} />;
const Calendar = ({ className }: { className?: string }) => <CheckSquare className={className} />;
const Mail = ({ className }: { className?: string }) => <ShieldAlert className={className} />;
