import Link from "next/link";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a13] px-6 pt-16">
      {/* Decorative Radial Gradients for Premium Look */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="mx-auto max-w-5xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 px-4 py-2 text-xs font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Synora AI Digital Twin</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
          Your Digital Twin
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            for Everyday Decisions
          </span>
        </h1>

        <p className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-slate-400">
          Synora connects Gmail, Calendar, GitHub, Notion,
          Slack, Google Drive and more to understand your work,
          remember your commitments, and help you make better
          decisions every day.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <Link href="/login" className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-bold text-sm text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all">
            Get Started Free
          </Link>

          <a href="#features" className="rounded-xl border border-slate-800 bg-[#0f172a]/40 backdrop-blur px-8 py-4 font-bold text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;