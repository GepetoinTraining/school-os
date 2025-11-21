import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/about');
  const isAuthRoute = nextUrl.pathname.startsWith('/login');
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/finance') || nextUrl.pathname.startsWith('/students');

  // 1. API Routes are always open
  if (isApiAuthRoute) return NextResponse.next();

  // 2. Auth Route (Login)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Public Route (Landing)
  // If logged in user hits '/', redirect to dashboard
  if (isPublicRoute) {
    if (isLoggedIn) {
       return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  // 4. Protected Routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};