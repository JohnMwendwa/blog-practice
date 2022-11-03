import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();

    const posts = await Post.find({});
    await closeConnection();

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
