// app/api/candidate/schedule/route.ts
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

    // Fetch candidate data to get candidateId
    const candidate = await prisma.candidate.findUnique({
      where: { userId: parsedUserId },
      select: { id: true },
    });

    if (!candidate) {
      return new NextResponse(JSON.stringify({ error: "Candidate not found" }), {
        status: 404,
      });
    }

    // Fetch upcoming interviews for the candidate
    const interviews = await prisma.interview.findMany({
      where: {
        candidateId: candidate.id,
        scheduledAt: { gte: new Date() }, // Only future interviews
        status: { in: ["SCHEDULED", "RESCHEDULED"] }, // Only active interviews
      },
      include: {
        interviewer: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });

    // Prepare schedule data response
    const scheduleData = {
      interviews: interviews.map((interview) => ({
        id: interview.id,
        position: interview.interviewer.user.name
          ? `Interview with ${interview.interviewer.user.name}`
          : "N/A", // You might want to add a position field to Interview model
        scheduledAt: interview.scheduledAt.toISOString(),
        status: interview.status,
      })),
    };

    return NextResponse.json(scheduleData);
  } catch (error) {
    console.error("Error in candidate schedule API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching schedule data" }),
      { status: 500 }
    );
  }
}