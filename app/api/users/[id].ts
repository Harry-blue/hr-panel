import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: { id: true, email: true, name: true, role: true },
      })
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ error: "User not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" })
    }
  } else if (req.method === "PUT") {
    try {
      const { email, password, name, role } = req.body
      const updateData: any = { email, name, role }
      if (password) {
        updateData.password = await bcrypt.hash(password, 10)
      }
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
        select: { id: true, email: true, name: true, role: true },
      })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: "Error updating user" })
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.user.delete({ where: { id: Number(id) } })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

