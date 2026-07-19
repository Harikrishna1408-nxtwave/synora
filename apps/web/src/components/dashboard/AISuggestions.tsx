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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <Brain className="h-7 w-7 text-indigo-600" />

        <h2 className="text-2xl font-bold text-slate-900">
          AI Suggestions
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {suggestions.map((item) => (
          <button
            key={item.title}
            className="flex w-full items-start justify-between rounded-2xl border border-gray-200 p-5 text-left transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50"
          >
            <div>
              <h3 className="font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {item.description}
              </p>
            </div>

            <ArrowRight className="h-5 w-5 text-indigo-500" />
          </button>
        ))}
      </div>
    </div>
  );
}