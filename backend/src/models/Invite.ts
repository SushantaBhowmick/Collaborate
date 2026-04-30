import mongoose from "mongoose";

export interface IInvite extends Document {
  email: string;
  orgId: mongoose.Types.ObjectId;
  role: string;
  token: string;
  status:string;
  expiresAt: Date;
}

const inviteSchema = new mongoose.Schema<IInvite>(
  {
    email: {
      type: String,
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "DEVELOPER"],
      default: "DEVELOPER",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "EXPIRED"],
      default: "PENDING",
    },
    token: { type: String, required: true },
    expiresAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model<IInvite>("Invite", inviteSchema);
