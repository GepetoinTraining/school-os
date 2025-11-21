import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  
  // EXPANDED PUBLIC ZONE:
  // We explicitly whitelist the new institutional pages.
  const publicRoutes = ['/about', '/courses', '/enroll', '/live-map'];
  const isPublicRoute = 
    nextUrl.pathname === '/' || 
    publicRoutes.some(route => nextUrl.pathname.startsWith(route));

  const isAuthRoute = nextUrl.pathname.startsWith('/login');

  // 1. API Routes are always open
  if (isApiAuthRoute) return NextResponse.next();

  // 2. Auth Route (Login)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Public Route (Landing & Institutional)
  if (isPublicRoute) {
    // Optional: You might want logged-in users to still see public pages. 
    // If so, remove this block. For now, we force them to the cockpit 
    // only if they hit the root landing page, but allow browsing courses.
    if (isLoggedIn && nextUrl.pathname === '/') {
       return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  // 4. Protected Routes (The Internal Organs)
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};