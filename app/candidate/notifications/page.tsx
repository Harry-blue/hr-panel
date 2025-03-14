import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your interview for the Frontend Developer position has been
                  scheduled for May 15, 2025 at 2:00 PM.
                </p>
                <Button className="mt-2" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application Update</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your application for the UX Designer position has moved to the
                  next round. Please check your email for more information.
                </p>
                <Button className="mt-2" variant="outline">
                  View Application
                </Button>
              </CardContent>
            </Card>
            {/* Add more notification cards as needed */}
          </div>
        </div>
      </Main>
    </>
  );
}
