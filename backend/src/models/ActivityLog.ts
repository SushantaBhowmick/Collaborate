import mongoose from "mongoose";
import { Document } from "mongoose";

export type ActivityType =
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_DELETED"
  | "STATUS_CHANGED"
  | "PROJECT_CREATED"
  | "MEMBER_ADDED"
  | "MEMBER_REMOVED";

export interface IActivityLog extends Document {
  action: ActivityType;
  userId: mongoose.Types.ObjectId;
  orgId: mongoose.Types.ObjectId;
  entityId: mongoose.Types.ObjectId;
  entityType: "TASK" | "PROJECT";
  message: string;
}

const activitySchema = new mongoose.Schema<IActivityLog>(
  {
    action: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    entityType: {
      type: String,
      enum: ["TASK", "PROJECT"],
    },
    message: String,
  },
  { timestamps: true },
);


export default mongoose.model<IActivityLog>("ActivityLog",activitySchema)