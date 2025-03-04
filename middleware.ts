import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // e.g., "/login", "/register", "/"
  console.log('Middleware Path:', path); // Debug: Check what path is being evaluated

  // Define public routes
  const publicPaths = ['/login', '/register', '/forgot-password', '/'];
  
  // Normalize path to handle trailing slashes
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  const isPublicPath = publicPaths.includes(normalizedPath);
  const isApiRoute = path.startsWith('/api');

  // Allow navigation on public routes regardless of authentication status
  if (isPublicPath && !isApiRoute) {
    console.log('Public path detected, proceeding:', normalizedPath);
    return NextResponse.next(); // Explicitly allow navigation to public routes
  }

  // Handle API routes
  if (isApiRoute) {
    console.log('API route detected, proceeding:', path);
    return NextResponse.next(); // Pass through API requests unchanged
  }

  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log('Session:', session); // Debug: Check session data

  // Redirect unauthenticated users from protected routes to login
  if (!session?.role && !isPublicPath) {
    console.log('Unauthenticated, redirecting to /login from:', path);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based path validation for authenticated users
  if (session?.role) {
    const rolePath = `/${String(session.role).toLowerCase()}`;
    const isCorrectPath = path.startsWith(`${rolePath}/`) || path === rolePath;

    if (!isCorrectPath) {
      console.log(`Role mismatch, redirecting to ${rolePath}/dashboard from:`, path);
      return NextResponse.redirect(new URL(`${rolePath}/dashboard`, request.url));
    }
  }

  console.log('No redirects needed, proceeding:', path);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};