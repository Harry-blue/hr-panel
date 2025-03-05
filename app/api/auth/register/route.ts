// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and candidate in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create the User
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "CANDIDATE", // Default role for registration
        },
      });

      // Create the corresponding Candidate entry
      const candidate = await prisma.candidate.create({
        data: {
          userId: user.id, // Link to the newly created user
          resume: null, // Optional field, set to null initially
        },
      });

      return { user, candidate };
    });

    // Return success response (excluding sensitive data)
    return NextResponse.json(
      {
        message: "Candidate registered successfully",
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
        candidate: {
          id: result.candidate.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}