import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb20,transparent_40%),radial-gradient(circle_at_bottom_left,#7c3aed20,transparent_40%)]" />

      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </main>
  );
}