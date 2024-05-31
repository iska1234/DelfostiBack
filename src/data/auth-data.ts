import { query } from "../db/index";
import { Users } from "../models/users";
import bcrypt from 'bcryptjs';

export async function registerUser(
  name: string,
  email: string,
  password: string,
  age: number,
  role: string
): Promise<Users> {

  const insertedUser = (
    await query(
      "INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, age, role]
    )
  ).rows[0];

  const userWithoutPassword = await query("SELECT id, name, email, age, role FROM users WHERE id = $1", [
    insertedUser.id,
  ]);

  return userWithoutPassword.rows[0];
}

export async function loginUser(
  email: string,
  password: string
): Promise<Users | null> {
  const { rows, rowCount } = await query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (rowCount === 0) return null;

  const user = rows[0];
  const storedHashedPassword = user.password;

  const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
  if (!passwordMatch) return null;

  return user;
}



export async function getUserIdByEmail(
  email: string
): Promise<number | null> {
  const { rows, rowCount } = await query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (rowCount === 0) return null;

  return rows[0].id;
}

export async function verifyEmail(
  email: string
): Promise<number | null> {
  const { rows, rowCount } = await query(
    "SELECT email FROM users WHERE email = $1",
    [email]
  );

  if (rowCount === 0) return null;

  return rows[0].id;
}
