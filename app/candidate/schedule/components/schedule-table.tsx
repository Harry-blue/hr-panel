// app/candidate/schedule/ScheduleTable.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Interview {
  id: number;
  position: string | null;
  scheduledAt: string;
  status: string;
}

interface ScheduleTableProps {
  interviews: Interview[];
}

export default function ScheduleTable({ interviews }: ScheduleTableProps) {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );

  return (
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
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.position || "N/A"}</TableCell>
                    <TableCell>
                      {format(new Date(interview.scheduledAt), "MMMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(interview.scheduledAt), "h:mm a")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          interview.status === "SCHEDULED"
                            ? "default"
                            : interview.status === "COMPLETED"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedInterview(interview)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Interview Details</DialogTitle>
                          </DialogHeader>
                          {selectedInterview && (
                            <div className="space-y-4">
                              <div>
                                <strong>Position:</strong>{" "}
                                {selectedInterview.position || "N/A"}
                              </div>
                              <div>
                                <strong>Date:</strong>{" "}
                                {format(
                                  new Date(selectedInterview.scheduledAt),
                                  "MMMM d, yyyy"
                                )}
                              </div>
                              <div>
                                <strong>Time:</strong>{" "}
                                {format(
                                  new Date(selectedInterview.scheduledAt),
                                  "h:mm a"
                                )}
                              </div>
                              <div>
                                <strong>Status:</strong>{" "}
                                {selectedInterview.status}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
