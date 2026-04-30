import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { acceptInviteService, createInviteService, getinvitesService } from "../services/inviteService";
import { sendResponse } from "../utils/responseHandler";



export const createInvite = asyncHandler(async(req:Request,res:Response)=>{
const {email,role} = req.body;
const user = (req as any).user
const invite = await createInviteService(email,role,user);

sendResponse({
    res,
    message:`Send invitation to ${email}`,
    statusCode:201
})
})

export const acceptInvite = asyncHandler(async(req:Request,res:Response)=>{
const userData = req.body;
const token = req.params.token;
const accept = await acceptInviteService(token,userData);

sendResponse({
    res,
    message:`Invitation accepted succesfully`,
    statusCode:200,
    data:accept
})
})

export const getInvites = asyncHandler(async(req:Request,res:Response)=>{
const invites = await getinvitesService((req as any).user);
sendResponse({
    res,
    message:`Invites users fetched`,
    statusCode:200,
    data:invites
})
})