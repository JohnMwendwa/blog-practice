import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import User from "../../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  try {
    await connectToDatabase();

    const session = await getSession({ req });

    if (!session || !session.user.isAdmin) {
      await closeConnection();
      res.status(401).json({ error: "Unauthorized Access!" });
      return;
    }

    const user = await User.findById({ _id: req.body.id }).select(
      "+superAdmin"
    );
    const currentUser = await User.findOne({
      email: session.user.email,
    }).select("+superAdmin");

    if (!user) {
      await closeConnection();
      res.status(404).json({ error: "User Not Found" });
      return;
    }

    // Disallow the super admin from deleting their account
    if (user.superAdmin && currentUser.superAdmin) {
      await closeConnection();
      res
        .status(401)
        .json({ error: "Sorry Boss,you can't delete your account!" });
      return;
    }

    // Super admin can delete an admin
    if (user.isAdmin && currentUser.superAdmin) {
      await user.remove();
      await closeConnection();
      res.status(201).json(user);

      return;
    }

    //An admin can't delete super admin account
    if (user.superAdmin) {
      await closeConnection();
      res.status(401).json({ error: "User above your clearance!" });
      return;
    }

    // An admin can't delete another admin
    if (user.isAdmin) {
      await closeConnection();
      res.status(401).json({ error: "You can't remove another admin!" });
      return;
    }

    await user.remove();

    await closeConnection();

    res.status(201).json({
      message: "Account Deleted!",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
