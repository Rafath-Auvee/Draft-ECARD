import startDb from "@/lib/db";
import UserModel from "../../../../models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await startDb();

        const user = await UserModel.findOne({ email });

        if (!user) throw new Error("email/password mismatch!");

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw new Error("email/password mismatch");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    // signOut: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      // if (session.user) {
      //   session.user.id = token.id;
      //   session.user.role = token.role;
      // }

      // console.log(session);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.idont = "token.email";
        session.user.role = token.role;
      }
      // console.log(session)

      // console.log("token", token);
      // console.log("session", session);

      return session;
    },
    async jwt({ token, user }) {
      try {
        const dbUser = await UserModel.findOne({ email: token.email }).timeout(
          20000
        );

        if (!dbUser) {
          token.id = user ? user.id : token.id;
          return token;
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
        };
      } catch (error) {
        console.error("Database operation timed out:", error);
        return token;
      }
    },
  },
};

const authHandler = NextAuth(authOptions);

module.exports = {
  GET: authHandler,
  POST: authHandler,
};
