import { Sparkles } from "lucide-react";
import Image from "next/image";

type DashboardHeaderProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/30 to-indigo-950/60 border border-indigo-900/30 p-8 text-white backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-indigo-400 animate-pulse" />

          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Good Morning{user?.name ? `, ${user.name}` : ""} 👋
            </h1>

            <p className="mt-2 text-indigo-200/70 text-sm">
              Your AI Digital Twin is ready to help you today.
            </p>

            {user?.email && (
              <p className="mt-1 text-xs text-indigo-300/40">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Right Side */}
        {user?.image && (
          <div className="overflow-hidden rounded-full border-4 border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Image
              src={user.image}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}