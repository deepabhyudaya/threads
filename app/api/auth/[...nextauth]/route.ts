import { db } from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // create db user
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });
      if (dbUser) return true;

      await db.user.create({
        data: {
          id: user.id,
        },
      });

      return true;
    },
    async jwt({ token, user, account, profile }) {
      // when sign in
      if (!!user) {
        return {
          sub: user.id,
          email: user.email,
          name: user.name,
          picture: user.image,
        };
      }

      // when access session
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
