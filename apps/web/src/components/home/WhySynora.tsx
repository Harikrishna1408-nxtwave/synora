import { CheckCircle2, XCircle } from "lucide-react";

const oldWay = [
  "Switch between multiple apps",
  "Search through endless emails",
  "Forget meetings and deadlines",
  "Manually create daily plans",
  "No personalized AI memory",
];

const synoraWay = [
  "Everything connected in one place",
  "Instant contextual answers",
  "AI remembers your work automatically",
  "Daily AI-generated briefings",
  "Personal Digital Twin that grows with you",
];

export default function WhySynora() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Why Synora
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Work Smarter, Not Harder
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Stop jumping between apps. Let Synora become your intelligent
            workspace that remembers everything and helps you stay focused.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Traditional */}
          <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">
            <h3 className="text-3xl font-bold text-red-600">
              Traditional Workflow
            </h3>

            <div className="mt-8 space-y-5">
              {oldWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle className="mt-1 h-6 w-6 text-red-500" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Synora */}
          <div className="rounded-3xl bg-indigo-600 p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold">
              Synora Experience
            </h3>

            <div className="mt-8 space-y-5">
              {synoraWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 text-green-300" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}