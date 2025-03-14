// app/admin/notifications/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import NotificationForm from "./components/notification-form";

async function getUsers(session: any) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": session.user.id, // Pass user ID in a custom header
      "X-User-Role": session.user.role, // Pass user role if needed
    },
  });

  if (!response.ok) {
    // throw new Error("Failed to fetch users");
  }

  return response.json();
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const usersData = await getUsers(session);
  const users = usersData.users;

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Send Notification</h1>
          <NotificationForm users={users} />
        </div>
      </Main>
    </>
  );
}
