import ActivityLog from "../models/ActivityLog"


export const logActivity = async({
    action,user,entityId,entityType,message
}:any)=>{
  try {
      await ActivityLog.create({
        action,
        userId:user.id,
        orgId:user.orgId,
        entityId,
        entityType,
        message
    });
  } catch (error) {
    console.log("Activity log failed",error)
  }
}

export const getActivityLogService = async(entityId:any,user:any)=>{
    return await ActivityLog.find({
        orgId:user.orgId,
        entityId
    }).populate("userId","name,email")
    .sort("-createdAt")
}