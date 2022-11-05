import nextConnect from "next-connect";
import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import Post from "../../../helpers/db/models/post";
import User from "../../../helpers/db/models/user";
import { upload } from "../../../helpers/upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: "Page Not Found" });
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {
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

      const user = await User.findOne({ email: session.user.email });

      const { title, description, markdown, category } = req.body;

      const post = new Post({
        title,
        description,
        markdown,
        image: req.file.buffer,
        category,
        author: user._id,
      });

      await post.save();
      await closeConnection();

      res.status(201).json({ message: "Article created successfully" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        error: e.message,
      });
    }
  });

export default handler;
