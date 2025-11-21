import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login', // Redirect back to login on error
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnFlow = nextUrl.pathname.startsWith('/flow');
      const isOnPortal = nextUrl.pathname.startsWith('/portal');
      const isOnPublic = !nextUrl.pathname.startsWith('/(app)') && !nextUrl.pathname.startsWith('/api');

      // 1. Redirect Unauthenticated Users
      if (!isLoggedIn) {
        // Allow public routes (landing, enroll, live-map)
        if (isOnPublic) return true;
        return false; // Redirect to /login
      }

      // 2. Role-Based Redirects (The Immune System)
      const role = (auth.user as any).role || 'STUDENT'; // Default to safest role

      // A. STUDENTS
      if (role === 'STUDENT') {
        if (isOnPortal) return true;
        // Redirect Student to Portal if they try to go anywhere else
        return Response.redirect(new URL('/portal', nextUrl));
      }

      // B. TEACHERS
      if (role === 'TEACHER') {
        // Teachers belong in Flow or specific Student views
        if (isOnFlow || nextUrl.pathname.startsWith('/students')) return true;
        // Redirect Teacher to Flow HUD if they try to go to Finance/Dashboard
        if (isOnDashboard || nextUrl.pathname.startsWith('/finance')) {
            return Response.redirect(new URL('/flow', nextUrl));
        }
        return true;
      }

      // C. ADMINS
      if (role === 'ADMIN') {
        return true; // Admins go everywhere
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