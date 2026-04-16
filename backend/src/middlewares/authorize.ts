import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/AppError";

export const authorize = (...roles:string[])=>(req:Request,res:Response,next:NextFunction)=>{
    if(!roles.includes((req as any).user.role)){
        return next (new ApiError(403,"You are not allowed to perform this action"))
    }
    next()
}
