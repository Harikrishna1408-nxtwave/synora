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
    icon: <BrainCircuit className="h-10 w-10 text-indigo-400" />,
    title: "AI Digital Twin",
    description:
      "Builds a personalized memory of your work, preferences, goals, and daily habits.",
  },
  {
    icon: <CalendarCheck2 className="h-10 w-10 text-indigo-400" />,
    title: "Daily Briefings",
    description:
      "Wake up to AI-generated summaries of meetings, emails, tasks, and priorities.",
  },
  {
    icon: <GitBranch className="h-10 w-10 text-indigo-400" />,
    title: "Unified Workspace",
    description:
      "Connect GitHub, Gmail, Calendar, Notion, Slack, and more into one intelligent hub.",
  },
  {
    icon: <MessageSquareText className="h-10 w-10 text-indigo-400" />,
    title: "Natural AI Chat",
    description:
      "Ask questions in plain English and get answers based on your own work context.",
  },
  {
    icon: <BellRing className="h-10 w-10 text-indigo-400" />,
    title: "Smart Reminders",
    description:
      "Receive proactive reminders and recommendations before important events happen.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-indigo-400" />,
    title: "Actionable Insights",
    description:
      "Turn scattered information into meaningful actions that help you work smarter.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#070a13] py-24 relative overflow-hidden">
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[300px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300">
            Features
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Everything You Need in One AI Assistant
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400">
            Synora understands your work, connects your favorite tools,
            and helps you make faster, smarter decisions every day.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition duration-350 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-900/60"
            >
              {feature.icon}

              <h3 className="mt-6 text-xl font-bold text-slate-200">
                {feature.title}
              </h3>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}