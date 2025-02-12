"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface CandidateActionsProps {
  session: any;
}

export function CandidateActions({ session }: CandidateActionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: "", email: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": session.user.id,
          "X-User-Role": session.user.role,
        },
        body: JSON.stringify(newCandidate),
      });

      if (!response.ok) {
        throw new Error("Failed to add candidate");
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
      setIsAddDialogOpen(false);
      setNewCandidate({ name: "", email: "" });
      // You might want to trigger a refresh of the candidate list here
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast({
        title: "Error",
        description: "Failed to add candidate",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <Input
          placeholder="Search candidates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add Candidate</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCandidate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter candidate name"
                value={newCandidate.name}
                onChange={(e) =>
                  setNewCandidate((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter candidate email"
                value={newCandidate.email}
                onChange={(e) =>
                  setNewCandidate((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit">Add Candidate</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
