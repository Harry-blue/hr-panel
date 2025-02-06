import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
      include: { admin: true, interviewer: true, candidate: true },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        adminId: user.admin?.id,
        interviewerId: user.interviewer?.id,
        candidateId: user.candidate?.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    )

    return NextResponse.json(
      {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Error logging in" }, { status: 500 })
  }
}

