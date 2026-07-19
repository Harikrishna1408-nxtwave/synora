import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold text-indigo-400">
            Synora
          </h2>

          <p className="mt-3 max-w-sm text-slate-400">
            Your AI Digital Twin for Everyday Decisions.
          </p>
        </div>

        <div className="flex gap-8 text-slate-300">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/connect">Connect Apps</Link>
          <Link href="/chat">AI Chat</Link>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        © 2026 Synora. Built with ❤️ using Next.js & AI.
      </div>
    </footer>
  );
}