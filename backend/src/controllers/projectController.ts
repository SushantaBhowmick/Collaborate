import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { addMemberService, createProjectService, getProjectService, removeMemberService } from "../services/projectService";
import { success } from "zod";



export const createProject = asyncHandler(async(req:Request,res:Response)=>{
    const project = await createProjectService(req.body,(req as any).user);

    res.status(201).json({
        success:true,
        message:"Projct created",
        project
    })
})


export const getProjects = asyncHandler(async(req:Request,res:Response)=>{
    const project = await getProjectService((req as any).user);

    res.status(201).json({
        success:true,
        message:"Projct created",
        data:project
    })
})

export const addMember = asyncHandler(async(req:Request,res:Response)=>{
    const {userId}=req.body;
    const member = await addMemberService(req.params.id,userId,(req as any).user);

    res.status(200).json({
        success:true,
        message:"Member added",
        data:member
    })
})


export const removeMember = asyncHandler(async(req:Request,res:Response)=>{
    const {userId}=req.body;
    const member = await removeMemberService(req.params.id,userId,(req as any).user);

    res.status(200).json({
        success:true,
        message:"Member removed",
    })
})

