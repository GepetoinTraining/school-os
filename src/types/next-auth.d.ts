import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string // <--- Override default optional ID
    role: string
    studentId?: string
    teacherId?: string
    createdAt: Date | string
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      role: "STUDENT" | "TEACHER" | "ADMIN" | string
      studentId?: string
      teacherId?: string
      createdAt: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string
    role: string
    studentId?: string
    teacherId?: string
    createdAt: string
  }
}