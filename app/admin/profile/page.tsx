// app/admin/profile/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function getProfileData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/profile`,
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
    throw new Error("Failed to fetch profile data");
  }

  return response.json();
}

async function updateProfileData(session: any, formData: FormData) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/admin/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-User-Id": session.user.id,
        "X-User-Role": session.user.role,
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        currentPassword: formData.get("current-password"),
        newPassword: formData.get("new-password"),
        confirmPassword: formData.get("confirm-password"),
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update profile data");
  }

  return response.json();
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const profileData = await getProfileData(session);

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Admin Profile</h1>
          <form
            action={async (formData) => {
              "use server";
              await updateProfileData(session, formData);
              redirect("/admin/profile"); // Refresh the page after update
            }}
            className="space-y-4 max-w-md"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profileData.name}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profileData.email}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                name="current-password"
                type="password"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                name="new-password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </Main>
    </>
  );
}
