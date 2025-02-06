import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.notification.deleteMany()
  await prisma.feedback.deleteMany()
  await prisma.interview.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.interviewer.deleteMany()
  await prisma.candidate.deleteMany()
  await prisma.user.deleteMany()

  console.log("Existing data cleared")

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: await bcrypt.hash("adminpassword", 10),
      role: "ADMIN",
      name: "Admin User",
      admin: {
        create: {},
      },
    },
    include: {
      admin: true,
    },
  })

  const interviewer1 = await prisma.user.create({
    data: {
      email: "interviewer1@example.com",
      password: await bcrypt.hash("interviewer1password", 10),
      role: "INTERVIEWER",
      name: "Interviewer One",
      interviewer: {
        create: {
          specialization: "Frontend Development",
        },
      },
    },
    include: {
      interviewer: true,
    },
  })

  const interviewer2 = await prisma.user.create({
    data: {
      email: "interviewer2@example.com",
      password: await bcrypt.hash("interviewer2password", 10),
      role: "INTERVIEWER",
      name: "Interviewer Two",
      interviewer: {
        create: {
          specialization: "Backend Development",
        },
      },
    },
    include: {
      interviewer: true,
    },
  })

  const candidate1 = await prisma.user.create({
    data: {
      email: "candidate1@example.com",
      password: await bcrypt.hash("candidate1password", 10),
      role: "CANDIDATE",
      name: "Candidate One",
      candidate: {
        create: {
          resume: "path/to/resume1.pdf",
        },
      },
    },
    include: {
      candidate: true,
    },
  })

  const candidate2 = await prisma.user.create({
    data: {
      email: "candidate2@example.com",
      password: await bcrypt.hash("candidate2password", 10),
      role: "CANDIDATE",
      name: "Candidate Two",
      candidate: {
        create: {
          resume: "path/to/resume2.pdf",
        },
      },
    },
    include: {
      candidate: true,
    },
  })

  console.log("Users created")

  // Create interviews
  const interview1 = await prisma.interview.create({
    data: {
      candidateId: candidate1.candidate!.id,
      interviewerId: interviewer1.interviewer!.id,
      adminId: adminUser.admin!.id,
      scheduledAt: new Date("2024-03-15T10:00:00Z"),
      status: "SCHEDULED",
    },
  })

  const interview2 = await prisma.interview.create({
    data: {
      candidateId: candidate2.candidate!.id,
      interviewerId: interviewer2.interviewer!.id,
      adminId: adminUser.admin!.id,
      scheduledAt: new Date("2024-03-16T14:00:00Z"),
      status: "SCHEDULED",
    },
  })

  console.log("Interviews created")

  // Create feedback
  await prisma.feedback.create({
    data: {
      interviewId: interview1.id,
      interviewerId: interviewer1.interviewer!.id,
      candidateId: candidate1.candidate!.id,
      rating: 4,
      comments: "Good technical skills, could improve communication",
    },
  })

  console.log("Feedback created")

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: candidate1.id,
        message: "Your interview has been scheduled",
        type: "EMAIL",
      },
      {
        userId: interviewer1.id,
        message: "You have a new interview scheduled",
        type: "EMAIL",
      },
    ],
  })

  console.log("Notifications created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

