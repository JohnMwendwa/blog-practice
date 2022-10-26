import { hash, compare } from "bcrypt";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 8);

  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isMatch = await compare(password, hashedPassword);

  return isMatch;
}
