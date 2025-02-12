"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DashboardChartsProps {
  interviewStats: Record<string, number>;
  upcomingInterviews: Array<{
    id: number;
    candidateName: string;
    interviewerName: string;
    scheduledAt: string;
  }>;
}

export function DashboardCharts({
  interviewStats,
  upcomingInterviews,
}: DashboardChartsProps) {
  const chartData = Object.entries(interviewStats).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    total: count,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Interview Statistics</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {interview.candidateName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    with {interview.interviewerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(interview.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
