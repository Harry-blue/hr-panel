// app/api/admin/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

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

    const parsedUserId = Number.parseInt(userId);

    // Fetch admin profile data
    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in admin profile API:", error);
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
    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const parsedUserId = Number.parseInt(userId);
    const body = await req.json();
    const {
      name,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return new NextResponse(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    // Fetch the current user data
    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        password: true,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Handle password update if provided
    let updatedPassword = user.password;
    if (currentPassword && newPassword && confirmPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return new NextResponse(
          JSON.stringify({ error: "Current password is incorrect" }),
          { status: 400 }
        );
      }

      // Validate new password and confirmation
      if (newPassword !== confirmPassword) {
        return new NextResponse(
          JSON.stringify({ error: "New password and confirmation do not match" }),
          { status: 400 }
        );
      }

      // Hash the new password
      updatedPassword = await bcrypt.hash(newPassword, 10);
    } else if (
      (currentPassword && !newPassword) ||
      (newPassword && !confirmPassword) ||
      (currentPassword && !confirmPassword)
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "All password fields are required for password update",
        }),
        { status: 400 }
      );
    }

    // Update admin profile
    const updatedUser = await prisma.user.update({
      where: { id: parsedUserId },
      data: {
        name,
        email,
        password: updatedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error in admin profile update API:", error);
    return new NextResponse(
      JSON.stringify({ error: error instanceof Error ? error.message : "Error updating profile data" }),
      { status: 500 }
    );
  }
}