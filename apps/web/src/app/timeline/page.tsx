import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TimelineClient from "@/components/dashboard/TimelineClient";

export default async function TimelinePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch connections directly on the server to prevent waterfalls
  const connections = await prisma.connectedAccount.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-8 px-4 md:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            Memory Timeline
          </h1>

          <p className="mt-1.5 text-sm text-slate-400">
            A chronological feed of your cross-platform digital footprint captured by your digital twin.
          </p>
        </div>

        <TimelineClient connections={connections} />
      </div>
    </main>
  );
}
