import { Link2, BrainCircuit, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Link2 className="h-12 w-12 text-indigo-600" />,
    title: "Connect Your Apps",
    description:
      "Securely connect Gmail, Google Calendar, GitHub, Notion, Slack, and other productivity tools.",
  },
  {
    icon: <BrainCircuit className="h-12 w-12 text-indigo-600" />,
    title: "AI Learns Your Context",
    description:
      "Synora builds a personalized memory by understanding your work, meetings, projects, and goals.",
  },
  {
    icon: <Sparkles className="h-12 w-12 text-indigo-600" />,
    title: "Receive Smart Insights",
    description:
      "Get daily summaries, proactive reminders, and contextual answers that help you work smarter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            How It Works
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Three Simple Steps
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Synora connects your digital life, understands your context,
            and becomes your intelligent AI companion.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-gray-200 p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                {index + 1}
              </div>

              <div className="mt-6 flex justify-center">
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}