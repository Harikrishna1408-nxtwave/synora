import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/connect - Retrieve all active integrations for the user
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const integrations = await prisma.connectedAccount.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(integrations);
  } catch (error) {
    console.error("Failed to fetch connected accounts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/connect - Connect or disconnect an app
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { provider, action } = await request.json();

    if (!provider || !action) {
      return NextResponse.json({ error: "provider and action are required" }, { status: 400 });
    }

    if (action === "connect") {
      // Connect: Create a record if it doesn't already exist
      const existing = await prisma.connectedAccount.findFirst({
        where: {
          userId: session.user.id,
          provider: provider,
        },
      });

      if (existing) {
        return NextResponse.json(existing);
      }

      const connection = await prisma.connectedAccount.create({
        data: {
          provider,
          providerId: `mock-${provider.toLowerCase()}-${Date.now()}`,
          userId: session.user.id,
        },
      });

      return NextResponse.json(connection, { status: 201 });
    } else if (action === "disconnect") {
      // Disconnect: Delete matching records
      await prisma.connectedAccount.deleteMany({
        where: {
          userId: session.user.id,
          provider: provider,
        },
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Failed to toggle connection:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
