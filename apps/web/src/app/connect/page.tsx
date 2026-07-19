import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ConnectClient from "@/components/dashboard/ConnectClient";

export default async function ConnectPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-8 px-4 md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            Connected Apps
          </h1>

          <p className="mt-1.5 text-sm text-slate-400">
            Connect your primary ecosystem channels to authorize Synora AI as your personal Digital Twin.
          </p>
        </div>

        <ConnectClient />
      </div>
    </main>
  );
}