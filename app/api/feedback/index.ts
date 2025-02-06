import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const feedbacks = await prisma.feedback.findMany()
      res.status(200).json(feedbacks)
    } catch (error) {
      res.status(500).json({ error: "Error fetching feedbacks" })
    }
  } else if (req.method === "POST") {
    try {
      const { interviewId, interviewerId, candidateId, rating, comments } = req.body
      const feedback = await prisma.feedback.create({
        data: { interviewId, interviewerId, candidateId, rating, comments },
      })
      res.status(201).json(feedback)
    } catch (error) {
      res.status(500).json({ error: "Error creating feedback" })
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

