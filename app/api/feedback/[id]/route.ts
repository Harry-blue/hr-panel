import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Get the ID from the URL
) {
  try {
    const { id } = params;
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },  // Use the ID from the URL
    });

    if (!feedback) {
      return new NextResponse(JSON.stringify({ error: "Feedback not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);  // Log the error
    return new NextResponse(JSON.stringify({ error: "Error fetching feedback" }), { status: 500 });
  }
}

