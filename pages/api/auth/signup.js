import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import { hashPassword } from "../../../helpers/db/auth";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!email.trim() || !email.includes("@")) {
    res.status(400).json({
      error: "Invalid Email!",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords don't match!" });
    return;
  }

  if (!password || password.trim().length < 7) {
    return res.status(400).json({
      error: "Password should not be less than 7 characters",
    });
  }

  try {
    await connectToDatabase();

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
    });

    await closeConnection();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
