import Link from "next/link";
import {
  Sparkles,
  CalendarDays,
  MessageSquare,
  Link2,
} from "lucide-react";

const actions = [
  {
    title: "Generate Daily Brief",
    icon: <Sparkles className="h-4 w-4" />,
    href: "/chat?prompt=Generate%20today's%20brief",
  },
  {
    title: "Open Calendar",
    icon: <CalendarDays className="h-4 w-4" />,
    href: "/chat?prompt=Show%20today's%20meetings",
  },
  {
    title: "Ask Synora AI",
    icon: <MessageSquare className="h-4 w-4" />,
    href: "/chat",
  },
  {
    title: "Connect Apps",
    icon: <Link2 className="h-4 w-4" />,
    href: "/connect",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-slate-900/60 p-8 border border-slate-805/85 backdrop-blur-md">
      <h2 className="text-xl font-bold text-slate-200">
        Quick Actions
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#0f172a]/30 p-4 text-left transition-all duration-200 hover:border-indigo-500/60 hover:bg-slate-800/40"
          >
            <div className="rounded-xl bg-indigo-950/60 border border-indigo-900/25 p-2.5 text-indigo-400">
              {action.icon}
            </div>

            <span className="text-xs font-bold text-slate-350">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}