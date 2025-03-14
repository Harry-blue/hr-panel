// app/admin/notifications/NotificationForm.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendNotification } from "./actions"; // Import the server action
import { useSession } from "next-auth/react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface NotificationFormProps {
  users: User[];
}

export default function NotificationForm({ users }: NotificationFormProps) {
  const [recipientId, setRecipientId] = useState<string>("");
  const [type, setType] = useState<"EMAIL" | "SMS">("EMAIL");
  const { data: session } = useSession();

  return (
    <form
      action={async (formData) => {
        await sendNotification(recipientId, type, formData, session);
      }}
      className="space-y-4 max-w-md"
    >
      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient</Label>
        <Select value={recipientId} onValueChange={setRecipientId} required>
          <SelectTrigger id="recipient">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name} ({user.email} - {user.role})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Notification Type</Label>
        <Select
          value={type}
          onValueChange={(value: "EMAIL" | "SMS") => setType(value)}
          required
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EMAIL">Email</SelectItem>
            <SelectItem value="SMS">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Enter subject"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        />
      </div>
      <Button type="submit">Send Notification</Button>
    </form>
  );
}
