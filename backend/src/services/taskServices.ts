import Project from "../models/Project";
import { Task } from "../models/Task";
import { ApiError } from "../utils/AppError";

export const createTaskService = async (data: any, user: any) => {
  // cehck project exists in same org
  const project = await Project.findOne({
    _id: data.projectId,
    orgId: user.orgId,
    members:user.id
  });

  if (!project) {
    throw new ApiError(404, "Project not found in your organiazation");
  }

  //check assigned user is part of project
  if (data.assignedTo) {
    const isMember = project.members.includes(data.assignedTo);
    if (!isMember) {
      throw new ApiError(400, "User not part of project");
    }
  }
  return await Task.create({
    ...data,
    orgId: user.orgId,
    createdBy: user.id,
  });
};

export const getTasksService = async (query: any, user: any) => {
  const {
    status,
    priority,
    assignedTo,
    projectId,
    page = "1",
    limit = "10",
    sort = "-createdAt",
  } = query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  // 🔥 STEP 1: Get all projects where user is a member
  const userProjects = await Project.find({
    orgId: user.orgId,
    members: user.id,
  }).distinct("_id");

  const filter: any = {
    orgId: user.orgId,
    projectId: { $in: userProjects }, // 🔥 always restrict
  };

  // 🔥 STEP 2: Apply filters
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;

  // 🔥 STEP 3: If specific projectId is passed → validate access
  if (projectId) {
    const hasAcces = userProjects.some(
      id=>id.toString()===projectId.toString()
    )
    if (!hasAcces) {
      throw new ApiError(403, "Not authorized for this project");
    }
    filter.projectId = projectId;
  }

  const skip = (pageNum - 1) * limitNum;

  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("projectId", "name")
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const total = await Task.countDocuments(filter);

  return {
    tasks,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

export const updateTaskService = async (taskId:string,data:any,user:any) => {
  const task = await Task.findOne({
    _id:taskId,
    orgId:user.orgId
  });

  if(!task){
    throw new ApiError(404,"Task not found");
  }

  //Developer restrictions
  if(user.role ==="DEVELOPER"){
    if(task.assignedTo?.toString() !== user.id){
      throw new ApiError(403,"Not allowed")
    }

    // only allow status update
    task.status = data.status || task.status;
    await task.save();
    return task;
  }

  //ADMIN / MANAGER full update
  Object.assign(task,data)
  await task.save();

  return task;


};

export const deleteTaskService = async (taskId: string,user:any) => {
  const task = await Task.findOne({
    _id:taskId,
    orgId:user.orgId
  })

  if(!task){
    throw new ApiError(404,"Task not found")
  }

  if(user.role !=="ADMIN"){
    throw new ApiError(403,"Only Admin can delete")
  }

  await task.deleteOne();
  return true;
};
