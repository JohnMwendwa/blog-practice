import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();
    const session = await getSession({ req });

    if (!session && !session.user.name.isAuthenticated) {
      await closeConnection();
      res.status(401).json({ error: "Unauthorized access!" });
      return;
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      await closeConnection();
      res.status(404).json({ error: "User Not Found" });
      return;
    }

    const posts = await Post.find({ author: user._id });

    await closeConnection();

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
