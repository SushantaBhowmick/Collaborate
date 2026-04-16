import z from "zod";



export const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    projectId: z.string(),
    assignedTo: z.string().optional(),
    priority: z.enum(["LOW","MEDIUM","HIGH"]).optional(),
    dueDate: z.string().optional(),
})