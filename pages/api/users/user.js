import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "Unauthaurized access!" });
      return;
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    await closeConnection();

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}
