import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ConnectPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Connected Apps
        </h1>

        <p className="mt-2 text-slate-600">
          Connect GitHub, Gmail, Google Calendar, Notion, Slack and more.
        </p>
      </div>
    </main>
  );
}