import { Brain, CalendarDays, FolderKanban } from "lucide-react";

const problems = [
  {
    icon: <Brain className="h-10 w-10 text-indigo-400" />,
    title: "Information is Scattered",
    description:
      "Emails, meetings, code, tasks and documents are spread across different applications.",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-indigo-400" />,
    title: "Decision Fatigue",
    description:
      "People waste valuable time deciding what to work on instead of doing meaningful work.",
  },
  {
    icon: <FolderKanban className="h-10 w-10 text-indigo-400" />,
    title: "No Personal Memory",
    description:
      "Today's AI answers questions but doesn't truly understand your work history and goals.",
  },
];

export default function Problem() {
  return (
    <section className="bg-[#070a13] py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -z-10 h-[250px] w-[400px] rounded-full bg-indigo-500/5 blur-[90px]" />
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300">
            The Problem
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Work is Fragmented
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400">
            Your work is spread across Gmail, Calendar, GitHub, Notion,
            Slack and Drive. Synora connects everything into one intelligent
            assistant.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition duration-350 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-900/60"
            >
              {problem.icon}

              <h3 className="mt-6 text-xl font-bold text-slate-200">
                {problem.title}
              </h3>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}