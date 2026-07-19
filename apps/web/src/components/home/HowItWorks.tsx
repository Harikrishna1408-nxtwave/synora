import { Link2, BrainCircuit, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Link2 className="h-10 w-10 text-indigo-400" />,
    title: "Connect Your Apps",
    description:
      "Securely connect Gmail, Google Calendar, GitHub, Notion, Slack, and other productivity tools.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-indigo-400" />,
    title: "AI Learns Your Context",
    description:
      "Synora builds a personalized memory by understanding your work, meetings, projects, and goals.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-indigo-400" />,
    title: "Receive Smart Insights",
    description:
      "Get daily summaries, proactive reminders, and contextual answers that help you work smarter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#070a13] py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[250px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300">
            How It Works
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Three Simple Steps
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400">
            Synora connects your digital life, understands your context,
            and becomes your intelligent AI companion.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-center transition duration-350 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-900/60"
            >
              <div className="absolute -top-5 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-600 border border-indigo-400 text-white font-extrabold text-xs shadow-md">
                {index + 1}
              </div>

              <div className="mt-6 flex justify-center">
                {step.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-200">
                {step.title}
              </h3>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}