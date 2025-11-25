import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // CRITICAL: Force JWT strategy here so Middleware knows what to expect.
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const publicRoutes = ['/', '/home', '/about', '/courses', '/enroll', '/live-map', '/login'];
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
      );

      if (!isLoggedIn) {
        if (isPublicRoute) return true;
        return false;
      }

      // Safe Access with Fallback
      const role = (auth.user as any).role || 'STUDENT';
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnFlow = nextUrl.pathname.startsWith('/flow');
      const isOnPortal = nextUrl.pathname.startsWith('/portal');

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
    async jwt({ token, user }) {
      // Initial sign in: user object is available
      if (user) {
        token.role = (user as any).role;
        
        // FIX: Ensure ID is a string (User.id is optional in default types)
        token.id = user.id || ''; 
        
        // REACT 19 FIX: Sanitize Date objects immediately.
        token.createdAt = (user as any).createdAt?.toISOString?.() ?? new Date().toISOString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Map token data to session
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        
        // Ensure the client receives a string, not a Date object
        (session.user as any).createdAt = token.createdAt;
      }
      return session;
    },
  },
  providers: [], // Keep empty for Middleware compatibility
} satisfies NextAuthConfig;