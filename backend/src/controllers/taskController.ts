import { success } from "zod";
import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "../services/taskServices";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { sendResponse } from "../utils/responseHandler";

export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await createTaskService(req.body, (req as any).user);

      await sendResponse({
        res,
        statusCode: 201,
        message: "Task created",
        data: task,
        log: {
          action: "TASK_CREATED",
          user: (req as any).user,
          entityId: task.id,
          entityType: "TASK",
          message: `Task created`,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getTasks = asyncHandler(async (req: any, res: any) => {
  const tasks = await getTasksService(req.query, (req as any).user);
  await sendResponse({
    res,
    statusCode: 200,
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
    await sendResponse({
        res,
        statusCode: 200,
        message: "Task Updated",
        data: tasks,
        log: {
          action: "TASK_UPDATED",
          user: (req as any).user,
          entityId: tasks.id,
          entityType: "TASK",
          message: `Task Updated`,
        },
      });

  
});

export const deleteTask = asyncHandler(async (req: any, res: any) => {
  const tasks = await deleteTaskService(req.params.id, (req as any).user);

   await sendResponse({
    res,
    statusCode: 200,
    message: "Tasks Deleted",
     log: {
          action: "TASK_DELETED",
          user: (req as any).user,
          entityId: req.params.id,
          entityType: "TASK",
          message: `Task Deleted`,
        },
  });
});
