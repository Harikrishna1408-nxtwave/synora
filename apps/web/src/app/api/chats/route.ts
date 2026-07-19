import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const title = body.title || "New Chat";

    const chat = await prisma.chat.create({
      data: {
        title,
        userId: session.user.id,
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    console.error("Failed to create chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
