import pool from "../../../DB/db";
import { checkJwt } from "../../middleware/checkJwt";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    const data = result.rows[0];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid credentials" });
  }
  return null;
});

export default router;
