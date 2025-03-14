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

  // Sample data for candidate profiles
  const candidateProfiles = [
    {
      name: "John Doe",
      email: "candidate1@example.com",
      password: "cand123",
      resume: "resume1.pdf",
      phone: "123-456-7890",
      bio: "Passionate software developer with 3 years of experience in web development",
      skills: ["JavaScript", "React", "Node.js", "TypeScript"]
    },
    {
      name: "Jane Smith",
      email: "candidate2@example.com",
      password: "cand456",
      resume: "resume2.pdf",
      phone: "234-567-8901",
      bio: "Backend developer specializing in microservices architecture",
      skills: ["Java", "Spring Boot", "Docker", "PostgreSQL"]
    },
    {
      name: "Bob Wilson",
      email: "candidate3@example.com",
      password: "cand789",
      resume: "resume3.pdf",
      phone: "345-678-9012",
      bio: "Mobile developer with expertise in cross-platform apps",
      skills: ["Flutter", "Dart", "Android", "iOS"]
    },
    {
      name: "Alice Brown",
      email: "candidate4@example.com",
      password: "cand012",
      resume: "resume4.pdf",
      phone: "456-789-0123",
      bio: "Full-stack developer with a focus on scalable web applications",
      skills: ["Python", "Django", "React", "AWS"]
    },
    {
      name: "Charlie Davis",
      email: "candidate5@example.com",
      password: "cand345",
      resume: "resume5.pdf",
      phone: "567-890-1234",
      bio: "Frontend developer passionate about UI/UX design",
      skills: ["Vue.js", "CSS", "HTML", "Figma"]
    }
  ]

  const candidates = await Promise.all(
    candidateProfiles.map(profile => 
      createUser(
        profile.email,
        profile.password,
        Role.CANDIDATE,
        profile.name,
        undefined,
        profile.resume,
        profile.phone,
        profile.bio,
        profile.skills
      )
    )
  )

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
  phone?: string,
  bio?: string,
  skills?: string[] // skills is still an array in the application
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
            phone,
            bio,
            skills, // Pass the skills array directly; Prisma will serialize it to JSON
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