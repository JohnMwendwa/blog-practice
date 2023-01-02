import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";
import { verifyPassword } from "../../../helpers/db/auth";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          await closeConnection();
          throw new Error("Invalid email or password");
        }

        const isMatch = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          await closeConnection();
          throw new Error("Invalid email or password");
        }

        await closeConnection();

        return {
          email: user.email,
          image: `/api/users/profile/${user._id}/avatar`,
          name: user.firstName,
          id: user._id,
          isAdmin: user.isAdmin,
          isAuthenticated: user.isAuthenticated,
        };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};

export default NextAuth(authOptions);
