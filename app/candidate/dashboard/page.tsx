import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SignOutButton from "@/components/SignOutButton";

export default async function CandidateDashboard() {
  const session = await getServerSession(authOptions);

  // if (!session || session.user.role != "admin") {
  //   redirect("/");
  // }
  console.log("secii-->", session);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Candidate Dashboard</h1>
      <p>Welcome, {session?.user?.email}</p>
      <SignOutButton />
      {/* Add more admin dashboard content here */}
    </div>
  );
}
