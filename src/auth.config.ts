import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // This runs on the Edge to check if the token is valid
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname === '/';
      const isOnFinance = nextUrl.pathname.startsWith('/finance');
      const isOnSettings = nextUrl.pathname.startsWith('/settings');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // 1. Redirect unauthenticated users to Login
      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true; // Allow access to login page
      }

      if (!isLoggedIn) {
        return false; // Redirect to login
      }

      // 2. RBAC: Teacher Containment Protocol
      // We use the 'name' field as a temporary carrier for the Role to avoid complex type extension in Alpha
      const role = auth.user?.name; 

      if (role === 'TEACHER') {
         if (isOnFinance || isOnSettings || isOnDashboard) {
            // Teachers belong in the Flow HUD
            return Response.redirect(new URL('/flow', nextUrl));
         }
      }
      
      return true;
    },
    // Ensure the ID and Role are passed to the client/middleware
    async session({ session, token }) {
        if (token.sub && session.user) {
            session.user.id = token.sub;
        }
        return session;
    },
    async jwt({ token, user }) {
        if (user) {
            token.sub = user.id;
            token.name = user.name; // Persist the Role (mapped to name) into the token
        }
        return token;
    }
  },
  providers: [], // Providers are configured in auth.ts to avoid Edge incompatibility
} satisfies NextAuthConfig;