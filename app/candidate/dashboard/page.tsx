// app/candidate/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DashboardCharts } from "./components/dashboard-charts";
import SignOutButton from "@/components/SignOutButton";
import { DashboardCards } from "./components/dashboard-card";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";

async function getDashboardData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": session.user.id, // Pass user ID in a custom header
        "X-User-Role": session.user.role, // Pass user role (note: adjusted to session.role)
      },
    }
  );

  if (!response.ok) {
    console.log("respp>", response);
    // throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export default async function CandidateDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "CANDIDATE") {
    redirect("/auth/signin");
  }

  const dashboardData = await getDashboardData(session);

  // Calculate some candidate-specific stats
  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const stats = {
    upcomingInterviews: {
      current: dashboardData.upcomingInterview ? 1 : 0,
      change: calculateChange(
        dashboardData.upcomingInterview ? 1 : 0,
        0 // No previous data for simplicity; adjust if you have historical data
      ),
    },
    profileCompletion: {
      current: dashboardData.profileCompletion,
      change: calculateChange(
        dashboardData.profileCompletion,
        dashboardData.hasResume ? 75 : 40 // Assume previous completion was lower
      ),
    },
    applicationStatus: {
      current: dashboardData.upcomingInterview?.status === "SCHEDULED" ? 1 : 0,
      change: calculateChange(
        dashboardData.upcomingInterview?.status === "SCHEDULED" ? 1 : 0,
        0 // No previous data; adjust as needed
      ),
    },
  };

  return (
    <>
      <div className="">
        <Header />
        <Main>
          <div className="space-y-6">
            <DashboardCards stats={stats} />
            {/* <DashboardCharts
              upcomingInterview={dashboardData.upcomingInterview}
              profileCompletion={dashboardData.profileCompletion}
            /> */}
          </div>
        </Main>
      </div>
    </>
  );
}
