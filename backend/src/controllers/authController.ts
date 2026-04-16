import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ApiError } from "../utils/AppError";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import Organization from "../models/Organization";
import { generateToken } from "../utils/jwtToken";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, orgName } = req.body;

    if (!name || !email || !password || !orgName) {
      throw new ApiError(400, "All fields are required");
    }

    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new ApiError(400, "User already exists");
    }
    const hashed = await bcrypt.hash(password, 10);

    //create org
    const org = await Organization.create({
      name: orgName,
    });

    const user = await User.create({
      name,
      email,
      password: hashed,
      orgId: org._id,
      role: "ADMIN",
    });

    //link owner 
    org.owner = user._id;
    await org.save();

   const token = generateToken(user)

    res.status(201).json({
      success: true,
      message:"User created",
      data: {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        orgId:user.orgId,
      },
      token
    });
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const userExits = await User.findOne({ email });
  if (!userExits) {
    throw new ApiError(400, "User Not found");
  }
  const comparedPassword = await bcrypt.compare(password, userExits.password);
  if (!comparedPassword) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = generateToken(userExits)

  res.status(200).json({
    success: true,
    data: userExits,
    token,
  });
});

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    console.log(userId);
    const userExits = await User.findById(userId);
    if (!userExits) {
      throw new ApiError(400, "User Not found");
    }

    res.status(200).json({
      success: true,
      data: userExits,
    });
  },
);
