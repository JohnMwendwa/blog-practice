import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";
import Comment from "../../../helpers/db/models/comment";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectToDatabase();

    const comments = await Comment.find({ postId: req.body.id })
      .populate("user", "firstName lastName", User)
      .sort({ date_uploaded: -1 });

    await closeConnection();
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
