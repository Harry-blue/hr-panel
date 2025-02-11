import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { CandidateTable } from "./components/candidate-table";
import { CandidateActions } from "./components/candidate-actions";

async function getCandidatesData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/candidates`,
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
    throw new Error("Failed to fetch candidates data");
  }

  return response.json();
}

export default async function CandidatesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const candidatesData = await getCandidatesData(session);

  return (
    <>
      <div className="">
        <Header />
        <Main>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Candidate Management</h1>
              <CandidateActions session={session} />
            </div>
            <CandidateTable
              initialCandidates={candidatesData.candidates}
              session={session}
            />
          </div>
        </Main>
      </div>
    </>
  );
}
