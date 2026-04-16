import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateToken = async (user:any) => {
  return jwt.sign(
    {
      userId: user._id,
      orgId: user.orgId,
      role: user.role,
    },
    process.env.JWT_SECRET!!,
    { expiresIn: "1d" },
  );
};
