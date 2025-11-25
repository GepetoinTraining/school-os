import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// 1. Initialize NextAuth with Manual Control (No Adapter)
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  // We use JWT strategy to avoid DB session lookups on the Edge
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: "Bio-ID",
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        // 1. Validate Input
        const parsed = z
          .object({ email: z.string().email() })
          .safeParse(credentials);

        if (!parsed.success) return null;

        // 2. The "Biological Link": Lookup User + Archetype (Student/Teacher)
        // We include the profiles so we can grab their specific IDs immediately
        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: {
            studentProfile: true, 
            teacherProfile: true,
          }
        });

        if (!user) return null;

        // 3. Return the "Hydrated" User Identity
        // We flatten the profile IDs into the main object so the JWT callback can see them
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          // Extract the specific profile ID based on role
          studentId: user.studentProfile?.id,
          teacherId: user.teacherProfile?.id,
        };
      },
    }),
  ],
});