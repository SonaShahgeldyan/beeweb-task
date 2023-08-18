import express from "express";
import pool from "../../../DB/db";
import { checkExistingEmailOrUsername } from "../../helpers/checkExisting";
import { queryMakerInsert } from "../../../DB/queryMaker";
import { TableName } from "../../types/tableName.enum";
import { HttpStatusCodesEnum } from "../../types/httpStatusCodes.enum";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const params = { username, email, password };

  try {
    const usernameExists = await checkExistingEmailOrUsername(username);

    if (usernameExists) {
      return res
        .status(HttpStatusCodesEnum.ALREADY_EXISTS)
        .json({ error: "Username already exists" });
    }

    const insertQuery = queryMakerInsert(TableName.USERS, params);
    await pool.query(insertQuery, [username, email, password]);

    res
      .status(HttpStatusCodesEnum.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(HttpStatusCodesEnum.SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

export default router;
