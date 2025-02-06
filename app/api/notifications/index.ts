import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const notifications = await prisma.notification.findMany()
      res.status(200).json(notifications)
    } catch (error) {
      res.status(500).json({ error: "Error fetching notifications" })
    }
  } else if (req.method === "POST") {
    try {
      const { userId, message, type } = req.body
      const notification = await prisma.notification.create({
        data: { userId, message, type },
      })
      res.status(201).json(notification)
    } catch (error) {
      res.status(500).json({ error: "Error creating notification" })
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

