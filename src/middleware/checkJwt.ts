import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt.config";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }
  jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.body.username = decoded.username;
    return next();
  });
  return null;
}
