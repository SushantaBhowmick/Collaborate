import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ApiError } from "../utils/AppError";
import bcrypt from 'bcrypt'
import User from "../models/User";
import jwt from 'jsonwebtoken'


export const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    const {name,email,password}= req.body;

    if(!name|| !email || !password){
        throw new ApiError(400,"Please fill all the fields")
    }
    
    const userExits = await User.findOne({email});
    if(userExits){
        throw new ApiError(400,"User already exists")
    };
    const hashed = await bcrypt.hash(password,10);

    const user = await User.create({name,email,password:hashed})

    res.status(201).json({
        success:true,
        data:user
    })
})

export const loginUser = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password}= req.body;

    if(!email || !password){
        throw new ApiError(400,"Please fill all the fields")
    }
    
    const userExits = await User.findOne({email});
    if(!userExits){
        throw new ApiError(400,"User Not found")
    };
    const comparedPassword = await bcrypt.compare(password,userExits.password);
    if(!comparedPassword){
        throw new ApiError(400,"Invalid Credentials")
    };

    const token = jwt.sign({id:userExits._id},process.env.JWT_SECRET!!,{expiresIn:"1d"})
    
    res.status(200).json({
        success:true,
        data:userExits,
        token
    })
})

export const getMyProfile = asyncHandler(async(req:Request,res:Response)=>{
    const userId = (req as any).user;
    console.log(userId)
    const userExits = await User.findById(userId);
    if(!userExits){
        throw new ApiError(400,"User Not found")
    };
    
    res.status(200).json({
        success:true,
        data:userExits,
    })
})