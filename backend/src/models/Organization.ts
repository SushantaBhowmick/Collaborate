import mongoose, { Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
}

const orgSchema = new mongoose.Schema<IOrganization>(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.model<IOrganization>("Organization",orgSchema);
