/**
 * NextAuth v5 configuration — Credentials provider with JWT session strategy.
 *
 * Auth flow:
 *   1. User submits email + password to /api/auth/callback/credentials (via NextAuth).
 *   2. `authorize()` validates input with Zod, queries the DB for the user, and
 *      runs bcrypt.compare against the stored hash.
 *      A dummy hash is compared when the user does not exist to prevent
 *      timing-based user-enumeration attacks.
 *   3. On success, NextAuth issues a signed JWT containing `id` (user UUID).
 *      The `jwt` callback copies `id` from the user object into the token,
 *      and the `session` callback exposes it as `session.user.id`.
 *   4. The JWT is stored in a cookie:
 *      - Dev:  "authjs.session-token"  (plain HTTP, localhost)
 *      - Prod: "__Secure-authjs.session-token" (Secure flag, HTTPS only)
 *   5. middleware.ts reads the token with `getToken()` using the same cookie
 *      name to protect /dashboard routes.
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "./db";
import { users } from "./schema";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const isProduction = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: isProduction
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: isProduction,
      },
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        let user;
        try {
          const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
          user = result[0];
        } catch (err) {
          console.error("db query error:", err);
          return null;
        }

        // Always run bcrypt.compare to prevent timing-based user enumeration.
        const passwordMatch = await bcrypt.compare(
          password,
          user?.password ?? "$2b$12$invalidhashfortimingprevention"
        );

        if (!user || !passwordMatch) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
