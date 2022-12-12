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

    if (!session.user.isAdmin) {
      await closeConnection();
      res.status(401).json({ error: "Unauthaurized access!" });
      return;
    }

    const users = await User.find({});

    await closeConnection();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
