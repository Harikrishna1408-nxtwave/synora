import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        error: "An account with this email already exists.",
      }, { status: 400 });
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(name)}`,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
  }
}
