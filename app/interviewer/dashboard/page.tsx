import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import SignOutButton from "@/components/SignOutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Main } from "@/components/layout/main";
import Header from "@/components/layout/header";

export default async function InterViewerDashboard() {
  const session = await getServerSession(authOptions);

  // if (!session || session.user.role != "admin") {
  //   redirect("/");
  // }
  console.log("secii-->", session);
  return (
    <>
      <Header />
      <Main>
        <div className="container mx-auto p-4">
          <div className="flex ">
            <h1 className="text-2xl font-bold mb-4 mr-96">
              Interview Dashboard
            </h1>
            {/* <p>Welcome, {session?.user?.email}</p> */}
            <div className="ml-96">
              <SignOutButton />
            </div>
          </div>
          {/* Add more admin dashboard content here */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome, Interviewer</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Interviews
                  </CardTitle>
                  {/* <Calendar className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Next interview in 2 hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Feedback
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    Feedback due in 24 hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Candidates
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    Interviewed this month
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>John Doe - Frontend Developer</span>
                    <Button size="sm">View Details</Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Jane Smith - UX Designer</span>
                    <Button size="sm">View Details</Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  );
}
