import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unquie: true },
    password: {type: String, required: true, unique: true }
  },
  {
    timestamps: true,
  },
);


export default mongoose.model<IUser>("User",userSchema)