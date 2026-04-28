import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import User from "../models/User";
import { sendResponse } from "../utils/responseHandler";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response) => {

    const users = await User.find({
      orgId:(req as any).user.orgId
    }).select("name email");

      await sendResponse({
        res,
        statusCode: 200,
        message: "Users fetched",
        data: users,
      });
  },
);
