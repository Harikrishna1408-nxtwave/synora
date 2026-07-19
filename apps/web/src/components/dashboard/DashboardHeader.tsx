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
    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8" />

          <div>
            <h1 className="text-4xl font-bold">
              Good Morning{user?.name ? `, ${user.name}` : ""} 👋
            </h1>

            <p className="mt-2 text-indigo-100">
              Your AI Digital Twin is ready to help you today.
            </p>

            {user?.email && (
              <p className="mt-1 text-sm text-indigo-200">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Right Side */}
        {user?.image && (
          <div className="overflow-hidden rounded-full border-4 border-white/30">
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