"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react"; // Added import for React

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      switch (session.user.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "INTERVIEWER":
          router.push("/interviewer/dashboard");
          break;
        case "CANDIDATE":
          router.push("/candidate/dashboard");
          break;
        default:
          // If no specific role or unhandled role, you might want to redirect to a default page
          router.push("/");
      }
    } else if (status === "unauthenticated") {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [session, status, router]);

  // You might want to show a loading state while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
