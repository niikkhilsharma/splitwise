import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: [
            "openid email profile https://www.googleapis.com/auth/contacts.readonly",
            // "openid email profile https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts",
          ],
        },
      },
    }),
  ],
});
