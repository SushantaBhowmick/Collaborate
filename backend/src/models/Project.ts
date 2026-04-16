import mongoose from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  orgId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: String, requird: true },
    description: { type: String },

    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      requireed: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requireed: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProject>("Project", projectSchema);
