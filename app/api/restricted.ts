import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"

export default async (req:NextRequest, res:NextResponse) => {
  const session = await getServerSession(authOptions)

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    return NextResponse.json({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}