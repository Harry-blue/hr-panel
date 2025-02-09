import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CandidateProfilesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Candidate Profiles</h1>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search candidates..." className="max-w-sm" />
        <Button variant="outline">Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Interview Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>May 15, 2025</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>UX Designer</TableCell>
            <TableCell>May 16, 2025</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  );
}
