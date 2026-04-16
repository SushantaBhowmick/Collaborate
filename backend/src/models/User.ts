import mongoose from "mongoose";


export type UserRole = "ADMIN" | "MANAGER"| "DEVELOPER"
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  orgId:mongoose.Types.ObjectId;
  role:UserRole
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unquie: true },
    password: {type: String, required: true, unique: true },

    orgId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Organization",
      required:true,
    },
    role:{
      type: String,
      enum:["ADMIN","MANAGER","DEVELOPER"],
      default: "DEVELOPER"
    }
  },
  {
    timestamps: true,
  },
);


export default mongoose.model<IUser>("User",userSchema)