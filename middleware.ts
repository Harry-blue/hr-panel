import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Define public and protected routes
  const publicPaths = ['/login', '/sign-up', '/forgot-password','/']
  const isPublicPath = publicPaths.includes(path) || path === '/'
  const isApiRoute = path.startsWith('/api')

  // Redirect authenticated users from public paths to their dashboard
  if (session?.role && isPublicPath && !isApiRoute) {
    return NextResponse.redirect(new URL(`/${String(session.role).toLowerCase()}/dashboard`, request.url))
  }

  // Redirect unauthenticated users from protected paths to login
  if (!session?.role && !isPublicPath && !isApiRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based path validation
  if (session?.role) {
    const rolePath = `/${String(session?.role).toLowerCase()}`
    const isCorrectPath = path.startsWith(`${rolePath}/`) || path === rolePath

    if (!isCorrectPath) {
      return NextResponse.redirect(new URL(`${rolePath}/dashboard`, request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}