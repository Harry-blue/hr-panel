import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // Extract user data from custom headers
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    // Validate user data
    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }

    // Fetch candidates data
    const candidates = await prisma.candidate.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    const formattedCandidates = candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.user.name,
      email: candidate.user.email,
      status: "Active", // You might want to add a status field to your Candidate model
    }))

    return NextResponse.json({ candidates: formattedCandidates })
  } catch (error) {
    console.error("Error in admin candidates API:", error)
    return new NextResponse(JSON.stringify({ error: "Error fetching candidates data" }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }

    const { name, email } = await req.json()

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: "temporary_password", // You should implement proper password handling
        role: "CANDIDATE",
        candidate: {
          create: {},
        },
      },
    })

    return NextResponse.json({ message: "Candidate created successfully", userId: newUser.id })
  } catch (error) {
    console.error("Error creating candidate:", error)
    return new NextResponse(JSON.stringify({ error: "Error creating candidate" }), { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }

    const { id, name, email, status } = await req.json()

    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: {
        user: {
          update: {
            name,
            email,
          },
        },
        // You might want to add a status field to your Candidate model
      },
    })

    return NextResponse.json({ message: "Candidate updated successfully", candidateId: updatedCandidate.id })
  } catch (error) {
    console.error("Error updating candidate:", error)
    return new NextResponse(JSON.stringify({ error: "Error updating candidate" }), { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    if (!userId || userRole !== "ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 403 })
    }

    const { id } = await req.json()

    await prisma.candidate.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Candidate deleted successfully" })
  } catch (error) {
    console.error("Error deleting candidate:", error)
    return new NextResponse(JSON.stringify({ error: "Error deleting candidate" }), { status: 500 })
  }
}