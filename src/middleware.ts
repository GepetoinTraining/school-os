import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// We delegate ALL routing logic to the 'authorized' callback in auth.config.ts
export default NextAuth(authConfig).auth;

export const config = {
  // Matcher ignores static assets and API routes to keep performance high
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};