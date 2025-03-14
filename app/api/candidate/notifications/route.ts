// app/api/candidate/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Extract user data from custom headers
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    // Validate user data
    if (!userId || userRole !== "CANDIDATE") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const parsedUserId = Number.parseInt(userId);

    // Fetch notifications for the candidate
    const notifications = await prisma.notification.findMany({
      where: { userId: parsedUserId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        message: true,
        type: true,
        isRead: true,
        createdAt: true,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error in candidate notifications API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching notifications" }),
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Extract user data from custom headers
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    // Validate user data
    if (!userId || userRole !== "CANDIDATE") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const parsedUserId = Number.parseInt(userId);
    const body = await req.json();
    const { notificationId } = body;

    if (!notificationId) {
      return new NextResponse(
        JSON.stringify({ error: "Notification ID is required" }),
        { status: 400 }
      );
    }

    // Update notification to mark as read
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId, userId: parsedUserId },
      data: { isRead: true },
      select: {
        id: true,
        message: true,
        type: true,
        isRead: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedNotification);
  } catch (error) {
    console.error("Error in candidate notifications update API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating notification" }),
      { status: 500 }
    );
  }
}