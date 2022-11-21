import { getSession } from "next-auth/react";
import { connectToDatabase, closeConnection } from "../../../../helpers/db/db";
import User from "../../../../helpers/db/models/user";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return;
  }
}
