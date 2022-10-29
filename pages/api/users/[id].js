import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const { id } = req.query;

  try {
    await connectToDatabase();

    const session = await getSession({ req });

    if (!session.user.name.isAdmin) {
      res.status(401).json({ message: "Unauthaurized access!" });
      return;
    }

    const user = await User.findById({ _id: id });

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
