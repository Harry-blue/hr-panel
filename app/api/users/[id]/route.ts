import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }  // Get the ID from the URL
) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },  // Use the ID from the URL
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);  // Log the error
    return new NextResponse(JSON.stringify({ error: "Error fetching user" }), { status: 500 });
  }
}

