import nextConnect from "next-connect";
import sharp from "sharp";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import Post from "../../../../helpers/db/models/post";
import User from "../../../../helpers/db/models/user";
import { upload } from "../../../../helpers/upload";

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
  .patch(async (req, res) => {
    try {
      await connectToDatabase();

      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session || !session.user.isAuthenticated) {
        await closeConnection();
        res.status(401).json({ error: "Unauthorized access!" });
        return;
      }
      // Initialize an image string
      let image;

      if (req.file) {
        image = await sharp(req.file.buffer)
          .resize({ width: 300, height: 170 })
          .png()
          .toBuffer();
      }

      const user = await User.findOne({ email: session.user.email });
      const post = await Post.findOne({ slug: req.query.slug });

      if (!user._id.equals(post.author)) {
        await closeConnection();
        res
          .status(401)
          .json({ error: "You have no permission to modify this resource!" });
        return;
      }

      const { title, description, markdown, category } = req.body;

      if (!image) {
        post.title = title;
        post.description = description;
        post.markdown = markdown;
        post.category = category;
      } else {
        post.title = title;
        post.description = description;
        post.markdown = markdown;
        post.category = category;
        post.image = image;
      }

      await post.save();
      await closeConnection();

      res.status(201).json({ message: "Article updated successfully" });
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  });

export default handler;
