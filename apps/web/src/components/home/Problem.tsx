import { Brain, CalendarDays, FolderKanban } from "lucide-react";

const problems = [
  {
    icon: <Brain className="h-10 w-10 text-indigo-600" />,
    title: "Information is Scattered",
    description:
      "Emails, meetings, code, tasks and documents are spread across different applications.",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-indigo-600" />,
    title: "Decision Fatigue",
    description:
      "People waste valuable time deciding what to work on instead of doing meaningful work.",
  },
  {
    icon: <FolderKanban className="h-10 w-10 text-indigo-600" />,
    title: "No Personal Memory",
    description:
      "Today's AI answers questions but doesn't truly understand your work history and goals.",
  },
];

export default function Problem() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            The Problem
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Work is Fragmented
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Your work is spread across Gmail, Calendar, GitHub, Notion,
            Slack and Drive. Synora connects everything into one intelligent
            assistant.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-gray-200 p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {problem.icon}

              <h3 className="mt-6 text-2xl font-semibold">
                {problem.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}