import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import Post from "../../../../helpers/db/models/post";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();
    const post = await Post.findById({ _id: req.query.id });

    if (!post) {
      await closeConnection();
      res.status(404).json({ error: "Image Not Found!" });
      return;
    }

    res.setHeader("Content-Type", "image/png");

    res.send(post.image);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
