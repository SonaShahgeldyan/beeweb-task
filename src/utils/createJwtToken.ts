import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/JwtPayload";
import { jwtSecret, jwtExpiresIn } from "../config/jwt.config";

export const createJwtToken = (
  payload: JwtPayload,
  expiresIn: string | undefined = jwtExpiresIn
): string => {
  return jwt.sign(payload, jwtSecret!, {
    expiresIn,
  });
};
