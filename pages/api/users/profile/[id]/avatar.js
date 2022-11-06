import {
  connectToDatabase,
  closeConnection,
} from "../../../../../helpers/db/db";
import User from "../../../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectToDatabase();
    const user = await User.findById({ _id: req.query.id });

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.setHeader("Content-Type", "image/png");
    await closeConnection();

    res.send(user.avatar);
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
}
