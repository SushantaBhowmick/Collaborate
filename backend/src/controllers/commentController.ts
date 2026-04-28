import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  createCommentService,
  getCommentService,
} from "../services/commentService";
import { sendResponse } from "../utils/responseHandler";
import { ApiError } from "../utils/AppError";

export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { text, taskId } = req.body;

    if (!text?.trim()) {
      throw new ApiError(400, "Comment cannot be empty");
    }

    const comment = await createCommentService(text, taskId, (req as any).user);
    await sendResponse({
      res,
      statusCode: 201,
      data: comment,
      message: "Comment added Successfully",
    });
  },
);

export const getComment = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const comments = await getCommentService(taskId, (req as any).user);
  await sendResponse({
    res,
    statusCode: 200,
    data: comments,
    message: "Comments fetched",
  });
});
