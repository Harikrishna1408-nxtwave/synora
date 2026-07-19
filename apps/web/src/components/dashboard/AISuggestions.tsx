import { Brain, ArrowRight } from "lucide-react";

const suggestions = [
  {
    title: "Reply to 3 important emails",
    description: "Based on your inbox priority.",
  },
  {
    title: "Prepare for Project Review",
    description: "Meeting starts at 10:00 AM.",
  },
  {
    title: "Review GitHub Pull Requests",
    description: "4 PRs are waiting for review.",
  },
  {
    title: "Continue working on Synora",
    description: "You were active on this project yesterday.",
  },
];

export default function AISuggestions() {
  return (
    <div className="rounded-3xl bg-slate-900/60 p-8 border border-slate-805/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-indigo-400" />

        <h2 className="text-xl font-bold text-slate-200">
          AI Suggestions
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {suggestions.map((item) => (
          <button
            key={item.title}
            className="flex w-full items-start justify-between rounded-2xl border border-slate-800 bg-[#0f172a]/30 p-5 text-left transition-all duration-200 hover:border-indigo-500/60 hover:bg-slate-800/40"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-350 leading-tight">
                {item.title}
              </h3>

              <p className="mt-1.5 text-xs text-slate-500">
                {item.description}
              </p>
            </div>

            <ArrowRight className="h-4 w-4 text-indigo-400 self-center" />
          </button>
        ))}
      </div>
    </div>
  );
}