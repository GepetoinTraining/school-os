import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig, 
  // FIX: Explicitly re-state strategy: 'jwt' here.
  // Without this, the presence of 'adapter' forces NextAuth to 'database' strategy,
  // which breaks Credentials authentication.
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Bio-ID",
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        // FIX: Relaxed validation for Bio-ID only (Alpha Phase)
        const parsed = z
          .object({ email: z.string().email() })
          .safeParse(credentials);

        if (parsed.success) {
          const { email } = parsed.data;
          const user = await prisma.user.findUnique({ where: { email } });
          
          if (!user) return null;

          // Note: We return the raw Prisma user here (with Date objects).
          // The 'jwt' callback in auth.config.ts MUST sanitize this before it reaches the client.
          return user;
        }
        return null;
      },
    }),
  ],
});