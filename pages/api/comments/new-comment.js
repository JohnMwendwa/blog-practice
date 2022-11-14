import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";
import Comment from "../../../helpers/db/models/comment";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectToDatabase();
    const session = await getSession({ req });

    if (!session) {
      await closeConnection();
      res
        .status(401)
        .json({ error: "Only logged in users are allowed to comment!" });
      return;
    }

    const { postId, message, parentId } = req.body;

    const user = await User.findOne({ email: session.user.email });
    const newComment = new Comment({
      postId,
      parentId,
      user: user._id,
      body: message,
    });
    const comment = await newComment.save();

    await closeConnection();
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
