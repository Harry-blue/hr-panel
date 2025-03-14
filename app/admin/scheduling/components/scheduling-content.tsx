// app/admin/scheduling/SchedulingContent.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface Interview {
  id: number;
  candidateName: string;
  interviewerName: string;
  scheduledAt: string;
  status: string;
}

interface SchedulingContentProps {
  interviews: Interview[];
}

export default function SchedulingContent({
  interviews,
}: SchedulingContentProps) {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState<string>("");

  const bookedDates = interviews.map(
    (interview) => new Date(interview.scheduledAt).toISOString().split("T")[0]
  );

  async function handleReschedule(interviewId: number) {
    if (!newDate || !newTime) {
      alert("Please select a date and time.");
      return;
    }

    const scheduledAt = new Date(
      `${newDate.toISOString().split("T")[0]}T${newTime}:00Z`
    );

    const response = await fetch("/api/admin/scheduling", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interviewId,
        scheduledAt: scheduledAt.toISOString(),
      }),
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   alert(errorData.error || "Failed to reschedule interview");
    //   return;
    // }

    // Refresh the page or update state locally
    window.location.reload();
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={newDate}
            onSelect={setNewDate}
            modifiers={{
              booked: (date) =>
                bookedDates.includes(date.toISOString().split("T")[0]),
            }}
            modifiersClassNames={{
              booked: "bg-primary/10 border border-primary",
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {interviews.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No upcoming interviews scheduled.
            </p>
          ) : (
            <ul className="space-y-2">
              {interviews.map((interview) => (
                <li
                  key={interview.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {interview.candidateName} - {interview.interviewerName}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedInterview(interview);
                          setNewDate(new Date(interview.scheduledAt));
                          setNewTime(
                            format(new Date(interview.scheduledAt), "HH:mm")
                          );
                        }}
                      >
                        Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reschedule Interview</DialogTitle>
                      </DialogHeader>
                      {selectedInterview && (
                        <div className="space-y-4">
                          <div>
                            <strong>Candidate:</strong>{" "}
                            {selectedInterview.candidateName}
                          </div>
                          <div>
                            <strong>Interviewer:</strong>{" "}
                            {selectedInterview.interviewerName}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-date">New Date</Label>
                            <Calendar
                              mode="single"
                              selected={newDate}
                              onSelect={setNewDate}
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-time">New Time</Label>
                            <Input
                              id="new-time"
                              type="time"
                              value={newTime}
                              onChange={(e) => setNewTime(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={() =>
                              handleReschedule(selectedInterview.id)
                            }
                          >
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
