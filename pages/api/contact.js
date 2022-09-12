import { MongoClient } from "mongodb";
const DB_URL = process.env.mongo_url;
const client = new MongoClient(DB_URL);

const insertDocument = (doc) => {
  const db = client.db();
  const collection = db.collection("Messages");

  return collection.insertOne(doc);
};

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
      await client.connect();
    } catch (e) {
      res.status(500).json({
        error: "Failed to connect to the database!",
      });
      return;
    }

    try {
      const result = await insertDocument(newMessage);
      newMessage.id = result.insertedId;

      res.status(201).json({
        message: "Message sent successfuly 😎",
        data: newMessage,
      });
    } catch (e) {
      res
        .status(500)
        .json({ error: "Failed to inser document in the database!" });
      return;
    }
    client.close();
  }
}
