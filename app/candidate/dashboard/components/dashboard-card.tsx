// app/candidate/dashboard/components/dashboard-cards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

type Stats = {
  upcomingInterviews: { current: number; change: number };
  profileCompletion: { current: number; change: number };
  applicationStatus: { current: number; change: number };
};

export function DashboardCards({ stats }: { stats: Stats }) {
  const renderChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span
        className={`flex items-center text-xs ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {Math.abs(change).toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Interviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.upcomingInterviews.current}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.upcomingInterviews.current > 0
              ? "Scheduled interviews"
              : "No upcoming interviews"}
            {stats.upcomingInterviews.change !== 0 && (
              <span className="ml-2">
                {renderChange(stats.upcomingInterviews.change)}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.profileCompletion.current}%
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.profileCompletion.current < 100
              ? "Incomplete profile"
              : "Fully complete"}
            {stats.profileCompletion.change !== 0 && (
              <span className="ml-2">
                {renderChange(stats.profileCompletion.change)}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.applicationStatus.current}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.applicationStatus.current > 0
              ? "Pending review"
              : "No active applications"}
            {stats.applicationStatus.change !== 0 && (
              <span className="ml-2">
                {renderChange(stats.applicationStatus.change)}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
