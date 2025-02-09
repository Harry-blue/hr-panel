import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SchedulingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Interview Scheduling</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>John Doe - Frontend Developer</span>
                <Button size="sm">Reschedule</Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Jane Smith - UX Designer</span>
                <Button size="sm">Reschedule</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
