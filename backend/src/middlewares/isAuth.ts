import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/AppError";

export const protect = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new ApiError(401,"Unauthorized"));

  try {
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!!);
    (req as any).user = {
      id:decoded.userId,
      orgId:decoded.orgId,
      role:decoded.role
    };
    next();
  } catch {
    next(new ApiError(401,"Invalid token"));
  }
};

