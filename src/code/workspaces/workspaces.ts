import pool from "../../../DB/db";
import express from "express";
import { checkJwt } from "../../middleware/checkJwt";
import { checkExistingSubdomain } from "../../helpers/checkExisting";
import { queryMakerInsert, queryMakerSelect } from "../../../DB/queryMaker";
import { TableName } from "../../types/tableName.enum";
import { HttpStatusCodesEnum } from "../../types/httpStatusCodes.enum";

const router = express.Router();
router.post("/", checkJwt, async (req, res) => {
  const { name, user_id } = req.body;
  const subdomain = name.toLowerCase().replace(/\s+/g, "-");

  const subdomainExists = await checkExistingSubdomain(subdomain);

  if (subdomainExists) {
    return res
      .status(HttpStatusCodesEnum.ALREADY_EXISTS)
      .json({ error: "Subdomain already exists" });
  }

  const params = { name, user_id, subdomain };

  try {
    const insertQuery = queryMakerInsert(TableName.WORKSPACES, params);
    await pool.query(insertQuery, [name, user_id, subdomain]);
    return res
      .status(HttpStatusCodesEnum.CREATED)
      .json({ message: "Workspace created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCodesEnum.SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

router.get("/", checkJwt, async (req, res) => {
  const { user_id } = req.body;
  const params = { user_id };
  try {
    const insertQuery = queryMakerSelect(TableName.WORKSPACES, params);
    const result = await pool.query(insertQuery, [user_id]);

    res.status(HttpStatusCodesEnum.OK).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCodesEnum.SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

export default router;
