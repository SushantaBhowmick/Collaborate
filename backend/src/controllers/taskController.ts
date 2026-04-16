import { success } from "zod";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../services/taskServices";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";

export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await createTaskService(req.body, (req as any).user);
      res.status(201).json({
        success: true,
        msg: "Task created",
        data: task,
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getTasks = asyncHandler(async (req: any, res: any) => {
  const tasks = await getTasksService(req.query, (req as any).user);
  res.status(200).json({
    success: true,
    message: "Tasks fetched",
    data: tasks,
  });
});

export const updateTask = asyncHandler(async (req: any, res: any) => {
  const tasks = await updateTaskService(
    req.params.id,
    req.body,
    (req as any).user,
  );
  res.status(200).json({
    success: true,
    message: "Tasks Updated",
    data: tasks,
  });
});

export const deleteTask = asyncHandler(async (req: any, res: any) => {
  const tasks = await deleteTaskService(
    req.params.id,
    (req as any).user,
  );
  res.status(200).json({
    success: true,
    message: "Tasks Deleted",
  });
});
