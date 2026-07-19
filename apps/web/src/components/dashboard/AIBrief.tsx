import { Sparkles } from "lucide-react";

export default function AIBrief() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <Sparkles className="h-7 w-7 text-indigo-600" />

        <h2 className="text-2xl font-bold text-slate-900">
          AI Daily Brief
        </h2>
      </div>

      <div className="mt-6 rounded-2xl bg-indigo-50 p-6">
        <p className="leading-8 text-gray-700">
          👋 Good morning! Here's your personalized summary.
        </p>

        <ul className="mt-6 space-y-4 text-gray-700">
          <li>📅 You have <strong>3 meetings</strong> scheduled today.</li>

          <li>📧 <strong>12 unread emails</strong> need your attention.</li>

          <li>💻 Yesterday you pushed <strong>5 GitHub commits</strong>.</li>

          <li>📝 You completed <strong>8 tasks</strong> this week.</li>

          <li>🚀 Your Synora assignment is on track.</li>
        </ul>
      </div>
    </div>
  );
}