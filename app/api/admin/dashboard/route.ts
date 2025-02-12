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

    // Fetch dashboard data
    const [
      totalCandidates,
      totalInterviewers,
      upcomingInterviews,
      recentNotifications,
      interviewStats,
    ] = await Promise.all([
      prisma.candidate.count(),
      prisma.interviewer.count(),
      prisma.interview.findMany({
        where: {
          scheduledAt: { gte: new Date() },
          status: "SCHEDULED",
        },
        take: 5,
        orderBy: { scheduledAt: "asc" },
        include: {
          candidate: { include: { user: { select: { name: true } } } },
          interviewer: { include: { user: { select: { name: true } } } },
        },
      }),
      prisma.notification.findMany({
        where: { userId: Number.parseInt(userId) },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.interview.groupBy({
        by: ["status"],
        _count: {
          _all: true,
        },
      }),
    ]);

    // Calculate interview completion rate
    const totalInterviews = interviewStats.reduce(
      (sum, stat) => sum + stat._count._all,
      0
    );
    const completedInterviews =
      interviewStats.find((stat) => stat.status === "COMPLETED")?._count._all ||
      0;
    const interviewCompletionRate =
      totalInterviews > 0 ? (completedInterviews / totalInterviews) * 100 : 0;

    // Prepare the dashboard data
    const dashboardData = {
      summary: {
        totalCandidates,
        totalInterviewers,
        totalInterviews,
        interviewCompletionRate,
      },
      upcomingInterviews: upcomingInterviews.map((interview) => ({
        id: interview.id,
        candidateName: interview.candidate.user.name,
        interviewerName: interview.interviewer.user.name,
        scheduledAt: interview.scheduledAt,
      })),
      recentNotifications: recentNotifications.map((notification) => ({
        id: notification.id,
        message: notification.message,
        createdAt: notification.createdAt,
      })),
      interviewStats: interviewStats.reduce(
        (acc, stat) => {
          acc[stat.status.toLowerCase()] = stat._count._all;
          return acc;
        },
        {} as Record<string, number>
      ),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error in admin dashboard API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching dashboard data" }),
      { status: 500 }
    );
  }
}
