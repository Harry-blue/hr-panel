import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SignOutButton from "@/components/SignOutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, Clock } from "lucide-react";

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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Interview
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Frontend Developer</div>
              <p className="text-xs text-muted-foreground">
                May 15, 2025 at 2:00 PM
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Application Status
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">In Progress</div>
              <p className="text-xs text-muted-foreground">
                Last updated: 2 days ago
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Completion
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Update your profile for better chances
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
