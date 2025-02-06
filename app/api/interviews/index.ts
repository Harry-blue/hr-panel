import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const interviews = await prisma.interview.findMany()
      res.status(200).json(interviews)
    } catch (error) {
      res.status(500).json({ error: "Error fetching interviews" })
    }
  } else if (req.method === "POST") {
    try {
      const { candidateId, interviewerId, adminId, scheduledAt, status } = req.body
      const interview = await prisma.interview.create({
        data: { candidateId, interviewerId, adminId, scheduledAt, status },
      })
      res.status(201).json(interview)
    } catch (error) {
      res.status(500).json({ error: "Error creating interview" })
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

