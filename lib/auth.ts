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

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      // async authorize(credentials) {
      //   const parsed = loginSchema.safeParse(credentials);
      //   if (!parsed.success) return null;

      //   const { email, password } = parsed.data;

      //   const [user] = await db
      //     .select()
      //     .from(users)
      //     .where(eq(users.email, email))
      //     .limit(1);

      //   const passwordMatch = await bcrypt.compare(
      //     password,
      //     user?.password ?? "$2b$12$invalidhashfortimingprevention"
      //   );

      //   if (!user || !passwordMatch) return null;

      //   return { id: user.id, email: user.email };
      // },
      async authorize(credentials) {
  console.log("=== AUTHORIZE CALLED ===");
  console.log("email:", credentials?.email);

  const parsed = loginSchema.safeParse(credentials);
  console.log("zod parsed:", parsed.success);
  if (!parsed.success) {
    console.log("zod errors:", parsed.error.issues);
    return null;
  }

  const { email, password } = parsed.data;

  let user;
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    user = result[0];
    console.log("db query success, user found:", !!user);
  } catch (err) {
    console.log("db query error:", err);
    return null;
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user?.password ?? "$2b$12$invalidhashfortimingprevention"
  );
  console.log("password match:", passwordMatch);

  if (!user || !passwordMatch) return null;

  console.log("returning user:", user.id);
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