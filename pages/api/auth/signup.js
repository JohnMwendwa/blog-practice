import { connectToDatabase, closeConnection } from "../../../helpers/db/db";
import { hashPassword } from "../../../helpers/db/auth";
import User from "../../../helpers/db/models/user";

export default async function handler(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message: "Invalid input - password should not be less than 7 characters",
    });
  }

  try {
    connectToDatabase();

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

    closeConnection();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
