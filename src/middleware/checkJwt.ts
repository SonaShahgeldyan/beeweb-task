import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwt.config";
import { HttpStatusCodesEnum } from "../types/httpStatusCodes.enum";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(HttpStatusCodesEnum.UNAUTHORIZED)
      .json({ error: "Unauthorize" });
  }
  jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res
        .status(HttpStatusCodesEnum.UNAUTHORIZED)
        .json({ error: "Invalid token" });
    }

    req.body.user_id = decoded.id;
    return next();
  });
  return null;
}
