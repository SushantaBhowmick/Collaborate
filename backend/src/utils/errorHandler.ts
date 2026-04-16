import { NextFunction, Request, Response } from "express";
import { ApiError } from "./AppError";



export const notFound = (req:Request,res:Response,next:NextFunction)=>{
    const error = new ApiError(404,`Not Found -${req.originalUrl}`);
    next(error)
};

export const errorHandler =(
    err:ApiError,
    req:Request,
    res: Response,
    next: NextFunction
)=>{
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success:true,
        message:err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}