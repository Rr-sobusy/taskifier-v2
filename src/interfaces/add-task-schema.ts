import { z } from "zod";

export type TaskSchema = z.infer<typeof taskSchema>;

export const taskSchema = z.object({
  taskTitle: z.string().min( 1 , { message: "Task title must not be empty." }),
  taskDescription: z.string().min(1, { message: "Task description must not be empty." }),
  completionDate: z.date({message : "Pick a date"}),
  tags: z.string().array().max(2, {message : "out of choices"}),
  icon: z.string()
});


