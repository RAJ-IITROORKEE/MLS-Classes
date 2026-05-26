import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

// POST - Create new contact message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Rate limiting: Check if user sent a message today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayMessageCount = await prisma.contactUs.count({
      where: {
        email,
        createdAt: {
          gte: today,
        },
      },
    });

    if (todayMessageCount >= 5) {
      return NextResponse.json(
        { error: "You have exceeded your daily message limit. Please try again tomorrow." },
        { status: 429 }
      );
    }

    // Create new contact message
    const threadId = randomUUID();
    const contact = await prisma.contactUs.create({
      data: {
        name,
        email,
        subject,
        message,
        threadId,
        conversationType: "NEW_INQUIRY",
        dailyMessageCount: todayMessageCount + 1,
        lastMessageDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

// GET - Fetch all contact messages (admin only)
export async function GET(req: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    const contacts = await prisma.contactUs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
