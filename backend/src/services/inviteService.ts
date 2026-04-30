import crypto from "crypto";
import Invite from "../models/Invite";
import { ApiError } from "../utils/AppError";
import User from "../models/User";
import { sendEmail } from "../utils/sendEMail";
import bcyrpt from 'bcrypt'

export const createInviteService = async (
  email: string,
  role: string,
  user: any,
) => {
  const token = crypto.randomBytes(32).toString("hex");

  const InviteExists = await Invite.findOne({email});
  
  if(InviteExists?.status==="PENDING"){
    throw new ApiError(400,"Already send an Invitation")
  }
  if(InviteExists?.status==="ACCEPTED"){
    throw new ApiError(400,"Collaborator Already exists")
  }

  const invite = await Invite.create({
    email,
    role,
    orgId: user.orgId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24H
  })

  const link = `${process.env.FRONTEND_URL}/invite/${token}`;
  console.log({ link });
    await sendEmail({
      to:email,
      subject:"You're invited to Collab 🚀",
      html:`
      <h2>You've been invited!</h2>
      <p>Click below to join:</p>
      <a href="${link}">${link}</a>
      `
    })
  return invite;
};

export const acceptInviteService = async (token: any, userData: any) => {
  const invite = await Invite.findOne({ token });

  if (!invite) throw new ApiError(400, "Invalid Invite");

  if (invite.expiresAt < new Date()) {
    invite.status = "EXPIRED";
    await invite.save();
    throw new ApiError(400, "Invite expired");
  }

  const hashPassword = await bcyrpt.hash(userData.password,10)

  const user = await User.create({
    name:userData.name,
    password:hashPassword,
    orgId: invite.orgId,
    email:invite.email,
    role: invite.role,
  });

  invite.status = "ACCEPTED";
  await invite.save();

//   await invite.deleteOne();
  return user;
};


export const getinvitesService = async(user:any)=>{
    return await Invite.find({
        orgId:user.orgId
    }).sort("-createdAt")
}