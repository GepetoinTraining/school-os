import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // FIX: Handle the 'undefined' possibility safely
        token.id = user.id || ''; 
        token.role = (user as any).role;
        token.studentId = (user as any).studentId;
        token.teacherId = (user as any).teacherId;
        
        // React 19 Compat: Sanitize Date objects to strings
        token.createdAt = (user as any).createdAt?.toISOString 
          ? (user as any).createdAt.toISOString() 
          : new Date().toISOString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).studentId = token.studentId;
        (session.user as any).teacherId = token.teacherId;
        (session.user as any).createdAt = token.createdAt;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role || 'STUDENT';
      
      const publicRoutes = ['/', '/home', '/about', '/courses', '/enroll', '/live-map', '/login'];
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname === route || nextUrl.pathname.startsWith(route + '/')
      );

      if (!isLoggedIn) {
        if (isPublicRoute) return true;
        return false;
      }

      if (role === 'STUDENT' && !nextUrl.pathname.startsWith('/portal')) {
        if (isPublicRoute) return true;
        return Response.redirect(new URL('/portal', nextUrl));
      }

      if (role === 'TEACHER' && nextUrl.pathname.startsWith('/portal')) {
        return Response.redirect(new URL('/flow', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;