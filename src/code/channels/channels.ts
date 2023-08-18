import pool from "../../../DB/db";
import express from "express";
import { checkJwt } from "../../middleware/checkJwt";
import { checkExistingChannel } from "../../helpers/checkExisting";
import {
  queryMakerDelete,
  queryMakerInsert,
  queryMakerSelect,
} from "../../../DB/queryMaker";
import { TableName } from "../../types/tableName.enum";
import { HttpStatusCodesEnum } from "../../types/httpStatusCodes.enum";

const router = express.Router();
router.post("/:workspaceId", checkJwt, async (req, res) => {
  const { name, user_id } = req.body;
  const workspace_id = req.params.workspaceId;
  console.log(workspace_id);
  const chanelExists = await checkExistingChannel(name);

  if (chanelExists) {
    return res
      .status(HttpStatusCodesEnum.ALREADY_EXISTS)
      .json({ error: "Channel already exists" });
  }
  const params = { name, user_id, workspace_id };

  try {
    const insertQuery = queryMakerInsert(TableName.CHANNELS, params);
    console.log(":::", insertQuery);
    await pool.query(insertQuery, [name, user_id, workspace_id]);
    return res
      .status(HttpStatusCodesEnum.CREATED)
      .json({ message: "Channel created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCodesEnum.SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

router.get("/:workspaceId", checkJwt, async (req, res) => {
  const workspace_id = req.params.workspaceId;

  const params = { workspace_id };
  try {
    const insertQuery = queryMakerSelect(TableName.CHANNELS, params);
    const result = await pool.query(insertQuery, [workspace_id]);

    res.status(HttpStatusCodesEnum.OK).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCodesEnum.SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
});

router.delete("/:id", checkJwt, async (req, res) => {
  const channelId = req.params.id;
  const user_id = req.body.user_id;

  try {
    const params = { id: channelId };

    const checkOwnershipQuery = queryMakerSelect(TableName.CHANNELS, params);

    const ownershipResult = await pool.query(checkOwnershipQuery, [channelId]);

    if (
      !ownershipResult.rows.length ||
      ownershipResult.rows[0].user_id !== user_id
    ) {
      return res
        .status(HttpStatusCodesEnum.FORBIDDEN)
        .json({ error: "You do not have permission to delete this channel" });
    }

    const deleteQuery = queryMakerDelete(TableName.CHANNELS, params);
    await pool.query(deleteQuery, [channelId]);

    return res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
