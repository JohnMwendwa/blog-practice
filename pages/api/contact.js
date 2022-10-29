import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../helpers/db/db";
import Message from "../../helpers/db/models/message";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ error: "Invalid input" });
    }

    const formatedName = name.trim();
    const formatedEmail = email.trim().toLowerCase();
    const formatedMessage = message.trim();

    const newMessage = {
      name: formatedName,
      email: formatedEmail,
      message: formatedMessage,
    };

    try {
      await connectToDatabase();
    } catch (e) {
      res.status(500).json({
        error: "Failed to connect to the database!",
      });
      return;
    }

    try {
      await Message.create(newMessage);

      res.status(201).json({
        message: "Message sent successfuly 😎",
      });
    } catch (e) {
      res
        .status(500)
        .json({ error: "Failed to inser document in the database!" });
      return;
    }

    await closeConnection();
  }

  if (req.method === "GET") {
    const session = getSession({ req });

    if (!session.user.name.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    try {
      await connectToDatabase();
    } catch (e) {
      res.status(500).json({
        error: "Failed to connect to the database!",
      });
    }

    const messages = await Message.find({});

    await closeConnection();
    res.status(200).json(messages);
  }

  return;
}
