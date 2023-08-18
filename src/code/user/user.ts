import pool from "../../../DB/db";
import { queryMakerSelect } from "../../../DB/queryMaker";
import { checkJwt } from "../../middleware/checkJwt";
import express, { Request, Response } from "express";
import { TableName } from "../../types/tableName.enum";
import { HttpStatusCodesEnum } from "../../types/httpStatusCodes.enum";

const router = express.Router();

router.get("/", checkJwt, async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const params = { id: user_id };
    const query = queryMakerSelect(TableName.USERS, params);
    const result = await pool.query(query, [user_id]);
    const data = result.rows[0];
    console.log(result);
    res.status(HttpStatusCodesEnum.OK).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCodesEnum.UNAUTHORIZED)
      .json({ error: "Invalid credentials" });
  }
  return null;
});

export default router;
