import { createTask, getTasks } from "../services/taskServices";

export const create = async (req: any, res: any, next: any) => {
  try {
    const task = await createTask(req.body, req.user.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: any, res: any) => {
  const tasks = await getTasks(req.user.id);
  res.json(tasks);
};