import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { getActivityLogService } from "../services/activityService";
import { sendResponse } from "../utils/responseHandler";

export const getActivityLogs = asyncHandler(
  async (req: Request, res: Response) => {
    const logs = await getActivityLogService(req.params.id, (req as any).user);

    await sendResponse({ res, message: "log fetched", data: logs });
  },
);
