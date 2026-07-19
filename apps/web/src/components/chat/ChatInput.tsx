import { Send } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Ask Synora anything..."
          className="flex-1 rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-indigo-500"
        />

        <button className="rounded-2xl bg-indigo-600 px-6 text-white transition hover:bg-indigo-700">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}