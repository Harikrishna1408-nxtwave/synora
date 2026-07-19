import {
  Sparkles,
  CalendarDays,
  MessageSquare,
  Link2,
} from "lucide-react";

const actions = [
  {
    title: "Generate Daily Brief",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Open Calendar",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Ask Synora AI",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Connect Apps",
    icon: <Link2 className="h-5 w-5" />,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.title}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4 text-left transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50"
          >
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              {action.icon}
            </div>

            <span className="font-medium text-slate-900">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}