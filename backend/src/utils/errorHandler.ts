import { NextFunction, Request, Response } from "express";
import { ApiError } from "./AppError";
import { logger } from "./logger";



export const notFound = (req:Request,res:Response,next:NextFunction)=>{
    const error = new ApiError(404,`Not Found -${req.originalUrl}`);
     logger.error(error.message);
    next(error)
};

export const errorHandler =(
    err:ApiError,
    req:Request,
    res: Response,
    next: NextFunction
)=>{
    const statusCode = err.statusCode || 500;
     logger.error(err.message);
    res.status(statusCode).json({
        success:true,
        message:err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}