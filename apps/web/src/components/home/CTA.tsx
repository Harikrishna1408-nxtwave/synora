import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
          Get Started Today
        </span>

        <h2 className="mt-8 text-5xl font-bold text-white">
          Meet Your AI Digital Twin
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
          Connect your favorite apps, organize your digital life, and let
          Synora help you make smarter decisions every single day.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 transition hover:scale-105">
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}