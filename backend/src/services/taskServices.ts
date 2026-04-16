import { Task } from "../models/Task";

export const createTask = async (data: any, userId: string) => {
  return await Task.create({ ...data, userId });
};

export const getTasks = async (userId: string) => {
  return await Task.find({ userId });
};

export const updateTask = async (id: string, data: any) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};