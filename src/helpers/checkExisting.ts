import pool from "../../DB/db";

async function checkExistingEmailOrUsername(
  email: string,
  username: string
): Promise<boolean> {
  const query = "SELECT * FROM users WHERE email = $1 OR username = $2";
  const result = await pool.query(query, [email, username]);
  return result.rows.length > 0;
}
export default checkExistingEmailOrUsername;
