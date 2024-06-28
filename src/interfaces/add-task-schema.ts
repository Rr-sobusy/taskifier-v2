import { z } from "zod";


export const taskSchema = z.object({
    taskTitle : z.string().min(3).max(8)
})