// app/api/admin/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const body = await req.json();
    const { userId: recipientId, type, subject, message } = body;

    if (!recipientId || !type || !subject || !message) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!recipient) {
      return new NextResponse(
        JSON.stringify({ error: "Recipient not found" }),
        { status: 404 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        userId: recipientId,
        type: type as "EMAIL" | "SMS",
        message: `${subject}: ${message}`,
        isRead: false,
      },
    });

    return NextResponse.json({
      id: notification.id,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error sending notification" }),
      { status: 500 }
    );
  }
}