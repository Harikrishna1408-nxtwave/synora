import { Sparkles } from "lucide-react";

interface AIBriefProps {
  connections: { provider: string }[];
}

export default function AIBrief({ connections }: AIBriefProps) {
  const connectedKeys = connections.map((c) => c.provider.toLowerCase());
  const githubConnected = connectedKeys.includes("github");
  const gmailConnected = connectedKeys.includes("gmail");
  const calendarConnected = connectedKeys.includes("google-calendar");
  const notionConnected = connectedKeys.includes("notion");

  return (
    <div className="rounded-3xl bg-slate-900/60 p-8 border border-slate-805/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />

        <h2 className="text-xl font-bold text-slate-200">
          AI Daily Briefing
        </h2>
      </div>

      <div className="mt-6 rounded-2xl bg-[#0f172a]/30 border border-indigo-950/40 p-6">
        <p className="text-sm font-bold leading-relaxed text-indigo-300">
          👋 Welcome back! Here is your custom Digital Twin overview:
        </p>

        <ul className="mt-5 space-y-3.5 text-xs text-slate-400">
          {/* Calendar Insights */}
          <li className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <span>
              {calendarConnected ? (
                <>You have <strong className="text-white font-extrabold">3 meetings</strong> scheduled for today.</>
              ) : (
                <span className="text-slate-500">Calendar integration not connected. Link Google Calendar to sync meetings.</span>
              )}
            </span>
          </li>

          {/* Email Insights */}
          <li className="flex items-center gap-2">
            <span className="text-base">📧</span>
            <span>
              {gmailConnected ? (
                <>You have <strong className="text-white font-extrabold">12 unread emails</strong> that require response drafts.</>
              ) : (
                <span className="text-slate-500">Gmail integration not connected. Link email to generate reply drafts.</span>
              )}
            </span>
          </li>

          {/* Code Insights */}
          <li className="flex items-center gap-2">
            <span className="text-base">💻</span>
            <span>
              {githubConnected ? (
                <>Yesterday you pushed <strong className="text-white font-extrabold">5 commits</strong> to your repositories.</>
              ) : (
                <span className="text-slate-500">GitHub integration not connected. Link repositories to sync development metrics.</span>
              )}
            </span>
          </li>

          {/* Notion Task Insights */}
          <li className="flex items-center gap-2">
            <span className="text-base">📝</span>
            <span>
              {notionConnected ? (
                <>You completed <strong className="text-white font-extrabold">8 tasks</strong> and resolved 2 backlog tickets in Notion this week.</>
              ) : (
                <span className="text-slate-500">Notion integration not connected. Link workspace to sync tasks.</span>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}