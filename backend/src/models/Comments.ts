import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  orgId: mongoose.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    text: { type: String, required: true },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      requried: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ taskId: 1 });
commentSchema.index({ orgId: 1 });

export default mongoose.model<IComment>("Comment", commentSchema);
