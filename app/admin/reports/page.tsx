import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Interview Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a chart or graph component here */}
            <p>Chart placeholder for interview performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Candidate Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a chart or graph component here */}
            <p>Chart placeholder for candidate feedback</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add a chart or graph component here */}
            <p>Chart placeholder for overall statistics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
