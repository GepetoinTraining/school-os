import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { authConfig } from './auth.config';

const SignInSchema = z.object({
  email: z.string().email(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'SchoolOS Identity',
      credentials: {
        email: { label: "Email", type: "email" },
      },
      authorize: async (credentials) => {
        const { email } = await SignInSchema.parseAsync(credentials);
        
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Identity not recognized.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.role, // Mapping Role to Name for easy Edge access
        };
      },
    }),
  ],
});