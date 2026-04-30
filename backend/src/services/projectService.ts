import Project from "../models/Project";
import User from "../models/User";
import { ApiError } from "../utils/AppError";

export const createProjectService = async (data: any, user: any) => {
  return await Project.create({
    name: data.name,
    description: data.description,
    orgId: user.orgId,
    members: [user.id],
    createdBy: user.id,
  });
};

export const getProjectService = async (user: any) => {
  return await Project.find({ orgId: user.orgId,members:user.id }).populate(
    "members",
    "name email",
  );
};

export const addMemberService = async (
  projectId: any,
  userId: any,
  currentUser: any,
) => {
  //check proj belong to the org
  const project = await Project.findOne({
    _id: projectId,
    orgId: currentUser.orgId,
  });
  console.log(project)
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  //check usre belongs to same org
  const user = await User.findOne({
    _id: userId,
    orgId: currentUser.orgId,
  });
  if (!user) {
    throw new ApiError(400, "User not in your organization");
  }

  //avoid duplicates;
  if (project.members.includes(userId)) {
    throw new ApiError(400, "User already in proejct");
  }

  project.members.push(userId);
  await project.save();

  return project;
};

export const removeMemberService = async (
  projectId: any,
  userId: any,
  currentUser: any,
) => {
  //check proj belong to the org
  const project = await Project.findOne({
    _id: projectId,
    orgId: currentUser.orgId,
  });
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  project.members = project.members.filter((m) => m.toString() !== userId);
  await project.save();

  return project;
};
