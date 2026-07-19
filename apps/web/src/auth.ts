import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as Parameters<typeof PrismaAdapter>[0]),

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      checks: ["state"],
      allowDangerousEmailAccountLinking: true,
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      id: "credentials",
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = credentials.email as string;

        // Auto-upsert special bypass for Instant Demo Access
        if (email === "demo@synora.ai") {
          return await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
              email,
              name: "Demo User",
              image: `https://avatar.iran.liara.run/public/boy?username=Demo`,
            },
          });
        }

        // Look up standard user in the database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null; // Triggers CredentialsSignin error on the client
        }

        return user;
      }
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as typeof session.user & { id: string }).id = token.id as string;
      }
      return session;
    },
  },
});