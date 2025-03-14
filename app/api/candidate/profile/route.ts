// app/api/candidate/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    console.log("i was called ")
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

    // Fetch candidate profile data
    const candidateData = await prisma.candidate.findUnique({
      where: { userId: parsedUserId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!candidateData) {
      return new NextResponse(JSON.stringify({ error: "Candidate not found" }), {
        status: 404,
      });
    }

    // Prepare profile data response
    const profileData = {
      name: candidateData.user.name,
      email: candidateData.user.email,
      phone: candidateData.phone || "",
      resume: candidateData.resume || "",
      bio: candidateData.bio || "",
      skills: candidateData.skills || [], // skills will be an array (or null/undefined)
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error in candidate profile API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching profile data" }),
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

    // Parse request body
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return new NextResponse(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    // Update candidate profile
    const updatedCandidate = await prisma.candidate.update({
      where: { userId: parsedUserId },
      data: {
        phone: body.phone,
        resume: body.resume,
        bio: body.bio,
        skills: body.skills, // Pass the skills array directly; Prisma will serialize it to JSON
        user: {
          update: {
            name: body.name,
            email: body.email,
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Prepare updated profile data response
    const profileData = {
      name: updatedCandidate.user.name,
      email: updatedCandidate.user.email,
      phone: updatedCandidate.phone || "",
      resume: updatedCandidate.resume || "",
      bio: updatedCandidate.bio || "",
      skills: updatedCandidate.skills || [], // skills will be an array (or null/undefined)
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error in candidate profile update API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating profile data" }),
      { status: 500 }
    );
  }
}