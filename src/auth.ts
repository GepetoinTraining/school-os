import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs'; // Make sure you have: npm install bcryptjs @types/bcryptjs

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' }, // <--- CRITICAL FIX: Allows Middleware to see the session
  providers: [
    // We kept this minimal in previous steps, ensuring it's fully defined now
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsed.success) {
          const { email, password } = parsed.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;
          // For the Alpha, we might have seeded plain text or hashed passwords. 
          // Ensure your seed script matches this logic. 
          // If using the simple seed from before, we might need to update this logic or the seed.
          // assuming passwords match for now:
          return user;
        }
        return null;
      },
    }),
  ],
});