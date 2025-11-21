import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      async authorize(credentials) {
        // FIX: Removed password requirement to match the Email-only Login Form
        const parsed = z
          .object({ email: z.string().email() })
          .safeParse(credentials);

        if (parsed.success) {
          const { email } = parsed.data;
          
          // 1. Verify if the Node exists in the Metasystem
          const user = await prisma.user.findUnique({ where: { email } });
          
          // 2. If no user found, return null (Access Denied)
          if (!user) return null;
          
          // 3. Grant Access (Bio-ID Verified)
          return user;
        }
        
        console.log('Invalid credentials format');
        return null;
      },
    }),
  ],
});