// app/api/admin/scheduling/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Extract user data from custom headers
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    // Validate user data
    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    // Fetch all upcoming interviews
    const interviews = await prisma.interview.findMany({
      where: {
        scheduledAt: { gte: new Date() }, // Only future interviews
        status: { in: ["SCHEDULED", "RESCHEDULED"] },
      },
      include: {
        candidate: {
          include: { user: { select: { name: true } } },
        },
        interviewer: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });

    const schedulingData = {
      interviews: interviews.map((interview) => ({
        id: interview.id,
        candidateName: interview.candidate.user.name,
        interviewerName: interview.interviewer.user.name,
        scheduledAt: interview.scheduledAt.toISOString(),
        status: interview.status,
      })),
    };

    return NextResponse.json(schedulingData);
  } catch (error) {
    console.error("Error in admin scheduling API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching scheduling data" }),
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
    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const parsedUserId = Number.parseInt(userId);
    const body = await req.json();
    const { interviewId, scheduledAt } = body;

    if (!interviewId || !scheduledAt) {
      return new NextResponse(
        JSON.stringify({ error: "Interview ID and scheduledAt are required" }),
        { status: 400 }
      );
    }

    // Update the interview
    const updatedInterview = await prisma.interview.update({
      where: { id: interviewId },
      data: {
        scheduledAt: new Date(scheduledAt),
        status: "RESCHEDULED",
        adminId: parsedUserId, // Track which admin made the change
      },
      include: {
        candidate: {
          include: { user: { select: { name: true } } },
        },
        interviewer: {
          include: { user: { select: { name: true } } },
        },
      },
    });

    return NextResponse.json({
      id: updatedInterview.id,
      candidateName: updatedInterview.candidate.user.name,
      interviewerName: updatedInterview.interviewer.user.name,
      scheduledAt: updatedInterview.scheduledAt.toISOString(),
      status: updatedInterview.status,
    });
  } catch (error) {
    console.error("Error in admin scheduling update API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating interview schedule" }),
      { status: 500 }
    );
  }
}