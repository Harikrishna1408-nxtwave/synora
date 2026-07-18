import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Synora
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/connect">Connect Apps</Link>
          <Link href="/chat">AI Chat</Link>
        </div>

        {/* CTA */}
        <button className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;