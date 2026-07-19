import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "@/components/dashboard/SettingsClient";

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-8 px-4 md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            Settings
          </h1>

          <p className="mt-1.5 text-sm text-slate-400">
            Customize your account credentials and personal AI Twin behavior directives.
          </p>
        </div>

        <SettingsClient user={session.user} />
      </div>
    </main>
  );
}