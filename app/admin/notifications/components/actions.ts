// app/admin/notifications/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function sendNotification(recipientId: string, type: "EMAIL" | "SMS", formData: FormData,session:any) {
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!recipientId || !type || !subject || !message) {
    throw new Error("All fields are required");
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": session.user.id, // Pass user ID in a custom header
      "X-User-Role": session.user.role, // Pass user role if needed
    },
    body: JSON.stringify({
      userId: Number(recipientId),
      type,
      subject,
      message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send notification");
  }

  redirect("/admin/notifications");
}