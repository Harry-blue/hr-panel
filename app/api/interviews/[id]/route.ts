import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Get the ID from the URL
) {
  try {
    const { id } = params;
    const interview = await prisma.interview.findUnique({
      where: { id: parseInt(id) },  // Use the ID from the URL
    });

    if (!interview) {
      return new NextResponse(JSON.stringify({ error: "interview not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(interview), { status: 200 });
  } catch (error) {
    console.error("Error fetching interview:", error);  // Log the error
    return new NextResponse(JSON.stringify({ error: "Error fetching interview" }), { status: 500 });
  }
}

