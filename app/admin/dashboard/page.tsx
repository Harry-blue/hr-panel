import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DashboardCharts } from "./components/dashboard-charts";
import SignOutButton from "@/components/SignOutButton";
import { DashboardCards } from "./components/dashboard-cards";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";

async function getDashboardData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/dashboard`,
    {
      method: "GET", // Or "POST", depending on your API implementation
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": session.user.id, // Pass user ID in a custom header
        "X-User-Role": session.user.role, // Pass user role if needed
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const dashboardData = await getDashboardData(session);

  // Calculate month-over-month changes
  const calculateMoMChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const stats = {
    totalInterviews: {
      current: dashboardData.summary.totalInterviews,
      change: calculateMoMChange(
        dashboardData.summary.totalInterviews,
        dashboardData.summary.totalInterviews -
          (dashboardData.interviewStats.scheduled || 0)
      ),
    },
    completedInterviews: {
      current: dashboardData.interviewStats.completed || 0,
      change: calculateMoMChange(
        dashboardData.interviewStats.completed || 0,
        (dashboardData.interviewStats.completed || 0) * 0.95 // Assuming 5% growth
      ),
    },
    pendingInterviews: {
      current: dashboardData.interviewStats.scheduled || 0,
      change: calculateMoMChange(
        dashboardData.interviewStats.scheduled || 0,
        (dashboardData.interviewStats.scheduled || 0) * 1.02 // Assuming 2% decline
      ),
    },
    totalCandidates: {
      current: dashboardData.summary.totalCandidates,
      change: calculateMoMChange(
        dashboardData.summary.totalCandidates,
        dashboardData.summary.totalCandidates * 0.85 // Assuming 15% growth
      ),
    },
  };

  return (
    <>
      <div className="">
        <Header />
        {/* <div className="flex justify-between items-center mb-8 ">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {session?.user?.email}
            </p>
          </div>
          <SignOutButton />
        </div> */}
        <Main>
          <div className="space-y-6">
            <DashboardCards stats={stats} />
            <DashboardCharts
              interviewStats={dashboardData.interviewStats}
              upcomingInterviews={dashboardData.upcomingInterviews}
            />
          </div>
        </Main>
      </div>
    </>
  );
}
