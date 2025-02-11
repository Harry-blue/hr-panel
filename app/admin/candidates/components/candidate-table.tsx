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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface Candidate {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface CandidateTableProps {
  initialCandidates: Candidate[];
  session: any;
}

export function CandidateTable({
  initialCandidates,
  session,
}: CandidateTableProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  );

  const handleEditCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCandidate) return;

    try {
      const response = await fetch("/api/admin/candidates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": session.user.id,
          "X-User-Role": session.user.role,
        },
        body: JSON.stringify(editingCandidate),
      });

      if (!response.ok) {
        throw new Error("Failed to update candidate");
      }

      setCandidates((prevCandidates) =>
        prevCandidates.map((c) =>
          c.id === editingCandidate.id ? editingCandidate : c
        )
      );
      toast({
        title: "Success",
        description: "Candidate updated successfully",
      });
      setEditingCandidate(null);
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast({
        title: "Error",
        description: "Failed to update candidate",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCandidate = async (id: number) => {
    try {
      const response = await fetch("/api/admin/candidates", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": session.user.id,
          "X-User-Role": session.user.role,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete candidate");
      }

      setCandidates((prevCandidates) =>
        prevCandidates.filter((c) => c.id !== id)
      );
      toast({
        title: "Success",
        description: "Candidate deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast({
        title: "Error",
        description: "Failed to delete candidate",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.status}</TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCandidate(candidate)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCandidate(candidate.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={!!editingCandidate}
        onOpenChange={() => setEditingCandidate(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditCandidate} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editingCandidate?.name || ""}
                onChange={(e) =>
                  setEditingCandidate((prev) => ({
                    ...prev!,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingCandidate?.email || ""}
                onChange={(e) =>
                  setEditingCandidate((prev) => ({
                    ...prev!,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Input
                id="edit-status"
                value={editingCandidate?.status || ""}
                onChange={(e) =>
                  setEditingCandidate((prev) => ({
                    ...prev!,
                    status: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
