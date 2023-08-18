import pool from "../../DB/db";
import { queryMakerSelect } from "../../DB/queryMaker";
import { TableName } from "../types/tableName.enum";

export async function checkExistingEmailOrUsername(
  username: string
): Promise<boolean> {
  const params = { username };
  const query = queryMakerSelect(TableName.USERS, params);
  const result = await pool.query(query, [username]);
  return result.rows.length > 0;
}

export async function checkExistingSubdomain(subdomain: string) {
  const params = { subdomain };
  const insertQuery = queryMakerSelect(TableName.WORKSPACES, params);
  const result = await pool.query(insertQuery, [subdomain]);

  return result.rows.length > 0;
}

export async function checkExistingChannel(name: string) {
  const params = { name };
  const insertQuery = queryMakerSelect(TableName.CHANNELS, params);
  const result = await pool.query(insertQuery, [name]);

  return result.rows.length > 0;
}
