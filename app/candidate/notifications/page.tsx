// app/candidate/notifications/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getNotifications(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/notifications`,
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
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
}

async function markNotificationAsRead(session: any, notificationId: number) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/notifications`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": session.user.id,
        "X-User-Role": session.user.role,
      },
      body: JSON.stringify({ notificationId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return response.json();
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "CANDIDATE") {
    redirect("/auth/signin");
  }

  const notifications = await getNotifications(session);

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No notifications found.
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification: any) => (
                <Card key={notification.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {notification.type === "EMAIL"
                          ? "Email Notification"
                          : "SMS Notification"}
                      </CardTitle>
                      <Badge
                        variant={notification.isRead ? "secondary" : "default"}
                      >
                        {notification.isRead ? "Read" : "Unread"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                    {!notification.isRead && (
                      <form
                        action={async () => {
                          "use server";
                          await markNotificationAsRead(
                            session,
                            notification.id
                          );
                          redirect("/candidate/notifications");
                        }}
                        className="mt-2"
                      >
                        <Button type="submit" variant="outline">
                          Mark as Read
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </Main>
    </>
  );
}
