import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import User from "../../../helpers/db/models/user";
import Comment from "../../../helpers/db/models/comment";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
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

    const { commentId, message } = req.body;

    const user = await User.findOne({ email: session.user.email });

    const comment = await Comment.findById({ _id: commentId });

    if (!user._id.equals(comment.user)) {
      await closeConnection();
      res
        .status(403)
        .json({ error: "You don't have permission to modify this resource" });
      return;
    }

    comment.body = message;
    await comment.save();

    await closeConnection();

    res.status(200).json({});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
