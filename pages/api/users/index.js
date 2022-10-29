import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();

    const session = await getSession({ req });

    if (!session.user.name.isAdmin) {
      res.status(401).json({ message: "Unauthaurized access!" });
      return;
    }

    const users = await User.find({});

    await closeConnection();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
