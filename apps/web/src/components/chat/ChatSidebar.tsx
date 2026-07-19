import {
  Clock3,
  MessageSquare,
  Plus,
} from "lucide-react";

const chats = [
  "Morning Brief",
  "Project Planning",
  "Email Summary",
  "GitHub Review",
];

export default function ChatSidebar() {
  return (
    <aside className="rounded-3xl bg-white p-6 shadow-sm">
      <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">
        <Plus className="h-5 w-5" />
        New Chat
      </button>

      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Recent Chats
      </h2>

      <div className="space-y-3">
        {chats.map((chat) => (
          <button
            key={chat}
            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-100"
          >
            <MessageSquare className="h-5 w-5 text-indigo-600" />

            <div className="flex-1">
              <p className="font-medium text-slate-900">
                {chat}
              </p>

              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <Clock3 className="h-3 w-3" />
                Today
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}