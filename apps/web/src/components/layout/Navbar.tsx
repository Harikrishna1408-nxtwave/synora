import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070a13]/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition hover:opacity-90">
          Synora
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6 text-slate-450 font-bold text-xs tracking-wider uppercase">
          <Link href="/" className="hover:text-white transition-all">Home</Link>
          <Link href="/dashboard" className="hover:text-white transition-all">Dashboard</Link>
          <Link href="/connect" className="hover:text-white transition-all">Connect</Link>
          <Link href="/chat" className="hover:text-white transition-all">AI Chat</Link>
          <Link href="/timeline" className="hover:text-white transition-all">Timeline</Link>
          <Link href="/insights" className="hover:text-white transition-all">Insights</Link>
          <Link href="/settings" className="hover:text-white transition-all">Settings</Link>
        </div>

        {/* CTA */}
        <Link href="/login" className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;