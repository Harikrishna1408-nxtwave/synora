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
    <section className="bg-[#070a13] py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300">
            Why Synora
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Work Smarter, Not Harder
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400">
            Stop jumping between apps. Let Synora become your intelligent
            workspace that remembers everything and helps you stay focused.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Traditional */}
          <div className="rounded-3xl border border-red-900/30 bg-red-950/10 p-10">
            <h3 className="text-2xl font-bold text-red-400">
              Traditional Workflow
            </h3>

            <div className="mt-8 space-y-5">
              {oldWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 text-red-500" />
                  <p className="text-slate-350 text-xs font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Synora */}
          <div className="rounded-3xl border border-indigo-900/30 bg-indigo-950/20 p-10">
            <h3 className="text-2xl font-bold text-indigo-400">
              Synora Experience
            </h3>

            <div className="mt-8 space-y-5">
              {synoraWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                  <p className="text-slate-200 text-xs font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}