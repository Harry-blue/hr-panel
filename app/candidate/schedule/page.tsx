// app/candidate/schedule/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import ScheduleTable from "./components/schedule-table"; // Import the client component

async function getScheduleData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/schedule`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": session.user.id,
        "X-User-Role": session.user.role,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch schedule data");
  }

  return response.json();
}

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "CANDIDATE") {
    redirect("/auth/signin");
  }

  const scheduleData = await getScheduleData(session);
  const interviews = scheduleData.interviews;

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Interview Schedule</h1>
          <div className="grid gap-4">
            <ScheduleTable interviews={interviews} />
          </div>
        </div>
      </Main>
    </>
  );
}
