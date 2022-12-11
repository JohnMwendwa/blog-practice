import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import { hashPassword, verifyPassword } from "../../../helpers/db/auth";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  try {
    await connectToDatabase();

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      await closeConnection();
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword.trim() || !newPassword.trim()) {
      await closeConnection();
      res.status(400).json({
        error: "Cannot set empty password",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      await closeConnection();
      res
        .status(400)
        .json({ error: "New password and confirm password don't match" });
      return;
    }

    if (newPassword.trim().length < 7) {
      await closeConnection();
      res.status(400).json({
        error: "Password can't be less than 7 characters",
      });
      return;
    }

    const user = await User.findOne({ email: session.user.email });

    const isMatch = await verifyPassword(oldPassword, user.password);

    if (!isMatch) {
      await closeConnection();
      res.status(400).json({ error: "Invalid old password" });
      return;
    }

    const newHashedPassword = await hashPassword(newPassword);

    user.password = newHashedPassword;
    await user.save();
    await closeConnection();

    res.status(200).json({ message: "Password updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
