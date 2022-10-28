import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";
import { verifyPassword } from "../../../helpers/db/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          closeConnection();
          throw new Error("User doesn't exist");
        }

        const isMatch = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          closeConnection();
          throw new Error("Wrong password");
        }

        closeConnection();

        return {
          email: user.email,
          isAdmin: user.isAdmin,
          firstName: user.firstName,
        };
      },
    }),
  ],
});
