import { Brain, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-indigo-100 p-3">
          <Brain className="h-8 w-8 text-indigo-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Synora AI
          </h1>

          <p className="text-gray-500">
            Your Digital Twin for Everyday Decisions
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
        <Sparkles className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-green-700">
          AI Online
        </span>
      </div>
    </header>
  );
}