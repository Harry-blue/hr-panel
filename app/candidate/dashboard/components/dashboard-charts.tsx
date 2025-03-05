// app/candidate/dashboard/components/dashboard-charts.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

type UpcomingInterview = {
  interviewerName: string;
  scheduledAt: string;
  status: string;
  updatedAt: string;
} | null;

export function DashboardCharts({
  upcomingInterview,
  profileCompletion,
}: {
  upcomingInterview: UpcomingInterview;
  profileCompletion: number;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Upcoming Interview
          </CardTitle>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {upcomingInterview ? (
            <div className="space-y-2">
              <p className="text-md font-medium">
                With:{" "}
                <span className="font-bold">
                  {upcomingInterview.interviewerName}
                </span>
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Scheduled:{" "}
                {format(
                  new Date(upcomingInterview.scheduledAt),
                  "MMMM d, yyyy 'at' h:mm a"
                )}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Status: {upcomingInterview.status}
              </p>
              <p className="text-xs text-muted-foreground">
                Last updated:{" "}
                {format(new Date(upcomingInterview.updatedAt), "MMMM d, yyyy")}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No upcoming interviews scheduled. Check back later or apply for
              new opportunities!
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">
            Profile Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-md font-medium">
              Completion:{" "}
              <span className="font-bold">{profileCompletion}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {profileCompletion < 100
                ? "Complete your profile to improve your chances of getting selected."
                : "Your profile is fully complete! You're ready to shine."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
