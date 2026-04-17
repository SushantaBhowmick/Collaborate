import { Response } from "express";
import { ApiResponse } from "./ApiResponse";
import { logActivity } from "../services/activityService";



interface ResponseOptions{
    res:Response;
    statusCode?:number;
    message:string;
    data?:any;

    log?:{
        action:string;
        user:any;
        entityId:any;
        entityType:"TASK" | "PROJECT";
        message:string;
    }
    
}

export const sendResponse= async({res,statusCode=200,message,data,log}:ResponseOptions)=>{
    res.status(statusCode).json(
        new ApiResponse(true,message,data)
    );


    if(log){
        try {
            await logActivity(log)
        } catch (error) {
            console.error("Log Failed",error)
            
        }
    }
}