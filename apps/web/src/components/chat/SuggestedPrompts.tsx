import { Sparkles } from "lucide-react";

const prompts = [
  "Summarize my day",
  "Show today's meetings",
  "Draft an email reply",
  "Review my GitHub activity",
  "Plan my next tasks",
  "Generate today's brief",
];

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-sm border border-slate-100/50">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
        <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          Suggested Prompts
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelectPrompt(prompt)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}