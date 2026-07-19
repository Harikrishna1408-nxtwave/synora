import { Sparkles } from "lucide-react";

const prompts = [
  "Summarize my day",
  "Show today's meetings",
  "Draft an email reply",
  "Review my GitHub activity",
  "Plan my next tasks",
  "Generate today's brief",
];

export default function SuggestedPrompts() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900">
          Suggested Prompts
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm transition hover:border-indigo-500 hover:bg-indigo-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}