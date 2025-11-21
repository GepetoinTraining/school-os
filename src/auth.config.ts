import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // FIX: Explicitly force JWT here so Middleware knows what to look for
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnFlow = nextUrl.pathname.startsWith('/flow');
      const isOnPortal = nextUrl.pathname.startsWith('/portal');
      
      const publicRoutes = ['/', '/home', '/about', '/courses', '/enroll', '/live-map', '/login'];
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
      );

      if (!isLoggedIn) {
        if (isPublicRoute) return true;
        return false;
      }

      const role = (auth.user as any).role || 'STUDENT';

      if (role === 'STUDENT') {
        if (isOnPortal) return true;
        return Response.redirect(new URL('/portal', nextUrl));
      }

      if (role === 'TEACHER') {
        if (isOnFlow || nextUrl.pathname.startsWith('/students')) return true;
        if (isOnDashboard || nextUrl.pathname.startsWith('/finance')) {
             return Response.redirect(new URL('/flow', nextUrl));
        }
        return true;
      }

      if (role === 'ADMIN') return true;

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
  providers: [],
} satisfies NextAuthConfig;