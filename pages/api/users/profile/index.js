import nextConnect from "next-connect";
import { getSession } from "next-auth/react";
import sharp from "sharp";

import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
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
  .use(upload.single("avatar"))
  .post(async (req, res) => {
    try {
      await connectToDatabase();

      const session = await getSession({ req });

      if (!session) {
        await closeConnection();
        res.status(401).json({ message: "Unauthaurized access!" });
        return;
      }

      const avatar = await sharp(req.file.buffer)
        .resize({ width: 80, height: 80 })
        .png()
        .toBuffer();

      const user = await User.findOne({ email: session.user.email });
      user.avatar = avatar;
      await user.save();

      await closeConnection();

      res.status(201).json({ message: "Profile photo updated" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: e.message });
    }
  })
  .get(async (req, res) => {
    try {
      await connectToDatabase();

      const session = await getSession({ req });

      if (!session) {
        await closeConnection();
        res.status(401).json({ message: "Unauthaurized access!" });
        return;
      }

      const user = await User.findOne({ email: session.user.email });
      res.setHeader("Content-Type", "image/jpg");
      await closeConnection();
      console.log(user.avatar);
      res.send(user.avatar);
    } catch (e) {
      console.log(e.message);
      res.status(404).json({ error: e.message });
    }
  });
export default handler;
