import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const tokenSec =
    req.body.tokenSec || req.cookies.tokenSec || "Sandy";
  if (!tokenSec) return res.status(401).json({ message: "Unauthorized , Invalid TokenSec" });
  try {
    console.log(tokenSec)
    const tokenSecret = process.env.JWT_SECRET || "Sandy";
    console.log(tokenSecret)
    const decoded = jwt.verify(tokenSec, tokenSecret);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Unauthorized")
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { auth };
