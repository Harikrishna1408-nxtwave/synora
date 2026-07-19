import { ReactNode } from "react";

interface LoginCardProps {
  children: ReactNode;
}

export default function LoginCard({
  children,
}: LoginCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
      {children}
    </div>
  );
}