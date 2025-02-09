import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Get the ID from the URL
) {
  try {
    const { id } = params;
    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(id) },  // Use the ID from the URL
    });

    if (!notification) {
      return new NextResponse(JSON.stringify({ error: "notification not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(notification), { status: 200 });
  } catch (error) {
    console.error("Error fetching notification:", error);  // Log the error
    return new NextResponse(JSON.stringify({ error: "Error fetching notification" }), { status: 500 });
  }
}

