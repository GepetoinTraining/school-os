import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.name; // Using name field as Role carrier for now
  const isOnDashboard = req.nextUrl.pathname === '/';
  const isOnFinance = req.nextUrl.pathname.startsWith('/finance');
  const isOnSettings = req.nextUrl.pathname.startsWith('/settings');
  const isOnLogin = req.nextUrl.pathname.startsWith('/login');

  // 1. Redirect unauthenticated traffic to the Gate
  if (!isLoggedIn && !isOnLogin) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 2. Redirect authenticated users away from the Gate
  if (isLoggedIn && isOnLogin) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 3. RBAC: Teacher Containment Protocol
  if (role === 'TEACHER') {
    // Teachers should not see Finance or Settings
    if (isOnFinance || isOnSettings) {
      return NextResponse.redirect(new URL('/flow', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  // Matcher ignores static files and api routes for efficiency
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};