import startDb from "@/lib/db";
import UserModel from "../../../../models/userModel";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import clientPromise from "@/lib/db";

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
  callbacks: {
    jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user = {
          id: token.id,
          role: token.role,
        };
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

module.exports = {
  GET: authHandler,
  POST: authHandler,
};
