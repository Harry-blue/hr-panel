import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true },
      })
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" })
    }
  } else if (req.method === "POST") {
    try {
      const { email, password, name, role } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role },
        select: { id: true, email: true, name: true, role: true },
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: "Error creating user" })
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

