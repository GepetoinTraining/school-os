import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for the "Badge Scan"
const SignInSchema = z.object({
  email: z.string().email(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'SchoolOS Identity',
      credentials: {
        email: { label: "Email", type: "email" },
      },
      authorize: async (credentials) => {
        const { email } = await SignInSchema.parseAsync(credentials);
        
        // The "Bio-ID" Check: Does this node exist?
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Identity not recognized.");
        }

        // Return the Identity Artifact
        return {
          id: user.id,
          email: user.email,
          name: user.role, // Mapping Role to Name for easy access in session
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // We stored the role in the 'name' field temporarily for efficiency
        // Ideally, we'd extend the session type, but this keeps it lean.
        // session.user.role = token.name 
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});