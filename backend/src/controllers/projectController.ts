import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { addMemberService, createProjectService, getProjectService, removeMemberService } from "../services/projectService";
import { success } from "zod";
import { sendResponse } from "../utils/responseHandler";
import { Task } from "../models/Task";



export const createProject = asyncHandler(async(req:Request,res:Response)=>{
    const project = await createProjectService(req.body,(req as any).user);

    await sendResponse({
        res,
        statusCode:201,
        message:"Project Created",
        data:project,
        log:{
            action: "PROJECT_CREATED",
            user:(req as any).user,
            entityId:project._id,
            entityType:"PROJECT",
            message:`Project created`
        }

    })
})


export const getProjects = asyncHandler(async(req:Request,res:Response)=>{
    const project = await getProjectService((req as any).user);
    await sendResponse({
        res,
        message:"fetched projects",
        statusCode:200,
        data:project
    })
})

export const addMember = asyncHandler(async(req:Request,res:Response)=>{
    const {userId}=req.body;
    const member = await addMemberService(req.params.id,userId,(req as any).user);

    await sendResponse({
        res,
        statusCode:200,
        message:"Member added",
        data:member,
        log:{
            action: "MEMBER_ADDED",
            user:(req as any).user,
            entityId:member.id,
            entityType:"PROJECT",
            message:`Member added`
        }

    })
    
})


export const removeMember = asyncHandler(async(req:Request,res:Response)=>{
    const {userId}=req.body;
    const member = await removeMemberService(req.params.id,userId,(req as any).user);
    await sendResponse({
        res,
        statusCode:200,
        message:"Member removed",
        data:member,
        log:{
            action: "MEMBER_REMOVED",
            user:(req as any).user,
            entityId:member.id,
            entityType:"PROJECT",
            message:`Member removed`
        }

    })
})

