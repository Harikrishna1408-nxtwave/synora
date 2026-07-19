import {
  BrainCircuit,
  CalendarCheck2,
  GitBranch,
  MessageSquareText,
  BellRing,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-indigo-600" />,
    title: "AI Digital Twin",
    description:
      "Builds a personalized memory of your work, preferences, goals, and daily habits.",
  },
  {
    icon: <CalendarCheck2 className="h-10 w-10 text-indigo-600" />,
    title: "Daily Briefings",
    description:
      "Wake up to AI-generated summaries of meetings, emails, tasks, and priorities.",
  },
  {
    icon: <GitBranch className="h-10 w-10 text-indigo-600" />,
    title: "Unified Workspace",
    description:
      "Connect GitHub, Gmail, Calendar, Notion, Slack, and more into one intelligent hub.",
  },
  {
    icon: <MessageSquareText className="h-10 w-10 text-indigo-600" />,
    title: "Natural AI Chat",
    description:
      "Ask questions in plain English and get answers based on your own work context.",
  },
  {
    icon: <BellRing className="h-10 w-10 text-indigo-600" />,
    title: "Smart Reminders",
    description:
      "Receive proactive reminders and recommendations before important events happen.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-indigo-600" />,
    title: "Actionable Insights",
    description:
      "Turn scattered information into meaningful actions that help you work smarter.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Everything You Need in One AI Assistant
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Synora understands your work, connects your favorite tools,
            and helps you make faster, smarter decisions every day.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {feature.icon}

              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}