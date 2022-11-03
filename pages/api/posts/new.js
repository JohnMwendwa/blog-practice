import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectToDatabase();

    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unauthaurized access!" });
      return;
    }

    if (!session.user.name.isAuthenticated) {
      res.status(401).json({ message: "Unauthaurized access!" });
      return;
    }

    const { title, description, markdown } = req.body;

    const post = new Post({
      title,
      description,
      markdown,
    });

    await post.save();
    await closeConnection();

    res.status(201).json({ message: "Article created successfully" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
