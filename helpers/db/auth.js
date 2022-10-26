import { hash } from "bcrypt";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 8);

  return hashedPassword;
}
