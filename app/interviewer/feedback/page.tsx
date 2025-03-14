import Header from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Provide Feedback</h1>
          <Card>
            <CardHeader>
              <CardTitle>John Doe - Frontend Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label>Technical Skills</Label>
                  <RadioGroup defaultValue="average">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="technical-poor" />
                      <Label htmlFor="technical-poor">Poor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="average" id="technical-average" />
                      <Label htmlFor="technical-average">Average</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="technical-good" />
                      <Label htmlFor="technical-good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="excellent"
                        id="technical-excellent"
                      />
                      <Label htmlFor="technical-excellent">Excellent</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Communication Skills</Label>
                  <RadioGroup defaultValue="average">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="communication-poor" />
                      <Label htmlFor="communication-poor">Poor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="average"
                        id="communication-average"
                      />
                      <Label htmlFor="communication-average">Average</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="communication-good" />
                      <Label htmlFor="communication-good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="excellent"
                        id="communication-excellent"
                      />
                      <Label htmlFor="communication-excellent">Excellent</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Enter your feedback here"
                  />
                </div>
                <Button type="submit">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}
