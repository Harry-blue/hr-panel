// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware Path:', path);

  // Define public routes that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password', '/'];
  const isPublicPath = publicPaths.includes(path);
  const isApiRoute = path.startsWith('/api');

  // Allow public paths and API routes to proceed without checks
  if (isPublicPath || isApiRoute) {
    console.log(`${isApiRoute ? 'API' : 'Public'} path detected, proceeding:`, path);
    return NextResponse.next();
  }

  // Get session token
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log('Session:', session);

  // If no session exists, redirect to login for non-public paths
  if (!session) {
    console.log('Unauthenticated, redirecting to /login from:', path);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Define role-based path prefixes
  const role = session.role as string; // e.g., "CANDIDATE", "ADMIN", "INTERVIEWER"
  const rolePathPrefix = `/${role.toLowerCase()}`;
  const dashboardPath = `${rolePathPrefix}/dashboard`;

  // Check if the current path aligns with the user's role
  const isRolePath = path.startsWith(rolePathPrefix) || path === rolePathPrefix;

  if (!isRolePath) {
    // User is trying to access a path outside their role, redirect to their dashboard
    console.log(`Role mismatch, redirecting to ${dashboardPath} from:`, path);
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  // If the path is correct for the role, proceed
  console.log('No redirects needed, proceeding:', path);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};