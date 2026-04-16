import mongoose from "mongoose";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask extends Document{
  title: string;
  description?:string;
  projectId:mongoose.Types.ObjectId;
  orgId:mongoose.Types.ObjectId;
  assignedTo?:mongoose.Types.ObjectId;
  createdBy:mongoose.Types.ObjectId;
  status:TaskStatus;
  priority:TaskPriority;
  dueDate?:Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: {type:String,required:true},
  description:String,

  projectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project",
    required:true,
  },
  orgId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Organization",
    required:true,
  },
  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  status:{
    type:String,
    enum:[ "TODO" , "IN_PROGRESS" , "DONE"],
    default:"TODO",
  },
  priority:{
    type:String,
    enum:["LOW","MEDIUM","HIGH"],
    default:"MEDIUM",
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  dueDate:{
    type:Date
  }
  
}, { timestamps: true });

taskSchema.index({orgId:1})
taskSchema.index({projectId:1})
taskSchema.index({assignedTo:1})
taskSchema.index({status:1})

export const Task = mongoose.model<ITask>("Task", taskSchema);