import express, { Request, Response } from "express";
import { createJwtToken } from "../../utils/createJwtToken";
import { JwtPayload } from "../../types/JwtPayload";
import pool from "../../../DB/db";
import comparePasswords from "../../helpers/comparePassword";
import { checkJwt } from "../../middleware/checkJwt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const passwordMatch = comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const id = user.id;

    const token = createJwtToken({ id, username } as JwtPayload);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
