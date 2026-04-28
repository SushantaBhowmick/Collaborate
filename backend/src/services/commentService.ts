import Comments from "../models/Comments";
import Project from "../models/Project";
import { Task } from "../models/Task";
import { ApiError } from "../utils/AppError";

export const createCommentService = async (
  text: string,
  taskId: string,
  user: any,
) => {
  const task = await Task.findOne({
    _id: taskId,
    orgId: user.orgId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findOne({
    _id: task.projectId,
    members: user.id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return await Comments.create({
    text,
    taskId,
    userId: user.id,
    orgId: user.orgId,
  });
};

export const getCommentService = async (taskId: any, user: any) => {
      const task = await Task.findOne({
    _id: taskId,
    orgId: user.orgId,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return await Comments.find({
    taskId,
    orgId:user.orgId
  }).populate("userId","name email")
  .sort("-createdAt")
};
