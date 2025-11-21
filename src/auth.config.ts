import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      // 1. DEFINE ZONES
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnFlow = nextUrl.pathname.startsWith('/flow');
      const isOnPortal = nextUrl.pathname.startsWith('/portal');
      
      // 2. EXPANDED WHITELIST (The Skin)
      // Added '/home' and kept '/' open for the Gateway
      const publicRoutes = ['/', '/home', '/about', '/courses', '/enroll', '/live-map', '/login'];
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
      );

      // 3. UNAUTHENTICATED HANDLING
      if (!isLoggedIn) {
        if (isPublicRoute) return true; // Allow Gateway & Landing
        return false; // Redirect to /login
      }

      // 4. AUTHENTICATED ROUTING (The Immune System)
      const role = (auth.user as any).role || 'STUDENT';

      // A. STUDENTS -> Portal Only
      if (role === 'STUDENT') {
        if (isOnPortal) return true;
        return Response.redirect(new URL('/portal', nextUrl));
      }

      // B. TEACHERS -> Flow & Directory
      if (role === 'TEACHER') {
        if (isOnFlow || nextUrl.pathname.startsWith('/students')) return true;
        // Block from Admin Dashboard / Finance
        if (isOnDashboard || nextUrl.pathname.startsWith('/finance')) {
             return Response.redirect(new URL('/flow', nextUrl));
        }
        return true;
      }

      // C. ADMINS -> Everywhere
      if (role === 'ADMIN') {
        return true;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;