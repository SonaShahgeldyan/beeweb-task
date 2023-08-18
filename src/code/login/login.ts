import express, { Request, Response } from "express";
import { createJwtToken } from "../../utils/createJwtToken";
import { JwtPayload } from "../../types/JwtPayload";
import pool from "../../../DB/db";
import comparePasswords from "../../helpers/comparePassword";
import { queryMakerSelect } from "../../../DB/queryMaker";
import { TableName } from "../../types/tableName.enum";
import { HttpStatusCodesEnum } from "../../types/httpStatusCodes.enum";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const params = { username };

    const query = queryMakerSelect(TableName.USERS, params);
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res
        .status(HttpStatusCodesEnum.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const passwordMatch = comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res
        .status(HttpStatusCodesEnum.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }

    const id = user.id;

    const token = createJwtToken({ id, username } as JwtPayload);

    return res.status(HttpStatusCodesEnum.OK).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCodesEnum.UNAUTHORIZED)
      .json({ error: "Invalid credentials" });
  }
});

export default router;
