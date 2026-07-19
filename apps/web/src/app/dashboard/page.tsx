import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  // Fetch connections directly on the server to prevent browser fetch waterfalls
  const connections = await prisma.connectedAccount.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-8 px-4 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <DashboardHeader user={session.user} />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Brief & Actions taking 2 cols */}
          <div className="space-y-6 md:col-span-2">
            <AIBrief connections={connections} />
            <RecentActivity />
            <AISuggestions />
          </div>

          {/* Apps and Sidebar taking 1 col */}
          <div className="space-y-6 md:col-span-1">
            <ConnectedApps connections={connections} />
            <QuickActions />
          </div>
        </div>
      </div>
    </main>
  );
}