import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interview Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              You have an interview scheduled with John Doe for the Frontend
              Developer position on May 15, 2025 at 2:00 PM.
            </p>
            <Button className="mt-2" variant="outline">
              View Details
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Please submit your feedback for the interview with Jane Smith (UX
              Designer) conducted on May 10, 2025.
            </p>
            <Button className="mt-2" variant="outline">
              Provide Feedback
            </Button>
          </CardContent>
        </Card>
        {/* Add more notification cards as needed */}
      </div>
    </div>
  );
}
