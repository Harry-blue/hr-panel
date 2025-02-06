import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === "GET") {
    try {
      const feedback = await prisma.feedback.findUnique({
        where: { id: Number(id) },
      })
      if (feedback) {
        res.status(200).json(feedback)
      } else {
        res.status(404).json({ error: "Feedback not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching feedback" })
    }
  } else if (req.method === "PUT") {
    try {
      const { rating, comments } = req.body
      const feedback = await prisma.feedback.update({
        where: { id: Number(id) },
        data: { rating, comments },
      })
      res.status(200).json(feedback)
    } catch (error) {
      res.status(500).json({ error: "Error updating feedback" })
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.feedback.delete({ where: { id: Number(id) } })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: "Error deleting feedback" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

