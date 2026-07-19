import { Bot, User } from "lucide-react";

const messages = [
  {
    sender: "assistant",
    text: "👋 Hi! I'm Synora, your AI Digital Twin. How can I help you today?",
  },
  {
    sender: "user",
    text: "Summarize what I worked on yesterday.",
  },
  {
    sender: "assistant",
    text:
      "Yesterday you pushed 5 commits to Synora, updated the dashboard UI, completed the landing page, and reviewed your StartupBox assessment.",
  },
];

export default function ChatMessages() {
  return (
    <div className="flex h-[500px] flex-col gap-6 overflow-y-auto rounded-3xl bg-white p-8 shadow-sm">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-2xl gap-4 ${
              message.sender === "user"
                ? "flex-row-reverse"
                : ""
            }`}
          >
            <div className="rounded-full bg-indigo-100 p-3">
              {message.sender === "assistant" ? (
                <Bot className="h-6 w-6 text-indigo-600" />
              ) : (
                <User className="h-6 w-6 text-indigo-600" />
              )}
            </div>

            <div
              className={`rounded-2xl px-5 py-4 ${
                message.sender === "assistant"
                  ? "bg-slate-100"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}