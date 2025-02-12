"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Here you would typically handle the form submission
  }

  return (
    <div className="container mx-auto ">
      <div className="py-4">
        <h1 className="text-3xl font-bold">Candidate Profile</h1>
        <p>Update your profile information to stand out to potential employers.</p>
      </div>
      <Card className="max-w-full flex bg-black">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className=" bg-white py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <Input id="resume" type="file" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="Enter your skills (comma-separated)" />
            </div>
          </form>
          <Button type="submit" className="w-full pt-4" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

