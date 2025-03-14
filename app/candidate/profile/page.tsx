// app/candidate/profile/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

async function getProfileData(session: any) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/profile`,
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
    console.log("in the profikle", response);
    // throw new Error("Failed to fetch profile data");
  }

  return response.json();
}

async function updateProfileData(session: any, formData: FormData) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/candidate/profile`,
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
        phone: formData.get("phone"),
        resume: formData.get("resume"),
        bio: formData.get("bio"),
        skills: formData
          .get("skills")
          ?.toString()
          .split(",")
          .map((s: string) => s.trim()),
      }),
    }
  );

  if (!response.ok) {
    console.log("sbd", response);
    // throw new Error("Failed to update profile data");
  }

  return response.json();
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "CANDIDATE") {
    redirect("/auth/signin");
  }

  const profileData = await getProfileData(session);

  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Candidate Profile</h1>
          <form
            action={async (formData) => {
              "use server";
              await updateProfileData(session, formData);
              redirect("/candidate/profile");
            }}
            className="space-y-4 max-w-md"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profileData.name}
                placeholder="Enter your full name"
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={profileData.phone}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              {/* <Input
                id="resume"
                name="resume"
                type="file"
                defaultValue={profileData.resume}
              /> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profileData.bio}
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                defaultValue={profileData.skills?.join(", ")}
                placeholder="Enter your skills (comma-separated)"
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </Main>
    </>
  );
}
