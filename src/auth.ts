import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig, // <--- Inherits 'session: { strategy: 'jwt' }'
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        // FIX: Relaxed validation for Bio-ID only (Alpha Phase)
        const parsed = z
          .object({ email: z.string().email() })
          .safeParse(credentials);

        if (parsed.success) {
          const { email } = parsed.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;
          return user;
        }
        return null;
      },
    }),
  ],
});