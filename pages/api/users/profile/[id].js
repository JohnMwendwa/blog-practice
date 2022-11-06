import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import User from "../../../../helpers/db/models/user";

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    const user = await User.findById({ _id: req.query.id });

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.setHeader("Content-Type", "image/png");
    await closeConnection();

    res.status(200).json(user.avatar);
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
}
