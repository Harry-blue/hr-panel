import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === "GET") {
    try {
      const interview = await prisma.interview.findUnique({
        where: { id: Number(id) },
      })
      if (interview) {
        res.status(200).json(interview)
      } else {
        res.status(404).json({ error: "Interview not found" })
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching interview" })
    }
  } else if (req.method === "PUT") {
    try {
      const { candidateId, interviewerId, adminId, scheduledAt, status } = req.body
      const interview = await prisma.interview.update({
        where: { id: Number(id) },
        data: { candidateId, interviewerId, adminId, scheduledAt, status },
      })
      res.status(200).json(interview)
    } catch (error) {
      res.status(500).json({ error: "Error updating interview" })
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.interview.delete({ where: { id: Number(id) } })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: "Error deleting interview" })
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

