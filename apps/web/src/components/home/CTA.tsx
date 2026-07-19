import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-indigo-950/40 py-24 border-t border-slate-900">
      <div className="mx-auto max-w-5xl px-6 text-center space-y-6">
        <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-xs font-semibold text-indigo-300">
          Get Started Today
        </span>

        <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
          Meet Your AI Digital Twin
        </h2>

        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400">
          Connect your favorite apps, organize your digital life, and let
          Synora help you make smarter decisions every single day.
        </p>

        <div className="pt-4 flex justify-center">
          <Link href="/login" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-bold text-sm text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}