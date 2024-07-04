import { z } from "zod";

export type TaskSchema = z.infer<typeof taskSchema>;

export const taskSchema = z.object({
  taskTitle: z.string().min(1, { message: "Task title must not be empty." }),
  taskDescription: z.string().min(1, { message: "Task description must not be empty." }).max(50, { message: "Task description must not too long if possible." }),
  completionDate: z.date({ message: "Pick a date" }),
  tags: z.string().array().min(1).max(3 , { message: "Tags cannot exceed in 3." }),
  icon: z.string()
});


