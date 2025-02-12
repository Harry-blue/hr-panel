import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

interface Params {
  id: string;
}

interface RouteParams {
  params: Params;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    // Validate that 'id' is a number
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return new NextResponse(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    const feedback = await prisma.feedback.findUnique({
      where: { id: parsedId },
    });

    if (!feedback) {
      return new NextResponse(JSON.stringify({ error: "Feedback not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(feedback), { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return new NextResponse(JSON.stringify({ error: "Error fetching feedback" }), { status: 500 });
  }
}
