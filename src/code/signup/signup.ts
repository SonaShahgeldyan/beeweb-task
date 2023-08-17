import express from "express";
import pool from "../../../DB/db";
import checkExistingEmailOrUsername from "../../helpers/checkExisting";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const { username, email, password } = req.body;

  try {
    const emailExists = await checkExistingEmailOrUsername(email, null);
    const usernameExists = await checkExistingEmailOrUsername(null, username);

    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (usernameExists) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const insertQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    await pool.query(insertQuery, [username, email, password]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
