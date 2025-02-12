import { verify } from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function getUserFromToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { id: number; role: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) throw new Error("User not found")
    return user
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export function checkRole(user: any, allowedRoles: string[]) {
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized")
  }
}

