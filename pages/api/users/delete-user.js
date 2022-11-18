import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  try {
    await connectToDatabase();
    const session = await getSession({ req });

    if (!session) {
      await closeConnection();
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const user = await User.findOne({ email: session.user.email });
    await user.remove();

    await closeConnection();
    res.status(200).json({
      message: "Account Deleted!",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
