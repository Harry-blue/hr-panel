import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === "GET") {
    try {
      const notification = await prisma.notification.findUnique({
        where: { id: Number(id) },
      })
      if (notification) {
        res.status(200).json(notification)
      } else {
        res.status(404).json({ error: "Notification not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching notification" })
    }
  } else if (req.method === "PUT") {
    try {
      const { message, type, isRead } = req.body
      const notification = await prisma.notification.update({
        where: { id: Number(id) },
        data: { message, type, isRead },
      })
      res.status(200).json(notification)
    } catch (error) {
      res.status(500).json({ error: "Error updating notification" })
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.notification.delete({ where: { id: Number(id) } })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: "Error deleting notification" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

