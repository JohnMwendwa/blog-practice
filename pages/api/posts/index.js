import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectToDatabase();

    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
    });

    await post.save();
    await closeConnection();

    res.status(201).json({
      message: "New article created",
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
