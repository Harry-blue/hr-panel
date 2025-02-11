import { PrismaClient, Role, NotificationType } from "@prisma/client"
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

  console.log("🗑️ Existing data cleared")

  // Create users with different roles
  const adminUsers = await Promise.all([
    createUser("admin1@example.com", "admin123", Role.ADMIN, "Admin User"),
    createUser("admin2@example.com", "admin456", Role.ADMIN, "Super Admin"),
  ])

  const interviewers = await Promise.all([
    createUser("frontend@example.com", "front123", Role.INTERVIEWER, "Frontend Expert", "Frontend Development"),
    createUser("backend@example.com", "back123", Role.INTERVIEWER, "Backend Expert", "Backend Development"),
    createUser("fullstack@example.com", "full123", Role.INTERVIEWER, "Fullstack Expert", "Full Stack Development"),
    createUser("mobile@example.com", "mobile123", Role.INTERVIEWER, "Mobile Expert", "Mobile Development"),
  ])

  const candidates = await Promise.all([
    createUser("candidate1@example.com", "cand123", Role.CANDIDATE, "John Doe", undefined, "resume1.pdf"),
    createUser("candidate2@example.com", "cand456", Role.CANDIDATE, "Jane Smith", undefined, "resume2.pdf"),
    createUser("candidate3@example.com", "cand789", Role.CANDIDATE, "Bob Wilson", undefined, "resume3.pdf"),
    createUser("candidate4@example.com", "cand012", Role.CANDIDATE, "Alice Brown", undefined, "resume4.pdf"),
    createUser("candidate5@example.com", "cand345", Role.CANDIDATE, "Charlie Davis", undefined, "resume5.pdf"),
  ])

  console.log("👥 Users created")

  // Create interviews with different statuses
  const interviews = []
  const interviewData = [
    { status: "SCHEDULED" as const, daysFromNow: 1 },
    { status: "SCHEDULED" as const, daysFromNow: 2 },
    { status: "COMPLETED" as const, daysFromNow: -1 },
    { status: "CANCELLED" as const, daysFromNow: 3 },
    { status: "RESCHEDULED" as const, daysFromNow: 4 },
    { status: "SCHEDULED" as const, daysFromNow: 5 },
    { status: "COMPLETED" as const, daysFromNow: -2 },
    { status: "SCHEDULED" as const, daysFromNow: 6 },
    { status: "CANCELLED" as const, daysFromNow: 7 },
    { status: "COMPLETED" as const, daysFromNow: -3 },
  ]

  for (let i = 0; i < interviewData.length; i++) {
    const { status, daysFromNow } = interviewData[i]
    const interview = await prisma.interview.create({
      data: {
        candidateId: candidates[i % candidates.length].candidate!.id,
        interviewerId: interviewers[i % interviewers.length].interviewer!.id,
        adminId: adminUsers[i % adminUsers.length].admin!.id,
        scheduledAt: new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000),
        status: status,
      },
    })
    interviews.push(interview)
  }

  console.log("📅 Interviews created")

  // Create feedback for completed interviews
  const feedbackComments = [
    "Excellent problem-solving skills and strong technical knowledge",
    "Good communication but needs improvement in system design",
    "Strong algorithmic thinking, could improve code organization",
    "Great cultural fit, demonstrates leadership potential",
    "Solid understanding of fundamentals, needs more practical experience",
  ]

  for (const interview of interviews) {
    if (interview.status === "COMPLETED") {
      await prisma.feedback.create({
        data: {
          interviewId: interview.id,
          interviewerId: interview.interviewerId,
          candidateId: interview.candidateId,
          rating: Math.floor(Math.random() * 4) + 2, // Random rating between 2-5
          comments: feedbackComments[Math.floor(Math.random() * feedbackComments.length)],
        },
      })
    }
  }

  console.log("📝 Feedback created")

  // Create notifications for all users
  const notificationMessages = [
    "Your interview has been scheduled",
    "Reminder: Interview in 24 hours",
    "New feedback available",
    "Interview status updated",
    "Please complete post-interview survey",
  ]

  const allUsers = [...adminUsers, ...interviewers, ...candidates]
  for (const user of allUsers) {
    await prisma.notification.createMany({
      data: [
        {
          userId: user.id,
          message: notificationMessages[Math.floor(Math.random() * notificationMessages.length)],
          type: NotificationType.EMAIL,
          isRead: Math.random() > 0.5,
        },
        {
          userId: user.id,
          message: notificationMessages[Math.floor(Math.random() * notificationMessages.length)],
          type: NotificationType.SMS,
          isRead: Math.random() > 0.5,
        },
      ],
    })
  }

  console.log("🔔 Notifications created")
}

async function createUser(
  email: string,
  password: string,
  role: Role,
  name: string,
  specialization?: string,
  resume?: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      name,
      ...(role === Role.ADMIN && {
        admin: {
          create: {},
        },
      }),
      ...(role === Role.INTERVIEWER && {
        interviewer: {
          create: {
            specialization,
          },
        },
      }),
      ...(role === Role.CANDIDATE && {
        candidate: {
          create: {
            resume,
          },
        },
      }),
    },
    include: {
      admin: true,
      interviewer: true,
      candidate: true,
    },
  })
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

