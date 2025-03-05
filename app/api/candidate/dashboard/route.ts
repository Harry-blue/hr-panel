// app/api/candidate/dashboard/route.ts
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

    // Fetch candidate data with related info
    const [
      candidateData,
      upcomingInterviews,
      recentNotifications,
      feedbackStats,
    ] = await Promise.all([
      prisma.candidate.findUnique({
        where: { userId: parsedUserId },
        include: {
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.interview.findMany({
        where: {
          candidate: { userId: parsedUserId },
          scheduledAt: { gte: new Date() },
          status: "SCHEDULED",
        },
        take: 1, // Get the next upcoming interview
        orderBy: { scheduledAt: "asc" },
        include: {
          interviewer: { include: { user: { select: { name: true } } } },
        },
      }),
      prisma.notification.findMany({
        where: { userId: parsedUserId },
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          message: true,
          createdAt: true,
          isRead: true,
        },
      }),
      prisma.feedback.findMany({
        where: { candidate: { userId: parsedUserId } },
        select: { rating: true },
      }),
    ]);

    if (!candidateData) {
      return new NextResponse(JSON.stringify({ error: "Candidate not found" }), {
        status: 404,
      });
    }

    // Calculate profile completion
    const profileCompletion = candidateData.resume ? 85 : 50; // Adjust logic as needed

    // Calculate average feedback rating
    const totalFeedbacks = feedbackStats.length;
    const averageRating =
      totalFeedbacks > 0
        ? feedbackStats.reduce((sum, fb) => sum + fb.rating, 0) / totalFeedbacks
        : 0;

    // Prepare upcoming interview data
    const upcomingInterview = upcomingInterviews[0] || null;

    // Prepare the dashboard data
    const dashboardData = {
      summary: {
        name: candidateData.user.name,
        email: candidateData.user.email,
        profileCompletion,
        hasResume: !!candidateData.resume,
        averageFeedbackRating: Number(averageRating.toFixed(1)), // Rounded to 1 decimal
        totalFeedbacks,
      },
      upcomingInterview: upcomingInterview
        ? {
            id: upcomingInterview.id,
            interviewerName: upcomingInterview.interviewer.user.name,
            scheduledAt: upcomingInterview.scheduledAt.toISOString(),
            status: upcomingInterview.status,
          }
        : null,
      recentNotifications: recentNotifications.map((notification) => ({
        id: notification.id,
        message: notification.message,
        createdAt: notification.createdAt.toISOString(),
        isRead: notification.isRead,
      })),
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error in candidate dashboard API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching dashboard data" }),
      { status: 500 }
    );
  }
}