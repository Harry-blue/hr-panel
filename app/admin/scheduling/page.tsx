// app/admin/scheduling/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import SchedulingContent from "./components/scheduling-content"; // Import client component

async function getSchedulingData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/scheduling`,
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
    throw new Error("Failed to fetch scheduling data");
  }

  return response.json();
}

export default async function SchedulingPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const schedulingData = await getSchedulingData(session);
  const interviews = schedulingData.interviews;

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Interview Scheduling</h1>
          <SchedulingContent interviews={interviews} />
        </div>
      </Main>
    </>
  );
}
