import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIBrief from "@/components/dashboard/AIBrief";
import ConnectedApps from "@/components/dashboard/ConnectedApps";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AISuggestions from "@/components/dashboard/AISuggestions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-8 p-8">
        <DashboardHeader user={session.user} />

        <AIBrief />
        <ConnectedApps />
        <RecentActivity />
        <QuickActions />
        <AISuggestions />
      </div>
    </main>
  );
}